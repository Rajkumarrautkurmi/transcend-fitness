import React, { useState } from "react";
import { MessageCircle, X, Send, ShieldCheck, Check, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface WhatsAppAutomatorProps {
  currentWorkout?: {
    level: string;
    goal: string;
  };
}

export default function WhatsAppAutomator({ currentWorkout }: WhatsAppAutomatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formName, setFormName] = useState("");
  const [formInquiry, setFormInquiry] = useState("");
  const [formType, setFormType] = useState<"general" | "membership" | "diet" | "workout">("general");
  const [selectedPlanName, setSelectedPlanName] = useState("Standard Fitness");
  const [copiedLink, setCopiedLink] = useState(false);

  const gymNumber = "9779841941288"; // Official phone formatted for WhatsApp click-to-chat api (country code + number)

  const handleLaunchWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    let text = "";
    if (formType === "membership") {
      text = `Hello Transcend Health Fitness! I want to pre-register for the *${selectedPlanName}* plan.\n\n*Name:* ${formName || "Valued Client"}\n*Goal:* Start 3-month physical transformation!\n\nPlease guide me with the induction timing. Yeah Buddy!`;
    } else if (formType === "diet") {
      text = `Namaste Coach Aarav! My name is ${formName || "Valued Client"}. I want to get an automated macro evaluation for my *Dal Bhat & traditional Nepalese diet* setup. Let's optimize my physical gains!`;
    } else if (formType === "workout") {
      const levelStr = currentWorkout?.level || "Beginner";
      const goalStr = currentWorkout?.goal || "Muscle Building";
      text = `Hello Coach! I just customized my *3-month physical program* on your website:\n\n*Experience Level:* ${levelStr}\n*Transformation Goal:* ${goalStr}\n\n*My Name:* ${formName || "Valued Client"}\n\nCan I schedule a walkthrough of this routine at your Kuleshwor gym facility?`;
    } else {
      text = `Hello Transcend Health Fitness! My name is ${formName || "Interested Lifter"}.\n\n*Inquiry:* ${formInquiry || "I want to visit the gym and start my fitness journey. What are the trial class timings?"}`;
    }

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${gymNumber}?text=${encodedText}`;
    
    // Open in new tab securely
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    // Close the widget beautifully
    setIsOpen(false);
    // Clear forms
    setFormName("");
    setFormInquiry("");
  };

  const handleDirectPing = (preset: string) => {
    let text = "";
    if (preset === "hours") {
      text = "Hello Transcend Health! What are your current opening hours, peak times, and steam bath schedules?";
    } else if (preset === "location") {
      text = "Namaste! Can you guide me to your gym's exact location near Kuleshwor, Kathmandu? Do you have parking available?";
    } else if (preset === "trial") {
      text = "Yeah Buddy! I'm interested in a Free Introductory Training Trial. Can I schedule a visit today?";
    }

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${gymNumber}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Subtle notification pill */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={() => setIsOpen(true)}
              className="bg-zinc-950/95 border border-zinc-800 text-zinc-350 py-1.5 px-3 rounded-xl text-[11px] font-bold shadow-2xl cursor-pointer flex items-center gap-2 max-w-xs backdrop-blur-md hover:border-zinc-700 transition-colors"
            >
              <span className="w-2 h-2 bg-[#ccff00] rounded-full animate-ping" />
              <span>WhatsApp Automator</span>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          id="whatsapp-floating-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba56] text-white rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.4)] cursor-pointer transition-all hover:scale-105 active:scale-95"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <MessageCircle className="w-6 h-6 stroke-[2.5] fill-white" />
          )}
        </button>
      </div>

      {/* Floating Panel Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-24 right-6 z-50 bg-zinc-900 border border-zinc-800 rounded-2xl w-[360px] max-w-[calc(100vw-32px)] shadow-2xl overflow-hidden flex flex-col"
            id="whatsapp-automator-panel"
          >
            {/* Header */}
            <div className="bg-zinc-950 border-b border-zinc-850 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 border border-[#25D366]/20 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-4 h-4 fill-[#25D366]" />
                </div>
                <div>
                  <h4 className="text-white text-xs font-black tracking-tight flex items-center gap-1.5 uppercase">
                    WhatsApp Automator
                    <span className="bg-[#25D366]/10 text-[#25D366] text-[8px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded">
                      Live
                    </span>
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-medium">Instant Pre-filled Gym Dispatcher</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-zinc-500 hover:text-white hover:bg-zinc-850 cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-4 space-y-4 max-h-[420px] overflow-y-auto">
              
              {/* Feature info */}
              <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-850 text-[11px] leading-relaxed text-zinc-400">
                <span className="text-white font-extrabold block mb-0.5">⚡ Automated Direct Booking</span>
                Skip traditional forms. Generate a customized structured WhatsApp message and dispatch it straight to our training coordinator.
              </div>

              {/* Automation preset tags */}
              <div className="space-y-1.5">
                <label className="block text-zinc-500 text-[9px] font-black uppercase tracking-wider">
                  ⚡ Quick Direct Inquiries
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    onClick={() => handleDirectPing("hours")}
                    className="bg-zinc-950 border border-zinc-850 hover:border-zinc-700 text-zinc-300 text-[10px] py-2 px-1 rounded-lg font-bold text-center cursor-pointer transition-colors"
                  >
                    🕒 Hours & Peak
                  </button>
                  <button
                    onClick={() => handleDirectPing("location")}
                    className="bg-zinc-950 border border-zinc-850 hover:border-zinc-700 text-zinc-300 text-[10px] py-2 px-1 rounded-lg font-bold text-center cursor-pointer transition-colors"
                  >
                    📍 Exact Map
                  </button>
                  <button
                    onClick={() => handleDirectPing("trial")}
                    className="bg-zinc-950 border border-zinc-850 hover:border-zinc-700 text-zinc-300 text-[10px] py-2 px-1 rounded-lg font-bold text-center cursor-pointer transition-colors"
                  >
                    🏋️ Free Trial
                  </button>
                </div>
              </div>

              {/* Form Automation */}
              <form onSubmit={handleLaunchWhatsApp} className="space-y-3.5 border-t border-zinc-850 pt-3.5">
                <div className="space-y-2">
                  <label className="block text-zinc-500 text-[9px] font-black uppercase tracking-wider">
                    Select Dispatch Template
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {[
                      { type: "general", label: "💬 Simple Inquiry" },
                      { type: "membership", label: "🎟️ Membership Sign-up" },
                      { type: "diet", label: "🍛 Dal Bhat Macro Check" },
                      { type: "workout", label: "🏋️ Submit My Workout" },
                    ].map((t) => (
                      <button
                        key={t.type}
                        type="button"
                        onClick={() => setFormType(t.type as any)}
                        className={`text-[10px] font-bold py-2 px-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                          formType === t.type
                            ? "bg-[#25D366]/10 border-[#25D366] text-white"
                            : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-white"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name field (all templates) */}
                <div className="space-y-1">
                  <label className="block text-zinc-400 text-[10px] font-bold uppercase">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. Aditya Gupta"
                    className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#25D366] text-white rounded-lg px-3 py-2 text-xs outline-none"
                    required
                  />
                </div>

                {/* Conditional fields based on type */}
                {formType === "general" && (
                  <div className="space-y-1">
                    <label className="block text-zinc-400 text-[10px] font-bold uppercase">
                      Your Inquiry Details
                    </label>
                    <textarea
                      value={formInquiry}
                      onChange={(e) => setFormInquiry(e.target.value)}
                      placeholder="What would you like to ask Transcend Gym?"
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#25D366] text-white rounded-lg px-3 py-2 text-xs outline-none h-16 resize-none"
                      required
                    />
                  </div>
                )}

                {formType === "membership" && (
                  <div className="space-y-1">
                    <label className="block text-zinc-400 text-[10px] font-bold uppercase">
                      Select Target Plan
                    </label>
                    <select
                      value={selectedPlanName}
                      onChange={(e) => setSelectedPlanName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-850 focus:border-[#25D366] text-white rounded-lg px-3 py-2 text-xs outline-none font-semibold"
                    >
                      <option value="Standard Fitness">Standard Fitness (रू 2,500/mo)</option>
                      <option value="Transcend Elite">Transcend Elite (रू 3,500/mo)</option>
                      <option value="Platinum VIP Club">Platinum VIP Club (रू 6,000/mo)</option>
                    </select>
                  </div>
                )}

                {formType === "workout" && (
                  <div className="bg-zinc-950 border border-zinc-850 p-2.5 rounded-lg text-[10px] text-zinc-400 space-y-1">
                    <span className="text-[#ccff00] font-bold block uppercase tracking-wider text-[8px]">
                      🎯 Currently active program
                    </span>
                    <div className="flex justify-between text-white font-semibold">
                      <span>Experience: {currentWorkout?.level || "BEGINNER"}</span>
                      <span>Goal: {currentWorkout?.goal || "Muscle Building"}</span>
                    </div>
                  </div>
                )}

                {formType === "diet" && (
                  <div className="bg-zinc-950 border border-zinc-850 p-2.5 rounded-lg text-[10px] text-zinc-400">
                    This template automatically initiates an automated custom calorie / macronutrient audit request for traditional Nepalese food choices (Dal Bhat, chicken, eggs, roti, momo) with our expert coaches.
                  </div>
                )}

                {/* Submit / Launch WhatsApp */}
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5 fill-white" />
                  <span>Launch WhatsApp Automation</span>
                </button>
              </form>
            </div>

            {/* Footer trust badge */}
            <div className="bg-zinc-950 p-2.5 border-t border-zinc-850 text-center flex items-center justify-center gap-1.5 text-[9px] text-zinc-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Secure click-to-chat. No credentials required.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
