document.addEventListener('DOMContentLoaded', () => {
  const organizationStats = {
    members: 11,
    projects: 3,
    events: 1,
    years: 1
  };

  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (finePointer && !prefersReducedMotion) {
    const aura = document.createElement('div');
    const ring = document.createElement('div');
    aura.className = 'cursor-aura';
    ring.className = 'cursor-ring';
    document.body.append(aura, ring);

    let mouseX = innerWidth / 2;
    let mouseY = innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;
    let frameId;
    const renderCursor = () => {
      auraX += (mouseX - auraX) * 0.11;
      auraY += (mouseY - auraY) * 0.11;
      aura.style.transform = `translate3d(${auraX}px, ${auraY}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      frameId = requestAnimationFrame(renderCursor);
    };
    frameId = requestAnimationFrame(renderCursor);

    window.addEventListener('mousemove', event => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      document.body.classList.add('cursor-visible');
    }, { passive: true });
    document.documentElement.addEventListener('mouseleave', () => document.body.classList.remove('cursor-visible'));

    document.querySelectorAll('a, button, input, select, textarea, .project-card, .portrait-card').forEach(element => {
      element.addEventListener('mouseenter', () => document.body.classList.add('cursor-interactive'));
      element.addEventListener('mouseleave', () => document.body.classList.remove('cursor-interactive'));
    });

    document.querySelectorAll('.hero-main img, .featured-image img, .page-hero-image img').forEach(image => {
      const frame = image.closest('figure');
      frame?.addEventListener('mousemove', event => {
        const rect = frame.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 14;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 14;
        image.style.transform = `scale(1.035) translate3d(${x}px, ${y}px, 0)`;
      });
      frame?.addEventListener('mouseleave', () => { image.style.transform = ''; });
    });

    window.addEventListener('pagehide', () => cancelAnimationFrame(frameId), { once: true });
  }

  document.title = document.title.replace('Asteria Collective', 'Ordo Duo Decim');
  document.querySelectorAll('.brand').forEach(brand => {
    brand.innerHTML = '<span class="brand-mark">✦</span> ORDO DUO DECIM';
    brand.setAttribute('aria-label', 'Ordo Duo Decim home');
  });
  document.querySelectorAll('.site-footer').forEach(footer => {
    const statement = footer.querySelector(':scope > .shell > blockquote');
    if (statement) statement.innerHTML = 'ORDO DUO DECIM — Together We <em>Plan, Create, and Celebrate.</em>';
    const details = footer.querySelector('.footer-grid > div:first-child p');
    if (details) details.innerHTML = 'Address: To be announced<br>Email: <a href="mailto:neogonsai@gmail.com">neogonsai@gmail.com</a><br>Phone: To be announced';
    const copyright = footer.querySelector('.footer-bottom span:first-child');
    if (copyright) copyright.textContent = '© 2025 Ordo Duo Decim';
  });

  const faqQuestions = [
    'How far in advance should I book?',
    'Do you provide event venues?',
    'Can I customize a package?',
    'Do you require a reservation fee?',
    'What happens after I submit my booking request?',
    'Can you organize events outside our area?',
    'Can we request changes to the proposal?',
    'What is your cancellation policy?',
    'What types of events do you organize?',
    'Do you offer different event packages?',
    'Can I choose my preferred theme and color scheme?',
    'Do you provide decorations and styling?',
    'Do you offer catering services?',
    'Can we choose our own menu?',
    'Do you provide sounds, lights, and other equipment?',
    'Can you accommodate special requests?',
    'How many guests can you accommodate?',
    'Do you offer event coordination services?',
    'Can you help us plan the event program?',
    'How long does the event planning process take?',
    'Can we have a meeting before booking?',
    'How can I check the availability of my preferred date?',
    'What payment methods do you accept?',
    'When is the remaining balance due?',
    'Are there additional charges we should know about?'
  ];
  const accordion = document.querySelector('.accordion');
  if (accordion && document.body.dataset.page === 'contact') {
    accordion.innerHTML = faqQuestions.map(question => `<div class="faq-item"><button aria-expanded="false"><span>${question}</span><b>+</b></button><div class="answer"><p>Details for this policy are being finalized. Please submit an inquiry so Ordo Duo Decim can confirm the arrangements for your event.</p></div></div>`).join('');
  }

  if (document.body.dataset.page === 'projects') {
    document.querySelectorAll('.filters button').forEach(button => {
      if (!['all', 'projects'].includes(button.dataset.filter)) button.hidden = true;
    });
    document.querySelectorAll('.project-card').forEach((card, index) => {
      const number = index + 1;
      card.dataset.title = `Project ${String(number).padStart(2, '0')}`;
      card.dataset.date = '2025 — details to be confirmed';
      card.dataset.location = 'To be announced';
      card.dataset.description = 'This is one of three completed Ordo Duo Decim projects. The official title, category, date, location, and project description will be added once confirmed.';
      card.dataset.category = 'projects';
      const title = card.querySelector('.project-meta h2');
      const category = card.querySelector('.project-meta p');
      const year = card.querySelector('.project-meta time');
      if (title) title.textContent = `Project ${String(number).padStart(2, '0')}`;
      if (category) category.textContent = 'Details forthcoming';
      if (year) year.textContent = '2025';
    });
  }

  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-toggle');

  const setHeaderState = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = !header.classList.contains('menu-open');
    header.classList.toggle('menu-open', open);
    document.body.classList.toggle('menu-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  const currentPage = document.body.dataset.page;
  const pageMap = { about: 'about.html', members: 'members.html', activities: 'activities.html', projects: 'projects.html', contact: 'contact.html' };
  if (pageMap[currentPage]) {
    document.querySelectorAll(`a[href="${pageMap[currentPage]}"]`).forEach(link => {
      if (link.closest('.nav')) link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    });
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -45px' });
  document.querySelectorAll('.reveal').forEach((el, index) => {
    el.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    revealObserver.observe(el);
  });

  const counters = document.querySelectorAll('.count-up');
  counters.forEach(counter => {
    const target = counter.dataset.stat
      ? organizationStats[counter.dataset.stat]
      : Number(counter.dataset.count);
    counter.dataset.target = String(target ?? 0);
    counter.setAttribute('aria-label', String(target ?? 0));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animateCounter = counter => {
    const target = Number(counter.dataset.target);
    if (reduceMotion) {
      counter.textContent = String(target);
      return;
    }
    const duration = 1400;
    const startTime = performance.now();
    const update = now => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = String(Math.round(target * eased));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.65 });
  counters.forEach(counter => counterObserver.observe(counter));

  document.querySelectorAll('.faq-item button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const answer = item.querySelector('.answer');
      const open = button.getAttribute('aria-expanded') === 'true';
      document.querySelectorAll('.faq-item button[aria-expanded="true"]').forEach(other => {
        if (other !== button) {
          other.setAttribute('aria-expanded', 'false');
          other.querySelector('b').textContent = '+';
          other.closest('.faq-item').querySelector('.answer').style.maxHeight = null;
        }
      });
      button.setAttribute('aria-expanded', String(!open));
      button.querySelector('b').textContent = open ? '+' : '−';
      answer.style.maxHeight = open ? null : `${answer.scrollHeight}px`;
    });
  });

  const filterButtons = document.querySelectorAll('.filters button');
  const projects = document.querySelectorAll('.project-card');
  filterButtons.forEach(button => button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    projects.forEach(project => project.classList.toggle('hidden', filter !== 'all' && project.dataset.category !== filter));
  }));

  const modal = document.querySelector('.project-modal');
  let lastFocused;
  const closeModal = () => {
    if (!modal) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    lastFocused?.focus();
  };
  document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => {
    const card = button.closest('.project-card');
    lastFocused = button;
    modal.querySelector('img').src = card.querySelector('img').src;
    modal.querySelector('img').alt = card.querySelector('img').alt;
    modal.querySelector('#modal-title').textContent = card.dataset.title;
    modal.querySelector('.modal-category').textContent = card.dataset.category;
    modal.querySelector('.modal-date').textContent = card.dataset.date;
    modal.querySelector('.modal-location').textContent = card.dataset.location;
    modal.querySelector('.modal-description').textContent = card.dataset.description;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close').focus();
  }));
  modal?.querySelector('.modal-close').addEventListener('click', closeModal);
  modal?.addEventListener('click', event => { if (event.target === modal) closeModal(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal && !modal.hidden) closeModal(); });

  const form = document.querySelector('.contact-form');
  if (form) {
    form.action = 'https://formsubmit.co/neogonsai@gmail.com';
    form.method = 'POST';
    form.insertAdjacentHTML('afterbegin', `
      <input type="hidden" name="_subject" value="New Ordo Duo Decim Event Inquiry">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">
      <input type="text" name="_honey" class="form-trap" tabindex="-1" autocomplete="off" aria-hidden="true">
    `);
    const emailBlock = document.querySelector('.contact-info > div:first-of-type');
    if (emailBlock) emailBlock.innerHTML = '<span>Email</span><a href="mailto:neogonsai@gmail.com">neogonsai@gmail.com</a>';
    const status = form.querySelector('.form-status');
    if (status) status.textContent = 'Your inquiry will be sent securely by email.';
    form.addEventListener('submit', async event => {
      event.preventDefault();
      const submitButton = form.querySelector('[type="submit"]');
      const originalLabel = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.innerHTML = 'Sending…';
      status.className = 'form-status is-sending';
      status.textContent = 'Sending your inquiry…';

      const payload = Object.fromEntries(new FormData(form).entries());
      try {
        const response = await fetch('https://formsubmit.co/ajax/neogonsai@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload)
        });
        const result = await response.json().catch(() => ({}));
        if (!response.ok || result.success === false) {
          throw new Error(result.message || 'The email service rejected the submission.');
        }
        form.reset();
        status.className = 'form-status is-success';
        status.textContent = result.message || 'Inquiry sent. Please check the receiving inbox.';
      } catch (error) {
        status.className = 'form-status is-error';
        status.textContent = `${error.message} Please email neogonsai@gmail.com directly.`;
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalLabel;
      }
    });
  }
});
