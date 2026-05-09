// ==================== LOADER ====================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);
    initAnimations();
    initNavbar();
    initTypedEffect();
    initVideoControls();
    initAudioPlayer();
    initLightbox();
    initFormSubmit();
    initSmoothScroll();
});

// ==================== NAVBAR SCROLL & MENU ====================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// ==================== TYPED ANIMATION ====================
function initTypedEffect() {
    const texts = [
        "Étudiant en Licence 2 ICT4D | Développeur Web",
        "Créateur Digital & UI/UX Designer",
        "Innovation & Tech For Development"
    ];
    let index = 0, charIndex = 0, isDeleting = false;
    const typedElement = document.getElementById('typedTitle');
    if (!typedElement) return;
    
    function typeEffect() {
        const currentText = texts[index];
        if (isDeleting) {
            typedElement.innerText = currentText.substring(0, charIndex--);
        } else {
            typedElement.innerText = currentText.substring(0, charIndex++);
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, 2000);
            return;
        }
        
        if (isDeleting && charIndex === 0) {
            isDeleting = false;
            index = (index + 1) % texts.length;
            setTimeout(typeEffect, 300);
            return;
        }
        
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    typeEffect();
}

// ==================== SKILLS BARS ANIMATION ====================
function initAnimations() {
    const skillBars = document.querySelectorAll('.skill-bar-fill');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.3 });
    
    skillBars.forEach(bar => observer.observe(bar));
    
    // Fade animations
    const fadeElements = document.querySelectorAll('.glass-card, .project-card, .bio-card');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeObserver.observe(el);
    });
}

// ==================== VIDEO CUSTOM CONTROLS ====================
function initVideoControls() {
    const video = document.getElementById('myVideo');
    if (!video) return;
    
    const playPauseBtn = document.querySelector('.play-pause');
    const progressFill = document.querySelector('.progress-fill');
    const progressBar = document.querySelector('.video-progress');
    const timeDisplay = document.querySelector('.video-time');
    const volumeBtn = document.querySelector('.volume');
    
    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });
        
        video.addEventListener('timeupdate', () => {
            const percent = (video.currentTime / video.duration) * 100;
            if (progressFill) progressFill.style.width = percent + '%';
            if (timeDisplay && video.duration) {
                const currentMin = Math.floor(video.currentTime / 60);
                const currentSec = Math.floor(video.currentTime % 60);
                const totalMin = Math.floor(video.duration / 60);
                const totalSec = Math.floor(video.duration % 60);
                timeDisplay.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${totalMin}:${totalSec.toString().padStart(2, '0')}`;
            }
        });
        
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
            });
        }
        
        video.addEventListener('ended', () => {
            if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
        
        if (volumeBtn) {
            volumeBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                volumeBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
            });
        }
    }
}

// ==================== AUDIO PLAYER ====================
function initAudioPlayer() {
    const audio = document.getElementById('myAudio');
    const playBtn = document.getElementById('playPauseAudio');
    const durationSpan = document.querySelector('.audio-duration');
    
    if (!audio || !playBtn) return;
    
    const icon = playBtn.querySelector('i');
    
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            icon.className = 'fas fa-pause';
        } else {
            audio.pause();
            icon.className = 'fas fa-play';
        }
    });
    
    audio.addEventListener('ended', () => {
        icon.className = 'fas fa-play';
    });
    
    audio.addEventListener('loadedmetadata', () => {
        if (durationSpan && audio.duration) {
            const minutes = Math.floor(audio.duration / 60);
            const seconds = Math.floor(audio.duration % 60);
            durationSpan.textContent = `00:00 / ${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    });
    
    audio.addEventListener('timeupdate', () => {
        if (durationSpan && audio.duration) {
            const currentMin = Math.floor(audio.currentTime / 60);
            const currentSec = Math.floor(audio.currentTime % 60);
            const totalMin = Math.floor(audio.duration / 60);
            const totalSec = Math.floor(audio.duration % 60);
            durationSpan.textContent = `${currentMin}:${currentSec.toString().padStart(2, '0')} / ${totalMin}:${totalSec.toString().padStart(2, '0')}`;
        }
    });
    
    // Visualizer simple
    const canvas = document.getElementById('visualizer');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        function drawVisualizer() {
            if (!audio.paused) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                const barCount = 30;
                const barWidth = canvas.width / barCount;
                for (let i = 0; i < barCount; i++) {
                    const height = Math.random() * canvas.height * 0.6 + 5;
                    ctx.fillStyle = `rgba(212, 175, 55, ${0.5 + Math.random() * 0.5})`;
                    ctx.fillRect(i * barWidth, canvas.height - height, barWidth - 2, height);
                }
            }
            requestAnimationFrame(drawVisualizer);
        }
        drawVisualizer();
    }
}

// ==================== LIGHTBOX GALERIE ====================
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.querySelector('.close-lightbox');
    
    if (!lightbox) return;
    
    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

// ==================== FORMULAIRE CONTACT ====================
function initFormSubmit() {
    const contactForm = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (feedback) {
                feedback.innerHTML = '<i class="fas fa-check-circle"></i> Message envoyé ! Je vous répondrai rapidement.';
                feedback.style.color = '#d4af37';
                setTimeout(() => {
                    feedback.innerHTML = '';
                }, 3000);
            }
            contactForm.reset();
        });
    }
    
    const downloadBtn = document.getElementById('downloadCVBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('📄 CV de Kemtsa Prince Manoel prêt à être téléchargé (version PDF premium).');
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.includes('#')) {
                const targetId = href.split('#')[1];
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// ==================== ACTIVE NAV LINK ON SCROLL ====================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
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