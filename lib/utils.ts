import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertIntoAscii(text: string) {
  // Remove non ASCII-printable characters

  const asciiText = text.replace(/[^\x00-\x7F]+/g, "");
  return asciiText;
}
