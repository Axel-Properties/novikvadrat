(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__36711f5d._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/i18n/config.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/config.ts [middleware-edge] (ecmascript)");
;
;
// Mapping of translated slugs to actual route paths
const routeRewrites = {
    // English translations -> actual routes
    'contact': 'kontakt',
    'new-developments': 'novogradnja',
    'project': 'projekat',
    'developer': 'gradjevinar',
    // Serbian Cyrillic translations -> actual routes
    'контакт': 'kontakt',
    'новоградња': 'novogradnja',
    'пројекат': 'projekat',
    'грађевинар': 'gradjevinar'
};
function middleware(request) {
    const pathname = request.nextUrl.pathname;
    // Check if pathname is missing a locale
    const pathnameIsMissingLocale = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["locales"].every((locale)=>!pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
    // Exclude API routes, static files, and other system routes
    if (pathname.startsWith('/api/') || pathname.startsWith('/_next/') || pathname.includes('/favicon.ico') || pathname.includes('.') // files with extensions
    ) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        // Try to get locale from Accept-Language header
        const acceptLanguage = request.headers.get('accept-language');
        let detectedLocale = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["defaultLocale"];
        if (acceptLanguage) {
            // Check for Serbian
            if (acceptLanguage.includes('sr')) {
                detectedLocale = 'sr';
            } else if (acceptLanguage.includes('en')) {
                detectedLocale = 'en';
            }
        }
        // Also check for saved preference in cookie
        const localeCookie = request.cookies.get('locale');
        if (localeCookie && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["locales"].includes(localeCookie.value)) {
            detectedLocale = localeCookie.value;
        }
        // Redirect to the same path with locale prefix
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(`/${detectedLocale}${pathname}`, request.url));
    }
    // Handle route rewrites for translated URLs
    const segments = pathname.split('/');
    const locale = segments[1];
    let needsRewrite = false;
    const rewrittenSegments = segments.map((segment, index)=>{
        if (index <= 1) return segment // Keep empty string and locale
        ;
        if (routeRewrites[segment]) {
            needsRewrite = true;
            return routeRewrites[segment];
        }
        return segment;
    });
    if (needsRewrite) {
        const rewrittenPath = rewrittenSegments.join('/');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].rewrite(new URL(rewrittenPath, request.url));
    }
    // Set locale cookie
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    response.cookies.set('locale', locale, {
        maxAge: 60 * 60 * 24 * 365
    }); // 1 year
    return response;
}
const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next|api|favicon.ico).*)'
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__36711f5d._.js.map