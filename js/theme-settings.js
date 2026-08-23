/**
 * Shared theme settings management for all pages.
 * Initialize by calling: initThemeSettings()
 */

function initThemeSettings() {
  const root = document.documentElement;
  const settingsMenu = document.querySelector('.settings-menu');
  const settingsButton = document.querySelector('.settings-button');
  const themeOptions = document.querySelectorAll('.theme-option');

  if (!settingsMenu || !settingsButton) {
    console.warn('Settings menu elements not found');
    return;
  }

  const savedTheme = localStorage.getItem('theme');
  const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
  const initialTheme = savedTheme || preferredTheme;

  function updateThemeOptions(currentTheme) {
    themeOptions.forEach((option) => {
      const optionTheme = option.dataset.theme;
      option.classList.toggle('is-hidden', optionTheme === currentTheme);
    });
  }

  function applyTheme(theme) {
    root.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    updateThemeOptions(theme);
  }

  applyTheme(initialTheme);

  settingsButton.addEventListener('click', () => {
    const isOpen = settingsMenu.classList.toggle('open');
    settingsButton.setAttribute('aria-expanded', String(isOpen));
  });

  themeOptions.forEach((option) => {
    option.addEventListener('click', () => {
      applyTheme(option.dataset.theme);
      settingsMenu.classList.remove('open');
      settingsButton.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (event) => {
    if (!settingsMenu.contains(event.target)) {
      settingsMenu.classList.remove('open');
      settingsButton.setAttribute('aria-expanded', 'false');
    }
  });
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeSettings);
} else {
  initThemeSettings();
}
