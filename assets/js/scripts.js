/* ==================================================
   ALICO - SCRIPTS.JS MEJORADO
   Archivo JavaScript con mejoras según guía de marca
   ================================================== */

/* ==================================================
   FUNCIONES DE NAVEGACIÓN
   ================================================== */

/**
 * Alterna la visibilidad del menú móvil con animaciones mejoradas
 */
function toggleMenu() {
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileNavMenu && menuToggle) {
        const isActive = mobileNavMenu.classList.contains('active');
        
        if (isActive) {
            // Cerrar menú
            mobileNavMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = ''; // Restaurar scroll del body
            
            // Animar elementos del menú
            const menuItems = document.querySelectorAll('.mobile-nav-item');
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = `${index * 0.05}s`;
                item.style.transform = 'translateY(-20px)';
                item.style.opacity = '0';
            });
        } else {
            // Abrir menú
            mobileNavMenu.classList.add('active');
            menuToggle.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevenir scroll del body
            
            // Animar elementos del menú con delay
            setTimeout(() => {
                const menuItems = document.querySelectorAll('.mobile-nav-item');
                menuItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                    item.style.transform = 'translateY(0)';
                    item.style.opacity = '1';
                });
            }, 100);
        }
    }
}

/**
 * Funcionalidad mejorada para voltear las tarjetas del SGI
 * @param {HTMLElement} card - El elemento de la tarjeta a voltear
 */
function flipCard(card) {
    console.log('🔄 Función flipCard llamada para:', card);
    
    // Verificar que el parámetro sea válido
    if (!card || !card.classList) {
        console.error('❌ Error: Elemento de tarjeta inválido');
        return;
    }
    
    // Verificar si ya está volteada
    const isFlipped = card.classList.contains('flipped');
    console.log(`📋 Estado actual de la tarjeta: ${isFlipped ? 'volteada' : 'no volteada'}`);
    
    // Limpiar cualquier transformación previa que pueda interferir
    card.style.transform = '';
    console.log('🧹 Transformación previa limpiada');
    
    // Voltear la tarjeta
    card.classList.toggle('flipped');
    const newState = card.classList.contains('flipped');
    console.log(`🔄 Tarjeta ${newState ? 'volteada' : 'desvolteada'}`);
    
    // Verificar que la clase se aplicó correctamente
    console.log('📋 Clases actuales de la tarjeta:', card.className);
    
    // Verificar estilos CSS aplicados
    const computedStyle = getComputedStyle(card);
    console.log('🎨 Estilos CSS aplicados:', {
        transform: computedStyle.transform,
        transition: computedStyle.transition
    });
    
    // Verificar el elemento interno
    const inner = card.querySelector('.flip-card-inner');
    if (inner) {
        const innerStyle = getComputedStyle(inner);
        console.log('🔄 Estilos del elemento interno:', {
            transform: innerStyle.transform,
            transition: innerStyle.transition
        });
    }
    
    // Agregar efecto de vibración sutil en dispositivos móviles
    if (navigator.vibrate && !isFlipped) {
        navigator.vibrate(50);
    }
    
    // Animar tarjetas adyacentes sutilmente
    const allCards = document.querySelectorAll('.flip-card');
    const currentIndex = Array.from(allCards).indexOf(card);
    
    allCards.forEach((otherCard, index) => {
        if (index !== currentIndex && Math.abs(index - currentIndex) <= 1) {
            // Usar transform3d para evitar conflictos con la rotación
            otherCard.style.transform = 'scale3d(0.98, 0.98, 1)';
            setTimeout(() => {
                otherCard.style.transform = '';
            }, 200);
        }
    });
    
    console.log(`✅ Tarjeta ${isFlipped ? 'desvolteada' : 'volteada'} exitosamente`);
}

// ==================================================
// EXPORTACIÓN GLOBAL INMEDIATA - DESPUÉS DE DEFINIR FUNCIONES
// ==================================================

// Exportar funciones inmediatamente después de definirlas
window.flipCard = flipCard;
window.scrollToTop = scrollToTop;
window.toggleMenu = toggleMenu;
window.showDropdown = showDropdown;
window.hideDropdown = hideDropdown;
window.toggleMobileDropdown = toggleMobileDropdown;
window.closeAllDropdowns = closeAllDropdowns;

console.log('✅ Funciones exportadas globalmente INMEDIATAMENTE:', {
    flipCard: typeof flipCard,
    scrollToTop: typeof scrollToTop,
    toggleMenu: typeof toggleMenu,
    showDropdown: typeof showDropdown,
    hideDropdown: typeof hideDropdown,
    toggleMobileDropdown: typeof toggleMobileDropdown,
    closeAllDropdowns: typeof closeAllDropdowns
});

/**
 * Desplaza la página hacia arriba con animación suave mejorada
 */
function scrollToTop() {
    const scrollDuration = 800;
    const scrollStep = -window.scrollY / (scrollDuration / 15);
    
    function scrollAnimation() {
        if (window.scrollY !== 0) {
            window.scrollBy(0, scrollStep);
            requestAnimationFrame(scrollAnimation);
        }
    }
    
    requestAnimationFrame(scrollAnimation);
}

/* ==================================================
   FUNCIONES DE UTILIDAD
   ================================================== */

/**
 * Inicializa las animaciones de scroll reveal
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar elementos que deben animarse al hacer scroll
    const animatedElements = document.querySelectorAll('.resource-card, .methodology-card, .video-card');
    
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Las tarjetas flip se manejan por separado para evitar conflictos de transformación
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

/**
 * Maneja los efectos de parallax suave
 */
function handleParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.banner-content');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

/**
 * Inicializa los tooltips para los iconos
 */
function initTooltips() {
    const iconElements = document.querySelectorAll('.material-symbols-rounded');
    
    iconElements.forEach(icon => {
        const parentLink = icon.closest('.nav-link, .mobile-nav-item');
        if (parentLink) {
            const text = parentLink.querySelector('span:not(.material-symbols-rounded)')?.textContent;
            if (text) {
                icon.setAttribute('title', text);
            }
        }
    });
}

/**
 * Maneja las animaciones de hover mejoradas
 */
function initHoverEffects() {
    // Efecto de ondas en los botones
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .header-banner-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255,255,255,0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.pointerEvents = 'none';
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

/**
 * Optimiza las imágenes lazy loading
 */
function initLazyLoading() {
    const images = document.querySelectorAll('.resource-card-image[style*="background-image"], .footer-logo-image, .logo-image');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Maneja el fallback de imágenes cuando no se pueden cargar
 */
function initImageFallbacks() {
    // Manejar logo del header
    const logoImage = document.querySelector('.logo-image');
    const logoFallback = document.querySelector('.logo-text-fallback');
    
    if (logoImage && logoFallback) {
        logoImage.addEventListener('error', function() {
            console.warn('Error al cargar imagen del logo header:', this.src);
            this.style.display = 'none';
            logoFallback.style.display = 'flex';
        });
        
        logoImage.addEventListener('load', function() {
            console.log('Imagen del logo header cargada exitosamente');
            logoFallback.style.display = 'none';
        });
    }
    
    // Manejar logo del footer
    const footerLogoImage = document.querySelector('.footer-logo-image');
    const footerLogoFallback = document.querySelector('.footer-logo-fallback');
    
    if (footerLogoImage && footerLogoFallback) {
        footerLogoImage.addEventListener('error', function() {
            console.warn('Error al cargar imagen del logo footer:', this.src);
            this.style.display = 'none';
            footerLogoFallback.style.display = 'block';
        });
        
        footerLogoImage.addEventListener('load', function() {
            console.log('Imagen del logo footer cargada exitosamente');
            this.style.opacity = '1';
            footerLogoFallback.style.display = 'none';
        });
        
        // Inicializar con opacidad 0 para efecto fade-in
        footerLogoImage.style.opacity = '0';
        footerLogoImage.style.transition = 'opacity 0.3s ease';
    }
}

/**
 * Precarga las imágenes importantes
 */
function preloadImages() {
    const imagesToPreload = [
        'assets/images/Ali_head.png',
        'assets/images/logo-blanco.png',
        'assets/images/cocrea.png',
        'assets/images/versatil.png'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onload = () => console.log(`Imagen precargada: ${src}`);
        img.onerror = () => console.warn(`Error al precargar imagen: ${src}`);
    });
}

/* ==================================================
   EVENT LISTENERS MEJORADOS
   ================================================== */

/**
 * Mostrar/ocultar botón de volver arriba con animación suave
 */
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }
    
    // Llamar a parallax solo si no se prefiere movimiento reducido
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        requestAnimationFrame(handleParallax);
    }
});

/**
 * Cerrar menú móvil cuando se hace clic fuera de él
 */
document.addEventListener('click', function(event) {
    const mobileNavMenu = document.getElementById('mobileNavMenu');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (mobileNavMenu && menuToggle) {
        if (!mobileNavMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            if (mobileNavMenu.classList.contains('active')) {
                toggleMenu();
            }
        }
    }
});

/**
 * Manejo de teclado para accesibilidad
 */
document.addEventListener('keydown', function(event) {
    // ESC para cerrar menú móvil
    if (event.key === 'Escape') {
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
            toggleMenu();
        }
    }
    
    // Enter y Espacio para flip cards
    if (event.key === 'Enter' || event.key === ' ') {
        if (event.target.classList.contains('flip-card')) {
            event.preventDefault();
            flipCard(event.target);
        }
    }
});

/**
 * Inicialización cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    // Prevenir comportamiento por defecto de enlaces con href="#"
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
    
    // Cerrar menú móvil al hacer clic en cualquier enlace del menú
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const mobileNavMenu = document.getElementById('mobileNavMenu');
            if (mobileNavMenu && mobileNavMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Inicializar funcionalidades
    initScrollReveal();
    initTooltips();
    initHoverEffects();
    initLazyLoading();
    initImageFallbacks();
    preloadImages();
    
    // Agregar clase loaded al body para activar animaciones CSS
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Optimización de rendimiento: usar passive listeners
    document.addEventListener('touchstart', function() {}, { passive: true });
    document.addEventListener('touchmove', function() {}, { passive: true });
    
    console.log('🎨 Alico - Sistema de imágenes inicializado');
    console.log('📱 Detección de dispositivo:', window.innerWidth < 768 ? 'Móvil' : window.innerWidth < 1024 ? 'Tablet' : 'Desktop');
});

/**
 * Optimización del resize
 */
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Reajustar elementos si es necesario
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        if (window.innerWidth > 1024 && mobileNavMenu.classList.contains('active')) {
            toggleMenu();
        }
        
        // Reajustar imágenes si es necesario
        const logoImage = document.querySelector('.logo-image');
        const footerLogoImage = document.querySelector('.footer-logo-image');
        
        if (logoImage && logoImage.complete) {
            console.log('Reajustando imagen del logo tras resize');
        }
        
        if (footerLogoImage && footerLogoImage.complete) {
            console.log('Reajustando imagen del footer tras resize');
        }
    }, 250);
});

/**
 * Manejo del tema de color preferido del usuario
 */
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Aquí podrías agregar lógica para tema oscuro si lo implementas
    console.log('Usuario prefiere tema oscuro');
}

/**
 * Service Worker para PWA (opcional)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('🔧 SW registrado'))
            .catch(error => console.log('❌ SW no registrado'));
    });
}

/**
 * Detección de soporte de WebP para optimización de imágenes
 */
function supportsWebP() {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

/**
 * Optimización de carga de imágenes según la conexión
 */
function getConnectionQuality() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
            return 'low';
        } else if (connection.effectiveType === '3g') {
            return 'medium';
        } else {
            return 'high';
        }
    }
    return 'high'; // Default para conexiones desconocidas
}

/**
 * Función para mostrar notificaciones del sistema
 */
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)' : 'linear-gradient(135deg, var(--verde-natura) 0%, var(--verde-natura-80) 100%)'};
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        font-family: 'Work Sans', sans-serif;
        font-weight: 600;
        font-size: 14px;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 300px;
        backdrop-filter: blur(10px);
    `;
    
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px;">
            <span class="material-symbols-rounded" style="font-size: 20px;">${type === 'error' ? 'error' : 'check_circle'}</span>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animar salida y remover
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, duration);
}

/* ==================================================
   ANIMACIONES CSS ADICIONALES VIA JAVASCRIPT
   ================================================== */

// Agregar estilos de animación para el ripple effect
const rippleStyles = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .loaded .intro-card {
        animation: fadeInUp 0.8s ease-out;
    }
    
    .loaded .model-card {
        animation: fadeInUp 0.8s ease-out 0.2s both;
    }
    
    .loaded .methodology-card:nth-child(1) {
        animation: fadeInUp 0.8s ease-out 0.4s both;
    }
    
    .loaded .methodology-card:nth-child(2) {
        animation: fadeInUp 0.8s ease-out 0.6s both;
    }
    
    /* Animaciones específicas para imágenes */
    .logo-image,
    .footer-logo-image {
        transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .logo-image:hover,
    .footer-logo-image:hover {
        transform: scale(1.05);
    }
    
    /* Efecto de carga para imágenes */
    .image-loading {
        opacity: 0;
        transform: scale(0.9);
    }
    
    .image-loaded {
        opacity: 1;
        transform: scale(1);
    }
`;

// Inyectar estilos si no existen
if (!document.getElementById('dynamic-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'dynamic-styles';
    styleSheet.textContent = rippleStyles;
    document.head.appendChild(styleSheet);
}

/* ==================================================
   FUNCIONES DE DEBUGGING (solo en desarrollo)
   ================================================== */
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    // Funciones de debugging solo en desarrollo
    window.debugAlico = {
        toggleMenu,
        flipCard,
        scrollToTop,
        showNotification,
        supportsWebP: supportsWebP(),
        connectionQuality: getConnectionQuality(),
        version: '2.1.0'
    };
    
    console.log('🚀 Alico Debug Mode Activated');
    console.log('📦 Available functions:', Object.keys(window.debugAlico));
    console.log('🖼️ WebP Support:', supportsWebP());
    console.log('🌐 Connection Quality:', getConnectionQuality());
}

/* ==================================================
   MANEJO DE ERRORES GLOBALES
   ================================================== */
window.addEventListener('error', function(event) {
    if (event.target.tagName === 'IMG') {
        console.warn('Error cargando imagen:', event.target.src);
        // Aquí podrías implementar lógica adicional para manejar errores de imágenes
    }
});

// Manejo de errores de promesas no capturadas
window.addEventListener('unhandledrejection', function(event) {
    console.error('Promise rechazada:', event.reason);
    // Prevenir que aparezca en la consola del navegador
    event.preventDefault();
});

/* ==================================================
   FUNCIONES PARA DROPDOWNS EN NAVEGACIÓN
   ================================================== */

/**
 * Muestra el dropdown al hacer hover (desktop)
 * @param {HTMLElement} dropdown - Elemento dropdown
 */
function showDropdown(dropdown) {
    if (window.innerWidth >= 1024) { // Solo en desktop
        dropdown.classList.add('active');
        
        // Accesibilidad: actualizar ARIA
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.setAttribute('aria-expanded', 'true');
        }
    }
}

/**
 * Oculta el dropdown al salir del hover (desktop)
 * @param {HTMLElement} dropdown - Elemento dropdown
 */
function hideDropdown(dropdown) {
    if (window.innerWidth >= 1024) { // Solo en desktop
        // Delay para permitir navegación con mouse
        setTimeout(() => {
            if (!dropdown.matches(':hover')) {
                dropdown.classList.remove('active');
                
                // Accesibilidad: actualizar ARIA
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.setAttribute('aria-expanded', 'false');
                }
            }
        }, 100);
    }
}

/**
 * Toggle para dropdowns móviles (acordeón)
 * @param {HTMLElement} dropdown - Elemento dropdown móvil
 */
function toggleMobileDropdown(dropdown) {
    const isActive = dropdown.classList.contains('active');
    
    // Cerrar otros dropdowns abiertos en móvil
    document.querySelectorAll('.mobile-nav-dropdown.active').forEach(item => {
        if (item !== dropdown) {
            item.classList.remove('active');
        }
    });
    
    // Toggle del dropdown actual
    dropdown.classList.toggle('active');
    
    // Accesibilidad: actualizar ARIA
    const content = dropdown.querySelector('.mobile-dropdown-content');
    if (content) {
        content.setAttribute('aria-expanded', dropdown.classList.contains('active'));
    }
    
    // Vibración en móvil
    if (navigator.vibrate && !isActive) {
        navigator.vibrate(30);
    }
    
    console.log(`Dropdown móvil ${dropdown.classList.contains('active') ? 'abierto' : 'cerrado'}`);
}

/**
 * Alterna dropdowns móviles
 * @param {HTMLElement} dropdown - Elemento dropdown a alternar
 */
function toggleMobileDropdown(dropdown) {
    console.log('🎯 Función global toggleMobileDropdown ejecutada con:', dropdown);
    
    if (!dropdown || !dropdown.classList) {
        console.error('❌ Dropdown inválido en función global:', dropdown);
        return;
    }
    
    const isActive = dropdown.classList.contains('active');
    console.log(`📊 Estado actual del dropdown (global): ${isActive ? 'Activo' : 'Inactivo'}`);
    
    // Cerrar todos los otros dropdowns primero
    const otherDropdowns = document.querySelectorAll('.mobile-nav-dropdown');
    console.log(`🔒 Cerrando ${otherDropdowns.length - 1} otros dropdowns (global)`);
    
    otherDropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
            const wasActive = otherDropdown.classList.contains('active');
            otherDropdown.classList.remove('active');
            if (wasActive) {
                console.log('🔒 Dropdown cerrado (global):', otherDropdown);
            }
        }
    });
    
    // Alternar el dropdown actual
    dropdown.classList.toggle('active');
    const newState = dropdown.classList.contains('active');
    console.log(`🔄 Dropdown alternado a (global): ${newState ? 'Activo' : 'Inactivo'}`);
    
    // Verificar que la clase se aplicó correctamente
    const hasActiveClass = dropdown.classList.contains('active');
    console.log(`✅ Clase 'active' presente (global): ${hasActiveClass}`);
    
    // Agregar efecto de vibración sutil en dispositivos móviles
    if (navigator.vibrate && !isActive) {
        navigator.vibrate(50);
        console.log('📳 Vibración aplicada (global)');
    }
    
    console.log(`🔄 Dropdown móvil ${isActive ? 'cerrado' : 'abierto'} (global):`, dropdown);
}

/**
 * Cierra todos los dropdowns
 */
function closeAllDropdowns() {
    // Dropdowns desktop
    document.querySelectorAll('.nav-dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.setAttribute('aria-expanded', 'false');
        }
    });
    
    // Dropdowns móvil
    document.querySelectorAll('.mobile-nav-dropdown.active').forEach(dropdown => {
        dropdown.classList.remove('active');
        const content = dropdown.querySelector('.mobile-dropdown-content');
        if (content) {
            content.setAttribute('aria-expanded', 'false');
        }
    });
}

/**
 * Navegación por teclado en dropdowns
 * @param {KeyboardEvent} event - Evento de teclado
 * @param {HTMLElement} dropdown - Elemento dropdown
 */
function handleDropdownKeyboard(event, dropdown) {
    const items = dropdown.querySelectorAll('.dropdown-item, .mobile-dropdown-link');
    const currentIndex = Array.from(items).findIndex(item => item === document.activeElement);
    
    switch (event.key) {
        case 'ArrowDown':
            event.preventDefault();
            const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
            items[nextIndex].focus();
            break;
            
        case 'ArrowUp':
            event.preventDefault();
            const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
            items[prevIndex].focus();
            break;
            
        case 'Escape':
            event.preventDefault();
            closeAllDropdowns();
            // Devolver focus al elemento padre
            const parentLink = dropdown.querySelector('.nav-link-dropdown');
            if (parentLink) parentLink.focus();
            break;
            
        case 'Enter':
        case ' ':
            if (event.target.classList.contains('mobile-nav-dropdown')) {
                event.preventDefault();
                toggleMobileDropdown(event.target);
            }
            break;
    }
}

/**
 * Actualiza la navegación activa incluyendo páginas padre/hija
 */
function updateActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    const currentFolder = currentPath.includes('/') ? currentPath.split('/').slice(-2, -1)[0] : '';
    
    // Limpiar navegación activa
    document.querySelectorAll('.nav-link, .mobile-nav-item, .dropdown-item, .mobile-dropdown-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Marcar navegación activa
    document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href.includes(currentPage) || (currentPage === 'index.html' && href === 'index.html'))) {
            link.classList.add('active');
        }
    });
    
    // Marcar navegación activa para páginas hijas
    if (currentFolder) {
        // Marcar el dropdown padre como activo
        document.querySelectorAll('.nav-link-dropdown').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentFolder)) {
                link.classList.add('active');
            }
        });
        
        // Marcar el item específico del dropdown
        document.querySelectorAll('.dropdown-item, .mobile-dropdown-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(currentPage)) {
                link.classList.add('active');
            }
        });
    }
    
    console.log(`✅ Navegación activa actualizada para: ${currentPage}`);
}

/**
 * Genera breadcrumbs dinámicamente
 */
function generateBreadcrumbs() {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part.length > 0);
    const currentPage = pathParts.pop() || 'index.html';
    
    // No mostrar breadcrumbs en páginas principales
    const mainPages = [
        'index.html', 
        'generalidades-sgi.html', 
        'inteligencias-artificiales.html', 
        'recursos-audiovisuales.html', 
        'iniciativas.html', 
        'blog.html'
    ];
    
    if (mainPages.includes(currentPage) && pathParts.length === 0) {
        return null;
    }
    
    const breadcrumbsContainer = document.createElement('nav');
    breadcrumbsContainer.className = 'breadcrumb';
    breadcrumbsContainer.setAttribute('aria-label', 'Navegación de ruta');
    
    const breadcrumbsList = document.createElement('div');
    breadcrumbsList.className = 'breadcrumb-nav';
    
    // Enlace a inicio
    breadcrumbsList.appendChild(createBreadcrumbItem('Inicio', 'index.html', false));
    breadcrumbsList.appendChild(createBreadcrumbSeparator());
    
    // Procesar carpetas padre
    if (pathParts.length > 0) {
        const parentFolder = pathParts[0];
        let parentTitle = '';
        let parentHref = '';
        
        switch (parentFolder) {
            case 'recursos-audiovisuales':
                parentTitle = 'Recursos audiovisuales';
                parentHref = 'recursos-audiovisuales.html';
                break;
            case 'iniciativas':
                parentTitle = 'Iniciativas';
                parentHref = 'iniciativas.html';
                break;
        }
        
        if (parentTitle) {
            breadcrumbsList.appendChild(createBreadcrumbItem(parentTitle, `../${parentHref}`, false));
            breadcrumbsList.appendChild(createBreadcrumbSeparator());
        }
    }
    
    // Página actual
    const currentTitle = getCurrentPageTitle(currentPage);
    breadcrumbsList.appendChild(createBreadcrumbItem(currentTitle, '', true));
    
    breadcrumbsContainer.appendChild(breadcrumbsList);
    return breadcrumbsContainer;
}

/**
 * Crea un item de breadcrumb
 */
function createBreadcrumbItem(title, href, isCurrent) {
    if (isCurrent) {
        const span = document.createElement('span');
        span.className = 'breadcrumb-current';
        span.textContent = title;
        span.setAttribute('aria-current', 'page');
        return span;
    } else {
        const link = document.createElement('a');
        link.className = 'breadcrumb-link';
        link.href = href;
        link.textContent = title;
        return link;
    }
}

/**
 * Crea un separador de breadcrumb
 */
function createBreadcrumbSeparator() {
    const separator = document.createElement('span');
    separator.className = 'breadcrumb-separator';
    separator.textContent = '›';
    separator.setAttribute('aria-hidden', 'true');
    return separator;
}

/**
 * Obtiene el título de la página actual
 */
function getCurrentPageTitle(pageName) {
    const titles = {
        'embajador-ali.html': 'Embajador Ali',
        'videos-fotos.html': 'Videos y fotos',
        'podcast.html': 'Podcast',
        'design-thinking.html': 'Design Thinking'
    };
    
    return titles[pageName] || pageName.replace('.html', '').replace('-', ' ');
}

/**
 * Inserta breadcrumbs en la página
 */
function insertBreadcrumbs() {
    const breadcrumbs = generateBreadcrumbs();
    if (breadcrumbs) {
        const main = document.querySelector('main');
        if (main) {
            main.insertBefore(breadcrumbs, main.firstChild);
            console.log('✅ Breadcrumbs insertados');
        }
    }
}

/* ==================================================
   EVENT LISTENERS PARA DROPDOWNS
   ================================================== */

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Configurar navegación activa
    updateActiveNavigation();
    
    // Insertar breadcrumbs si es necesario
    insertBreadcrumbs();
    
    // Event listeners para dropdowns desktop
    document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Eventos de mouse
        dropdown.addEventListener('mouseenter', () => showDropdown(dropdown));
        dropdown.addEventListener('mouseleave', () => hideDropdown(dropdown));
        
        // Eventos de teclado
        dropdown.addEventListener('keydown', (e) => handleDropdownKeyboard(e, dropdown));
        
        // Focus events para accesibilidad
        dropdown.addEventListener('focusin', () => {
            if (window.innerWidth >= 1024) {
                showDropdown(dropdown);
            }
        });
        
        dropdown.addEventListener('focusout', (e) => {
            if (window.innerWidth >= 1024) {
                // Verificar si el focus se movió fuera del dropdown
                setTimeout(() => {
                    if (!dropdown.contains(document.activeElement)) {
                        hideDropdown(dropdown);
                    }
                }, 100);
            }
        });
        
        // Configurar ARIA inicialmente
        if (menu) {
            menu.setAttribute('aria-expanded', 'false');
            menu.setAttribute('role', 'menu');
        }
    });
    
    // Event listeners para dropdowns móvil
    document.querySelectorAll('.mobile-nav-dropdown').forEach(dropdown => {
        const content = dropdown.querySelector('.mobile-dropdown-content');
        
        // Configurar ARIA inicialmente
        if (content) {
            content.setAttribute('aria-expanded', 'false');
        }
        
        // Event listener de teclado
        dropdown.addEventListener('keydown', (e) => handleDropdownKeyboard(e, dropdown));
    });
    
    console.log('🎛️ Sistema de dropdowns inicializado');
});

// Cerrar dropdowns al hacer clic fuera
document.addEventListener('click', function(event) {
    if (!event.target.closest('.nav-dropdown') && !event.target.closest('.mobile-nav-dropdown')) {
        closeAllDropdowns();
    }
});

// Cerrar dropdowns con Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAllDropdowns();
    }
});

// Manejar cambios de tamaño de ventana
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Cerrar dropdowns en cambio de tamaño
        closeAllDropdowns();
        
        // Reconfigurar según el tamaño de pantalla
        if (window.innerWidth < 1024) {
            // En móvil/tablet, asegurar que dropdowns desktop estén cerrados
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        } else {
            // En desktop, cerrar dropdowns móvil
            document.querySelectorAll('.mobile-nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }, 250);
});

// Función auxiliar para debugging
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.debugDropdowns = {
        showDropdown,
        hideDropdown,
        toggleMobileDropdown,
        closeAllDropdowns,
        updateActiveNavigation,
        generateBreadcrumbs,
        insertBreadcrumbs
    };
    
    console.log('🚀 Debug dropdowns disponible en window.debugDropdowns');
}

// Las funciones se exportarán al final del archivo
