import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertIntoAscii(text: string) {
  // Remvoe non-ascii characters
  return text.replace(/[^\x00-\x7F]+/g, "");
}
