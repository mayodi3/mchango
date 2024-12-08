"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "Community Water Project",
    category: "Community Development",
    description:
      "Help us bring clean water to rural communities in Kitui County.",
    currentAmount: 250000,
    targetAmount: 500000,
    image: "/water_project.jpg",
  },
  {
    id: 2,
    title: "Education for All",
    category: "Education",
    description:
      "Support our initiative to provide school supplies for underprivileged children.",
    currentAmount: 150000,
    targetAmount: 300000,
    image: "/education.jpg",
  },
  {
    id: 3,
    title: "Reforestation Initiative",
    category: "Environmental Causes",
    description:
      "Join us in planting trees to combat deforestation in the Mau Forest Complex.",
    currentAmount: 75000,
    targetAmount: 200000,
    image: "/reforestation.jpg",
  },
];

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredProjects.length);
  };

  const prevProject = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + featuredProjects.length) % featuredProjects.length,
    );
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Inspiring Initiatives
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={`project-${currentIndex}`}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="w-full max-w-3xl mx-auto">
                <CardHeader>
                  <CardTitle>{featuredProjects[currentIndex].title}</CardTitle>
                  <CardDescription>
                    {featuredProjects[currentIndex].category}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video relative mb-4">
                    <Image
                      src={featuredProjects[currentIndex].image}
                      alt={featuredProjects[currentIndex].title}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full rounded-md"
                      priority
                    />
                  </div>
                  <p className="mb-4">
                    {featuredProjects[currentIndex].description}
                  </p>
                  <Progress
                    value={
                      (featuredProjects[currentIndex].currentAmount /
                        featuredProjects[currentIndex].targetAmount) *
                      100
                    }
                    className="mb-2"
                  />
                  <p className="text-sm text-muted-foreground">
                    KES{" "}
                    {featuredProjects[
                      currentIndex
                    ].currentAmount.toLocaleString()}{" "}
                    raised of KES{" "}
                    {featuredProjects[
                      currentIndex
                    ].targetAmount.toLocaleString()}{" "}
                    goal
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild disabled>
                    <Link
                      href={`/projects/${featuredProjects[currentIndex].id}`}
                    >
                      View Project
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </AnimatePresence>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-4 transform -translate-y-1/2"
            onClick={prevProject}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-4 transform -translate-y-1/2"
            onClick={nextProject}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
