const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector('#property-form');
const status = document.querySelector('#form-status');

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const subject = `New 4Ways Property Inquiry: ${data.get('address')}`;
  const body = [
    'NEW PROPERTY INQUIRY',
    '',
    `Property address: ${data.get('address') || ''}`,
    `Property type: ${data.get('propertyType') || ''}`,
    `Condition: ${data.get('condition') || ''}`,
    `Desired timeline: ${data.get('timeline') || ''}`,
    `Asking price: ${data.get('askingPrice') || ''}`,
    '',
    `Property details: ${data.get('details') || ''}`,
    '',
    `Seller name: ${data.get('name') || ''}`,
    `Phone: ${data.get('phone') || ''}`,
    `Email: ${data.get('email') || ''}`
  ].join('\n');

  status.textContent = 'Opening your email application with the property details prepared.';
  window.location.href =
    `mailto:jwinbush@4wayspropertygroup.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});


// Add each live Turo listing URL below.
const TURO_LISTINGS = { sonata: "" };

document.querySelectorAll('[data-turo-link]').forEach(link => {
  const url = TURO_LISTINGS[link.dataset.turoLink];
  if (url) { link.href = url; link.target = "_blank"; link.rel = "noopener"; }
  else { link.addEventListener('click', event => { event.preventDefault(); alert('The Turo listing link has not been added yet.'); }); }
});


// 4Ways Auto photo gallery
const galleryMain = document.querySelector('[data-gallery-main] img');
const galleryThumbs = document.querySelectorAll('[data-gallery-src]');

galleryThumbs.forEach((button, index) => {
  if (index === 0) button.classList.add('active');

  button.addEventListener('click', () => {
    if (!galleryMain) return;

    galleryMain.src = button.dataset.gallerySrc;
    galleryMain.alt = button.dataset.galleryAlt || '2024 Hyundai Sonata';

    galleryThumbs.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
  });
});
