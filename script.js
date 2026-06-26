const motionGroups = [];

function registerMotionGroup(group, items, options = {}) {
  if (!group || !items.length) return;

  group.classList.add('motion-group');
  if (options.card) group.classList.add('motion-card');

  items.forEach((item, index) => {
    item.classList.add('motion-piece');
    item.style.setProperty('--motion-delay', `${index * 85}ms`);
    if (options.visual === item) item.classList.add('motion-visual');
  });

  motionGroups.push(group);
}

const hero = document.querySelector('.hero');
const heroStage = hero.querySelector('.hero-stage');
registerMotionGroup(hero, [...hero.querySelector('.hero-copy').children, heroStage], { visual: heroStage });

const introBand = document.querySelector('.intro-band');
registerMotionGroup(introBand, [...introBand.children]);

document.querySelectorAll('.section-heading').forEach((heading) => {
  registerMotionGroup(heading, [...heading.children]);
});

document.querySelectorAll('.product').forEach((product) => {
  const visual = product.querySelector('.visual');
  registerMotionGroup(product, [...product.querySelector('.product-copy').children, visual], {
    card: true,
    visual
  });
});

document.querySelectorAll('.resource-row').forEach((resource) => {
  registerMotionGroup(resource, [...resource.children], { card: true });
});

const closing = document.querySelector('.closing');
registerMotionGroup(closing, [...closing.children]);

const footer = document.querySelector('footer');
registerMotionGroup(footer, [...footer.children]);

const motionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      motionObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
);

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  motionGroups.forEach((group) => group.classList.add('is-visible'));
} else {
  motionGroups.forEach((group) => motionObserver.observe(group));
}

window.requestAnimationFrame(() => {
  document.querySelector('.site-header').classList.add('header-ready');
});

const glassHome = document.querySelector('.glass-home');
const homeVisibility = new IntersectionObserver(([entry]) => {
  document.querySelector('.site-header').classList.toggle('on-light', !entry.isIntersecting);
});
homeVisibility.observe(glassHome);

const dialog = document.querySelector('.notify-dialog');
const dialogProduct = document.querySelector('#dialog-product');
const closeButton = document.querySelector('.dialog-close');

document.querySelectorAll('.notify-button').forEach((button) => {
  button.addEventListener('click', () => {
    if (button.dataset.url) {
      window.open(button.dataset.url, '_blank', 'noopener,noreferrer');
      return;
    }
    dialogProduct.textContent = button.dataset.product;
    dialog.showModal();
  });
});

closeButton.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});

document.querySelector('#notify-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const submitButton = event.currentTarget.querySelector('button[type="submit"]');
  submitButton.textContent = '功能即将开放';
  submitButton.disabled = true;
  window.setTimeout(() => {
    submitButton.textContent = '订阅';
    submitButton.disabled = false;
  }, 1800);
});
