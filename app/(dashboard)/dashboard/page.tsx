"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import { getLoggedInUser } from "@/lib/appwrite";
import { Models } from "node-appwrite";

export default function Dashboard() {
  const [projects, setProjects] = useState<Models.Document[]>([]);
  const [user, setUser] = useState<Models.Preferences | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/projects");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch projects.");
        }
        const currentProjects = await response.json();
        setProjects(currentProjects);
      } catch (error) {
        console.error("Error fetching projects", error);
      }
    };
    const getCurrentUser = async () => {
      try {
        const currentUser = await getLoggedInUser();
        setUser(currentUser);
      } catch (error) {
        console.error(error);
      }
    };
    getCurrentUser();
    fetchProjects();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      </div>
      {projects.length === 0 && (
        <Card className="w-full max-w-3xl mx-auto bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">
              No Fundraising Projects Yet
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-lg mb-6">
              It looks like you haven&apos;t created any fundraising projects.
              Start your first project and make a difference!
            </p>
            <div className="w-32 h-32 mx-auto mb-6">
              <PlusCircle className="w-full h-full text-primary animate-pulse" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild size="lg" className="w-full max-w-xs">
              <Link href="/projects/create">Create Your First Project</Link>
            </Button>
          </CardFooter>
        </Card>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.$id}>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.category}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-2">{project.description.substring(0, 100)}...</p>
              <div className="flex justify-between items-center">
                <span>
                  {project.raised.toLocaleString()} /{" "}
                  {project.goal.toLocaleString()} KES
                </span>
                <Button asChild>
                  <Link href={`/projects/${project.$id}`}>View Project</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
