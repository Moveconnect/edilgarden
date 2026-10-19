/* ====== CONFIG: modifica qui i recapiti reali ====== */
const PHONE = '+39 333 123 4567';
const EMAIL = 'info@edilgarden.it';

/* ---------- Navbar scroll ---------- */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll);
onScroll();

/* ---------- Mobile menu ---------- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('active');
  navLinks.classList.remove('open');
}));

/* ---------- Hero carousel ---------- */
const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('dots');
const capIdx = document.getElementById('capIdx');
const capTxt = document.getElementById('capTxt');
let current = 0, timer;

slides.forEach((s, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', 'Vai alla slide ' + (i + 1));
  d.addEventListener('click', () => { goTo(i); resetTimer(); });
  dotsWrap.appendChild(d);
});
const dots = Array.from(dotsWrap.children);

function goTo(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  capIdx.textContent = String(current + 1).padStart(2, '0');
  capTxt.style.opacity = 0;
  setTimeout(() => {
    capTxt.textContent = slides[current].dataset.label;
    capTxt.style.opacity = 1;
  }, 250);
}
function next() { goTo(current + 1); }
function resetTimer() { clearInterval(timer); timer = setInterval(next, 5000); }
resetTimer();

/* ---------- Reveal contatti ---------- */
function reveal(triggerId, valueId, value, href) {
  const trigger = document.getElementById(triggerId);
  const valueEl = document.getElementById(valueId);
  let shown = false;
  trigger.addEventListener('click', () => {
    if (!shown) {
      valueEl.textContent = value;
      trigger.classList.add('revealed');
      shown = true;
    } else {
      window.location.href = href;
    }
  });
}
reveal('phoneTrigger', 'phoneValue', PHONE, 'tel:' + PHONE.replace(/\s/g, ''));
reveal('emailTrigger', 'emailValue', EMAIL, 'mailto:' + EMAIL);

/* Quote button -> apre email precompilata */
document.getElementById('quoteBtn').addEventListener('click', (e) => {
  e.preventDefault();
  const subject = encodeURIComponent('Richiesta preventivo - Edilgarden');
  const body = encodeURIComponent('Salve,\nvorrei richiedere un preventivo per il seguente intervento:\n\n- Servizio: \n- Luogo (Roma/provincia): \n- Descrizione: \n\nGrazie.');
  window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
});