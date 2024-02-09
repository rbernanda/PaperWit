import { Pinecone } from "@pinecone-database/pinecone";

import { getEmbeddings } from "./embeddings";
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

export async function getMatchesFromEmbedding(
  embeddings: number[],
  fileKey: string
) {
  const client = await getPineConeClient();
  const namespace = convertIntoAscii(fileKey);
  const pineconeIndex = client.Index("chat-pdf").namespace(namespace);

  try {
    const queryResult = await pineconeIndex.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    });

    return queryResult.matches || [];
  } catch (error) {
    console.log("error querying embeddings pinecone", error);
    throw error;
  }
}

export async function getContext(query: string, fileKey: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatchesFromEmbedding(queryEmbeddings, fileKey);

  const qualifyingMatches = matches.filter((m) => m.score && m.score > 0.5);

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingMatches.map((m) => (m.metadata as Metadata).text);
  // 5 vectors
  return docs.join("\n").substring(0, 3000);
}
