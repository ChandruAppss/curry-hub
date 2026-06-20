"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reservations", href: "#reservations" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      // Active section detection
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass-dark shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              className="flex items-center group"
            >
              <div className="relative w-16 h-16 group-hover:scale-105 transition-transform duration-300">
                <Image
                  src="/logo.png"
                  alt="Curry Hub Logo"
                  fill
                  className="object-contain rounded-full"

                  sizes="64px"
                  priority
                />
              </div>
            </button>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative font-inter text-sm font-medium tracking-wide transition-colors duration-300 group ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-gold-gradient transition-all duration-300 ${
                      activeSection === link.href.slice(1)
                        ? "w-full"
                        : "w-0 group-hover:w-full"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+66643073879"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-primary transition-colors duration-300"
              >
                <Phone className="w-4 h-4" />
                <span>+66 64 307 3879</span>
              </a>
              <button
                onClick={() => scrollTo("#reservations")}
                className="px-5 py-2.5 bg-gold-gradient text-black text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                Reserve Table
              </button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white/80 hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-surface flex flex-col pt-24 pb-8 px-8 border-l border-white/10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left py-4 font-playfair text-xl border-b border-white/10 transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-white/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="mt-8 space-y-4">
                <a
                  href="tel:+6620000000"
                  className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <span>+66 2 000 0000</span>
                </a>
                <button
                  onClick={() => scrollTo("#reservations")}
                  className="w-full py-3 bg-gold-gradient text-black font-semibold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
                >
                  Reserve a Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
