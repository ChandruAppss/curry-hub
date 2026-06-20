"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Sprout, ChefHat, Crown } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Authentic Recipes",
    description:
      "Our dishes follow recipes passed down through generations, unchanged for centuries. Every spice blend, every cooking method is rooted in the rich culinary traditions of North and South India.",
    color: "from-amber-600/20 to-amber-400/5",
    border: "border-amber-500/20 hover:border-amber-500/50",
    iconBg: "bg-amber-500/10 text-amber-400",
  },
  {
    icon: Sprout,
    title: "Fresh Ingredients",
    description:
      "We source the finest produce daily. Our spices are imported directly from India, our meats are locally sourced from certified farms, and our dairy is fresh and farm-sourced — no compromises.",
    color: "from-green-600/20 to-green-400/5",
    border: "border-green-500/20 hover:border-green-500/50",
    iconBg: "bg-green-500/10 text-green-400",
  },
  {
    icon: ChefHat,
    title: "Expert Chefs",
    description:
      "Our culinary team is led by Head Chef Rajesh Kumar, a Mumbai-trained master with over 20 years of experience across five-star hotels in India, the UAE, and Southeast Asia.",
    color: "from-blue-600/20 to-blue-400/5",
    border: "border-blue-500/20 hover:border-blue-500/50",
    iconBg: "bg-blue-500/10 text-blue-400",
  },
  {
    icon: Crown,
    title: "Premium Dining",
    description:
      "From the moment you arrive, our attentive team ensures an exceptional experience. Our elegantly designed dining room, curated music, and personalised service make every visit memorable.",
    color: "from-purple-600/20 to-purple-400/5",
    border: "border-purple-500/20 hover:border-purple-500/50",
    iconBg: "bg-purple-500/10 text-purple-400",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.06)_0%,transparent_70%)]" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag justify-center mb-4">
            <span>The Curry Hub Difference</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white">
            Why Choose <span className="gold-text">Us</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto leading-relaxed">
            We are not just a restaurant. We are a commitment to authenticity,
            quality, and an unparalleled dining experience.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className={`group relative p-8 rounded-2xl bg-gradient-to-b ${feature.color} border ${feature.border} transition-all duration-400 cursor-default`}
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl ${feature.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className="font-playfair text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="text-sm text-white/60 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-white/50 text-sm mb-6">
            Rated{" "}
            <span className="text-primary font-semibold">4.8 / 5.0</span> by
            over 324 diners on Google Reviews
          </p>
          <button
            onClick={() =>
              document
                .getElementById("reservations")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 bg-gold-gradient text-black font-semibold rounded-full hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
          >
            Experience It Tonight
          </button>
        </motion.div>
      </div>
    </section>
  );
}
