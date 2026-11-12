const MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
const KNOWLEDGE_URL = "https://raw.githubusercontent.com/AndrewDul/AndrewDul.github.io/main/worker/portfolio-knowledge.md";
const ALLOWED_ORIGINS = new Set(["https://andrewdul.github.io", "http://localhost:4173", "http://127.0.0.1:4173"]);

function headers(request) {
  const origin = request.headers.get("Origin") || "";
  return { "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://andrewdul.github.io", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Content-Type": "application/json; charset=UTF-8", Vary: "Origin" };
}
function json(body, request, status = 200) { return new Response(JSON.stringify(body), { status, headers: headers(request) }); }
function makePrompt(knowledge, question) {
  return `You are the portfolio assistant for Andrzej Dul. Answer naturally and directly in the visitor's language. Use only the verified knowledge below. Never invent facts, dates, technologies, tests, project ownership, outcomes or personal details. Do not role-play a dialogue, create a fictional interviewer, add “Answer:”/“Response:”, or repeat the question. Never claim Andrzej built an entire team project when the source names a narrower role. Clearly distinguish implemented work, active experimental work, architecture/research and planned work. If a fact is absent, say it is not verified in the public portfolio. For questions about AI-assisted work, explain that Andrzej owns direction, requirements, decisions, integration, verification and final acceptance; AI supports research, explanation, debugging and selected repetitive implementation/tests. Default to two short paragraphs or a compact list; expand only when asked.\n\nVERIFIED KNOWLEDGE:\n${knowledge}\n\nVISITOR QUESTION:\n${question}\n\nFINAL ANSWER ONLY:`;
}

export default { async fetch(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { headers: headers(request) });
  if (request.method !== "POST" || new URL(request.url).pathname !== "/chat") return json({ error: "Not found" }, request, 404);
  try {
    const payload = await request.json();
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    if (!message || message.length > 1600) return json({ error: "Please enter a question of up to 1,600 characters." }, request, 400);
    const source = await fetch(KNOWLEDGE_URL, { cf: { cacheTtl: 300, cacheEverything: true } });
    if (!source.ok) throw new Error("Knowledge source is unavailable.");
    const knowledge = await source.text();
    const result = await env.AI.run(MODEL, { prompt: makePrompt(knowledge.slice(0, 24000), message) });
    const answer = (result?.response || "").replace(/^\s*(answer|response)\s*:\s*/i, "").split(/\b(visitor|interviewer|recruiter)\s*:/i)[0].trim();
    if (!answer) throw new Error("The model returned no answer.");
    return json({ answer, sources: ["Verified portfolio and GitHub knowledge"] }, request);
  } catch (error) {
    console.error("Portfolio assistant error", error instanceof Error ? error.message : String(error));
    return json({ error: "The portfolio assistant is temporarily unavailable. Please try again shortly." }, request, 503);
  }
} };
