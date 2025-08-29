// IzaacWeb V5 - Buttons //

// Filter: persist selected filter in localStorage and restore
(function setupFilterPersistence() {
  const html = document.documentElement;
  const STORAGE_KEY = 'filter';

  function setFilterClass(name) {
    html.classList.remove('filter-normal', 'filter-sepia', 'filter-gray', 'filter-none');
    switch (name) {
      case 'sepia':
        html.classList.add('filter-sepia');
        break;
      case 'gray':
        html.classList.add('filter-gray');
        break;
      case 'none':
        html.classList.add('filter-none');
        break;
      default:
        html.classList.add('filter-normal');
        name = 'normal';
    }
    try { localStorage.setItem(STORAGE_KEY, name); } catch {}
  }

  // Restore saved filter
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) setFilterClass(saved);

  const normalBtn = document.querySelector('.filter');
  const sepiaBtn = document.querySelector('.filter2');
  const grayBtn = document.querySelector('.filter3');
  if (normalBtn) normalBtn.addEventListener('click', (e) => { e.preventDefault?.(); setFilterClass('normal'); });
  if (sepiaBtn) sepiaBtn.addEventListener('click', (e) => { e.preventDefault?.(); setFilterClass('sepia'); });
  if (grayBtn) grayBtn.addEventListener('click', (e) => { e.preventDefault?.(); setFilterClass('gray'); });
})();

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