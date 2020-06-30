import * as React from 'react';
export declare enum Language {
    EN = "en",
    DE = "de",
    FR = "fr",
    IT = "it"
}
export declare type Translations = Record<string, {
    [k in Language]: string;
}>;
export declare const configureLanguage: (t: Record<string, {
    en: string;
    de: string;
    fr: string;
    it: string;
}>, l?: Language) => React.Context<Language>;
export declare const getLanguageContext: () => React.Context<Language>;
export declare const getLanguage: () => Language;
export declare const getTranslation: (l: Language) => (k: any) => string;
