# Queries de Análisis - Sistema de Tracking

Este documento contiene queries SQL y funciones de Google Sheets para analizar los datos de tracking capturados.

---

## 📊 Estructura de Datos

Cada evento capturado tiene:

| Campo | Descripción | Ejemplo |
|-------|-------------|---------|
| `user_id` | ID único del usuario (persiste entre sesiones) | `abc-123-def-456` |
| `session_id` | ID único de la sesión (diferente cada visita) | `abc-123-def-456_1705234567_x7k9m2` |
| `timestamp` | Fecha y hora del evento | `2026-01-11T14:30:00.000Z` |
| `event` | Tipo de evento | `section_view`, `video_start`, `cta_click`, etc. |
| `url` | URL de la página | `http://localhost:3000/?utm_source=instagram` |
| `referrer` | De dónde vino el usuario | `https://instagram.com/` |
| `utm_utm_source` | Fuente del tráfico | `instagram`, `facebook`, `email` |
| `utm_utm_medium` | Medio del tráfico | `post`, `story`, `ad` |
| `utm_utm_campaign` | Nombre de campaña | `lanzamiento_ebook` |

---

## 🔍 Queries SQL (si exportas a base de datos)

### 1. Contar sesiones por usuario

```sql
-- Cuántas veces visitó cada usuario
SELECT
  user_id,
  COUNT(DISTINCT session_id) as total_sessions,
  MIN(timestamp) as first_visit,
  MAX(timestamp) as last_visit,
  DATEDIFF(MAX(timestamp), MIN(timestamp)) as days_between_visits
FROM tracking_data
GROUP BY user_id
ORDER BY total_sessions DESC;
```

**Resultado esperado:**
```
user_id           | total_sessions | first_visit  | last_visit   | days_between_visits
abc-123-def       | 3              | 2026-01-10   | 2026-01-12   | 2
xyz-789-ghi       | 1              | 2026-01-11   | 2026-01-11   | 0
```

---

### 2. Ver journey completo de un usuario específico

```sql
-- Ver todas las acciones de un usuario en orden cronológico
SELECT
  session_id,
  timestamp,
  event,
  data_section_id,
  data_button_text,
  utm_utm_source,
  utm_utm_medium
FROM tracking_data
WHERE user_id = 'abc-123-def'
ORDER BY timestamp ASC;
```

**Uso:** Cambia `'abc-123-def'` por el user_id que quieras analizar.

---

### 3. Tasa de conversión por sesión

```sql
-- ¿Qué % de sesiones terminan en compra?
SELECT
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(DISTINCT CASE WHEN event = 'purchase' THEN session_id END) as converted_sessions,
  ROUND(
    (COUNT(DISTINCT CASE WHEN event = 'purchase' THEN session_id END) * 100.0 /
     COUNT(DISTINCT session_id)),
    2
  ) as conversion_rate_percent
FROM tracking_data;
```

**Resultado esperado:**
```
total_sessions | converted_sessions | conversion_rate_percent
100            | 8                  | 8.00
```

---

### 4. Tasa de conversión por usuario

```sql
-- ¿Qué % de usuarios únicos compraron?
SELECT
  COUNT(DISTINCT user_id) as total_users,
  COUNT(DISTINCT CASE WHEN event = 'purchase' THEN user_id END) as converted_users,
  ROUND(
    (COUNT(DISTINCT CASE WHEN event = 'purchase' THEN user_id END) * 100.0 /
     COUNT(DISTINCT user_id)),
    2
  ) as conversion_rate_percent
FROM tracking_data;
```

---

### 5. Tiempo promedio hasta conversión

```sql
-- ¿Cuánto tiempo pasa entre la primera visita y la compra?
WITH first_visit AS (
  SELECT
    user_id,
    MIN(timestamp) as first_timestamp
  FROM tracking_data
  GROUP BY user_id
),
purchase_time AS (
  SELECT
    user_id,
    timestamp as purchase_timestamp
  FROM tracking_data
  WHERE event = 'purchase'
)
SELECT
  f.user_id,
  f.first_timestamp,
  p.purchase_timestamp,
  TIMESTAMPDIFF(HOUR, f.first_timestamp, p.purchase_timestamp) as hours_to_convert,
  TIMESTAMPDIFF(DAY, f.first_timestamp, p.purchase_timestamp) as days_to_convert
FROM first_visit f
JOIN purchase_time p ON f.user_id = p.user_id
ORDER BY hours_to_convert DESC;
```

---

### 6. Performance por fuente de tráfico (UTM)

```sql
-- ¿Qué fuente de tráfico convierte mejor?
SELECT
  utm_utm_source,
  utm_utm_medium,
  COUNT(DISTINCT session_id) as total_sessions,
  COUNT(DISTINCT CASE WHEN event = 'cta_click' THEN session_id END) as sessions_with_cta_click,
  COUNT(DISTINCT CASE WHEN event = 'purchase' THEN session_id END) as sessions_with_purchase,
  ROUND(
    (COUNT(DISTINCT CASE WHEN event = 'cta_click' THEN session_id END) * 100.0 /
     COUNT(DISTINCT session_id)),
    2
  ) as cta_click_rate,
  ROUND(
    (COUNT(DISTINCT CASE WHEN event = 'purchase' THEN session_id END) * 100.0 /
     COUNT(DISTINCT session_id)),
    2
  ) as conversion_rate
FROM tracking_data
WHERE utm_utm_source IS NOT NULL
GROUP BY utm_utm_source, utm_utm_medium
ORDER BY conversion_rate DESC;
```

**Resultado esperado:**
```
utm_source | utm_medium | total_sessions | cta_click_rate | conversion_rate
instagram  | story      | 45             | 28.89          | 12.00
instagram  | post       | 30             | 20.00          | 6.67
facebook   | ad         | 25             | 32.00          | 8.00
```

---

### 7. Usuarios que volvieron pero no compraron

```sql
-- Identificar usuarios para remarketing
SELECT
  user_id,
  COUNT(DISTINCT session_id) as total_sessions,
  MAX(timestamp) as last_visit,
  DATEDIFF(NOW(), MAX(timestamp)) as days_since_last_visit
FROM tracking_data
WHERE user_id NOT IN (
  SELECT DISTINCT user_id
  FROM tracking_data
  WHERE event = 'purchase'
)
GROUP BY user_id
HAVING total_sessions >= 2
ORDER BY days_since_last_visit ASC;
```

---

### 8. Análisis de scroll depth

```sql
-- ¿Hasta dónde scrollean los usuarios?
SELECT
  data_section_name,
  data_section_order,
  COUNT(DISTINCT session_id) as sessions_reached,
  ROUND(
    (COUNT(DISTINCT session_id) * 100.0 /
     (SELECT COUNT(DISTINCT session_id) FROM tracking_data)),
    2
  ) as percent_reached
FROM tracking_data
WHERE event = 'section_view'
GROUP BY data_section_name, data_section_order
ORDER BY data_section_order ASC;
```

**Resultado esperado:**
```
section_name           | section_order | sessions_reached | percent_reached
Hero - Título          | 1             | 100              | 100.00
Beneficios             | 2             | 92               | 92.00
Video 3 Tips           | 3             | 78               | 78.00
Testimonios            | 4             | 65               | 65.00
Precio                 | 5             | 55               | 55.00
```

---

### 9. Engagement de video

```sql
-- ¿Qué % de usuarios ven el video completo?
SELECT
  COUNT(DISTINCT CASE WHEN event = 'video_start' THEN session_id END) as video_started,
  COUNT(DISTINCT CASE WHEN event = 'video_progress' AND data_video_percent >= 25 THEN session_id END) as reached_25,
  COUNT(DISTINCT CASE WHEN event = 'video_progress' AND data_video_percent >= 50 THEN session_id END) as reached_50,
  COUNT(DISTINCT CASE WHEN event = 'video_progress' AND data_video_percent >= 75 THEN session_id END) as reached_75,
  COUNT(DISTINCT CASE WHEN event = 'video_progress' AND data_video_percent >= 100 THEN session_id END) as reached_100,
  ROUND(
    (COUNT(DISTINCT CASE WHEN event = 'video_progress' AND data_video_percent >= 50 THEN session_id END) * 100.0 /
     COUNT(DISTINCT CASE WHEN event = 'video_start' THEN session_id END)),
    2
  ) as completion_rate_50,
  ROUND(
    (COUNT(DISTINCT CASE WHEN event = 'video_progress' AND data_video_percent >= 100 THEN session_id END) * 100.0 /
     COUNT(DISTINCT CASE WHEN event = 'video_start' THEN session_id END)),
    2
  ) as completion_rate_100
FROM tracking_data;
```

---

### 10. CTAs más efectivos

```sql
-- ¿Qué botones generan más clics?
SELECT
  data_button_text,
  data_section_id,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT session_id) as unique_sessions,
  ROUND(AVG(data_time_on_page), 2) as avg_time_before_click
FROM tracking_data
WHERE event = 'cta_click'
GROUP BY data_button_text, data_section_id
ORDER BY total_clicks DESC;
```

---

## 📈 Fórmulas para Google Sheets

Si trabajás directamente en Google Sheets, usá estas fórmulas:

### 1. Contar usuarios únicos

```
=UNIQUE(FILTER(B:B, B:B<>""))
=COUNTA(UNIQUE(FILTER(B:B, B:B<>"")))
```

Donde `B:B` es la columna de `user_id`.

---

### 2. Contar sesiones por usuario

Asumiendo:
- Columna A: `session_id`
- Columna B: `user_id`

```
=QUERY(A:B, "SELECT B, COUNT(A) GROUP BY B ORDER BY COUNT(A) DESC LABEL COUNT(A) 'Total Sessions'")
```

---

### 3. Tasa de conversión

```
=COUNTIFS(C:C, "purchase") / COUNTA(UNIQUE(A:A))
```

Donde:
- Columna A: `session_id`
- Columna C: `event_type`

---

### 4. Performance por UTM source

```
=QUERY(F:H, "SELECT F, COUNT(A) WHERE F IS NOT NULL GROUP BY F ORDER BY COUNT(A) DESC LABEL COUNT(A) 'Sessions'")
```

Donde:
- Columna F: `utm_utm_source`
- Columna A: `session_id`

---

### 5. Scroll depth por sección

```
=QUERY(C:D, "SELECT D, COUNT(C) WHERE C = 'section_view' GROUP BY D ORDER BY COUNT(C) DESC LABEL COUNT(C) 'Views'")
```

Donde:
- Columna C: `event_type`
- Columna D: `section_name`

---

## 🎯 Métricas Clave a Monitorear

### 1. Métricas de Adquisición
- **Usuarios únicos por fuente** (`utm_source`)
- **Costo por adquisición** (si usás ads pagos)
- **Tasa de rebote** (sesiones con solo 1 evento)

### 2. Métricas de Engagement
- **Tiempo promedio en página** (`session_duration`)
- **Scroll depth promedio** (sección más vista)
- **Tasa de reproducción de video** (% que inician video)
- **Tasa de finalización de video** (% que ven 100%)

### 3. Métricas de Conversión
- **Tasa de click en CTA** (sesiones con `cta_click` / total sesiones)
- **Tasa de conversión** (sesiones con `purchase` / total sesiones)
- **Tiempo hasta conversión** (primera visita → compra)
- **Sesiones promedio antes de compra**

### 4. Métricas de Retorno
- **Usuarios que regresan** (usuarios con >1 sesión)
- **Días entre visitas**
- **Tasa de conversión en visita 1 vs visita 2+**

---

## 📊 Dashboard Recomendado en Google Sheets

Creá una pestaña "Dashboard" con estas métricas:

```
╔════════════════════════════════════════════════════╗
║           DASHBOARD DE TRACKING - EBOOK           ║
╠════════════════════════════════════════════════════╣
║ ADQUISICIÓN                                        ║
║ • Total usuarios únicos: [fórmula COUNTA(UNIQUE)]║
║ • Total sesiones: [fórmula COUNTA(UNIQUE)]       ║
║ • Usuarios por fuente: [tabla QUERY utm_source]  ║
╠════════════════════════════════════════════════════╣
║ ENGAGEMENT                                         ║
║ • Tiempo promedio en página: [AVG duration]       ║
║ • Scroll depth (hasta pricing): [%]               ║
║ • Video iniciado: [%]                             ║
║ • Video completado: [%]                           ║
╠════════════════════════════════════════════════════╣
║ CONVERSIÓN                                         ║
║ • Clicks en CTA: [COUNTIF cta_click]             ║
║ • Compras: [COUNTIF purchase]                     ║
║ • Tasa de conversión: [%]                         ║
║ • Revenue total: [SUM]                            ║
╠════════════════════════════════════════════════════╣
║ TOP PERFORMERS                                     ║
║ • Mejor fuente de tráfico: [QUERY]               ║
║ • Mejor CTA: [QUERY button_text]                 ║
║ • Sección con más drop-off: [análisis manual]    ║
╚════════════════════════════════════════════════════╝
```

---

## 🚀 Análisis Avanzados

### Cohort Analysis (Análisis por Cohorte)

Agrupar usuarios por fecha de primera visita y ver cómo se comportan:

```sql
WITH first_visit_date AS (
  SELECT
    user_id,
    DATE(MIN(timestamp)) as cohort_date
  FROM tracking_data
  GROUP BY user_id
)
SELECT
  f.cohort_date,
  COUNT(DISTINCT f.user_id) as cohort_size,
  COUNT(DISTINCT CASE WHEN t.event = 'purchase' THEN t.user_id END) as converted,
  ROUND(
    (COUNT(DISTINCT CASE WHEN t.event = 'purchase' THEN t.user_id END) * 100.0 /
     COUNT(DISTINCT f.user_id)),
    2
  ) as conversion_rate
FROM first_visit_date f
LEFT JOIN tracking_data t ON f.user_id = t.user_id
GROUP BY f.cohort_date
ORDER BY f.cohort_date DESC;
```

### Funnel Analysis

```sql
SELECT
  COUNT(DISTINCT CASE WHEN event = 'section_view' AND data_section_id = 'hero' THEN session_id END) as step_1_hero,
  COUNT(DISTINCT CASE WHEN event = 'section_view' AND data_section_id = 'video' THEN session_id END) as step_2_video,
  COUNT(DISTINCT CASE WHEN event = 'video_start' THEN session_id END) as step_3_video_start,
  COUNT(DISTINCT CASE WHEN event = 'section_view' AND data_section_id = 'pricing' THEN session_id END) as step_4_pricing,
  COUNT(DISTINCT CASE WHEN event = 'cta_click' THEN session_id END) as step_5_cta_click,
  COUNT(DISTINCT CASE WHEN event = 'purchase' THEN session_id END) as step_6_purchase
FROM tracking_data;
```

---

## 💡 Tips

1. **Exportar datos regularmente**: Google Sheets tiene límite de 10M de celdas
2. **Crear tabla dinámica**: Muy útil para análisis rápidos
3. **Automatizar reportes**: Usar Google Apps Script para enviar reportes por email
4. **Comparar periodos**: Siempre comparar semana vs semana, mes vs mes
5. **Segmentar por dispositivo**: Analizar `session_user_agent` para mobile vs desktop

---

¿Necesitás ayuda implementando alguna de estas queries? 🚀
