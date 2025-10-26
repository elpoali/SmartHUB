/**
 * ========================================================================
 * I18N REACT CONTEXT
 * ========================================================================
 *
 * Simple wrapper around enterprise translation system
 * Provides React context for i18n system
 *
 * @version 2.0.0
 * @since 2025-10-26
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { translationService, type LocaleCode } from '../i18n/services/TranslationService';
import { LANGUAGES } from '../i18n/locales';

// ========================================================================
// TYPES
// ========================================================================

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  direction: 'ltr' | 'rtl';
}

interface I18nContextValue {
  locale: LocaleCode;
  isReady: boolean;
  isRTL: boolean;
  availableLanguages: Language[];
  changeLanguage: (locale: LocaleCode) => Promise<void>;
  changeLocale: (locale: LocaleCode) => Promise<void>;
}

// ========================================================================
// CONTEXT
// ========================================================================

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// ========================================================================
// PROVIDER
// ========================================================================

export const I18nProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [locale, setLocale] = useState<LocaleCode>(translationService.getCurrentLocale());
  const [isReady, setIsReady] = useState(i18n.isInitialized);

  // ========================================================================
  // INITIALIZATION
  // ========================================================================

  useEffect(() => {
    // Wait for i18next if not ready
    if (!i18n.isInitialized) {
      console.log('⏳ I18nProvider: Waiting for i18next...');

      const checkReady = setInterval(() => {
        if (i18n.isInitialized) {
          clearInterval(checkReady);
          setIsReady(true);
          console.log('✅ I18nProvider: Ready');
        }
      }, 50);

      // Timeout after 5 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkReady);
        setIsReady(true);
        console.warn('⚠️ I18nProvider: Timeout, proceeding anyway');
      }, 5000);

      return () => {
        clearInterval(checkReady);
        clearTimeout(timeout);
      };
    } else {
      setIsReady(true);
    }
  }, [i18n]);

  // Listen for language changes
  useEffect(() => {
    // Only set up listener if i18n has the .on method
    if (typeof i18n.on !== 'function') {
      console.warn('⚠️ i18n.on is not available - skipping language change listener');
      return;
    }

    const handleLanguageChanged = (lng: string) => {
      setLocale(lng as LocaleCode);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      if (typeof i18n.off === 'function') {
        i18n.off('languageChanged', handleLanguageChanged);
      }
    };
  }, [i18n]);

  // ========================================================================
  // METHODS
  // ========================================================================

  const changeLocale = async (newLocale: LocaleCode) => {
    await translationService.changeLocale(newLocale);
    setLocale(newLocale);
  };

  // ========================================================================
  // LOADING STATE
  // ========================================================================

  if (!isReady) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #1890ff',
            borderRadius: '50%',
            margin: '0 auto 16px',
            animation: 'spin 1s linear infinite'
          }} />
          <div style={{
            fontSize: '18px',
            color: '#1890ff',
            fontWeight: 500
          }}>
            Loading translations...
          </div>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  // ========================================================================
  // RENDER
  // ========================================================================

  const isRTL = translationService.getLocaleMetadata(locale).direction === 'rtl';

  // Get available languages from LANGUAGES constant
  const availableLanguages: Language[] = Object.values(LANGUAGES).map(lang => ({
    code: lang.code,
    name: lang.englishName,
    nativeName: lang.name,
    flag: lang.flag || 'us',
    direction: lang.direction
  }));

  return (
    <I18nContext.Provider value={{
      locale,
      isReady,
      isRTL,
      availableLanguages,
      changeLanguage: changeLocale, // Alias for compatibility
      changeLocale
    }}>
      {children}
    </I18nContext.Provider>
  );
};

// ========================================================================
// HOOK
// ========================================================================

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
};

export default I18nProvider;
