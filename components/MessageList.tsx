import { cn } from "@/lib/utils";
import { Message } from "ai/react";
import React from "react";
import { Loader } from "lucide-react";

type Props = {
  messages: Message[];
  isGenerating: boolean;
};

const MessageList = (props: Props) => {
  if (!props.messages) {
    return null;
  }

  return (
    <div className="flex flex-col px-4 gap-4 py-4">
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
                "flex flex-col gap-1 rounded-lg px-3 text-sm py-2 shadow-md ring-1 ring-gray-900/10",
                {
                  "bg-blue-600 text-white": message.role === "user",
                }
              )}
            >
              {message.content
                .split("\n")
                .map((currentTextBlock: string, index: number) => {
                  if (currentTextBlock === "") {
                    return <p key={message.id + index}>&nbsp;</p>;
                  } else {
                    return <p key={message.id + index}>{currentTextBlock}</p>;
                  }
                })}
            </div>
          </div>
        );
      })}
      {props.isGenerating && (
        <div className="flex justify-center py-2">
          <Loader className="w-10 h-10 text-blue-500 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default MessageList;
