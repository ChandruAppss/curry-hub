"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote } from "lucide-react";
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
  },
  {
    name: "James Patel",
    role: "Business Traveller",
    location: "London",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    rating: 5,
    text: "As someone who grew up eating Indian food in London, I was sceptical. But Curry Hub absolutely delivers. The lamb rogan josh was perfectly spiced, the naan was pillowy and fresh. Exceptional.",
    dish: "Lamb Rogan Josh & Peshwari Naan",
  },
  {
    name: "Priya Sharma",
    role: "Local Resident",
    location: "Bangkok",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    rating: 5,
    text: "I celebrate every special occasion here. The staff remember my preferences, the food is consistently outstanding, and the atmosphere feels genuinely special. My favourite restaurant in all of Bangkok.",
    dish: "Paneer Butter Masala & Biryani",
  },
  {
    name: "Michael Chen",
    role: "Foodie & Traveller",
    location: "Singapore",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    rating: 5,
    text: "The tandoori chicken here rivals anything I've had in India. Perfectly charred on the outside, incredibly juicy inside. The spice balance is just right — complex, deep, not just hot. World-class cooking.",
    dish: "Tandoori Chicken & Dal Makhani",
  },
  {
    name: "Emma Dubois",
    role: "Expat & Food Enthusiast",
    location: "Bangkok",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    rating: 5,
    text: "Finally an Indian restaurant that doesn't compromise! Every ingredient tastes fresh, the service is warm and attentive, and the mango lassi is out of this world. This place has won my heart.",
    dish: "Chicken Tikka Masala & Mango Lassi",
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const review = reviews[current];

  return (
    <section className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.05)_0%,transparent_70%)]" />

      <div className="relative max-w-5xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag justify-center mb-4">
            <span>Guest Experiences</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white">
            What Our Guests <span className="gold-text">Say</span>
          </h2>

          {/* Overall rating */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-primary text-primary" />
              ))}
            </div>
            <span className="text-white font-semibold">4.8</span>
            <span className="text-white/40 text-sm">/ 5.0 · 324 reviews</span>
          </div>
        </motion.div>

        {/* Review Card */}
        <div className="relative min-h-[320px] flex items-center">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={current}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="glass-dark rounded-2xl p-8 lg:p-12 text-center">
                <Quote className="w-10 h-10 text-primary/40 mx-auto mb-6" />

                <p className="font-playfair text-xl lg:text-2xl text-white/90 italic leading-relaxed mb-8 max-w-3xl mx-auto">
                  "{review.text}"
                </p>

                <p className="text-sm text-primary/70 mb-6 font-medium">
                  Ordered: {review.dish}
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/30">
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
                    <p className="text-sm text-white/40">
                      {review.role} · {review.location}
                    </p>
                  </div>
                  <div className="flex ml-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-400 ${
                i === current ? "w-8 h-2 bg-primary" : "w-2 h-2 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Review ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
