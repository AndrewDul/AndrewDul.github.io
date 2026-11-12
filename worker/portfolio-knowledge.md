# Verified portfolio knowledge

## Andrzej Dul

- GitHub profile location: Leicester, UK.
- Education shown on the portfolio: First Class BSc (Hons) Computer Software Engineering graduate and MSc Artificial Intelligence student at De Montfort University.
- Public profile focus: practical AI, robotics, web systems, Python, JavaScript, React and Java.
- Engineering approach evidenced across the portfolio: start with a clear problem and small scope; build readable paths and explicit boundaries; test and validate; investigate observed failures; document decisions, limitations and next steps. AI is used for research, explanation, debugging and repetitive implementation or tests; Andrzej owns product direction, engineering choices, integration, verification and final acceptance.

## NeXa ecosystem

NeXa is a long-running local-first AI and robotics programme rather than one finished consumer application. The earlier Smart Desk AI Assistant is a Python and Raspberry Pi runtime; its public documentation describes audio capture, VAD, bilingual Vosk command recognition, Faster-Whisper fallback, deterministic routing, Piper TTS, a Godot Visual Shell, camera/pan-tilt paths, guarded mobile-base controls and local memory. A deliberate design is that high-confidence, safe commands do not require an LLM.

NeXa RoVe is the public physical-platform and engineering-tour repository. It documents a Raspberry Pi 5 platform, displays, microphone, cameras, sensors, mobile base, diagrams, simplified runnable examples, photographs and testing notes. Its runtime model separates input, understanding, decision, feedback and optional hardware actions. Uncertain state must lead to conservative outcomes such as wait or stop.

The newer `NeXa` repository is the canonical architecture track. Its documented principles are local-first, privacy-first, user-owned data, provider and device independence, a single clear authority per responsibility, replaceable transport and model boundaries, separation of history from long-term memory, and no hidden fallback response paths. Reports explicitly distinguish shipped work, research, plans and unresolved questions.

## Warehouse Barcode Studio

A React, TypeScript and Vite local-first browser application for creating printable labels. It supports Code 128, Code 39, Code 93 and QR formats; validates values by format; treats each non-empty text line as a label; imports Excel, Word, Markdown and text; maintains a label queue and active preview; exports PNG, SVG, PDFs and ZIP packs; and invokes the browser print dialog with Zebra ZD220, warehouse, shelf-edge, small-item and custom profiles. Values stay on-device: the application does not send label values to an API, save them in local storage or log them. The project uses Vitest tests for parsing and validation, TypeScript checking and a production build.

## KoffeeCraft

A Kotlin Android coffee-shop application with XML views, fragments, Navigation Component, Room and SQLite. It separates customer and administrator workflows. Customer work includes account access, browsing and customising products, cart and checkout, saved payment methods, order history/status, favourites, rewards, notifications and feedback. The admin area uses its own activity and navigation graph for dashboard, menu, orders, feedback and settings. Technical decisions include PBKDF2WithHmacSHA256 plus a per-user salt for password storage; Room entities/DAOs/repositories for local persistence; a distinct order lifecycle from PLACED through PREPARING, READY and COLLECTED; one feedback record per order; soft product disablement for availability versus hard deletion; and local UI filtering when the existing Room stream is adequate. The repository includes unit tests for validation, payments and rewards, plus instrumented tests for customer/admin flows, repositories and DAOs.

## BeyondEarth

A four-person CTEC2714 De Montfort University team project: a futuristic travel-booking e-commerce prototype using C#, ASP.NET Web Forms and SQL Server. Andrzej's component is Order Management. His documented responsibility includes `clsOrder` business logic, `clsOrderCollection` and SQL integration, entry/list/delete/statistics Web Forms, Bootstrap/custom CSS, validation, add/update/delete/find operations, status filtering, grouped date/status statistics and unit tests. The project is structured into presentation, middle/business, data and test layers. It is an academic team component, not a claim that Andrzej built all other modules.

## Taskify

A responsive React task-management interface. It supports category creation, rename and deletion; adding, completing and deleting tasks within categories; category search; carousel navigation; and responsive UI behaviour. The project encapsulates category/task logic in a custom `useCategories` hook. Its README flags persistent storage, collaboration and drag-and-drop ordering as future work rather than implemented features.

## Color Clash

A browser-based match-three game built with HTML, CSS and JavaScript. It has 15 campaign levels across three worlds, several objective types, match-four rockets, match-five rainbow gems, T/L bombs, chain reactions, reshuffling, artifacts and progression. It also includes local persistent coins, XP, stars, boosters, daily missions, gifts, achievements, Polish/English switching, audio and reduced-animation controls, and desktop/touch/swipe input. Progress is stored in browser local storage.

## Save the Man

A browser-based bilingual English/Polish word-and-sentence game with a detective-office visual theme. It has 30 campaign levels across five chapters, more than 50 bilingual entries, categories, later-level revealed letters, touch-friendly English/Polish keyboards, physical keyboard/full-answer support, category practice, local progress, coins, stars, streaks, hint/shield/reveal mechanics, achievements, animations, sound and reduced-motion controls. It is built with web technologies and its progress is local to the browser.

## LifeOS

A local-first personal life operating system built with Tauri 2, React, TypeScript and Rust. The public repository contains product, architecture, research-decision and project-state documentation. Its reports show a staged approach to UI, storage, goals, projects, tasks, milestones, audit safety and personal-knowledge features. It is an active engineering project, so the assistant must describe documented status rather than present planned capabilities as released.

## Living World

An Unreal Engine 5.8 C++ open-world sandbox RPG architecture project with a persistent simulated world. The design starts with a small prototype and states rules before implementation: C++ owns core gameplay/simulation, Blueprints remain thin, systems are data driven, entities have stable IDs, game time has one authority, NPCs support levels of detail, save/load is designed early and speculative abstractions are avoided. The repository's Git LFS budget currently prevents a complete asset checkout; this must not be misrepresented as a complete playable release.

## DDBN Platform Showcase

A public Next.js/TypeScript showcase for a local business-discovery and owner-workspace concept. The public repository deliberately excludes customer data, production secrets, raw reports and private implementation history. It contains a standalone showcase, safe architecture/product documentation, public-content validation and quality scripts for formatting, linting, type checks, tests and build. The private foundation is described separately as containing monorepo, worker, CI/CD, test/coverage and secret-scanning foundations. The production marketplace is explicitly not live. Its AI-assisted engineering policy says Andrzej owns product direction, architecture decisions and final approval; AI output is reviewed, tested and manually accepted before commits.
