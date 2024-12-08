import { createAdminClient, getLoggedInUser } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/utils";
import { NextResponse } from "next/server";
import { Query } from "node-appwrite";

export async function GET() {
  try {
    const user = await getLoggedInUser();

    if (!user) throw new Error("User not authenticated");

    const { databases } = await createAdminClient();

    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.projectsCollectionId,
      [Query.equal("userId", user.$id)]
    );

    return NextResponse.json(response.documents);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Failed to get the projects");
  }
}
