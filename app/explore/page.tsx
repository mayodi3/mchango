"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import ProjectCards from "../components/ProjectCards";

export default function ExploreProjectsPage() {
  const [typedText, setTypedText] = useState("");
  const fullText =
    "M-Chango is your one-stop solution for social fundraising. Create, share, and manage your projects with ease. Together, let's build a brighter future.";

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-500 to-gray-800 text-white">
      <section className="relative overflow-hidden py-10 md:py-22">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, type: "spring", bounce: 0.7 }}
            >
              Welcome To Mchango
            </motion.h1>
            <motion.p
              className="mt-3 text-xl font-medium sm:text-2xl md:mt-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Simple. Secure. Social. Fundraising
            </motion.p>
            <p className="mx-auto mt-3 max-w-md text-base sm:text-lg md:mt-5 md:max-w-3xl h-24 sm:h-20">
              {typedText}
            </p>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center justify-center mb-10 space-y-4">
        <div className="flex-col md:flex-row space-y-2 gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <Link href="/signin">
              <Button size="lg" className="w-48">
                Sign In
              </Button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link href="/signup">
              <Button size="lg" className="w-48">
                Sign Up
              </Button>
            </Link>
          </motion.div>
        </div>
        <motion.p
          className="text-sm mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Sign in or create an account to start your fundraiser
        </motion.p>
      </div>
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
