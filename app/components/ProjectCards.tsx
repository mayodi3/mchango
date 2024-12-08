"use client";

import React, { useEffect } from "react";
import { AnimationControls, motion, useAnimation } from "framer-motion";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const fundraisingCategories = [
  {
    name: "Welfare Initiatives",
    icon: "🤲",
    description:
      "Support those in need by contributing to initiatives that provide essential resources and assistance to vulnerable communities.",
  },
  {
    name: "Weddings",
    icon: "💍",
    description:
      "Celebrate love and new beginnings by contributing to a couple's wedding fund, helping them create lasting memories.",
  },
  {
    name: "Church Projects",
    icon: "⛪",
    description:
      "Contribute to church building projects, community outreach programs, or other initiatives that strengthen the spiritual community.",
  },
  {
    name: "School Fundraisers",
    icon: "🏫",
    description:
      "Invest in the future by contributing to school fundraisers that support educational resources, infrastructure improvements, and student activities.",
  },
  {
    name: "Medical Expenses",
    icon: "🏥",
    description:
      "Help individuals and families facing medical hardships by contributing to funds that cover medical bills, treatments, and recovery expenses.",
  },
  {
    name: "Environmental Causes",
    icon: "🌳",
    description:
      "Support environmental conservation and sustainability efforts by contributing to initiatives that protect our planet and promote a greener future.",
  },
  {
    name: "Disaster Relief",
    icon: "🆘",
    description:
      "Provide urgent assistance to communities affected by natural disasters or humanitarian crises by contributing to disaster relief funds.",
  },
  {
    name: "Community Development",
    icon: "🏘️",
    description:
      "Contribute to projects that enhance community well-being, such as infrastructure development, public spaces, and local economic initiatives.",
  },
  {
    name: "Arts and Culture",
    icon: "🎨",
    description:
      "Support artistic expression and cultural preservation by contributing to initiatives that promote the arts, music, theater, and cultural heritage.",
  },
  {
    name: "Sports Teams",
    icon: "⚽",
    description:
      "Help sports teams thrive by contributing to funds that cover equipment, training, travel expenses, and community sports programs.",
  },
  {
    name: "Burial Services",
    icon: "🕯️",
    description:
      "Offer support and compassion to bereaved families by contributing to funds that assist with funeral arrangements and memorial services.",
  },
  {
    name: "Other",
    icon: "💡",
    description:
      "Explore a wide range of fundraising initiatives, from personal projects to creative endeavors, and contribute to causes that inspire you.",
  },
];

export default function ProjectCards() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.5, type: "spring", bounce: 0.6 },
    }));
  }, [controls]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 p-5">
      {fundraisingCategories.map((category, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          custom={index}
        >
          <Card className="shadow-lg shadow-amber-700/20 h-[220px] md:h-[250px] bg-gray-800 text-white hover:bg-gray-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {category.name}
                <span className="text-2xl">{category.icon}</span>
              </CardTitle>
            </CardHeader>
            <Separator className="bg-gray-600 mb-4" />
            <CardContent className="flex-grow">
              <CardDescription className="text-sm md:text-base mt-2 text-gray-300">
                {category.description}
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
