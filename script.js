document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .process-line article, .sample-card').forEach((el) => observer.observe(el));

const benefits = [
  { title: 'Save Time', text: 'Outsource measurements, drafting, and permit coordination so your team can stay productive.' },
  { title: 'Reduce Delays', text: 'Clear documentation and organized correction responses help prevent avoidable setbacks.' },
  { title: 'One Point of Contact', text: 'Work with one dedicated contact from the initial review through permit approval.' },
  { title: 'Local Jurisdiction Experience', text: 'We work with Southern Nevada building departments and their submission processes.' },
  { title: 'Focus on Your Clients', text: 'We handle permit coordination while you manage the work and the client relationship.' }
];

const rotator = document.querySelector('[data-rotator]');
if (rotator) {
  const number = rotator.querySelector('[data-benefit-number]');
  const title = rotator.querySelector('[data-benefit-title]');
  const text = rotator.querySelector('[data-benefit-text]');
  const copy = rotator.querySelector('.benefit-copy');
  const dotsWrap = rotator.querySelector('[data-dots]');
  let index = 0;
  let timer;

  benefits.forEach((_, dotIndex) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Show benefit ${dotIndex + 1}`);
    dot.addEventListener('click', () => showBenefit(dotIndex, true));
    dotsWrap.appendChild(dot);
  });

  const dots = [...dotsWrap.children];

  function showBenefit(nextIndex, restart = false) {
    index = (nextIndex + benefits.length) % benefits.length;
    copy.classList.add('changing');
    window.setTimeout(() => {
      number.textContent = String(index + 1).padStart(2, '0');
      title.textContent = benefits[index].title;
      text.textContent = benefits[index].text;
      dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === index));
      copy.classList.remove('changing');
    }, 220);
    if (restart) startTimer();
  }

  function startTimer() {
    window.clearInterval(timer);
    timer = window.setInterval(() => showBenefit(index + 1), 6500);
  }

  rotator.querySelector('[data-prev]').addEventListener('click', () => showBenefit(index - 1, true));
  rotator.querySelector('[data-next]').addEventListener('click', () => showBenefit(index + 1, true));
  rotator.addEventListener('mouseenter', () => window.clearInterval(timer));
  rotator.addEventListener('mouseleave', startTimer);
  showBenefit(0);
  startTimer();
}
