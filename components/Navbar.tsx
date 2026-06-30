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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 60);

      const docH = document.body.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? (scrollY / docH) * 100 : 0);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of [...sections].reverse()) {
        const el = document.getElementById(section);
        if (el && scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div id="scroll-progress" aria-hidden="true" style={{ width: `${progress}%` }} />

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/97 shadow-sm border-b border-gray-100 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => scrollTo("#home")}
              className="flex items-center group"
              aria-label="Go to top"
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

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className={`relative font-inter text-sm font-medium tracking-wide transition-colors duration-300 group ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : scrolled
                      ? "text-gray-700 hover:text-gray-900"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px transition-all duration-300 ${
                      activeSection === link.href.slice(1) ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    style={{ background: "linear-gradient(90deg, #d97706, #fbbf24)" }}
                  />
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-5">
              <a
                href="tel:+66643073879"
                className={`flex items-center gap-2 text-sm transition-colors duration-300 hover:text-primary ${
                  scrolled ? "text-gray-500" : "text-white/65"
                }`}
              >
                <Phone className="w-3.5 h-3.5" />
                <span>+66 64 307 3879</span>
              </a>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(217,119,6,0.35)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => scrollTo("#reservations")}
                className="px-5 py-2.5 text-black text-sm font-semibold rounded-full transition-shadow duration-300"
                style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
              >
                Reserve Table
              </motion.button>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden w-10 h-10 flex items-center justify-center transition-colors hover:text-primary ${
                scrolled ? "text-gray-700" : "text-white/85"
              }`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.32, ease: "easeInOut" }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white flex flex-col pt-24 pb-8 px-8 border-l border-gray-100 shadow-2xl">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => scrollTo(link.href)}
                  className={`text-left py-4 font-playfair text-xl border-b border-gray-100 transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-gray-700 hover:text-primary"
                  }`}
                >
                  {link.label}
                </motion.button>
              ))}

              <div className="mt-8 space-y-4">
                <a
                  href="tel:+66643073879"
                  className="flex items-center gap-3 text-gray-500 hover:text-primary transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">+66 64 307 3879</span>
                </a>
                <button
                  onClick={() => scrollTo("#reservations")}
                  className="w-full py-3 text-black font-semibold rounded-full transition-all duration-300"
                  style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
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
