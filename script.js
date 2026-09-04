/* ==========================================================================
   Bespoke Interactivity — Eva Luthfia Ramadhani Portfolio
   Smooth Scroll Reveal, Glowing Cursor, Micro Animations & Case Studies
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. Smooth Glowing Cursor Follower --- */
  const cursorGlow = document.getElementById('cursor-glow');
  let cursorX = 0, cursorY = 0;
  let glowX = 0, glowY = 0;

  if (cursorGlow && window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });

    // Smooth interpolation for buttery cursor movement
    function animateCursor() {
      glowX += (cursorX - glowX) * 0.08;
      glowY += (cursorY - glowY) * 0.08;
      cursorGlow.style.left = `${glowX}px`;
      cursorGlow.style.top = `${glowY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();
  }

  /* --- 2. Enhanced Intersection Observer for Smooth Scroll Reveal --- */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- 3. Staggered reveal for grid children --- */
  function addStaggerToChildren(parentSelector, childSelector) {
    const parents = document.querySelectorAll(parentSelector);
    parents.forEach(parent => {
      const children = parent.querySelectorAll(childSelector);
      children.forEach((child, index) => {
        const staggerClass = `stagger-${Math.min(index + 1, 6)}`;
        child.classList.add(staggerClass);
      });
    });
  }

  addStaggerToChildren('.about-grid', '.about-card');
  addStaggerToChildren('.software-grid', '.software-pill');
  addStaggerToChildren('.gallery-grid', '.gallery-card');
  addStaggerToChildren('.contact-grid', '.contact-item');

  /* --- 4. Smooth Number Counter Animation --- */
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'));
        let current = 0;
        const increment = Math.max(1, Math.floor(target / 30));
        const duration = 1500;
        const stepTime = duration / (target / increment);

        const counter = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(counter);
          }
          el.textContent = current + '+';
        }, stepTime);

        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));

  /* --- 5. Sticky Navbar with Smooth Transition & Active Nav Observer --- */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  let lastScrollY = 0;
  let ticking = false;

  window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(() => {
        // Navbar background
        if (lastScrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }

        // Active section tracking
        let current = '';
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 120;
          const sectionHeight = section.offsetHeight;
          if (lastScrollY >= sectionTop && lastScrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
          }
        });

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
          }
        });

        ticking = false;
      });
      ticking = true;
    }
  });

  /* --- 6. Mobile Menu Toggle with Smooth Animation --- */
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = navToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
        icon.style.transform = 'rotate(180deg)';
      } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
        icon.style.transform = 'rotate(0deg)';
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.replace('fa-xmark', 'fa-bars');
          icon.style.transform = 'rotate(0deg)';
        }
      });
    });
  }

  /* --- 7. Full-Screen Case Study Overlay with Smooth Entry --- */
  const csOverlay = document.getElementById('case-study-overlay');
  const csContainer = document.getElementById('cs-container');
  const csClose = document.getElementById('cs-close');
  const openCsBtns = document.querySelectorAll('.open-case-study');

  const caseStudyData = {
    'cs-petroquant': `
      <div class="cs-header">
        <span class="project-context-badge" style="margin-bottom:1rem;"><i class="fa-solid fa-users"></i> Kelompok (3 Orang) • MK MPTLM (Mei 2026)</span>
        <h1 class="cs-title">PetroQuant — Case Study Kalkulator Ekonomi Proyek Migas & Tambang</h1>
        <p style="color:var(--text-muted); font-size:1.1rem;">Evaluasi finansial investasi sektor energi berbasis pemodelan kuantitatif NCF, NPV, & IRR.</p>
      </div>

      <div class="cs-grid">
        <div class="cs-left">
          <div class="cs-section-box">
            <h3><i class="fa-solid fa-bullseye text-gradient"></i> Latar Belakang & Masalah</h3>
            <p>Perhitungan kelayakan ekonomi lapangan migas dan pertambangan umumnya memerlukan analisis variabel kompleks seperti <i>Discount Rate, Capex, Opex</i>, serta estimasi penerimaan tahunan. Tim membutuhkan alat bantu kalkulasi otomatis yang cepat dan dapat diandalkan secara visual.</p>
          </div>

          <div class="cs-section-box">
            <h3><i class="fa-solid fa-layer-group text-gradient"></i> Solusi & Arsitektur Perangkat Lunak</h3>
            <p>PetroQuant dibangun menggunakan kombinasi JavaScript interaktif untuk rendering kalkulator real-time, PHP sebagai pemroses logika backend, dan MySQL untuk menyimpan skenario parameter ekonomi.</p>
          </div>

          <div class="cs-section-box">
            <h3><i class="fa-solid fa-user-gear text-gradient"></i> Peran & Tanggung Jawab Utama Eva</h3>
            <ul>
              <li><strong>Dashboard UI/UX Redesign:</strong> Merancang ulang skema warna dan tata letak dashboard ke tema light yang bersih dan mudah dibaca oleh pemangku kepentingan.</li>
              <li><strong>Debugging & Optimasi Query:</strong> Memastikan algoritma perhitungan Net Present Value (NPV) dan Internal Rate of Return (IRR) berjalan tepat tanpa selisih pembulatan.</li>
              <li><strong>Form Parametrik Interaktif:</strong> Membangun form input variabel cepat agar skenario investasi dapat dihitung ulang seketika.</li>
            </ul>
          </div>
        </div>

        <div class="cs-right">
          <div class="cs-section-box">
            <h3><i class="fa-solid fa-code text-gradient"></i> Tech Stack</h3>
            <div class="tech-stack" style="margin-top:0.75rem;">
              <span class="tech-tag">JavaScript (ES6)</span>
              <span class="tech-tag">PHP</span>
              <span class="tech-tag">MySQL Database</span>
              <span class="tech-tag">Financial Modeling</span>
            </div>
          </div>

          <div class="cs-section-box">
            <h3><i class="fa-solid fa-chart-line text-gradient"></i> Hasil Perhitungan</h3>
            <p><strong>Status Kelayakan:</strong> Feasible (IRR 24.6% > Discount Rate 10%)</p>
            <p><strong>NPV Terhitung:</strong> +$ 2,410,200</p>
          </div>
        </div>
      </div>
    `,

    'cs-begog': `
      <div class="cs-header">
        <span class="project-context-badge" style="margin-bottom:1rem;"><i class="fa-solid fa-user"></i> Proyek Individu • KKN Klaten (Juli 2026)</span>
        <h1 class="cs-title">Website Profil & CMS Sanggar Seni Begog Kiyatdiharjan</h1>
        <p style="color:var(--text-muted); font-size:1.1rem;">Digitalisasi kebudayaan dan sistem manajemen konten sanggar seni tradisional Klaten.</p>
      </div>

      <div class="cs-grid">
        <div class="cs-left">
          <div class="cs-section-box">
            <h3><i class="fa-solid fa-bullseye text-gradient"></i> Tantangan Program Kerja KKN</h3>
            <p>Sanggar Seni Begog Kiyatdiharjan di Desa Mlese Klaten sebelumnya belum memiliki media informasi digital resmi. Informasi kegiatan, profil pengurus, dan galeri pementasan sulit diakses oleh publik luar daerah.</p>
          </div>

          <div class="cs-section-box">
            <h3><i class="fa-solid fa-gears text-gradient"></i> Implementasi Full-Stack & CMS</h3>
            <p>Membangun antarmuka publik responsif yang dapat diakses pengunjung secara bebas, serta menyediakan panel Admin CMS berbasis Laravel authentication agar pengurus sanggar dapat mengunggah artikel dan jadwal baru tanpa perlu mengedit kode.</p>
          </div>

          <div class="cs-section-box">
            <h3><i class="fa-solid fa-list-check text-gradient"></i> Fitur & Komponen Teknis</h3>
            <ul>
              <li><strong>Supabase Cloud Storage:</strong> Penyimpanan foto pementasan dan artikel yang terenkripsi dan cepat.</li>
              <li><strong>CMS Admin Authenticated:</strong> Sistem CRUD berita dan pementasan sanggar.</li>
              <li><strong>Custom Domain & Vercel Deploy:</strong> Dihubungkan ke domain publik <a href="https://www.gsbkiyatdiharjan.web.id/" target="_blank" style="color:var(--accent-primary);">gsbkiyatdiharjan.web.id</a>.</li>
            </ul>
          </div>
        </div>

        <div class="cs-right">
          <div class="cs-section-box">
            <h3><i class="fa-solid fa-code text-gradient"></i> Tech Stack</h3>
            <div class="tech-stack" style="margin-top:0.75rem;">
              <span class="tech-tag">Laravel</span>
              <span class="tech-tag">Supabase</span>
              <span class="tech-tag">Vercel</span>
              <span class="tech-tag">Tailwind CSS</span>
            </div>
          </div>

          <div class="cs-section-box">
            <h3><i class="fa-solid fa-globe text-gradient"></i> Live URL</h3>
            <a href="https://www.gsbkiyatdiharjan.web.id/" target="_blank" rel="noopener" class="btn btn-primary btn-sm" style="margin-top:0.5rem;">
              Kunjungi gsbkiyatdiharjan.web.id ➔
            </a>
          </div>
        </div>
      </div>
    `,

    'cs-ejamate': `
      <div class="cs-header">
        <span class="project-context-badge" style="margin-bottom:1rem;"><i class="fa-solid fa-mobile"></i> Proyek Individu • MK Pemrograman Mobile (2025)</span>
        <h1 class="cs-title">EjaMate — Aplikasi Gamifikasi Pembelajaran UTBK</h1>
        <p style="color:var(--text-muted); font-size:1.1rem;">Aplikasi mobile persiapan UTBK dengan 30 bab materi, paywall, & enkripsi Bcrypt.</p>
      </div>

      <div class="cs-grid">
        <div class="cs-left">
          <div class="cs-section-box">
            <h3><i class="fa-solid fa-gamepad text-gradient"></i> Konsep Gamifikasi Belajar</h3>
            <p>Siswa sering merasa bosan membaca materi panjang persiapan UTBK Pemahaman Bacaan dan Menulis. EjaMate menghadirkan alur belajar berbasis modul bertingkat (30 Bab) dengan sistem bintang dan progres tersimpan.</p>
          </div>

          <div class="cs-section-box">
            <h3><i class="fa-solid fa-shield-halved text-gradient"></i> Arsitektur Mobile & Keamanan</h3>
            <p>Aplikasi dibangun menggunakan Flutter & Dart. Komunikasi data materi dan kuis dilakukan melalui Custom REST API. Kata sandi pengguna diamankan dengan mekanisme enkripsi Bcrypt pada backend.</p>
          </div>

          <div class="cs-section-box">
            <h3><i class="fa-solid fa-lock text-gradient"></i> Paywall & Fitur Premium</h3>
            <p>Mengimplementasikan proteksi modul di mana bab dasar dapat diakses secara gratis, sementara bab kuis kilat tingkat lanjut membutuhkan akses status akun Premium.</p>
          </div>
        </div>

        <div class="cs-right">
          <div class="cs-section-box">
            <h3><i class="fa-solid fa-code text-gradient"></i> Tech Stack</h3>
            <div class="tech-stack" style="margin-top:0.75rem;">
              <span class="tech-tag">Flutter</span>
              <span class="tech-tag">Dart</span>
              <span class="tech-tag">Custom REST API</span>
              <span class="tech-tag">Bcrypt Security</span>
            </div>
          </div>

          <div class="cs-section-box">
            <h3><i class="fa-brands fa-github text-gradient"></i> Source Code</h3>
            <a href="https://github.com/alfagebra/EjaMate" target="_blank" rel="noopener" class="btn btn-outline btn-sm" style="margin-top:0.5rem;">
              Lihat di GitHub alfagebra/EjaMate ➔
            </a>
          </div>
        </div>
      </div>
    `,

    'cs-bi': `
      <div class="cs-header">
        <span class="project-context-badge" style="margin-bottom:1rem;"><i class="fa-solid fa-chart-pie"></i> Case Study & Analytics</span>
        <h1 class="cs-title">Mining Operations & Business Intelligence Analytics Dashboard</h1>
        <p style="color:var(--text-muted); font-size:1.1rem;">Rancangan pemantauan metrik kinerja operasional pertambangan secara visual.</p>
      </div>

      <div class="cs-grid">
        <div class="cs-left">
          <div class="cs-section-box">
            <h3><i class="fa-solid fa-eye text-gradient"></i> Visualisasi Data Operasional</h3>
            <p>Mengubah data angka log produksi pertambangan menjadi chart intuitif untuk mempermudah identifikasi kemacetan alur kerja dan penurunan efisiensi peralatan (Overall Equipment Effectiveness / OEE).</p>
          </div>
        </div>

        <div class="cs-right">
          <div class="cs-section-box">
            <h3><i class="fa-solid fa-code text-gradient"></i> Skills Applied</h3>
            <div class="tech-stack" style="margin-top:0.75rem;">
              <span class="tech-tag">SQL Analytics</span>
              <span class="tech-tag">Business Intelligence</span>
              <span class="tech-tag">Data Visualization</span>
            </div>
          </div>
        </div>
      </div>
    `
  };

  openCsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-cs');
      if (caseStudyData[key]) {
        csContainer.innerHTML = caseStudyData[key];
        csOverlay.classList.add('active');
        csOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeCsOverlay() {
    if (csOverlay) {
      csOverlay.classList.remove('active');
      csOverlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = 'auto';
    }
  }

  if (csClose) {
    csClose.addEventListener('click', closeCsOverlay);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCsOverlay();
  });

  /* --- 8. Copy Email with Toast Alert --- */
  const copyBtn = document.getElementById('copy-email-btn');
  const emailVal = document.getElementById('email-value');
  const toast = document.getElementById('toast');

  if (copyBtn && emailVal) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailVal.textContent.trim()).then(() => {
        showToast('Email berhasil disalin ke clipboard!');
      }).catch(() => {
        showToast('Gagal menyalin email');
      });
    });
  }

  function showToast(msg) {
    if (!toast) return;
    const toastMessage = document.getElementById('toast-message');
    if (toastMessage) toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

  /* --- 9. Design Gallery Filter with Smooth Transition --- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryCards.forEach((card, index) => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          card.style.display = 'flex';
          // Staggered fade-in
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 80);
        } else {
          card.style.transition = 'opacity 0.25s ease';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  /* --- 10. Smooth Scroll for all anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

});
