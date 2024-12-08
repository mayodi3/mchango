import { Models } from "node-appwrite";

export interface Project extends Models.Document {
  name: string;
  description: string;
  raised: number;
  goal: number;
}

export interface Contributor extends Models.Document {
  projectId: string;
  name: string;
  phoneNumber: string;
  amount: number;
}
