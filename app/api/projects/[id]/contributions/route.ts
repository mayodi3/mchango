import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { Query } from "node-appwrite";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  try {
    const { id } = await params;

    const { databases } = await createAdminClient();

    const contributorsResponse = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.contributionsCollectionId,
      [Query.equal("$id", id)]
    );

    return NextResponse.json(contributorsResponse.documents);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error getting the contributors" });
  }
}
