"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Jane Muthoni",
    project: "Community Water Project",
    quote:
      "M-Changa made it incredibly easy for us to raise funds for our community water project. The platform's user-friendly interface and wide reach helped us exceed our fundraising goal!",
    image: "/testimonial1.jpg",
  },
  {
    id: 2,
    name: "John Ochieng",
    project: "Education for All",
    quote:
      "Thanks to M-Changa, we were able to provide school supplies to over 500 children in need. The platform's transparency and security features gave our donors peace of mind.",
    image: "/testimonial2.jpg",
  },
  {
    id: 3,
    name: "Mary Wanjiru",
    project: "Medical Fund",
    quote:
      "When my son needed urgent medical care, M-Changa helped us raise funds quickly. The support from the M-Changa community was overwhelming and heartwarming.",
    image: "/testimonial3.jpg",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          What People Are Saying
        </h2>
        <div className="relative h-64">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="flex flex-col items-center text-center">
                <Image
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  width={300}
                  height={300}
                  className="w-20 h-20 rounded-full mb-4"
                />
                <p className="text-lg mb-4 max-w-2xl">
                  {testimonials[currentIndex].quote}
                </p>
                <p className="font-semibold">
                  {testimonials[currentIndex].name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonials[currentIndex].project}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
