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
  Starters: [
    {
      name: "Samosa (2 pcs)",
      description: "Crispy pastry filled with spiced potatoes and peas, served with mint chutney",
      price: "฿120",
      veg: true,
    },
    {
      name: "Chicken Tikka",
      description: "Tandoor-roasted chicken with yoghurt marinade, served with raita",
      price: "฿220",
      spicy: true,
      popular: true,
    },
    {
      name: "Seekh Kebab",
      description: "Spiced minced lamb skewers grilled over charcoal, with green chutney",
      price: "฿240",
      spicy: true,
    },
    {
      name: "Paneer Tikka",
      description: "Marinated cottage cheese charred in the tandoor, with bell peppers",
      price: "฿200",
      veg: true,
      popular: true,
    },
    {
      name: "Onion Bhaji",
      description: "Crispy golden fritters of sliced onion in a spiced chickpea batter",
      price: "฿100",
      veg: true,
    },
    {
      name: "Soup of the Day",
      description: "Chef's selection Indian-spiced soup, ask your server for today's offering",
      price: "฿140",
      veg: true,
    },
  ],
  Vegetarian: [
    {
      name: "Paneer Butter Masala",
      description: "Cottage cheese in a rich tomato-cream gravy with whole spices",
      price: "฿280",
      veg: true,
      popular: true,
    },
    {
      name: "Dal Makhani",
      description: "Black lentils slow-cooked overnight with cream, butter and spices",
      price: "฿240",
      veg: true,
    },
    {
      name: "Chana Masala",
      description: "Tangy chickpeas simmered with tomatoes, onions and aromatic spices",
      price: "฿220",
      veg: true,
      spicy: true,
    },
    {
      name: "Aloo Gobi",
      description: "Dry-cooked potato and cauliflower tossed with cumin and coriander",
      price: "฿200",
      veg: true,
    },
    {
      name: "Palak Paneer",
      description: "Fresh cottage cheese in creamy spiced spinach puree",
      price: "฿260",
      veg: true,
    },
    {
      name: "Mixed Vegetable Curry",
      description: "Seasonal vegetables in a fragrant tomato and coconut gravy",
      price: "฿220",
      veg: true,
    },
  ],
  "Non-Vegetarian": [
    {
      name: "Butter Chicken",
      description: "Tender chicken in silky tomato-cream gravy — our most-loved dish",
      price: "฿320",
      popular: true,
    },
    {
      name: "Chicken Tikka Masala",
      description: "Grilled tikka in a smoky, spiced masala gravy",
      price: "฿340",
      spicy: true,
    },
    {
      name: "Lamb Rogan Josh",
      description: "Slow-braised Kashmiri lamb in deep red aromatic gravy",
      price: "฿380",
      spicy: true,
      popular: true,
    },
    {
      name: "Fish Curry",
      description: "Coastal-style fish in tangy coconut and tamarind gravy",
      price: "฿360",
      spicy: true,
    },
    {
      name: "Chicken Korma",
      description: "Mild, creamy cashew and yoghurt gravy with aromatic spices",
      price: "฿320",
    },
    {
      name: "Prawn Masala",
      description: "Tiger prawns in bold onion-tomato masala with coastal spices",
      price: "฿420",
      spicy: true,
    },
  ],
  Tandoori: [
    {
      name: "Tandoori Chicken (Full)",
      description: "Whole chicken marinated overnight and roasted in clay tandoor at 450°C",
      price: "฿480",
      spicy: true,
      popular: true,
    },
    {
      name: "Tandoori Chicken (Half)",
      description: "Half chicken — the same overnight marinade and clay oven perfection",
      price: "฿280",
      spicy: true,
    },
    {
      name: "Malai Tikka",
      description: "Chicken marinated in cream, cheese and mild spices — silky smooth",
      price: "฿320",
    },
    {
      name: "Lamb Seekh Kebab",
      description: "Minced lamb with ginger, garlic and herbs pressed on skewers",
      price: "฿360",
      spicy: true,
    },
    {
      name: "Tandoori Prawns",
      description: "Jumbo prawns marinated in ajwain and lemon, grilled in tandoor",
      price: "฿440",
    },
  ],
  Biryani: [
    {
      name: "Chicken Biryani",
      description: "Basmati rice layered with saffron, fried onions and spiced chicken",
      price: "฿360",
      popular: true,
    },
    {
      name: "Lamb Biryani",
      description: "Tender lamb dum-cooked with fragrant basmati and whole spices",
      price: "฿400",
    },
    {
      name: "Prawn Biryani",
      description: "Coastal biryani with tiger prawns and aromatic coconut spices",
      price: "฿440",
    },
    {
      name: "Vegetable Biryani",
      description: "Garden vegetables with saffron-infused basmati and golden onions",
      price: "฿280",
      veg: true,
    },
    {
      name: "Paneer Biryani",
      description: "Cottage cheese and saffron rice — delicate, fragrant perfection",
      price: "฿300",
      veg: true,
    },
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

export default function Menu() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="menu" className="py-24 lg:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="section-tag justify-center mb-4">
            <span>What We Serve</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white">
            Our <span className="gold-text">Menu</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto">
            Explore our extensive menu of authentic Indian dishes, lovingly
            prepared with imported spices and traditional techniques.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "tab-active shadow-lg shadow-primary/30 font-semibold"
                  : "bg-surface-2 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {tab}
            </button>
          ))}
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {menuData[activeTab].map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex items-start gap-4 p-5 rounded-xl bg-background/50 border border-white/5 hover:border-primary/30 hover:bg-background transition-all duration-300"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h3 className="font-inter font-semibold text-white group-hover:text-primary transition-colors duration-300 text-base">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1">
                      {item.veg && (
                        <span title="Vegetarian">
                          <Leaf className="w-3.5 h-3.5 text-green-500" />
                        </span>
                      )}
                      {item.spicy && (
                        <span title="Spicy">
                          <Flame className="w-3.5 h-3.5 text-red-500" />
                        </span>
                      )}
                      {item.popular && (
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <span className="font-playfair font-bold text-lg gold-text">
                    {item.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Legend */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-white/40">
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-green-500" />
            <span>Vegetarian</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-red-500" />
            <span>Contains Chilli</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary/60 inline-block" />
            <span>Prices in Thai Baht (฿) · VAT included</span>
          </div>
        </div>
      </div>
    </section>
  );
}
