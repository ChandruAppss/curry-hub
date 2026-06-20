"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    src: "/gallery/Restaurant.webp",
    alt: "Curry Hub Restaurant",
    span: "wide",
  },
  {
    src: "/gallery/Interior.webp",
    alt: "Restaurant Interior",
    span: "tall",
  },
  {
    src: "/gallery/Curry Hub Chicken Biriyani.webp",
    alt: "Chicken Biryani",
    span: "normal",
  },
  {
    src: "/gallery/Malai chicken tikka.webp",
    alt: "Malai Chicken Tikka",
    span: "normal",
  },
  {
    src: "/gallery/Paneer tikka.webp",
    alt: "Paneer Tikka",
    span: "tall",
  },
  {
    src: "/gallery/Curry Hub Samosa.webp",
    alt: "Samosa",
    span: "normal",
  },
  {
    src: "/gallery/Curry Hub Cutlet.webp",
    alt: "Cutlet",
    span: "normal",
  },
  {
    src: "/gallery/Gulab Jamun.webp",
    alt: "Gulab Jamun",
    span: "normal",
  },
  {
    src: "/gallery/Rasa malai.webp",
    alt: "Rasmalai",
    span: "normal",
  },
  {
    src: "/gallery/Curry Hub Naan & Chai.webp",
    alt: "Naan & Chai",
    span: "wide",
  },
  {
    src: "/gallery/Curry hub dish.webp",
    alt: "Curry Hub Special Dish",
    span: "normal",
  },
  {
    src: "/gallery/Curry hub dish 1.webp",
    alt: "Curry Hub Dish",
    span: "normal",
  },
  {
    src: "/gallery/Dish 1.webp",
    alt: "Chef's Special",
    span: "tall",
  },
  {
    src: "/gallery/Dish 2.webp",
    alt: "Signature Dish",
    span: "normal",
  },
  {
    src: "/gallery/Dish 3.webp",
    alt: "House Special",
    span: "normal",
  },
  {
    src: "/gallery/Dish 4.webp",
    alt: "Daily Special",
    span: "normal",
  },
  {
    src: "/gallery/Dish.webp",
    alt: "Featured Dish",
    span: "wide",
  },
  {
    src: "/gallery/Foods.webp",
    alt: "Food Spread",
    span: "normal",
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const openLightbox = (i: number) => setLightbox(i);
  const closeLightbox = () => setLightbox(null);

  const prevImage = () => {
    if (lightbox !== null)
      setLightbox((lightbox - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    if (lightbox !== null) setLightbox((lightbox + 1) % images.length);
  };

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag justify-center mb-4">
            <span>Visual Journey</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white">
            Our <span className="gold-text">Gallery</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto">
            A glimpse into the world of Curry Hub — vibrant flavours, stunning
            presentations, and an atmosphere like no other.
          </p>
        </motion.div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="break-inside-avoid group relative cursor-pointer rounded-xl overflow-hidden"
              onClick={() => openLightbox(i)}
            >
              <div
                className={`relative w-full ${
                  img.span === "tall"
                    ? "aspect-[3/4]"
                    : img.span === "wide"
                    ? "aspect-[4/3]"
                    : "aspect-square"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-black" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm font-medium text-white">{img.alt}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
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
              className="absolute top-6 right-6 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 lg:left-8 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-4xl max-h-[80vh] w-full mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-[70vh] rounded-xl overflow-hidden">
                <Image
                  src={images[lightbox].src}
                  alt={images[lightbox].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              <p className="text-center text-white/60 mt-4 text-sm">
                {images[lightbox].alt} — {lightbox + 1} / {images.length}
              </p>
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 lg:right-8 w-12 h-12 rounded-full glass flex items-center justify-center text-white hover:text-primary transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
