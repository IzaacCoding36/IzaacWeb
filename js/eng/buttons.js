// IzaacWeb V5 - Buttons //

document.querySelector('.filter').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(30deg)');
    document.querySelector('html').style.setProperty('background-color', 'var(--background-primary)');
});

document.querySelector('.filter2').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'sepia(2)');
    document.querySelector('html').style.setProperty('background-color', '#3e3d26ff');
});

document.querySelector('.filter3').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
    document.querySelector('html').style.setProperty('background-color', '#262626ff');
});

document.querySelector('.eng').addEventListener('click', () => {
    alert("You're already using this language.");
});

document.querySelector('.morelang').addEventListener('click', () => {
    alert("To view this page in other languages, simply activate the Google Translate extension in your browser.");
});

document.querySelector('.here').addEventListener('click', () => {
    alert("You're already on this page.");
});

// Removed direct fixed alert; handled within toggle below

// Theme toggle (Dark/Light) for English pages (unified persistence)
(function setupThemeToggle() {
  const themeLink = document.querySelector('#theme-css');
  if (!themeLink) return;

  const DARK = themeLink.dataset.dark;
  const LIGHT = themeLink.dataset.light;
  const STORAGE_KEY = 'theme'; // use same key across site

  function getInUseMsg() {
    const html = document.documentElement;
    return html.dataset.themeInUseMsg || "You're already using this theme.";
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      themeLink.href = LIGHT;
      localStorage.setItem(STORAGE_KEY, 'light');
    } else {
      themeLink.href = DARK;
      localStorage.setItem(STORAGE_KEY, 'dark');
    }
  }

  function getCurrentTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    const href = themeLink.href || '';
    return href.includes(LIGHT) ? 'light' : 'dark';
  }

  // Restore persisted preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') {
    applyTheme(saved);
  }

  const darkBtn = document.querySelector('.theme');
  const lightBtn = document.querySelector('.theme-light');
  if (darkBtn) darkBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (getCurrentTheme() === 'dark') {
  alert(getInUseMsg());
      return;
    }
    applyTheme('dark');
  });
  if (lightBtn) lightBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (getCurrentTheme() === 'light') {
  alert(getInUseMsg());
      return;
    }
    applyTheme('light');
  });
})();