import React, { useState } from "react";
import { Check, Dumbbell, Award, CreditCard, Sparkles, X, CheckCircle, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { MembershipPlan } from "../types";

export default function MembershipPlans() {
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [registered, setRegistered] = useState(false);

  const plans: MembershipPlan[] = [
    {
      id: "plan-basic",
      name: "Standard Fitness",
      price: "रू 2,500",
      period: "month",
      features: [
        "Full access to Strength & Free-Weight Zone",
        "Full access to Cardiovascular Arena",
        "Secure locker rooms & change rooms",
        "1 Free Trainer Induction session",
      ],
      color: "border-zinc-800",
    },
    {
      id: "plan-elite",
      name: "Transcend Elite",
      price: "रू 3,500",
      period: "month",
      popular: true,
      features: [
        "Everything in Standard Fitness",
        "Unlimited Zumba & Group Aerobic classes",
        "2x Steam Bath sessions per week",
        "Quarterly physical evaluation by senior coaches",
        "Pre-workout juice bar access",
      ],
      color: "border-[#ccff00] shadow-[0_0_15px_rgba(204,255,0,0.15)]",
    },
    {
      id: "plan-vip",
      name: "Platinum VIP Club",
      price: "रू 6,000",
      period: "month",
      features: [
        "Everything in Transcend Elite",
        "Unlimited Daily Steam Bath recovery",
        "Personalized Monthly 3-Month Routine mapping",
        "1-on-1 Fitness Coach supervision (3x/week)",
        "Bespoke Diet Profiler & macro matching",
        "Transcend brand gym kit (T-shirt, Shaker)",
      ],
      color: "border-zinc-700",
    },
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedPlan) return;

    // Simulate database registration
    setRegistered(true);
    setTimeout(() => {
      // Clear forms
      setName("");
      setPhone("");
      setRegistered(false);
      setSelectedPlan(null);
    }, 4000);
  };

  const handleWhatsAppRegister = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedPlan) return;

    const text = `Hello Transcend Health Fitness! I'd like to pre-register for the *${selectedPlan.name}* plan.\n\n*Name:* ${name}\n*Phone:* ${phone}\n\nPlease confirm my physical transformation induction! Yeah Buddy!`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/9779841941288?text=${encodedText}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setRegistered(true);
    setTimeout(() => {
      setName("");
      setPhone("");
      setRegistered(false);
      setSelectedPlan(null);
    }, 4000);
  };

  return (
    <div className="space-y-6" id="membership-explorer">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h3 className="text-3xl font-black text-white tracking-tight">Flexible Membership Plans</h3>
        <p className="text-zinc-400 text-sm">
          No sign-up fees or hidden costs. Select a plan to jumpstart your physical transformation near Kuleshwor.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`bg-zinc-900 border rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 ${
              p.popular ? "scale-100 lg:scale-[1.02] z-10" : ""
            } ${p.color}`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ccff00] text-black font-extrabold text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Most Popular
              </span>
            )}

            <div>
              {/* Header */}
              <div className="mb-6">
                <div className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">
                  {p.name}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {p.price}
                  </span>
                  <span className="text-zinc-400 text-xs font-semibold">
                    / {p.period}
                  </span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {p.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-350 leading-relaxed">
                    <Check className="w-4 h-4 text-[#ccff00] flex-shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action */}
            <button
              onClick={() => setSelectedPlan(p)}
              className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                p.popular
                  ? "bg-[#ccff00] text-black hover:bg-[#b5e000] shadow-lg shadow-lime-950/20"
                  : "bg-zinc-950 border border-zinc-800 text-white hover:border-zinc-600 hover:bg-zinc-900/60"
              }`}
            >
              Get Started Now
            </button>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative"
            >
              <button
                onClick={() => {
                  setSelectedPlan(null);
                  setRegistered(false);
                }}
                className="absolute top-4 right-4 p-1 rounded-full bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {registered ? (
                <div className="py-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-[#ccff00]/15 border border-[#ccff00]/30 rounded-full flex items-center justify-center mx-auto animate-bounce">
                    <CheckCircle className="w-8 h-8 text-[#ccff00]" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white tracking-tight">Registration Submitted!</h4>
                    <p className="text-zinc-400 text-xs sm:text-sm mt-1">
                      You are registered for <span className="text-[#ccff00] font-bold">{selectedPlan.name}</span>.
                    </p>
                    <p className="text-zinc-400 text-[11px] leading-relaxed max-w-xs mx-auto mt-3">
                      Our friendly trainers will call you at <strong className="text-white">{phone}</strong> within 24 hours to confirm your schedule and give you your welcome kit!
                    </p>
                  </div>
                  <div className="text-zinc-500 text-[10px] font-mono">
                    Feel free to visit Transcend Gym near Kuleshwor today!
                  </div>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                      Plan Selected
                    </div>
                    <div className="text-white text-lg font-black mt-0.5">
                      {selectedPlan.name}
                    </div>
                    <div className="text-[#ccff00] text-sm font-extrabold mt-0.5">
                      {selectedPlan.price} <span className="text-zinc-500 font-normal text-xs">/ {selectedPlan.period}</span>
                    </div>
                  </div>

                  <div className="space-y-3.5 pt-2 border-t border-zinc-800">
                    <div>
                      <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Aditya Gupta"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#ccff00] text-white rounded-xl px-4 py-2.5 text-sm outline-none font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                        Mobile Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 984-1941288"
                        className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#ccff00] text-white rounded-xl px-4 py-2.5 text-sm outline-none font-semibold"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-zinc-950 p-3.5 rounded-lg border border-zinc-850 flex items-start gap-2.5 text-[10px] sm:text-xs text-zinc-450 leading-relaxed">
                    <CreditCard className="w-4 h-4 text-[#ccff00] flex-shrink-0 mt-0.5" />
                    <span>
                      Pay in person! No card required online. Visit Transcend Gym in Kuleshwor to fulfill enrollment and complete registration.
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-3">
                    <button
                      type="submit"
                      className="w-full bg-[#ccff00] hover:bg-[#b5e000] text-black font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-lg"
                    >
                      Confirm & Book Fitness Induction
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsAppRegister}
                      disabled={!name.trim() || !phone.trim()}
                      className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white font-black py-3 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <MessageCircle className="w-4 h-4 fill-white animate-pulse" />
                      <span>⚡ Pre-Register with WhatsApp (Automated)</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
