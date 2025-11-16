import { techDescriptionMap, techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string) => {
  const normalizedTeckName = techName.replace(/[ .]/g, "").toLowerCase();

  return techMap[normalizedTeckName]
    ? `${techMap[normalizedTeckName]} colored`
    : "devicon-devicon-plain";
};

// descriptions.ts

export const getTechDescription = (techName: string): string => {
  if (!techName || typeof techName !== "string") return "";

  // Normalize the key the same way you did for icons: remove spaces and dots, lowercase.
  // Keep other characters (like + or #) so keys such as "c++" or "c#" still match.
  const normalized = techName.replace(/[ .]/g, "").toLowerCase();

  // direct lookup
  if (techDescriptionMap[normalized]) return techDescriptionMap[normalized];

  // Some helpful extra fallbacks/aliases:
  // allow "postgres" -> "postgresql", "reactjs" etc. (cover common variants)
  const aliasMap: { [key: string]: string } = {
    postgres: "postgresql",
    postgresql: "postgresql",
    reactjs: "react",
    nodejs: "node",
    mongodb: "mongodb",
    mongo: "mongodb",
    ts: "typescript",
    js: "javascript",
    cpp: "c++",
    cplusplus: "c++",
    "c#": "c#",
  };

  if (aliasMap[normalized] && techDescriptionMap[aliasMap[normalized]]) {
    return techDescriptionMap[aliasMap[normalized]];
  }

  // final wildcard fallback using the original provided techName (trimmed)
  const cleanedName = techName.trim();
  return `${cleanedName} is a technology or tool widely used in web development, providing valuable features and capabilities.`;
};

export const getTimeStamp = (createdAt: Date) => {
  const date = new Date(createdAt);
  const now = new Date();
  const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSeconds <= 0) return "just now";
  if (diffSeconds < 60) {
    return `${diffSeconds} second${diffSeconds !== 1 ? "s" : ""} ago`;
  }

  const diffMinutes = Math.floor(diffSeconds / 60);
  if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes !== 1 ? "s" : ""} ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours} hour${diffHours !== 1 ? "s" : ""} ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) {
    return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
  }

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths !== 1 ? "s" : ""} ago`;
  }

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears !== 1 ? "s" : ""} ago`;
};

export const formatNumber = (number: number) => {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (number >= 1000) {
    return (number / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return number.toString();
  }
};
