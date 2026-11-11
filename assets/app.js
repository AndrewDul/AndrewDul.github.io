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

  const nameReels = document.querySelector('[data-name-reels]');
  if (nameReels) {
    const names = ['Andrzej', 'Andrew'];
    const reelCount = 7;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finalReelDuration = 1050 + (reelCount - 1) * 190;
    const quietPeriod = 5000;
    let nextName = 0;
    let cycleTimer;
    let isAnimating = false;

    const makeLetters = (target, index) => {
      const alphabet = target === target.toUpperCase() ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
      const spins = 8 + index;
      return Array.from({ length: spins }, (_, step) => alphabet[(index * 7 + step * 5) % alphabet.length]).concat(target);
    };

    const showName = (name, animate) => {
      const targetLetters = [...name, ...Array(reelCount - name.length).fill('')];
      nameReels.replaceChildren();
      targetLetters.forEach((target, index) => {
        const reel = document.createElement('span');
        reel.className = 'letter-reel';
        const track = document.createElement('span');
        track.className = 'reel-track';
        const letters = animate ? makeLetters(target || ' ', index) : [target || ' '];
        letters.forEach((letter) => {
          const cell = document.createElement('span');
          cell.className = 'reel-cell';
          cell.textContent = letter;
          track.append(cell);
        });
        reel.append(track);
        nameReels.append(reel);

        if (!animate) {
          if (!target) reel.classList.add('is-empty');
          return;
        }

        const duration = 1050 + index * 190;
        track.style.transition = `transform ${duration}ms cubic-bezier(.16, .84, .24, 1)`;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          track.style.transform = `translateY(-${(letters.length - 1) * 1.28}em)`;
        }));
        if (!target) window.setTimeout(() => reel.classList.add('is-empty'), duration);
      });
    };

    document.documentElement.classList.add('name-reels-ready');
    if (reducedMotion) {
      showName(names[0], false);
    } else {
      const runCycle = () => {
        if (isAnimating) return;
        isAnimating = true;
        cycleTimer = undefined;
        showName(names[nextName], true);
        nextName = (nextName + 1) % names.length;
        window.setTimeout(() => {
          isAnimating = false;
          cycleTimer = window.setTimeout(runCycle, quietPeriod);
        }, finalReelDuration);
      };
      const triggerCycle = () => {
        if (cycleTimer) window.clearTimeout(cycleTimer);
        cycleTimer = undefined;
        if (!isAnimating) runCycle();
      };
      nameReels.parentElement?.addEventListener('pointerenter', triggerCycle);
      nameReels.parentElement?.addEventListener('focusin', triggerCycle);
      window.setTimeout(runCycle, 300);
    }
  }

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

  const assistantDock = document.querySelector('[data-assistant-dock]');
  const assistantToggle = document.querySelector('[data-assistant-toggle]');
  const assistantClose = document.querySelector('[data-assistant-close]');
  const chatForm = document.querySelector('[data-chat-form]');
  const messages = document.querySelector('[data-chat-messages]');
  const setAssistantOpen = (open) => {
    if (!assistantDock || !assistantToggle) return;
    assistantDock.classList.toggle('is-open', open);
    assistantToggle.setAttribute('aria-expanded', String(open));
    assistantToggle.querySelector('.sr-only').textContent = open ? 'Close portfolio assistant' : 'Open portfolio assistant';
    if (open) window.setTimeout(() => chatForm?.elements.question.focus(), 180);
  };
  assistantToggle?.addEventListener('click', () => setAssistantOpen(!assistantDock.classList.contains('is-open')));
  assistantClose?.addEventListener('click', () => setAssistantOpen(false));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setAssistantOpen(false);
  });
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
    reply.textContent = 'Prototype response: no AI model or project knowledge base is connected yet, so this question was not sent anywhere. The finished version will need a reviewed knowledge base and an approved backend.';
    messages.append(userMessage, reply);
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
  });

})();
