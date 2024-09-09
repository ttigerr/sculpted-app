// $ yarn add i18next react-i18next for a command to install packages
import i18next from "i18next";
import enNs from './en-us/localization.json';

i18next.init
({
    fallbackLng: "en",
    defaultNS: "ns",
    compatibilityJSON: 'v3',
    resources: {
        en: {
            ns: enNs
        }
    }
});

export default i18next;