/* ==========================================================================
   Interactive Logic — Eva Luthfia Ramadhani Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Sticky Navbar & Active Section Observer --- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active Section Link Highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  /* --- 2. Mobile Menu Toggle --- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
      }
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) icon.classList.replace('fa-xmark', 'fa-bars');
      });
    });
  }

  /* --- 3. Copy Email to Clipboard --- */
  const copyBtn = document.getElementById('copy-email-btn');
  const emailValue = document.getElementById('email-value');
  const toast = document.getElementById('toast');

  if (copyBtn && emailValue) {
    copyBtn.addEventListener('click', () => {
      const textToCopy = emailValue.textContent.trim();
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast('Email berhasil disalin ke clipboard!');
      }).catch(err => {
        showToast('Gagal menyalin email');
      });
    });
  }

  function showToast(message) {
    if (!toast) return;
    const toastMsg = document.getElementById('toast-message');
    if (toastMsg) toastMsg.textContent = message;
    
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  /* --- 4. Design Gallery Filter --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --- 5. Modal System --- */
  const modalContainer = document.getElementById('modal-container');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');
  const openGalleryBtns = document.querySelectorAll('.open-gallery-modal');

  // Content Templates for Projects
  const modalTemplates = {
    'modal-petroquant': `
      <div class="modal-detail">
        <span class="project-context-badge context-mining" style="margin-bottom:1rem;">
          <i class="fa-solid fa-pickaxe"></i> Kelompok (3 Orang) • MK MPTLM (Mei 2026)
        </span>
        <h2 style="font-size:1.6rem; margin-bottom:1rem;">PetroQuant — Detail & Ringkasan Proyek</h2>
        
        <p style="color:var(--text-muted); margin-bottom:1.5rem;">
          <strong>Konteks Akademis:</strong> Proyek akhir mata kuliah Manajemen Pengelolaan Tambang dan Lapangan Migas. Berfokus pada pembangunan kalkulator berbasis web untuk analisis kelayakan finansial investasi migas.
        </p>

        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); padding:1.25rem; border-radius:var(--radius-sm); margin-bottom:1.5rem;">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;"><i class="fa-solid fa-check-double"></i> Tanggung Jawab & Kontribusi Eva:</h4>
          <ul style="color:var(--text-muted); font-size:0.95rem; padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem;">
            <li>Mengembangkan dashboard antarmuka web kalkulator ekonomi (NCF, NPV, IRR).</li>
            <li>Melakukan debugging query SQL untuk memastikan rumus perhitungan finansial terotomatisasi secara presisi.</li>
            <li>Melakukan redesign antarmuka UI dengan tema light profesional agar mudah dibaca tim eksekutif.</li>
          </ul>
        </div>

        <div style="display:flex; gap:1rem; flex-wrap:wrap;">
          <span class="tech-tag">JavaScript</span>
          <span class="tech-tag">PHP</span>
          <span class="tech-tag">MySQL</span>
          <span class="tech-tag">Financial Modeling</span>
        </div>
      </div>
    `,

    'modal-begog': `
      <div class="modal-detail">
        <span class="project-context-badge context-kkn" style="margin-bottom:1rem;">
          <i class="fa-solid fa-hand-holding-heart"></i> Proyek Individu • KKN Klaten (Juli 2026)
        </span>
        <h2 style="font-size:1.6rem; margin-bottom:1rem;">Website Profil & CMS Sanggar Seni Begog Kiyatdiharjan</h2>
        
        <p style="color:var(--text-muted); margin-bottom:1.5rem;">
          <strong>Konteks Program Kerja KKN:</strong> Program digitalisasi kebudayaan lokal di Dukuh Candi, Desa Mlese, Klaten untuk memperkenalkan sanggar seni ke masyarakat luas.
        </p>

        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); padding:1.25rem; border-radius:var(--radius-sm); margin-bottom:1.5rem;">
          <h4 style="color:var(--accent-emerald); margin-bottom:0.5rem;"><i class="fa-solid fa-sliders"></i> Fitur & Arsitektur Utama:</h4>
          <ul style="color:var(--text-muted); font-size:0.95rem; padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem;">
            <li><strong>Halaman Publik Visitor:</strong> Informasi sanggar, profil pengurus, galeri pementasan, & jadwal acara.</li>
            <li><strong>CMS Admin Panel:</strong> Manajemen berita/artikel sanggar berbasis Laravel authentication.</li>
            <li><strong>Database Cloud:</strong> Integrasi Supabase untuk keamanan data & penyimpanan media.</li>
            <li><strong>Live Deployment:</strong> Di-host di Vercel dengan domain resmi <a href="https://www.gsbkiyatdiharjan.web.id/" target="_blank" style="color:var(--accent-cyan);">gsbkiyatdiharjan.web.id</a>.</li>
          </ul>
        </div>
      </div>
    `,

    'modal-ejamate': `
      <div class="modal-detail">
        <span class="project-context-badge context-mobile" style="margin-bottom:1rem;">
          <i class="fa-solid fa-mobile-screen-button"></i> Proyek Individu • MK Pemrograman Mobile (2025)
        </span>
        <h2 style="font-size:1.6rem; margin-bottom:1rem;">EjaMate — Mobile Learning & Gamification</h2>
        
        <p style="color:var(--text-muted); margin-bottom:1.5rem;">
          Aplikasi mobile persiapan UTBK berbasis Flutter untuk latihan soal pemahaman bacaan dan menulis.
        </p>

        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); padding:1.25rem; border-radius:var(--radius-sm); margin-bottom:1.5rem;">
          <h4 style="color:var(--accent-cyan); margin-bottom:0.5rem;"><i class="fa-solid fa-cubes"></i> Alur & Fitur Teknis:</h4>
          <ul style="color:var(--text-muted); font-size:0.95rem; padding-left:1.25rem; display:flex; flex-direction:column; gap:0.4rem;">
            <li><strong>Gamifikasi 30 Bab:</strong> Progres belajar bertahap yang tersimpan secara real-time per akun pengguna.</li>
            <li><strong>Keamanan Bcrypt:</strong> Pengamanan autentikasi kata sandi terenkripsi.</li>
            <li><strong>Custom REST API:</strong> Komunikasi data materi dan skor kuis yang efisien.</li>
            <li><strong>Paywall Premium:</strong> Sistem pembatasan bab gratis vs fitur premium.</li>
          </ul>
        </div>

        <a href="https://github.com/alfagebra/EjaMate" target="_blank" rel="noopener" class="btn btn-sm btn-outline">
          <i class="fa-brands fa-github"></i> Lihat Kode di GitHub
        </a>
      </div>
    `,

    'modal-bi': `
      <div class="modal-detail">
        <span class="project-context-badge context-bi" style="margin-bottom:1rem;">
          <i class="fa-solid fa-chart-pie"></i> Case Study & Analytics
        </span>
        <h2 style="font-size:1.6rem; margin-bottom:1rem;">Mining Operations & Business Intelligence Dashboard</h2>
        
        <p style="color:var(--text-muted); margin-bottom:1.5rem;">
          Konsep rancangan dashboard visualisasi data untuk monitoring efisiensi operasional sektor pertambangan.
        </p>
      </div>
    `
  };

  // Open Project Modal
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const modalKey = btn.getAttribute('data-modal');
      if (modalTemplates[modalKey]) {
        modalBody.innerHTML = modalTemplates[modalKey];
        openModal();
      }
    });
  });

  // Open Gallery Lightbox Modal
  openGalleryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');

      modalBody.innerHTML = `
        <div class="modal-detail text-center">
          <h2 style="font-size:1.5rem; margin-bottom:0.75rem; color:var(--text-main);">${title}</h2>
          <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem;">${desc}</p>
          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-glass); padding:2rem; border-radius:var(--radius-md);">
            <i class="fa-solid fa-swatchbook" style="font-size:3rem; color:var(--accent-amber); margin-bottom:1rem;"></i>
            <p style="color:var(--text-dim); font-size:0.85rem;">Pratinjau visual karya kepanitiaan. File aset desain dapat diperbarui secara mandiri di folder assets/.</p>
          </div>
        </div>
      `;
      openModal();
    });
  });

  function openModal() {
    if (modalContainer) {
      modalContainer.classList.add('active');
      modalContainer.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal() {
    if (modalContainer) {
      modalContainer.classList.remove('active');
      modalContainer.setAttribute('aria-hidden', 'true');
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalContainer) {
    const backdrop = modalContainer.querySelector('.modal-backdrop');
    if (backdrop) backdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

});
