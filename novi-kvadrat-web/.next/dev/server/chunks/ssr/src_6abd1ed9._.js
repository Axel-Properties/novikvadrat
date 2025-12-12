module.exports = [
"[project]/src/i18n/config.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "defaultLocale",
    ()=>defaultLocale,
    "getLocalizedPath",
    ()=>getLocalizedPath,
    "getLocalizedSlug",
    ()=>getLocalizedSlug,
    "localeNames",
    ()=>localeNames,
    "locales",
    ()=>locales,
    "slugTranslations",
    ()=>slugTranslations
]);
const locales = [
    'en',
    'sr',
    'sr-cyrl'
];
const defaultLocale = 'sr';
const localeNames = {
    'en': 'English',
    'sr': 'Srpski',
    'sr-cyrl': 'Српски'
};
const slugTranslations = {
    // Routes
    'novogradnja': {
        en: 'new-developments',
        sr: 'novogradnja',
        'sr-cyrl': 'новоградња'
    },
    'projekat': {
        en: 'project',
        sr: 'projekat',
        'sr-cyrl': 'пројекат'
    },
    'gradjevinar': {
        en: 'developer',
        sr: 'gradjevinar',
        'sr-cyrl': 'грађевинар'
    },
    'kontakt': {
        en: 'contact',
        sr: 'kontakt',
        'sr-cyrl': 'контакт'
    },
    'o-nama': {
        en: 'about',
        sr: 'o-nama',
        'sr-cyrl': 'о-нама'
    },
    'privacy-policy': {
        en: 'privacy-policy',
        sr: 'politika-privatnosti',
        'sr-cyrl': 'политика-приватности'
    },
    'terms': {
        en: 'terms',
        sr: 'uslovi',
        'sr-cyrl': 'услови'
    },
    'cookies': {
        en: 'cookies',
        sr: 'kolacici',
        'sr-cyrl': 'колачићи'
    },
    // Cities
    'beograd': {
        en: 'belgrade',
        sr: 'beograd',
        'sr-cyrl': 'београд'
    },
    'novi-sad': {
        en: 'novi-sad',
        sr: 'novi-sad',
        'sr-cyrl': 'нови-сад'
    },
    'nis': {
        en: 'nis',
        sr: 'nis',
        'sr-cyrl': 'ниш'
    },
    'kragujevac': {
        en: 'kragujevac',
        sr: 'kragujevac',
        'sr-cyrl': 'крагујевац'
    }
};
function getLocalizedSlug(slug, locale) {
    // Check if this slug has a translation
    const translations = slugTranslations[slug];
    if (translations) {
        return translations[locale] || slug;
    }
    // Return original slug if no translation exists
    return slug;
}
function getLocalizedPath(path, locale) {
    // Split path into segments
    const segments = path.split('/').filter(Boolean);
    // Translate each segment
    const translatedSegments = segments.map((segment)=>{
        return getLocalizedSlug(segment, locale);
    });
    // Add locale prefix and reconstruct path
    return `/${locale}/${translatedSegments.join('/')}`;
}
}),
"[project]/src/app/[locale]/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocaleLayout,
    "generateStaticParams",
    ()=>generateStaticParams
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/config.ts [app-rsc] (ecmascript)");
;
function generateStaticParams() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["locales"].map((locale)=>({
            locale
        }));
}
async function LocaleLayout({ children, params }) {
    // Await params as required by Next.js 16
    const { locale } = await params;
    return children;
}
}),
];

//# sourceMappingURL=src_6abd1ed9._.js.map