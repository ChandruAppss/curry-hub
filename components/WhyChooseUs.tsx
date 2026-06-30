"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BookOpen, Sprout, ChefHat, Crown } from "lucide-react";

const features = [
  {
    num: "01",
    icon: BookOpen,
    title: "Authentic Recipes",
    description:
      "Our dishes follow recipes passed down through generations — unchanged for centuries. Every spice blend and cooking method is rooted in the rich culinary traditions of North and South India.",
  },
  {
    num: "02",
    icon: Sprout,
    title: "Fresh Ingredients",
    description:
      "We source the finest produce daily. Our spices are imported directly from India, our meats from certified Thai farms, our dairy fresh and farm-sourced. No compromises, ever.",
  },
  {
    num: "03",
    icon: ChefHat,
    title: "Expert Chefs",
    description:
      "Our team is led by Head Chef Rajesh Kumar, Mumbai-trained with over 20 years across five-star hotels in India, the UAE, and Southeast Asia. Every plate bears his signature.",
  },
  {
    num: "04",
    icon: Crown,
    title: "Premium Dining",
    description:
      "From the moment you arrive, our attentive team ensures an exceptional experience. An elegantly designed room, curated music, and personalised service make every visit memorable.",
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top center, rgba(217,119,6,0.04) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <div className="section-tag justify-center mb-4">
            <span>The Curry Hub Difference</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900">
            Why Choose <span className="shimmer-gold">Us</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            We are not just a restaurant — we are a commitment to authenticity,
            quality, and an unparalleled dining experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.11 }}
                className="group relative p-7 rounded-2xl overflow-hidden cursor-default bg-white"
                style={{
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                  transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(217,119,6,0.3)";
                  el.style.boxShadow = "0 16px 50px rgba(0,0,0,0.1), 0 0 30px rgba(217,119,6,0.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,0,0,0.07)";
                  el.style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)";
                }}
              >
                <span
                  className="absolute top-4 right-5 font-playfair font-bold text-6xl leading-none select-none pointer-events-none"
                  style={{ color: "rgba(217,119,6,0.07)" }}
                >
                  {feature.num}
                </span>

                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "rgba(217,119,6,0.1)" }}
                >
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-playfair text-lg font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                  {feature.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>

                <div
                  className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl"
                  style={{
                    background: "linear-gradient(90deg, transparent, #d97706, #fbbf24, transparent)",
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-gray-400 text-sm mb-6">
            Rated{" "}
            <span className="text-primary font-semibold">4.8 / 5.0</span> by
            over{" "}
            <span className="text-gray-700 font-medium">324 diners</span> on
            Google Reviews
          </p>
          <button
            onClick={() =>
              document
                .getElementById("reservations")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-10 py-4 text-black font-semibold rounded-full text-sm hover:shadow-xl hover:shadow-primary/25 hover:scale-105 transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)" }}
          >
            Experience It Tonight
          </button>
        </motion.div>
      </div>
    </section>
  );
}
