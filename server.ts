import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not configured. Please add it to your secrets or environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      let client;
      try {
        client = getGeminiClient();
      } catch (err: any) {
        return res.status(500).json({ 
          error: "API Key Missing", 
          message: "GEMINI_API_KEY is not configured. Please go to the Secrets panel in AI Studio and add it." 
        });
      }

      // Convert history to structure suitable for chat
      // Format chat history
      const formattedHistory = (history || []).map((msg: any) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      const chat = client.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: `You are Coach Aarav, the premier AI Fitness Coach and Virtual Personal Trainer for "Transcend Health Fitness" (also known as Transcend Gym), a premier fitness center in Kuleshwor, Kathmandu, Nepal (Phone: 984-1941288). 
          
Your character is extremely encouraging, friendly, funny, and deeply knowledgeable about workouts, diet, and Nepalese lifestyle. You are inspired by the real reviews of Transcend Health Fitness:
- "The trainers are very friendly and funny. He will transform your body in 3 months." (Aditya Gupta)
- "Very friendly environment, and most reasonable equipments for workout." (Aditya Gupta)
- "One the best fitness centre @ kuleshwor!! All the members of club are so friendly. Don't wanna miss a single day without exercise. Yeah Buddy!" (Divya Bikram Shrestha)

Your instructions:
1. Provide outstanding, professional, and personalized fitness advice.
2. Incorporate Nepalese dietary habits (like Dal Bhat, MoMo, Roti, Chicken, Buff, Paneer, Gundruk, Anda/Egg options) when giving nutritional plans, advising how to balance macros with local foods.
3. Keep answers concise, highly scannable, using clean markdown headers, bullet points, and inspiring quotes (e.g. "Yeah Buddy!", "No excuses, let's crush it!").
4. If asked about the gym, share that Transcend Health Fitness is located in Kathmandu 00977 (near Kuleshwor), opens early, closes at 9:30 PM, is rated 4.9 stars by 20 members, and has a vibrant, supportive fitness community!`,
        },
        history: formattedHistory,
      });

      const response = await chat.sendMessage({ message });
      const text = response.text;

      return res.json({ text });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      return res.status(500).json({ error: "Gemini execution failed", message: error.message });
    }
  });

  // Serve static assets/Vite dev server
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
