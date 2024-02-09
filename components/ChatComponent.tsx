"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Message } from "ai";

type Props = {
  chatId: number;
};

const ChatComponent = (props: Props) => {
  const { data } = useQuery({
    queryKey: ["chat", props.chatId],
    queryFn: async () => {
      const response = await axios.post<Message[]>("/api/get-messages", {
        chatId: props.chatId,
      });
      return response.data;
    },
  });

  const { input, handleInputChange, handleSubmit, messages, isLoading } =
    useChat({
      body: {
        chatId: props.chatId,
      },
      api: "/api/chat",
      initialMessages: data || [],
    });

  return (
    <>
      {/* Conversation Box */}
      <div className="flex-1 overflow-scroll flex flex-col">
        <MessageList messages={messages} isGenerating={isLoading} />
      </div>

      {/* Chat Input */}
      <form onSubmit={handleSubmit} className="w-full py-2 flex px-4 shadow">
        <Input
          className="w-full"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask anything about your pdf ..."
        />
        <Button className="bg-blue-600 ml-2">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
};

export default ChatComponent;
