"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";

const dishes = [
  {
    name: "Butter Chicken",
    description:
      "Tender chicken in a velvety tomato-cream sauce, slow-cooked with aromatic spices and a touch of kashmiri chilli.",
    price: "฿320",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=85",
    badge: "Best Seller",
    rating: 4.9,
  },
  {
    name: "Chicken Tikka Masala",
    description:
      "Char-grilled chicken tikka folded into a rich, spiced masala gravy — a timeless classic from the tandoor.",
    price: "฿340",
    image:
      "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=85",
    badge: "Chef's Pick",
    rating: 4.8,
  },
  {
    name: "Paneer Butter Masala",
    description:
      "Fresh cottage cheese cubes bathed in a luxuriously creamy tomato gravy, seasoned with whole aromatic spices.",
    price: "฿280",
    image:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=85",
    badge: "Vegetarian",
    rating: 4.7,
  },
  {
    name: "Dum Biryani",
    description:
      "Fragrant basmati rice layered with saffron, caramelised onions, and succulent meat — slow-cooked in the dum style.",
    price: "฿380",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=85",
    badge: "Signature",
    rating: 4.9,
  },
  {
    name: "Garlic Naan",
    description:
      "Pillowy, hand-stretched flatbread baked in our clay tandoor, brushed with garlic butter and fresh coriander.",
    price: "฿80",
    image:
      "https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=600&q=85",
    badge: "Must Try",
    rating: 4.8,
  },
  {
    name: "Tandoori Chicken",
    description:
      "Bone-in chicken marinated overnight in yoghurt and spices, roasted to perfection in our 450°C clay tandoor.",
    price: "฿360",
    image:
      "https://images.unsplash.com/photo-1610057099431-d73a1c9d2f2f?w=600&q=85",
    badge: "Popular",
    rating: 4.8,
  },
];

const badgeColors: Record<string, string> = {
  "Best Seller": "bg-primary text-black",
  "Chef's Pick": "bg-white text-black",
  Vegetarian: "bg-green-600 text-white",
  Signature: "bg-gradient-to-r from-primary to-accent text-black",
  "Must Try": "bg-orange-600 text-white",
  Popular: "bg-white/20 text-white border border-white/30",
};

export default function SignatureDishes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="dishes" className="py-24 lg:py-32 bg-background">
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
            <span>Our Specialties</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white">
            Signature{" "}
            <span className="gold-text">Dishes</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto leading-relaxed">
            Handcrafted by our award-winning chefs using century-old recipes and
            the finest imported spices from India.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative bg-surface rounded-2xl overflow-hidden border border-white/5 card-hover cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />

                {/* Badge */}
                <span
                  className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${
                    badgeColors[dish.badge] ?? "bg-primary/20 text-primary"
                  }`}
                >
                  {dish.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-playfair text-xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                    {dish.name}
                  </h3>
                  <span className="font-playfair text-xl font-bold gold-text ml-3 shrink-0">
                    {dish.price}
                  </span>
                </div>

                <p className="text-sm text-white/60 leading-relaxed mb-4">
                  {dish.description}
                </p>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className={`w-3.5 h-3.5 ${
                        j < Math.floor(dish.rating)
                          ? "fill-primary text-primary"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-white/40 ml-2">
                    {dish.rating}
                  </span>
                </div>
              </div>

              {/* Hover border */}
              <div className="absolute inset-0 rounded-2xl border border-primary/0 group-hover:border-primary/30 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button
            onClick={() =>
              document
                .getElementById("menu")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-4 border border-primary text-primary font-semibold rounded-full hover:bg-primary hover:text-black transition-all duration-300"
          >
            View Full Menu
          </button>
        </motion.div>
      </div>
    </section>
  );
}
