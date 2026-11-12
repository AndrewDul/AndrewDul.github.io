const MODEL = "@cf/meta/llama-3.1-8b-instruct-fast";
const KNOWLEDGE_URL = "https://raw.githubusercontent.com/AndrewDul/AndrewDul.github.io/main/worker/portfolio-knowledge.md";
const ALLOWED_ORIGINS = new Set(["https://andrewdul.github.io", "http://localhost:4173", "http://127.0.0.1:4173"]);

function headers(request) {
  const origin = request.headers.get("Origin") || "";
  return { "Access-Control-Allow-Origin": ALLOWED_ORIGINS.has(origin) ? origin : "https://andrewdul.github.io", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Content-Type": "application/json; charset=UTF-8", Vary: "Origin" };
}
function json(body, request, status = 200) { return new Response(JSON.stringify(body), { status, headers: headers(request) }); }
function fixedAnswer(question) {
  const q = question.toLowerCase();
  const polish = /\b(jak|jakie|co|czy|gdzie|mieszka|studiuje|projekt|problemy|kod)\b/i.test(question);
  if (/(koffee|coffee|android|room)/.test(q) && /(problem|błąd|blad|rozwią|rozwia|fix)/.test(q)) return "W KoffeeCraft rozwiązano konkretne problemy Androida i danych lokalnych: wymagania AndroidX wymusiły aktualizację SDK, adaptive icons zmianę minSdk, a mapowanie `isActive`/`isAvailable` w Room poprawiono razem z migracją. Poprawiono też zgodę na powiadomienia w Androidzie 13+, przeniesiono symulację statusu zamówienia poza cykl życia Fragmentu oraz zmieniono feedback z poziomu całego zamówienia na `orderItemId`, aby jedno zamówienie mogło zawierać niezależne opinie o produktach.";
  if (/(barcode|bar code|warehouse|etykiet|zebra|kod kresk)/.test(q)) return polish ? "Warehouse Barcode Studio to lokalna aplikacja React, TypeScript i Vite do tworzenia drukowalnych etykiet. Import, walidacja, renderowanie i eksport odbywają się w pamięci przeglądarki, bez wysyłania wartości do API ani ich logowania — dzięki temu identyfikatory magazynowe nie opuszczają urządzenia. Obsługuje Code 128, Code 39, Code 93 i QR oraz import z Excela, Worda, Markdown i tekstu." : "Warehouse Barcode Studio is a React, TypeScript and Vite browser application for printable labels. It is local-first because importing, validation, rendering and export happen in browser memory: label values are neither sent to an API nor logged, so potentially sensitive warehouse identifiers stay on the device. It supports Code 128, Code 39, Code 93 and QR, plus Excel, Word, Markdown and text imports.";
  if (/(beyondearth|beyond earth|ctec2714|order management)/.test(q)) return polish ? "W czteroosobowym projekcie BeyondEarth Andrzej odpowiadał za moduł Order Management, a nie za całą aplikację. Jego zakres obejmował logikę `clsOrder` i `clsOrderCollection`, integrację SQL, formularze Web Forms, walidację, operacje CRUD i wyszukiwanie, filtrowanie statusów, statystyki oraz testy jednostkowe." : "In the four-person BeyondEarth project, Andrzej owned the Order Management component rather than the whole application. His work covered `clsOrder` and `clsOrderCollection` business logic, SQL integration, Web Forms, validation, CRUD and find operations, status filtering, statistics and unit tests.";
  if (/(study|student|education|degree|university|live|location|mieszka|studi|uczeln|wykształ)/i.test(question)) return polish ? "Andrzej jest absolwentem First Class BSc (Hons) Computer Software Engineering i studiuje MSc Artificial Intelligence na De Montfort University. Jego publiczny profil GitHub oraz portfolio wskazują Leicester w Wielkiej Brytanii." : "Andrzej is a First Class BSc (Hons) Computer Software Engineering graduate and an MSc Artificial Intelligence student at De Montfort University. His public GitHub profile and portfolio list Leicester, UK.";
  if (/(ai|sztuczn|artificial intelligence)/.test(q) && /(code|kod|write|pisze)/.test(q)) return polish ? "AI wspiera Andrzeja w badaniu rozwiązań, rozumieniu kodu, debugowaniu oraz wybranych powtarzalnych fragmentach i testach. To Andrzej ustala wymagania i kierunek produktu, podejmuje decyzje techniczne, integruje zmiany, je weryfikuje i ostatecznie je akceptuje." : "AI supports Andrzej with research, understanding code, debugging, and selected repetitive implementation or tests. Andrzej owns the requirements and product direction, makes the engineering decisions, integrates changes, verifies them and gives final approval.";
  if (/(nexa|rove)/.test(q) && /(evol|status|architekt|architecture|jak)/.test(q)) return polish ? "NeXa ewoluowała od lokalnego asystenta na Pythonie i Raspberry Pi do programu AI i robotyki z wyraźniejszymi granicami odpowiedzialności. Nowsza architektura ogranicza centralną logikę, rozdziela sesję rozmowy, dostawców modeli i pamięć oraz nie ukrywa awarii przez ciche fallbacki. To aktywny projekt inżynieryjno-badawczy, dlatego dokumentacja odróżnia rozwiązania wdrożone od eksperymentów i planów." : "NeXa evolved from a local Python/Raspberry Pi assistant into an AI and robotics programme with clearer ownership boundaries. The newer architecture reduces central complexity, separates conversation sessions, model providers and memory, and fails openly instead of silently switching to fallback paths. It remains an active engineering and research project, so the documentation distinguishes implemented work from experiments and plans.";
  return "";
}
function cleanAnswer(value) {
  const answer = (value || "").replace(/^\s*(answer|response)\s*:\s*/i, "").split(/\b(visitor|interviewer|recruiter)\s*:/i)[0];
  const first = answer.split(/\s+(?:\(max\s+120\s+words\)|verified\b|note:|the\s+final\s+answer\s+is:|visitor\s+question:|final\s+answer\s+only:)/i)[0].trim();
  const seen = new Set();
  return (first.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((sentence) => {
    const key = sentence.replace(/\s+/g, " ").trim().toLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  }).slice(0, 6).join(" ").trim().slice(0, 900);
}
function section(knowledge, heading) {
  const start = knowledge.indexOf(`## ${heading}`);
  if (start < 0) return "";
  const end = knowledge.indexOf("\n## ", start + 4);
  return knowledge.slice(start, end < 0 ? knowledge.length : end).trim();
}

function knowledgeForQuestion(knowledge, question) {
  const normalized = question.toLowerCase();
  const matches = [
    [["nexa", "rove", "robot", "raspberry", "voice", "głos", "ai assistant"], "NeXa ecosystem"],
    [["barcode", "bar code", "warehouse", "etykiet", "zebra", "kod kresk"], "Warehouse Barcode Studio"],
    [["koffee", "coffee", "kawa", "android", "room", "zamów", "zamow"], "KoffeeCraft"],
    [["beyondearth", "beyond earth", "order management", "ctec2714"], "BeyondEarth"],
    [["taskify", "task management", "zadani"], "Taskify"],
    [["color clash", "match-three", "match 3", "dopasow"], "Color Clash"],
    [["save the man", "wisielec", "word game", "słow"], "Save the Man"],
    [["lifeos", "life os", "tauri", "memory", "pamię"], "LifeOS"],
    [["living world", "unreal", "rpg", "lfs"], "Living World"],
    [["ddbn", "business discovery", "showcase"], "DDBN Platform Showcase"]
  ];
  const selected = matches.filter(([terms]) => Array.isArray(terms) && terms.some((term) => normalized.includes(term))).map(([, heading]) => section(knowledge, heading));
  const personal = section(knowledge, "Andrzej Dul");
  if (selected.length) return selected.join("\n\n");
  if (/(study|student|education|degree|university|live|location|mieszka|studi|uczeln|wykształ)/i.test(question)) return personal;
  return knowledge;
}

function makePrompt(knowledge, question) {
  const language = /\b(jak|jakie|co|czy|gdzie|mieszka|studiuje|projekt|problemy|kod)\b/i.test(question) ? "Polish" : "the visitor's language";
  return `You are the portfolio assistant for Andrzej Dul. Answer only the visitor's question, naturally and directly, in ${language}. Use only the supplied verified knowledge. Do not make up examples, summaries of unrelated projects, dates, technologies, tests, ownership or outcomes. Do not create a dialogue, interviewer, follow-up question, heading, “Answer:”/“Response:” prefix, or repeat the question. Do not use the name Andrzej as the subject in every sentence. Give at most 120 words unless the visitor explicitly asks for detail. Prefer 2-5 concrete, non-repeated facts that answer the question. Clearly distinguish implemented work, active experiments, architecture/research and plans. If the knowledge does not answer it, say that the public portfolio does not verify it. For AI-assisted work: Andrzej owns direction, requirements, decisions, integration, verification and final acceptance; AI supports research, explanation, debugging and selected repetitive implementation/tests.\n\nVERIFIED KNOWLEDGE:\n${knowledge}\n\nVISITOR QUESTION:\n${question}\n\nFINAL ANSWER ONLY:`;
}

export default { async fetch(request, env) {
  if (request.method === "OPTIONS") return new Response(null, { headers: headers(request) });
  if (request.method !== "POST" || new URL(request.url).pathname !== "/chat") return json({ error: "Not found" }, request, 404);
  try {
    const payload = await request.json();
    const message = typeof payload.message === "string" ? payload.message.trim() : "";
    if (!message || message.length > 1600) return json({ error: "Please enter a question of up to 1,600 characters." }, request, 400);
    const guaranteed = fixedAnswer(message);
    if (guaranteed) return json({ answer: guaranteed, sources: ["Verified portfolio and GitHub knowledge"] }, request);
    const source = await fetch(KNOWLEDGE_URL, { cf: { cacheTtl: 300, cacheEverything: true } });
    if (!source.ok) throw new Error("Knowledge source is unavailable.");
    const knowledge = knowledgeForQuestion(await source.text(), message);
    const result = await env.AI.run(MODEL, { prompt: makePrompt(knowledge.slice(0, 12000), message), max_tokens: 300, temperature: 0.2 });
    const answer = cleanAnswer(result?.response);
    if (!answer) throw new Error("The model returned no answer.");
    return json({ answer, sources: ["Verified portfolio and GitHub knowledge"] }, request);
  } catch (error) {
    console.error("Portfolio assistant error", error instanceof Error ? error.message : String(error));
    return json({ error: "The portfolio assistant is temporarily unavailable. Please try again shortly." }, request, 503);
  }
} };
