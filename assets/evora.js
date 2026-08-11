/**
 * EVORA WELLNESS & HEALTH-TECH THEME JS
 * Lightweight, accessible, and Theme Editor reactive
 */

(function () {
  'use strict';

  function initEvoraAccordions(container) {
    const accordions = (container || document).querySelectorAll('.evora-accordion');
    accordions.forEach((accordion) => {
      const items = accordion.querySelectorAll('.evora-accordion__item');
      items.forEach((item) => {
        const summary = item.querySelector('.evora-accordion__summary');
        if (!summary) return;

        summary.addEventListener('click', (e) => {
          if (accordion.dataset.singleOpen === 'true') {
            items.forEach((otherItem) => {
              if (otherItem !== item && otherItem.hasAttribute('open')) {
                otherItem.removeAttribute('open');
              }
            });
          }
        });
      });
    });
  }

  function initEvoraScrollAnimations() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const elements = document.querySelectorAll('[data-evora-reveal]:not(.is-revealed)');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      );

      elements.forEach((el) => observer.observe(el));
    } else {
      elements.forEach((el) => el.classList.add('is-revealed'));
    }
  }

  function initEvoraTabs(container) {
    const tabContainers = (container || document).querySelectorAll('[data-evora-tabs]');
    tabContainers.forEach((tabsWrapper) => {
      const tabButtons = tabsWrapper.querySelectorAll('[role="tab"]');
      const tabPanels = tabsWrapper.querySelectorAll('[role="tabpanel"]');

      tabButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const targetId = btn.getAttribute('aria-controls');

          tabButtons.forEach((b) => {
            b.setAttribute('aria-selected', 'false');
            b.classList.remove('is-active');
          });

          tabPanels.forEach((p) => {
            p.hidden = true;
            p.classList.remove('is-active');
          });

          btn.setAttribute('aria-selected', 'true');
          btn.classList.add('is-active');

          const activePanel = tabsWrapper.querySelector(`#${targetId}`);
          if (activePanel) {
            activePanel.hidden = false;
            activePanel.classList.add('is-active');
          }
        });
      });
    });
  }

  function initAllEvora(scope) {
    initEvoraAccordions(scope);
    initEvoraScrollAnimations();
    initEvoraTabs(scope);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => initAllEvora());
  } else {
    initAllEvora();
  }

  // Shopify Theme Editor Live Update Support
  document.addEventListener('shopify:section:load', function (event) {
    initAllEvora(event.target);
  });

  document.addEventListener('shopify:section:reorder', function () {
    initEvoraScrollAnimations();
  });
})();
