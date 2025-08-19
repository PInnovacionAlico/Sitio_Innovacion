/* ==================================================
   ALICO - ACCESSIBILITY SYSTEM - COMPLETO Y CORREGIDO
   Sistema de accesibilidad con persistencia entre páginas
   ================================================== */

// Estado global
let isPanelOpen = false;
let isInitialized = false;

// Configuraciones de accesibilidad - SOLO las 3 opciones necesarias
let accessibilitySettings = {
    fontSize: 100,
    darkMode: false,
    textToSpeech: false
};

/* ==================================================
   FUNCIÓN PRINCIPAL DE TOGGLE - OPTIMIZADA
   ================================================== */
function toggleAccessibilityPanel() {
    const panel = document.getElementById('accessibilityPanel');
    const overlay = document.getElementById('accessibilityOverlay');
    const toggle = document.getElementById('accessibilityToggle');
    
    if (!panel || !overlay || !toggle) {
        console.error('Elementos de accesibilidad no encontrados');
        return;
    }
    
    isPanelOpen = !isPanelOpen;
    
    if (isPanelOpen) {
        // Abrir panel - ULTRA OPTIMIZADO para móvil
        panel.classList.add('show');
        overlay.classList.add('show');
        toggle.classList.add('panel-open');
        panel.setAttribute('aria-hidden', 'false');
        
        // Prevenir scroll del body
        document.body.style.overflow = 'hidden';
        
        // Sincronizar controles inmediatamente para móvil
        updatePanelButtons();
        
        // Focus en el primer elemento interactivo
        const firstButton = panel.querySelector('button:not(.accessibility-close)');
        if (firstButton) firstButton.focus();
        
        console.log('Panel de accesibilidad abierto');
        
    } else {
        // Cerrar panel - ULTRA OPTIMIZADO para móvil
        panel.classList.remove('show');
        overlay.classList.remove('show');
        toggle.classList.remove('panel-open');
        panel.setAttribute('aria-hidden', 'true');
        
        // Restaurar scroll del body
        document.body.style.overflow = '';
        
        // Devolver focus al botón toggle
        toggle.focus();
        
        console.log('Panel de accesibilidad cerrado');
    }
}

/* ==================================================
   CARGAR CONFIGURACIONES GUARDADAS
   ================================================== */
function loadAccessibilitySettings() {
    try {
        const saved = localStorage.getItem('alico-accessibility-settings');
        if (saved) {
            const parsedSettings = JSON.parse(saved);
            accessibilitySettings = { ...accessibilitySettings, ...parsedSettings };
            console.log('✅ Configuraciones de accesibilidad cargadas:', accessibilitySettings);
        } else {
            console.log('ℹ️ No hay configuraciones guardadas, usando valores por defecto');
        }
    } catch (error) {
        console.error('❌ Error cargando configuraciones de accesibilidad:', error);
    }
}

/* ==================================================
   GUARDAR CONFIGURACIONES
   ================================================== */
function saveAccessibilitySettings() {
    try {
        localStorage.setItem('alico-accessibility-settings', JSON.stringify(accessibilitySettings));
        console.log('💾 Configuraciones de accesibilidad guardadas:', accessibilitySettings);
    } catch (error) {
        console.error('❌ Error guardando configuraciones:', error);
    }
}

/* ==================================================
   APLICAR CONFIGURACIONES AL DOM - OPTIMIZADO
   ================================================== */
function applyAccessibilitySettings() {
    const body = document.body;
    
    // 1. TAMAÑO DE FUENTE - OPTIMIZADO PARA TODOS LOS TEXTOS
    applyFontSizeToAllTexts();
    
    // 2. ALTO CONTRASTE - ELIMINADO
    
    // 3. MODO OSCURO - COMPLETO
    if (accessibilitySettings.darkMode) {
        body.classList.add('dark-mode');
        // Aplicar modo oscuro a elementos específicos
        applyDarkModeToElements();
    } else {
        body.classList.remove('dark-mode');
        // Remover modo oscuro de elementos específicos
        removeDarkModeFromElements();
    }
    
    // 4. Actualizar botones en el panel si existe (deferido para mejor rendimiento)
    requestIdleCallback(() => {
        updatePanelButtons();
    });
    
    console.log('🎨 Configuraciones de accesibilidad aplicadas');
}

// Función para aplicar modo oscuro a elementos específicos
function applyDarkModeToElements() {
    const elements = document.querySelectorAll('.flip-card, .model-card, .banner-section, .sgi-grid, .resource-card, .methodology-card, .video-card, .ali-3d-container, .sketchfab-embed-wrapper');
    
    elements.forEach(element => {
        element.classList.add('dark-mode-applied');
    });
}

// Función para remover modo oscuro de elementos específicos
function removeDarkModeFromElements() {
    const elements = document.querySelectorAll('.dark-mode-applied');
    elements.forEach(element => {
        element.classList.remove('dark-mode-applied');
    });
}

/* ==================================================
   ACTUALIZAR BOTONES EN EL PANEL - CORREGIDO
   ================================================== */
function updatePanelButtons() {
    // Actualizar tamaño de fuente
    const fontSizeDisplay = document.getElementById('fontSizeDisplay');
    if (fontSizeDisplay) {
        fontSizeDisplay.textContent = `${accessibilitySettings.fontSize}%`;
    }
    
    // ALTO CONTRASTE - ELIMINADO
    
    // CORREGIDO: Actualizar checkbox de modo oscuro
    const darkModeCheckbox = document.getElementById('darkMode');
    if (darkModeCheckbox) {
        darkModeCheckbox.checked = accessibilitySettings.darkMode;
        console.log(`✅ Checkbox modo oscuro actualizado: ${accessibilitySettings.darkMode}`);
    }
    
    // CORREGIDO: Actualizar botón de lectura en voz alta
    const ttsBtn = document.getElementById('ttsButton');
    if (ttsBtn) {
        const icon = ttsBtn.querySelector('.material-symbols-rounded');
        if (accessibilitySettings.textToSpeech) {
            ttsBtn.classList.add('active');
            if (icon) icon.textContent = 'volume_off';
            ttsBtn.innerHTML = `
                <span class="material-symbols-rounded">volume_off</span>
                Desactivar lectura
            `;
        } else {
            ttsBtn.classList.remove('active');
            if (icon) icon.textContent = 'volume_up';
            ttsBtn.innerHTML = `
                <span class="material-symbols-rounded">volume_up</span>
                Lectura de texto
            `;
        }
        console.log(`✅ Botón TTS actualizado: ${accessibilitySettings.textToSpeech}`);
    }
}

/* ==================================================
   FUNCIONES ESPECÍFICAS DE ACCESIBILIDAD
   ================================================== */

// 1. AUMENTAR TAMAÑO DE FUENTE - OPTIMIZADO
function increaseFontSize() {
    if (accessibilitySettings.fontSize < 150) {
        accessibilitySettings.fontSize += 10;
        applyAccessibilitySettings();
        saveAccessibilitySettings();
        
        // Feedback sonoro o visual
        showAccessibilityFeedback(`Tamaño de fuente: ${accessibilitySettings.fontSize}%`);
    } else {
        showAccessibilityFeedback('Tamaño máximo alcanzado');
    }
}

// 2. DISMINUIR TAMAÑO DE FUENTE - OPTIMIZADO
function decreaseFontSize() {
    if (accessibilitySettings.fontSize > 80) {
        accessibilitySettings.fontSize -= 10;
        applyAccessibilitySettings();
        saveAccessibilitySettings();
        
        // Feedback sonoro o visual
        showAccessibilityFeedback(`Tamaño de fuente: ${accessibilitySettings.fontSize}%`);
    } else {
        showAccessibilityFeedback('Tamaño mínimo alcanzado');
    }
}

// 3. RESETEAR TAMAÑO DE FUENTE - OPTIMIZADO
function resetFontSize() {
    accessibilitySettings.fontSize = 100;
    applyAccessibilitySettings();
    saveAccessibilitySettings();
    showAccessibilityFeedback('Tamaño de fuente restablecido');
}

// 4. FUNCIÓN MEJORADA PARA APLICAR TAMAÑO DE FUENTE A TODOS LOS TEXTOS
function applyFontSizeToAllTexts() {
    const rootFontSize = accessibilitySettings.fontSize / 100;
    
    // Aplicar al elemento root para herencia general
    document.documentElement.style.fontSize = `${rootFontSize * 16}px`;
    
    // Aplicar a elementos específicos que pueden no heredar correctamente
    const textElements = document.querySelectorAll(`
        h1, h2, h3, h4, h5, h6, 
        p, span, div, 
        button, a, input, textarea, label,
        .flip-card-front, .flip-card-back,
        .model-card, .banner-content,
        .video-title, .photo-caption,
        .blog-title, .blog-excerpt,
        .project-title, .project-description
    `);
    
    textElements.forEach(element => {
        const computedStyle = getComputedStyle(element);
        const originalSize = parseFloat(computedStyle.fontSize);
        
        if (originalSize && originalSize > 0) {
            // Calcular el nuevo tamaño basado en el tamaño original
            const newSize = originalSize * rootFontSize;
            element.style.fontSize = `${newSize}px`;
        }
    });
    
    console.log(`📏 Tamaño de fuente aplicado a todos los textos: ${accessibilitySettings.fontSize}%`);
}

// FUNCIONES PARA LOS BOTONES DE FUENTE EN EL HTML
function adjustFontSize(action) {
    switch(action) {
        case 'increase':
            increaseFontSize();
            break;
        case 'decrease':
            decreaseFontSize();
            break;
        case 'reset':
            resetFontSize();
            break;
    }
}

// 4. TOGGLE ALTO CONTRASTE - ELIMINADO

// 5. TOGGLE MODO OSCURO - CORREGIDO
function toggleDarkMode() {
    accessibilitySettings.darkMode = !accessibilitySettings.darkMode;
    
    // Actualizar el checkbox inmediatamente
    const darkModeCheckbox = document.getElementById('darkMode');
    if (darkModeCheckbox) {
        darkModeCheckbox.checked = accessibilitySettings.darkMode;
    }
    
    applyAccessibilitySettings();
    saveAccessibilitySettings();
    
    const status = accessibilitySettings.darkMode ? 'activado' : 'desactivado';
    showAccessibilityFeedback(`Modo oscuro ${status}`);
    
    console.log(`🌙 Modo oscuro ${status}: ${accessibilitySettings.darkMode}`);
}

// 6. TOGGLE LECTURA EN VOZ ALTA - CON SELECCIÓN DE TEXTO
function toggleTextToSpeech() {
    accessibilitySettings.textToSpeech = !accessibilitySettings.textToSpeech;
    
    // Actualizar botón inmediatamente
    updatePanelButtons();
    
    applyAccessibilitySettings();
    saveAccessibilitySettings();
    
    const status = accessibilitySettings.textToSpeech ? 'activada' : 'desactivada';
    showAccessibilityFeedback(`Lectura en voz alta ${status}`);
    
    // Si se activa, habilitar selección de texto
    if (accessibilitySettings.textToSpeech) {
        enableTextSelection();
        showAccessibilityFeedback('Selecciona el texto que quieres que se lea en voz alta');
    } else {
        disableTextSelection();
        stopSpeaking();
    }
    
    console.log(`🔊 Lectura en voz alta ${status}: ${accessibilitySettings.textToSpeech}`);
}

// 7. FUNCIÓN PARA MOSTRAR ATAJOS DE TECLADO
function showKeyboardShortcuts() {
    showAccessibilityFeedback('Atajos: Ctrl/Cmd + (+) aumentar, (-) disminuir, (0) normal');
}

// 8. FUNCIÓN PARA RESETEAR TODAS LAS CONFIGURACIONES
function resetAllSettings() {
    // Resetear a valores por defecto
    accessibilitySettings = {
        fontSize: 100,
        darkMode: false,
        textToSpeech: false
    };
    
    // Aplicar y guardar
    applyAccessibilitySettings();
    saveAccessibilitySettings();
    
    // Feedback
    showAccessibilityFeedback('Configuración de accesibilidad restablecida');
    
    console.log('🔄 Configuraciones de accesibilidad restablecidas');
}

/* ==================================================
   SISTEMA DE TEXT-TO-SPEECH
   ================================================== */
function speakMainContent() {
    if ('speechSynthesis' in window) {
        // Detener cualquier lectura anterior
        window.speechSynthesis.cancel();
        
        // Obtener el contenido principal
        const mainContent = document.querySelector('main');
        if (mainContent) {
            const textToSpeak = extractReadableText(mainContent);
            
            if (textToSpeak.trim()) {
                const utterance = new SpeechSynthesisUtterance(textToSpeak);
                utterance.lang = 'es-ES';
                utterance.rate = 0.8;
                utterance.pitch = 1;
                
                utterance.onstart = () => {
                    console.log('🔊 Iniciando lectura en voz alta');
                };
                
                utterance.onend = () => {
                    console.log('🔇 Lectura completada');
                };
                
                utterance.onerror = (event) => {
                    console.error('❌ Error en lectura:', event.error);
                };
                
                window.speechSynthesis.speak(utterance);
            }
        }
    } else {
        showAccessibilityFeedback('Lectura en voz alta no disponible en este navegador');
    }
}

function stopSpeaking() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        console.log('🔇 Lectura detenida');
    }
}

// Función para habilitar selección de texto
function enableTextSelection() {
    // Agregar event listener para doble clic en texto
    document.addEventListener('dblclick', handleTextSelection);
    
    // Agregar estilos visuales para indicar que la selección está activa
    document.body.style.cursor = 'text';
    
    // Agregar indicador visual
    showTextSelectionIndicator();
    
    console.log('✅ Selección de texto habilitada');
}

// Función para deshabilitar selección de texto
function disableTextSelection() {
    // Remover event listener
    document.removeEventListener('dblclick', handleTextSelection);
    
    // Restaurar cursor
    document.body.style.cursor = '';
    
    // Remover indicador visual
    hideTextSelectionIndicator();
    
    console.log('❌ Selección de texto deshabilitada');
}

// Función para manejar la selección de texto
function handleTextSelection(event) {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText) {
        console.log('📖 Texto seleccionado:', selectedText);
        
        // Leer el texto seleccionado
        speakSelectedText(selectedText);
        
        // Mostrar feedback
        showAccessibilityFeedback(`Leyendo: "${selectedText.substring(0, 50)}${selectedText.length > 50 ? '...' : ''}"`);
        
        // Resaltar brevemente el texto seleccionado
        highlightSelectedText(selection);
    } else {
        showAccessibilityFeedback('No hay texto seleccionado. Haz doble clic en el texto que quieres leer');
    }
}

// Función para leer texto seleccionado
function speakSelectedText(text) {
    if ('speechSynthesis' in window) {
        // Detener cualquier lectura anterior
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        utterance.onstart = () => {
            console.log('🔊 Iniciando lectura del texto seleccionado');
        };
        
        utterance.onend = () => {
            console.log('🔇 Lectura del texto seleccionado completada');
        };
        
        utterance.onerror = (event) => {
            console.error('❌ Error en lectura del texto seleccionado:', event.error);
        };
        
        window.speechSynthesis.speak(utterance);
    } else {
        showAccessibilityFeedback('Lectura en voz alta no disponible en este navegador');
    }
}

// Función para resaltar texto seleccionado
function highlightSelectedText(selection) {
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'text-selection-highlight';
        span.style.cssText = `
            background: var(--amarillo-oro);
            color: var(--blanco);
            padding: 2px 4px;
            border-radius: 3px;
            animation: textHighlight 2s ease-out;
        `;
        
        try {
            range.surroundContents(span);
            
            // Remover el resaltado después de 2 segundos
            setTimeout(() => {
                if (span.parentNode) {
                    const parent = span.parentNode;
                    parent.replaceChild(document.createTextNode(span.textContent), span);
                    parent.normalize();
                }
            }, 2000);
        } catch (e) {
            console.log('No se pudo resaltar el texto seleccionado');
        }
    }
}

// Función para mostrar indicador de selección activa
function showTextSelectionIndicator() {
    // Crear indicador visual
    const indicator = document.createElement('div');
    indicator.id = 'textSelectionIndicator';
    indicator.innerHTML = `
        <span class="material-symbols-rounded">text_fields</span>
        Selección de texto activa - Haz doble clic en el texto
    `;
    indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, var(--verde-natura) 0%, var(--verde-natura-80) 100%);
        color: white;
        padding: 12px 20px;
        border-radius: 25px;
        font-family: 'Work Sans', sans-serif;
        font-weight: 600;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 8px;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(indicator);
}

// Función para ocultar indicador de selección
function hideTextSelectionIndicator() {
    const indicator = document.getElementById('textSelectionIndicator');
    if (indicator) {
        indicator.remove();
    }
}

function extractReadableText(element) {
    // Elementos a ignorar
    const ignoredSelectors = [
        'script', 'style', 'noscript', 'iframe', 
        '.header', '.footer', '.nav', '.menu',
        '.material-symbols-rounded', '[aria-hidden="true"]'
    ];
    
    // Clonar el elemento para no modificar el original
    const clone = element.cloneNode(true);
    
    // Remover elementos ignorados
    ignoredSelectors.forEach(selector => {
        const elements = clone.querySelectorAll(selector);
        elements.forEach(el => el.remove());
    });
    
    // Extraer solo el texto
    let text = clone.textContent || clone.innerText || '';
    
    // Limpiar texto
    text = text
        .replace(/\s+/g, ' ')           // Múltiples espacios por uno
        .replace(/\n\s*\n/g, '. ')      // Múltiples saltos de línea por punto
        .trim();                        // Espacios al inicio y final
    
    return text;
}

/* ==================================================
   FEEDBACK VISUAL PARA ACCESIBILIDAD
   ================================================== */
function showAccessibilityFeedback(message) {
    // Crear elemento de feedback
    const feedback = document.createElement('div');
    feedback.className = 'accessibility-feedback';
    feedback.textContent = message;
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-live', 'polite');
    
    // Estilos inline para asegurar visibilidad
    feedback.style.cssText = `
        position: fixed;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, var(--verde-natura) 0%, var(--verde-natura-80) 100%);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-family: 'Work Sans', sans-serif;
        font-weight: 600;
        font-size: 14px;
        z-index: 10001;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        opacity: 0;
        transition: all 0.3s ease;
        pointer-events: none;
        backdrop-filter: blur(10px);
    `;
    
    document.body.appendChild(feedback);
    
    // Animación de aparición
    setTimeout(() => {
        feedback.style.opacity = '1';
        feedback.style.transform = 'translateX(-50%) translateY(10px)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateX(-50%) translateY(-10px)';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
    
    console.log(`📢 Feedback de accesibilidad: ${message}`);
}

/* ==================================================
   MANEJO DE EVENTOS GLOBALES
   ================================================== */
function setupAccessibilityEvents() {
    // Cerrar panel con ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isPanelOpen) {
            toggleAccessibilityPanel();
        }
        
        // Atajos de teclado
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case '+':
                case '=':
                    e.preventDefault();
                    increaseFontSize();
                    break;
                case '-':
                    e.preventDefault();
                    decreaseFontSize();
                    break;
                case '0':
                    e.preventDefault();
                    resetFontSize();
                    break;
            }
        }
    });
    
    // Cerrar panel al hacer clic en overlay
    const overlay = document.getElementById('accessibilityOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) {
                toggleAccessibilityPanel();
            }
        });
    }
    
    // Trap focus dentro del panel cuando está abierto
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && isPanelOpen) {
            trapFocusInPanel(e);
        }
    });
}

function trapFocusInPanel(e) {
    const panel = document.getElementById('accessibilityPanel');
    if (!panel) return;
    
    const focusableElements = panel.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        }
    } else {
        if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
}

/* ==================================================
   INICIALIZACIÓN GLOBAL MEJORADA
   ================================================== */
function initAccessibility() {
    if (isInitialized) {
        console.log('⚠️ Sistema de accesibilidad ya inicializado');
        return;
    }
    
    console.log('🔧 Inicializando sistema de accesibilidad...');
    
    // Cargar configuraciones guardadas
    loadAccessibilitySettings();
    
    // Aplicar configuraciones al DOM
    applyAccessibilitySettings();
    
    // Configurar eventos
    setupAccessibilityEvents();
    
    // Marcar como inicializado
    isInitialized = true;
    
    console.log('✅ Sistema de accesibilidad inicializado correctamente');
    console.log('📋 Configuraciones actuales:', accessibilitySettings);
}

/* ==================================================
   AUTO-INICIALIZACIÓN MEJORADA
   ================================================== */
// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibility);
} else {
    initAccessibility();
}

// IMPORTANTE: Escuchar el evento personalizado de componentes cargados
window.addEventListener('components-loaded', function() {
    console.log('🎉 Componentes cargados - sincronizando panel de accesibilidad');
    
    // Re-aplicar configuraciones después de que los componentes se carguen
    setTimeout(() => {
        applyAccessibilitySettings();
        
        // CRÍTICO: Actualizar el estado de los controles del panel
        updatePanelButtons();
        
        console.log('🔄 Panel de accesibilidad sincronizado con configuraciones guardadas');
    }, 200);
});

// También escuchar cuando el panel se abra por primera vez
document.addEventListener('click', function(e) {
    if (e.target.closest('#accessibilityToggle') && !isPanelOpen) {
        // El panel se está abriendo, asegurar sincronización
        setTimeout(() => {
            updatePanelButtons();
            console.log('🎛️ Panel abierto - controles sincronizados');
        }, 500);
    }
});

/* ==================================================
   FUNCIONES GLOBALES PARA DEBUGGING
   ================================================== */
window.debugAccessibility = {
    getSettings: () => accessibilitySettings,
    resetSettings: () => {
        localStorage.removeItem('alico-accessibility-settings');
        location.reload();
    },
    saveSettings: saveAccessibilitySettings,
    loadSettings: loadAccessibilitySettings,
    applySettings: applyAccessibilitySettings,
    updateButtons: updatePanelButtons,
    testSync: () => {
        console.log('Estado actual:', accessibilitySettings);
        updatePanelButtons();
        console.log('Botones actualizados');
    }
};

console.log('📱 Sistema de accesibilidad Alico cargado');
console.log('🛠️ Funciones de debug disponibles en window.debugAccessibility');
