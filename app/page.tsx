import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { UserButton, auth } from "@clerk/nextjs";

import { LogIn } from "lucide-react";
import Link from "next/link";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export default async function Home() {
  const { userId } = auth();
  const isAuth = !!userId;

  let latestChat;
  if (userId) {
    const _chats = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId))
      .orderBy(desc(chats.createdAt));
    if (_chats && _chats.length > 0) {
      latestChat = _chats[0];
    }
  }

  return (
    <main className="min-h-screen w-screen overflow-hidden bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">PaperWit</h1>
            <UserButton afterSignOutUrl="/" />
          </div>

          <p className="max-w-xl mt-2 text-lg">
            Simplifying PDF comprehension and utilization
          </p>

          {isAuth && latestChat && (
            <div className="flex mt-2 items-center gap-2">
              <Button>
                <Link href={`/chats/${latestChat.id}`}>Go To Chats</Link>
              </Button>
              <span className="text-slate-400">or</span>
            </div>
          )}

          <div className="w-full mt-4">
            {isAuth ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>
                  Login to get started <LogIn className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
