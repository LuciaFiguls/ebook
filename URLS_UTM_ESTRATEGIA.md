# Estrategia de URLs con UTM - Ebook Landing Page

Esta guía contiene la estructura completa de UTMs para trackear tráfico desde múltiples fuentes hacia tu landing page.

---

## ¿Qué son los parámetros UTM?

Los parámetros UTM son etiquetas que agregás al final de una URL para identificar de dónde viene el tráfico. Google Analytics los captura automáticamente.

**Formato:**
```
https://tudominio.com/?utm_source=ORIGEN&utm_medium=MEDIO&utm_campaign=CAMPAÑA&utm_content=CONTENIDO
```

---

## Estructura de UTMs - Definición de Parámetros

| Parámetro | Descripción | Ejemplos |
|-----------|-------------|----------|
| `utm_source` | **Plataforma** de origen del tráfico | instagram, facebook, google, tiktok, linkedin, organico, email, whatsapp |
| `utm_medium` | **Tipo** de tráfico o formato de publicación | post, story, reels, ad, bio, organic, cpc, email, referral |
| `utm_campaign` | **Nombre de la campaña** o periodo | lanzamiento_ebook, promo_enero, black_friday, webinar_gratis |
| `utm_content` | **Contenido específico** o variante | carrusel1, video_tips, ad_creativo_a, testimonio_camila |
| `utm_term` | *(Opcional)* Keyword para ads pagos | branding, diseno_grafico, canva, marca_personal |

---

## Reglas de Naming (Nomenclatura)

✅ **SÍ:**
- Todo en minúsculas: `lanzamiento_ebook`
- Usar guiones bajos: `promo_enero_2026`
- Sin tildes ni ñ: `promocion` (no "promoción")
- Descriptivo pero corto: máximo 50 caracteres
- Consistente: siempre usar los mismos nombres

❌ **NO:**
- Espacios: ~~`lanzamiento ebook`~~
- Mayúsculas: ~~`Lanzamiento_Ebook`~~
- Caracteres especiales: ~~`promo#1`~~
- Muy largo: ~~`esta_es_una_campana_muy_larga_de_lanzamiento_del_ebook_2026`~~
- Inconsistente: `instagram` en un lugar y `ig` en otro

---

## Estructura por Fuente de Tráfico (utm_source)

### 1. Instagram (`utm_source=instagram`)

#### Post Orgánico en Feed
```
?utm_source=instagram&utm_medium=post&utm_campaign=lanzamiento_ebook&utm_content=carrusel_beneficios
```

#### Stories Orgánicas
```
?utm_source=instagram&utm_medium=story&utm_campaign=lanzamiento_ebook&utm_content=video_3_tips
```

#### Reels
```
?utm_source=instagram&utm_medium=reels&utm_campaign=lanzamiento_ebook&utm_content=tips_canva
```

#### Instagram Ads
```
?utm_source=instagram&utm_medium=ad&utm_campaign=conversion_ebook_enero&utm_content=ad_creativo_a&utm_term=branding
```

#### Link en Bio
```
?utm_source=instagram&utm_medium=bio&utm_campaign=permanente&utm_content=link_bio
```

---

### 2. Facebook (`utm_source=facebook`)

#### Post Orgánico
```
?utm_source=facebook&utm_medium=post&utm_campaign=lanzamiento_ebook&utm_content=carrusel_testimonios
```

#### Facebook Stories
```
?utm_source=facebook&utm_medium=story&utm_campaign=lanzamiento_ebook&utm_content=promo_24hs
```

#### Facebook Ads
```
?utm_source=facebook&utm_medium=ad&utm_campaign=conversion_ebook_enero&utm_content=ad_video_tips&utm_term=emprendedoras
```

#### Grupo de Facebook
```
?utm_source=facebook&utm_medium=group&utm_campaign=lanzamiento_ebook&utm_content=grupo_emprendedoras
```

---

### 3. Tráfico Orgánico (`utm_source=organico`)

#### Google Search (orgánico)
```
?utm_source=organico&utm_medium=google_search&utm_campaign=seo_ebook&utm_content=blog_post
```

#### Pinterest (orgánico)
```
?utm_source=organico&utm_medium=pinterest&utm_campaign=lanzamiento_ebook&utm_content=pin_infografia
```

#### Otro blog que te menciona
```
?utm_source=organico&utm_medium=referral&utm_campaign=lanzamiento_ebook&utm_content=blog_amigo
```

---

### 4. Email Marketing (`utm_source=email`)

#### Newsletter semanal
```
?utm_source=email&utm_medium=newsletter&utm_campaign=lanzamiento_ebook&utm_content=email_semana1
```

#### Email de secuencia automática
```
?utm_source=email&utm_medium=automation&utm_campaign=lanzamiento_ebook&utm_content=email_bienvenida
```

#### Email de lanzamiento
```
?utm_source=email&utm_medium=broadcast&utm_campaign=lanzamiento_ebook&utm_content=email_lanzamiento_dia1
```

---

### 5. WhatsApp (`utm_source=whatsapp`)

#### Mensaje individual
```
?utm_source=whatsapp&utm_medium=mensaje&utm_campaign=lanzamiento_ebook&utm_content=mensaje_personal
```

#### Estado de WhatsApp
```
?utm_source=whatsapp&utm_medium=status&utm_campaign=lanzamiento_ebook&utm_content=estado_promo
```

#### Grupo de WhatsApp
```
?utm_source=whatsapp&utm_medium=group&utm_campaign=lanzamiento_ebook&utm_content=grupo_emprendedoras
```

---

### 6. TikTok (`utm_source=tiktok`)

#### Video orgánico
```
?utm_source=tiktok&utm_medium=video&utm_campaign=lanzamiento_ebook&utm_content=tips_diseno
```

#### TikTok Ads
```
?utm_source=tiktok&utm_medium=ad&utm_campaign=conversion_ebook_enero&utm_content=ad_testimonios&utm_term=branding
```

#### Link en bio de TikTok
```
?utm_source=tiktok&utm_medium=bio&utm_campaign=lanzamiento_ebook&utm_content=link_bio
```

---

### 7. LinkedIn (`utm_source=linkedin`)

#### Post orgánico
```
?utm_source=linkedin&utm_medium=post&utm_campaign=lanzamiento_ebook&utm_content=post_profesional
```

#### LinkedIn Ads
```
?utm_source=linkedin&utm_medium=ad&utm_campaign=conversion_ebook_enero&utm_content=ad_b2b&utm_term=diseno_grafico
```

---

### 8. YouTube (`utm_source=youtube`)

#### Descripción de video
```
?utm_source=youtube&utm_medium=video&utm_campaign=lanzamiento_ebook&utm_content=tutorial_canva
```

#### YouTube Ads
```
?utm_source=youtube&utm_medium=ad&utm_campaign=conversion_ebook_enero&utm_content=ad_preroll&utm_term=branding
```

---

### 9. Google Ads (`utm_source=google`)

#### Google Search Ads
```
?utm_source=google&utm_medium=cpc&utm_campaign=conversion_ebook_enero&utm_content=ad_texto_1&utm_term=ebook_branding
```

#### Google Display Ads
```
?utm_source=google&utm_medium=display&utm_campaign=remarketing_ebook&utm_content=banner_300x250&utm_term=remarketing
```

---

## Matriz de Combinaciones Recomendadas

| Fuente | Medium | Cuándo usar |
|--------|--------|-------------|
| instagram | post | Post orgánico en feed |
| instagram | story | Story orgánico |
| instagram | reels | Reels |
| instagram | ad | Anuncio pagado |
| instagram | bio | Link en bio |
| facebook | post | Post orgánico |
| facebook | ad | Facebook Ads |
| facebook | group | Compartido en grupo |
| organico | google_search | Búsqueda en Google |
| organico | referral | Otro sitio te enlaza |
| email | newsletter | Newsletter regular |
| email | automation | Email automático |
| whatsapp | mensaje | Mensaje directo |
| whatsapp | status | Estado de WhatsApp |
| tiktok | video | Video orgánico |
| tiktok | ad | TikTok Ads |
| google | cpc | Google Search Ads |
| google | display | Google Display Ads |

---

## Ejemplo de Campaña Completa Multi-Canal

### Campaña: "Lanzamiento Ebook - Enero 2026"

#### Instagram
```
Post 1: ?utm_source=instagram&utm_medium=post&utm_campaign=lanzamiento_ebook_enero&utm_content=carrusel_beneficios
Story 1: ?utm_source=instagram&utm_medium=story&utm_campaign=lanzamiento_ebook_enero&utm_content=video_3_tips
Reels 1: ?utm_source=instagram&utm_medium=reels&utm_campaign=lanzamiento_ebook_enero&utm_content=tips_canva
Ad 1: ?utm_source=instagram&utm_medium=ad&utm_campaign=lanzamiento_ebook_enero&utm_content=ad_creativo_a&utm_term=branding
```

#### Facebook
```
Post 1: ?utm_source=facebook&utm_medium=post&utm_campaign=lanzamiento_ebook_enero&utm_content=testimonios_clientes
Ad 1: ?utm_source=facebook&utm_medium=ad&utm_campaign=lanzamiento_ebook_enero&utm_content=ad_video&utm_term=emprendedoras
```

#### Email
```
Email 1: ?utm_source=email&utm_medium=newsletter&utm_campaign=lanzamiento_ebook_enero&utm_content=email_lanzamiento
Email 2: ?utm_source=email&utm_medium=automation&utm_campaign=lanzamiento_ebook_enero&utm_content=email_recordatorio_dia3
```

#### WhatsApp
```
Estado: ?utm_source=whatsapp&utm_medium=status&utm_campaign=lanzamiento_ebook_enero&utm_content=promo_24hs
Grupo: ?utm_source=whatsapp&utm_medium=group&utm_campaign=lanzamiento_ebook_enero&utm_content=grupo_emprendedoras
```

---

## Herramienta Online: Google Campaign URL Builder

Podés usar la herramienta oficial de Google para generar URLs:
👉 https://ga-dev-tools.google/campaign-url-builder/

**Pasos:**
1. Website URL: `https://tudominio.com/`
2. Campaign Source: `instagram` (o facebook, email, etc.)
3. Campaign Medium: `post` (o story, ad, etc.)
4. Campaign Name: `lanzamiento_ebook_enero`
5. Campaign Content: `carrusel_beneficios`
6. Campaign Term (opcional): `branding`
7. Copiar la URL generada

---

## Plantilla de Google Sheets para Gestión

Creá un Google Sheet con estas columnas para organizar todas tus URLs:

| Columna A | Columna B | Columna C | Columna D | Columna E | Columna F |
|-----------|-----------|-----------|-----------|-----------|-----------|
| **Fuente** | **Medio** | **Campaña** | **Contenido** | **URL Completa** | **URL Acortada** |
| instagram | post | lanzamiento_ebook | carrusel1 | *(fórmula)* | *(Bit.ly)* |
| facebook | ad | lanzamiento_ebook | ad_video | *(fórmula)* | *(Bit.ly)* |

**Fórmula para columna E (URL Completa):**
```
="https://tudominio.com/?utm_source="&A2&"&utm_medium="&B2&"&utm_campaign="&C2&"&utm_content="&D2
```

---

## Acortar URLs con Bit.ly

Las URLs con UTM son largas. Acortalas con:
- **Bit.ly:** https://bitly.com/
- **TinyURL:** https://tinyurl.com/
- **Rebrandly:** https://www.rebrandly.com/ (permite URLs branded)

**Los UTMs se mantienen** aunque acortes la URL.

---

## Cómo Ver los Datos en Google Analytics 4

### Opción 1: Vista General de Tráfico
1. GA4 > **Informes** > **Adquisición** > **Tráfico**
2. Dimensión primaria: **Fuente/medio**
3. Ver tabla con datos:
   - instagram / post
   - facebook / ad
   - email / newsletter
   - etc.

### Opción 2: Análisis por Campaña
1. GA4 > **Informes** > **Adquisición** > **Tráfico**
2. Dimensión secundaria: **Campaña**
3. Filtrar por campaña: `lanzamiento_ebook_enero`
4. Ver métricas:
   - Usuarios
   - Sesiones
   - Tasa de conversión
   - Conversiones

### Opción 3: Crear Reporte Personalizado
1. GA4 > **Explorar** > **Análisis libre**
2. Dimensiones:
   - Fuente del tráfico
   - Medio
   - Nombre de campaña
   - Contenido de campaña
3. Métricas:
   - Usuarios
   - Sesiones
   - Conversiones
   - Ingresos
4. Filtro: `Fuente = instagram` (o la que quieras analizar)

---

## Best Practices (Mejores Prácticas)

### 1. Consistencia
- Siempre usar los mismos nombres para las mismas cosas
- Ejemplo: Siempre `instagram`, nunca `ig` o `Instagram`

### 2. Nomenclatura Clara
- Usar nombres descriptivos que entiendas en 6 meses
- ✅ `lanzamiento_ebook_enero`
- ❌ `camp1`

### 3. Documentar
- Mantener un Google Sheet con todas las URLs usadas
- Registrar fecha de publicación
- Anotar resultados

### 4. Testing
- Siempre probar la URL antes de publicar
- Verificar que no tenga errores de tipeo
- Confirmar que llegue a la página correcta

### 5. Análisis Regular
- Revisar datos en GA4 semanalmente
- Identificar qué fuentes traen más tráfico
- Identificar qué contenidos convierten mejor

---

## Checklist antes de Publicar una URL

- [ ] La URL tiene todos los parámetros necesarios (source, medium, campaign, content)
- [ ] Todos los parámetros están en minúsculas
- [ ] No hay espacios ni caracteres especiales
- [ ] El utm_source identifica correctamente la plataforma
- [ ] El utm_content es único y descriptivo
- [ ] La URL funciona (probaste clickeando)
- [ ] (Opcional) Acortaste la URL con Bit.ly
- [ ] Registraste la URL en tu Google Sheet de control

---

## Resumen de utm_source Principales

| Plataforma | utm_source |
|------------|------------|
| Instagram | `instagram` |
| Facebook | `facebook` |
| TikTok | `tiktok` |
| LinkedIn | `linkedin` |
| YouTube | `youtube` |
| Email | `email` |
| WhatsApp | `whatsapp` |
| Google Ads | `google` |
| Tráfico orgánico | `organico` |

---

## Resumen de utm_medium Principales

| Tipo de tráfico | utm_medium |
|-----------------|------------|
| Post orgánico en redes | `post` |
| Story | `story` |
| Reels/Video | `reels` o `video` |
| Anuncio pagado | `ad` |
| Link en bio | `bio` |
| Email | `newsletter`, `automation`, `broadcast` |
| Búsqueda orgánica | `organic` |
| Referencia de otro sitio | `referral` |
| Google Ads | `cpc` (costo por click) |

---

¡Listo para trackear tráfico desde múltiples fuentes! 🚀

**Recordá:** La clave está en la consistencia. Usá siempre la misma nomenclatura y documentá todo en un Google Sheet.
