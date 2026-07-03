import React from "react";
import { Shield, Sparkles, Flame, Heart } from "lucide-react";
import { motion } from "motion/react";

interface Facility {
  id: string;
  name: string;
  description: string;
  tag: string;
  imageUrl: string;
  icon: React.ReactNode;
}

export default function Facilities() {
  const facilities: Facility[] = [
    {
      id: "fac-1",
      name: "High-Caliber Strength Zone",
      description: "Equipped with heavy-duty squat cages, premium calibrated plates, dumbbell racks up to 40kg, cable towers, and high-quality hypertrophy pin machines.",
      tag: "Strength",
      imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
      icon: <Flame className="w-4 h-4 text-[#ccff00]" />,
    },
    {
      id: "fac-2",
      name: "Endurance & Cardio Studio",
      description: "Durable treadmills, dynamic ellipticals, heavy-duty rowers, and upright spin bikes with real-time biometric telemetry tracking to keep your heart rate optimal.",
      tag: "Conditioning",
      imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=600&auto=format&fit=crop",
      icon: <Heart className="w-4 h-4 text-[#ccff00]" />,
    },
    {
      id: "fac-3",
      name: "Zumba & Group Fitness Arena",
      description: "A wide, fully-mirrored floor designed for energetic aerobics, core stretching, functional athletic bootcamps, and high-energy Zumba sessions.",
      tag: "Dance & Zumba",
      imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=600&auto=format&fit=crop",
      icon: <Sparkles className="w-4 h-4 text-[#ccff00]" />,
    },
    {
      id: "fac-4",
      name: "Pristine Recovery & Locker Rooms",
      description: "Premium sanitization lockers to secure your belongings, followed by private shower facilities and a deep-cleansing steam room to accelerate muscular recovery.",
      tag: "Premium",
      imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=600&auto=format&fit=crop",
      icon: <Shield className="w-4 h-4 text-[#ccff00]" />,
    },
  ];

  return (
    <div className="space-y-6" id="gym-facilities">
      <div>
        <h3 className="text-2xl font-black text-white tracking-tight">Our Premium Facilities</h3>
        <p className="text-zinc-400 text-sm mt-1">
          Explore the state-of-the-art training zones built to unleash your full physical potential.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {facilities.map((fac, index) => (
          <motion.div
            key={fac.id}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group relative bg-zinc-900 border border-zinc-850 hover:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300"
          >
            {/* Image section with beautiful zoom effect */}
            <div className="h-56 relative overflow-hidden bg-zinc-950">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent z-10" />
              <img
                src={fac.imageUrl}
                alt={fac.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                referrerPolicy="no-referrer"
              />
              
              {/* Badge */}
              <span className="absolute top-4 left-4 z-20 bg-zinc-950/80 border border-zinc-800 text-white font-extrabold text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 backdrop-blur-xs">
                {fac.icon}
                {fac.tag}
              </span>
            </div>

            {/* Description section */}
            <div className="p-5 space-y-2">
              <h4 className="text-white text-base font-extrabold tracking-tight group-hover:text-[#ccff00] transition-colors duration-200">
                {fac.name}
              </h4>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                {fac.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
