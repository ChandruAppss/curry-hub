"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Star, ArrowRight } from "lucide-react";

const dishes = [
  {
    name: "Butter Chicken",
    description:
      "Tender chicken in a velvety tomato-cream sauce, slow-cooked with aromatic spices and a touch of Kashmiri chilli.",
    price: "฿320",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&q=85",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 142,
  },
  {
    name: "Chicken Tikka Masala",
    description:
      "Char-grilled tikka folded into a rich, smoky masala gravy — a timeless classic from our clay tandoor.",
    price: "฿340",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&q=85",
    badge: "Chef's Pick",
    rating: 4.8,
    reviews: 98,
  },
  {
    name: "Paneer Butter Masala",
    description:
      "Fresh cottage cheese bathed in a luxuriously creamy tomato gravy, seasoned with hand-ground whole spices.",
    price: "฿280",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=85",
    badge: "Vegetarian",
    rating: 4.7,
    reviews: 87,
  },
  {
    name: "Dum Biryani",
    description:
      "Fragrant basmati rice layered with saffron, caramelised onions and succulent meat, slow-cooked sealed.",
    price: "฿380",
    image: "/gmb/gmb-8.jpg",
    badge: "Signature",
    rating: 4.9,
    reviews: 115,
  },
  {
    name: "Tandoori Chicken",
    description:
      "Bone-in chicken marinated overnight in yoghurt and spices, roasted in our 450°C clay tandoor oven.",
    price: "฿480",
    image: "/gmb/gmb-6.jpg",
    badge: "Popular",
    rating: 4.8,
    reviews: 104,
  },
  {
    name: "Garlic Naan",
    description:
      "Hand-stretched flatbread baked in our clay tandoor, brushed generously with garlic butter and fresh coriander.",
    price: "฿80",
    image: "/gallery/Curry Hub Naan & Chai.webp",
    badge: "Must Try",
    rating: 4.8,
    reviews: 201,
  },
];

const badgeStyle: Record<string, React.CSSProperties> = {
  "Best Seller": {
    background: "linear-gradient(135deg, #d97706, #f59e0b)",
    color: "#0f0f0f",
  },
  "Chef's Pick": {
    background: "rgba(0,0,0,0.07)",
    border: "1px solid rgba(0,0,0,0.15)",
    color: "rgba(0,0,0,0.7)",
  },
  Vegetarian: {
    background: "rgba(22,163,74,0.1)",
    border: "1px solid rgba(22,163,74,0.25)",
    color: "#16a34a",
  },
  Signature: {
    background: "linear-gradient(135deg, #d97706, #fbbf24)",
    color: "#0f0f0f",
  },
  Popular: {
    background: "rgba(217,119,6,0.1)",
    border: "1px solid rgba(217,119,6,0.25)",
    color: "#b45309",
  },
  "Must Try": {
    background: "rgba(217,119,6,0.12)",
    border: "1px solid rgba(217,119,6,0.3)",
    color: "#d97706",
  },
};

export default function SignatureDishes() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="dishes" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(217,119,6,0.05) 0%, transparent 60%)",
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
            <span>Our Specialties</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900">
            Signature <span className="shimmer-gold">Dishes</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Handcrafted by our chefs using century-old recipes and the finest
            spices imported directly from India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.09 }}
              className="group relative rounded-2xl overflow-hidden cursor-default bg-white"
              style={{
                border: "1px solid rgba(217,119,6,0.12)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
                transition:
                  "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(217,119,6,0.4)";
                el.style.boxShadow = "0 20px 50px rgba(0,0,0,0.12), 0 0 30px rgba(217,119,6,0.07)";
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(217,119,6,0.12)";
                el.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
                el.style.transform = "translateY(0)";
              }}
            >
              {/* Number watermark */}
              <span
                className="absolute top-3 right-4 font-playfair font-bold text-5xl leading-none pointer-events-none z-10 select-none"
                style={{ color: "rgba(217,119,6,0.08)" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={dish.image}
                  alt={dish.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,33vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                  }}
                />
                <span
                  className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full"
                  style={badgeStyle[dish.badge] ?? badgeStyle["Popular"]}
                >
                  {dish.badge}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 pt-5">
                <div className="flex items-start justify-between mb-2.5">
                  <h3 className="font-playfair text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 leading-tight pr-2">
                    {dish.name}
                  </h3>
                  <span className="font-playfair font-bold text-lg price-shimmer shrink-0">
                    {dish.price}
                  </span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">
                  {dish.description}
                </p>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`w-3 h-3 ${
                          j < Math.floor(dish.rating)
                            ? "fill-primary text-primary"
                            : "text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">
                    {dish.rating} · {dish.reviews} reviews
                  </span>
                </div>
              </div>

              {/* Hover: reserve CTA slides up */}
              <div
                className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-center gap-2 text-sm font-semibold text-black translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-pointer"
                style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                onClick={() =>
                  document
                    .getElementById("reservations")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span>Order Tonight</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-center mt-14"
        >
          <button
            onClick={() =>
              document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-9 py-4 border text-primary font-semibold rounded-full text-sm transition-all duration-300"
            style={{ borderColor: "rgba(217,119,6,0.4)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "linear-gradient(135deg, #d97706, #f59e0b)";
              el.style.borderColor = "transparent";
              el.style.color = "#0f0f0f";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(217,119,6,0.4)";
              el.style.color = "#d97706";
            }}
          >
            Explore Full Menu
          </button>
        </motion.div>
      </div>
    </section>
  );
}
