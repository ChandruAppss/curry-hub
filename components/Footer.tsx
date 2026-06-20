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
    <footer className="bg-surface border-t border-white/5">
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
            <p className="text-white/50 text-sm leading-relaxed mb-6">
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
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-white mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-white/50 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-white mb-6">
              Opening Hours
            </h3>
            <div className="space-y-3">
              {hours.map(({ day, time }) => (
                <div key={day} className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-white/70 font-medium">{day}</p>
                    <p className="text-xs text-white/40">{time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair text-lg font-bold text-white mb-6">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p className="text-sm text-white/50 leading-relaxed">
                  ally 35, 5 Mana Witthaya Alley,
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
                  className="text-sm text-white/50 hover:text-primary transition-colors"
                >
                  +66 64 307 3879
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <a
                  href="mailto:info@curryhub.co.th"
                  className="text-sm text-white/50 hover:text-primary transition-colors"
                >
                  info@curryhub.co.th
                </a>
              </li>
            </ul>

            <button
              onClick={() => scrollTo("#reservations")}
              className="mt-6 w-full py-3 bg-gold-gradient text-black text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="gold-divider" />

      {/* Bottom */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-xs text-center sm:text-left">
          © {new Date().getFullYear()} Curry Hub Bangkok. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-white/30 text-xs hover:text-white/50 transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}
