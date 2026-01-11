/**
 * Sistema de Tracking Personalizado - Lucía Figuls Ebook
 * Versión: 1.0
 * Descripción: Sistema modular para tracking de eventos en landing page
 * - Gestión de parámetros UTM
 * - Tracking de scroll por sección con Intersection Observer
 * - Tracking granular de video (25%, 50%, 75%, 100%)
 * - Tracking de clics en CTAs
 * - Sistema de backup de eventos en localStorage
 */

(function(window, document) {
  'use strict';

  // ============================================
  // MÓDULO 0: GESTIÓN DE USER ID ÚNICO
  // ============================================

  const UserIDManager = {
    userIdKey: 'tracking_user_id',
    userId: null,

    init: function() {
      this.userId = this.getOrCreateUserID();
      console.log('User ID:', this.userId);
    },

    // Generar UUID v4 (formato: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
    generateUUID: function() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },

    getOrCreateUserID: function() {
      try {
        // Intentar recuperar de localStorage
        let userId = localStorage.getItem(this.userIdKey);

        if (!userId) {
          // Si no existe, crear uno nuevo
          userId = this.generateUUID();

          // Intentar guardar en localStorage
          try {
            localStorage.setItem(this.userIdKey, userId);
            console.log('✅ User ID guardado en localStorage:', userId);
          } catch (storageError) {
            console.error('❌ No se pudo guardar en localStorage:', storageError);
            // Si no se puede guardar, al menos usar el ID en esta sesión
          }

          // Guardar metadata de primera visita
          const metadata = {
            user_id: userId,
            first_visit: new Date().toISOString(),
            user_agent: navigator.userAgent,
            screen_resolution: `${window.screen.width}x${window.screen.height}`
          };

          try {
            localStorage.setItem('tracking_user_metadata', JSON.stringify(metadata));
          } catch (metadataError) {
            console.warn('⚠️ No se pudo guardar metadata:', metadataError);
          }

          console.log('🆕 Nuevo usuario creado:', userId);
        } else {
          console.log('👤 Usuario existente recuperado de localStorage:', userId);
        }

        return userId;
      } catch (e) {
        console.error('❌ Error crítico gestionando User ID:', e);
        // Fallback: generar ID temporal en memoria
        const tempId = 'temp_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        console.warn('⚠️ Usando ID temporal (no persistirá entre sesiones):', tempId);
        return tempId;
      }
    },

    getUserID: function() {
      return this.userId;
    },

    getUserMetadata: function() {
      try {
        const metadata = localStorage.getItem('tracking_user_metadata');
        return metadata ? JSON.parse(metadata) : null;
      } catch (e) {
        return null;
      }
    }
  };


  // ============================================
  // MÓDULO 1: GESTIÓN DE SESSION ID
  // ============================================

  const SessionManager = {
    sessionId: null,

    init: function() {
      // Generar un nuevo session_id para esta sesión/visita
      this.sessionId = this.generateSessionID();
      console.log('Session ID:', this.sessionId);
    },

    generateSessionID: function() {
      // Formato: user_id + timestamp + random
      const userId = UserIDManager.getUserID();
      const timestamp = Date.now();
      const random = Math.random().toString(36).substring(2, 9);
      return `${userId}_${timestamp}_${random}`;
    },

    getSessionID: function() {
      return this.sessionId;
    }
  };


  // ============================================
  // MÓDULO 2: GESTIÓN DE PARÁMETROS UTM
  // ============================================

  const UTMManager = {
    params: {},

    init: function() {
      this.captureUTMs();
      this.persistUTMs();
    },

    captureUTMs: function() {
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

      utmParams.forEach(param => {
        const value = urlParams.get(param);
        if (value) {
          this.params[param] = value;
        }
      });
    },

    persistUTMs: function() {
      if (Object.keys(this.params).length > 0) {
        // Guardar en sessionStorage (dura la sesión)
        sessionStorage.setItem('utm_params', JSON.stringify(this.params));

        // Guardar en localStorage (primera visita)
        const firstVisit = localStorage.getItem('first_utm_params');
        if (!firstVisit) {
          const persistData = {
            params: this.params,
            timestamp: new Date().toISOString(),
            landing_url: window.location.href
          };
          localStorage.setItem('first_utm_params', JSON.stringify(persistData));
        }

        console.log('UTMs capturados:', this.params);
      } else {
        // Recuperar de sessionStorage si existe
        const stored = sessionStorage.getItem('utm_params');
        if (stored) {
          this.params = JSON.parse(stored);
        }
      }
    },

    getParams: function() {
      return this.params;
    },

    appendToURL: function(url) {
      try {
        const urlObj = new URL(url);
        Object.keys(this.params).forEach(key => {
          urlObj.searchParams.set(key, this.params[key]);
        });
        return urlObj.toString();
      } catch (e) {
        console.error('Error agregando UTMs a URL:', e);
        return url;
      }
    }
  };


  // ============================================
  // MÓDULO 2: SISTEMA DE BACKUP DE EVENTOS
  // ============================================

  const EventBackup = {
    storageKey: 'tracking_backup',
    maxEvents: 100,

    save: function(eventName, eventData) {
      try {
        const backup = this.getAll();
        backup.push({
          event: eventName,
          data: eventData,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          referrer: document.referrer || '(direct)',
          utm: UTMManager.getParams(),
          user_id: UserIDManager.getUserID(),
          session_id: SessionManager.getSessionID()
        });

        // Mantener solo los últimos N eventos
        if (backup.length > this.maxEvents) {
          backup.shift();
        }

        // Usar sessionStorage para que cada sesión sea independiente
        sessionStorage.setItem(this.storageKey, JSON.stringify(backup));
      } catch (e) {
        console.error('Error guardando backup:', e);
      }
    },

    getAll: function() {
      try {
        return JSON.parse(sessionStorage.getItem(this.storageKey) || '[]');
      } catch (e) {
        console.error('Error leyendo backup:', e);
        return [];
      }
    },

    clear: function() {
      try {
        sessionStorage.removeItem(this.storageKey);
        console.log('Backup limpiado');
      } catch (e) {
        console.error('Error limpiando backup:', e);
      }
    },

    export: function() {
      const data = this.getAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tracking-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      console.log('Backup exportado:', data.length, 'eventos');
    }
  };


  // ============================================
  // MÓDULO 3: SCROLL TRACKING POR SECCIÓN
  // ============================================

  const ScrollTracker = {
    sections: [
      { id: 'hero', name: 'Hero - Título Principal' },
      { id: 'benefits', name: 'Beneficios' },
      { id: 'video', name: 'Video 3 Tips' },
      { id: 'testimonials', name: 'Testimonios' },
      { id: 'pricing', name: 'Precio' },
      { id: 'for-who', name: 'Para Quién Es' },
      { id: 'why', name: 'Por Qué Lo Creé' },
      { id: 'modules', name: 'Módulos' },
      { id: 'faq', name: 'FAQ' },
      { id: 'final-cta', name: 'CTA Final' }
    ],

    viewedSections: new Set(),
    observer: null,

    init: function() {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Visible al 50%
      };

      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        observerOptions
      );

      // Observar todas las secciones
      this.sections.forEach(section => {
        const element = document.getElementById(section.id);
        if (element) {
          this.observer.observe(element);
        } else {
          console.warn('Sección no encontrada:', section.id);
        }
      });
    },

    handleIntersection: function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.viewedSections.has(entry.target.id)) {
          const sectionData = this.sections.find(s => s.id === entry.target.id);

          if (sectionData) {
            this.viewedSections.add(entry.target.id);
            this.trackSectionView(sectionData);
          }
        }
      });
    },

    trackSectionView: function(sectionData) {
      const eventData = {
        section_id: sectionData.id,
        section_name: sectionData.name,
        section_order: this.sections.findIndex(s => s.id === sectionData.id) + 1,
        time_on_page: this.getTimeOnPage(),
        user_id: UserIDManager.getUserID()
      };

      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'section_view', {
          'event_category': 'Scroll',
          'event_label': sectionData.name,
          ...eventData
        });
      }

      // Backup
      EventBackup.save('section_view', eventData);

      console.log('Sección vista:', sectionData.name);
    },

    getTimeOnPage: function() {
      return Math.round((Date.now() - window.trackingStartTime) / 1000);
    },

    getSectionsViewed: function() {
      return Array.from(this.viewedSections);
    }
  };


  // ============================================
  // MÓDULO 4: VIDEO TRACKING GRANULAR
  // ============================================

  const VideoTracker = {
    video: null,
    started: false,
    quartiles: {
      '25': false,
      '50': false,
      '75': false,
      '100': false
    },

    init: function() {
      this.video = document.querySelector('.video-player');
      if (!this.video) {
        console.warn('Video player no encontrado');
        return;
      }

      this.video.addEventListener('play', this.handlePlay.bind(this));
      this.video.addEventListener('pause', this.handlePause.bind(this));
      this.video.addEventListener('timeupdate', this.handleProgress.bind(this));
      this.video.addEventListener('ended', this.handleEnded.bind(this));
    },

    handlePlay: function() {
      if (!this.started) {
        this.started = true;
        this.trackEvent('video_start', { percent: 0 });

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
          fbq('track', 'ViewContent', {
            content_name: 'Video 3 Tips',
            content_type: 'video'
          });
        }
      }
    },

    handlePause: function() {
      const percent = Math.round((this.video.currentTime / this.video.duration) * 100);
      const seconds = Math.round(this.video.currentTime);

      // Trackear evento de pausa con % y segundos actuales
      this.trackEvent('video_pause', {
        percent: percent,
        seconds: seconds
      });

      console.log('Video pausado en:', percent + '% (' + seconds + 's)');
    },

    handleProgress: function() {
      const percent = (this.video.currentTime / this.video.duration) * 100;

      if (percent >= 25 && !this.quartiles['25']) {
        this.quartiles['25'] = true;
        this.trackEvent('video_progress', { percent: 25 });
      } else if (percent >= 50 && !this.quartiles['50']) {
        this.quartiles['50'] = true;
        this.trackEvent('video_progress', { percent: 50 });
      } else if (percent >= 75 && !this.quartiles['75']) {
        this.quartiles['75'] = true;
        this.trackEvent('video_progress', { percent: 75 });
      }
    },

    handleEnded: function() {
      if (!this.quartiles['100']) {
        this.quartiles['100'] = true;
        this.trackEvent('video_progress', { percent: 100 });
      }
    },

    trackEvent: function(eventName, data) {
      const eventData = {
        video_title: '3 Tips Branding',
        video_duration: Math.round(this.video.duration),
        video_current_time: Math.round(this.video.currentTime),
        video_percent: data.percent,
        user_id: UserIDManager.getUserID()
      };

      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
          'event_category': 'Video',
          'event_label': '3 Tips Branding',
          ...eventData
        });
      }

      // Backup
      EventBackup.save(eventName, eventData);

      console.log(`Video: ${eventName} - ${data.percent}%`);
    }
  };


  // ============================================
  // MÓDULO 5: CTA TRACKING
  // ============================================

  const CTATracker = {
    init: function() {
      const buttons = document.querySelectorAll('.cta-button, .btn-es-para-mi');

      if (buttons.length === 0) {
        console.warn('No se encontraron botones CTA');
        return;
      }

      console.log('Botones CTA encontrados:', buttons.length);

      buttons.forEach((button, index) => {
        button.addEventListener('click', (e) => {
          this.trackClick(button, index);
        });
      });
    },

    trackClick: function(button, index) {
      const buttonText = button.textContent.trim();
      const sectionId = button.closest('.section')?.id || button.closest('section')?.id || 'unknown';
      const destinationURL = button.href;

      // Agregar UTMs a la URL de destino
      const urlWithUTM = UTMManager.appendToURL(destinationURL);
      button.href = urlWithUTM;

      const eventData = {
        button_text: buttonText,
        section_id: sectionId,
        button_position: index + 1,
        destination_url: urlWithUTM,
        time_on_page: ScrollTracker.getTimeOnPage(),
        user_id: UserIDManager.getUserID()
      };

      // Google Analytics 4
      if (typeof gtag !== 'undefined') {
        gtag('event', 'cta_click', {
          'event_category': 'CTA',
          'event_label': buttonText,
          ...eventData
        });
      }

      // Facebook Pixel
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          content_name: buttonText,
          content_category: sectionId
        });
      }

      // Backup
      EventBackup.save('cta_click', eventData);

      // IMPORTANTE: Enviar datos inmediatamente antes de que el usuario salga
      // Esto garantiza que capturamos todo el journey antes de navegar a Systeme.io
      if (GoogleSheetsSync.enabled) {
        console.log('🚀 Enviando datos antes de salir (CTA click)...');
        GoogleSheetsSync.sendData(true); // force=true para enviar siempre
      }

      console.log('CTA click:', buttonText, 'en sección:', sectionId);
    }
  };


  // ============================================
  // MÓDULO 6: GOOGLE SHEETS SYNC
  // ============================================

  const GoogleSheetsSync = {
    webhookURL: '', // Se configurará en init()
    enabled: false,
    dataSent: false, // Bandera para evitar envíos duplicados
    autoSyncInterval: null,

    init: function(webhookURL) {
      if (!webhookURL) {
        console.warn('⚠️ Google Sheets webhook no configurado');
        return;
      }

      this.webhookURL = webhookURL;
      this.enabled = true;

      // Enviar datos al cerrar/salir de la página
      // Usar try-catch para evitar errores de extensiones
      window.addEventListener('beforeunload', (e) => {
        try {
          this.sendData();
        } catch (err) {
          console.error('Error en beforeunload:', err);
        }
      });

      // Fallback: también enviar al perder visibilidad
      document.addEventListener('visibilitychange', () => {
        try {
          if (document.visibilityState === 'hidden') {
            this.sendData();
          }
        } catch (err) {
          console.error('Error en visibilitychange:', err);
        }
      });

      // NUEVO: Envío periódico cada 2 minutos (si hay eventos nuevos)
      this.autoSyncInterval = setInterval(() => {
        try {
          const events = EventBackup.getAll();
          if (events.length > 0) {
            console.log('⏰ Auto-sync: enviando datos periódicamente...');
            this.sendData(true); // force=true para ignorar dataSent
          }
        } catch (err) {
          console.error('Error en auto-sync:', err);
        }
      }, 120000); // 120000ms = 2 minutos

      console.log('📊 Google Sheets sync activado (auto-sync cada 2 min)');
    },

    sendData: function(force = false) {
      // Si force=true, ignora dataSent (usado en auto-sync y CTA clicks)
      if (!this.enabled || !this.webhookURL) {
        return;
      }

      // Si no es forzado y ya se envió, no enviar de nuevo
      if (!force && this.dataSent) {
        console.log('⚠️ Datos ya enviados en esta sesión');
        return;
      }

      const events = EventBackup.getAll();

      if (events.length === 0) {
        return;
      }

      const payload = {
        events: events,
        session_info: {
          user_id: UserIDManager.getUserID(),
          session_id: SessionManager.getSessionID(),
          user_agent: navigator.userAgent,
          screen_resolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          session_duration: ScrollTracker.getTimeOnPage(),
          total_events: events.length
        }
      };

      // Usar sendBeacon con text/plain para evitar CORS preflight
      const blob = new Blob([JSON.stringify(payload)], { type: 'text/plain' });
      const sent = navigator.sendBeacon(this.webhookURL, blob);

      if (sent) {
        this.dataSent = true; // Marcar como enviado
        console.log('✅ Datos enviados a Google Sheets:', events.length);

        // Resetear dataSent después de 30 segundos para permitir nuevos envíos
        setTimeout(() => {
          this.dataSent = false;
        }, 30000); // 30 segundos
      } else {
        console.error('❌ Error enviando datos a Google Sheets');
      }
    },

    // Método manual para testing (resetea la bandera para permitir reenvío)
    sendNow: function() {
      console.log('📤 Enviando datos manualmente...');
      this.dataSent = false; // Resetear para permitir envío manual
      this.sendData();
    }
  };


  // ============================================
  // MÓDULO 7: INICIALIZACIÓN Y DEBUG
  // ============================================

  function init() {
    // Timestamp de inicio para calcular tiempo en página
    window.trackingStartTime = Date.now();

    // Inicializar todos los módulos
    console.log('Inicializando sistema de tracking...');

    UserIDManager.init();
    SessionManager.init();
    UTMManager.init();
    ScrollTracker.init();
    VideoTracker.init();
    CTATracker.init();

    // Configurar User ID en Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-FEG2S0X03D', {
        'user_id': UserIDManager.getUserID()
      });
    }

    // Inicializar Google Sheets Sync (configurar webhook URL aquí)
    // IMPORTANTE: Reemplazar con tu URL de webhook de Google Apps Script
    const GOOGLE_SHEETS_WEBHOOK = 'https://script.google.com/macros/s/AKfycbyxVEc7tbVmuh0Lb-A0yYChGQzJiOPGZxDWN5gVZvxoG2sjp6j9VFA-Y22jz8ExrLVk/exec'; // Dejar vacío para desactivar
    GoogleSheetsSync.init(GOOGLE_SHEETS_WEBHOOK);

    // Exponer funciones de debug globalmente
    window.TrackingDebug = {
      exportBackup: EventBackup.export.bind(EventBackup),
      getBackup: EventBackup.getAll.bind(EventBackup),
      clearBackup: EventBackup.clear.bind(EventBackup),
      getUTMs: UTMManager.getParams.bind(UTMManager),
      getUserID: UserIDManager.getUserID.bind(UserIDManager),
      getSessionID: SessionManager.getSessionID.bind(SessionManager),
      getUserMetadata: UserIDManager.getUserMetadata.bind(UserIDManager),
      getSectionsViewed: ScrollTracker.getSectionsViewed.bind(ScrollTracker),
      sendToSheets: GoogleSheetsSync.sendNow.bind(GoogleSheetsSync),
      info: function() {
        console.log('=== TRACKING DEBUG INFO ===');
        console.log('User ID:', UserIDManager.getUserID(), '(persiste entre sesiones)');
        console.log('Session ID:', SessionManager.getSessionID(), '(único esta sesión)');
        console.log('User Metadata:', UserIDManager.getUserMetadata());
        console.log('UTMs:', UTMManager.getParams());
        console.log('Secciones vistas:', ScrollTracker.getSectionsViewed());
        console.log('Eventos en backup:', EventBackup.getAll().length);
        console.log('Tiempo en página:', ScrollTracker.getTimeOnPage(), 'segundos');
        console.log('Google Sheets sync:', GoogleSheetsSync.enabled ? 'Activado' : 'Desactivado');
        console.log('==========================');
      }
    };

    console.log('✅ Sistema de tracking inicializado correctamente');
    console.log('👤 User ID:', UserIDManager.getUserID(), '(persiste entre sesiones)');
    console.log('🔄 Session ID:', SessionManager.getSessionID(), '(único esta sesión)');
    console.log('📊 UTMs capturados:', Object.keys(UTMManager.getParams()).length > 0 ? UTMManager.getParams() : 'Ninguno');
    console.log('💡 Usa TrackingDebug.info() para ver el estado actual');
    console.log('💾 Usa TrackingDebug.exportBackup() para descargar eventos');
  }

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window, document);
