import React, { useState } from "react";
import { Dumbbell, Target, Award, ArrowRight, Zap, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { WorkoutPlan } from "../types";

export default function WorkoutPlanner() {
  const [level, setLevel] = useState<"beginner" | "intermediate" | "advanced">("beginner");
  const [goal, setGoal] = useState<"muscle" | "fat" | "strength">("muscle");
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  // Hardcoded highly tailored plans based on selections
  const getWorkoutPlan = (lvl: string, g: string): WorkoutPlan => {
    if (g === "muscle") {
      return {
        level: lvl.toUpperCase(),
        goal: "Muscle Building (Hypertrophy)",
        description: "Maximize mechanical tension and metabolic stress to stimulate maximum hypertrophy. Focus on proper form and a 3-month progressive overload program.",
        schedule: [
          {
            day: "Day 1 (Push Day)",
            focus: "Chest, Shoulders & Triceps",
            exercises: [
              { name: "Incline Dumbbell Press", sets: "4", reps: "8-10" },
              { name: "Flat Bench Barbell Press", sets: "3", reps: "10" },
              { name: "Seated Overhead Dumbbell Press", sets: "3", reps: "10-12" },
              { name: "Cable Lateral Raises", sets: "4", reps: "12-15" },
              { name: "Tricep Pushdowns (Rope)", sets: "3", reps: "12" },
            ]
          },
          {
            day: "Day 2 (Pull Day)",
            focus: "Back, Rear Delts & Biceps",
            exercises: [
              { name: "Lat Pulldowns (Wide Grip)", sets: "4", reps: "10-12" },
              { name: "Bent-Over Barbell Rows", sets: "3", reps: "8-10" },
              { name: "Seated Cable Rows", sets: "3", reps: "12" },
              { name: "Incline Dumbbell Bicep Curls", sets: "3", reps: "12" },
              { name: "Face Pulls", sets: "4", reps: "15" },
            ]
          },
          {
            day: "Day 3 (Leg Day)",
            focus: "Quads, Hamstrings & Calves",
            exercises: [
              { name: "Barbell Back Squats", sets: "4", reps: "8-10" },
              { name: "Romanian Deadlifts", sets: "3", reps: "10-12" },
              { name: "Leg Press", sets: "3", reps: "12" },
              { name: "Lying Leg Curls", sets: "3", reps: "15" },
              { name: "Standing Calf Raises", sets: "4", reps: "15-20" },
            ]
          }
        ]
      };
    } else if (g === "fat") {
      return {
        level: lvl.toUpperCase(),
        goal: "Fat Loss & Conditioning",
        description: "Maintain high metabolic demand with elevated heart rates, shorter rest intervals, and compound actions to maximize caloric expenditure.",
        schedule: [
          {
            day: "Day 1 (Upper Body Conditioning)",
            focus: "Upper Body & High Intensity Cardio",
            exercises: [
              { name: "Pushups / Incline Pushups", sets: "4", reps: "Max" },
              { name: "Dumbbell Thrusters", sets: "3", reps: "12-15" },
              { name: "Single Arm Dumbbell Rows", sets: "3", reps: "12" },
              { name: "Medicine Ball Slams", sets: "4", reps: "45 seconds" },
              { name: "Elliptical / Row Machine", sets: "1", reps: "15 mins HIIT" },
            ]
          },
          {
            day: "Day 2 (Lower Body Fat Destroyer)",
            focus: "Glutes, Legs & Abs Core",
            exercises: [
              { name: "Goblet Squats", sets: "4", reps: "15" },
              { name: "Walking Lunges", sets: "3", reps: "20 steps" },
              { name: "Kettlebell Swings", sets: "4", reps: "20" },
              { name: "Hanging Knee Raises", sets: "3", reps: "15" },
              { name: "Plank Hold", sets: "3", reps: "60 seconds" },
            ]
          },
          {
            day: "Day 3 (Full Body Circuit)",
            focus: "High Heart Rate Full Body",
            exercises: [
              { name: "Burpees", sets: "3", reps: "12" },
              { name: "Dumbbell Renegade Rows", sets: "3", reps: "10 per arm" },
              { name: "Jump Squats", sets: "4", reps: "15" },
              { name: "Mountain Climbers", sets: "3", reps: "45 seconds" },
              { name: "Battle Ropes", sets: "4", reps: "30 seconds" },
            ]
          }
        ]
      };
    } else {
      return {
        level: lvl.toUpperCase(),
        goal: "Maximum Strength & Power",
        description: "Focus on neural adaptations, moving heavy loads, and longer rest times. Master the main 3 power lifts to elevate pure physical output.",
        schedule: [
          {
            day: "Day 1 (Squat Focus)",
            focus: "Squat Power & Lower Accessory",
            exercises: [
              { name: "Barbell Back Squats", sets: "5", reps: "3-5 (Heavy)" },
              { name: "Leg Press", sets: "3", reps: "8" },
              { name: "Leg Extensions", sets: "3", reps: "10-12" },
              { name: "Standing Calf Raises", sets: "3", reps: "12" },
              { name: "Plank with Weight Plate", sets: "3", reps: "45 seconds" },
            ]
          },
          {
            day: "Day 2 (Bench Press Focus)",
            focus: "Bench Press & Upper Accessory",
            exercises: [
              { name: "Flat Barbell Bench Press", sets: "5", reps: "3-5 (Heavy)" },
              { name: "Overhead Barbell Press", sets: "4", reps: "6" },
              { name: "Weighted Chest Dips", sets: "3", reps: "8" },
              { name: "Barbell Pendlay Rows", sets: "4", reps: "6-8" },
              { name: "Dumbbell Hammer Curls", sets: "3", reps: "10" },
            ]
          },
          {
            day: "Day 3 (Deadlift Focus)",
            focus: "Deadlift Power & Back accessory",
            exercises: [
              { name: "Conventional Deadlifts", sets: "4", reps: "3-5 (Heavy)" },
              { name: "Weighted Pullups", sets: "4", reps: "6" },
              { name: "T-Bar Rows", sets: "3", reps: "8" },
              { name: "Seated Dumbbell Rear Delt Flyes", sets: "3", reps: "12" },
              { name: "Barbell Shrugs", sets: "3", reps: "8-10" },
            ]
          }
        ]
      };
    }
  };

  const plan = getWorkoutPlan(level, goal);
  const activeDay = plan.schedule[selectedDayIndex] || plan.schedule[0];

  return (
    <div className="bg-zinc-900 border border-zinc-850 rounded-2xl p-6 shadow-xl" id="workout-planner-widget">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Dumbbell className="w-5 h-5 text-[#ccff00]" />
            <h3 className="text-xl font-bold text-white tracking-tight">3-Month Body Transformation</h3>
          </div>
          <p className="text-zinc-400 text-sm">
            Tailored routines inspired by Transcend Kuleshwor's training philosophy.
          </p>
        </div>

        {/* Motivational Accent */}
        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 text-[#ccff00] text-xs font-semibold py-1.5 px-3 rounded-full self-start">
          <Zap className="w-3.5 h-3.5 animate-pulse" />
          <span>Transform in 3 Months!</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Selector Panel */}
        <div className="lg:col-span-4 space-y-5">
          {/* Level Selector */}
          <div>
            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2.5">
              Select Experience Level
            </label>
            <div className="flex flex-col gap-2">
              {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all flex items-center justify-between ${
                    level === lvl
                      ? "bg-[#ccff00]/10 border-[#ccff00] text-white shadow-md shadow-lime-950/5"
                      : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  <span className="capitalize">{lvl}</span>
                  {level === lvl && <Award className="w-4 h-4 text-[#ccff00]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Goal Selector */}
          <div>
            <label className="block text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-2.5">
              Select Transformation Goal
            </label>
            <div className="flex flex-col gap-2">
              {[
                { id: "muscle", name: "Muscle Hypertrophy", desc: "Build lean mass" },
                { id: "fat", name: "Fat Burning & Cardio", desc: "Shed extra weight" },
                { id: "strength", name: "Maximum Strength", desc: "Lift heavy loads" },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => {
                    setGoal(g.id as any);
                    setSelectedDayIndex(0);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all flex flex-col ${
                    goal === g.id
                      ? "bg-[#ccff00]/10 border-[#ccff00] text-white shadow-md"
                      : "bg-zinc-950 border-zinc-850 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Target className={`w-3.5 h-3.5 ${goal === g.id ? "text-[#ccff00]" : "text-zinc-500"}`} />
                    {g.name}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-medium mt-0.5 ml-5">{g.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Plan Display Panel */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 flex flex-col">
          {/* Plan Header */}
          <div className="border-b border-zinc-850 pb-4 mb-4">
            <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
              Generated {plan.level} Program
            </span>
            <h4 className="text-white text-lg font-extrabold tracking-tight mt-1">
              {plan.goal}
            </h4>
            <p className="text-zinc-400 text-sm mt-1.5 leading-relaxed">
              {plan.description}
            </p>
          </div>

          {/* Workout Day Tabs */}
          <div className="flex border-b border-zinc-850 mb-4 bg-zinc-900/40 p-1 rounded-xl">
            {plan.schedule.map((dayObj, index) => (
              <button
                key={index}
                onClick={() => setSelectedDayIndex(index)}
                className={`flex-1 text-center py-2 text-xs font-extrabold rounded-lg transition-all ${
                  selectedDayIndex === index
                    ? "bg-zinc-800 text-white border border-zinc-700"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {dayObj.day.split(" ")[0] + " " + dayObj.day.split(" ")[1]}
              </button>
            ))}
          </div>

          {/* Active Day Exercises */}
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between text-xs text-zinc-500 font-bold mb-2 uppercase tracking-wider">
              <span>Focus: <strong className="text-white">{activeDay.focus}</strong></span>
              <span>Total: {activeDay.exercises.length} Movements</span>
            </div>

            <div className="space-y-2.5">
              {activeDay.exercises.map((ex, index) => (
                <div
                  key={index}
                  className="bg-zinc-900 border border-zinc-850 hover:border-zinc-800 p-3.5 rounded-xl flex items-center justify-between transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-md bg-zinc-800 text-zinc-400 text-xs font-mono font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-sm font-bold text-white tracking-tight">{ex.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-zinc-950 text-zinc-350 text-xs px-2.5 py-1 rounded border border-zinc-800 font-semibold">
                      {ex.sets} Sets
                    </span>
                    <span className="text-[#ccff00] text-xs font-mono font-bold">
                      {ex.reps} reps
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callout */}
          <div className="mt-6 pt-4 border-t border-zinc-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-4 h-4 text-[#ccff00]" />
              Tracked safely in localStorage.
            </span>
            <button 
              onClick={() => {
                const el = document.getElementById("membership-explorer");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-[#ccff00] hover:text-[#b5e000] font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              Get personal assistance to start <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
