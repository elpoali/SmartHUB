/**
 * ========================================================================
 * I18N CONFIGURATION - REACT-I18NEXT INITIALIZATION
 * ========================================================================
 *
 * Simple, production-ready i18n configuration
 * Based on SmartERP's proven architecture
 *
 * @version 3.0.0
 * @since 2025-10-27
 */

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

// ========================================================================
// CONFIGURATION
// ========================================================================

i18n
  // Load translations from backend
  .use(Backend)
  // Detect user language
  .use(LanguageDetector)
  // Pass i18n instance to react-i18next
  .use(initReactI18next)
  // Initialize
  .init({
    // ===== LANGUAGES =====
    fallbackLng: 'en',
    supportedLngs: [
      'tr', 'en', 'ar', 'sq', 'az', 'bg', 'zh', 'cs', 'da', 'de',
      'el', 'es', 'fa', 'fr', 'he', 'hi', 'id', 'it', 'ja', 'ko',
      'ms', 'nl', 'pl', 'pt', 'ro', 'ru', 'sv', 'th', 'uk', 'ur', 'vi'
    ],

    // ===== NAMESPACES =====
    ns: [
      'common',
      'auth',
      'dashboard',
      'stations',
      'sessions',
      'roaming',
      'analytics',
      'settings',
      'users',
      'billing'
    ],
    defaultNS: 'common',

    // ===== BACKEND CONFIGURATION =====
    backend: {
      // Load from public/locales folder
      loadPath: '/locales/{{lng}}/{{ns}}.json',

      // Request timeout
      requestOptions: {
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'default',
      },

      // Parse data after loading
      parse: (data: string) => JSON.parse(data),

      // Allow cross domain
      crossDomain: false,
    },

    // ===== DETECTION OPTIONS =====
    detection: {
      // Order of detection methods
      order: ['localStorage', 'navigator', 'htmlTag'],

      // Keys for localStorage
      lookupLocalStorage: 'smarthub_language',

      // Cache user language
      caches: ['localStorage'],

      // Exclude cache for specific languages
      excludeCacheFor: ['cimode'],
    },

    // ===== INTERPOLATION =====
    interpolation: {
      escapeValue: false, // React already escapes
      prefix: '{{',
      suffix: '}}',
    },

    // ===== REACT SPECIFIC =====
    react: {
      useSuspense: false, // We handle loading manually
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'span'],
    },

    // ===== DEBUGGING =====
    debug: import.meta.env.DEV,

    // ===== MISSING KEYS =====
    saveMissing: import.meta.env.DEV,
    missingKeyHandler: (lngs, ns, key) => {
      if (import.meta.env.DEV) {
        console.warn(`🌍 Missing translation: [${lngs}] ${ns}:${key}`);
      }
    },

    // ===== PERFORMANCE =====
    load: 'languageOnly', // 'tr' instead of 'tr-TR'
    preload: ['tr', 'en'], // Preload these languages

    // Lower wait time for faster perceived performance
    partialBundledLanguages: true,

    // Keep translations even if not used
    keySeparator: '.',
    nsSeparator: ':',

    // Context separator
    contextSeparator: '_',

    // Plural separator
    pluralSeparator: '_',

    // Return empty string for null values
    returnNull: false,
    returnEmptyString: true,

    // Return key if translation missing (in production)
    returnObjects: false,

    // Join arrays
    joinArrays: '\n',

    // Override platform
    overloadTranslationOptionHandler: (args) => {
      return {
        defaultValue: args[1] ?? args[0],
      };
    },
  });

// ========================================================================
// INITIALIZATION LOG
// ========================================================================

if (import.meta.env.DEV) {
  i18n.on('initialized', (options) => {
    console.log('✅ i18next initialized');
    console.log('📦 Supported languages:', options.supportedLngs);
    console.log('📝 Namespaces:', options.ns);
    console.log('🌍 Current language:', i18n.language);
  });

  i18n.on('languageChanged', (lng) => {
    console.log('🌍 Language changed to:', lng);
    document.documentElement.lang = lng;
    document.documentElement.dir = ['ar', 'fa', 'he', 'ur'].includes(lng) ? 'rtl' : 'ltr';
  });

  i18n.on('loaded', (loaded) => {
    console.log('📥 Translations loaded:', Object.keys(loaded));
  });

  i18n.on('failedLoading', (lng, ns, msg) => {
    console.error(`❌ Failed loading ${lng}/${ns}:`, msg);
  });
}

// ========================================================================
// EXPORT
// ========================================================================

export default i18n;
