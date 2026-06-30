"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Navigation,
} from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    lines: [
      "Ally 35, 5 Mana Witthaya Alley,",
      "Khlong Ton Sai, Khlong San,",
      "Bangkok 10600, Thailand",
    ],
    link: "https://maps.google.com/?q=Curry+Hub+Bangkok+Khlong+San",
    linkText: "Get Directions",
  },
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+66 64 307 3879"],
    link: "tel:+66643073879",
    linkText: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@curryhub.co.th", "reservations@curryhub.co.th"],
    link: "mailto:info@curryhub.co.th",
    linkText: "Send Email",
  },
  {
    icon: Clock,
    title: "Opening Hours",
    lines: [
      "Dine-in: Mon–Sun 11 AM – 11 PM",
      "Delivery: Mon–Sun 10 AM – 10 PM",
      "Breakfast: Mon–Sun 10 AM – 12 PM",
    ],
    link: null,
    linkText: null,
  },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(217,119,6,0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag justify-center mb-4">
            <span>Get in Touch</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900">
            Find <span className="shimmer-gold">Us</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">
            We&apos;d love to hear from you. Visit us, call us, or drop us a line —
            we&apos;re here to make your experience perfect.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group p-6 rounded-2xl transition-all duration-300"
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.07)",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                      transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(217,119,6,0.3)";
                      el.style.boxShadow = "0 12px 36px rgba(0,0,0,0.1), 0 0 20px rgba(217,119,6,0.05)";
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "rgba(0,0,0,0.07)";
                      el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.05)";
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                      style={{ background: "rgba(217,119,6,0.1)" }}
                    >
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                      {item.title}
                    </h3>
                    {item.lines.map((line) => (
                      <p key={line} className="text-gray-500 text-sm leading-relaxed">
                        {line}
                      </p>
                    ))}
                    {item.link && (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-block mt-3 text-xs text-primary hover:text-amber-400 transition-colors font-medium"
                      >
                        {item.linkText} →
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons — gold palette */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href="tel:+66643073879"
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #d97706, #f59e0b)",
                  color: "#0f0f0f",
                }}
              >
                <Phone className="w-5 h-5" />
                <span>Call</span>
              </a>
              <a
                href="https://wa.me/66643073879?text=Hi!%20I%27d%20like%20to%20know%20more%20about%20Curry%20Hub%20Bangkok."
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(217,119,6,0.12)",
                  border: "1px solid rgba(217,119,6,0.3)",
                  color: "#fbbf24",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(217,119,6,0.22)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(217,119,6,0.12)";
                }}
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://maps.google.com/?q=Curry+Hub+Bangkok+Khlong+San"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: "rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.1)",
                  color: "rgba(0,0,0,0.55)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(217,119,6,0.35)";
                  el.style.color = "#d97706";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(0,0,0,0.1)";
                  el.style.color = "rgba(0,0,0,0.55)";
                }}
              >
                <Navigation className="w-5 h-5" />
                <span>Directions</span>
              </a>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="rounded-2xl overflow-hidden min-h-[420px] relative"
            style={{ border: "1px solid rgba(217,119,6,0.18)" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0!2d100.5066!3d13.7308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2995d15e2d001%3A0x1234567890abcdef!2sKhlong%20San%2C%20Bangkok!5e0!3m2!1sen!2sth!4v1700000000000!5m2!1sen!2sth"
              width="100%"
              height="100%"
              style={{
                border: 0,
                minHeight: "420px",
                filter: "invert(90%) hue-rotate(180deg) saturate(0.85)",
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Curry Hub Bangkok Location"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
