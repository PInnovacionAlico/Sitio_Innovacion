# Sitio Innovación – Alico

Este repositorio contiene el **sitio web del área de Innovación de Alico**.  
El proyecto está desarrollado con **HTML, CSS y JavaScript puro**, sin frameworks ni bases de datos.  
Es un sitio **estático**, lo cual significa que puede visualizarse directamente en cualquier navegador.

Este README busca ser una guía completa para la próxima persona encargada de mantenerlo.  
Si sabes lo básico de HTML, CSS y JavaScript, podrás trabajar con este sitio sin problemas.

---

## 📑 Índice

1. [📂 Estructura del proyecto](#-estructura-del-proyecto)  
2. [⚡ Cómo funcionan los componentes dinámicos](#-cómo-funcionan-los-componentes-dinámicos)  
3. [⚙️ Requisitos básicos](#️-requisitos-básicos)  
4. [▶️ Cómo ver el sitio en local](#️-cómo-ver-el-sitio-en-local)  
5. [🛠️ Mantenimiento y actualizaciones](#️-mantenimiento-y-actualizaciones)  
6. [📌 Ejemplo: Crear una nueva página](#-ejemplo-crear-una-nueva-página)  
7. [🌐 Publicación en GitHub Pages](#-publicación-en-github-pages)  
8. [✅ Buenas prácticas](#-buenas-prácticas)  
9. [📞 Contacto](#-contacto)  

---

## 📂 Estructura del proyecto

### Archivos principales en la raíz:
- **index.html** → Página principal.  
- **404.html** → Página de error que aparece cuando alguien visita una URL inexistente.  
- **design-thinking.html**, **embajador-ali.html**, **generalidades-sgi.html**, **iniciativas.html**, **inteligencias-artificiales.html**, **recursos-audiovisuales.html**, **videos-fotos.html** → Páginas internas del sitio con diferentes temáticas.

### Carpeta `assets/`
- **css/**  
  - `styles.css` → Estilos globales (colores, tipografía, disposición de elementos).  
  - `components.css` → Estilos específicos de los **componentes reutilizables**.  
  - `accessibility.css` → Estilos pensados para accesibilidad (ejemplo: alto contraste, tamaños de letra ajustables).  

- **images/**  
  - Contiene todas las imágenes del sitio (logos, íconos, banners, fotos de carrusel).  
  - Subcarpetas:  
    - `banners/` → Imágenes de cabecera de cada sección.  
    - `carrousel/` → Imágenes que aparecen en galerías o sliders.

- **js/**  
  - `scripts.js` → Funciones generales del sitio, como abrir/cerrar menús, botones interactivos o animaciones simples.  
  - `component-loader.js` → Script fundamental que **carga dinámicamente los componentes** (`header.html`, `footer.html`, etc.) en todas las páginas, evitando repetir código.  
  - `accessibility.js` → Funciones de accesibilidad (ej: navegación con teclado, activar modo alto contraste, agrandar texto).  

### Carpeta `components/`
Aquí se guardan las partes comunes del sitio, que son cargadas automáticamente con `component-loader.js`.  
No se abren de forma independiente en el navegador.

- `header.html` → Encabezado con el logo y menú de navegación.  
- `footer.html` → Pie de página con enlaces y créditos.  
- `back-to-top.html` → Botón flotante para regresar al inicio de la página.  
- `accessibility.html` → Barra o botones de accesibilidad.  
- `components.css` → Estilos que se aplican específicamente a estos componentes.

---

## ⚡ Cómo funcionan los componentes dinámicos

El archivo **`component-loader.js`** se encarga de insertar automáticamente los componentes comunes en cada página HTML.  
Por ejemplo, en lugar de copiar el `header` y `footer` en cada archivo `.html`, solo se colocan como componentes separados en `components/`.

En cada página HTML principal (`index.html`, `design-thinking.html`, etc.), verás al final algo así:

```html
<script src="assets/js/component-loader.js"></script>
```

Este script busca en cada página elementos como:

```html
<div data-include="components/header.html"></div>
<div data-include="components/footer.html"></div>
```

Y los reemplaza con el contenido real del archivo correspondiente.  
De esta manera, si se necesita cambiar el menú, solo se edita `header.html` y el cambio se refleja en todo el sitio.

---

## ⚙️ Requisitos básicos

- Conocimientos básicos de **HTML, CSS y JavaScript**.  
- [Visual Studio Code](https://code.visualstudio.com/) recomendado como editor.  
- Un navegador actualizado (Chrome, Edge, Firefox).  
- Github Desktop (para subir cambios al repositorio de forma local)

No es necesario instalar Node.js ni servidores web. El sitio se ejecuta directamente en el navegador.

---

## ▶️ Cómo ver el sitio en local

1. Descarga o clona el repositorio:  
   ```bash
   git clone https://github.com/PInnovacionAlico/Sitio_Innovacion.git
   ```
2. Abre la carpeta en VS Code.  
3. Haz doble clic en `index.html` para abrirlo en el navegador.  
4. Opcional: instala la extensión **Live Server** en VS Code para ver los cambios en tiempo real.

---

## 🛠️ Mantenimiento y actualizaciones

### 1. Editar contenido
- Modifica directamente los archivos `.html` en la raíz.  
- Usa los componentes (`header.html`, `footer.html`, etc.) para mantener consistencia en todas las páginas.  

### 2. Actualizar componentes
- **Menú de navegación** → edita `components/header.html`.  
- **Pie de página** → edita `components/footer.html`.  
- **Botón de accesibilidad** → edita `components/accessibility.html`.  
- **Botón subir al inicio** → edita `components/back-to-top.html`.  

> Al estar conectados con `component-loader.js`, los cambios en estos archivos se aplican automáticamente en todas las páginas.

### 3. Cambiar estilos
- `assets/css/styles.css` → estilos generales.  
- `assets/css/components.css` → estilos de los componentes.  
- `assets/css/accessibility.css` → estilos de accesibilidad.  

### 4. Imágenes
- Coloca nuevas imágenes en `assets/images/` o sus subcarpetas.  
- Usa nombres claros y en minúsculas (ejemplo: `equipo-innovacion.jpg`).  
- Optimiza antes de subir (para evitar que el sitio sea lento).  

### 5. JavaScript
- **scripts.js** → agrega funciones personalizadas aquí (ejemplo: abrir un modal, animaciones).  
- **component-loader.js** → ⚠️ no modificar salvo que sepas lo que haces, ya que gestiona cómo se cargan los componentes.  
- **accessibility.js** → puedes extender funciones relacionadas con accesibilidad.  

---

## 📌 Ejemplo: Crear una nueva página

1. Crea un nuevo archivo, por ejemplo `nueva-pagina.html`.  
2. Copia la estructura base de `design-thinking.html`.  
3. Asegúrate de incluir al final:  

```html
<script src="assets/js/component-loader.js"></script>
<script src="assets/js/scripts.js"></script>
<script src="assets/js/accessibility.js"></script>
```

4. Agrega la ruta a la nueva página en `components/header.html` para que aparezca en el menú.  

---

## 🌐 Publicación en GitHub Pages

1. Haz commit de tus cambios:  
   ```bash
   git add .
   git commit -m "Actualización del sitio"
   git push origin main
   ```
2. En GitHub, ve a **Settings > Pages** y selecciona la rama `main`.  
3. La página estará disponible en:  
   ```
   https://pinnovacionalico.github.io/Sitio_Innovacion/
   ```

---

## ✅ Buenas prácticas

- Usa **commits claros y descriptivos** (ejemplo: `"Se actualizó footer con nuevo enlace"`).  
- Revisa el sitio en **computador y celular** (diseño responsive).  
- Evita duplicar estilos; centraliza en `styles.css`.  
- Antes de borrar un archivo, confirma que no esté referenciado en otra parte.  
- Documenta cambios importantes en este README.  

---
