/**
 * Portfolio Personal - Guillermo Correa Martinez
 * JavaScript principal para animaciones e interactividad
 */

// ===== CONFIGURACIÓN =====
const CONFIG = {
    particleCount: 50,
    animationDurations: {
        min: 3,
        max: 6
    },
    scrollThreshold: 0.1
};

// ===== UTILIDADES =====
const Utils = {
    /**
     * Genera un número aleatorio entre min y max
     */
    random: (min, max) => Math.random() * (max - min) + min,
    
    /**
     * Throttle function para optimizar eventos de scroll
     */
    throttle: (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    },

    /**
     * Verifica si un elemento está visible en el viewport
     */
    isElementVisible: (element) => {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return rect.top < windowHeight * (1 - CONFIG.scrollThreshold) && rect.bottom > 0;
    }
};

// ===== SISTEMA DE PARTÍCULAS =====
const ParticleSystem = {
    /**
     * Crea las partículas animadas de fondo
     */
    init: () => {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Limpiar partículas existentes
        particlesContainer.innerHTML = '';

        for (let i = 0; i < CONFIG.particleCount; i++) {
            const particle = ParticleSystem.createParticle();
            particlesContainer.appendChild(particle);
        }

        console.log(`✨ Sistema de partículas iniciado: ${CONFIG.particleCount} partículas`);
    },

    /**
     * Crea una partícula individual
     */
    createParticle: () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posicionamiento aleatorio
        particle.style.left = Utils.random(0, 100) + '%';
        particle.style.top = Utils.random(0, 100) + '%';
        
        // Timing de animación aleatorio
        particle.style.animationDelay = Utils.random(0, 6) + 's';
        particle.style.animationDuration = Utils.random(
            CONFIG.animationDurations.min,
            CONFIG.animationDurations.max
        ) + 's';
        
        return particle;
    }
};

// ===== NAVEGACIÓN Y SCROLL =====
const Navigation = {
    /**
     * Inicializa el scroll suave para enlaces de ancla
     */
    init: () => {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');
        
        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', Navigation.handleAnchorClick);
        });

        console.log(`🔗 Navegación iniciada: ${anchorLinks.length} enlaces de ancla`);
    },

    /**
     * Maneja el click en enlaces de ancla
     */
    handleAnchorClick: (e) => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
};

// ===== EFECTOS DE SCROLL =====
const ScrollEffects = {
    /**
     * Inicializa los efectos de scroll
     */
    init: () => {
        // Configurar observador de intersección para mejor performance
        ScrollEffects.setupIntersectionObserver();
        
        // Fallback para navegadores que no soporten Intersection Observer
        if (!window.IntersectionObserver) {
            window.addEventListener('scroll', Utils.throttle(ScrollEffects.handleScroll, 16));
        }

        console.log('📜 Efectos de scroll iniciados');
    },

    /**
     * Configura el Intersection Observer para mejor performance
     */
    setupIntersectionObserver: () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    ScrollEffects.animateElement(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observar todas las tarjetas de habilidades
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => observer.observe(card));
    },

    /**
     * Maneja el scroll manual (fallback)
     */
    handleScroll: () => {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            if (Utils.isElementVisible(card)) {
                ScrollEffects.animateElement(card);
            }
        });
    },

    /**
     * Anima un elemento cuando entra en vista
     */
    animateElement: (element) => {
        if (!element.classList.contains('animated')) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
            element.classList.add('animated');
        }
    }
};

// ===== INTERACTIVIDAD =====
const Interactions = {
    /**
     * Inicializa las interacciones avanzadas
     */
    init: () => {
        Interactions.setupSkillCards();
        Interactions.setupButtons();
        console.log('🎮 Interacciones iniciadas');
    },

    /**
     * Configura las interacciones de las tarjetas de habilidades
     */
    setupSkillCards: () => {
        const skillCards = document.querySelectorAll('.skill-card');
        
        skillCards.forEach(card => {
            // Efecto de inclinación al mover el mouse
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
            });

            // Restaurar posición original al salir
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    },

    /**
     * Configura las interacciones de los botones
     */
    setupButtons: () => {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            // Efecto ripple al hacer click
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
};

// ===== PERFORMANCE Y OPTIMIZACIÓN =====
const Performance = {
    /**
     * Inicializa optimizaciones de performance
     */
    init: () => {
        Performance.preloadCriticalAssets();
        Performance.setupLazyLoading();
        console.log('⚡ Optimizaciones de performance aplicadas');
    },

    /**
     * Precarga assets críticos
     */
    preloadCriticalAssets: () => {
        // Precargar fuentes si las hay
        const fonts = ['Segoe UI'];
        fonts.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'font';
            link.crossOrigin = 'anonymous';
            // No agregamos al DOM ya que son fuentes del sistema
        });
    },

    /**
     * Configura lazy loading para imágenes futuras
     */
    setupLazyLoading: () => {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            // Observar imágenes lazy cuando se agreguen
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
};

// ===== INICIALIZACIÓN PRINCIPAL =====
const App = {
    /**
     * Inicializa toda la aplicación
     */
    init: () => {
        console.log('🚀 Iniciando Portfolio Personal...');
        
        // Verificar que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', App.start);
        } else {
            App.start();
        }
    },

    /**
     * Inicia todos los módulos
     */
    start: () => {
        try {
            // Inicializar módulos en orden
            ParticleSystem.init();
            Navigation.init();
            ScrollEffects.init();
            Interactions.init();
            Performance.init();
            
            // Agregar estilos CSS dinámicos
            App.addDynamicStyles();
            
            console.log('✅ Portfolio inicializado correctamente');
            
        } catch (error) {
            console.error('❌ Error al inicializar el portfolio:', error);
        }
    },

    /**
     * Agrega estilos CSS dinámicos para animaciones
     */
    addDynamicStyles: () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            .skill-card {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .skill-card.animated {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
};

// ===== AUTO-INICIALIZACIÓN =====
App.init();// ===== PARTÍCULAS ANIMADAS =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posicionamiento aleatorio
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Delay de animación aleatorio
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// ===== SCROLL SUAVE PARA ENLACES =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== EFECTOS DE SCROLL EN TARJETAS =====
function initScrollEffects() {
    window.addEventListener('scroll', () => {
        const cards = document.querySelectorAll('.skill-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
}

// ===== INICIALIZACIÓN =====
function init() {
    // Crear partículas cuando la página carga
    createParticles();
    
    // Inicializar scroll suave
    initSmoothScroll();
    
    // Inicializar efectos de scroll
    initScrollEffects();
    
    console.log('Portfolio inicializado correctamente');
}

// ===== EJECUTAR AL CARGAR LA PÁGINA =====
window.addEventListener('load', init);
