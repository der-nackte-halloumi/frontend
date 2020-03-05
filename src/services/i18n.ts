import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import de from '../translations/de.json';
import en from '../translations/en.json';
import es from '../translations/es.json';

const resources = {
  en: { translation: en },
  de: { translation: de },
  es: { translation: es },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
});

export default i18n;
