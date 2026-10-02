const root = document.documentElement;
const themeButton = document.querySelector('#theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('resume-theme'); } catch {}
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme';
}
setTheme(savedTheme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('resume-theme', theme); } catch {}
});

const filters = document.querySelector('.skill-filters');
filters.hidden = false;
filters.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-filter]');
  if (!button) return;
  for (const control of filters.querySelectorAll('button')) {
    control.setAttribute('aria-pressed', String(control === button));
  }
  let count = 0;
  for (const card of document.querySelectorAll('.skills-grid article')) {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) count++;
  }
  document.querySelector('#skill-status').textContent = `${count} skill categories shown`;
});

for (const [index, job] of [...document.querySelectorAll('.job')].entries()) {
  const list = job.querySelector('ul');
  list.id = `job-details-${index}`;
  const button = document.createElement('button');
  button.className = 'detail-toggle';
  button.type = 'button';
  button.setAttribute('aria-controls', list.id);
  const label = job.querySelector('h3').textContent;
  function expand(open) {
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'Hide contributions −' : 'View contributions +';
    button.setAttribute('aria-label', `${open ? 'Hide' : 'View'} contributions: ${label}`);
    list.hidden = !open;
  }
  expand(index === 0);
  button.addEventListener('click', () => expand(list.hidden));
  list.before(button);
}

const copy = document.querySelector('#copy-email');
copy.hidden = false;
copy.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('rajatcspcst@gmail.com');
    status.textContent = 'Email copied to clipboard.';
  } catch {
    status.textContent = 'Select the email address above to copy it, or click it to open your email app.';
  }
});

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a[href^="#"]')];
  const observer = new IntersectionObserver((entries) => {
    const active = entries.find(entry => entry.isIntersecting);
    if (!active) return;
    for (const link of links) {
      if (link.hash === `#${active.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
  for (const link of links) observer.observe(document.querySelector(link.hash));
}
