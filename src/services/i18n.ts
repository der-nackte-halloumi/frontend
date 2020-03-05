import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      'meta-desc':
        'unpackaged.world helps you finding shops for buying unpackaged products.',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'development',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
