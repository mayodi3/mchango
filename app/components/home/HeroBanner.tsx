"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default function HeroBanner() {
  return (
    <section className="relative min-h-[600px] h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden">
      <Image
        src="/hero.jpg"
        alt="Diverse people coming together"
        className="object-cover object-center"
        quality={100}
        fill
        priority
      />
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="absolute top-4 right-4 z-20"
      >
        <Button asChild size="sm" variant="secondary">
          <Link href="/signin">
            Sign In <LogIn />
          </Link>
        </Button>
      </motion.div>
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 mx-w-4xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
        >
          M-changa: Empowering Dreams, One Contribution at a Time.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-6"
        >
          Kenya&apos;s leading platform for seamless and secure online
          fundraising.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8"
        >
          M-Changa connects individuals, communities, and organizations, making
          it easy to raise funds for a wide range of needs—from personal
          projects to social causes.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-black"
          >
            <Link href="/signup">Start Fundraising</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
