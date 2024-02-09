import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";
import ChatSideBar from "@/components/ChatSideBar";
import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/ChatComponent";

type Props = {
  params: {
    chatId: string;
  };
};

const page = async ({ params }: Props) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  // .orderBy(desc(chats.createdAt));

  const chatId = parseInt(params.chatId);

  if (!_chats) {
    return redirect("/");
  }

  if (!_chats.find((chat) => chat.id === chatId)) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === chatId);

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[1.5] max-w-xs max-h-screen overflow-scroll bg-gray-900">
          <ChatSideBar chats={_chats} activeChatId={chatId} />
        </div>
        {/* PDF Viewer */}
        <div className="flex-[5] max-h-screen overflow-scroll p-4">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>

        {/* Chat Component  */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <ChatComponent chatId={chatId} />
        </div>
      </div>
    </div>
  );
};

export default page;
