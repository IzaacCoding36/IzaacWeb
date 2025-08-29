// IzaacWeb V5 - Botões //

document.querySelector('.filtro').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'hue-rotate(30deg)');
    document.querySelector('html').style.setProperty('background-color', 'var(--background-primary)');
});

document.querySelector('.filtro2').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'sepia(2)');
    document.querySelector('html').style.setProperty('background-color', '#3e3d26ff');
});

document.querySelector('.filtro3').addEventListener('click', () => {
    document.querySelector('html').style.setProperty('filter', 'grayscale(2)');
    document.querySelector('html').style.setProperty('background-color', '#262626ff');
});

document.querySelector('.pt-br').addEventListener('click', () => {
    alert("Você já está utilizando esta linguagem.");
});

document.querySelector('.maislang').addEventListener('click', () => {
    alert("Para visualizar esta página em outras línguas, basta ativar a extensão do google tradutor em seu navegador.");
});

document.querySelector('.aqui').addEventListener('click', () => {
    alert("Você já está nesta página.");
});

// Tema: alternar CSS entre escuro.css e style.css (persistência unificada)
(function setupThemeToggle() {
    const themeLink = document.getElementById('theme-css');
    if (!themeLink) return;

    const DARK = themeLink.dataset.dark || '/css/pt-br/escuro.css';
    const LIGHT = themeLink.dataset.light || '/css/pt-br/style.css';
    const STORAGE_KEY = 'theme'; // usar a mesma chave em todo o site

    function getInUseMsg() {
        const html = document.documentElement;
        return html.dataset.themeInUseMsg || 'Você já está usando este tema.';
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            themeLink.href = LIGHT;
            try { localStorage.setItem(STORAGE_KEY, 'light'); } catch {}
        } else {
            themeLink.href = DARK;
            try { localStorage.setItem(STORAGE_KEY, 'dark'); } catch {}
        }
    }

    function getCurrentTheme() {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved === 'light' || saved === 'dark') return saved;
        // Inferir pelo href atual
        const href = themeLink.href || '';
        return href.includes(LIGHT) ? 'light' : 'dark';
    }

    // Restaurar preferência
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
        applyTheme(saved);
    }

    const darkBtn = document.querySelector('.tema');
    const lightBtn = document.querySelector('.tema-claro');
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