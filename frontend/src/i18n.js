import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import {reactI18nextModule} from "react-i18next";

import translationEN from './locales/en/translation.json';
import translationUA from './locales/ua/translation.json';


const resources = {
    en: {
        translation: translationEN
    },
    ua: {
        translation: translationUA
    }
};

i18n
    .use(detector)
    .use(reactI18nextModule)
    .init({
        resources,
        fallbackLng: "ua",

        keySeparator: false,

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
