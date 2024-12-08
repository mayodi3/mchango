"use client";

import React from "react";
import { motion } from "framer-motion";
import ProjectCards from "@/app/components/ProjectCards";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-500 text-white">
      <motion.h2
        className="text-2xl font-semibold text-center mb-8 text-white"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        Fundraising Categories
      </motion.h2>

      <ProjectCards />
    </div>
  );
}
