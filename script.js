// Funcionalidades principales de la página web
class IAPerformanceApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupScrollAnimations();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupIntersectionObserver();
        this.setupHeaderScroll();
        this.setupLoadingAnimations();
    }

    setupEventListeners() {
        // Event listeners principales
        document.addEventListener('DOMContentLoaded', () => {
            this.showLoadedContent();
        });

        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, 16));

        window.addEventListener('resize', debounce(() => {
            this.handleResize();
        }, 250));
    }

    setupMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');

        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Cerrar menú al hacer click en un enlace
            navMenu.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Cerrar menú al hacer click fuera
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            });
        }
    }

    setupSmoothScrolling() {
        // Smooth scrolling para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Actualizar URL sin causar scroll
                    history.pushState(null, null, targetId);
                }
            });
        });
    }

    setupIntersectionObserver() {
        // Observer para animaciones on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Animar elementos hijos con delay
                    const children = entry.target.querySelectorAll('.animate-child');
                    children.forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate-in');
                        }, index * 100);
                    });
                }
            });
        }, observerOptions);

        // Observar elementos principales
        const elementsToObserve = document.querySelectorAll(
            '.model-card, .recommendation-card, .limitation-category, ' +
            '.chart-item, .info-card, .cost-item, .speed-item, ' +
            '.final-recommendation, .section-header'
        );

        elementsToObserve.forEach(el => {
            observer.observe(el);
        });
    }

    setupHeaderScroll() {
        const header = document.querySelector('.header');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    setupScrollAnimations() {
        // Agregar clases CSS para animaciones
        const style = document.createElement('style');
        style.textContent = `
            .animate-in {
                animation: slideInUp 0.6s ease-out forwards;
            }

            .animate-child {
                opacity: 0;
                transform: translateY(20px);
                transition: all 0.3s ease-out;
            }

            .animate-child.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .header.scrolled {
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            @keyframes slideInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            .fade-in {
                animation: fadeIn 0.8s ease-out forwards;
            }

            body.menu-open {
                overflow: hidden;
            }

            /* Mejoras visuales adicionales */
            .model-card, .recommendation-card, .limitation-category {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }

            .model-card.animate-in, 
            .recommendation-card.animate-in, 
            .limitation-category.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            /* Hover effects mejorados */
            .nav-link {
                position: relative;
                overflow: hidden;
            }

            .nav-link::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(102, 126, 234, 0.1), transparent);
                transition: left 0.5s ease;
            }

            .nav-link:hover::before {
                left: 100%;
            }

            /* Loading skeleton */
            .loading-skeleton {
                background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
                background-size: 200% 100%;
                animation: loading 1.5s infinite;
            }

            @keyframes loading {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `;
        document.head.appendChild(style);
    }

    setupLoadingAnimations() {
        // Animar la carga de imágenes
        const images = document.querySelectorAll('.chart-image');
        
        images.forEach(img => {
            if (img.complete) {
                img.classList.add('fade-in');
            } else {
                img.addEventListener('load', () => {
                    img.classList.add('fade-in');
                });
            }
        });
    }

    handleScroll() {
        this.updateActiveNavLink();
        this.updateScrollProgress();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const headerHeight = document.querySelector('.header').offsetHeight;
        
        let currentSectionId = '';
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= headerHeight + 50 && rect.bottom > headerHeight + 50) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    updateScrollProgress() {
        const scrolled = window.pageYOffset;
        const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrolled / maxHeight) * 100;
        
        // Actualizar barra de progreso si existe
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    }

    handleResize() {
        // Recalcular animaciones si es necesario
        this.updateFloatingCards();
    }

    updateFloatingCards() {
        const cards = document.querySelectorAll('.card-float');
        if (window.innerWidth <= 1024) {
            cards.forEach(card => card.style.display = 'none');
        } else {
            cards.forEach(card => card.style.display = 'flex');
        }
    }

    showLoadedContent() {
        document.body.classList.add('loaded');
        
        // Animar hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            setTimeout(() => {
                heroContent.classList.add('fade-in');
            }, 100);
        }
    }

    // Métodos utilitarios para interacciones avanzadas
    showTooltip(element, content) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerHTML = content;
        document.body.appendChild(tooltip);
        
        const rect = element.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
        
        setTimeout(() => tooltip.remove(), 3000);
    }

    addInteractiveElements() {
        // Agregar tooltips a elementos con información adicional
        const modelCards = document.querySelectorAll('.model-card');
        modelCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(-5px) scale(1)';
            });
        });

        // Click tracking para analytics (simulado)
        this.setupAnalytics();
    }

    setupAnalytics() {
        const trackableElements = document.querySelectorAll(
            '.btn, .nav-link, .model-card, .recommendation-card'
        );
        
        trackableElements.forEach(element => {
            element.addEventListener('click', (e) => {
                const eventData = {
                    element: element.tagName.toLowerCase(),
                    class: element.className,
                    text: element.textContent.trim().substring(0, 50),
                    timestamp: new Date().toISOString()
                };
                
                console.log('Analytics event:', eventData);
                // Aquí se enviarían los datos a un servicio de analytics
            });
        });
    }

    // Funciones de accesibilidad
    setupAccessibility() {
        // Soporte para navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Cerrar menú móvil
                const hamburger = document.getElementById('hamburger');
                const navMenu = document.getElementById('nav-menu');
                if (hamburger && navMenu) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                }
            }
        });

        // Focus visible para navegación por teclado
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('using-keyboard');
            }
        });

        document.addEventListener('mousedown', () => {
            document.body.classList.remove('using-keyboard');
        });
    }
}

// Funciones utilitarias
function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}

function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Funciones adicionales para mejorar la experiencia
class PerformanceMetrics {
    constructor() {
        this.metrics = {
            loadTime: 0,
            scrollDepth: 0,
            timeOnPage: Date.now()
        };
        this.trackPerformance();
    }

    trackPerformance() {
        // Track page load time
        window.addEventListener('load', () => {
            this.metrics.loadTime = performance.now();
            console.log(`Página cargada en: ${this.metrics.loadTime.toFixed(2)}ms`);
        });

        // Track scroll depth
        window.addEventListener('scroll', throttle(() => {
            const scrollPercent = Math.round(
                (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
            );
            this.metrics.scrollDepth = Math.max(this.metrics.scrollDepth, scrollPercent);
        }, 100));

        // Track time on page before leaving
        window.addEventListener('beforeunload', () => {
            const timeOnPage = Date.now() - this.metrics.timeOnPage;
            console.log(`Tiempo en la página: ${(timeOnPage / 1000).toFixed(2)} segundos`);
            console.log(`Profundidad de scroll: ${this.metrics.scrollDepth}%`);
        });
    }
}

// Funcionalidades experimentales
class ExperimentalFeatures {
    constructor() {
        this.setupDarkMode();
        this.setupPreferences();
    }

    setupDarkMode() {
        // Detectar preferencia del sistema
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (prefersDarkMode) {
            document.body.classList.add('dark-mode');
        }

        // Toggle manual (si se agrega un botón en el futuro)
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });
        }
    }

    setupPreferences() {
        // Cargar preferencias guardadas
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
        }

        // Reducir animaciones si el usuario lo prefiere
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            document.body.classList.add('reduce-motion');
        }
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar aplicación principal
    const app = new IAPerformanceApp();
    
    // Inicializar métricas de rendimiento
    const metrics = new PerformanceMetrics();
    
    // Inicializar funcionalidades experimentales
    const experimental = new ExperimentalFeatures();
    
    // Setup de características adicionales
    app.setupAccessibility();
    app.addInteractiveElements();
    
    console.log('🚀 IA Performance App inicializada correctamente');
    console.log('📊 Sistema de métricas activo');
    console.log('⚡ Funcionalidades experimentales cargadas');
});

// Exponer funciones globales si es necesario
window.IAPerformanceApp = IAPerformanceApp;
window.PerformanceMetrics = PerformanceMetrics;