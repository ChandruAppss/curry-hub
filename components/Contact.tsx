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
      "ally 35, 5 Mana Witthaya Alley,",
      "Khlong Ton Sai, Khlong San,",
      "Bangkok 10600, Thailand",
    ],
    link: "https://maps.google.com/?q=ally+35+5+Mana+Witthaya+Alley+Khlong+San+Bangkok",
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
    <section id="contact" className="py-24 lg:py-32 bg-background">
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
            <span>Get in Touch</span>
          </div>
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white">
            Find <span className="gold-text">Us</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto">
            We'd love to hear from you. Visit us, call us, or drop us a line —
            we're here to make your experience perfect.
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
                    className="group p-6 rounded-xl bg-surface border border-white/5 hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-white mb-2 text-sm">
                      {item.title}
                    </h3>
                    {item.lines.map((line) => (
                      <p key={line} className="text-white/50 text-sm leading-relaxed">
                        {line}
                      </p>
                    ))}
                    {item.link && (
                      <a
                        href={item.link}
                        target={item.link.startsWith("http") ? "_blank" : undefined}
                        rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="inline-block mt-3 text-xs text-primary hover:text-accent transition-colors font-medium"
                      >
                        {item.linkText} →
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-3">
              <a
                href="tel:+66643073879"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary text-black font-semibold text-sm hover:bg-accent transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>Call</span>
              </a>
              <a
                href="https://wa.me/66643073879"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-500 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp</span>
              </a>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 p-4 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-500 transition-colors"
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
            className="rounded-2xl overflow-hidden border border-white/10 min-h-[400px] relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.5461698259524!2d100.5599!3d13.7308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQzJzUwLjkiTiAxMDDCsDMzJzM1LjYiRQ!5e0!3m2!1sen!2sth!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px", filter: "invert(90%) hue-rotate(180deg)" }}
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
