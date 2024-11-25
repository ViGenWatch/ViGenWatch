import i18nOriginal from 'i18next';
import { initReactI18next } from 'react-i18next';

// import enSidebar from '@khaitd0340/auspice/src/locales/en/sidebar.json';
// import viSidebar from '@khaitd0340/auspice/src/locales/vi/sidebar.json';

// import enTranslation from '@khaitd0340/auspice/src/locales/en/translation.json';
// import viTranslation from '@khaitd0340/auspice/src/locales/vi/translation.json';

import enNavbar from '../src/locales/en/navbar.json';
import viNavbar from '../src/locales/vi/navbar.json';
import enStart from '../src/locales/en/start.json';
import viStart from '../src/locales/vi/start.json';
import enReference from '../src/locales/en/reference.json';
import viReference from '../src/locales/vi/reference.json';
import enExport from '../src/locales/en/export.json';
import viExport from '../src/locales/vi/export.json';

export const AUSPICE_I18N_NAMESPACES = ['language', 'sidebar', 'translation'];

export function i18nAuspiceInit() {
  const i18nAuspice = i18nOriginal.use(initReactI18next).createInstance({
    resources: {
      vi: { navbar: viNavbar, start: viStart, reference: viReference, export: viExport },
      en: { navbar: enNavbar, start: enStart, reference: enReference, export: enExport }
    },
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    defaultNS: 'translation',
    initImmediate: true,
    debug: true
  });

  i18nAuspice.init();

  return i18nAuspice;
}
export const localeKeys = ['en', 'vi'];

export async function changeAuspiceLocale(i18nAuspice, localeKey) {
  if (localeKeys.includes(localeKey)) {
    await i18nAuspice.changeLanguage(localeKey);
    return true;
  }
  return false;
}
const i18nAuspice = i18nAuspiceInit();

export default i18nAuspice;
