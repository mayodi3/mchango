"use server";

import { createAdminClient } from "@/lib/appwrite";
import { appwriteConfig } from "@/lib/utils";
import { ID } from "node-appwrite";

export async function updateRaisedAmount(
  projectId: string,
  updatedProjectAmount: number
) {
  try {
    const { databases } = await createAdminClient();
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.projectsCollectionId,
      projectId,
      {
        raised: updatedProjectAmount,
      }
    );

    return { success: true, message: "Project amount updates successfully" };
  } catch (error) {
    console.error(error);
    return { sucess: false, error: "Error updating the project amount" };
  }
}

export async function createContribution(
  projectId: string,
  contributorName: string,
  phoneNumber: string,
  contributionAmount: string
) {
  try {
    const { databases } = await createAdminClient();
    await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.contributionsCollectionId,
      ID.unique(),
      {
        name: contributorName,
        phoneNumber: phoneNumber,
        amount: parseFloat(contributionAmount),
        projectId,
      }
    );
    return { success: true, message: "Contribution created successfully" };
  } catch (error) {
    console.error(error);
    return { sucess: false, error: "Error creating a contribution" };
  }
}
