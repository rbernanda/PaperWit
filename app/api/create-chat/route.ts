import { loadS3IntoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { file_key } = body;
    const pages = await loadS3IntoPinecone(file_key);
    return NextResponse.json({ pages, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error", status: 500 });
  }
}
