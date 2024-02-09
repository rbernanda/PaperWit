"use client";
import React from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import MessageList from "./MessageList";

type Props = {};

const ChatComponent = (props: Props) => {
  const { input, handleInputChange, handleSubmit, messages } = useChat();

  return (
    <div className="relative max-h-screen overflow-scroll">
      {/* Header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* Conversation Box */}
      <MessageList messages={messages} />

      {/* Chat Input */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white flex"
      >
        <Input
          className="w-full"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask any question..."
        />
        <Button className="bg-blue-600 ml-2">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatComponent;
