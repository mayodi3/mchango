import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function GET(
  request: NextRequest,
  { params }: { params: Params },
) {
  try {
    const { id } = await params;

    const { databases } = await createAdminClient();

    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectsCollectionId,
      id,
    );

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to get the current project" });
  }
}
