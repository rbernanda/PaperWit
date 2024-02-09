"use client";
import { DrizzleChats } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  chats: DrizzleChats[];
  activeChatId: number;
};

const ChatSideBar = ({ chats, activeChatId }: Props) => {
  return (
    <div className="w-full h-screen p-4 text-gray-200">
      <Link href="/">
        <Button className="w-full border border-dashed border-white">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link href={`/chats/${chat.id}`} key={chat.id}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white": chat.id === activeChatId,
                "hover:text-white": chat.id !== activeChatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full text-sm truncate overflow-hidden whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBar;
