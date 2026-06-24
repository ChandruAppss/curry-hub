"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Sarah Thompson",
    role: "Food Blogger",
    location: "Bangkok",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    rating: 5,
    text: "Hands down the best Indian restaurant in Bangkok. The butter chicken is so authentic it took me straight back to Delhi. The ambience is stunning — dark, elegant, and intimate. A must-visit!",
    dish: "Butter Chicken & Garlic Naan",
    platform: "Google",
  },
  {
    name: "James Patel",
    role: "Business Traveller",
    location: "London",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "As someone who grew up eating Indian food in London, I was sceptical. But Curry Hub absolutely delivers. The lamb rogan josh was perfectly spiced, the naan was pillowy and fresh. Exceptional.",
    dish: "Lamb Rogan Josh & Peshwari Naan",
    platform: "TripAdvisor",
  },
  {
    name: "Priya Sharma",
    role: "Local Resident",
    location: "Bangkok",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "I celebrate every special occasion here. The staff remember my preferences, the food is consistently outstanding, and the atmosphere feels genuinely special. My favourite restaurant in all of Bangkok.",
    dish: "Paneer Butter Masala & Biryani",
    platform: "Google",
  },
  {
    name: "Michael Chen",
    role: "Foodie & Traveller",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "The tandoori chicken here rivals anything I've had in India. Perfectly charred on the outside, incredibly juicy inside. The spice balance is just right — complex, deep, not just hot. World-class cooking.",
    dish: "Tandoori Chicken & Dal Makhani",
    platform: "TripAdvisor",
  },
  {
    name: "Emma Dubois",
    role: "Expat & Food Enthusiast",
    location: "Bangkok",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    rating: 5,
    text: "Finally an Indian restaurant that doesn't compromise! Every ingredient tastes fresh, the service is warm and attentive, and the mango lassi is out of this world. This place has won my heart.",
    dish: "Chicken Tikka Masala & Mango Lassi",
    platform: "Google",
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next]);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5);
    const y = ((e.clientY - rect.top) / rect.height - 0.5);
    cardRef.current.style.transform = `perspective(1000px) rotateY(${x * 7}deg) rotateX(${-y * 5}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 70 : -70, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -70 : 70, opacity: 0 }),
  };

  const review = reviews[current];

  return (
    <section className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(217,119,6,0.05) 0%, transparent 70%)" }} />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-16"
        >
          <div className="section-tag justify-center mb-4">
            <span>Guest Experiences</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white">
            What Our Guests <span className="shimmer-gold">Say</span>
          </h2>

          {/* Rating summary */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-white font-bold text-lg">4.8</span>
            <span className="text-white/35 text-sm">/ 5.0 · 324 verified reviews</span>
          </div>

          {/* Platform badges */}
          <div className="mt-4 flex items-center justify-center gap-3">
            {["Google", "TripAdvisor"].map((p) => (
              <span key={p} className="text-xs px-3 py-1 rounded-full font-medium"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}>
                {p}
              </span>
            ))}
          </div>
        </motion.div>

        {/* 3D tilt card */}
        <div
          className="relative min-h-[300px] flex items-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Large decorative quote */}
          <span
            className="deco-quote absolute -top-4 left-0 lg:left-4 pointer-events-none select-none"
            aria-hidden="true"
          >
            "
          </span>

          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full"
            >
              <div
                ref={cardRef}
                className="glass-luxury rounded-2xl p-8 lg:p-12 review-card-3d"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>

                {/* Quote text */}
                <p className="font-playfair text-xl lg:text-2xl text-white/88 italic leading-relaxed mb-8 max-w-3xl mx-auto text-center">
                  "{review.text}"
                </p>

                {/* Dish ordered */}
                <div className="text-center mb-7">
                  <span className="text-xs uppercase tracking-widest text-white/30 mr-2">Ordered:</span>
                  <span className="text-sm font-medium" style={{ color: "rgba(217,119,6,0.75)" }}>
                    {review.dish}
                  </span>
                </div>

                {/* Reviewer */}
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden"
                    style={{ border: "2px solid rgba(217,119,6,0.35)" }}>
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-white">{review.name}</p>
                    <p className="text-sm text-white/38">
                      {review.role} · {review.location}
                    </p>
                  </div>
                  <span className="ml-3 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{ background: "rgba(217,119,6,0.12)", color: "rgba(217,119,6,0.8)", border: "1px solid rgba(217,119,6,0.2)" }}>
                    via {review.platform}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot navigation */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-400"
              style={{
                width: i === current ? "2rem" : "0.5rem",
                height: "0.5rem",
                background: i === current
                  ? "linear-gradient(90deg, #d97706, #fbbf24)"
                  : "rgba(255,255,255,0.18)",
              }}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
