document.addEventListener('DOMContentLoaded', () => {
  const progressBar = document.querySelector('.reading-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      progressBar.style.width = scrolled + '%';
    });
  }

  const themeBtn = document.querySelector('.btn-theme-foundry');
  const savedTheme = localStorage.getItem('jacketdistrict_theme');
  if (savedTheme === 'light') {
    document.body.classList.add('theme-foundry-light');
    if (themeBtn) themeBtn.textContent = 'Foundry Dark';
  }
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('theme-foundry-light');
      themeBtn.textContent = isLight ? 'Foundry Dark' : 'Atelier Light';
      localStorage.setItem('jacketdistrict_theme', isLight ? 'light' : 'dark');
    });
  }

  const mobileToggle = document.querySelector('.mobile-toggle-jacket');
  const navMenu = document.querySelector('.jacket-nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.style.display === 'flex';
      navMenu.style.display = isOpen ? 'none' : 'flex';
      if (!isOpen) {
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.background = 'var(--bg-foundry-surface)';
        navMenu.style.padding = '1.75rem';
        navMenu.style.boxShadow = 'var(--shadow-foundry)';
        navMenu.style.borderBottom = '1px solid var(--border-foundry)';
      }
    });
  }

  const silSelect = document.getElementById('jacket-silhouette-select');
  const matSelect = document.getElementById('jacket-material-select');
  const hwSelect = document.getElementById('jacket-hardware-select');
  const hydroDisplay = document.getElementById('calc-hydro');
  const thermalDisplay = document.getElementById('calc-thermal');
  const longevityDisplay = document.getElementById('calc-longevity');

  function calculateOuterwearSpecs() {
    if (!silSelect || !matSelect || !hwSelect) return;
    const mat = matSelect.value;
    const sil = silSelect.value;

    let hydro = '1,500 mm H2O (Natural Repellent)';
    let thermal = '-5Â°F to 45Â°F (Sub-Zero)';
    let longevity = '50+ Years (Heirloom Grade)';

    if (mat === 'waxed') {
      hydro = '4,500 mm H2O (Stormproof Wax)';
      thermal = '25Â°F to 60Â°F (Four-Season)';
      longevity = '30+ Years (Re-Waxable)';
    } else if (mat === 'ventile') {
      hydro = '7,500 mm H2O (Hydrostatic Dense)';
      thermal = '15Â°F to 55Â°F (Alpine Windproof)';
      longevity = '25+ Years (Dense Long-Staple)';
    } else if (mat === 'denim') {
      hydro = '400 mm H2O (Raw Loomstate)';
      thermal = '45Â°F to 70Â°F (Transitional)';
      longevity = '20+ Years (Selvedge Twill)';
    }

    if (sil === 'b3') {
      thermal = '-25Â°F (High-Altitude Aviator Shearling)';
    }

    if (hydroDisplay) hydroDisplay.textContent = hydro;
    if (thermalDisplay) thermalDisplay.textContent = thermal;
    if (longevityDisplay) longevityDisplay.textContent = longevity;
  }

  if (silSelect && matSelect && hwSelect) {
    silSelect.addEventListener('change', calculateOuterwearSpecs);
    matSelect.addEventListener('change', calculateOuterwearSpecs);
    hwSelect.addEventListener('change', calculateOuterwearSpecs);
    calculateOuterwearSpecs();
  }

  const faqBtns = document.querySelectorAll('.faq-jacket-btn');
  if (faqBtns.length > 0) {
    faqBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-jacket-item').forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    });
  }

  const searchInput = document.getElementById('jacket-search-input');
  const blogCards = document.querySelectorAll('.blog-jacket-card');
  if (searchInput && blogCards.length > 0) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      blogCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        card.style.display = (q === '' || text.includes(q)) ? 'flex' : 'none';
      });
    });
  }
});