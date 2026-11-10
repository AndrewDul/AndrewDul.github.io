(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const savedTheme = localStorage.getItem('portfolio-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  function setTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem('portfolio-theme', theme);
    if (!themeButton) return;
    const isDark = theme === 'dark';
    themeButton.setAttribute('aria-pressed', String(isDark));
    themeButton.querySelector('.theme-icon').textContent = isDark ? '☼' : '☾';
    themeButton.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
  }

  setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
  themeButton?.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));

  const navToggle = document.querySelector('[data-nav-toggle]');
  const header = document.querySelector('[data-header]');
  const nav = document.querySelector('[data-nav]');
  navToggle?.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    header?.classList.remove('nav-open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }));

  const dust = document.querySelector('.space-dust');
  const starColours = ['var(--purple)', 'var(--pink)', 'var(--peach)', 'var(--mint)'];
  if (dust && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    Array.from({ length: 42 }, (_, i) => {
      const star = document.createElement('span');
      star.className = 'star';
      star.style.left = `${(i * 37.7) % 100}%`;
      star.style.top = `${(i * 61.3) % 100}%`;
      star.style.setProperty('--size', `${i % 5 === 0 ? 3 : 2}px`);
      star.style.setProperty('--duration', `${2.2 + (i % 6) * .47}s`);
      star.style.setProperty('--star', starColours[i % starColours.length]);
      star.style.animationDelay = `${-(i % 8) * .25}s`;
      dust.append(star);
    });
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .13 });
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (window.innerWidth < 821 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(800px) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translateY(-5px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  const chatForm = document.querySelector('[data-chat-form]');
  const messages = document.querySelector('[data-chat-messages]');
  chatForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const input = chatForm.elements.question;
    const question = input.value.trim();
    if (!question || !messages) return;
    const userMessage = document.createElement('p');
    userMessage.className = 'user-message';
    userMessage.textContent = question;
    const reply = document.createElement('p');
    reply.className = 'assistant-message';
    reply.textContent = 'Prototype response: no AI model or project data source is connected yet, so this question was not sent or answered. The finished version will need a reviewed knowledge base and an approved backend.';
    messages.append(userMessage, reply);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  });

})();
