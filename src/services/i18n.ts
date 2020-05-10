import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import de from '../translations/de.json';
import en from '../translations/en.json';
import es from '../translations/es.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
  es: { translation: es },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: false,
    detection: {
      lookupQuerystring: 'lng',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    },
  });

export default i18n;
