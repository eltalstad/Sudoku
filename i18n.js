import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from 'expo-localization';

import en from "./locales/en.json";
import no from "./locales/no.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en: { translation: en },
    no: { translation: no },
  },
  lng: getLocales()[0].languageTag,
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
