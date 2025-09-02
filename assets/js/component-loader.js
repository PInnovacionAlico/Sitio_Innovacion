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
            position: 'main'
        }
    ];
    
    let loadedComponents = 0;
    const totalComponents = components.length;
    
    // Función para cargar un componente
    async function loadComponent(component) {
        try {
            const response = await fetch(componentsPath + component.file);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const html = await response.text();
            
            // Buscar el elemento objetivo
            const targetElement = component.position === 'body' 
                ? document.body 
                : document.querySelector(component.position) || document.body;
            
            // Insertar el HTML
            targetElement.insertAdjacentHTML(component.target, html);
            
            console.log(`✅ Componente ${component.name} cargado exitosamente`);
            
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
        
        // Configurar menú móvil si existe la función
        if (typeof setupMobileMenu === 'function') {
            setupMobileMenu();
        }
        
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
