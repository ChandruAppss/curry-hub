"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const slides = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=90",
    tag: "Restaurant Interior",
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=90",
    tag: "Signature Dishes",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=90",
    tag: "Chef's Creations",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrent(index);
    },
    []
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1);
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToReservations = () => {
    document
      .getElementById("reservations")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].image}
            alt={slides[current].tag}
            fill
            priority={current === 0}
            className="object-cover"
            sizes="100vw"
          />
          {/* Ken Burns effect overlay */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6.5, ease: "easeOut" }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent z-10" />

      {/* Decorative spice border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gold-gradient z-20" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-6 lg:px-16">
        <motion.div
          key={`content-${current}`}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="section-tag mb-6">
            <span>{slides[current].tag}</span>
          </div>

          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight max-w-3xl">
            Authentic Indian
            <span className="block gold-text glow-text">Flavors</span>
            <span className="block">in Bangkok</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-white/70 max-w-xl font-inter leading-relaxed">
            Experience rich spices, traditional recipes, and unforgettable
            dining at Curry Hub — where every dish tells a story of India.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToReservations}
              className="px-8 py-4 bg-gold-gradient text-black font-semibold text-base rounded-full shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-shadow duration-300"
            >
              Reserve a Table
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={scrollToMenu}
              className="px-8 py-4 border border-white/30 text-white font-semibold text-base rounded-full backdrop-blur-sm hover:border-primary hover:text-primary transition-all duration-300"
            >
              View Our Menu
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i, i > current ? 1 : -1)}
            className={`h-1 rounded-full transition-all duration-500 ${
              i === current ? "w-10 bg-primary" : "w-4 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow Controls */}
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary transition-all duration-300 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:bg-primary/20 hover:border-primary transition-all duration-300 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-xs text-white/50 tracking-widest uppercase">
          Scroll
        </span>
        <ChevronDown className="w-5 h-5 text-primary" />
      </div>
    </section>
  );
}
