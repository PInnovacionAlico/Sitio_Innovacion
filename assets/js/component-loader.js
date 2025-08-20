class ComponentLoader {
    constructor() {
        this.componentsPath = 'components/';
        this.loadedComponents = new Set();
        this.currentDepth = this._calculateDepth();
    }

    _calculateDepth() {
        // Manual override for special cases via meta tag
        const metaDepth = document.querySelector('meta[name="component-depth"]');
        if (metaDepth && !isNaN(parseInt(metaDepth.content))) {
            return parseInt(metaDepth.content);
        }

        // Only count directory segments, exclude the HTML file itself
        // Example: /Sitio_Web_Innovacion_2/generalidades-sgi.html => depth = 0
        // Example: /Sitio_Web_Innovacion_2/pages/other.html => depth = 1
        const path = window.location.pathname;
        const segments = path.split('/').filter(Boolean);
        if (segments.length === 0) return 0;
        // If last segment ends with .html, remove it
        const lastSegment = segments[segments.length - 1];
        const depth = lastSegment.endsWith('.html') ? segments.length - 2 : segments.length - 1;
        return Math.max(depth, 0);
    }

    _getCorrectPath(path) {
        if (this.currentDepth === 0) {
            return path;
        }
        return '../'.repeat(this.currentDepth) + path;
    }

    async loadComponent(name, target = 'body', method = 'beforeend') {
        if (this.loadedComponents.has(name)) {
            console.log('✅ Componente ya cargado:', name);
            return;
        }

        try {
            const componentPath = this._getCorrectPath(`${this.componentsPath}${name}.html`);
            console.log('🔄 Cargando:', componentPath);

            const response = await fetch(componentPath);
            if (!response.ok) throw new Error(`Error ${response.status}`);

            const html = await response.text();
            const targetElement = document.querySelector(target);

            if (!targetElement) throw new Error(`Target no encontrado: ${target}`);

            targetElement.insertAdjacentHTML(method, html);
            this.loadedComponents.add(name);

            console.log('✅ Componente cargado:', name);
            this._initComponent(name);

        } catch (error) {
            console.error('❌ Error cargando', name, ':', error);
            this._loadFallback(name, target);
        }
    }

    _initComponent(name) {
        switch (name) {
            case 'header':
                this._initHeader();
                break;
            case 'footer':
                this._initFooter();
                break;
        }
    }

    _initHeader() {
        const logoImg = document.querySelector('.logo-image');
        if (logoImg) {
            logoImg.src = this._getCorrectPath('assets/images/Ali_head.png');
        }

        const logoLink = document.querySelector('.logo');
        if (logoLink) {
            logoLink.href = this._getCorrectPath('index.html');
        }

        const navLinks = document.querySelectorAll('.nav-link, .dropdown-item, .mobile-dropdown-link');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !href.includes('../')) {
                link.setAttribute('href', this._getCorrectPath(href));
            }
        });
        
        // Inicializar dropdowns desktop
        this._initDesktopDropdowns();

        // Inicializar menú hamburguesa
        this._initMobileMenu();
        
        // Inicializar flip cards
        this._initFlipCards();

        console.log('✅ Header inicializado');
    }
    
    _initMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        if (menuToggle) {
            // Remover onclick del HTML y agregar event listener
            menuToggle.removeAttribute('onclick');
            menuToggle.addEventListener('click', () => {
                if (typeof toggleMenu === 'function') {
                    toggleMenu();
                } else {
                    console.warn('⚠️ Función toggleMenu no disponible, usando fallback');
                    this._toggleMenuFallback();
                }
            });
            console.log('✅ Menú hamburguesa inicializado');
        }
    }
    
    _toggleMenuFallback() {
        const mobileNavMenu = document.getElementById('mobileNavMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (mobileNavMenu && menuToggle) {
            const isActive = mobileNavMenu.classList.contains('active');
            
            if (isActive) {
                mobileNavMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                mobileNavMenu.classList.add('active');
                menuToggle.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    }
    
    _initFlipCards() {
        const flipCards = document.querySelectorAll('.flip-card');
        flipCards.forEach(card => {
            // Remover onclick del HTML y agregar event listener
            card.removeAttribute('onclick');
            card.addEventListener('click', () => {
                if (typeof flipCard === 'function') {
                    flipCard(card);
                } else {
                    console.warn('⚠️ Función flipCard no disponible, usando fallback');
                    this._flipCardFallback(card);
                }
            });
            
            // También agregar event listener de teclado
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (typeof flipCard === 'function') {
                        flipCard(card);
                    } else {
                        this._flipCardFallback(card);
                    }
                }
            });
        });
        console.log(`✅ ${flipCards.length} flip cards inicializadas`);
        
        // Inicializar dropdowns móviles
        this._initMobileDropdowns();
    }
    
    _initMobileDropdowns() {
        const mobileDropdowns = document.querySelectorAll('.mobile-nav-dropdown');
        console.log('🔍 Buscando dropdowns móviles...', mobileDropdowns.length);
        
        mobileDropdowns.forEach((dropdown, index) => {
            console.log(`📱 Dropdown ${index + 1}:`, dropdown);
            
            // Remover onclick del HTML y agregar event listener
            const hadOnclick = dropdown.hasAttribute('onclick');
            dropdown.removeAttribute('onclick');
            console.log(`🔄 onclick removido: ${hadOnclick ? 'Sí' : 'No'}`);
            
            dropdown.addEventListener('click', (event) => {
                console.log('🖱️ Dropdown clickeado:', dropdown, event);
                
                if (typeof toggleMobileDropdown === 'function') {
                    console.log('✅ Usando función global toggleMobileDropdown');
                    toggleMobileDropdown(dropdown);
                } else {
                    console.warn('⚠️ Función toggleMobileDropdown no disponible, usando fallback');
                    this._toggleMobileDropdownFallback(dropdown);
                }
            });
            
            console.log(`✅ Event listener agregado al dropdown ${index + 1}`);
        });
        
        console.log(`✅ ${mobileDropdowns.length} dropdowns móviles inicializados`);
    }
    
    _initDesktopDropdowns() {
        const desktopDropdowns = document.querySelectorAll('.nav-dropdown');
        desktopDropdowns.forEach(dropdown => {
            // Remover onmouseenter y onmouseleave del HTML
            dropdown.removeAttribute('onmouseenter');
            dropdown.removeAttribute('onmouseleave');
            
            // Agregar event listeners
            dropdown.addEventListener('mouseenter', () => {
                if (typeof showDropdown === 'function') {
                    showDropdown(dropdown);
                } else {
                    console.warn('⚠️ Función showDropdown no disponible, usando fallback');
                    this._showDropdownFallback(dropdown);
                }
            });
            
            dropdown.addEventListener('mouseleave', () => {
                if (typeof hideDropdown === 'function') {
                    hideDropdown(dropdown);
                } else {
                    console.warn('⚠️ Función hideDropdown no disponible, usando fallback');
                    this._hideDropdownFallback(dropdown);
                }
            });
        });
        console.log(`✅ ${desktopDropdowns.length} dropdowns desktop inicializados`);
    }
    
    _showDropdownFallback(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateX(-50%) translateY(0)';
        }
    }
    
    _hideDropdownFallback(dropdown) {
        const menu = dropdown.querySelector('.dropdown-menu');
        if (menu) {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateX(-50%) translateY(-15px)';
        }
    }
    
    _toggleMobileDropdownFallback(dropdown) {
        console.log('🔄 Ejecutando fallback para dropdown:', dropdown);
        
        if (!dropdown || !dropdown.classList) {
            console.error('❌ Dropdown inválido:', dropdown);
            return;
        }
        
        const isActive = dropdown.classList.contains('active');
        console.log(`📊 Estado actual del dropdown: ${isActive ? 'Activo' : 'Inactivo'}`);
        
        // Cerrar todos los otros dropdowns primero
        const otherDropdowns = document.querySelectorAll('.mobile-nav-dropdown');
        console.log(`🔒 Cerrando ${otherDropdowns.length - 1} otros dropdowns`);
        
        otherDropdowns.forEach(otherDropdown => {
            if (otherDropdown !== dropdown) {
                const wasActive = otherDropdown.classList.contains('active');
                otherDropdown.classList.remove('active');
                if (wasActive) {
                    console.log('🔒 Dropdown cerrado:', otherDropdown);
                }
            }
        });
        
        // Alternar el dropdown actual
        dropdown.classList.toggle('active');
        const newState = dropdown.classList.contains('active');
        console.log(`🔄 Dropdown alternado a: ${newState ? 'Activo' : 'Inactivo'}`);
        
        // Verificar que la clase se aplicó correctamente
        const hasActiveClass = dropdown.classList.contains('active');
        console.log(`✅ Clase 'active' presente: ${hasActiveClass}`);
        
        // Agregar efecto de vibración sutil en dispositivos móviles
        if (navigator.vibrate && !isActive) {
            navigator.vibrate(50);
            console.log('📳 Vibración aplicada');
        }
        
        console.log(`🔄 Dropdown móvil ${isActive ? 'cerrado' : 'abierto'} con fallback:`, dropdown);
    }
    
    _flipCardFallback(card) {
        if (!card || !card.classList) return;
        
        const isFlipped = card.classList.contains('flipped');
        card.classList.toggle('flipped');
        
        // Agregar efecto de vibración sutil en dispositivos móviles
        if (navigator.vibrate && !isFlipped) {
            navigator.vibrate(50);
        }
        
        console.log(`✅ Tarjeta ${isFlipped ? 'desvolteada' : 'volteada'} con fallback`);
    }

    _initFooter() {
        const footerImg = document.querySelector('.footer-logo-image');
        if (footerImg) {
            footerImg.src = this._getCorrectPath('assets/images/logo-blanco.png');
        }
        
        // Inicializar botón back-to-top
        this._initBackToTop();
        
        // Inicializar panel de accesibilidad
        this._initAccessibilityPanel();
    }
    
    _initAccessibilityPanel() {
        const accessibilityToggle = document.getElementById('accessibilityToggle');
        if (accessibilityToggle) {
            // Remover onclick del HTML y agregar event listener
            accessibilityToggle.removeAttribute('onclick');
            accessibilityToggle.addEventListener('click', () => {
                if (typeof toggleAccessibilityPanel === 'function') {
                    toggleAccessibilityPanel();
                } else {
                    console.warn('⚠️ Función toggleAccessibilityPanel no disponible, usando fallback');
                    this._toggleAccessibilityPanelFallback();
                }
            });
            console.log('✅ Panel de accesibilidad inicializado');
        }
    }
    
    _toggleAccessibilityPanelFallback() {
        const panel = document.getElementById('accessibilityPanel');
        const overlay = document.getElementById('accessibilityOverlay');
        const toggle = document.getElementById('accessibilityToggle');
        
        if (panel && overlay && toggle) {
            const isOpen = panel.classList.contains('show');
            
            if (isOpen) {
                panel.classList.remove('show');
                overlay.classList.remove('show');
                toggle.classList.remove('panel-open');
                document.body.style.overflow = '';
            } else {
                panel.classList.add('show');
                overlay.classList.add('show');
                toggle.classList.add('panel-open');
                document.body.style.overflow = 'hidden';
            }
        }
        
        // Inicializar botones internos del panel
        this._initAccessibilityButtons();
    }
    
    _initAccessibilityButtons() {
        // Botón de cerrar
        const closeBtn = document.querySelector('.accessibility-close');
        if (closeBtn) {
            closeBtn.removeAttribute('onclick');
            closeBtn.addEventListener('click', () => {
                this._toggleAccessibilityPanelFallback();
            });
        }
        
        // Botones de tamaño de fuente
        const fontButtons = document.querySelectorAll('.font-size-controls button');
        fontButtons.forEach(btn => {
            btn.removeAttribute('onclick');
            btn.addEventListener('click', () => {
                const action = btn.textContent.includes('A-') ? 'decrease' : 
                              btn.textContent.includes('A+') ? 'increase' : 'reset';
                
                if (typeof adjustFontSize === 'function') {
                    adjustFontSize(action);
                } else {
                    console.warn('⚠️ Función adjustFontSize no disponible');
                }
            });
        });
        
        // Toggles de accesibilidad
        const toggles = document.querySelectorAll('.accessibility-toggle-item input[type="checkbox"]');
        toggles.forEach(toggle => {
            toggle.removeAttribute('onchange');
            toggle.addEventListener('change', () => {
                if (toggle.id === 'darkMode') {
                    if (typeof toggleDarkMode === 'function') {
                        toggleDarkMode();
                    }
                }
            });
        });
        
        // Botones de acción
        const actionButtons = document.querySelectorAll('.accessibility-buttons button');
        actionButtons.forEach(btn => {
            btn.removeAttribute('onclick');
            btn.addEventListener('click', () => {
                if (btn.id === 'ttsButton') {
                    if (typeof toggleTextToSpeech === 'function') {
                        toggleTextToSpeech();
                    }
                }
            });
        });
        
        // Botón de reset
        const resetBtn = document.querySelector('.reset-button');
        if (resetBtn) {
            resetBtn.removeAttribute('onclick');
            resetBtn.addEventListener('click', () => {
                if (typeof resetAllSettings === 'function') {
                    resetAllSettings();
                }
            });
        }
    }
    
    _initBackToTop() {
        const backToTopBtn = document.getElementById('backToTop');
        if (backToTopBtn) {
            // Remover onclick del HTML y agregar event listener
            backToTopBtn.removeAttribute('onclick');
            backToTopBtn.addEventListener('click', () => {
                if (typeof scrollToTop === 'function') {
                    scrollToTop();
                } else {
                    console.warn('⚠️ Función scrollToTop no disponible, usando fallback');
                    this._scrollToTopFallback();
                }
            });
            
            // Mostrar/ocultar botón según scroll
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    backToTopBtn.style.display = 'flex';
                } else {
                    backToTopBtn.style.display = 'none';
                }
            });
            
            // Verificar si ya hay scroll al cargar la página
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            }
            
            console.log('✅ Botón back-to-top inicializado');
        }
        
        console.log('✅ Footer inicializado');
    }
    
    _scrollToTopFallback() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    _loadFallback(name, target) {
        console.warn('⚠️ Usando fallback para:', name);

        const fallbacks = {
            header: '<header class="header"><div style="color:white;padding:20px;text-align:center;">🏢 ALICO - Navegación no disponible</div></header>',
            footer: '<footer id="footer"><div style="text-align:center;padding:20px;">alico</div></footer>',
            accessibility: '<div style="position:fixed;top:20px;right:20px;background:#71B338;color:white;padding:10px;border-radius:50%;">♿</div>',
            'back-to-top': '<button class="back-to-top" onclick="window.scrollTo({top:0,behavior:\'smooth\'})" style="position:fixed;bottom:20px;right:20px;background:#DB9500;color:white;border:none;border-radius:50%;width:50px;height:50px;">↑</button>'
        };
        if (fallbacks[name]) {
            document.querySelector(target).insertAdjacentHTML('beforeend', fallbacks[name]);
        }
    }

    async loadAll() {
        const components = [
            { name: 'header', target: 'body', method: 'afterbegin' },
            { name: 'accessibility', target: 'body', method: 'beforeend' },
            { name: 'back-to-top', target: 'body', method: 'beforeend' },
            { name: 'footer', target: 'body', method: 'beforeend' }
        ];

        for (const comp of components) {
            await this.loadComponent(comp.name, comp.target, comp.method);
        }

        console.log('🎉 Todos los componentes procesados');
        window.dispatchEvent(new CustomEvent('components-loaded'));
    }
}

// Inicialización
window.componentLoader = new ComponentLoader();

document.addEventListener('DOMContentLoaded', async function() {
    try {
        console.log('🚀 Iniciando carga de componentes...');
        await window.componentLoader.loadAll();
        document.body.classList.add('components-loaded');
        console.log('✅ Sistema inicializado');
    } catch (error) {
        console.error('❌ Error:', error);
    }
});
