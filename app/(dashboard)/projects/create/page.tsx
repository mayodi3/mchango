"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createProject } from "./action";
import { Models } from "node-appwrite";
import { getLoggedInUser } from "@/lib/appwrite";
import Link from "next/link";

const CreateProjectPage = () => {
  const [step, setStep] = useState(1);
  const [shareableLink, setShareableLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [projectData, setProjectData] = useState({
    category: "",
    name: "",
    description: "",
    goal: "",
  });
  const router = useRouter();
  const [user, setUser] = useState<Models.Preferences | null>(null);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = async (value: string) => {
    setProjectData({ ...projectData, category: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await createProject(projectData, user?.$id);
      const projectId = response.project?.$id;
      if (response.success) {
        const link = `${window.location.origin}/projects/${projectId}`;
        setShareableLink(link);
      }
      toast.success("Project created ready to work");
      setIsLoading(false);
      setStep(4);
    } catch (error) {
      toast.error("Error creating project");
      console.error(error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => toast.success("Link Copied To Clipboard"))
      .catch((error) => {
        toast.error("Failed to copy");
        console.error(error);
      });
  };

  useEffect(() => {
    if (step === 4) {
      setProjectData({
        category: "",
        name: "",
        description: "",
        goal: "",
      });
    }
  }, [step]);

  useEffect(() => {
    async function getUser() {
      const u = await getLoggedInUser();
      setUser(u);
    }

    getUser();
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Create Your Fundraiser Project</CardTitle>
            <CardDescription>Step {step} of 4</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-4">
                  <Label htmlFor="category">Select Category</Label>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="welfare">
                        Welfare Initiatives
                      </SelectItem>
                      <SelectItem value="wedding">Weddings</SelectItem>
                      <SelectItem value="church">Church Projects</SelectItem>
                      <SelectItem value="school">School Fundraisers</SelectItem>
                      <SelectItem value="medical">Medical Expenses</SelectItem>
                      <SelectItem value="environment">
                        Environmental Causes
                      </SelectItem>
                      <SelectItem value="disaster">Disaster Relief</SelectItem>
                      <SelectItem value="community">
                        Community Development
                      </SelectItem>
                      <SelectItem value="arts">Arts and Culture</SelectItem>
                      <SelectItem value="sports">Sports Teams</SelectItem>
                      <SelectItem value="burial">Burial Services</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={() => setStep(2)}>Next</Button>
                </div>
              )}
              {step === 2 && (
                <div className="space-y-4">
                  <Label htmlFor="name">Project Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={projectData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your project name (Ambani's Wedding... e.t.c)"
                    required
                  />
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={projectData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your project you are about to raise contributions on"
                    required
                  />
                  <Button onClick={() => setStep(3)}>Next</Button>
                </div>
              )}
              {step === 3 && (
                <div className="space-y-4">
                  <Label htmlFor="goal">Fundraising Goal (KES)</Label>
                  <Input
                    id="goal"
                    name="goal"
                    type="number"
                    value={projectData.goal}
                    onChange={handleInputChange}
                    placeholder="Enter your fundraising goal"
                    required
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating Project..." : "Create Project"}
                  </Button>
                </div>
              )}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Your project has been created!
                  </h3>
                  <p>
                    Share this link with the ones you wish to contribute to this
                    project!
                  </p>
                  <div className="flex items-center space-x-2">
                    <Input value={shareableLink} readOnly />
                    <Button onClick={copyToClipboard}>Copy</Button>
                  </div>
                  <Link href="/dashboard">
                    <Button>Back to Dashboard</Button>
                  </Link>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateProjectPage;
