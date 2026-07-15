"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Flame, Leaf } from "lucide-react";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  spicy?: boolean;
  veg?: boolean;
  popular?: boolean;
};

const menuData: Record<string, MenuItem[]> = {
  Appetizers: [
    { name: "Pani Puri (8 pcs)", description: "Crisp hollow puris filled with spicy tamarind water, potatoes, and chickpeas", price: "฿149", veg: true },
    { name: "Aloo Tikki Chat", description: "Two spiced potato patties topped with yogurt and chutneys", price: "฿120", veg: true },
    { name: "Samosa (2 pcs)", description: "Golden pastry pockets stuffed with spiced potatoes and peas", price: "฿79", veg: true },
    { name: "Papdi Chat", description: "Crisp papdis topped with yogurt, tangy chutneys, and spices", price: "฿120", veg: true },
    { name: "Chicken Samosa (2 pcs)", description: "Crispy samosas stuffed with savoury minced chicken", price: "฿89" },
  ],
  "Main Course (Veg)": [
    { name: "Palak Paneer", description: "Creamy spinach with cottage cheese", price: "฿180", veg: true, popular: true },
    { name: "Dal Tadka", description: "Tempered yellow lentil curry", price: "฿179", veg: true },
    { name: "Sahi Paneer", description: "Royal cottage cheese in creamy gravy", price: "฿240", veg: true },
    { name: "Mix Vegetable Curry", description: "Seasonal vegetables in rich gravy", price: "฿189", veg: true },
    { name: "Butter Paneer Masala", description: "Paneer in rich tomato butter sauce", price: "฿189", veg: true },
    { name: "Bhindi Masala", description: "Spiced okra stir-fried", price: "฿189", veg: true },
    { name: "Paneer Tikka Masala", description: "Grilled paneer in spicy tikka gravy", price: "฿229", veg: true, spicy: true },
    { name: "Aloo Gobi Masala", description: "Spiced potato and cauliflower", price: "฿179", veg: true },
    { name: "Dal Makhani", description: "Creamy black lentils cooked overnight", price: "฿189", veg: true },
    { name: "Kadai Paneer", description: "Paneer with capsicum in spicy kadai gravy", price: "฿249", veg: true, spicy: true },
  ],
  Roll: [
    { name: "Chicken Roll", description: "Tortilla wrap filled with juicy grilled chicken and fresh vegetables", price: "฿149", popular: true },
    { name: "Chicken Sheekh Roll", description: "Wrap stuffed with spiced chicken seekh kebab and chutney", price: "฿189", spicy: true },
    { name: "Egg Roll", description: "Tortilla wrap filled with a spiced egg omelet and veggies", price: "฿129" },
    { name: "Mutton Sheekh Roll", description: "Wrap stuffed with succulent mutton seekh kebab and chutney", price: "฿200", spicy: true },
  ],
  "Vegetable Kabab": [
    { name: "Paneer Tikka (6 pcs)", description: "Grilled cottage cheese cubes marinated in spiced yogurt", price: "฿249", veg: true, popular: true },
    { name: "Hara Bhara Kabab (5 pcs)", description: "Crispy green patties made with spinach, peas, and spices", price: "฿219", veg: true },
    { name: "Malai Paneer Tikka (6 pcs)", description: "Creamy, mild cottage cheese cubes grilled to perfection", price: "฿249", veg: true },
    { name: "Aloo Tikki (5 pcs)", description: "Spiced potato patties served crispy", price: "฿199", veg: true },
  ],
  "Biriyani and Rice (veg)": [
    { name: "Mix Vegetable Biriyani", description: "Aromatic basmati rice cooked with mixed vegetables and spices", price: "฿199", veg: true, popular: true },
    { name: "Jasmine Rice", description: "Fragrant, soft, and sticky jasmine rice", price: "฿49", veg: true },
    { name: "Paneer Biriyani", description: "Flavorful biriyani layered with spiced paneer and rice", price: "฿229", veg: true },
    { name: "Mix Vegetable Polau", description: "Mildly spiced rice dish with mixed vegetables", price: "฿119", veg: true },
    { name: "Jeera Rice", description: "Basmati rice tempered with cumin seeds in ghee", price: "฿119", veg: true },
    { name: "Vegetable Fried Rice", description: "Indo-Chinese style stir-fried rice with fresh vegetables", price: "฿149", veg: true },
    { name: "Basmati Rice", description: "Steamed long-grain aromatic basmati rice", price: "฿89", veg: true },
  ],
  "Naan Bread": [
    { name: "Aloo / Onion / Gobi / Chilli Paratha", description: "Stuffed flatbread with your choice of filling", price: "฿79", veg: true },
    { name: "Tandoori Plain Naan", description: "Traditional leavened bread baked in a clay oven", price: "฿59", veg: true },
    { name: "Chicken Keema Naan", description: "Leavened bread stuffed with spiced minced chicken", price: "฿109" },
    { name: "Butter Naan", description: "Soft tandoori naan brushed with rich butter", price: "฿59", veg: true, popular: true },
    { name: "Cheese Naan", description: "Soft naan stuffed with melted cheese", price: "฿129", veg: true },
    { name: "Tandoori Roti", description: "Whole wheat bread baked in a clay oven", price: "฿49", veg: true },
    { name: "Garlic Naan", description: "Leavened bread flavored with garlic and butter", price: "฿79", veg: true },
    { name: "Butter Roti", description: "Tandoori roti topped with butter", price: "฿49", veg: true },
    { name: "Chilli Garlic Naan", description: "Spicy naan with garlic and chillies", price: "฿79", veg: true, spicy: true },
    { name: "Laccha Paratha", description: "Multi-layered whole wheat flatbread", price: "฿65", veg: true },
  ],
  Drinks: [
    { name: "Masaka Tea", description: "Spiced Indian tea brewed with aromatic herbs and milk", price: "฿30", veg: true },
    { name: "Banana Lassi", description: "Creamy yogurt drink blended with ripe bananas", price: "฿89", veg: true },
    { name: "Sweet / Salt Lassi", description: "Traditional yogurt-based drink, available sweet or salted", price: "฿79", veg: true },
    { name: "Mineral Water", description: "Bottled mineral water for hydration", price: "฿20", veg: true },
    { name: "Mango Lassi", description: "Refreshing yogurt drink blended with sweet mango pulp", price: "฿89", veg: true, popular: true },
    { name: "Soft Drink", description: "Chilled carbonated soft drink of your choice", price: "฿35", veg: true },
  ],
};

const tabs = Object.keys(menuData);

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
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {menuData[activeTab].map((item, i) => (
              <TiltCard key={item.name} item={item} index={i} />
            ))}
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
