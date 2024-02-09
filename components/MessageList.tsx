import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import React from "react";

type Props = {
  messages: Message[];
};

const MessageList = (props: Props) => {
  if (!props.messages) {
    return null;
  }
  return (
    <div className="flex flex-col px-4 gap-2 py-4">
      {props.messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn("flex", {
              "justify-end": message.role === "user",
              "justify-start": message.role === "assistant",
            })}
          >
            <div
              className={cn(
                "rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-blue-600 text-white": message.role === "user",
                }
              )}
            >
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageList;
