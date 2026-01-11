# Sistema de Tracking Completo - Landing Page Ebook

## 🎯 Resumen

Se implementó un sistema completo de tracking para medir el tráfico desde Instagram (y otras fuentes) hacia tu landing page del ebook "De Invisible a Irresistible".

---

## ✅ ¿Qué se implementó?

### 1. Google Analytics 4 (GA4)
- ✅ Código instalado en [index.html](index.html)
- ✅ Measurement ID: `G-FEG2S0X03D`
- ✅ Configurado para capturar UTMs automáticamente
- ✅ Tracking de eventos personalizados

### 2. Sistema de Tracking Personalizado ([tracking.js](tracking.js))
- ✅ **Gestión de UTMs**: Captura y persiste parámetros utm_source, utm_medium, utm_campaign, utm_content
- ✅ **Scroll Tracking**: Detecta cuando el usuario ve cada una de las 10 secciones
- ✅ **Video Tracking Granular**: Registra reproducción al 0%, 25%, 50%, 75% y 100%
- ✅ **CTA Tracking**: Registra clics en los 7 botones de llamada a acción
- ✅ **Backup Local**: Guarda todos los eventos en localStorage como respaldo
- ✅ **Auto-append UTMs**: Agrega automáticamente los UTMs a los enlaces de Systeme.io

### 3. Hotjar (Preparado)
- ✅ Código agregado pero **comentado** en [index.html](index.html)
- ⏳ Listo para activar cuando quieras usar los 15 días gratuitos
- 📊 Permitirá ver heatmaps, scroll maps y grabar sesiones

### 4. Documentación Completa
- ✅ [CONFIGURACION_SYSTEME_IO.md](CONFIGURACION_SYSTEME_IO.md) - Guía para configurar conversiones
- ✅ [URLS_UTM_ESTRATEGIA.md](URLS_UTM_ESTRATEGIA.md) - Estrategia completa de UTMs
- ✅ [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) - Checklist de testing paso a paso

---

## 📊 Eventos que se están trackeando

| Evento | Descripción | Cuándo se dispara |
|--------|-------------|-------------------|
| `page_view` | Vista de página | Al cargar la landing |
| `section_view` | Vista de sección | Cuando una sección es visible al 50% |
| `video_start` | Inicio de video | Al reproducir el video |
| `video_progress` | Progreso de video | Al 25%, 50%, 75% y 100% |
| `cta_click` | Clic en botón CTA | Al hacer clic en cualquier botón |
| `purchase` | Compra realizada | En thank you page de Systeme.io |

---

## 📁 Archivos Modificados

### Archivos Principales
1. **[index.html](index.html)** - Landing page
   - ✅ Agregado código Google Analytics 4
   - ✅ Agregado código Hotjar (comentado)
   - ✅ Vinculado tracking.js
   - ✅ Eliminado código JavaScript antiguo

2. **[tracking.js](tracking.js)** - Sistema de tracking personalizado (NUEVO)
   - 5 módulos principales
   - Sistema modular y mantenible
   - Funciones de debug integradas

### Archivos de Documentación (NUEVOS)
3. **[CONFIGURACION_SYSTEME_IO.md](CONFIGURACION_SYSTEME_IO.md)**
   - Guía paso a paso para configurar thank you page
   - Código completo para copiar y pegar
   - Troubleshooting de problemas comunes

4. **[URLS_UTM_ESTRATEGIA.md](URLS_UTM_ESTRATEGIA.md)**
   - Estructura de UTMs para múltiples plataformas
   - Ejemplos de URLs para Instagram, Facebook, Email, etc.
   - Naming conventions y best practices
   - Plantilla de Google Sheets

5. **[TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)**
   - Checklist completo de testing en 8 fases
   - Instrucciones paso a paso
   - Solución de problemas comunes
   - Checklist pre-lanzamiento

---

## 🚀 Próximos Pasos

### PASO 1: Testing Local (AHORA)
Seguí el checklist completo: [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md)

**Resumen rápido:**
1. Abrí la landing en el navegador
2. Abrí DevTools (F12) > Console
3. Verificá que aparezca: "✅ Sistema de tracking inicializado"
4. Abrí GA4 > Tiempo Real > verificá que aparezca 1 usuario activo
5. Scrolleá por toda la página y verificá que aparezcan los eventos
6. Reproducí el video completo
7. Hacé clic en varios botones CTA

### PASO 2: Configurar Systeme.io (AHORA)
Seguí la guía: [CONFIGURACION_SYSTEME_IO.md](CONFIGURACION_SYSTEME_IO.md)

**Resumen rápido:**
1. Entrá a Systeme.io
2. Ir al producto del ebook
3. Configuración > Thank You Page > Custom Code
4. Copiar y pegar el código del archivo de configuración
5. Hacer compra de prueba
6. Verificar que aparezca el evento `purchase` en GA4

### PASO 3: Crear URLs para Instagram (AHORA)
Seguí la guía: [URLS_UTM_ESTRATEGIA.md](URLS_UTM_ESTRATEGIA.md)

**Resumen rápido:**
1. Usar Google Campaign URL Builder: https://ga-dev-tools.google/campaign-url-builder/
2. Crear URLs para:
   - Posts en feed (3-5 URLs)
   - Stories (5-10 URLs)
   - Reels (2-3 URLs)
   - Link en bio (1 URL permanente)
3. (Opcional) Acortar URLs con Bit.ly
4. Guardar en Google Sheet para organizar

### PASO 4: Configurar Conversiones en GA4 (AHORA)
1. Ir a GA4 > Configuración > Eventos
2. Buscar evento `cta_click`
3. Activar toggle "Marcar como conversión"
4. Buscar evento `purchase`
5. Activar toggle "Marcar como conversión"

### PASO 5: Lanzar Campaña (CUANDO ESTÉS LISTA)
1. Publicar posts/stories en Instagram con las URLs creadas
2. Monitorear GA4 > Tiempo Real para ver tráfico en vivo
3. Esperar 24-48 horas para ver datos completos en reportes
4. Analizar qué contenidos generan más tráfico y conversiones

### PASO 6: Activar Hotjar (CUANDO QUIERAS)
1. Crear cuenta en Hotjar: https://www.hotjar.com/
2. Copiar el Site ID
3. En [index.html](index.html), descomentar el código de Hotjar
4. Reemplazar `YOUR_HOTJAR_ID` con tu Site ID
5. Subir el archivo al servidor

---

## 🔧 Funciones de Debug Disponibles

En la Console del navegador (F12 > Console), podés usar estas funciones:

### Ver estado actual del tracking
```javascript
TrackingDebug.info()
```
Muestra: UTMs capturados, secciones vistas, cantidad de eventos, tiempo en página

### Exportar backup de eventos
```javascript
TrackingDebug.exportBackup()
```
Descarga un archivo JSON con todos los eventos registrados

### Ver UTMs capturados
```javascript
TrackingDebug.getUTMs()
```
Muestra los parámetros UTM de la sesión actual

### Ver secciones vistas
```javascript
TrackingDebug.getSectionsViewed()
```
Lista las secciones que el usuario ya vio

### Limpiar backup local
```javascript
TrackingDebug.clearBackup()
```
Elimina todos los eventos guardados en localStorage

---

## 📈 Cómo Ver los Datos en Google Analytics

### Vista Tiempo Real (Inmediato)
1. GA4 > Informes > Tiempo real > Vista general
2. Ver usuarios activos en este momento
3. Ver eventos en tiempo real

### Vista de Tráfico (24-48 horas después)
1. GA4 > Informes > Adquisición > Tráfico
2. Dimensión: Fuente/medio
3. Ver: instagram / post, facebook / ad, etc.

### Vista de Conversiones (24-48 horas después)
1. GA4 > Informes > Conversiones
2. Ver cantidad de conversiones por evento
3. Ver tasa de conversión

### Crear Reporte Personalizado
1. GA4 > Explorar > Análisis libre
2. Dimensiones: Fuente, Medio, Campaña, Contenido
3. Métricas: Usuarios, Sesiones, Conversiones, Ingresos
4. Filtro: Fuente = instagram (o la que quieras)

---

## 🎨 Estructura de las 10 Secciones Trackeadas

| # | ID | Nombre | Descripción |
|---|----|----|-------------|
| 1 | `hero` | Hero - Título Principal | Sección de apertura con CTA principal |
| 2 | `benefits` | Beneficios | Lista de beneficios del ebook |
| 3 | `video` | Video 3 Tips | Video con 3 tips de branding |
| 4 | `testimonials` | Testimonios | Testimonios de clientes |
| 5 | `pricing` | Precio | Tarjeta con precio del ebook |
| 6 | `for-who` | Para Quién Es | A quién está dirigido el ebook |
| 7 | `why` | Por Qué Lo Creé | Historia de creación del ebook |
| 8 | `modules` | Módulos | Contenido detallado del ebook |
| 9 | `faq` | FAQ | Preguntas frecuentes |
| 10 | `final-cta` | CTA Final | Llamado a acción final |

---

## 🔘 Los 7 Botones CTA Trackeados

| # | Texto del Botón | Sección |
|---|-----------------|---------|
| 1 | QUIERO MI EBOOK POR SÓLO $18.000 | Hero |
| 2 | Sí, quiero mejorar mi marca | Benefits |
| 3 | Quiero mi ebook con todos los tips | Video |
| 4 | Lo quiero | Pricing |
| 5 | ES PARA MÍ | For Who |
| 6 | Lo quiero | Modules |
| 7 | Lo quiero POR SÓLO $18.000 | Final CTA |

---

## 🎯 Métricas Clave a Monitorear

| Métrica | Objetivo | Cómo calcularlo |
|---------|----------|-----------------|
| **Tasa de conversión (landing → CTA)** | 25-35% | (Usuarios que hicieron clic en CTA / Usuarios totales) × 100 |
| **Tasa de conversión (CTA → compra)** | 8-15% | (Compras / Clics en CTA) × 100 |
| **Tasa de conversión total** | 2-5% | (Compras / Usuarios landing) × 100 |
| **Engagement de video (>50%)** | 50-60% | (Usuarios que vieron >50% / Usuarios que iniciaron video) × 100 |
| **Scroll depth (hasta pricing)** | 55-65% | (Usuarios que vieron pricing / Usuarios totales) × 100 |

---

## ❓ Preguntas Frecuentes

### ¿Cuándo voy a ver datos en Google Analytics?
- **Tiempo Real:** Inmediatamente (1-2 minutos de delay)
- **Reportes completos:** 24-48 horas

### ¿Tengo que crear nuevas URLs para cada post de Instagram?
No es obligatorio, pero es **altamente recomendado** si querés saber qué contenido específico funciona mejor. Podés reutilizar URLs si usás siempre el mismo tipo de contenido.

### ¿Los UTMs funcionan en links acortados (Bit.ly)?
Sí, los UTMs se mantienen aunque acortes la URL. Google Analytics los capturará igual.

### ¿Qué pasa si un usuario no tiene JavaScript habilitado?
El tracking no funcionará para ese usuario, pero son casos muy raros (< 1% de usuarios).

### ¿Hotjar es necesario o es opcional?
Es **opcional**. Google Analytics 4 ya te da todos los datos cuantitativos. Hotjar suma datos cualitativos (heatmaps, recordings) que son útiles pero no esenciales.

### ¿Puedo usar esto con Google Tag Manager en lugar de GA4 directo?
Sí, pero necesitarías reconfigurar todo. La implementación actual con GA4 directo es más simple y funciona perfectamente para este caso.

### ¿Cómo sé si el tracking está funcionando correctamente?
Seguí el checklist completo de testing: [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md). Si todos los checks pasan, está funcionando correctamente.

---

## 🛠️ Mantenimiento y Actualizaciones

### Si agregás nuevas secciones a la landing:
1. Abrir [tracking.js](tracking.js)
2. Buscar el array `sections` (línea ~152)
3. Agregar nueva sección con formato:
   ```javascript
   { id: 'nueva-seccion', name: 'Nombre Descriptivo' }
   ```

### Si agregás nuevos botones CTA:
No necesitás hacer nada. El sistema detecta automáticamente todos los botones con clase `.cta-button` o `.btn-es-para-mi`.

### Si cambiás el video:
No necesitás hacer nada. El sistema detecta automáticamente el elemento con clase `.video-player`.

---

## 📞 Soporte

Si tenés problemas:

1. **Primero:** Revisá [TESTING_CHECKLIST.md](TESTING_CHECKLIST.md) sección "Problemas Comunes"
2. **Segundo:** Ejecutá `TrackingDebug.info()` en Console y exportá el backup
3. **Tercero:** Tomá screenshots de Console y GA4
4. **Cuarto:** Revisá las guías específicas según el problema:
   - Problema con conversiones → [CONFIGURACION_SYSTEME_IO.md](CONFIGURACION_SYSTEME_IO.md)
   - Problema con UTMs → [URLS_UTM_ESTRATEGIA.md](URLS_UTM_ESTRATEGIA.md)

---

## ✨ Resumen Final

**Lo que tenés ahora:**
- ✅ Sistema completo de tracking instalado
- ✅ Google Analytics 4 configurado
- ✅ Tracking de scroll, video y CTAs
- ✅ Gestión automática de UTMs
- ✅ Sistema de backup local
- ✅ Documentación completa

**Lo que falta hacer:**
- ⏳ Testing completo (usar checklist)
- ⏳ Configurar Systeme.io thank you page
- ⏳ Crear URLs con UTM para Instagram
- ⏳ Configurar conversiones en GA4
- ⏳ Lanzar campaña

**Resultado esperado:**
Podrás ver en tiempo real:
- De qué posts de Instagram llega más tráfico
- Qué % de usuarios ven cada sección de tu landing
- Cuántos usuarios reproducen el video completo
- Qué botones CTA generan más clics
- Cuántas conversiones (compras) generaste
- ROI de tus campañas de Instagram

---

## 🚀 ¡Éxitos con el lanzamiento!

Todo el sistema está listo. Seguí los próximos pasos en orden y vas a tener datos valiosos sobre cómo interactúan los usuarios con tu landing page.

**Cualquier duda, revisá la documentación o ejecutá las funciones de debug en Console.**

¡A vender ebooks! 📚✨
