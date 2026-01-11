# Checklist de Testing - Sistema de Tracking Completo

Esta guía te ayudará a verificar que todo el sistema de tracking esté funcionando correctamente antes de lanzar tu campaña en Instagram.

---

## Pre-requisitos

Antes de comenzar el testing, asegurate de tener:

- [ ] Landing page publicada y accesible en un dominio
- [ ] Google Analytics 4 configurado (Measurement ID: `G-FEG2S0X03D`)
- [ ] Archivos [index.html](index.html) y [tracking.js](tracking.js) en el servidor
- [ ] Navegador con DevTools (Chrome, Firefox o Edge)
- [ ] Acceso a la cuenta de Google Analytics 4

---

## FASE 1: Testing Básico (Instalación)

### 1.1 Verificar carga de archivos

- [ ] **Abrir la landing page** en el navegador
- [ ] **Abrir DevTools** (presionar `F12` o click derecho > Inspeccionar)
- [ ] Ir a la pestaña **Network** (Red)
- [ ] Recargar la página (`Ctrl+R` o `Cmd+R`)
- [ ] Verificar que aparezcan estos archivos:
  - [ ] `gtag/js?id=G-FEG2S0X03D` (Google Analytics)
  - [ ] `tracking.js` (tu script personalizado)
  - [ ] Ambos deben tener status **200 OK**

**Si algo falla:**
- Verificar rutas de archivos
- Verificar que el servidor esté sirviendo los archivos correctamente
- Verificar que no haya errores de CORS

---

### 1.2 Verificar inicialización del sistema

- [ ] En DevTools, ir a la pestaña **Console**
- [ ] Deberías ver estos mensajes:
  - [ ] `✅ Sistema de tracking inicializado correctamente`
  - [ ] `📊 UTMs capturados: ...` (puede estar vacío si no hay UTMs)
  - [ ] `💡 Usa TrackingDebug.info() para ver el estado actual`
- [ ] **NO debe haber errores rojos** en la consola

**Si hay errores:**
- Leer el mensaje de error completo
- Verificar que el código de tracking.js esté bien copiado
- Verificar que gtag esté definido (puede tardar 1-2 segundos)

---

### 1.3 Verificar Google Analytics en Tiempo Real

- [ ] Abrir **Google Analytics 4** en otra pestaña
- [ ] Ir a: **Informes** > **Tiempo real** > **Vista general**
- [ ] Deberías ver:
  - [ ] **1 usuario activo** (vos)
  - [ ] Evento `page_view` registrado
  - [ ] Página actual: tu URL

**Si no aparece:**
- Esperar 1-2 minutos (puede haber delay)
- Verificar que el Measurement ID sea `G-FEG2S0X03D`
- Verificar que no tengas AdBlocker activo
- Probar en modo incógnito

---

## FASE 2: Testing de Scroll Tracking

### 2.1 Verificar tracking de secciones

- [ ] Scrollear **lentamente** por toda la landing page
- [ ] En la **Console de DevTools**, deberías ver aparecer progresivamente:
  - [ ] `Sección vista: Hero - Título Principal`
  - [ ] `Sección vista: Beneficios`
  - [ ] `Sección vista: Video 3 Tips`
  - [ ] `Sección vista: Testimonios`
  - [ ] `Sección vista: Precio`
  - [ ] `Sección vista: Para Quién Es`
  - [ ] `Sección vista: Por Qué Lo Creé`
  - [ ] `Sección vista: Módulos`
  - [ ] `Sección vista: FAQ`
  - [ ] `Sección vista: CTA Final`
- [ ] Total: **10 mensajes** (uno por cada sección)

### 2.2 Verificar eventos en GA4 Tiempo Real

- [ ] En **GA4 Tiempo Real**, ir a la pestaña **Eventos**
- [ ] Deberías ver el evento `section_view`
- [ ] Hacer clic en `section_view` para ver detalles:
  - [ ] Parámetro `section_id` con valores (hero, benefits, video, etc.)
  - [ ] Parámetro `section_name` con nombres legibles
  - [ ] Parámetro `section_order` con números (1, 2, 3, etc.)

**Si no aparecen los eventos:**
- Verificar que las secciones tengan los IDs correctos en el HTML
- Verificar en Console que aparezcan los mensajes "Sección vista:"
- Esperar 1-2 minutos y recargar GA4

---

## FASE 3: Testing de Video Tracking

### 3.1 Verificar eventos de video

- [ ] Scrollear hasta la **sección del video**
- [ ] **Reproducir el video** haciendo clic en play
- [ ] En **Console**, deberías ver:
  - [ ] `Video: video_start - 0%`
- [ ] Dejar el video reproducir hasta el **25%**:
  - [ ] `Video: video_progress - 25%`
- [ ] Continuar hasta el **50%**:
  - [ ] `Video: video_progress - 50%`
- [ ] Continuar hasta el **75%**:
  - [ ] `Video: video_progress - 75%`
- [ ] Dejar que termine el video (**100%**):
  - [ ] `Video: video_progress - 100%`

**Total:** 5 mensajes en Console (0%, 25%, 50%, 75%, 100%)

### 3.2 Verificar eventos de video en GA4

- [ ] En **GA4 Tiempo Real** > **Eventos**
- [ ] Deberías ver:
  - [ ] Evento `video_start` (1 vez)
  - [ ] Evento `video_progress` (4 veces: 25%, 50%, 75%, 100%)
- [ ] Hacer clic en `video_progress` para ver detalles:
  - [ ] Parámetro `video_percent` con valores (25, 50, 75, 100)
  - [ ] Parámetro `video_title`: "3 Tips Branding"

**Si no aparecen:**
- Verificar que el video tenga la clase `.video-player`
- Verificar en Console que aparezcan los mensajes
- Intentar con otro navegador

---

## FASE 4: Testing de CTAs

### 4.1 Verificar tracking de clics en botones

Hay **7 botones CTA** en total. Vamos a probar al menos 3:

**Botón 1: Hero Section**
- [ ] Hacer clic en **"QUIERO MI EBOOK POR SÓLO $18.000"**
- [ ] En **Console**, debería aparecer:
  - [ ] `CTA click: QUIERO MI EBOOK POR SÓLO $18.000 en sección: hero`
- [ ] Cerrar la pestaña nueva que se abrió (o volver atrás)

**Botón 2: Benefits Section**
- [ ] Hacer clic en **"Sí, quiero mejorar mi marca"**
- [ ] En **Console**, debería aparecer:
  - [ ] `CTA click: Sí, quiero mejorar mi marca en sección: benefits`
- [ ] Cerrar la pestaña nueva

**Botón 3: Pricing Section**
- [ ] Hacer clic en **"Lo quiero"**
- [ ] En **Console**, debería aparecer:
  - [ ] `CTA click: Lo quiero en sección: pricing`
- [ ] Cerrar la pestaña nueva

### 4.2 Verificar eventos de CTA en GA4

- [ ] En **GA4 Tiempo Real** > **Eventos**
- [ ] Deberías ver el evento `cta_click`
- [ ] Debería aparecer **3 veces** (o más si clickeaste más botones)
- [ ] Hacer clic en `cta_click` para ver detalles:
  - [ ] Parámetro `button_text` con el texto del botón
  - [ ] Parámetro `section_id` con la sección (hero, benefits, pricing, etc.)
  - [ ] Parámetro `button_position` con números (1, 2, 3, etc.)

**Si no aparecen:**
- Verificar que los botones tengan las clases `.cta-button` o `.btn-es-para-mi`
- Verificar en Console que aparezcan los mensajes
- Revisar si el evento tiene otro nombre

---

## FASE 5: Testing de UTMs

### 5.1 Probar captura de parámetros UTM

- [ ] **Cerrar todas las pestañas** de la landing page
- [ ] Abrir una **nueva pestaña en modo incógnito** (`Ctrl+Shift+N` o `Cmd+Shift+N`)
- [ ] Pegar esta URL (reemplazar `tudominio.com` con tu dominio real):
  ```
  https://tudominio.com/?utm_source=instagram&utm_medium=post&utm_campaign=test&utm_content=prueba
  ```
- [ ] Abrir **DevTools** (`F12`)
- [ ] Ir a **Console**
- [ ] Deberías ver:
  - [ ] `UTMs capturados: {utm_source: "instagram", utm_medium: "post", utm_campaign: "test", utm_content: "prueba"}`

### 5.2 Verificar persistencia de UTMs

- [ ] En **DevTools** > pestaña **Application** (o Aplicación)
- [ ] En el menú lateral, expandir **Session Storage**
- [ ] Click en tu dominio
- [ ] Deberías ver la key `utm_params` con el valor JSON de los UTMs
- [ ] Expandir también **Local Storage**
- [ ] Deberías ver la key `first_utm_params` con los UTMs + timestamp

### 5.3 Verificar que los UTMs se agregan a los botones CTA

- [ ] Con la URL con UTMs abierta, hacer clic **con botón derecho** en cualquier botón CTA
- [ ] Seleccionar **"Inspeccionar"** o **"Inspect"**
- [ ] En el HTML, buscar el atributo `href` del botón
- [ ] Debería ser algo como:
  ```html
  href="https://luciafiguls.systeme.io/ebookars?utm_source=instagram&utm_medium=post&utm_campaign=test&utm_content=prueba"
  ```
- [ ] Los UTMs deben estar **agregados a la URL de Systeme.io**

### 5.4 Verificar UTMs en GA4

- [ ] En **GA4 Tiempo Real** > **Vista general**
- [ ] Deberías ver tu usuario activo
- [ ] Click en el usuario
- [ ] Buscar información de **"Primera fuente"** o **"Source/Medium"**
- [ ] Debería aparecer: `instagram / post`

**Si no aparecen los UTMs:**
- Verificar que la URL tenga formato correcto (con `?` antes de utm_source)
- Verificar en Console que se hayan capturado
- Probar copiando y pegando la URL manualmente

---

## FASE 6: Testing de Backup Local

### 6.1 Verificar sistema de backup

- [ ] En **Console**, ejecutar:
  ```javascript
  TrackingDebug.info()
  ```
- [ ] Deberías ver un resumen con:
  - [ ] UTMs capturados
  - [ ] Secciones vistas
  - [ ] Cantidad de eventos en backup
  - [ ] Tiempo en página

### 6.2 Exportar backup de eventos

- [ ] En **Console**, ejecutar:
  ```javascript
  TrackingDebug.exportBackup()
  ```
- [ ] Debería descargarse un archivo `.json`
- [ ] Abrir el archivo JSON con un editor de texto
- [ ] Verificar que contenga:
  - [ ] Array de eventos
  - [ ] Cada evento con: `event`, `data`, `timestamp`, `url`, `utm`

---

## FASE 7: Testing de Conversión (Systeme.io)

**⚠️ Esta fase requiere configurar Systeme.io primero** (ver [CONFIGURACION_SYSTEME_IO.md](CONFIGURACION_SYSTEME_IO.md))

### 7.1 Hacer compra de prueba

- [ ] Desde la landing page (con UTMs), hacer clic en un botón CTA
- [ ] Completar el checkout en Systeme.io
  - [ ] Usar email de prueba
  - [ ] Usar tarjeta de prueba (o hacer compra real)
- [ ] Llegar a la **Thank You Page**

### 7.2 Verificar evento de conversión

- [ ] En la Thank You Page, abrir **DevTools** (`F12`)
- [ ] Ir a **Console**
- [ ] Deberías ver:
  - [ ] `✅ Conversión registrada en GA4:` con los datos de la orden
- [ ] En **GA4 Tiempo Real** > **Eventos**
- [ ] Deberías ver el evento `purchase`
- [ ] Hacer clic en `purchase` para ver:
  - [ ] `transaction_id`: ID de la orden
  - [ ] `value`: 18000
  - [ ] `currency`: ARS
  - [ ] `items`: Array con el ebook

### 7.3 Verificar conversión en GA4

- [ ] En **GA4**, ir a: **Informes** > **Monetización** > **Resumen de comercio electrónico**
- [ ] Esperar **5-10 minutos** (puede tardar)
- [ ] Debería aparecer:
  - [ ] 1 transacción
  - [ ] Ingresos: $18,000 ARS

**Si no aparece:**
- Verificar en Console que se haya enviado el evento
- Verificar que el Measurement ID en Systeme.io sea el mismo: `G-FEG2S0X03D`
- Esperar hasta 24 horas (reportes completos pueden tardar)

---

## FASE 8: Testing End-to-End (Completo)

Este es el test final que simula el recorrido completo de un usuario desde Instagram:

### 8.1 Simular usuario desde Instagram

- [ ] **Cerrar todas las pestañas** de la landing
- [ ] Abrir **modo incógnito**
- [ ] Crear URL de prueba con UTMs de Instagram:
  ```
  https://tudominio.com/?utm_source=instagram&utm_medium=post&utm_campaign=lanzamiento_ebook&utm_content=test_completo
  ```
- [ ] Abrir la URL
- [ ] Abrir **DevTools** y dejar abierta la pestaña **Console**

### 8.2 Recorrido completo del usuario

- [ ] Scrollear por toda la landing page (lentamente)
- [ ] Ver aparecer los 10 mensajes de "Sección vista:"
- [ ] Reproducir el video completo
- [ ] Ver aparecer los 5 mensajes de video (0%, 25%, 50%, 75%, 100%)
- [ ] Hacer clic en al menos 3 botones CTA diferentes
- [ ] Ver aparecer los mensajes "CTA click:"

### 8.3 Verificar en GA4 Tiempo Real

- [ ] Abrir **GA4** en otra pestaña
- [ ] Ir a **Tiempo real** > **Vista general**
- [ ] Deberías ver:
  - [ ] 1 usuario activo
  - [ ] Fuente: `instagram / post`
- [ ] Ir a **Tiempo real** > **Eventos**
- [ ] Deberías ver **todos estos eventos**:
  - [ ] `page_view`
  - [ ] `section_view` (10 veces)
  - [ ] `video_start` (1 vez)
  - [ ] `video_progress` (4 veces)
  - [ ] `cta_click` (3+ veces)

### 8.4 Exportar evidencia

- [ ] En Console, ejecutar:
  ```javascript
  TrackingDebug.exportBackup()
  ```
- [ ] Descargar el JSON como evidencia
- [ ] Tomar screenshot de GA4 Tiempo Real mostrando los eventos

---

## CHECKLIST FINAL - Pre-Lanzamiento

Antes de lanzar la campaña en Instagram, verificá:

### Configuración
- [ ] Google Analytics 4 configurado (Measurement ID: `G-FEG2S0X03D`)
- [ ] Código GA4 instalado en `<head>` de index.html
- [ ] Archivo tracking.js subido al servidor
- [ ] tracking.js vinculado en index.html
- [ ] Systeme.io Thank You Page configurada con código de conversión
- [ ] Hotjar comentado (para activar después)

### Testing Básico
- [ ] Landing page carga sin errores
- [ ] No hay errores rojos en Console
- [ ] Mensaje "Sistema de tracking inicializado" aparece
- [ ] Google Analytics muestra 1 usuario activo en Tiempo Real

### Testing de Eventos
- [ ] Scroll tracking funciona (10 secciones)
- [ ] Video tracking funciona (5 eventos: 0%, 25%, 50%, 75%, 100%)
- [ ] CTA tracking funciona (7 botones)
- [ ] Todos los eventos aparecen en GA4 Tiempo Real

### Testing de UTMs
- [ ] UTMs se capturan correctamente desde la URL
- [ ] UTMs se persisten en sessionStorage y localStorage
- [ ] UTMs se agregan automáticamente a los botones CTA
- [ ] GA4 muestra la fuente correcta (ej: instagram / post)

### Testing de Conversión
- [ ] Compra de prueba completada exitosamente
- [ ] Evento `purchase` aparece en Console de Thank You Page
- [ ] Evento `purchase` aparece en GA4 Tiempo Real
- [ ] Conversión aparece en GA4 (puede tardar hasta 24hs)

### Documentación
- [ ] URLs con UTM creadas para Instagram (mínimo 5-10)
- [ ] URLs acortadas con Bit.ly (opcional)
- [ ] Google Sheet creado para gestionar URLs
- [ ] Guía de Systeme.io revisada
- [ ] Guía de UTMs revisada

### Backup y Seguridad
- [ ] Backup de index.html original guardado
- [ ] Backup de eventos funciona (TrackingDebug.exportBackup())
- [ ] Screenshots de GA4 Tiempo Real guardados como evidencia

---

## Problemas Comunes y Soluciones

### Problema 1: No aparecen eventos en GA4

**Síntomas:**
- Console muestra los eventos correctamente
- Pero GA4 Tiempo Real no muestra nada

**Soluciones:**
1. Esperar 2-3 minutos (puede haber delay)
2. Verificar Measurement ID: debe ser `G-FEG2S0X03D`
3. Desactivar AdBlocker
4. Probar en modo incógnito
5. Verificar en GA4 > Configuración > Flujos de datos que esté activo

---

### Problema 2: UTMs no se capturan

**Síntomas:**
- En Console aparece: `UTMs capturados: {}` (vacío)
- GA4 muestra "direct / (none)"

**Soluciones:**
1. Verificar formato de URL: debe empezar con `?` antes de utm_source
2. Verificar que no haya espacios en la URL
3. Copiar y pegar la URL manualmente (no escribirla)
4. Verificar en DevTools > Application > Session Storage

---

### Problema 3: Video tracking no funciona

**Síntomas:**
- Al reproducir el video no aparecen mensajes en Console

**Soluciones:**
1. Verificar que el video tenga la clase `.video-player`
2. Verificar que el video cargue correctamente (sin errores)
3. Revisar si hay error en Console al cargar tracking.js
4. Probar en otro navegador

---

### Problema 4: Botones CTA no trackean

**Síntomas:**
- Al hacer clic en botones no aparece "CTA click:" en Console

**Soluciones:**
1. Verificar que los botones tengan clase `.cta-button` o `.btn-es-para-mi`
2. Verificar en DevTools que tracking.js esté cargado
3. Revisar Console en busca de errores de JavaScript
4. Verificar que los botones estén dentro de un `<section>` con ID

---

### Problema 5: Conversiones no aparecen en Systeme.io

**Síntomas:**
- Thank You Page no muestra mensaje de conversión en Console

**Soluciones:**
1. Verificar que agregaste el código en el lugar correcto de Systeme.io
2. Verificar Measurement ID en el código: `G-FEG2S0X03D`
3. Verificar sintaxis de variables: `{{order.id}}` vs `[order_id]`
4. Hacer clic derecho > Ver código fuente en Thank You Page
5. Contactar soporte de Systeme.io para confirmar sintaxis

---

## Contacto y Soporte

Si encontrás problemas que no podés resolver:

1. Exportar backup de eventos: `TrackingDebug.exportBackup()`
2. Tomar screenshots de Console y GA4
3. Anotar el paso exacto donde falla
4. Revisar las guías:
   - [CONFIGURACION_SYSTEME_IO.md](CONFIGURACION_SYSTEME_IO.md)
   - [URLS_UTM_ESTRATEGIA.md](URLS_UTM_ESTRATEGIA.md)

---

## ¡Todo Listo! 🚀

Si completaste todas las fases del testing, tu sistema de tracking está funcionando correctamente.

**Próximos pasos:**
1. Crear URLs con UTM para tus publicaciones de Instagram
2. Activar Hotjar cuando estés lista (descomentar código en index.html)
3. Lanzar campaña en Instagram
4. Monitorear datos en GA4 diariamente
5. Analizar qué contenidos convierten mejor
6. Optimizar según los datos

**¡Éxitos con el lanzamiento del ebook!** 📚✨
