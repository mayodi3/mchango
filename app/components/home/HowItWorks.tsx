"use client";

import { motion } from "framer-motion";
import { CreditCard, EditIcon, Share } from "lucide-react";

const steps = [
  {
    title: "Create Your Project",
    description:
      "Easily set up your project, choose a category, and set your fundraising goal.",
    icon: EditIcon,
  },
  {
    title: "Share Your Link",
    description:
      "Generate and share unique links across social media platforms to reach more supporters.",
    icon: Share,
  },
  {
    title: "Collect Contributions",
    description:
      "Securely receive contributions through our convenient M-Pesa integration.",
    icon: CreditCard,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Fundraising Made Easy
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: index === 1 ? -100 : 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full mb-4">
                <step.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
