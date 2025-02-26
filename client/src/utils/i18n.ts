import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import english from '../constants/locales/en/translation.json';
import french from '../constants/locales/fr/translation.json';
import spanish from '../constants/locales/es/translation.json';
import tamil from '../constants/locales/ta/translation.json';
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: english
  },
  fr: {
    translation: french
  },
  es: {
    translation: spanish
  },
  ta:{
    translation:tamil
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  // Function to change language dynamically
export const changeLanguage = (language: string) => {
  i18n.changeLanguage(language);
};


  export default i18n;