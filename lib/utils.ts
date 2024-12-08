import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const appwriteConfig = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  projectsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID!,
  contributionsCollectionId:
    process.env.NEXT_PUBLIC_APPWRITE_CONTRIBUTION_COLLECTION_ID!,
  chatCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CHAT_COLLECTION_ID!,
  fundraisingCategoriesId:
    process.env.NEXT_PUBLIC_APPWRITE_FUNDRAISING_CATEGORIES_ID!,
};
