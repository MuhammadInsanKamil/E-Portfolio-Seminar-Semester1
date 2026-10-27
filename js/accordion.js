/**
 * accordion.js — Buka-tutup akordeon + lazy-load PDF
 */
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.accordion__item');
  if (items.length === 0) return;

  /**
   * Muat PDF di dalam item akordeon (lazy load).
   * Mengubah data-src → data agar <object> mulai merender.
   */
  function loadPdf(item) {
    item.querySelectorAll('object[data-src]').forEach((obj) => {
      if (!obj.data) {
        obj.data = obj.dataset.src;
      }
    });
  }

  items.forEach((item, i) => {
    const trigger = item.querySelector('.accordion__trigger');
    if (!trigger) return;

    // Buka item pertama secara default & muat PDF-nya
    if (i === 0) {
      item.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
      loadPdf(item);
    }

    trigger.addEventListener('click', () => {
      const wasOpen = item.classList.contains('open');

      items.forEach((other) => {
        other.classList.remove('open');
        const t = other.querySelector('.accordion__trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });

      if (!wasOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        // Delay sedikit agar animasi akordeon selesai dulu
        setTimeout(() => loadPdf(item), 120);
      }
    });
  });
});