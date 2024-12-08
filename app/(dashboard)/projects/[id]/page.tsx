"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2, DollarSign, User, Phone } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Project, Contributor } from "./types";
import { Models } from "node-appwrite";
import { getLoggedInUser } from "@/lib/appwrite";
import { createContribution, updateRaisedAmount } from "../actions/actions";

export default function ProjectDetails() {
  const [project, setProject] = useState<Project | null>(null);
  const [contributorName, setContributorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [user, setUser] = useState<Models.Preferences | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/projects/${id}`);
        const currentProject = await response.json();
        setProject(currentProject);
        // Fetch contributors
        const contributorsResponse = await fetch(
          `/api/projects/${id}/contributions`
        );
        const currentContributions = await contributorsResponse.json();
        setContributors(currentContributions);
      } catch (error) {
        console.error("Error fetching project", error);
        toast.error("Failed to load project details. Please try again.");
      }
    };
    const fetchUser = async () => {
      try {
        const currentUser = await getLoggedInUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error fetching user", error);
      }
    };
    fetchProject();
    fetchUser();
  }, [id]);

  const handleContribute = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!project) throw new Error("Project not found");
      // TODO: Implement M-Pesa payment processing
      const updatedAmount = project.raised + parseFloat(contributionAmount);
      await updateRaisedAmount(id as string, updatedAmount);
      // Add contributor to the contributors collection
      await createContribution(
        id as string,
        contributorName,
        phoneNumber,
        contributionAmount
      );
      setProject({ ...project, currentAmount: updatedAmount });
      // Refresh contributors list
      const contributorsResponse = await fetch(
        `/api/projects/${id}/contributions`
      );
      const currentContributions = await contributorsResponse.json();
      setContributors(currentContributions);
      toast.success(
        `Thank you, ${contributorName}, for your contribution of KES ${contributionAmount}`
      );
      setContributorName("");
      setPhoneNumber("");
      setContributionAmount("");
    } catch (error) {
      console.error(error);
      toast.error(
        "An error occurred while processing your contribution. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!project || !user) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const progress = (project.currentAmount / project.targetAmount) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <div className="bg-muted p-4 rounded-lg mb-6">
        <p className="text-lg mb-4">{project.description}</p>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
          <span className="mb-2 sm:mb-0">Progress:</span>
          <span className="font-semibold">
            {project.raised.toLocaleString()} / {project.goal.toLocaleString()}{" "}
            KES
          </span>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Make a Contribution</h2>
          <form onSubmit={handleContribute} className="space-y-4">
            <div>
              <Label htmlFor="contributorName" className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Your Name
              </Label>
              <Input
                id="contributorName"
                value={contributorName}
                onChange={(e) => setContributorName(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phoneNumber" className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                placeholder="e.g., +254712345678"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="contributionAmount" className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2" />
                Contribution Amount (KES)
              </Label>
              <Input
                id="contributionAmount"
                type="number"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
                required
                min="1"
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Contribute"
              )}
            </Button>
          </form>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Contributors</h2>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Amount (KES)</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contributors.map((contributor) => (
                <TableRow key={contributor.$id}>
                  <TableCell>{contributor.name}</TableCell>
                  <TableCell>{contributor.phoneNumber}</TableCell>
                  <TableCell>{contributor.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    {new Date(contributor.$createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
