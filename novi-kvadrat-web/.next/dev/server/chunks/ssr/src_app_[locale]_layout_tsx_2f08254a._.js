module.exports = [
"[project]/src/app/[locale]/layout.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LocaleLayout,
    "generateStaticParams",
    ()=>generateStaticParams
]);
function generateStaticParams() {
    return [
        {
            locale: 'en'
        },
        {
            locale: 'sr'
        },
        {
            locale: 'sr-cyrl'
        }
    ];
}
async function LocaleLayout({ children, params }) {
    const { locale } = await params;
    return children;
}
}),
];

//# sourceMappingURL=src_app_%5Blocale%5D_layout_tsx_2f08254a._.js.map