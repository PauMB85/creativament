const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle?.setAttribute('aria-expanded','false');
}));

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    document.querySelectorAll('.event-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
    });
  });
});

document.querySelectorAll('form').forEach(form => form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Aquesta és una versió de demostració. El formulari encara no envia dades.');
}));
