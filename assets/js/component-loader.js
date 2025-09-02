// component-loader.js - Cargador de componentes con rutas dinámicas
(function() {
    'use strict';
    
    // Detectar ubicación de la página actual
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    const isInSubfolder = currentPath.split('/').length > 3;
    
    // Configurar rutas base
    let componentsPath = '';
    if (isInSubfolder) {
        componentsPath = '../../components/';
    } else if (isInPagesFolder) {
        componentsPath = '../components/';
    } else {
        componentsPath = 'components/';
    }
    
    console.log('🔧 Component Loader iniciado');
    console.log('📁 Ruta actual:', currentPath);
    console.log('📁 Ruta de componentes:', componentsPath);
    
    // Componentes a cargar
    const components = [
        { 
            name: 'header', 
            file: 'header.html', 
            target: 'afterbegin',
            position: 'body'
        },
        { 
            name: 'accessibility', 
            file: 'accessibility.html', 
            target: 'beforeend',
            position: 'body'
        },
        { 
            name: 'back-to-top', 
            file: 'back-to-top.html', 
            target: 'beforeend',
            position: 'body'
        },
        { 
            name: 'footer', 
            file: 'footer.html', 
            target: 'beforeend',
            position: 'main' // Solo se carga si existe main
        }
    ];
    
    let loadedComponents = 0;
    const totalComponents = components.length;
    
    // Función para cargar un componente
    async function loadComponent(component) {
        try {
            // SOLUCIÓN 1: Verificar si el elemento objetivo existe antes de cargar
            let targetElement;
            
            if (component.position === 'body') {
                targetElement = document.body;
            } else {
                targetElement = document.querySelector(component.position);
                
                // Si no existe el elemento objetivo (ej: no hay <main>), skip este componente
                if (!targetElement) {
                    console.warn(`⚠️ Elemento objetivo '${component.position}' no encontrado para ${component.name}, saltando...`);
                    loadedComponents++;
                    if (loadedComponents === totalComponents) {
                        onAllComponentsLoaded();
                    }
                    return;
                }
            }
            
            const response = await fetch(componentsPath + component.file);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            
            // Insertar el HTML
            targetElement.insertAdjacentHTML(component.target, html);
            
            console.log(`✅ Componente ${component.name} cargado exitosamente`);
            
            // SOLUCIÓN 2: Configurar eventos específicos inmediatamente después de cargar cada componente
            if (component.name === 'header') {
                setupHeaderEvents();
            }
            
            // Incrementar contador
            loadedComponents++;
            
            // Si todos los componentes están cargados
            if (loadedComponents === totalComponents) {
                onAllComponentsLoaded();
            }
            
        } catch (error) {
            console.error(`❌ Error cargando componente ${component.name}:`, error);
            
            // Crear fallback para componentes críticos
            if (component.name === 'header') {
                createHeaderFallback();
            }
            
            // Aún así incrementar el contador para no bloquear la carga
            loadedComponents++;
            if (loadedComponents === totalComponents) {
                onAllComponentsLoaded();
            }
        }
    }
    
    // SOLUCIÓN 3: Configurar eventos del header inmediatamente
    function setupHeaderEvents() {
        console.log('⚙️ Configurando eventos del header...');
        
        // Definir función toggleMenu globalmente
        window.toggleMenu = function() {
            const mobileMenu = document.getElementById('mobileNavMenu');
            const menuToggle = document.querySelector('.menu-toggle');
            
            if (mobileMenu && menuToggle) {
                const isOpen = mobileMenu.classList.contains('active');
                
                if (isOpen) {
                    mobileMenu.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                } else {
                    mobileMenu.classList.add('active');
                    menuToggle.classList.add('active');
                    document.body.classList.add('menu-open');
                }
                
                console.log(`📱 Menú móvil ${isOpen ? 'cerrado' : 'abierto'}`);
            } else {
                console.error('❌ Elementos del menú móvil no encontrados');
            }
        };
        
        // Definir otras funciones del header
        window.showDropdown = function(element) {
            const dropdown = element.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            }
        };
        
        window.hideDropdown = function(element) {
            const dropdown = element.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-10px)';
            }
        };
        
        window.toggleMobileDropdown = function(element) {
            const content = element.querySelector('.mobile-dropdown-content');
            const arrow = element.querySelector('.mobile-dropdown-arrow');
            
            if (content && arrow) {
                const isOpen = content.style.display === 'block';
                
                if (isOpen) {
                    content.style.display = 'none';
                    arrow.style.transform = 'rotate(0deg)';
                } else {
                    content.style.display = 'block';
                    arrow.style.transform = 'rotate(180deg)';
                }
            }
        };
        
        console.log('✅ Eventos del header configurados');
    }
    
    // Crear un header de respaldo si falla la carga
    function createHeaderFallback() {
        console.log('🔄 Creando header de respaldo...');
        
        const fallbackHeader = `
            <header class="header" style="background: var(--amarillo-oro); padding: var(--spacing-lg); text-align: center;">
                <a href="${isInPagesFolder ? '../' : ''}index.html" style="color: white; text-decoration: none; font-weight: bold; font-size: 1.2em;">
                    🏠 Alico - Volver al inicio
                </a>
            </header>
        `;
        
        document.body.insertAdjacentHTML('afterbegin', fallbackHeader);
        console.log('✅ Header de respaldo creado');
    }
    
    // Función que se ejecuta cuando todos los componentes están cargados
    function onAllComponentsLoaded() {
        console.log('🎉 Todos los componentes han sido cargados');
        
        // Marcar el body como componentes cargados
        document.body.classList.add('components-loaded');
        
        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('components-loaded', {
            detail: {
                componentsPath: componentsPath,
                isInPagesFolder: isInPagesFolder,
                isInSubfolder: isInSubfolder
            }
        }));
        
        // Configurar eventos de los componentes cargados
        setupComponentEvents();
    }
    
    // Configurar eventos después de cargar componentes
    function setupComponentEvents() {
        console.log('⚙️ Configurando eventos de componentes...');
        
        // Verificar si las funciones globales existen antes de usarlas
        if (typeof initializeAccessibility === 'function') {
            initializeAccessibility();
        }
        
        if (typeof initializeBackToTop === 'function') {
            initializeBackToTop();
        }
        
        // La función setupMobileMenu ya no es necesaria porque setupHeaderEvents se encarga
        
        console.log('✅ Eventos de componentes configurados');
    }
    
    // Función principal de inicialización
    function init() {
        console.log('🚀 Iniciando carga de componentes...');
        
        // Cargar todos los componentes
        components.forEach(component => {
            loadComponent(component);
        });
    }
    
    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Exportar funciones útiles al scope global
    window.ComponentLoader = {
        componentsPath: componentsPath,
        isInPagesFolder: isInPagesFolder,
        isInSubfolder: isInSubfolder,
        reload: init
    };
    
})();
