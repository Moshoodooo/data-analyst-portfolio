/* ==========================================================================
   DATA ANALYST PORTFOLIO - INTERSECTION OBSERVER & ANIMATIONS SCRIPT
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Animation using Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  };

  const scrollObserver = new IntersectionObserver(observerCallback, observerOptions);

  // Attach reveal-up class to cards and section headers
  const animatedElements = document.querySelectorAll('.card, .section-header');
  animatedElements.forEach((el, index) => {
    if (!el.classList.contains('reveal-up')) {
      el.classList.add('reveal-up');
      if (index % 3 === 1) el.classList.add('delay-1');
      else if (index % 3 === 2) el.classList.add('delay-2');
    }
    scrollObserver.observe(el);
  });
});