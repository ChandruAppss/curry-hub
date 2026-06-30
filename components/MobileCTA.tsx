"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, CalendarCheck } from "lucide-react";

export default function MobileCTA() {
  const [visible, setVisible] = useState(false);
  const [nearRestricted, setNearRestricted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 420);

      let restricted = false;
      for (const id of ["reservations", "contact"]) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight + 40 && rect.bottom > -40) {
            restricted = true;
            break;
          }
        }
      }
      setNearRestricted(restricted);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !nearRestricted && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}
          className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
          style={{
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            borderTop: "1px solid rgba(217, 119, 6, 0.2)",
            boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
            paddingBottom: "max(10px, env(safe-area-inset-bottom))",
          }}
        >
          <div className="flex items-center h-[58px] px-3 gap-2">
            {/* Call */}
            <a
              href="tel:+66643073879"
              aria-label="Call Curry Hub"
              className="flex flex-col items-center justify-center gap-0.5 w-[52px] shrink-0 py-2 rounded-xl text-gray-500 hover:text-primary active:scale-95 transition-all"
            >
              <Phone className="w-[18px] h-[18px]" />
              <span className="text-[9px] font-semibold tracking-widest uppercase">Call</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/66643073879?text=Hi!%20I%27d%20like%20to%20reserve%20a%20table%20at%20Curry%20Hub%20Bangkok."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Curry Hub"
              className="flex flex-col items-center justify-center gap-0.5 w-[52px] shrink-0 py-2 rounded-xl text-gray-500 hover:text-emerald-600 active:scale-95 transition-all"
            >
              <MessageCircle className="w-[18px] h-[18px]" />
              <span className="text-[9px] font-semibold tracking-widest uppercase">Chat</span>
            </a>

            {/* Reserve — primary action */}
            <button
              onClick={() =>
                document
                  .getElementById("reservations")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex-1 flex items-center justify-center gap-2 h-[42px] rounded-xl font-semibold text-[13px] text-black active:scale-[0.98] transition-transform"
              style={{ background: "linear-gradient(135deg, #d97706, #f59e0b, #fbbf24)" }}
            >
              <CalendarCheck className="w-4 h-4" />
              Reserve a Table
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
