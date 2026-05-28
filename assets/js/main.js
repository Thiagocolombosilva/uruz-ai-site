"use strict";

// ═══════════════════════════════════════════════════
//  URUZ AI — main.js
//  Versão: 1.0 | 2026
// ═══════════════════════════════════════════════════

/* ── NAVEGAÇÃO ─────────────────────────────────────── */
(function initNav() {
  const nav    = document.querySelector('.nav');
  const burger = document.querySelector('.nav__burger');
  const links  = document.querySelector('.nav__links');
  const cta    = document.querySelector('.nav__cta');

  if (!nav) return;

  // Scroll: adiciona classe .scrolled
  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hambúrguer mobile
  if (burger && links) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      links.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
      if (cta) cta.style.display = open ? 'block' : '';
    });

    // Fecha ao clicar em um link
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        links.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        if (cta) cta.style.display = '';
      });
    });
  }

  // Fecha ao clicar fora
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      burger && burger.classList.remove('open');
      links && links.classList.remove('open');
      burger && burger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ── ANIMAÇÕES DE SCROLL (Intersection Observer) ──── */
(function initScrollAnimations() {
  // Respeita preferência do usuário por menos movimento
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
})();

/* ── SMOOTH SCROLL com offset para nav fixa ────────── */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.querySelector('.nav')?.offsetHeight || 80;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();

/* ── FORMULÁRIO DE CONTATO ─────────────────────────── */
(function initContactForm() {
  const form      = document.getElementById('contact-form');
  const statusEl  = document.getElementById('form-status');
  const submitBtn = form && form.querySelector('.form__submit');

  if (!form) return;

  // Validação de campo individual
  function validateField(input) {
    const value   = input.value.trim();
    const name    = input.name;
    let   isValid = true;
    let   msg     = '';

    if (input.required && !value) {
      isValid = false;
      msg = 'Este campo é obrigatório.';
    } else if (name === 'email' && value) {
      // Regex básica de e-mail
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRe.test(value)) {
        isValid = false;
        msg = 'Informe um e-mail válido.';
      }
    } else if (name === 'phone' && value) {
      // Aceita formatos brasileiros: (11) 91234-5678, 11912345678, etc.
      const phoneRe = /^[\d\s()\-+]{10,20}$/;
      if (!phoneRe.test(value)) {
        isValid = false;
        msg = 'Informe um telefone válido.';
      }
    }

    const errEl = input.parentElement.querySelector('.form-error');
    if (!isValid) {
      input.classList.add('error');
      if (errEl) { errEl.textContent = msg; }
    } else {
      input.classList.remove('error');
      if (errEl) { errEl.textContent = ''; }
    }
    return isValid;
  }

  // Validar ao sair do campo
  form.querySelectorAll('[required], [name="email"], [name="phone"]').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('error')) validateField(input);
    });
  });

  // Sanitizar texto (evita HTML injection na URL / referência)
  function sanitize(str) {
    const map = { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":"&#39;" };
    return String(str).replace(/[&<>"']/g, c => map[c]);
  }

  // Envio
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Honeypot check — se preenchido, é bot
    if (form.querySelector('[name="botcheck"]')?.checked) return;

    // Validar todos os campos obrigatórios
    let isFormValid = true;
    form.querySelectorAll('[required]').forEach(input => {
      if (!validateField(input)) isFormValid = false;
    });
    if (!isFormValid) return;

    // Estado de loading
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    statusEl.className = 'form__status';
    statusEl.style.display = 'none';

    try {
      const data = new FormData(form);
      const resp = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
      });
      const json = await resp.json();

      if (json.success) {
        statusEl.textContent = '✦ Mensagem enviada! Entraremos em contato em breve.';
        statusEl.className = 'form__status success';
        statusEl.style.display = 'block';
        form.reset();
        // Scroll suave para o status
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        throw new Error(json.message || 'Erro no envio');
      }
    } catch (err) {
      statusEl.textContent = 'Ocorreu um erro ao enviar. Por favor, tente novamente ou entre em contato diretamente pelo e-mail.';
      statusEl.className = 'form__status error';
      statusEl.style.display = 'block';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar Mensagem';
    }
  });
})();

/* ── ANO DINÂMICO NO FOOTER ────────────────────────── */
(function setYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();
