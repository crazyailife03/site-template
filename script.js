/* script.js ??shared interactive logic for all variants */

// Mobile menu toggle (Header Variant 4, 5)
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

// Transparent header on scroll (Header Variant 3 ??add data-header="transparent")
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

// Tab switching (Features Variant 5 ??add data-tab="id" and data-tab-content="id")
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

// Smooth scroll + close mobile menu on anchor click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('hidden');
  });
});
