function initializeConstructionAnimation() {
  const constructionState = document.querySelector('.construction-state');
  if (!constructionState) return;

  requestAnimationFrame(() => {
    constructionState.classList.add('is-ready');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeConstructionAnimation);
} else {
  initializeConstructionAnimation();
}
