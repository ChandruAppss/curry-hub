"use client";

import { motion } from "framer-motion";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import Image from "next/image";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Our Menu", href: "#menu" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reserve a Table", href: "#reservations" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const hours = [
  { day: "Dine-in · Mon – Sun", time: "11:00 AM – 11:00 PM" },
  { day: "Delivery · Mon – Sun", time: "10:00 AM – 10:00 PM" },
  { day: "Breakfast · Mon – Sun", time: "10:00 AM – 12:00 PM" },
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-surface border-t border-gray-200">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <div className="relative w-24 h-24">
                <Image
                  src="/logo.png"
                  alt="Curry Hub Logo"
                  fill
                  className="object-contain rounded-full"
                  sizes="96px"
                />
              </div>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Bringing the authentic flavours of India to the heart of Bangkok.
              Every dish, a story. Every meal, a memory.
            </p>

            {/* Social */}
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "rgba(0,0,0,0.04)",
                    borderColor: "rgba(0,0,0,0.1)",
                    color: "rgba(0,0,0,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "#d97706";
                    el.style.borderColor = "rgba(217,119,6,0.45)";
                    el.style.background = "rgba(217,119,6,0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = "rgba(0,0,0,0.4)";
                    el.style.borderColor = "rgba(0,0,0,0.1)";
                    el.style.background = "rgba(0,0,0,0.04)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-gray-900 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-500 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/35 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-gray-900 mb-6">
              Opening Hours
            </h3>
            <div className="space-y-3">
              {hours.map(({ day, time }) => (
                <div key={day} className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700 font-medium">{day}</p>
                    <p className="text-xs text-gray-400">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-gray-900 mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-gray-500 leading-relaxed">
                  Ally 35, 5 Mana Witthaya Alley,
                  <br />
                  Khlong Ton Sai, Khlong San,
                  <br />
                  Bangkok 10600, Thailand
                </p>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="tel:+66643073879"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  +66 64 307 3879
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:info@curryhub.co.th"
                  className="text-sm text-gray-500 hover:text-primary transition-colors"
                >
                  info@curryhub.co.th
                </a>
              </li>
            </ul>

            <button
              onClick={() => scrollTo("#reservations")}
              className="mt-6 w-full py-3 text-black text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
              style={{ background: "linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)" }}
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </div>

      {/* SEO text block */}
      <div
        className="border-t border-gray-100"
        style={{ background: "rgba(0,0,0,0.03)" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-gray-400 text-xs leading-relaxed text-center max-w-4xl mx-auto"
          >
            Curry Hub Bangkok is an authentic Indian restaurant in Khlong San, Bangkok — celebrated as one of the best Indian restaurants in Bangkok for its rich Butter Chicken, aromatic Dum Biryani, and tandoor-grilled Tandoori Chicken. Whether you&apos;re searching for the best butter chicken Bangkok, a cosy Indian restaurant near ICONSIAM, or a top-rated curry house in Khlong San, Curry Hub delivers genuine North and South Indian cuisine crafted by our award-winning chef. Open for dine-in, delivery, and private event bookings. Reserve your table online or WhatsApp us directly.
          </motion.p>
        </div>
      </div>

      {/* Gold divider */}
      <div
        className="h-px w-full"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(217,119,6,0.4) 30%, rgba(251,191,36,0.6) 50%, rgba(217,119,6,0.4) 70%, transparent 100%)",
        }}
      />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-gray-400 text-xs text-center sm:text-left">
          © 2025 Curry Hub Bangkok. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-gray-400 text-xs hover:text-gray-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 text-xs hover:text-gray-600 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
