document.getElementById('year').textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const form = document.getElementById('property-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', event => {
  event.preventDefault();

  const data = new FormData(form);
  const subject = encodeURIComponent('Off-Market Property Lead: ' + (data.get('address') || 'New Inquiry'));
  const body = encodeURIComponent(
`New off-market property inquiry

Property address: ${data.get('address') || ''}
Property type: ${data.get('propertyType') || ''}
Condition: ${data.get('condition') || ''}
Desired timeline: ${data.get('timeline') || ''}
Asking price: ${data.get('askingPrice') || ''}

Property details:
${data.get('details') || ''}

Seller name: ${data.get('name') || ''}
Phone: ${data.get('phone') || ''}
Email: ${data.get('email') || ''}`
  );

  status.textContent = 'Opening your email app with the property details...';
  window.location.href = `mailto:jwinbush@4wayspropertygroup.com?subject=${subject}&body=${body}`;
});