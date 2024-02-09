import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3.server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertIntoAscii } from "./utils";

let pc: Pinecone | null = null;

export const getPineConeClient = async () => {
  if (!pc) {
    pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }

  return pc;
};

type PDFPAge = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export const loadS3IntoPinecone = async (fileKey: string) => {
  // 1. obtain the pdf -> download and read from pdf
  console.log("downloading s3 object into file system");
  const file_name = await downloadFromS3(fileKey);

  if (!file_name) {
    throw new Error("file not found: Failed download from s3");
  }

  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPAge[];

  // 2. split and segment the PDF into pages
  const documents = await Promise.all(pages.map(prepareDocument));

  // 3. Vectorize the documents and embed them into Pinecone individually

  /**
   * MARK: temporary fix, for quick solution
   * TODO: Figure out why are some of the vectors values returned from OpenAI are empty
   */
  const dirtyVectors = await Promise.all(documents.flat().map(embedDocument));
  const vectors = dirtyVectors.filter((v) => v.values.length > 0);

  // 4. upload to pinecone
  const client = await getPineConeClient();
  const namespace = convertIntoAscii(fileKey);
  const pineconeIndex = client.Index("chat-pdf").namespace(namespace);
  // console.log(util.inspect(vectors, false, null, true /* enable colors */));
  console.log("---inserting vectors into pinecone---");
  pineconeIndex.upsert(vectors);

  return documents[0];
};

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("error embedding document ", error);
    throw error;
  }
}

export function truncateStringByBytes(str: string, maxBytes: number) {
  const enc = new TextEncoder();

  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, maxBytes));
}

async function prepareDocument(page: PDFPAge) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");

  // split the doc
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);

  return docs;
}
