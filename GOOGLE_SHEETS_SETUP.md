# Integración con Google Sheets - Sistema Dinámico

## 🎯 Ventajas del Sistema Dinámico

✅ **Agregar métricas solo editando tracking.js**
✅ **Google Apps Script detecta automáticamente nuevas propiedades**
✅ **Crea columnas dinámicamente sin tocar código**
✅ **Los UTMs se expanden automáticamente** (utm_source, utm_medium, etc.)

---

## 📋 Paso 1: Configurar Google Apps Script

### 1.1 Crear Google Sheet

1. Ir a: https://sheets.google.com
2. Crear **Nueva hoja de cálculo**
3. Nombrarla: **"Tracking Ebook Landing"**
4. No necesitas crear columnas manualmente (se crean automáticamente)

### 1.2 Abrir Apps Script

1. En el Google Sheet: **Extensiones** > **Apps Script**
2. Borrar el código por defecto
3. Pegar el código que está al final de este documento
4. Guardar (💾): Nombrar "Webhook Tracking Dinámico"

### 1.3 Desplegar como Aplicación Web

1. Click en **Implementar** > **Nueva implementación**
2. Tipo: **Aplicación web**
3. Descripción: "Webhook tracking dinámico"
4. Ejecutar como: **Yo**
5. Quién tiene acceso: **Cualquier usuario** ⚠️ (importante!)
6. Click en **Implementar**
7. **Autorizar** permisos (Avanzado > Ir a Webhook...)
8. **Copiar la URL** que aparece:
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```

---

## 📝 Paso 2: Configurar tracking.js

### 2.1 Abrir tracking.js

Abrir el archivo: [tracking.js](tracking.js)

### 2.2 Buscar esta línea (alrededor de la línea 564):

```javascript
const GOOGLE_SHEETS_WEBHOOK = ''; // Dejar vacío para desactivar
```

### 2.3 Pegar tu URL del webhook:

```javascript
const GOOGLE_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbx.../exec';
```

### 2.4 Guardar el archivo

¡Listo! El sistema está configurado.

---

## 🧪 Paso 3: Probar el Sistema

### Opción 1: Testing Manual

1. Abrir tu landing page: `http://localhost:3000`
2. Interactuar con la página:
   - Scrollear
   - Ver el video
   - Hacer clic en botones
3. **Cerrar la pestaña** (o ejecutar `TrackingDebug.sendToSheets()`)
4. Ir a tu Google Sheet
5. Deberías ver las filas con los datos

### Opción 2: Envío Manual desde Console

```javascript
// En Console (F12):
TrackingDebug.sendToSheets()
```

### Opción 3: Test desde Google Apps Script

1. En el editor de Apps Script
2. Seleccionar función: `testWebhook`
3. Click en **Ejecutar** (▶️)
4. Ir al Google Sheet
5. Deberías ver 2 filas de prueba

---

## 🔍 Cómo Funciona el Sistema Dinámico

### Estructura de Datos

Cuando el usuario cierra la página, se envía este JSON:

```json
{
  "events": [
    {
      "event": "section_view",
      "data": {
        "section_id": "hero",
        "section_name": "Hero - Título Principal",
        "section_order": 1,
        "time_on_page": 5,
        "user_id": "a3b2c1d4-..."
      },
      "timestamp": "2026-01-10T16:30:00.000Z",
      "url": "http://localhost:3000/",
      "referrer": "https://instagram.com/",
      "utm": {
        "utm_source": "instagram",
        "utm_medium": "post",
        "utm_campaign": "lanzamiento"
      },
      "user_id": "a3b2c1d4-..."
    }
  ],
  "session_info": {
    "user_id": "a3b2c1d4-...",
    "user_agent": "Mozilla/5.0...",
    "screen_resolution": "1920x1080",
    "language": "es-AR",
    "session_duration": 45,
    "total_events": 12
  }
}
```

### Aplanado Automático

El script de Google Apps Script **aplana** automáticamente los objetos anidados:

**Antes (JSON):**
```json
{
  "utm": {
    "utm_source": "instagram",
    "utm_medium": "post"
  }
}
```

**Después (columnas en Sheet):**
- Columna `utm_utm_source` → "instagram"
- Columna `utm_utm_medium` → "post"

### Creación Dinámica de Columnas

1. Primera fila con datos → Crea headers: `timestamp`, `user_id`, `event_type`, `url`, `referrer`
2. Evento con `section_id` → Crea columna `section_id`
3. Evento con `button_text` → Crea columna `button_text`
4. Evento con `video_percent` → Crea columna `video_percent`
5. **Nuevos UTMs** → Crea columnas automáticamente

---

## ✨ Cómo Agregar Nuevas Métricas

### Ejemplo 1: Agregar "Device Type"

**Solo editar tracking.js:**

Buscar la función `EventBackup.save()` (línea ~161):

```javascript
save: function(eventName, eventData) {
  try {
    const backup = this.getAll();
    backup.push({
      event: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer || '(direct)',
      device_type: this.getDeviceType(),  // ← AGREGAR ESTO
      utm: UTMManager.getParams(),
      user_id: UserIDManager.getUserID()
    });
```

Y agregar la función helper:

```javascript
getDeviceType: function() {
  const ua = navigator.userAgent;
  if (/mobile/i.test(ua)) return 'mobile';
  if (/tablet/i.test(ua)) return 'tablet';
  return 'desktop';
}
```

**¡Eso es todo!** Google Sheets automáticamente creará la columna `device_type`.

---

### Ejemplo 2: Agregar "Browser Name"

```javascript
save: function(eventName, eventData) {
  try {
    const backup = this.getAll();
    backup.push({
      event: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      referrer: document.referrer || '(direct)',
      browser: this.getBrowserName(),  // ← AGREGAR ESTO
      utm: UTMManager.getParams(),
      user_id: UserIDManager.getUserID()
    });
```

Helper:

```javascript
getBrowserName: function() {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edge')) return 'Edge';
  return 'Other';
}
```

**Automáticamente** aparecerá columna `browser` en Google Sheets.

---

### Ejemplo 3: Agregar Datos Dentro de `data`

Si querés agregar métricas específicas de un evento:

```javascript
trackSectionView: function(sectionData) {
  const eventData = {
    section_id: sectionData.id,
    section_name: sectionData.name,
    section_order: this.sections.findIndex(s => s.id === sectionData.id) + 1,
    time_on_page: this.getTimeOnPage(),
    user_id: UserIDManager.getUserID(),
    viewport_width: window.innerWidth,  // ← NUEVO
    scroll_percentage: this.getScrollPercentage()  // ← NUEVO
  };
```

Aparecerán columnas:
- `viewport_width`
- `scroll_percentage`

---

## 📊 Estructura Final del Google Sheet

Con el sistema dinámico, las columnas se crearán automáticamente según los datos:

| timestamp | user_id | event_type | url | referrer | utm_utm_source | utm_utm_medium | section_id | section_name | button_text | video_percent | session_user_agent | session_screen_resolution |
|-----------|---------|------------|-----|----------|----------------|----------------|------------|--------------|-------------|---------------|-------------------|--------------------------|
| 2026-01-10... | abc-123 | section_view | http://... | https://instagram... | instagram | post | hero | Hero - Título... | | | Mozilla/5.0... | 1920x1080 |
| 2026-01-10... | abc-123 | video_start | http://... | https://instagram... | instagram | post | | | | 0 | Mozilla/5.0... | 1920x1080 |
| 2026-01-10... | abc-123 | cta_click | http://... | https://instagram... | instagram | post | hero | | QUIERO MI EBOOK | | Mozilla/5.0... | 1920x1080 |

---

## 🔧 Funciones de Debug

### Ver estado del sync:

```javascript
TrackingDebug.info()
```

Muestra:
```
=== TRACKING DEBUG INFO ===
User ID: a3b2c1d4-5678-4abc-9def-123456789abc
UTMs: {utm_source: 'instagram', utm_medium: 'post'}
Eventos en backup: 12
Google Sheets sync: Activado
==========================
```

### Enviar manualmente a Sheets:

```javascript
TrackingDebug.sendToSheets()
```

Envía todos los eventos inmediatamente sin esperar a cerrar la pestaña.

### Exportar backup local:

```javascript
TrackingDebug.exportBackup()
```

Descarga JSON con todos los eventos.

---

## ⚠️ Troubleshooting

### Problema: No llegan datos a Google Sheets

**Soluciones:**
1. Verificar que la URL del webhook esté correcta en tracking.js (línea 564)
2. Verificar que el webhook esté desplegado como "Cualquier usuario"
3. Probar con `TrackingDebug.sendToSheets()` y ver errores en Console
4. Verificar en Google Apps Script > Ejecuciones (ver logs)

### Problema: Columnas con nombres raros (utm_utm_source)

Esto es **normal** porque el script aplana objetos anidados. Si querés evitarlo:

En tracking.js, cambiar:
```javascript
utm: UTMManager.getParams()  // ← Objeto anidado
```

Por:
```javascript
utm_source: UTMManager.getParams().utm_source || '',
utm_medium: UTMManager.getParams().utm_medium || '',
utm_campaign: UTMManager.getParams().utm_campaign || '',
utm_content: UTMManager.getParams().utm_content || ''
```

### Problema: Demasiadas columnas

Si tenés demasiadas columnas, podés:
1. Filtrar qué propiedades enviar en tracking.js
2. Crear múltiples hojas en el Google Sheet (una por tipo de evento)

---

## 📝 Código de Google Apps Script

Copiar este código completo en Google Apps Script:

```javascript
/**
 * Webhook Dinámico para Tracking
 * Crea columnas automáticamente según los datos recibidos
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Inicializar headers si la hoja está vacía
    if (sheet.getLastRow() === 0) {
      initializeHeaders(sheet);
    }

    // Procesar eventos
    if (Array.isArray(data.events)) {
      data.events.forEach(event => {
        insertEventRow(sheet, event, data.session_info);
      });
    } else {
      insertEventRow(sheet, data, null);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Datos guardados correctamente',
      rows_added: Array.isArray(data.events) ? data.events.length : 1
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function initializeHeaders(sheet) {
  const headers = ['timestamp', 'user_id', 'event_type', 'url', 'referrer'];
  sheet.appendRow(headers);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#4285f4');
  headerRange.setFontColor('#ffffff');
}

function flattenObject(obj, prefix = '') {
  let flattened = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}_${key}` : key;
      if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(flattened, flattenObject(value, newKey));
      } else if (Array.isArray(value)) {
        flattened[newKey] = JSON.stringify(value);
      } else {
        flattened[newKey] = value;
      }
    }
  }
  return flattened;
}

function insertEventRow(sheet, event, sessionInfo) {
  const combinedData = {
    timestamp: event.timestamp || new Date().toISOString(),
    user_id: event.user_id,
    event_type: event.event,
    url: event.url,
    referrer: event.referrer || '',
    ...flattenObject(event.data || {}),
    ...flattenObject(event.utm || {}, 'utm'),
    ...flattenObject(sessionInfo || {}, 'session')
  };

  const lastCol = sheet.getLastColumn();
  const headers = lastCol > 0 ? sheet.getRange(1, 1, 1, lastCol).getValues()[0] : [];

  const newColumns = [];
  Object.keys(combinedData).forEach(key => {
    if (!headers.includes(key)) {
      newColumns.push(key);
    }
  });

  if (newColumns.length > 0) {
    const newHeaderRange = sheet.getRange(1, lastCol + 1, 1, newColumns.length);
    newHeaderRange.setValues([newColumns]);
    newHeaderRange.setFontWeight('bold');
    newHeaderRange.setBackground('#4285f4');
    newHeaderRange.setFontColor('#ffffff');

    const updatedLastCol = sheet.getLastColumn();
    const updatedHeaders = sheet.getRange(1, 1, 1, updatedLastCol).getValues()[0];
    headers.length = 0;
    headers.push(...updatedHeaders);
  }

  const row = headers.map(header => {
    const value = combinedData[header];
    return value !== undefined ? value : '';
  });

  sheet.appendRow(row);
}

function testWebhook() {
  const testData = {
    events: [
      {
        event: 'section_view',
        data: {
          section_id: 'hero',
          section_name: 'Hero - Título Principal',
          section_order: 1,
          time_on_page: 5
        },
        timestamp: new Date().toISOString(),
        url: 'http://localhost:3000/',
        referrer: 'https://instagram.com/',
        utm: {
          utm_source: 'instagram',
          utm_medium: 'post',
          utm_campaign: 'lanzamiento',
          utm_content: 'carrusel1'
        },
        user_id: 'test-user-123'
      },
      {
        event: 'cta_click',
        data: {
          button_text: 'QUIERO MI EBOOK',
          section_id: 'hero',
          button_position: 1,
          time_on_page: 15
        },
        timestamp: new Date().toISOString(),
        url: 'http://localhost:3000/',
        referrer: 'https://instagram.com/',
        utm: {
          utm_source: 'instagram',
          utm_medium: 'post'
        },
        user_id: 'test-user-123'
      }
    ],
    session_info: {
      user_id: 'test-user-123',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      screen_resolution: '1920x1080',
      language: 'es-AR'
    }
  };

  const e = { postData: { contents: JSON.stringify(testData) } };
  const result = doPost(e);
  Logger.log(result.getContent());
}
```

---

## ✅ Resumen

**Para agregar nuevas métricas:**
1. Editar solo [tracking.js](tracking.js)
2. Agregar propiedades en `EventBackup.save()` o en los `eventData` de cada tracker
3. Guardar y recargar la página
4. Las columnas se crean automáticamente en Google Sheets

**No necesitas:**
- ❌ Modificar Google Apps Script
- ❌ Crear columnas manualmente
- ❌ Reconfigurar nada

**¡El sistema es completamente dinámico!** 🚀
