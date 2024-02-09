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

  const _chats = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, userId))
    .orderBy(desc(chats.createdAt));

  const chatId = parseInt(params.chatId);

  if (!_chats) {
    return redirect("/");
  }

  if (!_chats.find((chat) => chat.id === chatId)) {
    return redirect("/");
  }

  const currentChat = _chats.find((chat) => chat.id === chatId);

  return (
    <div className="relative z-0 flex h-full w-full overflow-hidden max-h-screen">
      <div className="flex-[1.5] max-w-xs max-h-screen overflow-scroll bg-gray-900">
        <ChatSideBar chats={_chats} activeChatId={chatId} />
      </div>
      {/* PDF Viewer */}
      <div className="flex-[4] max-h-screen overflow-scroll p-4">
        <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
      </div>

      {/* Chat Component  */}
      <div className="flex-[3] border-l-4 border-l-slate-200 flex h-full max-h-screen flex-col relative">
        <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit shadow-sm">
          <h3 className="text-xl font-bold">Chat</h3>
        </div>
        <ChatComponent chatId={chatId} />
      </div>
    </div>
  );
};

export default page;
