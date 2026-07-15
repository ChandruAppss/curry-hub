"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Flame, Leaf } from "lucide-react";
import Image from "next/image";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  spicy?: boolean;
  veg?: boolean;
  popular?: boolean;
};

const menuData: Record<string, MenuItem[]> = {
  Starters: [
    { name: "Samosa (2 pcs)", description: "Crispy pastry filled with spiced potatoes and peas, served with mint chutney", price: "฿120", veg: true },
    { name: "Chicken Tikka", description: "Tandoor-roasted chicken with yoghurt marinade, served with raita", price: "฿220", spicy: true, popular: true },
    { name: "Seekh Kebab", description: "Spiced minced lamb skewers grilled over charcoal, with green chutney", price: "฿240", spicy: true },
    { name: "Paneer Tikka", description: "Marinated cottage cheese charred in the tandoor, with bell peppers", price: "฿200", veg: true, popular: true },
    { name: "Onion Bhaji", description: "Crispy golden fritters of sliced onion in a spiced chickpea batter", price: "฿100", veg: true },
    { name: "Soup of the Day", description: "Chef's selection Indian-spiced soup, ask your server for today's offering", price: "฿140", veg: true },
  ],
  Vegetarian: [
    { name: "Paneer Butter Masala", description: "Cottage cheese in a rich tomato-cream gravy with whole spices", price: "฿280", veg: true, popular: true },
    { name: "Dal Makhani", description: "Black lentils slow-cooked overnight with cream, butter and spices", price: "฿240", veg: true },
    { name: "Chana Masala", description: "Tangy chickpeas simmered with tomatoes, onions and aromatic spices", price: "฿220", veg: true, spicy: true },
    { name: "Aloo Gobi", description: "Dry-cooked potato and cauliflower tossed with cumin and coriander", price: "฿200", veg: true },
    { name: "Palak Paneer", description: "Fresh cottage cheese in creamy spiced spinach puree", price: "฿260", veg: true },
    { name: "Mixed Vegetable Curry", description: "Seasonal vegetables in a fragrant tomato and coconut gravy", price: "฿220", veg: true },
  ],
  "Non-Vegetarian": [
    { name: "Butter Chicken", description: "Tender chicken in silky tomato-cream gravy — our most-loved dish", price: "฿320", popular: true },
    { name: "Chicken Tikka Masala", description: "Grilled tikka in a smoky, spiced masala gravy", price: "฿340", spicy: true },
    { name: "Lamb Rogan Josh", description: "Slow-braised Kashmiri lamb in deep red aromatic gravy", price: "฿380", spicy: true, popular: true },
    { name: "Fish Curry", description: "Coastal-style fish in tangy coconut and tamarind gravy", price: "฿360", spicy: true },
    { name: "Chicken Korma", description: "Mild, creamy cashew and yoghurt gravy with aromatic spices", price: "฿320" },
    { name: "Prawn Masala", description: "Tiger prawns in bold onion-tomato masala with coastal spices", price: "฿420", spicy: true },
  ],
  Tandoori: [
    { name: "Tandoori Chicken (Full)", description: "Whole chicken marinated overnight and roasted in clay tandoor at 450°C", price: "฿480", spicy: true, popular: true },
    { name: "Tandoori Chicken (Half)", description: "Half chicken — the same overnight marinade and clay oven perfection", price: "฿280", spicy: true },
    { name: "Malai Tikka", description: "Chicken marinated in cream, cheese and mild spices — silky smooth", price: "฿320" },
    { name: "Lamb Seekh Kebab", description: "Minced lamb with ginger, garlic and herbs pressed on skewers", price: "฿360", spicy: true },
    { name: "Tandoori Prawns", description: "Jumbo prawns marinated in ajwain and lemon, grilled in tandoor", price: "฿440" },
  ],
  Biryani: [
    { name: "Chicken Biryani", description: "Basmati rice layered with saffron, fried onions and spiced chicken", price: "฿360", popular: true },
    { name: "Lamb Biryani", description: "Tender lamb dum-cooked with fragrant basmati and whole spices", price: "฿400" },
    { name: "Prawn Biryani", description: "Coastal biryani with tiger prawns and aromatic coconut spices", price: "฿440" },
    { name: "Vegetable Biryani", description: "Garden vegetables with saffron-infused basmati and golden onions", price: "฿280", veg: true },
    { name: "Paneer Biryani", description: "Cottage cheese and saffron rice — delicate, fragrant perfection", price: "฿300", veg: true },
  ],
  Bread: [
    { name: "Garlic Naan", description: "Tandoor-baked flatbread with garlic butter and coriander", price: "฿80", veg: true, popular: true },
    { name: "Plain Naan", description: "Classic hand-stretched tandoor-baked flatbread", price: "฿60", veg: true },
    { name: "Cheese Naan", description: "Naan filled with melted paneer — indulgent and rich", price: "฿100", veg: true },
    { name: "Peshwari Naan", description: "Sweet naan stuffed with almonds, coconut and sultanas", price: "฿100", veg: true },
    { name: "Paratha", description: "Whole wheat layered flatbread, shallow-fried with butter", price: "฿90", veg: true },
    { name: "Puri (2 pcs)", description: "Puffed deep-fried whole wheat bread, light and airy", price: "฿80", veg: true },
  ],
  Desserts: [
    { name: "Gulab Jamun", description: "Soft milk-solid dumplings soaked in rose and cardamom syrup", price: "฿120", veg: true, popular: true },
    { name: "Kulfi", description: "Traditional Indian ice cream — pistachio, mango or malai", price: "฿140", veg: true },
    { name: "Gajar Ka Halwa", description: "Slow-cooked carrot pudding with ghee, milk and cardamom", price: "฿130", veg: true },
    { name: "Rasmalai", description: "Spongy cheese patties in chilled saffron and cardamom cream", price: "฿150", veg: true },
    { name: "Mango Lassi", description: "Thick blended mango and yoghurt — sweet and refreshing", price: "฿120", veg: true },
  ],
  Beverages: [
    { name: "Masala Chai", description: "Spiced Indian tea brewed with ginger, cardamom and milk", price: "฿80", veg: true },
    { name: "Mango Lassi", description: "Sweet mango and yoghurt blend — a classic Indian refresher", price: "฿120", veg: true },
    { name: "Rose Sharbat", description: "Chilled rose petal syrup with basil seeds and cream", price: "฿100", veg: true },
    { name: "Nimbu Pani", description: "Fresh lime water with mint and a pinch of black salt", price: "฿90", veg: true },
    { name: "Soft Drinks", description: "Coca-Cola, Sprite, Fanta, Still Water, Sparkling Water", price: "฿80", veg: true },
    { name: "Indian Tonic Water", description: "Premium tonic water with subtle Indian spice notes", price: "฿100", veg: true },
  ],
};

const tabs = Object.keys(menuData);

const tabImages: Record<string, string> = {
  Starters: "/menu/Appetizers.jpg",
  Vegetarian: "/menu/MainCourseVeg.jpg",
  "Non-Vegetarian": "/menu/Rolls.png",
  Tandoori: "/menu/VegKabab.jpg",
  Biryani: "/menu/Biryani.png",
  Bread: "/menu/NaanBread.jpg",
  Beverages: "/menu/Drinks.png",
};

function TiltCard({ item, index }: { item: MenuItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    ref.current.style.transform = `perspective(700px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateZ(6px)`;
    ref.current.style.boxShadow = `${-x * 6}px ${y * 6}px 24px rgba(217,119,6,${0.06 + Math.abs(x) * 0.04})`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    ref.current.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.055 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="menu-card-luxury group flex items-start gap-4 p-5 rounded-xl cursor-default"
      style={{
        transition: "transform 0.22s cubic-bezier(0.23,1,0.32,1), box-shadow 0.22s ease, border-color 0.3s ease",
      }}
    >
      {/* Left dot accent */}
      <div className="shrink-0 mt-1.5">
        <div
          className="w-1.5 h-1.5 rounded-full transition-colors duration-300 group-hover:shadow-[0_0_8px_rgba(217,119,6,0.7)]"
          style={{ background: item.popular ? "#d97706" : "rgba(0,0,0,0.15)" }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h3 className="font-inter font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300 text-base leading-tight">
            {item.name}
          </h3>
          <div className="flex items-center gap-1">
            {item.veg && (
              <span title="Vegetarian">
                <Leaf className="w-3.5 h-3.5 text-green-600" />
              </span>
            )}
            {item.spicy && (
              <span title="Spicy">
                <Flame className="w-3.5 h-3.5 text-red-500" />
              </span>
            )}
            {item.popular && (
              <span
                className="text-[10px] px-2 py-0.5 rounded-full font-semibold tracking-wide"
                style={{ background: "rgba(217,119,6,0.1)", color: "#d97706" }}
              >
                Chef&apos;s Pick
              </span>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
      </div>

      <div className="shrink-0 flex flex-col items-end gap-1">
        <span className="font-playfair font-bold text-lg price-shimmer">{item.price}</span>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="menu" className="py-24 lg:py-32 bg-surface relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(217,119,6,0.04) 0%, transparent 65%)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          className="text-center mb-14"
        >
          <div className="section-tag justify-center mb-4">
            <span>What We Serve</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900">
            Our <span className="shimmer-gold">Menu</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            Explore our extensive menu of authentic Indian dishes, lovingly prepared with
            imported spices and traditional techniques.
          </p>
        </motion.div>

        {/* Tab bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "text-black font-semibold shadow-md shadow-primary/20"
                  : "bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200 border border-gray-200"
              }`}
              style={
                activeTab === tab
                  ? { background: "linear-gradient(135deg, #d97706, #f59e0b)" }
                  : {}
              }
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
          >
            {/* Category banner image */}
            {tabImages[activeTab] && (
              <div className="relative w-full rounded-2xl overflow-hidden mb-8" style={{ height: "260px" }}>
                <Image
                  src={tabImages[activeTab]}
                  alt={activeTab}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width:1280px) 100vw, 1280px"
                  quality={90}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)" }}
                />
                <div className="absolute inset-0 flex items-center px-8">
                  <div>
                    <p className="text-white/55 text-xs font-medium tracking-widest uppercase mb-1">Our Menu</p>
                    <h3 className="font-playfair text-3xl font-bold text-white">{activeTab}</h3>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {menuData[activeTab].map((item, i) => (
                <TiltCard key={item.name} item={item} index={i} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-10 flex items-center justify-center gap-6 text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-green-600" />
            <span>Vegetarian</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Contains Chilli</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#d97706" }} />
            <span>Prices in Thai Baht (฿) · VAT included</span>
          </div>
        </div>
      </div>
    </section>
  );
}
