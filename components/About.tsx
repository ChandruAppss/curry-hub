"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Award, Leaf, ChefHat } from "lucide-react";

const stats = [
  { value: 15, suffix: "+", label: "Years Experience", icon: Award },
  { value: 10000, suffix: "+", label: "Happy Customers", icon: Leaf },
  { value: 80, suffix: "+", label: "Signature Dishes", icon: ChefHat },
];

function CounterNumber({
  value,
  suffix,
  isVisible,
}: {
  value: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span className="counter-number">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerChildren = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 lg:py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left — Images */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative"
          >
            <motion.div
              variants={fadeUp}
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=85"
                alt="Curry Hub Restaurant Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>

            {/* Floating accent card */}
            <motion.div
              variants={fadeUp}
              className="absolute -bottom-6 -right-6 lg:-right-10 glass-dark rounded-2xl p-6 w-52 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                <span className="text-xs text-white/60 uppercase tracking-widest">
                  Established
                </span>
              </div>
              <p className="font-playfair text-3xl font-bold gold-text">2009</p>
              <p className="text-sm text-white/50 mt-1">
                Bangkok's Finest Indian Cuisine
              </p>
            </motion.div>

            {/* Decorative element */}
            <div className="absolute -top-8 -left-8 w-32 h-32 border border-primary/20 rounded-full" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border border-primary/40 rounded-full" />
          </motion.div>

          {/* Right — Content */}
          <motion.div
            variants={staggerChildren}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <div className="section-tag mb-4">Our Story</div>
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white leading-tight">
                Welcome to{" "}
                <span className="gold-text">Curry Hub</span>
              </h2>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-4">
              <p className="text-white/70 leading-relaxed">
                Nestled in the vibrant heart of Bangkok, Curry Hub is a
                celebration of India's rich culinary heritage. Since 2009, we
                have been bringing the authentic tastes, aromas, and traditions
                of Indian cooking to the people of Thailand and beyond.
              </p>
              <p className="text-white/70 leading-relaxed">
                Every dish on our menu is crafted from family recipes passed
                down through generations — using hand-selected whole spices,
                farm-fresh produce, and cooking techniques refined over decades.
                From the smoky depths of our clay tandoor oven to the silky
                richness of our slow-simmered curries, each meal is a journey to
                the heart of India.
              </p>
              <p className="text-white/70 leading-relaxed">
                Our team of expert Indian chefs, led by Head Chef Rajesh Kumar,
                brings over 20 years of culinary mastery. Combined with warm,
                attentive service and an elegant dining atmosphere, we offer
                more than a meal — we create memories that last a lifetime.
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <hr className="gold-divider my-2" />
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={staggerChildren}
              className="grid grid-cols-3 gap-6"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={fadeUp}
                    className="text-center"
                  >
                    <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <CounterNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      isVisible={isInView}
                    />
                    <p className="text-xs text-white/50 mt-1 leading-tight">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div variants={fadeUp}>
              <button
                onClick={() =>
                  document
                    .getElementById("reservations")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="mt-2 px-8 py-4 bg-gold-gradient text-black font-semibold rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300 inline-block"
              >
                Book Your Experience
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
