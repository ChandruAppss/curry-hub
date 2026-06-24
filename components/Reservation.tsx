"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Calendar,
  Clock,
  Users,
  User,
  Phone,
  Mail,
  MessageSquare,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

type FormData = {
  name: string;
  phone: string;
  email: string;
  guests: string;
  date: string;
  time: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const timeSlots = [
  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "6:00 PM",
  "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM",
  "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM",
];

const STEPS = [
  { num: 1, label: "Your Details" },
  { num: 2, label: "Booking" },
  { num: 3, label: "Notes" },
];

function FloatingInput({
  id, label, type = "text", icon: Icon, value, onChange, error, required, min,
}: {
  id: keyof FormData;
  label: string;
  type?: string;
  icon: React.ElementType;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  required?: boolean;
  min?: string;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div className="relative">
      <div
        className={`relative flex items-center bg-surface-2 rounded-xl border transition-all duration-300 ${
          error
            ? "border-red-500/60"
            : active
            ? "border-primary/70 shadow-lg shadow-primary/10"
            : "border-white/8 hover:border-white/18"
        }`}
      >
        <Icon
          className={`absolute left-4 w-4 h-4 transition-colors duration-300 ${
            active ? "text-primary" : "text-white/25"
          }`}
        />
        <input
          id={id}
          type={type}
          value={value}
          required={required}
          min={min}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder=" "
          className="w-full pl-11 pr-4 pt-6 pb-2 bg-transparent text-white text-sm focus:outline-none"
        />
        <label
          htmlFor={id}
          className={`absolute left-11 transition-all duration-300 pointer-events-none ${
            active ? "top-2 text-[10px] font-medium text-primary" : "top-1/2 -translate-y-1/2 text-sm text-white/35"
          }`}
        >
          {label}
          {required && <span className="text-primary ml-0.5">*</span>}
        </label>
      </div>
      {error && <p className="mt-1 text-xs text-red-400 pl-4">{error}</p>}
    </div>
  );
}

export default function Reservation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [stepDir, setStepDir] = useState(1);

  const [form, setForm] = useState<FormData>({
    name: "", phone: "", email: "", guests: "", date: "", time: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const set = (field: keyof FormData) => (val: string) => {
    setForm((f) => ({ ...f, [field]: val }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const newErrors: FormErrors = {};
    if (s === 1) {
      if (!form.name.trim()) newErrors.name = "Name is required";
      if (!form.phone.trim()) newErrors.phone = "Phone is required";
      if (!form.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    }
    if (s === 2) {
      if (!form.guests) newErrors.guests = "Required";
      if (!form.date) newErrors.date = "Required";
      if (!form.time) newErrors.time = "Required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStepDir(1);
    setStep((s) => s + 1);
  };

  const goPrev = () => {
    setStepDir(-1);
    setStep((s) => s - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  const stepVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <section id="reservations" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at bottom, rgba(217,119,6,0.07) 0%, transparent 70%)" }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — Info */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="section-tag mb-4">
              <span>Book Your Table</span>
            </div>
            <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-white mb-6">
              Reserve a <span className="shimmer-gold">Table</span>
            </h2>
            <p className="text-white/55 leading-relaxed mb-8 text-sm">
              Join us for an unforgettable Indian dining experience. Whether it's an intimate
              dinner for two, a family feast, or a corporate celebration — we'll make your
              evening exceptional.
            </p>

            <div className="space-y-5">
              {[
                { icon: Clock, title: "Opening Hours", desc: "Dine-in: Mon–Sun 11 AM – 11 PM · Delivery: 10 AM – 10 PM" },
                { icon: Users, title: "Group Bookings", desc: "Private dining rooms for 10–50 guests available" },
                { icon: Phone, title: "Call Us", desc: "+66 64 307 3879" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                      style={{ background: "rgba(217,119,6,0.1)" }}>
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.title}</p>
                      <p className="text-white/45 text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-10 p-6 rounded-2xl"
              style={{ border: "1px solid rgba(217,119,6,0.2)", background: "rgba(217,119,6,0.04)" }}>
              <p className="text-primary font-semibold text-sm mb-1">Special Occasions?</p>
              <p className="text-white/50 text-sm leading-relaxed">
                We cater to birthdays, anniversaries, and corporate events. Mention your occasion
                in the notes — we'll make it unforgettable.
              </p>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="glass-luxury rounded-2xl p-8 lg:p-10 shadow-2xl">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2, stiffness: 200 }}
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 glow-pulse"
                      style={{ background: "rgba(217,119,6,0.12)" }}
                    >
                      <CheckCircle className="w-10 h-10 text-primary" />
                    </motion.div>
                    <h3 className="font-playfair text-2xl font-bold text-white mb-3">
                      Reservation Received!
                    </h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-2">
                      Thank you,{" "}
                      <span className="text-primary font-medium">{form.name.split(" ")[0]}</span>.
                      We've received your reservation request.
                    </p>
                    <p className="text-white/40 text-sm">
                      Our team will confirm via{" "}
                      <span className="text-white/65">{form.phone}</span> within 30 minutes.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setStep(1);
                        setForm({ name: "", phone: "", email: "", guests: "", date: "", time: "", message: "" });
                      }}
                      className="mt-8 px-6 py-3 text-sm rounded-full transition-all duration-300"
                      style={{ border: "1px solid rgba(217,119,6,0.4)", color: "#d97706" }}
                    >
                      Make Another Reservation
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form">
                    {/* Step header */}
                    <div className="mb-7">
                      <h3 className="font-playfair text-2xl font-bold text-white mb-5">
                        Book Your Table
                      </h3>

                      {/* Step indicator */}
                      <div className="flex items-center">
                        {STEPS.map((s, idx) => (
                          <div key={s.num} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-1">
                              <div
                                className={`step-dot ${
                                  step === s.num ? "active" : step > s.num ? "done" : ""
                                }`}
                              >
                                {step > s.num ? "✓" : s.num}
                              </div>
                              <span className={`text-[10px] tracking-wide whitespace-nowrap ${
                                step === s.num ? "text-primary" : "text-white/30"
                              }`}>
                                {s.label}
                              </span>
                            </div>
                            {idx < STEPS.length - 1 && (
                              <div className={`step-line-connector mx-2 mb-4 ${step > s.num ? "done" : ""}`} />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Step content */}
                    <AnimatePresence custom={stepDir} mode="wait">
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          custom={stepDir}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.32 }}
                          className="space-y-4"
                        >
                          <FloatingInput id="name" label="Full Name" icon={User}
                            value={form.name} onChange={set("name")} error={errors.name} required />
                          <FloatingInput id="phone" label="Phone Number" type="tel" icon={Phone}
                            value={form.phone} onChange={set("phone")} error={errors.phone} required />
                          <FloatingInput id="email" label="Email Address" type="email" icon={Mail}
                            value={form.email} onChange={set("email")} error={errors.email} required />

                          <motion.button
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={goNext}
                            className="w-full py-4 text-black font-semibold rounded-xl text-sm flex items-center justify-center gap-2 mt-2"
                            style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                          >
                            Continue to Booking
                            <ChevronRight className="w-4 h-4" />
                          </motion.button>
                        </motion.div>
                      )}

                      {step === 2 && (
                        <motion.div
                          key="step2"
                          custom={stepDir}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.32 }}
                          className="space-y-4"
                        >
                          <FloatingInput id="guests" label="Number of Guests" type="number"
                            icon={Users} value={form.guests} onChange={set("guests")}
                            error={errors.guests} required min="1" />
                          <FloatingInput id="date" label="Date" type="date" icon={Calendar}
                            value={form.date} onChange={set("date")} error={errors.date} required min={today} />

                          {/* Time select */}
                          <div className="relative">
                            <div className={`relative flex items-center bg-surface-2 rounded-xl border transition-all duration-300 ${
                              errors.time ? "border-red-500/60" : form.time ? "border-primary/70 shadow-lg shadow-primary/10" : "border-white/8 hover:border-white/18"
                            }`}>
                              <Clock className={`absolute left-4 w-4 h-4 transition-colors ${form.time ? "text-primary" : "text-white/25"}`} />
                              <select
                                value={form.time}
                                onChange={(e) => set("time")(e.target.value)}
                                className="w-full pl-11 pr-4 pt-6 pb-2 bg-transparent text-white text-sm focus:outline-none appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="bg-surface-2">Select time</option>
                                {timeSlots.map((t) => (
                                  <option key={t} value={t} className="bg-surface-2">{t}</option>
                                ))}
                              </select>
                              <label className={`absolute left-11 transition-all duration-300 pointer-events-none ${
                                form.time ? "top-2 text-[10px] font-medium text-primary" : "top-1/2 -translate-y-1/2 text-sm text-white/35"
                              }`}>
                                Preferred Time<span className="text-primary ml-0.5">*</span>
                              </label>
                            </div>
                            {errors.time && <p className="mt-1 text-xs text-red-400 pl-4">{errors.time}</p>}
                          </div>

                          <div className="flex gap-3 mt-2">
                            <button type="button" onClick={goPrev}
                              className="flex-1 py-4 rounded-xl text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-300 flex items-center justify-center gap-2">
                              <ChevronLeft className="w-4 h-4" />
                              Back
                            </button>
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={goNext}
                              className="flex-[2] py-4 text-black font-semibold rounded-xl text-sm flex items-center justify-center gap-2"
                              style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                            >
                              Add Special Notes
                              <ChevronRight className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </motion.div>
                      )}

                      {step === 3 && (
                        <motion.form
                          key="step3"
                          custom={stepDir}
                          variants={stepVariants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.32 }}
                          onSubmit={handleSubmit}
                          className="space-y-4"
                        >
                          <div className="relative">
                            <div className={`relative flex items-start bg-surface-2 rounded-xl border transition-all duration-300 ${
                              form.message ? "border-primary/70 shadow-lg shadow-primary/10" : "border-white/8 hover:border-white/18"
                            }`}>
                              <MessageSquare className={`absolute left-4 top-4 w-4 h-4 transition-colors ${form.message ? "text-primary" : "text-white/25"}`} />
                              <textarea
                                value={form.message}
                                onChange={(e) => set("message")(e.target.value)}
                                rows={4}
                                placeholder="Special requests, dietary requirements, occasion, allergies..."
                                className="w-full pl-11 pr-4 pt-4 pb-3 bg-transparent text-white text-sm focus:outline-none resize-none placeholder:text-white/25"
                              />
                            </div>
                          </div>

                          {/* Summary */}
                          <div className="p-4 rounded-xl space-y-1.5 text-sm"
                            style={{ background: "rgba(217,119,6,0.06)", border: "1px solid rgba(217,119,6,0.15)" }}>
                            <p className="text-primary font-semibold text-xs uppercase tracking-wider mb-2">Summary</p>
                            {[
                              { label: "Name", value: form.name },
                              { label: "Date", value: form.date },
                              { label: "Time", value: form.time },
                              { label: "Guests", value: form.guests },
                            ].map((r) => (
                              <div key={r.label} className="flex justify-between">
                                <span className="text-white/40">{r.label}</span>
                                <span className="text-white/75">{r.value}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-3">
                            <button type="button" onClick={goPrev}
                              className="flex-1 py-4 rounded-xl text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/25 transition-all duration-300 flex items-center justify-center gap-2">
                              <ChevronLeft className="w-4 h-4" />
                              Back
                            </button>
                            <motion.button
                              type="submit"
                              disabled={loading}
                              whileHover={{ scale: loading ? 1 : 1.02 }}
                              whileTap={{ scale: loading ? 1 : 0.98 }}
                              className="flex-[2] py-4 text-black font-semibold rounded-xl text-sm disabled:opacity-70 disabled:cursor-not-allowed"
                              style={{ background: "linear-gradient(135deg, #d97706, #f59e0b)" }}
                            >
                              {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                  Submitting...
                                </span>
                              ) : (
                                "Confirm Reservation"
                              )}
                            </motion.button>
                          </div>

                          <p className="text-center text-xs text-white/25">
                            Confirmation within 30 minutes via phone
                          </p>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
