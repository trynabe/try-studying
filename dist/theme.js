/* Apply the saved appearance before the page is painted. */
(() => {
  const storageKey = 'try-study-theme';
  const root = document.documentElement;
  const system = window.matchMedia?.('(prefers-color-scheme: dark)');
  const isTheme = value => value === 'light' || value === 'dark';
  let preference = null;

  try {
    const saved = localStorage.getItem(storageKey);
    if (isTheme(saved)) preference = saved;
  } catch { /* The switch still works when storage is unavailable. */ }

  function apply(theme) {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = theme === 'dark' ? '#191919' : '#f3eddf';
    for (const button of document.querySelectorAll('[data-theme-choice]')) {
      button.setAttribute('aria-pressed', String(button.dataset.themeChoice === theme));
    }
  }

  function refresh() {
    apply(preference ?? (system?.matches ? 'dark' : 'light'));
  }

  refresh();

  document.addEventListener('click', event => {
    const button = event.target?.closest?.('[data-theme-choice]');
    const choice = button?.dataset.themeChoice;
    if (!isTheme(choice)) return;
    preference = choice;
    apply(choice);
    try { localStorage.setItem(storageKey, choice); } catch { /* Keep the in-tab choice. */ }
  });

  window.addEventListener('storage', event => {
    if (event.key !== storageKey && event.key !== null) return;
    preference = isTheme(event.newValue) ? event.newValue : null;
    refresh();
  });

  system?.addEventListener?.('change', () => {
    if (preference === null) refresh();
  });
})();
