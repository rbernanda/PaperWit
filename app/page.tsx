import { Button } from "@/components/ui/button";
import FileUpload from "@/components/FileUpload";
import { UserButton, auth } from "@clerk/nextjs";

import { LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();
  const isAuth = !!userId;

  return (
    <main className="min-h-screen w-screen overflow-hidden bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900 text-gray-50">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any pdf</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          {isAuth && (
            <div className="flex mt-2">
              <Button>Go To Chats</Button>
            </div>
          )}

          <p className="max-w-xl mt-2 text-lg">
            Joins millions of people who are using this app to chat with any
          </p>

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
