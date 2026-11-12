const MODEL = "@cf/meta/llama-3.1-8b-instruct";

const allowedOrigins = new Set([
  "https://andrewdul.github.io",
  "http://127.0.0.1:4173",
  "http://localhost:4173",
]);

const knowledge = [
  {
    id: "profile",
    title: "Portfolio and working approach",
    tags: ["andrzej", "developer", "how", "work", "code", "ai", "recruiter", "portfolio"],
    text: "Andrzej is a software engineering graduate building web, mobile, AI and hardware projects. He treats projects as iterative engineering work: define a small scope, build an understandable path, test it, observe failures, improve it and document decisions. He uses AI as support for understanding code, researching approaches, debugging and drafting repetitive sections or tests. He remains responsible for requirements, choices, integration, verification and the final code; it would be inaccurate to say that AI writes all of his projects for him.",
  },
  {
    id: "nexa-overview",
    title: "NeXa overview",
    tags: ["nexa", "assistant", "robotics", "raspberry", "local", "ai", "overview"],
    text: "NeXa is Andrzej's long-running local-first AI and robotics ecosystem. The portfolio brings together three related repositories: the earlier assistant runtime, NeXa RoVe (the public robotics and hardware project), and the newer NeXa repository that documents a cleaner future architecture. The work explores voice interaction, a visual interface, local AI, Raspberry Pi hardware, sensors, cameras and cautious physical movement. It is active engineering work rather than a finished commercial product.",
  },
  {
    id: "nexa-runtime",
    title: "NeXa assistant runtime",
    tags: ["nexa", "runtime", "python", "voice", "vosk", "whisper", "piper", "godot", "memory", "hardware"],
    text: "The earlier NeXa assistant repository is a Python runtime for a Raspberry Pi-based assistant. Its documented stack includes wake and audio capture, VAD, a fast bilingual Vosk command route, a Faster-Whisper fallback route, deterministic command routing, local Piper TTS, a Godot Visual Shell bridge, camera and pan-tilt paths, guarded mobile-base controls, and local memory storage. A key design choice is to keep high-confidence, safe commands deterministic instead of sending every request to a language model.",
  },
  {
    id: "nexa-rover",
    title: "NeXa RoVe: physical platform",
    tags: ["nexa", "rove", "robot", "hardware", "raspberry", "sensors", "camera", "godot", "safety"],
    text: "NeXa RoVe is the public, recruiter-friendly robotics repository. It documents the physical platform, a Raspberry Pi 5, display, microphone, cameras, sensors, a mobile base and a Godot Visual Shell. The runtime idea is: voice or text input, command understanding, assistant decision, visual or spoken feedback, then an optional hardware action. The public materials deliberately emphasise availability checks, freshness of sensor data and conservative outcomes such as WAIT or STOP when the physical state is unclear.",
  },
  {
    id: "nexa-challenges",
    title: "NeXa engineering problems and decisions",
    tags: ["nexa", "problem", "challenge", "solution", "debugging", "voice", "safety", "architecture", "testing"],
    text: "NeXa's documented challenges include voice responsiveness, local-model limits on Raspberry Pi hardware, unclear or partial speech input, UI feedback lag, unreliable or unavailable devices, uncertain camera/sensor data and movement safety. Andrzej's approach is to split the runtime into clear stages, expose state in the UI, classify and normalise commands before routing them, ask for clarification instead of guessing, and test small pieces before live hardware checks. The project uses reports, diagrams, focused examples and tests so decisions remain understandable as the system evolves.",
  },
  {
    id: "nexa-ikigai",
    title: "NeXa canonical architecture",
    tags: ["nexa", "ikigai", "architecture", "privacy", "local", "provider", "memory", "conversation", "testing"],
    text: "The newer NeXa repository is the canonical architecture and documentation track. Its guiding principles are local-first, privacy-first, user-owned data, provider-independent model access, device independence, modularity, testability, observability and documentation. It separates chat history from long-term memory, keeps realtime transport replaceable and avoids hidden fallback 'brains' or duplicated response authorities. Its reports distinguish verified facts, work in progress, planned work and open questions instead of presenting plans as finished features.",
  },
  {
    id: "nexa-evolution",
    title: "How NeXa evolved",
    tags: ["nexa", "evolved", "evolution", "journey", "repositories", "architecture", "process"],
    text: "NeXa evolved from a practical Raspberry Pi assistant experiment into a broader engineering programme spanning runtime design, voice, UI feedback, local AI, hardware, robotics safety and documentation. The work was not treated as one large rewrite: components and hypotheses were explored in smaller, testable steps. The newer architecture repository preserves useful learning from earlier code while making the future design more explicit: one clear authority per responsibility, no silent fallback paths and deliberate boundaries between provider, conversation, memory, device and transport concerns.",
  },
  {
    id: "other-projects",
    title: "Other portfolio projects",
    tags: ["warehouse", "barcode", "koffeecraft", "beyond", "earth", "color", "clash", "save", "man", "game"],
    text: "The portfolio also includes Warehouse Barcode Studio, KoffeeCraft, Beyond Earth, Color Clash and Save the Man. Warehouse Barcode Studio is a browser-based tool for creating, reviewing, exporting and printing barcode label packs. KoffeeCraft is an Android application. Beyond Earth is a team project. Color Clash and Save the Man are browser games; Color Clash is a colourful match-style puzzle game and Save the Man is a detective-themed word game with English and Polish play.",
  },
];

function cors(request) {
  const origin = request.headers.get("Origin") || "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : "https://andrewdul.github.io",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
    "Content-Type": "application/json; charset=UTF-8",
  };
}

function response(body, request, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: cors(request) });
}

function normalise(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi, " ").trim();
}

function selectKnowledge(question) {
  const terms = normalise(question).split(" ").filter((term) => term.length > 2);
  return knowledge
    .map((item) => ({
      ...item,
      score: terms.reduce((score, term) => score + (item.tags.includes(term) ? 7 : 0) + (normalise(item.text).includes(term) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

function safeHistory(history) {
  if (!Array.isArray(history)) return [];
  return history.slice(-6).flatMap((entry) => {
    if (!entry || !["user", "assistant"].includes(entry.role) || typeof entry.content !== "string") return [];
    return [{ role: entry.role, content: entry.content.slice(0, 1200) }];
  });
}

function systemPrompt(selected) {
  return `You are the portfolio assistant for Andrzej Dul. Answer clearly and warmly for recruiters or visitors. Match the visitor's language: answer in Polish to Polish questions and English to English questions. Use only the verified source notes below. Do not invent features, dates, outcomes, technologies, tests or employment claims. Clearly distinguish active work, documented current capability, future direction and open questions when relevant. When asked whether Andrzej codes, explain truthfully that he owns the requirements, engineering decisions, integration and verification; AI helps him understand code, research, debug and sometimes draft repetitive code or tests, but do not claim his projects were entirely written by AI. If the source does not answer a question, say so plainly and offer the most relevant project page or GitHub repository. Keep answers concise unless asked for detail.\n\nVERIFIED PORTFOLIO NOTES:\n${selected.map((item) => `- ${item.title}: ${item.text}`).join("\n")}`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(request) });
    if (url.pathname !== "/chat") return response({ error: "Not found" }, request, 404);
    if (request.method !== "POST") return response({ error: "Method not allowed" }, request, 405);

    try {
      const payload = await request.json();
      const message = typeof payload.message === "string" ? payload.message.trim() : "";
      if (!message || message.length > 1500) return response({ error: "Please send a question of up to 1,500 characters." }, request, 400);

      const selected = selectKnowledge(message);
      const result = await env.AI.run(MODEL, {
        messages: [
          { role: "system", content: systemPrompt(selected) },
          ...safeHistory(payload.history),
          { role: "user", content: message },
        ],
      });
      const answer = result?.response || result?.choices?.[0]?.message?.content;
      if (!answer) throw new Error("The model returned no text.");
      return response({ answer, sources: selected.map(({ title }) => title) }, request);
    } catch (error) {
      console.error("Portfolio assistant error", error instanceof Error ? error.message : String(error));
      return response({ error: "The portfolio assistant is temporarily unavailable. Please try again in a moment." }, request, 503);
    }
  },
};
