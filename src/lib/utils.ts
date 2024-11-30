import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const session = {
  set: (k: string, d: object) => {
    const b = Buffer?.from(JSON.stringify(d));
    sessionStorage.setItem(k, b.toString("base64"));
  },
  get: (k: string) => {
    const b = sessionStorage.getItem(k);
    if (!b) return {};
    return JSON.parse(Buffer?.from(b ?? "", "base64").toString() ?? "{}");
  },
};

export function downloadURI(uri: string, name: string) {
  const link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
