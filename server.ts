import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-loaded GoogleGenAI client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not configured in environment variables. Falling back to mock responses.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "MOCK_KEY",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API endpoint for Perizat's Virtual Studio Assistant
app.post("/api/gemini/chat", async (req, res) => {
  const { messages, brief } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Elegant fallback mock answers if no API key is set
    const lastUserMessage = messages[messages.length - 1]?.text || "";
    let reply = "Саламатсызбы! Мен Перизаттын виртуалдык жардамчысымын. Тилекке каршы, азырынча менин жасалма интеллектим толук кошула элек, бирок сиз Перизатка түз WhatsApp (+996 700 123456) же Instagram (@designer_perima) аркылуу жазсаңыз болот! Кубаныч менен жардам беребиз!";
    if (lastUserMessage.toLowerCase().includes("привет") || lastUserMessage.toLowerCase().includes("здравствуй") || lastUserMessage.toLowerCase().includes("работа")) {
      reply = "Здравствуйте! Я виртуальный ассистент Перизат. К сожалению, сейчас у нас временные технические настройки ключа AI, но вы можете связаться с Перизат напрямую через WhatsApp или Instagram (@designer_perima). Мы с радостью разработаем для вас премиум-дизайн!";
    }
    return res.json({ text: reply });
  }

  try {
    const ai = getGeminiClient();
    
    // Prepare chat history in standard format
    // Filter messages to avoid empty and map them to parts
    const contents = messages.map((m) => {
      return {
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      };
    });

    const briefContext = brief 
      ? `\n[Current Client Brief Draft]:\n${JSON.stringify(brief, null, 2)}`
      : "";

    const systemInstruction = `You are Alina, the premium design studio assistant for Perizat Talantovna (handle: designer_perima, full name: Айылчиева Перизат Талантовна). 
Perizat is a highly skilled Graphic and UI/UX Designer with over 10 years of professional experience. 
She is certified by IT Club in Graphic Design and UI/UX Design.
Her representative high-end works include:
1. "BOMBER" Magazine Editorial Design (Cool Blue Mood, featuring futuristic light-blue monochrome clothing and aesthetic styling).
2. "MADAGASCAR CENTELLA HYALU-CICA BRIGHTENING TONER" packaging design (Frosted bottle design, clean cosmetics watery blue aesthetics with blue hibiscus flower branding, hydrates, calms, and brightens).
3. Elite UI/UX Interactive Dashboards (clean analytical web/mobile interfaces, glassmorphism, responsive panels, teal/blue glow aesthetics).

Your goal:
- Help potential clients understand Perizat's services: UI/UX mobile/web app design, brand identity, packaging, and commercial graphic design.
- Chat professionally, warmly, and elegantly. Speak in the user's language (Kyrgyz, Russian, or English) - if they write in Kyrgyz, respond in natural, beautiful Kyrgyz. If they write in Russian, write in beautiful Russian.
- Encourage them to fill out the Design Brief on the website, or offer to draft it for them through this chat!
- Keep answers inspiring, focus on premium quality, clean aesthetics, and Perizat's 10 years of mastery.
- Provide clear suggestions for their project when they describe their ideas.
${briefContext}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate response", details: error.message });
  }
});

// Endpoint to generate professional suggestions based on a short project description
app.post("/api/gemini/suggest-brief", async (req, res) => {
  const { description, projectType } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required." });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.json({
      styleKeywords: ["Modern", "Minimalist", "Elegant"],
      suggestedPalette: ["#0F172A", "#38BDF8", "#F8FAFC"],
      ideas: ["Create a beautiful high-end landing page highlighting craftsmanship.", "Use clean serif typography for titles paired with Inter."],
    });
  }

  try {
    const ai = getGeminiClient();

    const prompt = `Analyze the following design request and suggest professional style preferences, color palette (hex codes), and 3 creative suggestions.
Project Type: ${projectType || "General Design"}
Description: ${description}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an elite creative director assisting a premium designer. Provide suggestions in structured JSON format.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            styleKeywords: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 style words fitting this project",
            },
            suggestedPalette: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 or 4 hex code colors for this project's visual theme",
            },
            ideas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "3 highly creative actionable ideas/features for this design",
            },
          },
          required: ["styleKeywords", "suggestedPalette", "ideas"],
        },
      },
    });

    const parsedData = JSON.parse(response.text.trim());
    res.json(parsedData);
  } catch (error: any) {
    console.error("Gemini Suggestion Error:", error);
    res.status(500).json({ error: "Failed to generate suggestions", details: error.message });
  }
});

async function startServer() {
  // Vite middleware for development
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
