/* ==================================================
   ALICO - ACCESSIBILITY SYSTEM - COMPLETO Y CORREGIDO
   Sistema de accesibilidad con persistencia entre páginas
   ================================================== */

// Detener inmediatamente cualquier TTS al cargar este script
if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
}

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
    
    // 4. TEXT-TO-SPEECH - APLICAR ESTADO GUARDADO
    if (accessibilitySettings.textToSpeech) {
        body.classList.add('tts-paragraph-mode');
        // Habilitar modo párrafos si estaba activo (sin mostrar indicador)
        enableParagraphModeQuietly();
    } else {
        body.classList.remove('tts-paragraph-mode');
        // Deshabilitar modo párrafos si estaba inactivo
        disableParagraphModeQuietly();
    }
    
    // 5. Actualizar botones en el panel si existe (deferido para mejor rendimiento)
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
            if (icon) icon.textContent = 'record_voice_over';
            ttsBtn.innerHTML = `
                <span class="material-symbols-rounded">record_voice_over</span>
                Desactivar lectura por párrafos y títulos
            `;
        } else {
            ttsBtn.classList.remove('active');
            if (icon) icon.textContent = 'volume_up';
            ttsBtn.innerHTML = `
                <span class="material-symbols-rounded">volume_up</span>
                Lectura por párrafos y títulos
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
    if (accessibilitySettings.fontSize < 140) {
        accessibilitySettings.fontSize += 5;
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
    if (accessibilitySettings.fontSize > 85) {
        accessibilitySettings.fontSize -= 5;
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
    const scaleFactor = accessibilitySettings.fontSize / 100;
    
    // Usar CSS custom property para escalar todo el contenido
    document.documentElement.style.setProperty('--font-scale-factor', scaleFactor);
    
    // Aplicar escala mediante CSS transform en lugar de modificar fontSize directamente
    const body = document.body;
    if (scaleFactor !== 1) {
        body.style.setProperty('--accessibility-font-scale', scaleFactor);
        body.classList.add('accessibility-font-scaled');
    } else {
        body.style.removeProperty('--accessibility-font-scale');
        body.classList.remove('accessibility-font-scaled');
    }
    
    // Asegurar que elementos específicos respeten la escala
    ensureFontScaling();
    
    console.log(`📏 Tamaño de fuente aplicado con escala: ${accessibilitySettings.fontSize}%`);
}

// Función auxiliar para asegurar que todos los elementos respeten la escala
function ensureFontScaling() {
    const importantElements = document.querySelectorAll(`
        .header, .nav-link, .dropdown-item, .mobile-nav-item,
        .banner-content, .flip-card, .model-card,
        .video-title, .photo-caption, .blog-content,
        .accessibility-panel, .quick-link-card
    `);
    
    importantElements.forEach(element => {
        if (!element.classList.contains('font-scale-applied')) {
            element.classList.add('font-scale-applied');
        }
    });
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

// 6. TOGGLE LECTURA EN VOZ ALTA - POR PÁRRAFOS
function toggleTextToSpeech() {
    accessibilitySettings.textToSpeech = !accessibilitySettings.textToSpeech;
    
    // Actualizar botón inmediatamente
    updatePanelButtons();
    
    applyAccessibilitySettings();
    saveAccessibilitySettings();
    
    const status = accessibilitySettings.textToSpeech ? 'activada' : 'desactivada';
    showAccessibilityFeedback(`Lectura en voz alta ${status}`);
    
    // Si se activa, habilitar modo párrafos y títulos
    if (accessibilitySettings.textToSpeech) {
        enableParagraphMode();
        showAccessibilityFeedback('Haz clic en cualquier párrafo o título para escucharlo');
    } else {
        disableParagraphMode();
        stopSpeaking();
    }
    
    console.log(`🔊 Lectura en voz alta ${status}: ${accessibilitySettings.textToSpeech}`);
}

// 7. FUNCIÓN PARA MOSTRAR ATAJOS DE TECLADO
function showKeyboardShortcuts() {
    showAccessibilityFeedback('Atajos: Ctrl/Cmd + (+) aumentar, (-) disminuir, (0) normal, Shift+(Q) parar TTS, Shift+(R) toggle TTS');
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
    
    // Limpiar resaltado visual de párrafos y títulos que se estén leyendo
    const readingElements = document.querySelectorAll('.tts-reading');
    readingElements.forEach(el => el.classList.remove('tts-reading'));
    
    // Si el TTS está activo y no es por navegación, mostrar feedback
    if (accessibilitySettings.textToSpeech && !window.isNavigating) {
        showAccessibilityFeedback('Lectura detenida - Haz clic en otro párrafo o título para continuar');
    }
}

// Función global para forzar detención de TTS
function forceStopTTS() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        console.log('🔇 TTS forzado a detenerse');
    }
    
    // Limpiar resaltado visual de párrafos y títulos
    const readingElements = document.querySelectorAll('.tts-reading');
    readingElements.forEach(el => el.classList.remove('tts-reading'));
}

// Hacer la función disponible globalmente
window.forceStopTTS = forceStopTTS;

// Función para habilitar modo párrafos y títulos
function enableParagraphMode() {
    // Agregar clase al body para activar estilos TTS
    document.body.classList.add('tts-paragraph-mode');
    
    // Agregar event listener para clic en párrafos y títulos
    document.addEventListener('click', handleParagraphClick);
    
    // Agregar indicador visual
    showParagraphModeIndicator();
    
    console.log('✅ Modo párrafos y títulos habilitado');
}

// Función para habilitar modo párrafos y títulos sin indicador (para carga de página)
function enableParagraphModeQuietly() {
    // Agregar clase al body para activar estilos TTS
    document.body.classList.add('tts-paragraph-mode');
    
    // Agregar event listener para clic en párrafos y títulos
    document.addEventListener('click', handleParagraphClick);
    
    console.log('✅ Modo párrafos y títulos habilitado (silencioso)');
}

// Función para deshabilitar modo párrafos y títulos
function disableParagraphMode() {
    // Remover clase del body
    document.body.classList.remove('tts-paragraph-mode');
    
    // Remover event listener
    document.removeEventListener('click', handleParagraphClick);
    
    // Remover indicador visual
    hideParagraphModeIndicator();
    
    // Remover resaltado de párrafos y títulos que se estén leyendo
    const readingElements = document.querySelectorAll('.tts-reading');
    readingElements.forEach(el => el.classList.remove('tts-reading'));
    
    console.log('❌ Modo párrafos y títulos deshabilitado');
}

// Función para deshabilitar modo párrafos y títulos sin indicador (para carga de página)
function disableParagraphModeQuietly() {
    // Remover clase del body
    document.body.classList.remove('tts-paragraph-mode');
    
    // Remover event listener
    document.removeEventListener('click', handleParagraphClick);
    
    // Remover resaltado de párrafos y títulos que se estén leyendo
    const readingElements = document.querySelectorAll('.tts-reading');
    readingElements.forEach(el => el.classList.remove('tts-reading'));
    
    console.log('❌ Modo párrafos y títulos deshabilitado (silencioso)');
}

// Función para manejar clic en párrafos y títulos
function handleParagraphClick(event) {
    // Verificar si el clic fue en un párrafo o título
    const clickedElement = event.target;
    const textElement = clickedElement.closest('p, h1, h2, h3, h4, h5, h6');
    
    if (textElement) {
        // Evitar que se propague el evento
        event.preventDefault();
        event.stopPropagation();
        
        const elementText = textElement.textContent.trim();
        
        if (elementText) {
            const elementType = textElement.tagName.toLowerCase();
            console.log(`📖 ${elementType.charAt(0).toUpperCase() + elementType.slice(1)} seleccionado:`, elementText);
            
            // Remover resaltado anterior
            const previousReading = document.querySelector('.tts-reading');
            if (previousReading) {
                previousReading.classList.remove('tts-reading');
            }
            
            // Resaltar elemento actual
            textElement.classList.add('tts-reading');
            
            // Leer el texto
            speakParagraph(elementText, textElement);
            
            // Mostrar feedback
            const preview = elementText.substring(0, 50);
            const elementName = elementType === 'p' ? 'párrafo' : 'título';
            showAccessibilityFeedback(`Leyendo ${elementName}: "${preview}${elementText.length > 50 ? '...' : ''}"`);
        }
    }
}

// Función para leer párrafo
function speakParagraph(text, paragraphElement) {
    if ('speechSynthesis' in window) {
        // Detener cualquier lectura anterior
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'es-ES';
        utterance.rate = 0.8;
        utterance.pitch = 1;
        
        utterance.onstart = () => {
            console.log('🔊 Iniciando lectura del párrafo');
        };
        
        utterance.onend = () => {
            console.log('🔇 Lectura del párrafo completada');
            // Remover resaltado cuando termine la lectura
            if (paragraphElement) {
                paragraphElement.classList.remove('tts-reading');
            }
        };
        
        utterance.onerror = (event) => {
            console.error('❌ Error en lectura del párrafo:', event.error);
            // Remover resaltado en caso de error
            if (paragraphElement) {
                paragraphElement.classList.remove('tts-reading');
            }
        };
        
        window.speechSynthesis.speak(utterance);
    } else {
        showAccessibilityFeedback('Lectura en voz alta no disponible en este navegador');
        // Remover resaltado si no se puede leer
        if (paragraphElement) {
            paragraphElement.classList.remove('tts-reading');
        }
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

// Función para mostrar indicador de modo párrafos y títulos
function showParagraphModeIndicator() {
    // Crear indicador visual
    const indicator = document.createElement('div');
    indicator.id = 'paragraphModeIndicator';
    indicator.innerHTML = `
        <span class="material-symbols-rounded">record_voice_over</span>
        Modo párrafos y títulos activo - Haz clic en cualquier párrafo o título
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

// Función para ocultar indicador de modo párrafos
function hideParagraphModeIndicator() {
    const indicator = document.getElementById('paragraphModeIndicator');
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
        
        // Shortcut para parar TTS (Ctrl/Cmd + Shift + Q)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Q') {
            e.preventDefault();
            if (accessibilitySettings.textToSpeech) {
                stopSpeaking();
                showAccessibilityFeedback('Lectura en voz alta detenida');
            }
        }
        
        // Shortcut para activar/desactivar TTS (Ctrl/Cmd + Shift + R)
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'R') {
            e.preventDefault();
            toggleTextToSpeech();
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
    
    // Detener TTS al cambiar de página
    setupPageNavigationListeners();
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
   DETENER TTS AL CAMBIAR DE PÁGINA
   ================================================== */
function setupPageNavigationListeners() {
    // Detener TTS antes de que se descargue la página
    window.addEventListener('beforeunload', function() {
        if (accessibilitySettings.textToSpeech) {
            stopSpeaking();
            console.log('🔇 TTS detenido por cambio de página (beforeunload)');
        }
    });
    
    // Detener TTS cuando la página se oculta (navegación)
    window.addEventListener('pagehide', function() {
        if (accessibilitySettings.textToSpeech) {
            stopSpeaking();
            console.log('🔇 TTS detenido por ocultación de página (pagehide)');
        }
    });
    
    // Detener TTS cuando se navega con el historial del navegador
    window.addEventListener('popstate', function() {
        if (accessibilitySettings.textToSpeech) {
            stopSpeaking();
            console.log('🔇 TTS detenido por navegación del historial (popstate)');
        }
    });
    
    // Detener TTS cuando la pestaña cambia de estado (oculta/visible)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && accessibilitySettings.textToSpeech) {
            stopSpeaking();
            console.log('🔇 TTS detenido por cambio de visibilidad de pestaña');
        }
    });
    
    // Detener TTS cuando se hace clic en enlaces
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (link && link.href) {
            const currentOrigin = window.location.origin;
            const linkURL = new URL(link.href, window.location.href);
            
            // Verificar si es navegación a otra página (no anclas)
            const isNavigation = !link.href.includes('#') && 
                                !link.href.includes('javascript:') && 
                                !link.href.includes('mailto:') && 
                                !link.href.includes('tel:') &&
                                (linkURL.pathname !== window.location.pathname || 
                                 linkURL.origin !== currentOrigin);
            
            if (isNavigation && accessibilitySettings.textToSpeech) {
                // Marcar que se está navegando para evitar feedback innecesario
                window.isNavigating = true;
                stopSpeaking();
                console.log('🔇 TTS detenido por clic en enlace de navegación:', link.href);
                
                // Resetear la bandera después de un tiempo
                setTimeout(() => {
                    window.isNavigating = false;
                }, 1000);
            }
        }
    });
    
    // Detener TTS cuando se usa la API de History (pushState, replaceState)
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;
    
    history.pushState = function() {
        if (accessibilitySettings.textToSpeech) {
            window.isNavigating = true;
            stopSpeaking();
            console.log('🔇 TTS detenido por pushState');
            
            // Resetear la bandera después de un tiempo
            setTimeout(() => {
                window.isNavigating = false;
            }, 1000);
        }
        return originalPushState.apply(this, arguments);
    };
    
    history.replaceState = function() {
        if (accessibilitySettings.textToSpeech) {
            window.isNavigating = true;
            stopSpeaking();
            console.log('🔇 TTS detenido por replaceState');
            
            // Resetear la bandera después de un tiempo
            setTimeout(() => {
                window.isNavigating = false;
            }, 1000);
        }
        return originalReplaceState.apply(this, arguments);
    };
    
    // Listener adicional más agresivo para unload
    window.addEventListener('unload', function() {
        forceStopTTS();
        console.log('🔇 TTS detenido por unload');
    });
    
    console.log('✅ Listeners de navegación configurados para detener TTS');
}

// Función para ejecutar inmediatamente al cargar la página
function stopTTSOnPageLoad() {
    // Detener cualquier TTS que pueda estar ejecutándose desde la página anterior
    forceStopTTS();
    console.log('🔇 TTS detenido preventivamente al cargar nueva página');
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
    
    // Detener cualquier TTS al cargar nueva página
    stopTTSOnPageLoad();
    
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
