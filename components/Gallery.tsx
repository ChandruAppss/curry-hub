"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

type GalleryImage = {
  src: string;
  alt: string;
  span: "wide" | "tall" | "normal";
  category: "Restaurant" | "Food" | "Desserts";
};

const images: GalleryImage[] = [
  { src: "/gallery/Restaurant.webp", alt: "Curry Hub Restaurant", span: "wide", category: "Restaurant" },
  { src: "/gallery/Interior.webp", alt: "Restaurant Interior", span: "tall", category: "Restaurant" },
  { src: "/gallery/Curry Hub Chicken Biriyani.webp", alt: "Chicken Biryani", span: "normal", category: "Food" },
  { src: "/gallery/Malai chicken tikka.webp", alt: "Malai Chicken Tikka", span: "normal", category: "Food" },
  { src: "/gallery/Paneer tikka.webp", alt: "Paneer Tikka", span: "tall", category: "Food" },
  { src: "/gallery/Curry Hub Samosa.webp", alt: "Samosa", span: "normal", category: "Food" },
  { src: "/gallery/Curry Hub Cutlet.webp", alt: "Cutlet", span: "normal", category: "Food" },
  { src: "/gallery/Gulab Jamun.webp", alt: "Gulab Jamun", span: "normal", category: "Desserts" },
  { src: "/gallery/Rasa malai.webp", alt: "Rasmalai", span: "normal", category: "Desserts" },
  { src: "/gallery/Curry Hub Naan & Chai.webp", alt: "Naan & Chai", span: "wide", category: "Food" },
  { src: "/gallery/Curry hub dish.webp", alt: "Curry Hub Special Dish", span: "normal", category: "Food" },
  { src: "/gallery/Curry hub dish 1.webp", alt: "Curry Hub Dish", span: "normal", category: "Food" },
  { src: "/gallery/Dish 1.webp", alt: "Chef's Special", span: "tall", category: "Food" },
  { src: "/gallery/Dish 2.webp", alt: "Signature Dish", span: "normal", category: "Food" },
  { src: "/gallery/Dish 3.webp", alt: "House Special", span: "normal", category: "Food" },
  { src: "/gallery/Dish 4.webp", alt: "Daily Special", span: "normal", category: "Food" },
  { src: "/gallery/Dish.webp", alt: "Featured Dish", span: "wide", category: "Food" },
  { src: "/gallery/Foods.webp", alt: "Food Spread", span: "normal", category: "Food" },
  { src: "/gallery/Restaurant Bar.jpg", alt: "Restaurant Bar & Lounge", span: "wide", category: "Restaurant" },
  { src: "/gallery/Feast Spread.jpg", alt: "Indian Feast Spread", span: "wide", category: "Food" },
  { src: "/gallery/Butter Chicken.jpg", alt: "Butter Chicken", span: "normal", category: "Food" },
  { src: "/gallery/Tandoori Chicken.jpg", alt: "Tandoori Chicken", span: "normal", category: "Food" },
  { src: "/gallery/Lamb Biryani Platter.jpg", alt: "Lamb Biryani Platter", span: "normal", category: "Food" },
  { src: "/gallery/Chicken Biryani Steam.jpg", alt: "Steaming Chicken Biryani", span: "tall", category: "Food" },
  { src: "/gallery/Dal Makhani.jpg", alt: "Dal Makhani", span: "normal", category: "Food" },
  { src: "/gallery/Spice Flat Lay.jpg", alt: "Spices & Dishes", span: "normal", category: "Food" },
];

const FILTERS = ["All", "Restaurant", "Food", "Desserts"] as const;
type Filter = (typeof FILTERS)[number];

function GalleryItem({
  img,
  index,
  onClick,
}: {
  img: GalleryImage;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.55, delay: (index % 6) * 0.07, ease: [0.23, 1, 0.32, 1] }}
      className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden mb-4 shadow-sm hover:shadow-lg transition-shadow duration-300"
      onClick={onClick}
    >
      <div
        className={`relative w-full ${
          img.span === "tall" ? "aspect-[3/4]" : img.span === "wide" ? "aspect-[4/3]" : "aspect-square"
        }`}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />

        {/* Zoom icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: "rgba(217,119,6,0.9)", backdropFilter: "blur(8px)" }}
          >
            <ZoomIn className="w-5 h-5 text-black" />
          </div>
        </div>

        {/* Caption slide */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
        >
          <p className="text-sm font-medium text-white">{img.alt}</p>
          <p className="text-xs text-white/55 mt-0.5 capitalize">{img.category}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const filtered = activeFilter === "All" ? images : images.filter((i) => i.category === activeFilter);

  const closeLightbox = () => setLightbox(null);
  const prevImage = () => {
    if (lightbox !== null) setLightbox((lightbox - 1 + filtered.length) % filtered.length);
  };
  const nextImage = () => {
    if (lightbox !== null) setLightbox((lightbox + 1) % filtered.length);
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-10"
        >
          <div className="section-tag justify-center mb-4">
            <span>Visual Journey</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900">
            Our <span className="shimmer-gold">Gallery</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            A glimpse into the world of Curry Hub — vibrant flavours, stunning presentations,
            and an atmosphere like no other.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => { setActiveFilter(f); setLightbox(null); }}
              className={`filter-pill ${activeFilter === f ? "active" : ""}`}
            >
              {f}
              {f !== "All" && (
                <span className="ml-1.5 text-[10px] opacity-55">
                  ({images.filter((i) => i.category === f).length})
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="columns-2 md:columns-3 gap-4"
          >
            {filtered.map((img, i) => (
              <GalleryItem key={img.src} img={img} index={i} onClick={() => setLightbox(i)} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Lightbox — stays dark (full screen overlay) */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-11 h-11 rounded-full glass flex items-center justify-center text-gray-800 hover:text-primary transition-colors z-10"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 lg:left-8 w-11 h-11 rounded-full glass flex items-center justify-center text-gray-800 hover:text-primary transition-colors group"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl w-full mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[72vh] rounded-2xl overflow-hidden glass-luxury">
                <Image
                  src={filtered[lightbox].src}
                  alt={filtered[lightbox].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-white/85 font-medium">{filtered[lightbox].alt}</p>
                <p className="text-white/40 text-sm mt-1">
                  {lightbox + 1} / {filtered.length} · {filtered[lightbox].category}
                </p>
              </div>
            </motion.div>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 lg:right-8 w-11 h-11 rounded-full glass flex items-center justify-center text-gray-800 hover:text-primary transition-colors group"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
