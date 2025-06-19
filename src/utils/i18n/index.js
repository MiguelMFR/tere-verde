import enLang from './locales/en/en.json';
import brLang from './locales/br/br.json'

const resources = {
  en: {
    translation: enLang,
  },
  br: {
    translation: brLang,
  }
};

i18n
  .use(initReactI18next)
  .init({
    debug: true,
    returnObjects: true,
    resources,
    fallbakckLng: 'br',
    lng: "br",
    interpolation: {
      escapeValue: false,
    },
  });
export default i18n;
