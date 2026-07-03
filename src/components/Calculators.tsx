import React, { useState } from "react";
import { Scale, Flame, RefreshCw, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<"bmi" | "calorie">("bmi");

  // BMI states
  const [bmiWeight, setBmiWeight] = useState<string>("70");
  const [bmiHeight, setBmiHeight] = useState<string>("175");
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string; color: string; advice: string } | null>(null);

  // Calorie states
  const [gender, setGender] = useState<"male" | "female">("male");
  const [calWeight, setCalWeight] = useState<string>("72");
  const [calHeight, setCalHeight] = useState<string>("178");
  const [age, setAge] = useState<string>("25");
  const [activity, setActivity] = useState<string>("1.55"); // Moderately active default
  const [goal, setGoal] = useState<string>("loss"); // loss, maintain, gain
  const [calorieResult, setCalorieResult] = useState<{
    bmr: number;
    tdee: number;
    target: number;
    macros: { protein: number; carbs: number; fats: number };
  } | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(bmiWeight);
    const h = parseFloat(bmiHeight) / 100; // to meters

    if (isNaN(w) || isNaN(h) || h === 0) return;

    const bmi = parseFloat((w / (h * h)).toFixed(1));
    let category = "";
    let color = "";
    let advice = "";

    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-400";
      advice = "Consider a structured strength training routine and a slight caloric surplus at Transcend Gym to build healthy muscle mass safely.";
    } else if (bmi >= 18.5 && bmi < 25) {
      category = "Normal Weight";
      color = "text-[#ccff00]";
      advice = "Fantastic job! Your body composition is optimal. Maintain your fitness with regular hypertrophy and cardiovascular conditioning at Transcend.";
    } else if (bmi >= 25 && bmi < 30) {
      category = "Overweight";
      color = "text-amber-400";
      advice = "A hybrid regime combining high-intensity resistance training and high-intensity interval training (HIIT) can help you lean down while preserving strength.";
    } else {
      category = "Obese";
      color = "text-red-400";
      advice = "Focus on consistent, low-impact cardiovascular work and introductory strength training. Our coaches can customize a safe, life-changing 3-month roadmap for you.";
    }

    setBmiResult({ bmi, category, color, advice });
  };

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();
    const w = parseFloat(calWeight);
    const h = parseFloat(calHeight);
    const a = parseFloat(age);
    const act = parseFloat(activity);

    if (isNaN(w) || isNaN(h) || isNaN(a)) return;

    // Harris-Benedict BMR Formula
    let bmr = 0;
    if (gender === "male") {
      bmr = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a;
    } else {
      bmr = 447.593 + 9.247 * w + 3.098 * h - 4.33 * a;
    }

    const tdee = Math.round(bmr * act);
    let target = tdee;

    if (goal === "loss") {
      target = tdee - 500; // moderate 500kcal deficit
    } else if (goal === "gain") {
      target = tdee + 400; // clean bulking surplus
    }

    // Macros distribution based on fitness goals
    // Protein: ~2g per kg of weight
    const proteinGrams = Math.round(w * 2);
    const proteinCalories = proteinGrams * 4;

    // Fats: ~25% of target calories
    const fatCalories = Math.round(target * 0.25);
    const fatGrams = Math.round(fatCalories / 9);

    // Carbs: Rest of the calories
    const carbCalories = target - (proteinCalories + fatCalories);
    const carbGrams = Math.max(20, Math.round(carbCalories / 4));

    setCalorieResult({
      bmr: Math.round(bmr),
      tdee,
      target,
      macros: {
        protein: proteinGrams,
        fats: fatGrams,
        carbs: carbGrams,
      },
    });
  };

  return (
    <div className="bg-zinc-900 border border-zinc-850 rounded-2xl overflow-hidden shadow-xl" id="fitness-calculators">
      {/* Tabs */}
      <div className="flex border-b border-zinc-800 bg-zinc-950">
        <button
          onClick={() => setActiveTab("bmi")}
          className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold border-b-2 transition-all duration-200 ${
            activeTab === "bmi"
              ? "border-[#ccff00] text-white bg-zinc-900/40"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <Scale className="w-4 h-4" />
          BMI Calculator
        </button>
        <button
          onClick={() => setActiveTab("calorie")}
          className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-bold border-b-2 transition-all duration-200 ${
            activeTab === "calorie"
              ? "border-[#ccff00] text-white bg-zinc-900/40"
              : "border-transparent text-zinc-400 hover:text-white"
          }`}
        >
          <Flame className="w-4 h-4" />
          TDEE & Calorie Goal
        </button>
      </div>

      <div className="p-6">
        {activeTab === "bmi" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* BMI Form */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Calculate Body Mass Index</h4>
              <form onSubmit={calculateBMI} className="space-y-4">
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={bmiWeight}
                    onChange={(e) => setBmiWeight(e.target.value)}
                    placeholder="e.g. 70"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#ccff00] text-white rounded-xl px-4 py-3 outline-none transition-colors duration-200 font-semibold"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 text-xs font-bold uppercase tracking-wider mb-2">
                    Height (cm)
                  </label>
                  <input
                    type="number"
                    value={bmiHeight}
                    onChange={(e) => setBmiHeight(e.target.value)}
                    placeholder="e.g. 175"
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#ccff00] text-white rounded-xl px-4 py-3 outline-none transition-colors duration-200 font-semibold"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#ccff00] hover:bg-[#b5e000] text-black font-bold py-3 px-6 rounded-xl transition-all duration-200 cursor-pointer shadow-lg shadow-lime-950/20"
                >
                  Calculate BMI
                </button>
              </form>
            </div>

            {/* BMI Results */}
            <div className="flex flex-col justify-center bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
              {bmiResult ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  <div className="text-zinc-400 text-xs font-bold uppercase tracking-widest">Your Result</div>
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-extrabold text-white tracking-tight">{bmiResult.bmi}</span>
                    <span className={`text-lg font-bold ${bmiResult.color}`}>{bmiResult.category}</span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="bg-[#ccff00] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(10, (bmiResult.bmi / 40) * 100))}%` }}
                    />
                  </div>
                  <p className="text-zinc-350 text-sm leading-relaxed">{bmiResult.advice}</p>

                  <div className="bg-zinc-900/60 p-3.5 rounded-lg border border-zinc-850 flex items-start gap-2.5 text-xs text-zinc-400">
                    <CheckCircle className="w-4 h-4 text-[#ccff00] flex-shrink-0 mt-0.5" />
                    <span>
                      Need a precise body composition analysis? Come to Transcend Gym in Kuleshwor for an expert in-person evaluation with funny & friendly trainers!
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center space-y-3">
                  <Scale className="w-12 h-12 text-zinc-700 mx-auto" />
                  <p className="text-zinc-400 font-medium">Enter your weight and height to discover your BMI metrics instantly.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Calorie Form */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-white font-bold text-lg">Calorie & Macro Profiler</h4>
              <form onSubmit={calculateCalories} className="space-y-4">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGender("male")}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      gender === "male"
                        ? "bg-[#ccff00]/10 border-[#ccff00] text-white"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender("female")}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl border transition-all ${
                      gender === "female"
                        ? "bg-[#ccff00]/10 border-[#ccff00] text-white"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-white"
                    }`}
                  >
                    Female
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={calWeight}
                      onChange={(e) => setCalWeight(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#ccff00] text-white rounded-xl px-3 py-2.5 text-sm outline-none transition-colors duration-200 font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={calHeight}
                      onChange={(e) => setCalHeight(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#ccff00] text-white rounded-xl px-3 py-2.5 text-sm outline-none transition-colors duration-200 font-semibold"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                      Age
                    </label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#ccff00] text-white rounded-xl px-3 py-2.5 text-sm outline-none transition-colors duration-200 font-semibold"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Activity Level
                  </label>
                  <select
                    value={activity}
                    onChange={(e) => setActivity(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#ccff00] text-white rounded-xl px-3 py-2.5 text-sm outline-none transition-colors duration-200 font-semibold"
                  >
                    <option value="1.2">Sedentary (Little to no exercise)</option>
                    <option value="1.375">Lightly Active (1-3 days/week)</option>
                    <option value="1.55">Moderately Active (3-5 days/week)</option>
                    <option value="1.725">Very Active (6-7 days intense work)</option>
                    <option value="1.9">Athlete / Hard Physical Labor</option>
                  </select>
                </div>

                <div>
                  <label className="block text-zinc-400 text-[10px] font-bold uppercase tracking-wider mb-1.5">
                    Your Fitness Goal
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 focus:border-[#ccff00] text-white rounded-xl px-3 py-2.5 text-sm outline-none transition-colors duration-200 font-semibold"
                  >
                    <option value="loss">Fat Loss / Caloric Deficit (-500 kcal)</option>
                    <option value="maintain">Maintain Current Weight</option>
                    <option value="gain">Build Muscle / Caloric Surplus (+400 kcal)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#ccff00] hover:bg-[#b5e000] text-black font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-200 cursor-pointer shadow-lg shadow-lime-950/20"
                >
                  Calculate TDEE & Macros
                </button>
              </form>
            </div>

            {/* Calorie Results */}
            <div className="lg:col-span-7 flex flex-col justify-center bg-zinc-950 border border-zinc-800 rounded-xl p-6">
              {calorieResult ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-850">
                      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">BMR (Base Rate)</div>
                      <div className="text-2xl font-extrabold text-white">{calorieResult.bmr} <span className="text-xs font-medium text-zinc-500">kcal/day</span></div>
                    </div>
                    <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-850">
                      <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-1">TDEE (Daily Burn)</div>
                      <div className="text-2xl font-extrabold text-white">{calorieResult.tdee} <span className="text-xs font-medium text-zinc-500">kcal/day</span></div>
                    </div>
                  </div>

                  <div className="bg-[#ccff00]/10 border border-[#ccff00]/25 p-5 rounded-xl text-center">
                    <div className="text-zinc-300 text-xs font-bold uppercase tracking-widest mb-1.5">Suggested Daily Target</div>
                    <div className="text-4xl font-black text-[#ccff00]">{calorieResult.target} <span className="text-lg font-bold">calories</span></div>
                    <p className="text-[11px] text-zinc-400 mt-2">
                      To successfully achieve your selected <span className="font-bold text-white">{goal === "loss" ? "Fat Loss" : goal === "gain" ? "Muscle Gain" : "Weight Maintenance"}</span> roadmap.
                    </p>
                  </div>

                  {/* Macronutrient Splits */}
                  <div className="space-y-3">
                    <div className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Macronutrient Targets</div>
                    
                    <div className="space-y-2.5">
                      {/* Protein */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-white">Protein (4 kcal/g)</span>
                          <span className="text-[#ccff00]">{calorieResult.macros.protein}g / {calorieResult.macros.protein * 4} kcal</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-[#ccff00] h-full rounded-full"
                            style={{ width: `${(calorieResult.macros.protein * 4 / calorieResult.target) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Fats */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-white">Fats (9 kcal/g)</span>
                          <span className="text-amber-400">{calorieResult.macros.fats}g / {calorieResult.macros.fats * 9} kcal</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-amber-400 h-full rounded-full"
                            style={{ width: `${(calorieResult.macros.fats * 9 / calorieResult.target) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Carbs */}
                      <div>
                        <div className="flex justify-between text-xs font-bold mb-1">
                          <span className="text-white">Carbohydrates (4 kcal/g)</span>
                          <span className="text-blue-400">{calorieResult.macros.carbs}g / {calorieResult.macros.carbs * 4} kcal</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-blue-400 h-full rounded-full"
                            style={{ width: `${(calorieResult.macros.carbs * 4 / calorieResult.target) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="text-center space-y-3 py-8">
                  <Flame className="w-12 h-12 text-zinc-700 mx-auto" />
                  <p className="text-zinc-400 font-medium">Configure your details on the left to reveal your bespoke daily calories & macro targets.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
