"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var Language;
(function (Language) {
    Language["EN"] = "en";
    Language["DE"] = "de";
    Language["FR"] = "fr";
    Language["IT"] = "it";
})(Language = exports.Language || (exports.Language = {}));
var translations = {};
var language = Language.EN;
var context = React.createContext(Language.EN);
exports.configureLanguage = function (t, l) {
    translations = t;
    language = l || Language.EN;
    context = React.createContext(language);
    return context;
};
exports.getLanguageContext = function () { return context; };
exports.getLanguage = function () { return language; };
exports.getTranslation = function (l) { return function (k) {
    if (translations[k] && translations[k][l]) {
        return translations[k][l];
    }
    if (!isNaN(Number(k))) {
        return "" + k;
    }
    return 'Unknown';
}; };
//# sourceMappingURL=language.js.map