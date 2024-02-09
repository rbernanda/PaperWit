import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat With Any PDF",
  description: `Chat With Any PDF is like a chat app for your documents powered by OpenAI's cutting-edge language technology! Just ask questions about a PDF and get the answers, like highlighting key points or summarizing info. Perfect for studying, reviewing contracts, or working with others. Think "smart document assistant" that makes PDFs easier to understand and use.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>{children}</Providers>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
