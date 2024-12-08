"use server";

import { createAdminClient, createSessionClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/utils";
import { ID } from "node-appwrite";

export async function createProject(
  projectData: {
    category: string;
    name: string;
    description: string;
    goal: string;
  },
  userId: string
) {
  try {
    const { databases } = await createAdminClient();
    const project = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectsCollectionId,
      ID.unique(),
      {
        ...projectData,
        goal: parseFloat(projectData.goal),
        raised: 0,
        userId,
      }
    );
    return {
      success: true,
      message: "Created the project successfully",
      project,
    };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error creating the project" };
  }
}
