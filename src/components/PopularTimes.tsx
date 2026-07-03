import React, { useState } from "react";
import { Clock, Info, Flame } from "lucide-react";
import { motion } from "motion/react";

interface HourOccupancy {
  hour: string;
  label: string;
  value: number; // occupancy percentage
}

export default function PopularTimes() {
  const [selectedDay, setSelectedDay] = useState<"weekday" | "friday" | "saturday">("friday");

  // Custom occupancy data
  const data: Record<"weekday" | "friday" | "saturday", HourOccupancy[]> = {
    weekday: [
      { hour: "6a", label: "6 AM", value: 75 },
      { hour: "7a", label: "7 AM", value: 90 },
      { hour: "8a", label: "8 AM", value: 80 },
      { hour: "9a", label: "9 AM", value: 50 },
      { hour: "10a", label: "10 AM", value: 30 },
      { hour: "11a", label: "11 AM", value: 20 },
      { hour: "12p", label: "12 PM", value: 35 },
      { hour: "1p", label: "1 PM", value: 30 },
      { hour: "2p", label: "2 PM", value: 25 },
      { hour: "3p", label: "3 PM", value: 40 },
      { hour: "4p", label: "4 PM", value: 60 },
      { hour: "5p", label: "5 PM", value: 85 },
      { hour: "6p", label: "6 PM", value: 95 },
      { hour: "7p", label: "7 PM", value: 85 },
      { hour: "8p", label: "8 PM", value: 65 },
      { hour: "9p", label: "9 PM", value: 30 },
    ],
    friday: [
      { hour: "6a", label: "6 AM", value: 80 },
      { hour: "7a", label: "7 AM", value: 95 },
      { hour: "8a", label: "8 AM", value: 85 },
      { hour: "9a", label: "9 AM", value: 55 },
      { hour: "10a", label: "10 AM", value: 35 },
      { hour: "11a", label: "11 AM", value: 25 },
      { hour: "12p", label: "12 PM", value: 40 },
      { hour: "1p", label: "1 PM", value: 30 },
      { hour: "2p", label: "2 PM", value: 25 },
      { hour: "3p", label: "3 PM", value: 45 },
      { hour: "4p", label: "4 PM", value: 65 },
      { hour: "5p", label: "5 PM", value: 90 },
      { hour: "6p", label: "6 PM", value: 100 },
      { hour: "7p", label: "7 PM", value: 90 },
      { hour: "8p", label: "8 PM", value: 70 },
      { hour: "9p", label: "9 PM", value: 40 },
    ],
    saturday: [
      { hour: "6a", label: "6 AM", value: 40 },
      { hour: "7a", label: "7 AM", value: 65 },
      { hour: "8a", label: "8 AM", value: 80 },
      { hour: "9a", label: "9 AM", value: 85 },
      { hour: "10a", label: "10 AM", value: 90 },
      { hour: "11a", label: "11 AM", value: 85 },
      { hour: "12p", label: "12 PM", value: 70 },
      { hour: "1p", label: "1 PM", value: 50 },
      { hour: "2p", label: "2 PM", value: 40 },
      { hour: "3p", label: "3 PM", value: 45 },
      { hour: "4p", label: "4 PM", value: 55 },
      { hour: "5p", label: "5 PM", value: 65 },
      { hour: "6p", label: "6 PM", value: 75 },
      { hour: "7p", label: "7 PM", value: 60 },
      { hour: "8p", label: "8 PM", value: 45 },
      { hour: "9p", label: "9 PM", value: 20 },
    ],
  };

  const currentHour = new Date().getHours();
  const currentMinutes = new Date().getMinutes();
  const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
  const isFriday = new Date().getDay() === 5;

  let activeDataDay: "weekday" | "friday" | "saturday" = "weekday";
  if (isFriday) activeDataDay = "friday";
  else if (isWeekend) activeDataDay = "saturday";

  const currentOccupancyArray = data[activeDataDay];
  let currentOccupancy = 0;
  let timeLabel = "";

  // Find occupancy for the current hour
  const matchedHour = currentOccupancyArray.find((item) => {
    const itemHour = parseInt(item.hour);
    const isPm = item.hour.includes("p");
    let convertedHour = itemHour;
    if (isPm && itemHour !== 12) convertedHour += 12;
    if (!isPm && itemHour === 12) convertedHour = 0; // 12a
    return convertedHour === currentHour;
  });

  if (matchedHour) {
    currentOccupancy = matchedHour.value;
    timeLabel = matchedHour.label;
  }

  const isOpen = currentHour >= 6 && (currentHour < 21 || (currentHour === 21 && currentMinutes <= 30));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl" id="popular-times-widget">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-5 h-5 text-[#ccff00]" />
            <h3 className="text-xl font-bold text-white tracking-tight">Popular Workout Hours</h3>
          </div>
          <p className="text-zinc-400 text-sm">
            Plan your workouts and avoid the rush at Kuleshwor's favorite gym.
          </p>
        </div>

        <div className="flex gap-1.5 bg-zinc-950 p-1 rounded-xl border border-zinc-850 self-start md:self-center">
          <button
            onClick={() => setSelectedDay("weekday")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              selectedDay === "weekday"
                ? "bg-[#ccff00] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Mon - Thu
          </button>
          <button
            onClick={() => setSelectedDay("friday")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              selectedDay === "friday"
                ? "bg-[#ccff00] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Fridays
          </button>
          <button
            onClick={() => setSelectedDay("saturday")}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
              selectedDay === "saturday"
                ? "bg-[#ccff00] text-black shadow-md"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Saturdays
          </button>
        </div>
      </div>

      {isOpen && currentOccupancy > 0 ? (
        <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-4 mb-6">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ccff00] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ccff00]"></span>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">
              Live Occupancy: <span className="text-[#ccff00]">{currentOccupancy}% busy</span>
            </div>
            <p className="text-xs text-zinc-400">
              Based on real-time activity metrics. Gym is currently open and buzzing!
            </p>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-xl p-4 mb-6">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div>
            <div className="text-sm font-semibold text-white">
              Gym is currently: <span className="text-red-400">Closed</span>
            </div>
            <p className="text-xs text-zinc-400">
              Open daily from 6:00 AM to 9:30 PM. Plan your visit for tomorrow morning!
            </p>
          </div>
        </div>
      )}

      {/* Bar graph */}
      <div className="relative pt-4 pb-2">
        <div className="flex items-end justify-between h-48 gap-1.5 md:gap-3 px-1">
          {data[selectedDay].map((item, index) => {
            const isPeak = item.value >= 90;
            const isCurrent = isOpen && activeDataDay === selectedDay && item.label === timeLabel;

            return (
              <div key={index} className="flex-1 flex flex-col items-center h-full group">
                <div className="relative w-full h-full flex items-end justify-center rounded-t-md overflow-visible">
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 bg-zinc-950 border border-zinc-800 text-[10px] text-white px-2 py-1 rounded opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-xl whitespace-nowrap z-10">
                    <span className="font-bold text-[#ccff00]">{item.value}%</span> Busy
                  </div>

                  {/* Visual Bar */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${item.value}%` }}
                    transition={{ duration: 0.6, delay: index * 0.02, ease: "easeOut" }}
                    className={`w-full rounded-t-sm transition-all duration-300 ${
                      isCurrent
                        ? "bg-[#ccff00] border-t-2 border-white shadow-[0_0_12px_rgba(204,255,0,0.5)]"
                        : isPeak
                        ? "bg-[#a3cc00] group-hover:bg-[#ccff00]"
                        : "bg-zinc-700 group-hover:bg-zinc-500"
                    }`}
                  />
                </div>
                {/* Labels for specific key hours to keep layout clean */}
                <span className="text-[10px] md:text-xs font-mono text-zinc-500 mt-2 tracking-tighter">
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-4 mt-4 pt-4 border-t border-zinc-850 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-zinc-700 rounded-sm"></span>
            <span>Normal</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#a3cc00] rounded-sm"></span>
            <span>Peak Hours</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-[#ccff00] rounded-sm shadow-[0_0_4px_rgba(204,255,0,0.5)]"></span>
            <span>Live / Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
}
