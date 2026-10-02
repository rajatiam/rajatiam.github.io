const root = document.documentElement;
const contactForm = document.querySelector('#contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = new FormData(contactForm);
  const name = String(fields.get('name')).trim();
  const email = String(fields.get('email')).trim();
  const message = String(fields.get('message')).trim();
  if (!name || !message) {
    document.querySelector('#contact-form-status').textContent = 'Please enter your name and a message.';
    return;
  }
  const subject = `Website enquiry from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href = `${contactForm.getAttribute('action')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#contact-form-status').textContent = 'Your email app should open with a draft. If it does not, use the email link above.';
});
const themeButton = document.querySelector('#theme-toggle');
let savedTheme;
try { savedTheme = localStorage.getItem('resume-theme'); } catch {}
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme';
}
const systemTheme = matchMedia('(prefers-color-scheme: dark)');
setTheme(['light', 'dark'].includes(savedTheme) ? savedTheme : (systemTheme.matches ? 'dark' : 'light'));
themeButton.hidden = false;
themeButton.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  savedTheme = theme;
  try { localStorage.setItem('resume-theme', theme); } catch {}
});
systemTheme.addEventListener('change', (event) => {
  if (!['light', 'dark'].includes(savedTheme)) setTheme(event.matches ? 'dark' : 'light');
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
    await navigator.clipboard.writeText(document.querySelector('.email').getAttribute('href').slice(7));
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

const header = document.querySelector('.header');
const menu = document.querySelector('.menu-toggle');
menu.hidden = false;
header.classList.add('menu-ready');
function closeMenu() {
  header.classList.remove('menu-open');
  menu.setAttribute('aria-expanded', 'false');
  menu.textContent = 'Menu';
}
menu.addEventListener('click', () => {
  const open = header.classList.toggle('menu-open');
  menu.setAttribute('aria-expanded', String(open));
  menu.textContent = open ? 'Close' : 'Menu';
});
header.querySelector('nav').addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('menu-open')) {
    closeMenu(); menu.focus();
  }
});
