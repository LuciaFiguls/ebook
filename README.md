# 📖 Guía de Diseño - Landing Page Ebook

Documentación completa para personalizar y mantener la landing page del ebook.

## 📁 Estructura de archivos

```
lucia figuls/
├── index.html          # Estructura y contenido de la página
├── styles.css          # Todos los estilos y diseño
├── images/             # Imágenes utilizadas
└── videos/             # Video de la landing
```

---

## 🎨 Sistema de colores

### Variables CSS ([styles.css:16-24](styles.css#L16-L24))

Todos los colores están centralizados en variables CSS para facilitar cambios globales:

```css
:root {
    --orange-primary: #e96126;    /* Naranja principal (títulos, destacados) */
    --orange-secondary: #ec6d37;  /* Naranja secundario (fondos alternativos) */
    --green: #327e56;             /* Verde (botones CTA) */
    --cream: #e7dfd8;             /* Crema (fondos suaves) */
    --white: #ffffff;             /* Blanco */
    --black: #000000;             /* Negro (textos) */
    --gray: #454545;              /* Gris (textos secundarios) */
}
```

### Cómo cambiar colores

**Opción 1: Cambiar una variable (afecta toda la página)**
```css
/* En styles.css línea 17 */
--orange-primary: #2563eb;  /* Cambia naranja por azul */
```

**Opción 2: Cambiar un elemento específico**
```html
<!-- En index.html -->
<h2 class="section-title" style="color: #2563eb;">Mi título</h2>
```

---

## 🔤 Tipografías

### Fuentes utilizadas

Definidas en [index.html:9](index.html#L9):

1. **Playfair Display** (serif) - Títulos grandes y elegantes
2. **Archivo** (sans-serif) - Textos del cuerpo y contenido

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Archivo:wght@400;700&display=swap" rel="stylesheet">
```

### Jerarquía de textos

| Clase CSS | Tamaño | Fuente | Uso | Ubicación CSS |
|-----------|--------|--------|-----|---------------|
| `.display-title` | 53px | Playfair | Título principal hero | línea 41-48 |
| `.section-title` | 44px | Playfair | Títulos de secciones | línea 50-57 |
| `.lead-text` | 26px | Archivo | Texto destacado | línea 63-69 |
| `.subtitle-text` | 26px | Archivo | Subtítulos | línea 71-77 |

### Cómo cambiar tipografías

**Cambiar fuente de todos los títulos:**
```css
/* styles.css línea 42 */
.display-title {
    font-family: 'TU_NUEVA_FUENTE', serif;
}
```

**Cambiar tamaño de fuente:**
```css
/* styles.css línea 43 */
.display-title {
    font-size: 60px;  /* Era 53px */
}
```

---

## 🔘 Botones CTA

### Estilo base ([styles.css:105-119](styles.css#L105-L119))

```css
.cta-button {
    background-color: var(--green);      /* Color de fondo */
    color: var(--cream);                 /* Color del texto */
    font-size: 21px;
    font-weight: 700;
    text-transform: uppercase;
    text-decoration: underline;
    padding: 20px 40px;
    border-radius: 50px;
}
```

### Variantes de botones

- **`.cta-button.center-btn`** - Botón centrado con ancho máximo
- **`.cta-button.large`** - Botón más grande (24px, padding 25px 50px)

### Cómo personalizar botones

**Cambiar color de todos los botones:**
```css
/* Opción 1: En styles.css línea 19 */
--green: #1d4ed8;  /* Cambia verde por azul */

/* Opción 2: En styles.css línea 107 */
.cta-button {
    background-color: #1d4ed8;
}
```

**Cambiar borde redondeado:**
```css
/* styles.css línea 114 */
.cta-button {
    border-radius: 10px;  /* Menos redondeado (era 50px) */
}
```

---

## 📐 Estructura de secciones

### 1. Hero Section ([index.html:12-43](index.html#L12-L43))
Layout de dos columnas (imagen + texto)

**Personalización:**
- Color de fondo: `<section style="background-color: #e7dfd8;">`
- Imagen: `<img src="images/image_0.png">`
- Botón CTA: Línea 37-39

### 2. Benefits Section ([index.html:45-61](index.html#L45-L61))
Lista de beneficios con fondo naranja

**Personalización:**
- Color de fondo: `style="background-color: #e96126;"`
- Items de la lista: `<li>✔️ Tu texto aquí</li>`

### 3. Video Section ([index.html:63-87](index.html#L63-L87))
Sección con video y texto explicativo

**Personalización:**
- Video: `<source src="videos/tu-video.mp4">`
- Poster: `poster="images/tu-thumbnail.jpg"`

### 4. Testimonials Section ([index.html:89-121](index.html#L89-L121))
Layout de 3 columnas (2 testimonios | ebook | 1 testimonio)

**Personalización:**
- Agregar testimonios: Duplicar estructura `.testimonial-card`
- Imagen ebook central: Línea 109

### 5. Pricing Section ([index.html:123-139](index.html#L123-L139))
Tarjeta de precio destacada

**Personalización:**
- Precio: `<h2 class="pricing-amount">$18.000</h2>`
- Detalles: Línea 129-133

### 6. For Who Section ([index.html:141-239](index.html#L141-L239))
Layout imagen + listas (35% | 65%)

**Personalización:**
- Imagen: `<img src="images/este-ebook-es-para-vos-si.png">`
- Listas: Agregar `<li>` dentro de `.for-who-list`

### 7. FAQ Section ([index.html:240-274](index.html#L240-L274))
Layout imagen + preguntas (40% | 60%)

**Personalización:**
- Imagen: `<img src="images/FAQ-Image.png">`
- Agregar preguntas:
```html
<div class="faq-question">
    <h4>¿Tu pregunta?</h4>
    <p>Tu respuesta.</p>
</div>
```

### 8. Final CTA Section ([index.html:276-282](index.html#L276-L282))
Llamado a la acción final

---

## 🎨 Estilos específicos por sección

### FAQ Section ([styles.css:549-590](styles.css#L549-L590))

```css
.faq-layout {
    grid-template-columns: 40% 60%;  /* Proporción imagen/texto */
    gap: 60px;                       /* Espacio entre columnas */
}

.faq-image img {
    transform: rotate(-8deg);        /* Rotación de imagen */
    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.faq-question h4 {
    font-size: 24px;
    color: var(--black);
}
```

### Testimonials Layout ([styles.css:251-316](styles.css#L251-L316))

```css
.testimonials-layout {
    grid-template-columns: 1fr 1.5fr 1fr;  /* 3 columnas */
    gap: 40px;
}
```

---

## 📱 Responsive Design

Los estilos mobile están en [styles.css:598-729](styles.css#L598-L729)

### Breakpoint principal

```css
@media (max-width: 768px) {
    /* Estilos para móviles */
}
```

### Cambios principales en mobile

- Columnas se vuelven una sola columna
- Tamaños de fuente se reducen
- Padding y spacing se ajustan
- Imágenes se redimensionan

### Ejemplo FAQ responsive ([styles.css:680-696](styles.css#L680-L696))

```css
@media (max-width: 768px) {
    .faq-layout {
        grid-template-columns: 1fr;  /* Una sola columna */
        gap: 30px;
    }

    .faq-image img {
        max-width: 300px;
        transform: rotate(-5deg);    /* Menos rotación */
    }
}
```

---

## 🎯 Guía rápida de modificaciones comunes

### Cambiar tema de colores completo

```css
/* styles.css líneas 16-24 */
:root {
    --orange-primary: #2563eb;    /* Azul en vez de naranja */
    --orange-secondary: #3b82f6;
    --green: #1d4ed8;             /* Azul oscuro para botones */
    --cream: #f3f4f6;             /* Gris claro */
}
```

### Cambiar todas las fuentes

```css
/* styles.css línea 9 */
body {
    font-family: 'Montserrat', sans-serif;  /* Nueva fuente principal */
}

/* styles.css línea 42, 52, etc. */
.display-title, .section-title {
    font-family: 'Poppins', sans-serif;  /* Nueva fuente para títulos */
}
```

### Agregar nueva sección

```html
<!-- En index.html -->
<section id="mi-seccion" class="section" style="background-color: #e7dfd8;">
    <div class="container">
        <h2 class="section-title">Mi título</h2>
        <p>Mi contenido...</p>
    </div>
</section>
```

### Cambiar espaciado general

```css
/* styles.css línea 30 */
.container {
    padding: 100px 40px;  /* Era 80px 40px */
}
```

---

## 🔧 Herramientas útiles

### Paletas de colores
- [Coolors.co](https://coolors.co) - Generador de paletas
- [Adobe Color](https://color.adobe.com) - Rueda de colores

### Fuentes
- [Google Fonts](https://fonts.google.com) - Catálogo de fuentes gratuitas
- [Font Pair](https://fontpair.co) - Combinaciones de fuentes

### Imágenes
- Todas las imágenes están en la carpeta `/images`
- Formato recomendado: PNG o JPG
- Optimizar antes de subir (usar TinyPNG)

---

## 📋 Checklist antes de publicar

- [ ] Revisar todos los links de botones CTA (`href="https://..."`)
- [ ] Probar página en mobile (responsive)
- [ ] Optimizar imágenes (peso < 500KB cada una)
- [ ] Revisar todos los textos (ortografía)
- [ ] Probar video (que cargue correctamente)
- [ ] Verificar que todos los colores sean consistentes
- [ ] Testear en diferentes navegadores

---

## 🐛 Troubleshooting

### Las fuentes no se ven bien
- Verificar que el link de Google Fonts esté en el `<head>`
- Limpiar caché del navegador

### Los colores no cambian
- Asegurarse de estar usando variables CSS (`var(--nombre-color)`)
- Verificar que no haya estilos inline sobreescribiendo

### Layout roto en mobile
- Revisar la sección `@media (max-width: 768px)` en styles.css
- Verificar que no haya anchos fijos (`width: 1000px`)

### Imagen no carga
- Verificar ruta relativa: `images/nombre.png`
- Verificar que el archivo exista en la carpeta
- Verificar mayúsculas/minúsculas en el nombre

---

## 📞 Soporte

Si necesitas ayuda adicional con el diseño, revisa:
- Variables de color: [styles.css:16-24](styles.css#L16-L24)
- Tipografías: [styles.css:41-77](styles.css#L41-L77)
- Botones: [styles.css:105-136](styles.css#L105-L136)
- Responsive: [styles.css:598-729](styles.css#L598-L729)

---

**Última actualización:** Enero 2026
**Versión:** 1.0
