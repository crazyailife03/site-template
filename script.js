/* script.js — shared interactive logic for all variants */

// ============================================================
// Mobile menu toggle (Header Variant 4, 5)
// ============================================================
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

// ============================================================
// Transparent header on scroll (Header Variant 3)
// ============================================================
const transparentHeader = document.querySelector('[data-header="transparent"]');
if (transparentHeader) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      transparentHeader.classList.add('bg-base-100', 'shadow-md');
      transparentHeader.classList.remove('bg-transparent', 'text-white');
    } else {
      transparentHeader.classList.remove('bg-base-100', 'shadow-md');
      transparentHeader.classList.add('bg-transparent', 'text-white');
    }
  });
}

// ============================================================
// Tab switching (Features Variant 5)
// ============================================================
document.querySelectorAll('[data-tab]').forEach(tab => {
  tab.addEventListener('click', () => {
    const targetId = tab.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach(t => t.classList.remove('tab-active'));
    document.querySelectorAll('[data-tab-content]').forEach(c => c.classList.add('hidden'));
    tab.classList.add('tab-active');
    const target = document.querySelector(`[data-tab-content="${targetId}"]`);
    if (target) target.classList.remove('hidden');
  });
});

// ============================================================
// Smooth scroll + close mobile menu on anchor click
// 修正：補償固定導覽列高度，避免標題被遮住
// ============================================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const navbarHeight = document.querySelector('header, nav')?.offsetHeight || 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('hidden');
  });
});

// ============================================================
// Scroll Reveal — IntersectionObserver
// Adds .reveal and .reveal-stagger to section headings, cards,
// and grid rows so CSS transitions fire on viewport entry.
// ============================================================
(function initReveal() {
  // Auto-tag elements that should animate
  document.querySelectorAll('section').forEach(sec => {
    // Section headings
    sec.querySelectorAll('h2, h3').forEach(el => el.classList.add('reveal'));

    // Card grids — stagger each grid
    sec.querySelectorAll('.grid').forEach(grid => {
      if (grid.children.length > 1) grid.classList.add('reveal-stagger');
    });

    // Standalone cards not inside a grid
    sec.querySelectorAll('.card:not(.grid .card)').forEach(el => el.classList.add('reveal'));

    // Stat blocks
    sec.querySelectorAll('.stat').forEach(el => el.classList.add('reveal'));

    // Two-column flex rows
    sec.querySelectorAll('.flex.flex-col.md\\:flex-row, .flex.flex-col-reverse.md\\:flex-row-reverse').forEach(el => {
      el.classList.add('reveal-stagger');
    });
  });

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => observer.observe(el));
})();

// ============================================================
// Stats counter animation
// 用法：<span data-count="1000" data-count-suffix="+">1000</span>
// ============================================================
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        const suffix = el.dataset.countSuffix || '';
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * eased).toLocaleString() + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.unobserve(el);
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();

// ============================================================
// Navbar active-link highlight on scroll
// Marks the nav link whose section is currently in view.
// ============================================================
(function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('text-primary', active);
          link.classList.toggle('font-semibold', active);
        });
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(sec => observer.observe(sec));
})();

// ============================================================
// FAQ 手風琴（新版型使用 .faq-item / .faq-question / .faq-answer）
// DaisyUI collapse 元件不需要此段，僅供自訂 FAQ 版型使用
// ============================================================
(function initFaq() {
  const items = document.querySelectorAll('.faq-item');
  if (!items.length) return;

  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('faq-open');
      // 關閉其他已展開項目
      document.querySelectorAll('.faq-item.faq-open').forEach(other => {
        other.classList.remove('faq-open');
        other.querySelector('.faq-answer')?.classList.add('hidden');
      });
      if (!isOpen) {
        item.classList.add('faq-open');
        answer.classList.remove('hidden');
      }
    });
  });
})();
