"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { ChevronLeft, ChevronRight, Star, MessageCircle } from "lucide-react";
import Image from "next/image";
import FloatingParticles from "./FloatingParticles";

const slides = [
  {
    id: 0,
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=90",
    tag: "Restaurant Interior",
    words: ["Authentic", "Indian", "Flavors"],
    sub: "in Bangkok",
  },
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1920&q=90",
    tag: "Signature Dishes",
    words: ["Crafted", "With", "Passion"],
    sub: "Since 2009",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=90",
    tag: "Chef's Creations",
    words: ["A Journey", "Through", "India"],
    sub: "Every Plate Tells a Story",
  },
];

function useIsOpenNow() {
  const [status, setStatus] = useState<"open" | "closed" | null>(null);
  useEffect(() => {
    const bangkokHour = (new Date().getUTCHours() + 7) % 24;
    const bangkokMin = new Date().getUTCMinutes();
    const totalMins = bangkokHour * 60 + bangkokMin;
    setStatus(totalMins >= 11 * 60 && totalMins < 23 * 60 ? "open" : "closed");
  }, []);
  return status;
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const containerRef = useRef<HTMLElement>(null);
  const openStatus = useIsOpenNow();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });
  const contentX = useTransform(springX, [-1, 1], [-14, 14]);
  const contentY = useTransform(springY, [-1, 1], [-9, 9]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      mouseY.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    },
    [mouseX, mouseY]
  );

  const goTo = useCallback((index: number, dir: number) => {
    setDirection(dir);
    setCurrent(index);
  }, []);

  const next = useCallback(
    () => goTo((current + 1) % slides.length, 1),
    [current, goTo]
  );
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length, -1),
    [current, goTo]
  );

  useEffect(() => {
    const timer = setInterval(next, 6500);
    return () => clearInterval(timer);
  }, [next]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? "-100%" : "100%", opacity: 0 }),
  };

  const slide = slides[current];

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-screen overflow-hidden cursor-default"
      onMouseMove={handleMouseMove}
    >
      {/* Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            animate={{ scale: 1 }}
            transition={{ duration: 7.5, ease: "easeOut" }}
          >
            <Image
              src={slide.image}
              alt={slide.tag}
              fill
              priority={current === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/78 via-black/28 to-black/90 z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/72 via-transparent to-transparent z-10" />
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 32%, rgba(0,0,0,0.52) 100%)",
        }}
      />

      <FloatingParticles className="z-10" />

      {/* Gold top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px z-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #d97706 30%, #fbbf24 50%, #d97706 70%, transparent 100%)",
        }}
      />

      {/* Parallax content */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="relative z-20 flex flex-col items-start justify-center h-full max-w-7xl mx-auto px-6 lg:px-16"
      >
        <AnimatePresence mode="wait">
          <motion.div key={`content-${current}`} className="max-w-3xl">
            {/* Tag + Open status */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              className="flex items-center gap-4 mb-7"
            >
              <div className="section-tag">
                <span>{slide.tag}</span>
              </div>
              {openStatus && (
                <span
                  className="flex items-center gap-1.5 text-xs font-semibold tracking-wide px-3 py-1 rounded-full"
                  style={{
                    background:
                      openStatus === "open"
                        ? "rgba(74,222,128,0.12)"
                        : "rgba(255,255,255,0.06)",
                    border:
                      openStatus === "open"
                        ? "1px solid rgba(74,222,128,0.3)"
                        : "1px solid rgba(255,255,255,0.12)",
                    color:
                      openStatus === "open"
                        ? "#86efac"
                        : "rgba(255,255,255,0.45)",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full inline-block"
                    style={{
                      background:
                        openStatus === "open" ? "#4ade80" : "rgba(255,255,255,0.3)",
                      boxShadow:
                        openStatus === "open"
                          ? "0 0 6px rgba(74,222,128,0.6)"
                          : "none",
                    }}
                  />
                  {openStatus === "open" ? "Open Now" : "Opens 11 AM"}
                </span>
              )}
            </motion.div>

            {/* Headline */}
            <h1
              className="font-playfair font-bold text-white leading-[1.05]"
              style={{ perspective: "1000px" }}
            >
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                {slide.words.map((word, i) => (
                  <motion.span
                    key={`${current}-w${i}`}
                    initial={{ opacity: 0, y: 40, rotateX: -25 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.7,
                      delay: 0.35 + i * 0.13,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                    className={`inline-block mr-4 ${i === 1 ? "shimmer-gold" : ""}`}
                  >
                    {word}
                  </motion.span>
                ))}
              </span>

              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.75 }}
                className="block text-2xl sm:text-3xl lg:text-4xl text-white/45 mt-3 font-light tracking-wide"
              >
                {slide.sub}
              </motion.span>
            </h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.92 }}
              className="mt-7 text-base lg:text-lg text-white/58 max-w-md leading-relaxed"
            >
              Experience rich spices, traditional recipes, and unforgettable
              dining — where every dish tells a story of India.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="mt-9 flex flex-wrap gap-4"
            >
              {/* Primary CTA */}
              <div className="relative">
                <motion.button
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 20px 60px rgba(217,119,6,0.55)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollTo("reservations")}
                  className="relative px-8 py-4 text-black font-bold text-sm tracking-wide rounded-full z-10"
                  style={{
                    background: "linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)",
                  }}
                >
                  Reserve a Table
                </motion.button>
              </div>

              {/* Secondary CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("dishes")}
                className="px-8 py-4 border border-white/25 text-white font-semibold text-sm rounded-full backdrop-blur-sm hover:border-primary/65 hover:text-primary transition-all duration-300"
              >
                View Menu
              </motion.button>

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/66643073879?text=Hi!%20I%27d%20like%20to%20book%20a%20table%20at%20Curry%20Hub%20Bangkok."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="hidden sm:flex items-center gap-2 px-6 py-4 border border-emerald-500/30 text-emerald-400/80 font-medium text-sm rounded-full backdrop-blur-sm hover:border-emerald-400/60 hover:text-emerald-300 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </motion.a>
            </motion.div>

            {/* Social proof strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.35 }}
              className="mt-7 flex items-center gap-4 flex-wrap"
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-white font-semibold text-sm">4.8</span>
                <span className="text-white/35 text-sm">/ 5 · 324+ Google Reviews</span>
              </div>
              <span className="hidden sm:block text-white/15">·</span>
              <span className="hidden sm:block text-white/40 text-xs tracking-wide">
                Bangkok&apos;s Most Loved Indian Restaurant
              </span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Slide counter */}
      <div className="absolute bottom-24 right-6 lg:right-16 z-20 flex flex-col items-end gap-2">
        <span className="text-[10px] text-white/28 tracking-[0.22em] uppercase font-inter">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(slides.length).padStart(2, "0")}
        </span>
        <div className="flex gap-2 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              className="rounded-full transition-all duration-500"
              style={{
                width: i === current ? "2.5rem" : "0.9rem",
                height: "0.2rem",
                background:
                  i === current
                    ? "linear-gradient(90deg, #d97706, #fbbf24)"
                    : "rgba(255,255,255,0.22)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-all duration-300 border border-white/10 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full glass flex items-center justify-center text-white hover:text-primary hover:border-primary/50 transition-all duration-300 border border-white/10 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 scroll-indicator">
        <span className="text-[9px] text-white/30 tracking-[0.28em] uppercase">
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{
            background: "linear-gradient(to bottom, #d97706, transparent)",
          }}
        />
      </div>
    </section>
  );
}
