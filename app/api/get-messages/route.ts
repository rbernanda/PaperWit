import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { messages as messagesDB } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function POST(req: Request) {
  const { chatId } = await req.json();

  if (!chatId) {
    return NextResponse.json({ error: "chatId is required" }, { status: 400 });
  }

  try {
    const messages = await db
      .select()
      .from(messagesDB)
      .where(eq(messagesDB.chatId, chatId));

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.log("error querying messages: ", error);
    return NextResponse.json(
      { error: "error querying messages" },
      { status: 500 }
    );
  }
}
