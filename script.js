document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Selector de Tema Visual (Dark / Light) con Persistencia
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const htmlElement = document.documentElement;

  // Cargar tema previo guardado o por defecto dark
  const savedTheme = localStorage.getItem('vsmoon_theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('vsmoon_theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
    }
  }

  // 2. Menú Móvil (Hamburguesa)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = navLinks.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', String(isExpanded));
      mobileMenuBtn.setAttribute('aria-label', isExpanded ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      const icon = mobileMenuBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.setAttribute('aria-label', 'Abrir menú de navegación');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // 3. Acordeón Interactivo de FAQ
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = item.querySelector('.accordion-content');
      
      // Cerrar otros elementos abiertos
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.accordion-content').style.maxHeight = null;
        }
      });

      // Alternar elemento seleccionado
      item.classList.toggle('active');
      if (item.classList.contains('active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = null;
      }
    });
  });

  // 4. Interacción de pestañas para cambiar la captura
  const tabButtons = document.querySelectorAll('.tab-btn');
  const galleryViewer = document.getElementById('gallery-viewer');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const newImgSrc = button.getAttribute('data-img');
      if (galleryViewer && newImgSrc) {
        galleryViewer.style.opacity = '0.3';
        setTimeout(() => {
          galleryViewer.src = newImgSrc;
          galleryViewer.style.opacity = '1';
        }, 150);
      }
    });
  });

  // 5. Control de Banner de Cookies
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookiesBtn = document.getElementById('accept-cookies-btn');

  if (!localStorage.getItem('vsmoon_cookies_accepted')) {
    setTimeout(() => {
      if (cookieBanner) cookieBanner.classList.add('show');
    }, 1000);
  }

  if (acceptCookiesBtn) {
    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('vsmoon_cookies_accepted', 'true');
      if (cookieBanner) cookieBanner.classList.remove('show');
    });
  }

  // 6. Modal Legal (Términos & Privacidad)
  const legalModal = document.getElementById('legal-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const openTermsBtn = document.getElementById('open-terms-btn');
  const openPrivacyBtn = document.getElementById('open-privacy-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBodyContent = document.getElementById('modal-body-content');

  const termsHTML = `
    <h4>1. Uso del Software</h4>
    <p>vsMOON Studio v1.8 es una aplicación portable distribuida por Pixelblade Games. Se otorga una licencia de uso personal, académica y no comercial para estudiantes y entusiastas.</p>
    <h4>2. Propiedad Intelectual</h4>
    <p>El código fuente, logotipos y diseños asociados a vsMOON Studio e identificados con el sello de Pixelblade Games son propiedad intelectual de Guillermo José Ortis Amador y sus colaboradores acreditados (anaHI luna, hetsamary, rodrigo alessandro).</p>
    <h4>3. Exención de Responsabilidad</h4>
    <p>El software se entrega "tal cual", sin garantías explícitas. Pixelblade Games no se hace responsable por pérdidas de datos imprevistas derivadas de su uso en proyectos fuera del ámbito de pruebas o laboratorios.</p>
  `;

  const privacyHTML = `
    <h4>1. Recopilación de Datos</h4>
    <p>vsMOON Studio v1.8 no recopila, almacena ni transmite datos personales ni telemetría a servidores remotos.</p>
    <h4>2. Almacenamiento Local</h4>
    <p>Este sitio web utiliza únicamente almacenamiento técnico en el navegador (localStorage) para recordar el tema preferido y el consentimiento de cookies.</p>
    <h4>3. Enlaces Externos</h4>
    <p>Este sitio contiene enlaces a proyectos propios y repositorios oficiales seguros. No nos responsabilizamos del contenido de plataformas de terceros.</p>
  `;

  function openModal(title, content) {
    if (modalTitle && modalBodyContent && legalModal) {
      modalTitle.textContent = title;
      modalBodyContent.innerHTML = content;
      legalModal.classList.add('active');
      legalModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (legalModal) {
      legalModal.classList.remove('active');
      legalModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (openTermsBtn) openTermsBtn.addEventListener('click', () => openModal('Términos y Condiciones', termsHTML));
  if (openPrivacyBtn) openPrivacyBtn.addEventListener('click', () => openModal('Política de Privacidad', privacyHTML));
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal && legalModal.classList.contains('active')) {
      closeModal();
    }
  });

});