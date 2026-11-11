const projects = {
  koffeecraft: {
    number: '01 / Android application', accent: '#df8c82', title: 'KoffeeCraft',
    summary: 'A local-first Android coffee shop application with customer and admin experiences.',
    context: 'The app brings mobile ordering and internal management together in one role-based Android project.',
    status: 'The project includes customer flows for browsing, customising and ordering products, as well as an admin area for menu, account, order, campaign and feedback tools.',
    focus: ['Persistent local data with Room / SQLite', 'Customer and administrator flows', 'Order and rewards experience', 'Unit, database and UI testing'],
    technologies: ['Kotlin', 'Android', 'XML', 'Material Components', 'Room', 'SQLite', 'Gradle'],
    repo: 'https://github.com/AndrewDul/koffeecraft-ctec3703'
  },
  'beyond-earth': {
    number: '02 / Team engineering', accent: '#5c9bd0', title: 'BeyondEarth',
    summary: 'Order management for a futuristic travel-booking team project at De Montfort University.',
    context: 'BeyondEarth simulates Mars, Moon and deep-sea experiences. Andrzej’s component was the order-management system in a four-student team project.',
    status: 'Educational project. The order component includes order business logic, SQL integration, Web Forms for listing, entry, statistics and delete confirmation, filtering and unit tests.',
    focus: ['Order validation and Find, Add, Update, Delete methods', 'Status filtering and grouped statistics', 'Three-tier structure', 'Unit testing of logic and boundaries'],
    technologies: ['C#', '.NET Framework', 'ASP.NET Web Forms', 'SQL Server', 'Bootstrap 5', 'Visual Studio'],
    repo: 'https://github.com/AndrewDul/BeyondEarth-TeamProject'
  },
  taskify: {
    number: '03 / Web interface', accent: '#d78db3', title: 'Taskify',
    summary: 'A responsive React to-do list for categories, tasks, search and completion.',
    context: 'Taskify focuses on giving people a clear way to organise tasks by category in a responsive interface.',
    status: 'The app supports creating, renaming and deleting categories, adding and completing tasks, category search and carousel navigation. Its roadmap identifies persistent storage and collaboration as future enhancements.',
    focus: ['Category and task management', 'Searchable categories', 'Responsive layout', 'Interactive completion controls'],
    technologies: ['React', 'JavaScript', 'CSS', 'Custom Hooks'],
    repo: 'https://github.com/AndrewDul/Taskify', live: 'https://andrewdul.github.io/Taskify/'
  },
  'color-clash': {
    number: '04 / Browser game', accent: '#ea8b6e', title: 'Color Clash',
    summary: 'A fast-paced tile-matching browser game built around colour, combos and progression.',
    context: 'Players swap matching tiles to earn points and coins, then unlock power-ups and abilities as their experience grows.',
    status: 'A live demo is available. The published game includes dynamic tile generation, controlled scoring, combo multipliers, achievements, power-ups and high-score tracking.',
    focus: ['Tile-matching game loop', 'Dynamic tile generation', 'Combo and experience systems', 'Power-ups and achievement rewards'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    repo: 'https://github.com/AndrewDul/Color-Clash', live: 'https://andrewdul.github.io/Color-Clash/'
  },
  'save-the-man': {
    number: '05 / Browser game', accent: '#8e7ce8', title: 'Save The Man',
    summary: 'A modern, responsive take on Hangman with categories, scoring and alternating turns.',
    context: 'Players guess a hidden word by letter or as a whole word before the gallows reaches its final state.',
    status: 'A live demo is available. The game has category selection, real-time scoring, sound effects, responsive layouts, random word selection and two-player turn handling.',
    focus: ['Category-based word selection', 'Score and turn logic', 'Randomisation without repeated words', 'Responsive game interface'],
    technologies: ['HTML5', 'CSS3', 'JavaScript'],
    repo: 'https://github.com/AndrewDul/Save-the-Man-Game', live: 'https://andrewdul.github.io/Save-the-Man-Game/'
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
