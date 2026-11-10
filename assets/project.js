const projects = {
  nexa: {
    number: '01 / AI & robotics', accent: '#8e7ce8', title: 'NeXa',
    summary: 'A personal AI-system foundation for one user across the devices they own.',
    context: 'NeXa is being shaped as one identity and platform, rather than a separate chatbot, robot or single-device app.',
    status: 'M0 — Foundation. The public repository currently contains project structure, documentation and engineering conventions. Product features such as conversation, voice, memory, robot control and UI are not implemented yet.',
    focus: ['Local-first operation', 'Privacy-first and user-owned data', 'Modular and testable architecture', 'Device-independent design'],
    technologies: ['Python', 'Local AI', 'Raspberry Pi', 'Cameras & sensors', 'Architecture docs'],
    repo: 'https://github.com/AndrewDul/NeXa'
  },
  koffeecraft: {
    number: '02 / Android application', accent: '#df8c82', title: 'KoffeeCraft',
    summary: 'A local-first Android coffee shop application with customer and admin experiences.',
    context: 'The app brings mobile ordering and internal management together in one role-based Android project.',
    status: 'In development. The customer side includes menu, product customisation, checkout, rewards, saved cards, favourites and feedback. The admin side includes menu, account, order, campaign and feedback tools.',
    focus: ['Persistent local data with Room / SQLite', 'Customer and administrator flows', 'Order and rewards experience', 'Unit, database and UI testing'],
    technologies: ['Kotlin', 'Android', 'XML', 'Material Components', 'Room', 'SQLite', 'Gradle'],
    repo: 'https://github.com/AndrewDul/koffeecraft-ctec3703'
  },
  ddbn: {
    number: '03 / Product foundation', accent: '#5eb79a', title: 'DDBN Platform',
    summary: 'A foundation-stage local business discovery and owner-workspace concept.',
    context: 'The public showcase shares product and architecture context without exposing customer data, secrets, raw reports or private implementation history.',
    status: 'The production marketplace is not live. The public showcase includes a standalone Next.js site, public-safe documentation and quality scripts. The private foundation contains typed monorepo, application, worker, testing and CI/CD groundwork.',
    focus: ['Structured business profiles', 'Trust and safety controls', 'Public-safe documentation', 'Evidence-driven engineering'],
    technologies: ['Next.js', 'TypeScript', 'pnpm', 'Turborepo', 'CI/CD', 'Testing'],
    repo: 'https://github.com/AndrewDul/ddbn-platform-showcase'
  },
  'beyond-earth': {
    number: '04 / Team engineering', accent: '#5c9bd0', title: 'BeyondEarth',
    summary: 'Order management for a futuristic travel-booking team project at De Montfort University.',
    context: 'BeyondEarth simulates Mars, Moon and deep-sea experiences. Andrzej’s component was the order-management system in a four-student team project.',
    status: 'Educational project. The order component includes order business logic, SQL integration, Web Forms for listing, entry, statistics and delete confirmation, filtering and unit tests.',
    focus: ['Order validation and Find, Add, Update, Delete methods', 'Status filtering and grouped statistics', 'Three-tier structure', 'Unit testing of logic and boundaries'],
    technologies: ['C#', '.NET Framework', 'ASP.NET Web Forms', 'SQL Server', 'Bootstrap 5', 'Visual Studio'],
    repo: 'https://github.com/AndrewDul/BeyondEarth-TeamProject'
  },
  taskify: {
    number: '05 / Web interface', accent: '#d78db3', title: 'Taskify',
    summary: 'A responsive React to-do list for categories, tasks, search and completion.',
    context: 'Taskify focuses on giving people a clear way to organise tasks by category in a responsive interface.',
    status: 'The app supports creating, renaming and deleting categories, adding and completing tasks, category search and carousel navigation. Its roadmap identifies persistent storage and collaboration as future enhancements.',
    focus: ['Category and task management', 'Searchable categories', 'Responsive layout', 'Interactive completion controls'],
    technologies: ['React', 'JavaScript', 'CSS', 'Custom Hooks'],
    repo: 'https://github.com/AndrewDul/Taskify', live: 'https://andrewdul.github.io/Taskify/'
  }
};

(() => {
  const data = projects[document.body.dataset.project];
  if (!data) return;
  document.title = `${data.title} — Andrzej Dul`;
  document.documentElement.style.setProperty('--accent', data.accent);
  document.querySelector('[data-number]').textContent = data.number;
  document.querySelector('[data-title]').textContent = data.title;
  document.querySelector('[data-summary]').textContent = data.summary;
  document.querySelector('[data-context]').textContent = data.context;
  document.querySelector('[data-status]').textContent = data.status;
  document.querySelector('[data-focus]').innerHTML = data.focus.map((item) => `<li>${item}</li>`).join('');
  document.querySelector('[data-technologies]').innerHTML = data.technologies.map((item) => `<li>${item}</li>`).join('');
  document.querySelector('[data-repository]').href = data.repo;
  const live = document.querySelector('[data-live]');
  if (data.live) { live.href = data.live; live.hidden = false; }
  const themeButton = document.querySelector('[data-theme-toggle]');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const setTheme = (theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    const dark = theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.querySelector('.theme-icon').textContent = dark ? '☼' : '☾';
    themeButton.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
  };
  setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  themeButton.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
})();
