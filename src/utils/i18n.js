import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "../data/locales/en/translation.json";
import fr from "../data/locales/fr/translation.json";
import zh from "../data/locales/zh/translation.json";


// const resources = {
//   en: {
//     translation: {
//       WelcomeMessage: "Welcome to React and react-i18next"
//     }
//   },
//   fr: {
//     translation: {
//       WelcomeMessage: "Bienvenue à React et react-i18next"
//     }
//   }
// };

i18n
 .use(LanguageDetector)   
 .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      
      en: { translation: en },
      fr: { translation: fr },
      zh: { translation: zh },

    },

    fallbackLng: "zh",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;