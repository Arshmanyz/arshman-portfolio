const SANITY_PROJECT_ID = 'j5cki43u';
const SANITY_DATASET = 'production';
const SANITY_API_VERSION = '2024-01-01';

async function fetchSanity(query) {
  const endpoint = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;
  const response = await fetch(`${endpoint}?query=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error(`Sanity request failed: ${response.status}`);
  return (await response.json()).result;
}

function applyProduct(product) {
  const element = document.querySelector(`[data-sanity-product="${product.slug}"]`);
  if (!element) return;

  if (product.title) element.querySelector('h3').textContent = product.title;
  if (product.description) element.querySelector('.product-copy > p').textContent = product.description;
  if (product.status) element.querySelector('.status').textContent = product.status;

  const action = element.querySelector('.product-action');
  if (product.ctaLabel) action.firstChild.textContent = `${product.ctaLabel} `;
  if (product.url) action.dataset.url = product.url;

  if (product.imageUrl) {
    const image = element.querySelector('.sanity-product-image');
    image.src = product.imageUrl;
    image.alt = `${product.title} 产品展示`;
    image.hidden = false;
    element.querySelector('.visual').classList.add('has-sanity-image');
  }
}

function applyResource(resource) {
  const element = document.querySelector(`[data-sanity-resource="${resource.slug}"]`);
  if (!element) return;

  if (resource.title) element.querySelector('h3').textContent = resource.title;
  if (resource.description) element.querySelector('.resource-info p').textContent = resource.description;

  const action = element.querySelector('.circle-action');
  const url = resource.fileUrl || resource.externalUrl;
  if (url) action.dataset.url = url;

  if (resource.coverUrl) {
    const cover = element.querySelector('.sanity-resource-image');
    cover.src = resource.coverUrl;
    cover.alt = `${resource.title} 封面`;
    cover.hidden = false;
    element.querySelector('.document-preview').classList.add('has-sanity-image');
  }
}

function applySettings(settings) {
  if (!settings) return;

  if (settings.brandName) {
    document.querySelectorAll('[data-sanity-brand]').forEach((element) => {
      element.textContent = settings.brandName;
    });
    document.querySelector('[data-sanity-copyright]').textContent = `© 2026 ${settings.brandName}`;
    document.title = `${settings.brandName} · 个人产品`;
  }

  if (settings.tagline) document.querySelector('[data-sanity-tagline]').textContent = settings.tagline;
  if (settings.footerText) document.querySelector('[data-sanity-footer]').textContent = settings.footerText;
  if (settings.homeTitle) {
    const homeTitle = document.querySelector('[data-sanity-home-title]');
    homeTitle.textContent = settings.homeTitle;
    homeTitle.dataset.text = settings.homeTitle;
  }

  if (settings.homeBackgroundUrl) {
    const home = document.querySelector('[data-sanity-home]');
    const homeBackground = document.querySelector('[data-sanity-home-bg]');
    home.style.setProperty('--home-bg-url', `url("${settings.homeBackgroundUrl}")`);
    homeBackground.style.setProperty('--home-bg-url', `url("${settings.homeBackgroundUrl}")`);
  }

  if (settings.email) {
    document.querySelectorAll('[data-product="联系与合作"]').forEach((button) => {
      button.dataset.url = `mailto:${settings.email}`;
    });
    const closingContact = document.querySelector('.closing-contact');
    closingContact.firstChild.textContent = `${settings.email} `;
  }
}

async function loadSanityContent() {
  if (window.location.protocol === 'file:') return;

  const query = `{
    "products": *[_type == "product" && published == true] | order(order asc) {
      title, "slug": slug.current, description, status, ctaLabel, url,
      "imageUrl": image.asset->url
    },
    "resources": *[_type == "resource" && published == true] | order(order asc) {
      title, "slug": slug.current, description, externalUrl,
      "coverUrl": cover.asset->url, "fileUrl": file.asset->url
    },
    "settings": *[_type == "siteSettings"] | order(_updatedAt desc)[0] {
      brandName, homeTitle, tagline, email, footerText,
      "homeBackgroundUrl": homeBackground.asset->url
    }
  }`;

  try {
    const content = await fetchSanity(query);
    content.products.forEach(applyProduct);
    content.resources.forEach(applyResource);
    applySettings(content.settings);
  } catch (error) {
    console.info('Using built-in portfolio content.', error);
  }
}

loadSanityContent();
