import React, { useState, useEffect } from "react";
import { 
  Dumbbell, 
  MapPin, 
  Clock, 
  Phone, 
  Star, 
  Share2, 
  ExternalLink, 
  Award, 
  MessageCircle, 
  Flame, 
  ShieldCheck, 
  Sparkles, 
  Info,
  Smartphone,
  CheckCircle,
  TrendingUp,
  Map,
  ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import PopularTimes from "./components/PopularTimes";
import Calculators from "./components/Calculators";
import WorkoutPlanner from "./components/WorkoutPlanner";
import ReviewsSection from "./components/ReviewsSection";
import Facilities from "./components/Facilities";
import MembershipPlans from "./components/MembershipPlans";
import WhatsAppAutomator from "./components/WhatsAppAutomator";
import gymBg from "./assets/images/transcend_gym.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState<"overview" | "workouts" | "calculators" | "facilities" | "reviews">("overview");
  const [shareStatus, setShareStatus] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);
  const [currentTimeStr, setCurrentTimeStr] = useState("");

  // Check if gym is currently open based on browser time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Open 6:00 AM to 9:30 PM
      const openTime = 6 * 60; // 360 mins
      const closeTime = 21 * 60 + 30; // 1290 mins
      const currentMinutes = hours * 60 + minutes;

      setIsOpenNow(currentMinutes >= openTime && currentMinutes < closeTime);
      
      // Format simple local time string for the user
      let h = hours % 12;
      h = h ? h : 12;
      const m = minutes < 10 ? "0" + minutes : minutes;
      const ampm = hours >= 12 ? "PM" : "AM";
      setCurrentTimeStr(`${h}:${m} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareStatus(true);
    setTimeout(() => setShareStatus(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-[#ccff00] selection:text-black" id="transcend-gym-app">
      {/* 1. Header / Navbar */}
      <header className="sticky top-0 z-40 bg-black/85 backdrop-blur-md border-b border-zinc-900" id="gym-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#ccff00] text-black font-black rounded-lg flex items-center justify-center shadow-[0_0_10px_rgba(204,255,0,0.3)]">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-white font-black text-sm tracking-tighter uppercase sm:text-base">
                Transcend
              </span>
              <span className="text-[#ccff00] font-black text-xs tracking-widest uppercase block -mt-1 font-mono">
                Health Fitness
              </span>
            </div>
          </div>

          {/* Quick status banner */}
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium font-mono">
              <Clock className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>06:00 AM - 09:30 PM</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium font-mono">
              <Phone className="w-3.5 h-3.5 text-[#ccff00]" />
              <span>984-1941288</span>
            </div>
            <div className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
              isOpenNow 
                ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {isOpenNow ? "● Open Now" : "● Closed Now"}
            </div>
          </div>

          <button 
            onClick={() => {
              const el = document.getElementById("membership-section");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-[#ccff00] hover:bg-[#b5e000] text-black font-black text-xs py-2 px-4 rounded-lg cursor-pointer transition-all shadow-[0_0_10px_rgba(204,255,0,0.15)] uppercase tracking-wider"
          >
            Join Gym
          </button>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[580px] flex items-center justify-center overflow-hidden bg-zinc-950 border-b border-zinc-900" id="gym-hero">
        {/* Background Image with elegant overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <img
             src={gymBg}
             alt="Transcend Gym Background"
             className="w-full h-full object-cover opacity-60 filter grayscale-[20%]"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full text-left">
          <div className="max-w-2xl space-y-5">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-1.5 bg-zinc-900/90 border border-zinc-800 text-[#ccff00] text-xs font-bold py-1.5 px-3.5 rounded-full backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Kathmandu's Top-Rated Fitness Center</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[0.95] uppercase">
              TRANSCEND <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#ccff00]">
                HEALTH FITNESS
              </span>
            </h1>

            {/* Sub-headline / Copy */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-lg font-light">
              Experience the friendliest environment, high-caliber fitness equipments, and expert 3-month body transformation results at Kuleshwor, Kathmandu. 
            </p>

            {/* Rating snippet */}
            <div className="flex items-center gap-3 bg-zinc-950/60 p-3 rounded-xl border border-zinc-900 w-fit backdrop-blur-xs">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-current text-[#ccff00]" />
                ))}
              </div>
              <span className="text-xs font-extrabold text-white">4.9 / 5.0</span>
              <span className="text-zinc-500 text-xs font-medium font-mono">(20 Member Reviews)</span>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById("whatsapp-floating-btn");
                  el?.click();
                }}
                className="bg-[#ccff00] hover:bg-[#b5e000] text-black font-black text-sm py-3 px-6 rounded-xl transition-all shadow-lg cursor-pointer flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Inquiry
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("workout-planner-section");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all cursor-pointer flex items-center gap-2"
              >
                <Dumbbell className="w-4 h-4 text-[#ccff00]" />
                Transform My Body
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Essential Gym Info Row */}
      <section className="bg-zinc-950 py-5 border-b border-zinc-900" id="gym-overview-info">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            
            {/* Address */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[#ccff00]">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Address</div>
                <div className="text-white text-xs sm:text-sm font-extrabold leading-tight">
                  Kuleshwor, Kathmandu
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">14, Kathmandu 00977</div>
              </div>
            </div>

            {/* Timings */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[#ccff00]">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Opening Hours</div>
                <div className="text-white text-xs sm:text-sm font-extrabold leading-tight">
                  06:00 AM - 09:30 PM
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">Open Daily</div>
              </div>
            </div>

            {/* Mobile Contact */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[#ccff00]">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Mobile Phone</div>
                <div className="text-white text-xs sm:text-sm font-extrabold leading-tight">
                  984-1941288
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">Call for inquiries</div>
              </div>
            </div>

            {/* Plus Code */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-850 flex items-center justify-center text-[#ccff00]">
                <Map className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Plus Code</div>
                <div className="text-white text-xs sm:text-sm font-extrabold leading-tight">
                  M8Q2+Q2 Kathmandu
                </div>
                <div className="text-[10px] text-zinc-400 font-mono">Google Maps code</div>
              </div>
            </div>

          </div>

          {/* Quick Actions Row */}
          <div className="flex flex-wrap gap-3 items-center justify-between border-t border-zinc-900 mt-5 pt-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-semibold flex items-center gap-1">
                <Info className="w-3.5 h-3.5 text-zinc-500" />
                Vibe check:
              </span>
              <span className="text-xs text-zinc-200 bg-zinc-900 py-1 px-2.5 rounded-md border border-zinc-850">
                Funny & Friendly Trainers
              </span>
              <span className="text-xs text-zinc-200 bg-zinc-900 py-1 px-2.5 rounded-md border border-zinc-850 hidden sm:inline">
                Reasonable Equipments
              </span>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-850 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-800 cursor-pointer transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>{shareStatus ? "Copied!" : "Share Web"}</span>
              </button>
              <a 
                href="https://maps.google.com/?q=M8Q2+Q2+Kathmandu" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-850 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-zinc-800 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#ccff00]" />
                <span>Google Maps</span>
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Tabbed Component Hub */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" id="main-content-hub">
        
        {/* Navigation Tabs Bar */}
        <div className="flex overflow-x-auto whitespace-nowrap bg-zinc-950 p-1.5 rounded-2xl border border-zinc-900 mb-8 max-w-fit mx-auto">
          {[
            { id: "overview", label: "🏡 Gym Overview" },
            { id: "workouts", label: "🏋️ Workout Planner" },
            { id: "calculators", label: "📊 Calculators & Hours" },
            { id: "facilities", label: "🥇 Facilities & Plans" },
            { id: "reviews", label: "💬 Member Reviews" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#ccff00] text-black shadow-md shadow-lime-950/10"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panels */}
        <div className="space-y-12">
          
          {/* OVERVIEW & COACH TAB */}
          {activeTab === "overview" && (
            <div className="space-y-12 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Coach Introduction */}
                <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-20">
                  <div className="space-y-2">
                    <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest block">
                      Hypertrophy & Physical Training
                    </span>
                    <h2 className="text-3xl font-black text-white tracking-tight leading-none uppercase">
                      MEET COACH AARAV
                    </h2>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      "He will transform your body in 3 months." Coach Aarav and our certified instruction team combine funny, friendly energy with serious hypertrophy metrics to deliver unmatched physical transformation in Kathmandu.
                    </p>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-850">
                      <TrendingUp className="w-5 h-5 text-[#ccff00] mb-2" />
                      <div className="font-bold text-white text-sm">Hypertrophy Goal</div>
                      <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">Tailored hypertrophic programs to build raw muscle mass.</p>
                    </div>
                    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-850">
                      <ShieldCheck className="w-5 h-5 text-[#ccff00] mb-2" />
                      <div className="font-bold text-white text-sm">Friendly Vibe</div>
                      <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">A welcoming community of supportive Kathmandu lifters.</p>
                    </div>
                  </div>

                  {/* Testimonial Quote */}
                  <div className="bg-zinc-950 border-l-2 border-[#ccff00] p-4 rounded-r-xl">
                    <p className="text-xs italic text-zinc-300">
                      "One the best fitness centre @ kuleshwor!! All the members of club are so friendly. Don’t wanna miss a single day without exercise. Yeah Buddy!"
                    </p>
                    <div className="text-[10px] text-zinc-500 font-mono mt-2 uppercase tracking-wider">
                      — Divya Bikram Shrestha (Local Guide)
                    </div>
                  </div>
                </div>

                {/* Gym Information & Inquiries Panel */}
                <div className="lg:col-span-7 bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden flex flex-col min-h-[500px] shadow-xl" id="gym-inquiries-panel">
                  {/* Header */}
                  <div className="bg-zinc-950 border-b border-zinc-800 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/25 flex items-center justify-center text-[#ccff00]">
                        <Dumbbell className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-black flex items-center gap-1.5">
                          TRANSCEND HEALTH HQ
                          <span className="bg-[#ccff00]/10 border border-[#ccff00]/25 text-[#ccff00] text-[9px] font-black uppercase px-2 py-0.5 rounded">
                            Kathmandu
                          </span>
                        </div>
                        <div className="text-[10px] text-zinc-500 font-medium">Official Helpdesk & Inquiries</div>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[10px] font-extrabold">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" />
                      <span>Open Daily</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 p-6 space-y-6 bg-zinc-900/40">
                    {/* Welcome banner */}
                    <div className="space-y-2">
                      <h3 className="text-white text-lg font-black uppercase tracking-tight flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#ccff00]" />
                        Start Your Physical Evolution
                      </h3>
                      <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                        Namaste! Welcome to Transcend Health Fitness in Kuleshwor, Kathmandu! We provide fully structured workouts, high-performance equipment, and custom nutrition guides. No excuses, only results. Yeah Buddy!
                      </p>
                    </div>

                    {/* Quick Inquiry Options */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Location & Contact Card */}
                      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 space-y-3">
                        <div className="text-[#ccff00] font-bold text-xs uppercase tracking-wider">
                          📍 Kathmandu HQ
                        </div>
                        <p className="text-zinc-400 text-xs leading-relaxed animate-none">
                          Kuleshwor, Kathmandu (near main Chowk), Ward 14, Kathmandu 00977, Nepal
                        </p>
                        <div className="text-[11px] text-zinc-500 font-mono space-y-1">
                          <div>📞 Phone: 984-1941288</div>
                          <div>✉️ Email: info@transcendhealth.com</div>
                        </div>
                      </div>

                      {/* Training Hours Card */}
                      <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850 space-y-3">
                        <div className="text-[#ccff00] font-bold text-xs uppercase tracking-wider">
                          🕒 Training Hours
                        </div>
                        <div className="space-y-1 text-zinc-400 text-xs">
                          <div className="flex justify-between">
                            <span>Monday - Sunday:</span>
                            <span className="font-bold text-white">6:00 AM - 9:30 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Steam/Sauna:</span>
                            <span className="font-mono text-white text-[11px]">Daily 4 PM - 8 PM</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-2 leading-tight">
                            Personal training available all day.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Action Area */}
                    <div className="bg-zinc-950/80 p-5 rounded-xl border border-zinc-850 space-y-3">
                      <div className="flex items-center gap-2 text-white font-extrabold text-sm">
                        <MessageCircle className="w-5 h-5 text-[#25D366] fill-[#25D366]" />
                        <span>Interactive WhatsApp Automation Desk</span>
                      </div>
                      <p className="text-zinc-400 text-xs leading-relaxed">
                        Skip forms completely! Open our automated chat dispatcher to pre-register, check opening timings, ask for gym location directions, or request custom nutrition plan coordinates directly.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 pt-1.5">
                        <button
                          onClick={() => {
                            const el = document.getElementById("whatsapp-floating-btn");
                            el?.click();
                          }}
                          className="bg-[#25D366] hover:bg-[#20ba56] text-white font-black text-xs py-2 px-4 rounded-lg flex items-center gap-1.5 cursor-pointer transition-colors"
                        >
                          Launch Inquiries Menu
                        </button>
                        <button
                          onClick={() => {
                            const el = document.getElementById("membership-section");
                            el?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="bg-zinc-900 hover:bg-zinc-850 text-white font-bold text-xs py-2 px-4 rounded-lg border border-zinc-850 cursor-pointer transition-colors"
                        >
                          View Membership Plans
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Footer disclaimer */}
                  <div className="bg-zinc-950 border-t border-zinc-850 p-3 text-center text-[10px] text-zinc-500 font-mono">
                    Official Transcend Health Helpdesk • Kathmandu, Nepal
                  </div>
                </div>
              </div>

              {/* Quick glance section: Popular times */}
              <div className="border-t border-zinc-900 pt-10">
                <PopularTimes />
              </div>
            </div>
          )}

          {/* WORKOUTS TAB */}
          {activeTab === "workouts" && (
            <div className="space-y-6 animate-fade-in" id="workout-planner-section">
              <WorkoutPlanner />
            </div>
          )}

          {/* CALCULATORS TAB */}
          {activeTab === "calculators" && (
            <div className="space-y-12 animate-fade-in" id="calculators-section">
              <Calculators />
              <PopularTimes />
            </div>
          )}

          {/* FACILITIES & PLANS TAB */}
          {activeTab === "facilities" && (
            <div className="space-y-12 animate-fade-in">
              <Facilities />
              <div className="border-t border-zinc-900 pt-12" id="membership-section">
                <MembershipPlans />
              </div>
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === "reviews" && (
            <div className="space-y-6 animate-fade-in" id="reviews-section">
              <ReviewsSection />
            </div>
          )}

        </div>

        {/* 5. Trust Badges row */}
        <section className="mt-20 pt-10 border-t border-zinc-900 text-center space-y-6">
          <div className="text-xs text-zinc-500 font-mono font-bold uppercase tracking-widest">
            — Member of Nepal Physical Fitness Federation —
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
            <span className="text-sm font-extrabold text-white tracking-widest font-mono">HYPERTROPHY SPECIFIC</span>
            <span className="text-sm font-extrabold text-white tracking-widest font-mono">SAFE HYDRAULICS</span>
            <span className="text-sm font-extrabold text-white tracking-widest font-mono">COMMUNITY ORIENTED</span>
            <span className="text-sm font-extrabold text-white tracking-widest font-mono font-black text-[#ccff00]">YEAH BUDDY!</span>
          </div>
        </section>

      </main>

      {/* 6. Footer Section */}
      <footer className="bg-zinc-950 border-t border-zinc-900 py-12 mt-20" id="gym-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Branding & Mission */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#ccff00] text-black font-black rounded flex items-center justify-center">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <span className="text-white font-extrabold tracking-tight uppercase">
                  TRANSCEND HEALTH FITNESS
                </span>
              </div>
              <p className="text-zinc-500 text-xs leading-relaxed max-w-sm">
                Dedicated to providing state-of-the-art physical workout facilities, hypertrophic training guides, and Kathmandu's friendliest fitness environment near Kuleshwor.
              </p>
            </div>

            {/* Quick Map Directions */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest">Directions & Maps</h4>
              <p className="text-zinc-400 text-xs">
                M8Q2+Q2 Kathmandu, Nepal (near Kuleshwor Area)
              </p>
              <a 
                href="https://maps.google.com/?q=M8Q2+Q2+Kathmandu" 
                target="_blank" 
                rel="noreferrer"
                className="text-[#ccff00] hover:text-[#b5e000] text-xs font-bold flex items-center gap-1.5"
              >
                Get Exact Directions on Google Maps <ChevronRight className="w-3 h-3" />
              </a>
            </div>

            {/* Support Hotline */}
            <div className="space-y-3">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest">Phone & Business Hours</h4>
              <div className="text-zinc-400 text-xs font-mono space-y-1">
                <div>Phone: 984-1941288</div>
                <div>Mon-Sun: 06:00 AM - 09:30 PM</div>
              </div>
              <p className="text-zinc-500 text-[11px]">
                Feel free to visit us directly for a free introductory training trial and facility tour.
              </p>
            </div>

          </div>

          {/* Copyleft info */}
          <div className="border-t border-zinc-900 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
            <div>
              &copy; 2026 Transcend Health Fitness Kathmandu. All Rights Reserved.
            </div>
            <div className="flex items-center gap-1.5">
              <span>Crafted with</span>
              <span className="text-red-500 font-bold">♥</span>
              <span>for Kathmandu's fitness community.</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Automation Assistant */}
      <WhatsAppAutomator />
    </div>
  );
}
