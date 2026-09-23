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
    brand.innerHTML = '<img class="brand-logo" src="assets/logo-hd.png" alt="" aria-hidden="true"><span>ORDO DUO DECIM</span>';
    brand.setAttribute('aria-label', 'Ordo Duo Decim home');
  });
  document.querySelectorAll('.nav-left').forEach(group => {
    if (!group.querySelector('a[href="index.html"]')) group.insertAdjacentHTML('afterbegin', '<a href="index.html">Home</a>');
  });
  document.querySelectorAll('.nav').forEach(nav => {
    const eventsLink = nav.querySelector('.nav-left a[href="projects.html"]');
    const rightGroup = nav.querySelector('.nav-right');
    if (eventsLink && rightGroup) rightGroup.prepend(eventsLink);
  });
  document.querySelectorAll('.mobile-menu').forEach(menu => {
    if (!menu.querySelector('a[href="index.html"]')) menu.insertAdjacentHTML('afterbegin', '<a href="index.html">Home</a>');
  });
  document.querySelectorAll('a[href="activities.html"]').forEach(link => { link.textContent = 'Services'; });
  document.querySelectorAll('.site-footer').forEach(footer => {
    const statement = footer.querySelector(':scope > .shell > blockquote');
    if (statement) statement.innerHTML = 'ORDO DUO DECIM — Together We <em>Plan, Create, and Celebrate.</em>';
    const details = footer.querySelector('.footer-grid > div:first-child p');
    if (details) details.innerHTML = 'Address: Arayat Boulevard, Brgy. Pampang, Angeles City, 2009<br>Email: <a href="mailto:ordoduodecim12@gmail.com">ordoduodecim12@gmail.com</a><br>Phone: <a href="tel:+639941810919">0994 181 0919</a><br>Hours: Monday–Friday, 8:00 AM–5:00 PM';
    const copyright = footer.querySelector('.footer-bottom span:first-child');
    if (copyright) copyright.textContent = '© 2025 Ordo Duo Decim';
    const footerGrid = footer.querySelector('.footer-grid');
    if (footerGrid && !footer.querySelector('.education-disclaimer')) {
      footerGrid.insertAdjacentHTML('afterend', '<p class="education-disclaimer">THIS WEBSITE IS FOR EDUCATIONAL PURPOSES ONLY</p>');
    }
    const footerBottom = footer.querySelector('.footer-bottom');
    if (footerBottom && !footerBottom.querySelector('.legal-links')) {
      footerBottom.insertAdjacentHTML('afterbegin', '<span class="legal-links"><a href="privacy.html">Privacy Policy</a> · <a href="terms.html">Terms & Conditions</a></span>');
    }
    const socialColumn = [...footer.querySelectorAll('.footer-grid > div')].find(column => column.querySelector('h4')?.textContent.trim().toLowerCase() === 'follow us');
    if (socialColumn) socialColumn.innerHTML = '<h4>Follow us</h4><a href="https://www.facebook.com/share/19VWYMyxks/" target="_blank" rel="noopener noreferrer">Ordo Duo Decim ↗</a>';
  });

  const faqQuestions = [
    { question: 'How far in advance should I book?', answer: 'We recommend booking at least 1–3 months in advance to secure your preferred date, suppliers, and services. For large or special events, earlier booking is encouraged.' },
    { question: 'Do you provide event venues?', answer: 'Yes. We can recommend and coordinate with suitable venues based on your event type, number of guests, budget, and location.' },
    { question: 'Can I customize a package?', answer: 'Yes. Our packages can be customized according to your needs, preferences, and budget.' },
    { question: 'Do you require a reservation fee?', answer: 'Yes. A reservation fee is required to secure your event date. The amount will depend on the selected package and will be discussed before confirmation.' },
    { question: 'What happens after I submit my booking request?', answer: 'We will review your request, check the availability of your preferred date, and contact you to discuss the event details, package options, and next steps.' },
    { question: 'Can you organize events outside our area?', answer: 'Yes. We can accommodate events outside our usual service area, subject to availability and additional transportation or logistical charges.' },
    { question: 'Can we request changes to the proposal?', answer: 'Absolutely. We can revise the proposal based on your preferred services, theme, guest count, and budget.' },
    { question: 'What is your cancellation policy?', answer: 'Cancellation terms depend on the package and booking agreement. Reservation fees may be non-refundable, while other payments will be handled according to the agreed cancellation policy.' },
    { question: 'What types of events do you organize?', answer: 'We organize various events, including birthdays, weddings, debuts, corporate events, seminars, parties, school events, and other special occasions.' },
    { question: 'Do you offer different event packages?', answer: 'Yes. We offer different packages designed for various event sizes, needs, and budgets. Packages may also be customized upon request.' },
    { question: 'Can I choose my preferred theme and color scheme?', answer: 'Yes. You may choose your preferred theme, colors, and overall event style. We can also provide suggestions based on your concept.' },
    { question: 'Do you provide decorations and styling?', answer: 'Yes. Depending on your chosen package, we can provide decorations, styling, backdrops, tablescapes, and other event design elements.' },
    { question: 'Do you offer catering services?', answer: 'Yes. Catering services may be included in selected packages or arranged separately through our partner suppliers.' },
    { question: 'Can we choose our own menu?', answer: 'Yes. We can provide menu options, and you may select or request adjustments based on your preferences, guest needs, and budget.' },
    { question: 'Do you provide sounds, lights, and other equipment?', answer: 'Yes. We can provide or coordinate sound systems, lighting, microphones, projectors, screens, and other necessary event equipment, depending on your package.' },
    { question: 'Can you accommodate special requests?', answer: 'Yes. We do our best to accommodate special requests. Please inform us of your requirements early so we can properly plan and coordinate them.' },
    { question: 'How many guests can you accommodate?', answer: 'We can accommodate different event sizes, from small intimate gatherings to large events. The maximum capacity will depend on the venue, setup, and services required.' },
    { question: 'Do you offer event coordination services?', answer: 'Yes. Our event coordination service helps ensure that the program, suppliers, setup, and other event details are properly managed before and during the event.' },
    { question: 'Can you help us plan the event program?', answer: 'Yes. We can assist in creating and organizing your event program, including the sequence of activities, timing, presentations, and special segments.' },
    { question: 'How long does the event planning process take?', answer: 'The planning period depends on the size and complexity of the event. Simple events may take a few weeks, while larger events may require several months of preparation.' },
    { question: 'Can we have a meeting before booking?', answer: 'Yes. We encourage clients to have a consultation with us before booking so we can better understand their vision, requirements, and budget.' },
    { question: 'How can I check the availability of my preferred date?', answer: 'You can contact us through our official communication channels and provide your preferred event date. We will check our availability and get back to you.' },
    { question: 'What payment methods do you accept?', answer: 'We accept cash, bank transfer, and other available digital payment methods. Payment options will be discussed during the booking process.' },
    { question: 'When is the remaining balance due?', answer: 'The remaining balance is usually due before the event date, based on the payment schedule stated in your booking agreement.' },
    { question: 'Are there additional charges we should know about?', answer: 'Additional charges may apply for services outside the selected package, overtime, transportation, venue-related fees, special requests, or additional equipment. Any applicable charges will be discussed with you before they are confirmed.' }
  ];
  const accordion = document.querySelector('.accordion');
  if (accordion && document.body.dataset.page === 'contact') {
    accordion.innerHTML = faqQuestions.map(item => `<div class="faq-item"><button aria-expanded="false"><span>${item.question}</span><b>+</b></button><div class="answer"><p>${item.answer}</p></div></div>`).join('');
  }

  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = [...carousel.querySelectorAll('.carousel-slide')];
    const dotsContainer = carousel.querySelector('.carousel-dots');
    const currentLabel = carousel.querySelector('[data-current]');
    let currentIndex = 0;
    let swipeStartX = 0;
    let isSwiping = false;

    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show photo ${index + 1}`);
      dot.addEventListener('click', () => showSlide(index));
      dotsContainer.append(dot);
      return dot;
    });

    function showSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
      slides.forEach((slide, slideIndex) => {
        const active = slideIndex === currentIndex;
        slide.classList.toggle('is-active', active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      dots.forEach((dot, dotIndex) => {
        const active = dotIndex === currentIndex;
        dot.classList.toggle('is-active', active);
        dot.setAttribute('aria-current', active ? 'true' : 'false');
      });
      currentLabel.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    carousel.querySelector('.carousel-prev').addEventListener('click', () => showSlide(currentIndex - 1));
    carousel.querySelector('.carousel-next').addEventListener('click', () => showSlide(currentIndex + 1));
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') showSlide(currentIndex - 1);
      if (event.key === 'ArrowRight') showSlide(currentIndex + 1);
    });
    carousel.addEventListener('pointerdown', event => {
      if (!event.isPrimary) return;
      swipeStartX = event.clientX;
      isSwiping = true;
      carousel.classList.add('is-dragging');
      carousel.setPointerCapture?.(event.pointerId);
    });
    carousel.addEventListener('pointerup', event => {
      if (!isSwiping || !event.isPrimary) return;
      const distance = event.clientX - swipeStartX;
      isSwiping = false;
      carousel.classList.remove('is-dragging');
      if (Math.abs(distance) > 45) showSlide(currentIndex + (distance < 0 ? 1 : -1));
    });
    carousel.addEventListener('pointercancel', () => {
      isSwiping = false;
      carousel.classList.remove('is-dragging');
    });
    showSlide(0);
  });

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
  const pageMap = { home: 'index.html', about: 'about.html', members: 'members.html', activities: 'activities.html', projects: 'projects.html', contact: 'contact.html' };
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
    form.action = 'https://formsubmit.co/ordoduodecim12@gmail.com';
    form.method = 'POST';
    form.insertAdjacentHTML('afterbegin', `
      <input type="hidden" name="_subject" value="New Ordo Duo Decim Event Inquiry">
      <input type="hidden" name="_template" value="table">
      <input type="hidden" name="_captcha" value="false">
      <input type="text" name="_honey" class="form-trap" tabindex="-1" autocomplete="off" aria-hidden="true">
    `);
    const contactBlocks = [...document.querySelectorAll('.contact-info > div')];
    const contactBlock = label => contactBlocks.find(block => block.querySelector('span')?.textContent.trim() === label);
    const emailBlock = contactBlock('Email');
    if (emailBlock) emailBlock.innerHTML = '<span>Email</span><a href="mailto:ordoduodecim12@gmail.com">ordoduodecim12@gmail.com</a>';
    const addressBlock = contactBlock('Address');
    if (addressBlock) addressBlock.innerHTML = '<span>Address</span><p>Arayat Boulevard, Brgy. Pampang<br>Angeles City, 2009</p>';
    const phoneBlock = contactBlock('Phone');
    if (phoneBlock) phoneBlock.innerHTML = '<span>Phone</span><a href="tel:+639941810919">0994 181 0919</a>';
    const facebookBlock = contactBlock('Facebook');
    if (facebookBlock) facebookBlock.innerHTML = '<span>Facebook</span><a href="https://www.facebook.com/share/19VWYMyxks/" target="_blank" rel="noopener noreferrer">Ordo Duo Decim ↗</a>';
    const hoursBlock = contactBlock('Business Hours');
    if (hoursBlock) hoursBlock.innerHTML = '<span>Business Hours</span><p>Monday–Friday<br>8:00 AM–5:00 PM</p>';
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
        const response = await fetch('https://formsubmit.co/ajax/ordoduodecim12@gmail.com', {
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
        status.textContent = `${error.message} Please email ordoduodecim12@gmail.com directly.`;
      } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalLabel;
      }
    });
  }
});
