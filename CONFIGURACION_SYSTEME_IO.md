# Guía de Configuración de Systeme.io - Thank You Page

Esta guía te muestra cómo configurar el tracking de conversiones en la thank you page de Systeme.io para registrar las compras en Google Analytics 4.

## Objetivo

Cuando un usuario compra el ebook, queremos que se registre un evento `purchase` en GA4 con:
- ID de la transacción
- Valor de la compra (18,000 ARS)
- Nombre del producto

---

## Paso 1: Acceder a la Thank You Page

1. Iniciar sesión en **Systeme.io**
2. Ir a tu producto del ebook:
   - Menú lateral > **Products** o **Funnels**
   - Seleccionar: Ebook "De Invisible a Irresistible"
3. Buscar la sección **"Thank You Page"** o **"Página de Confirmación"**
4. Activar la opción **"Custom Code"** o **"Código personalizado"**

---

## Paso 2: Agregar el Código de Tracking

Copia y pega este código completo en la sección de "Custom Code" de la thank you page:

```html
<!-- Google Analytics 4 Script -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FEG2S0X03D"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-FEG2S0X03D');
</script>

<!-- Tracking de Conversión -->
<script>
  // Esperar a que GA4 esté listo
  window.addEventListener('load', function() {

    // Datos de la orden
    var orderData = {
      transaction_id: '{{order.id}}',     // Variable de Systeme.io
      value: 18000,                        // Precio fijo del ebook
      currency: 'ARS',
      items: [{
        item_id: 'ebook-branding',
        item_name: 'De Invisible a Irresistible - Ebook',
        price: 18000,
        quantity: 1
      }]
    };

    // Enviar evento de compra a GA4
    if (typeof gtag !== 'undefined') {
      gtag('event', 'purchase', orderData);
      console.log('✅ Conversión registrada en GA4:', orderData);
    } else {
      console.error('❌ Google Analytics no está cargado');
    }

    // Facebook Pixel (si lo usas)
    if (typeof fbq !== 'undefined') {
      fbq('track', 'Purchase', {
        value: 18000,
        currency: 'ARS'
      });
      console.log('✅ Conversión registrada en Facebook Pixel');
    }

  });
</script>
```

---

## Paso 3: Verificar Variables de Systeme.io

Systeme.io proporciona variables dinámicas que podés usar. Las más comunes son:

- `{{order.id}}` - ID único de la orden
- `{{order.total}}` - Total de la orden
- `{{customer.email}}` - Email del cliente
- `{{customer.name}}` - Nombre del cliente

**Importante:** Si Systeme.io usa una sintaxis diferente para las variables (ej: `[order_id]` en lugar de `{{order.id}}`), deberás ajustar el código.

### Cómo verificar la sintaxis correcta:

1. En Systeme.io, buscar la documentación de "Merge tags" o "Variables dinámicas"
2. O hacer una compra de prueba y revisar la consola del navegador (F12)
3. Si aparece literalmente `{{order.id}}` en lugar de un número, la sintaxis es incorrecta

---

## Paso 4: Testing - Compra de Prueba

Para verificar que funciona:

1. **Hacer una compra de prueba** del ebook (o usar el modo test de Systeme.io si lo tiene)
2. Al llegar a la thank you page:
   - Abrir **DevTools** (F12)
   - Ir a la pestaña **Console**
   - Deberías ver: `✅ Conversión registrada en GA4:` con los datos
3. Verificar en **Google Analytics 4**:
   - Ir a GA4 > **Informes** > **Tiempo real**
   - Deberías ver el evento `purchase`
   - Ir a GA4 > **Informes** > **Conversiones**
   - En unos minutos aparecerá la conversión

---

## Paso 5: Configurar Conversión en GA4

Para que GA4 reconozca las compras como conversiones:

1. Ir a **Google Analytics 4**
2. Menú lateral > **Configuración** > **Eventos**
3. Buscar el evento `purchase`
4. Activar el toggle **"Marcar como conversión"**

Ahora todas las compras se contarán como conversiones en tus reportes.

---

## Troubleshooting (Solución de Problemas)

### Problema 1: No aparece el evento en GA4 Tiempo Real

**Soluciones:**
- Verificar que el Measurement ID sea `G-FEG2S0X03D`
- Verificar que no haya AdBlocker activo
- Esperar 1-2 minutos (puede haber delay)
- Revisar la consola del navegador (F12) en busca de errores

### Problema 2: Aparece literalmente `{{order.id}}` en lugar del número

**Solución:**
- La sintaxis de variables de Systeme.io es diferente
- Contactar soporte de Systeme.io para confirmar la sintaxis correcta
- O usar un valor hardcodeado temporal: `transaction_id: 'ORDER_' + Date.now()`

### Problema 3: El evento se registra pero sin transaction_id

**Solución:**
```javascript
// Usar timestamp si no hay order.id
transaction_id: '{{order.id}}' || 'ORDER_' + Date.now()
```

---

## Código Alternativo: Sin Variables Dinámicas

Si Systeme.io no soporta variables dinámicas o no funciona, usá este código alternativo:

```html
<!-- Google Analytics 4 Script -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FEG2S0X03D"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-FEG2S0X03D');
</script>

<!-- Tracking de Conversión -->
<script>
  window.addEventListener('load', function() {

    // Generar ID único con timestamp
    var orderId = 'ORDER_' + Date.now();

    var orderData = {
      transaction_id: orderId,
      value: 18000,
      currency: 'ARS',
      items: [{
        item_id: 'ebook-branding',
        item_name: 'De Invisible a Irresistible - Ebook',
        price: 18000,
        quantity: 1
      }]
    };

    if (typeof gtag !== 'undefined') {
      gtag('event', 'purchase', orderData);
      console.log('✅ Conversión registrada:', orderData);
    }

  });
</script>
```

---

## Pasar UTMs de la Landing a Systeme.io

El archivo `tracking.js` ya se encarga de agregar automáticamente los parámetros UTM a todos los botones CTA.

Esto significa que cuando un usuario hace clic en un botón, la URL ya incluye los UTMs:

**URL original del botón:**
```
https://luciafiguls.systeme.io/ebookars
```

**URL con UTMs agregados automáticamente:**
```
https://luciafiguls.systeme.io/ebookars?utm_source=instagram&utm_medium=post&utm_campaign=lanzamiento&utm_content=carrusel1
```

Systeme.io mantendrá estos parámetros durante todo el checkout, y GA4 los capturará en la thank you page.

---

## Resumen de Implementación

✅ **Paso 1:** Acceder a configuración de thank you page en Systeme.io
✅ **Paso 2:** Agregar código de tracking completo
✅ **Paso 3:** Verificar sintaxis de variables `{{order.id}}`
✅ **Paso 4:** Hacer compra de prueba y verificar en Console
✅ **Paso 5:** Verificar evento `purchase` en GA4 Tiempo Real
✅ **Paso 6:** Marcar `purchase` como conversión en GA4

---

## Notas Importantes

- **No modifiques el Measurement ID:** Debe ser `G-FEG2S0X03D`
- **El código debe estar en la thank you page**, no en la landing
- **Los UTMs se pasan automáticamente** gracias a tracking.js
- **Las conversiones pueden tardar hasta 24-48 horas** en aparecer en reportes completos (aparecen en Tiempo Real al instante)

---

¿Problemas? Revisá la sección de Troubleshooting o consultá con el soporte de Systeme.io para verificar la sintaxis de las variables dinámicas.
