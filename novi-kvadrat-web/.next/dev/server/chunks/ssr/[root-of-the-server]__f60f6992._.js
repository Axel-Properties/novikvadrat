module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "formatCurrency",
    ()=>formatCurrency
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('sr-RS', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}
}),
"[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: "bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700",
            secondary: "bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300",
            outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100",
            ghost: "text-secondary-700 hover:bg-secondary-100 active:bg-secondary-200",
            danger: "bg-error-500 text-white hover:bg-error-600 active:bg-error-700",
            link: "text-primary-500 underline-offset-4 hover:underline active:text-primary-700"
        },
        size: {
            sm: "h-8 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
            xl: "h-14 px-8 text-lg",
            icon: "h-10 w-10"
        },
        fullWidth: {
            true: "w-full"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "md"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, variant, size, fullWidth, asChild = false, isLoading = false, children, disabled, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            fullWidth,
            className
        })),
        ref: ref,
        disabled: disabled || isLoading,
        ...props,
        children: [
            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: "animate-spin -ml-1 mr-2 h-4 w-4",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        className: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        strokeWidth: "4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/button.tsx",
                        lineNumber: 67,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        className: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/button.tsx",
                        lineNumber: 75,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ui/button.tsx",
                lineNumber: 61,
                columnNumber: 11
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/button.tsx",
        lineNumber: 54,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
Button.displayName = "Button";
;
}),
"[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DropdownMenu",
    ()=>DropdownMenu,
    "DropdownMenuCheckboxItem",
    ()=>DropdownMenuCheckboxItem,
    "DropdownMenuContent",
    ()=>DropdownMenuContent,
    "DropdownMenuGroup",
    ()=>DropdownMenuGroup,
    "DropdownMenuItem",
    ()=>DropdownMenuItem,
    "DropdownMenuLabel",
    ()=>DropdownMenuLabel,
    "DropdownMenuPortal",
    ()=>DropdownMenuPortal,
    "DropdownMenuRadioGroup",
    ()=>DropdownMenuRadioGroup,
    "DropdownMenuRadioItem",
    ()=>DropdownMenuRadioItem,
    "DropdownMenuSeparator",
    ()=>DropdownMenuSeparator,
    "DropdownMenuShortcut",
    ()=>DropdownMenuShortcut,
    "DropdownMenuSub",
    ()=>DropdownMenuSub,
    "DropdownMenuSubContent",
    ()=>DropdownMenuSubContent,
    "DropdownMenuSubTrigger",
    ()=>DropdownMenuSubTrigger,
    "DropdownMenuTrigger",
    ()=>DropdownMenuTrigger
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@radix-ui/react-dropdown-menu/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle.js [app-ssr] (ecmascript) <export default as Circle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const DropdownMenu = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"];
const DropdownMenuTrigger = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"];
const DropdownMenuGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"];
const DropdownMenuPortal = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"];
const DropdownMenuSub = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sub"];
const DropdownMenuRadioGroup = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioGroup"];
const DropdownMenuSubTrigger = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, inset, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubTrigger"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent', inset && 'pl-8', className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                className: "ml-auto h-4 w-4"
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 37,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 27,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuSubTrigger.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubTrigger"].displayName;
const DropdownMenuSubContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubContent"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 47,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuSubContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SubContent"].displayName;
const DropdownMenuContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, sideOffset = 4, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            ref: ref,
            sideOffset: sideOffset,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md', 'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2', className),
            ...props
        }, void 0, false, {
            fileName: "[project]/src/components/ui/dropdown-menu.tsx",
            lineNumber: 64,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuContent.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"].displayName;
const DropdownMenuItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', inset && 'pl-8', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 84,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"].displayName;
const DropdownMenuCheckboxItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, checked, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckboxItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className),
        checked: checked,
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 110,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 109,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 100,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuCheckboxItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CheckboxItem"].displayName;
const DropdownMenuRadioItem = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, children, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioItem"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Circle$3e$__["Circle"], {
                        className: "h-2 w-2 fill-current"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                    lineNumber: 133,
                    columnNumber: 7
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/ui/dropdown-menu.tsx",
                lineNumber: 132,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            children
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 124,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuRadioItem.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RadioItem"].displayName;
const DropdownMenuLabel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, inset, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 148,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuLabel.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"].displayName;
const DropdownMenuSeparator = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["forwardRef"](({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('-mx-1 my-1 h-px bg-muted', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 164,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0)));
DropdownMenuSeparator.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dropdown$2d$menu$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"].displayName;
const DropdownMenuShortcut = ({ className, ...props })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('ml-auto text-xs tracking-widest opacity-60', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/dropdown-menu.tsx",
        lineNumber: 177,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
DropdownMenuShortcut.displayName = 'DropdownMenuShortcut';
;
}),
"[project]/src/i18n/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/src/components/language-switcher.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LanguageSwitcher",
    ()=>LanguageSwitcher
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/config.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
function LanguageSwitcher({ currentLocale = 'sr' }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const handleLanguageChange = (newLocale)=>{
        // Get current path without locale
        const segments = pathname.split('/').filter(Boolean);
        // Remove current locale if present
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].includes(segments[0])) {
            segments.shift();
        }
        // Build new path with new locale
        const newPath = `/${newLocale}${segments.length > 0 ? '/' + segments.join('/') : ''}`;
        router.push(newPath);
    };
    const getLanguageCode = (locale)=>{
        switch(locale){
            case 'en':
                return 'EN';
            case 'sr':
                return 'SR';
            case 'sr-cyrl':
                return 'СР';
            default:
                return locale.toUpperCase();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "sm",
                    className: "gap-1.5 px-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/language-switcher.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: getLanguageCode(currentLocale)
                        }, void 0, false, {
                            fileName: "[project]/src/components/language-switcher.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/language-switcher.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/language-switcher.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                className: "min-w-[150px]",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].map((locale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: ()=>handleLanguageChange(locale),
                        className: currentLocale === locale ? 'bg-primary-50' : '',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                className: "h-4 w-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/language-switcher.tsx",
                                lineNumber: 61,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: getLanguageCode(locale)
                            }, void 0, false, {
                                fileName: "[project]/src/components/language-switcher.tsx",
                                lineNumber: 62,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "ml-auto text-xs text-gray-500",
                                children: [
                                    locale === 'en' && 'English',
                                    locale === 'sr' && 'Srpski',
                                    locale === 'sr-cyrl' && 'Српски'
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/language-switcher.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, this)
                        ]
                    }, locale, true, {
                        fileName: "[project]/src/components/language-switcher.tsx",
                        lineNumber: 56,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/language-switcher.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/language-switcher.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/city-selector.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CitySelector",
    ()=>CitySelector
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/dropdown-menu.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
'use client';
;
;
;
;
;
;
function CitySelector({ currentCity, currentLocale = 'sr' }) {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const [cities, setCities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Extract current city slug from pathname if not provided
    const getCurrentCitySlug = ()=>{
        if (currentCity) return currentCity;
        const segments = pathname.split('/').filter(Boolean);
        // Check if we're on a city page: /[locale]/novogradnja/[city]
        if (segments.length >= 3 && segments[1] === 'novogradnja') {
            return segments[2];
        }
        return null;
    };
    const currentCitySlug = getCurrentCitySlug();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function fetchCities() {
            try {
                const response = await fetch('/api/cities?country=Serbia');
                const result = await response.json();
                if (result.success) {
                    setCities(result.data || []);
                }
            } catch (error) {
                console.error('Failed to fetch cities:', error);
            } finally{
                setLoading(false);
            }
        }
        fetchCities();
    }, []);
    const handleCityChange = (citySlug)=>{
        // Get current path segments
        const segments = pathname.split('/').filter(Boolean);
        // Remove current locale if present
        let localeIndex = -1;
        if (segments[0] === 'en' || segments[0] === 'sr' || segments[0] === 'sr-cyrl') {
            localeIndex = 0;
        }
        // Build new path
        const locale = localeIndex >= 0 ? segments[localeIndex] : currentLocale;
        const restOfPath = localeIndex >= 0 ? segments.slice(1) : segments;
        // If we're on a city page, replace the city slug
        if (restOfPath[0] === 'novogradnja' && restOfPath[1]) {
            restOfPath[1] = citySlug;
        } else if (restOfPath[0] === 'novogradnja') {
            restOfPath.push(citySlug);
        } else {
            // Navigate to city projects page
            const newPath = `/${locale}/novogradnja/${citySlug}`;
            router.push(newPath);
            return;
        }
        const newPath = `/${locale}/${restOfPath.join('/')}`;
        router.push(newPath);
    };
    const getCityName = (city)=>{
        switch(currentLocale){
            case 'en':
                return city.name_en;
            case 'sr-cyrl':
                return city.name_sr_cyr;
            case 'sr':
            default:
                return city.name_sr_lat;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenu"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    variant: "ghost",
                    size: "sm",
                    className: "gap-1",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                            className: "h-4 w-4"
                        }, void 0, false, {
                            fileName: "[project]/src/components/city-selector.tsx",
                            lineNumber: 112,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-sm font-medium",
                            children: "Cities in Serbia"
                        }, void 0, false, {
                            fileName: "[project]/src/components/city-selector.tsx",
                            lineNumber: 113,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                            className: "h-3 w-3"
                        }, void 0, false, {
                            fileName: "[project]/src/components/city-selector.tsx",
                            lineNumber: 114,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/city-selector.tsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/city-selector.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                align: "end",
                className: "!overflow-y-auto !overflow-x-hidden min-w-[200px] max-h-[400px] custom-scrollbar bg-white",
                children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                    disabled: true,
                    children: "Loading..."
                }, void 0, false, {
                    fileName: "[project]/src/components/city-selector.tsx",
                    lineNumber: 122,
                    columnNumber: 11
                }, this) : cities.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                    disabled: true,
                    children: "No cities found"
                }, void 0, false, {
                    fileName: "[project]/src/components/city-selector.tsx",
                    lineNumber: 124,
                    columnNumber: 11
                }, this) : cities.map((city)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                        onClick: ()=>handleCityChange(city.slug),
                        className: currentCitySlug === city.slug ? 'bg-primary-50' : '',
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                className: "h-4 w-4 mr-2"
                            }, void 0, false, {
                                fileName: "[project]/src/components/city-selector.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-medium",
                                children: getCityName(city)
                            }, void 0, false, {
                                fileName: "[project]/src/components/city-selector.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this)
                        ]
                    }, city.id, true, {
                        fileName: "[project]/src/components/city-selector.tsx",
                        lineNumber: 127,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/city-selector.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/city-selector.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/locales/en.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"common\":{\"search\":\"Search\",\"searchPlaceholder\":\"Search by location, project, or developer...\",\"viewAll\":\"View All\",\"from\":\"From\",\"perSqm\":\"per m²\",\"completion\":\"Completion\",\"showPhone\":\"Show phone\",\"getConsultation\":\"Get consultation\",\"save\":\"Save\",\"saved\":\"Saved\",\"call\":\"Call\",\"consultation\":\"Consultation\"},\"nav\":{\"home\":\"Home\",\"newDevelopments\":\"New Developments\",\"developers\":\"Developers\",\"aboutUs\":\"About\",\"contact\":\"Contact\"},\"home\":{\"title\":\"Find Your Perfect Property in Serbia\",\"subtitle\":\"Discover new developments, apartments, houses, and commercial properties\",\"featuredProjects\":\"Featured Projects\",\"latestProperties\":\"Latest Properties\",\"topDevelopers\":\"Top Developers\",\"popularCities\":\"Popular Cities\",\"statistics\":{\"projects\":\"Projects\",\"apartments\":\"Apartments\",\"developers\":\"Developers\",\"cities\":\"Cities\"}},\"projects\":{\"title\":\"New Developments in {city}\",\"projectsCount\":\"{count} projects\",\"filters\":{\"allMunicipalities\":\"All municipalities\",\"allStatuses\":\"All statuses\",\"moreFilters\":\"More filters\",\"projectsOnMap\":\"Projects on map\",\"sortBy\":\"Sort by\",\"recommended\":\"Recommended\",\"priceLowHigh\":\"Price: low to high\",\"priceHighLow\":\"Price: high to low\",\"newest\":\"Newest first\",\"completionDate\":\"Completion date\"},\"onRequest\":\"On request\",\"status\":{\"planning\":\"Planning\",\"underConstruction\":\"Under construction\",\"grayFrame\":\"Gray frame\",\"readyToMove\":\"Ready to move\",\"completed\":\"Completed\"},\"noProjectsFound\":\"No projects match your criteria\"},\"projectDetail\":{\"constructionProgress\":\"Construction Progress\",\"completed\":\"completed\",\"percentCompleted\":\"{percent}% completed\",\"aboutProject\":\"About Project\",\"projectDescriptionPlaceholder\":\"Project description will be added soon.\",\"numberOfBuildings\":\"Number of buildings\",\"numberOfFloors\":\"Number of floors\",\"totalApartments\":\"Total apartments\",\"availableApartments\":\"Available apartments\",\"parkingSpaces\":\"Parking spaces\",\"heating\":\"Heating\",\"documents\":\"Documents\",\"downloadBrochure\":\"Download brochure\",\"virtualTour\":\"Virtual tour\",\"showOnMap\":\"Show on map\",\"layouts\":\"Layouts\",\"location\":\"Location\",\"amenities\":\"Amenities\",\"mortgage\":\"Mortgage\",\"credit\":\"Credit\",\"similarProjects\":\"Similar Projects\",\"onRequest\":\"On request\",\"address\":\"Address\",\"mapComingSoon\":\"Map will be added soon\",\"featured\":\"Featured\",\"priceFrom\":\"Price from\",\"pricePerSqm\":\"Price per m²\",\"priceWithVat\":\"Price includes VAT\",\"vatRefundFirstBuyer\":\"VAT refund available for first-time buyers\",\"verified\":\"Verified\",\"projects\":\"projects\",\"completedProjects\":\"completed\",\"showPhone\":\"Show number\",\"scheduleConsultation\":\"Schedule consultation\",\"overview\":\"Overview\",\"availableLayouts\":\"Available apartment layouts\",\"area\":\"Area\",\"terrace\":\"Terrace\",\"rooms\":\"Rooms\",\"bathrooms\":\"Bathrooms\",\"available\":\"Available\",\"elevator\":\"Elevator\",\"garage\":\"Garage\",\"energyClass\":\"Energy class\",\"heatingTypes\":{\"central\":\"Central heating\",\"floor\":\"Floor heating\",\"gas\":\"Gas heating\",\"electric\":\"Electric heating\",\"heat_pump\":\"Heat pump\"},\"layoutTypes\":{\"studio\":\"Studio\",\"one_bedroom\":\"One bedroom\",\"two_bedroom\":\"Two bedroom\",\"three_bedroom\":\"Three bedroom\",\"four_bedroom\":\"Four bedroom\",\"penthouse\":\"Penthouse\"},\"tabs\":{\"overview\":\"Overview\",\"layouts\":\"Layouts\",\"location\":\"Location\",\"amenities\":\"Amenities\",\"mortgage\":\"Credit\"},\"amenitiesAndFeatures\":\"Amenities and Features\",\"amenitiesComingSoon\":\"Amenities information will be available soon.\",\"mortgageCalculator\":\"Mortgage Calculator\",\"propertyPrice\":\"Property Price\",\"downPayment\":\"Down Payment\",\"loanTerm\":\"Loan Term\",\"interestRate\":\"Interest Rate\",\"years\":\"years\",\"monthlyPayment\":\"Monthly Payment\",\"calculatePayment\":\"Calculate Payment\",\"units\":\"units\",\"loanAmount\":\"Loan Amount\",\"total\":\"Total\"},\"developer\":{\"verified\":\"Verified\",\"activeProjects\":\"Active Projects\",\"completedProjects\":\"Completed Projects\",\"startingFrom\":\"Starting from\"},\"cities\":{\"belgrade\":\"Belgrade\",\"noviSad\":\"Novi Sad\",\"nis\":\"Niš\",\"kragujevac\":\"Kragujevac\"},\"about\":{\"metadata\":{\"title\":\"About Us - Novi Kvadrat\",\"description\":\"Learn about Novi Kvadrat - Serbia's leading real estate platform for new developments and properties\"},\"hero\":{\"title\":\"About Novi Kvadrat\",\"subtitle\":\"Your Trusted Real Estate Partner\",\"description\":\"We connect buyers with the best new developments and properties across Serbia, making your journey to homeownership simple and transparent.\"},\"company\":{\"title\":\"Who We Are\",\"description\":\"Novi Kvadrat is Serbia's premier digital platform for discovering new construction projects and real estate opportunities. Founded with a mission to revolutionize the property search experience, we bring together buyers, developers, and real estate professionals in one comprehensive marketplace.\",\"story\":\"Our journey began with a simple observation: finding the right property in Serbia's growing real estate market was unnecessarily complicated. We set out to change that by creating a platform that combines cutting-edge technology with deep local market expertise.\",\"founded\":\"Founded\",\"foundedYear\":\"2024\"},\"mission\":{\"title\":\"Our Mission\",\"description\":\"To empower every Serbian to find their perfect home by providing transparent, comprehensive, and accessible real estate information.\"},\"vision\":{\"title\":\"Our Vision\",\"description\":\"To become the most trusted real estate platform in the Balkans, setting new standards for transparency and innovation in property transactions.\"},\"stats\":{\"title\":\"Platform in Numbers\",\"properties\":\"Properties Listed\",\"developers\":\"Trusted Developers\",\"cities\":\"Cities Covered\",\"users\":\"Happy Users\"},\"features\":{\"title\":\"Why Choose Us\",\"subtitle\":\"Discover what makes Novi Kvadrat the preferred choice for property seekers in Serbia\",\"verified\":{\"title\":\"Verified Listings\",\"description\":\"Every property on our platform is verified for accuracy and authenticity, giving you peace of mind.\"},\"search\":{\"title\":\"Smart Search\",\"description\":\"Our advanced search and filtering tools help you find exactly what you're looking for in seconds.\"},\"database\":{\"title\":\"Comprehensive Database\",\"description\":\"Access the largest collection of new developments and properties across Serbia.\"},\"developers\":{\"title\":\"Trusted Developers\",\"description\":\"We partner only with reputable developers who have a proven track record of quality construction.\"},\"insights\":{\"title\":\"Market Insights\",\"description\":\"Stay informed with up-to-date market trends, pricing data, and neighborhood information.\"},\"support\":{\"title\":\"Dedicated Support\",\"description\":\"Our team of real estate experts is here to guide you through every step of your property journey.\"}},\"team\":{\"title\":\"Meet Our Team\",\"subtitle\":\"The passionate people behind Novi Kvadrat\",\"members\":{\"member1\":{\"name\":\"Marko Petrovic\",\"position\":\"CEO & Founder\",\"bio\":\"15+ years in real estate development\"},\"member2\":{\"name\":\"Ana Jovanovic\",\"position\":\"Head of Operations\",\"bio\":\"Expert in real estate market analysis\"},\"member3\":{\"name\":\"Stefan Nikolic\",\"position\":\"Chief Technology Officer\",\"bio\":\"Building innovative PropTech solutions\"},\"member4\":{\"name\":\"Jelena Markovic\",\"position\":\"Head of Partnerships\",\"bio\":\"Connecting developers with opportunities\"}}},\"timeline\":{\"title\":\"Our Journey\",\"events\":{\"event1\":{\"year\":\"2024\",\"title\":\"Platform Launch\",\"description\":\"Novi Kvadrat officially launches, bringing modern real estate technology to Serbia.\"},\"event2\":{\"year\":\"2024\",\"title\":\"Belgrade Coverage\",\"description\":\"Complete coverage of all new developments in Belgrade and surrounding areas.\"},\"event3\":{\"year\":\"2024\",\"title\":\"Developer Partnerships\",\"description\":\"Partnerships established with 50+ leading construction companies.\"},\"event4\":{\"year\":\"2025\",\"title\":\"Expansion\",\"description\":\"Expanding coverage to Novi Sad, Nis, and other major Serbian cities.\"},\"event5\":{\"year\":\"2025\",\"title\":\"10,000 Users\",\"description\":\"Reaching our first milestone of 10,000 registered users.\"}}},\"cta\":{\"title\":\"Ready to Find Your Dream Home?\",\"description\":\"Start your property search today and discover why thousands trust Novi Kvadrat.\",\"primaryBtn\":\"Browse Properties\",\"secondaryBtn\":\"Contact Us\"}},\"contact\":{\"title\":\"Contact Us\",\"subtitle\":\"We're here to help you find your perfect property\",\"form\":{\"name\":\"Full Name\",\"namePlaceholder\":\"Enter your full name\",\"email\":\"Email Address\",\"emailPlaceholder\":\"Enter your email\",\"phone\":\"Phone Number\",\"phonePlaceholder\":\"Enter your phone number\",\"subject\":\"Subject\",\"subjectPlaceholder\":\"Select a subject\",\"subjects\":{\"general\":\"General Inquiry\",\"property\":\"Property Question\",\"developer\":\"Developer Partnership\",\"technical\":\"Technical Support\"},\"message\":\"Message\",\"messagePlaceholder\":\"How can we help you?\",\"submit\":\"Send Message\",\"sending\":\"Sending...\",\"success\":\"Message sent successfully!\",\"error\":\"Failed to send message. Please try again.\"},\"info\":{\"title\":\"Get in Touch\",\"address\":\"Address\",\"addressValue\":\"Green Heart, Bulevar Milutina Milankovića 11b, Beograd 11070\",\"phone\":\"Phone\",\"email\":\"Email\",\"workingHours\":\"Working Hours\",\"workingHoursValue\":\"Mon - Fri: 9:00 - 18:00\",\"followUs\":\"Follow Us\"},\"office\":{\"title\":\"Our Office\",\"description\":\"Visit us at our headquarters in Belgrade\"}},\"heroSearch\":{\"tabs\":{\"properties\":\"Properties\",\"newProjects\":\"New Projects\",\"agents\":\"Agents\"},\"purpose\":{\"buy\":\"Buy\",\"rent\":\"Rent\"},\"completionStatus\":{\"all\":\"All\",\"ready\":\"Ready\",\"offPlan\":\"Off-Plan\"},\"propertyType\":{\"title\":\"Property Type\",\"residential\":\"Residential\",\"commercial\":\"Commercial\",\"types\":{\"apartment\":\"Apartment\",\"house\":\"House\",\"villa\":\"Villa\",\"townhouse\":\"Townhouse\",\"penthouse\":\"Penthouse\",\"studio\":\"Studio\",\"duplex\":\"Duplex\",\"land\":\"Land\",\"office\":\"Office\",\"retail\":\"Retail Space\",\"warehouse\":\"Warehouse\",\"building\":\"Building\"}},\"bedsAndBaths\":{\"title\":\"Beds & Baths\",\"beds\":\"Beds\",\"baths\":\"Baths\",\"studio\":\"Studio\"},\"price\":{\"title\":\"Price\",\"priceRsd\":\"Price (RSD)\",\"minimum\":\"Minimum\",\"maximum\":\"Maximum\",\"any\":\"Any\"},\"search\":{\"placeholder\":\"Search projects, developers, neighborhoods...\"},\"newProjectsFilters\":{\"handoverBy\":\"Handover By\",\"paymentPlan\":\"Payment Plan\",\"completion\":\"% Completion\",\"years\":{\"2024\":\"2024\",\"2025\":\"2025\",\"2026\":\"2026\",\"2027\":\"2027\",\"2028Plus\":\"2028+\"},\"paymentPlans\":{\"any\":\"Any\",\"installments\":\"Installments\",\"mortgage\":\"Mortgage\",\"cash\":\"Cash\"},\"completionLevels\":{\"any\":\"Any\",\"notStarted\":\"Not Started\",\"underConstruction\":\"Under Construction\",\"almostReady\":\"Almost Ready\",\"completed\":\"Completed\"}},\"actions\":{\"search\":\"Search\",\"reset\":\"Reset\",\"done\":\"Done\"}},\"privacy\":{\"hero\":{\"title\":\"Privacy Policy\",\"description\":\"We are committed to protecting your privacy and ensuring the security of your personal information.\",\"lastUpdated\":\"Last Updated\",\"lastUpdatedDate\":\"January 2025\"},\"intro\":{\"text\":\"This Privacy Policy explains how Novi Kvadrat (\\\"we\\\", \\\"us\\\", or \\\"our\\\") collects, uses, and protects your personal information when you use our real estate platform. By using our services, you agree to the collection and use of information in accordance with this policy.\"},\"sections\":{\"collection\":{\"title\":\"Information We Collect\",\"description\":\"We collect various types of information to provide and improve our services to you.\",\"items\":{\"personal\":\"Personal information: name, email address, phone number, and account credentials\",\"property\":\"Property preferences: search history, saved properties, and inquiry history\",\"usage\":\"Usage data: how you interact with our platform, pages visited, and features used\",\"device\":\"Device information: IP address, browser type, device type, and operating system\"}},\"usage\":{\"title\":\"How We Use Your Information\",\"description\":\"We use the information we collect for various purposes related to providing and improving our services.\",\"items\":{\"services\":\"To provide and maintain our real estate platform services\",\"communication\":\"To communicate with you about properties, updates, and promotional offers\",\"improvement\":\"To analyze usage patterns and improve our platform functionality\",\"legal\":\"To comply with legal obligations and protect our rights\"}},\"sharing\":{\"title\":\"Information Sharing\",\"description\":\"We may share your information with third parties in specific circumstances.\",\"items\":{\"developers\":\"With property developers and agents when you express interest in their listings\",\"providers\":\"With service providers who assist us in operating our platform\",\"legal\":\"When required by law or to protect our legal rights\"}},\"cookies\":{\"title\":\"Cookies and Tracking\",\"description\":\"We use cookies and similar tracking technologies to track activity on our platform and store certain information. Cookies help us improve your experience by remembering your preferences and understanding how you use our platform. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent.\"},\"rights\":{\"title\":\"Your Rights\",\"description\":\"You have certain rights regarding your personal information under applicable data protection laws.\",\"items\":{\"access\":\"Right to access: Request a copy of the personal data we hold about you\",\"correction\":\"Right to correction: Request correction of inaccurate or incomplete data\",\"deletion\":\"Right to deletion: Request deletion of your personal data\",\"portability\":\"Right to data portability: Receive your data in a structured, machine-readable format\",\"objection\":\"Right to object: Object to certain types of processing of your data\"}},\"security\":{\"title\":\"Data Security\",\"description\":\"We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.\"}},\"contact\":{\"title\":\"Contact Us About Privacy\",\"description\":\"If you have any questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at:\"},\"related\":{\"title\":\"Related Documents\",\"terms\":\"Terms of Service\",\"cookies\":\"Cookie Policy\"}},\"terms\":{\"hero\":{\"title\":\"Terms of Service\",\"description\":\"Please read these terms carefully before using Novi Kvadrat platform.\",\"lastUpdated\":\"Last Updated\",\"lastUpdatedDate\":\"January 2025\"},\"intro\":{\"text\":\"Welcome to Novi Kvadrat. These Terms of Service (\\\"Terms\\\") govern your use of our website and services. By accessing or using Novi Kvadrat, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access our services.\"},\"sections\":{\"acceptance\":{\"title\":\"Acceptance of Terms\",\"description\":\"By creating an account or using any part of our platform, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you are using our services on behalf of an organization, you agree to these Terms on behalf of that organization.\"},\"services\":{\"title\":\"Our Services\",\"description\":\"Novi Kvadrat provides an online platform that connects property buyers, sellers, developers, and real estate agents in Serbia. Our services include property listings, search functionality, developer profiles, mortgage calculators, and related real estate information. We act as an intermediary and do not own, manage, or sell any properties directly.\"},\"userObligations\":{\"title\":\"User Obligations\",\"description\":\"As a user of our platform, you agree to the following obligations:\",\"items\":{\"accurate\":\"Provide accurate and complete information when creating an account or submitting inquiries\",\"lawful\":\"Use our platform only for lawful purposes and in accordance with these Terms\",\"respectful\":\"Treat other users, developers, and agents with respect and professionalism\",\"security\":\"Maintain the security of your account credentials and notify us of any unauthorized access\"}},\"propertyListings\":{\"title\":\"Property Listings\",\"description\":\"If you list properties on our platform, you agree to the following:\",\"items\":{\"accuracy\":\"All listing information must be accurate, complete, and not misleading\",\"authorization\":\"You must have authorization to list the property\",\"updates\":\"Keep listings updated and remove sold or unavailable properties promptly\",\"compliance\":\"Comply with all applicable real estate laws and regulations in Serbia\"}},\"intellectualProperty\":{\"title\":\"Intellectual Property\",\"description\":\"All content on Novi Kvadrat, including but not limited to text, graphics, logos, images, and software, is the property of Novi Kvadrat or its content suppliers and is protected by intellectual property laws. You may not reproduce, distribute, modify, or create derivative works from our content without explicit written permission.\"},\"disclaimer\":{\"title\":\"Disclaimer of Warranties\",\"description\":\"Our platform is provided \\\"as is\\\" and \\\"as available\\\" without any warranties of any kind, either express or implied. We do not guarantee the accuracy, completeness, or reliability of any property listings or information provided by third parties. Users should independently verify all property information before making any decisions.\"},\"liability\":{\"title\":\"Limitation of Liability\",\"description\":\"To the maximum extent permitted by law, Novi Kvadrat shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our platform. Our total liability shall not exceed the amount you paid us, if any, in the twelve months preceding the claim.\"},\"changes\":{\"title\":\"Changes to Terms\",\"description\":\"We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting the new Terms on this page and updating the \\\"Last Updated\\\" date. Your continued use of the platform after changes constitutes acceptance of the modified Terms.\"}},\"governingLaw\":{\"title\":\"Governing Law\",\"description\":\"These Terms shall be governed by and construed in accordance with the laws of the Republic of Serbia. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the courts in Belgrade, Serbia.\"},\"contact\":{\"title\":\"Contact Us\",\"description\":\"If you have any questions about these Terms of Service, please contact us at:\"},\"related\":{\"title\":\"Related Documents\",\"privacy\":\"Privacy Policy\",\"cookies\":\"Cookie Policy\"}},\"cookies\":{\"hero\":{\"title\":\"Cookie Policy\",\"description\":\"Learn how we use cookies and similar technologies on our platform.\",\"lastUpdated\":\"Last Updated\",\"lastUpdatedDate\":\"January 2025\"},\"whatAreCookies\":{\"title\":\"What Are Cookies?\",\"description\":\"Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies help us remember your preferences, understand how you use our platform, and improve your overall experience.\"},\"types\":{\"title\":\"Types of Cookies We Use\",\"essential\":{\"title\":\"Essential Cookies\",\"description\":\"These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of these cookies as the website cannot function properly without them.\",\"examples\":{\"1\":\"Session cookies for user authentication\",\"2\":\"Security cookies to prevent fraud\"}},\"analytics\":{\"title\":\"Analytics Cookies\",\"description\":\"These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our platform and provide better services.\",\"examples\":{\"1\":\"Google Analytics for traffic analysis\",\"2\":\"Page view and session duration tracking\"}},\"marketing\":{\"title\":\"Marketing Cookies\",\"description\":\"These cookies are used to track visitors across websites and display relevant advertisements. They help us measure the effectiveness of our advertising campaigns.\",\"examples\":{\"1\":\"Facebook Pixel for ad targeting\",\"2\":\"Google Ads conversion tracking\"}},\"functional\":{\"title\":\"Functional Cookies\",\"description\":\"These cookies enable enhanced functionality and personalization, such as remembering your preferences, language settings, and saved searches.\",\"examples\":{\"1\":\"Language preference cookies\",\"2\":\"Saved property search criteria\"}}},\"required\":\"Required\",\"examples\":\"Examples\",\"thirdParty\":{\"title\":\"Third-Party Cookies\",\"description\":\"Some cookies on our website are placed by third-party services that appear on our pages. We use the following third-party services:\"},\"managing\":{\"title\":\"Managing Your Cookie Preferences\",\"description\":\"You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and some functionality may no longer be available.\",\"browserSettings\":\"You can manage cookies through your browser settings:\"},\"contact\":{\"title\":\"Questions About Cookies\",\"description\":\"If you have any questions about our use of cookies, please contact us at:\"},\"related\":{\"title\":\"Related Documents\",\"privacy\":\"Privacy Policy\",\"terms\":\"Terms of Service\"}}}"));}),
"[project]/src/locales/sr.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"common\":{\"search\":\"Pretraži\",\"searchPlaceholder\":\"Pretraži po lokaciji, projektu ili građevinaru...\",\"viewAll\":\"Vidi sve\",\"from\":\"Od\",\"perSqm\":\"po m²\",\"completion\":\"Završetak\",\"showPhone\":\"Prikaži broj\",\"getConsultation\":\"Zakaži konsultaciju\",\"save\":\"Sačuvaj\",\"saved\":\"Sačuvano\",\"call\":\"Pozovi\",\"consultation\":\"Konsultacija\"},\"nav\":{\"home\":\"Početna\",\"newDevelopments\":\"Novogradnja\",\"developers\":\"Građevinari\",\"aboutUs\":\"O nama\",\"contact\":\"Kontakt\"},\"home\":{\"title\":\"Pronađite savršenu nekretninu u Srbiji\",\"subtitle\":\"Otkrijte novogradnju, stanove, kuće i poslovne prostore\",\"featuredProjects\":\"Istaknuti projekti\",\"latestProperties\":\"Najnovije nekretnine\",\"topDevelopers\":\"Top građevinari\",\"popularCities\":\"Popularne lokacije\",\"statistics\":{\"projects\":\"Projekata\",\"apartments\":\"Stanova\",\"developers\":\"Građevinara\",\"cities\":\"Gradova\"}},\"projects\":{\"title\":\"Novogradnja {city}\",\"projectsCount\":\"{count} projekata\",\"filters\":{\"allMunicipalities\":\"Sve opštine\",\"allStatuses\":\"Svi statusi\",\"moreFilters\":\"Više filtera\",\"projectsOnMap\":\"Projekti na mapi\",\"sortBy\":\"Sortiraj po\",\"recommended\":\"Preporučeno\",\"priceLowHigh\":\"Cena: najniža prva\",\"priceHighLow\":\"Cena: najviša prva\",\"newest\":\"Najnoviji\",\"completionDate\":\"Datum završetka\"},\"onRequest\":\"Na upit\",\"status\":{\"planning\":\"U planiranju\",\"underConstruction\":\"U izgradnji\",\"grayFrame\":\"Siva faza\",\"readyToMove\":\"Useljivo\",\"completed\":\"Završeno\"},\"noProjectsFound\":\"Nema projekata koji odgovaraju vašim kriterijumima\"},\"projectDetail\":{\"constructionProgress\":\"Napredak izgradnje\",\"completed\":\"završeno\",\"percentCompleted\":\"{percent}% završeno\",\"aboutProject\":\"O projektu\",\"projectDescriptionPlaceholder\":\"Opis projekta će biti dodat uskoro.\",\"numberOfBuildings\":\"Broj zgrada\",\"numberOfFloors\":\"Broj spratova\",\"totalApartments\":\"Ukupno stanova\",\"availableApartments\":\"Dostupno stanova\",\"parkingSpaces\":\"Parking mesta\",\"heating\":\"Grejanje\",\"documents\":\"Dokumenti\",\"downloadBrochure\":\"Preuzmi brošuru\",\"virtualTour\":\"Virtuelna tura\",\"showOnMap\":\"Prikaži na mapi\",\"layouts\":\"Raspored\",\"location\":\"Lokacija\",\"amenities\":\"Sadržaji\",\"mortgage\":\"Kredit\",\"credit\":\"Kredit\",\"similarProjects\":\"Slični projekti\",\"onRequest\":\"Na upit\",\"address\":\"Adresa\",\"mapComingSoon\":\"Mapa će biti dodata uskoro\",\"featured\":\"Istaknuto\",\"priceFrom\":\"Cena od\",\"pricePerSqm\":\"Cena po m²\",\"priceWithVat\":\"Cena sa uračunatim PDV-om\",\"vatRefundFirstBuyer\":\"Mogućnost povraćaja PDV-a za prvi stan\",\"verified\":\"Verifikovan\",\"projects\":\"projekata\",\"completedProjects\":\"završeno\",\"showPhone\":\"Prikaži broj\",\"scheduleConsultation\":\"Zakaži konsultaciju\",\"overview\":\"Pregled\",\"availableLayouts\":\"Dostupni rasporedi stanova\",\"area\":\"Površina\",\"terrace\":\"Terasa\",\"rooms\":\"Sobe\",\"bathrooms\":\"Kupatila\",\"available\":\"Dostupno\",\"elevator\":\"Lift\",\"garage\":\"Garaža\",\"energyClass\":\"Energetski razred\",\"heatingTypes\":{\"central\":\"Centralno grejanje\",\"floor\":\"Podno grejanje\",\"gas\":\"Gasno grejanje\",\"electric\":\"Električno grejanje\",\"heat_pump\":\"Toplotna pumpa\"},\"layoutTypes\":{\"studio\":\"Garsonjera\",\"one_bedroom\":\"Jednosoban\",\"two_bedroom\":\"Dvosoban\",\"three_bedroom\":\"Trosoban\",\"four_bedroom\":\"Četvorosoban\",\"penthouse\":\"Penthouse\"},\"tabs\":{\"overview\":\"Pregled\",\"layouts\":\"Raspored\",\"location\":\"Lokacija\",\"amenities\":\"Sadržaji\",\"mortgage\":\"Kredit\"},\"amenitiesAndFeatures\":\"Sadržaji i pogodnosti\",\"amenitiesComingSoon\":\"Informacije o sadržajima će biti dostupne uskoro.\",\"mortgageCalculator\":\"Kalkulator kredita\",\"propertyPrice\":\"Cena nekretnine\",\"downPayment\":\"Učešće\",\"loanTerm\":\"Period otplate\",\"interestRate\":\"Kamatna stopa\",\"years\":\"godina\",\"monthlyPayment\":\"Mesečna rata\",\"calculatePayment\":\"Izračunaj ratu\",\"units\":\"jedinica\",\"loanAmount\":\"Iznos kredita\",\"total\":\"Ukupno\"},\"developer\":{\"verified\":\"Verifikovan\",\"activeProjects\":\"Aktivni projekti\",\"completedProjects\":\"Završeni projekti\",\"startingFrom\":\"Počev od\"},\"cities\":{\"belgrade\":\"Beograd\",\"noviSad\":\"Novi Sad\",\"nis\":\"Niš\",\"kragujevac\":\"Kragujevac\"},\"about\":{\"metadata\":{\"title\":\"O nama - Novi Kvadrat\",\"description\":\"Saznajte više o Novi Kvadrat - vodećoj platformi za novogradnju i nekretnine u Srbiji\"},\"hero\":{\"title\":\"O Novi Kvadrat\",\"subtitle\":\"Vaš pouzdan partner za nekretnine\",\"description\":\"Povezujemo kupce sa najboljim novogradnjama i nekretninama širom Srbije, čineći vaš put do sopstvenog doma jednostavnim i transparentnim.\"},\"company\":{\"title\":\"Ko smo mi\",\"description\":\"Novi Kvadrat je vodeća digitalna platforma u Srbiji za pronalaženje projekata novogradnje i nekretnina. Osnovani sa misijom da revolucionišemo iskustvo pretrage nekretnina, okupljamo kupce, građevinare i profesionalce u oblasti nekretnina na jednom sveobuhvatnom tržištu.\",\"story\":\"Naše putovanje je započelo jednostavnim zapažanjem: pronalaženje prave nekretnine na rastućem tržištu nekretnina u Srbiji bilo je nepotrebno komplikovano. Krenuli smo da to promenimo stvarajući platformu koja kombinuje najnoviju tehnologiju sa dubokim poznavanjem lokalnog tržišta.\",\"founded\":\"Osnovano\",\"foundedYear\":\"2024\"},\"mission\":{\"title\":\"Naša misija\",\"description\":\"Da omogućimo svakom građaninu Srbije da pronađe savršen dom pružajući transparentne, sveobuhvatne i dostupne informacije o nekretninama.\"},\"vision\":{\"title\":\"Naša vizija\",\"description\":\"Da postanemo najpouzdanija platforma za nekretnine na Balkanu, postavljajući nove standarde transparentnosti i inovacija u transakcijama nekretnina.\"},\"stats\":{\"title\":\"Platforma u brojevima\",\"properties\":\"Nekretnina u ponudi\",\"developers\":\"Pouzdanih građevinara\",\"cities\":\"Gradova\",\"users\":\"Zadovoljnih korisnika\"},\"features\":{\"title\":\"Zašto izabrati nas\",\"subtitle\":\"Otkrijte šta Novi Kvadrat čini preferiranim izborom za kupce nekretnina u Srbiji\",\"verified\":{\"title\":\"Verifikovani oglasi\",\"description\":\"Svaka nekretnina na našoj platformi je verifikovana za tačnost i autentičnost, pružajući vam sigurnost.\"},\"search\":{\"title\":\"Pametna pretraga\",\"description\":\"Naši napredni alati za pretragu i filtriranje pomažu vam da pronađete tačno ono što tražite za nekoliko sekundi.\"},\"database\":{\"title\":\"Sveobuhvatna baza\",\"description\":\"Pristupite najvećoj kolekciji novogradnji i nekretnina širom Srbije.\"},\"developers\":{\"title\":\"Pouzdani građevinari\",\"description\":\"Sarađujemo samo sa uglednim građevinarima koji imaju dokazanu istoriju kvalitetne gradnje.\"},\"insights\":{\"title\":\"Tržišni uvidi\",\"description\":\"Budite informisani sa aktuelnim tržišnim trendovima, podacima o cenama i informacijama o naseljima.\"},\"support\":{\"title\":\"Posvećena podrška\",\"description\":\"Naš tim stručnjaka za nekretnine je tu da vas vodi kroz svaki korak vašeg puta do nekretnine.\"}},\"team\":{\"title\":\"Upoznajte naš tim\",\"subtitle\":\"Strastveni ljudi iza Novi Kvadrat\",\"members\":{\"member1\":{\"name\":\"Marko Petrović\",\"position\":\"Direktor i osnivač\",\"bio\":\"15+ godina u razvoju nekretnina\"},\"member2\":{\"name\":\"Ana Jovanović\",\"position\":\"Rukovodilac operacija\",\"bio\":\"Ekspert za analizu tržišta nekretnina\"},\"member3\":{\"name\":\"Stefan Nikolić\",\"position\":\"Tehnički direktor\",\"bio\":\"Izgradnja inovativnih PropTech rešenja\"},\"member4\":{\"name\":\"Jelena Marković\",\"position\":\"Rukovodilac partnerstava\",\"bio\":\"Povezivanje građevinara sa prilikama\"}}},\"timeline\":{\"title\":\"Naše putovanje\",\"events\":{\"event1\":{\"year\":\"2024\",\"title\":\"Lansiranje platforme\",\"description\":\"Novi Kvadrat zvanično pokrenut, donoseći modernu tehnologiju nekretnina u Srbiju.\"},\"event2\":{\"year\":\"2024\",\"title\":\"Pokrivenost Beograda\",\"description\":\"Kompletna pokrivenost svih novogradnji u Beogradu i okolini.\"},\"event3\":{\"year\":\"2024\",\"title\":\"Partnerstva sa građevinarima\",\"description\":\"Uspostavljena partnerstva sa 50+ vodećih građevinskih kompanija.\"},\"event4\":{\"year\":\"2025\",\"title\":\"Ekspanzija\",\"description\":\"Širenje pokrivenosti na Novi Sad, Niš i druge velike gradove Srbije.\"},\"event5\":{\"year\":\"2025\",\"title\":\"10.000 korisnika\",\"description\":\"Dostizanje prvog cilja od 10.000 registrovanih korisnika.\"}}},\"cta\":{\"title\":\"Spremni da pronađete dom iz snova?\",\"description\":\"Započnite pretragu nekretnina danas i otkrijte zašto hiljade veruju Novi Kvadrat.\",\"primaryBtn\":\"Pregledaj nekretnine\",\"secondaryBtn\":\"Kontaktirajte nas\"}},\"contact\":{\"title\":\"Kontaktirajte nas\",\"subtitle\":\"Tu smo da vam pomognemo da pronađete savršenu nekretninu\",\"form\":{\"name\":\"Ime i prezime\",\"namePlaceholder\":\"Unesite vaše ime i prezime\",\"email\":\"Email adresa\",\"emailPlaceholder\":\"Unesite vašu email adresu\",\"phone\":\"Broj telefona\",\"phonePlaceholder\":\"Unesite vaš broj telefona\",\"subject\":\"Tema\",\"subjectPlaceholder\":\"Izaberite temu\",\"subjects\":{\"general\":\"Opšti upit\",\"property\":\"Pitanje o nekretnini\",\"developer\":\"Saradnja sa građevinarima\",\"technical\":\"Tehnička podrška\"},\"message\":\"Poruka\",\"messagePlaceholder\":\"Kako vam možemo pomoći?\",\"submit\":\"Pošalji poruku\",\"sending\":\"Slanje...\",\"success\":\"Poruka je uspešno poslata!\",\"error\":\"Slanje poruke nije uspelo. Molimo pokušajte ponovo.\"},\"info\":{\"title\":\"Stupite u kontakt\",\"address\":\"Adresa\",\"addressValue\":\"Green Heart, Bulevar Milutina Milankovića 11b, Beograd 11070\",\"phone\":\"Telefon\",\"email\":\"Email\",\"workingHours\":\"Radno vreme\",\"workingHoursValue\":\"Pon - Pet: 9:00 - 18:00\",\"followUs\":\"Pratite nas\"},\"office\":{\"title\":\"Naša kancelarija\",\"description\":\"Posetite nas u našem sedištu u Beogradu\"}},\"heroSearch\":{\"tabs\":{\"properties\":\"Nekretnine\",\"newProjects\":\"Novogradnja\",\"agents\":\"Agenti\"},\"purpose\":{\"buy\":\"Kupovina\",\"rent\":\"Iznajmljivanje\"},\"completionStatus\":{\"all\":\"Sve\",\"ready\":\"Useljivo\",\"offPlan\":\"U izgradnji\"},\"propertyType\":{\"title\":\"Tip nekretnine\",\"residential\":\"Stambeno\",\"commercial\":\"Poslovno\",\"types\":{\"apartment\":\"Stan\",\"house\":\"Kuća\",\"villa\":\"Vila\",\"townhouse\":\"Gradska kuća\",\"penthouse\":\"Penthouse\",\"studio\":\"Garsonjera\",\"duplex\":\"Dupleks\",\"land\":\"Zemljište\",\"office\":\"Kancelarija\",\"retail\":\"Lokal\",\"warehouse\":\"Magacin\",\"building\":\"Zgrada\"}},\"bedsAndBaths\":{\"title\":\"Sobe i kupatila\",\"beds\":\"Sobe\",\"baths\":\"Kupatila\",\"studio\":\"Garsonjera\"},\"price\":{\"title\":\"Cena\",\"priceRsd\":\"Cena (RSD)\",\"minimum\":\"Minimum\",\"maximum\":\"Maksimum\",\"any\":\"Bilo koja\"},\"search\":{\"placeholder\":\"Pretraži projekte, građevinare, naselja...\"},\"newProjectsFilters\":{\"handoverBy\":\"Useljenje do\",\"paymentPlan\":\"Plan plaćanja\",\"completion\":\"% Završenosti\",\"years\":{\"2024\":\"2024\",\"2025\":\"2025\",\"2026\":\"2026\",\"2027\":\"2027\",\"2028Plus\":\"2028+\"},\"paymentPlans\":{\"any\":\"Bilo koji\",\"installments\":\"Na rate\",\"mortgage\":\"Kredit\",\"cash\":\"Keš\"},\"completionLevels\":{\"any\":\"Bilo koji\",\"notStarted\":\"Nije započeto\",\"underConstruction\":\"U izgradnji\",\"almostReady\":\"Pri kraju\",\"completed\":\"Završeno\"}},\"actions\":{\"search\":\"Pretraži\",\"reset\":\"Poništi\",\"done\":\"Gotovo\"}},\"privacy\":{\"hero\":{\"title\":\"Politika privatnosti\",\"description\":\"Posvećeni smo zaštiti vaše privatnosti i obezbeđivanju sigurnosti vaših ličnih podataka.\",\"lastUpdated\":\"Poslednje ažuriranje\",\"lastUpdatedDate\":\"Januar 2025\"},\"intro\":{\"text\":\"Ova Politika privatnosti objašnjava kako Novi Kvadrat (\\\"mi\\\", \\\"nas\\\" ili \\\"naš\\\") prikuplja, koristi i štiti vaše lične podatke kada koristite našu platformu za nekretnine. Korišćenjem naših usluga, pristajete na prikupljanje i korišćenje informacija u skladu sa ovom politikom.\"},\"sections\":{\"collection\":{\"title\":\"Podaci koje prikupljamo\",\"description\":\"Prikupljamo različite vrste podataka kako bismo vam pružili i poboljšali naše usluge.\",\"items\":{\"personal\":\"Lični podaci: ime, email adresa, broj telefona i pristupni podaci naloga\",\"property\":\"Preferencije nekretnina: istorija pretrage, sačuvane nekretnine i istorija upita\",\"usage\":\"Podaci o korišćenju: kako koristite našu platformu, posećene stranice i korišćene funkcije\",\"device\":\"Podaci o uređaju: IP adresa, tip pretraživača, tip uređaja i operativni sistem\"}},\"usage\":{\"title\":\"Kako koristimo vaše podatke\",\"description\":\"Podatke koje prikupljamo koristimo u različite svrhe vezane za pružanje i poboljšanje naših usluga.\",\"items\":{\"services\":\"Za pružanje i održavanje usluga naše platforme za nekretnine\",\"communication\":\"Za komunikaciju sa vama o nekretninama, novostima i promotivnim ponudama\",\"improvement\":\"Za analizu obrazaca korišćenja i poboljšanje funkcionalnosti platforme\",\"legal\":\"Za ispunjavanje zakonskih obaveza i zaštitu naših prava\"}},\"sharing\":{\"title\":\"Deljenje podataka\",\"description\":\"Možemo deliti vaše podatke sa trećim licima u određenim okolnostima.\",\"items\":{\"developers\":\"Sa građevinarima i agentima kada izrazite interesovanje za njihove nekretnine\",\"providers\":\"Sa pružaocima usluga koji nam pomažu u radu platforme\",\"legal\":\"Kada to zahteva zakon ili radi zaštite naših zakonskih prava\"}},\"cookies\":{\"title\":\"Kolačići i praćenje\",\"description\":\"Koristimo kolačiće i slične tehnologije praćenja za praćenje aktivnosti na našoj platformi i čuvanje određenih informacija. Kolačići nam pomažu da poboljšamo vaše iskustvo pamćenjem vaših preferencija i razumevanjem načina na koji koristite našu platformu. Možete podesiti pretraživač da odbije sve kolačiće ili da vas obavesti kada se kolačić šalje.\"},\"rights\":{\"title\":\"Vaša prava\",\"description\":\"Imate određena prava u vezi sa vašim ličnim podacima prema važećim zakonima o zaštiti podataka.\",\"items\":{\"access\":\"Pravo pristupa: Zatražite kopiju ličnih podataka koje čuvamo o vama\",\"correction\":\"Pravo na ispravku: Zatražite ispravku netačnih ili nepotpunih podataka\",\"deletion\":\"Pravo na brisanje: Zatražite brisanje vaših ličnih podataka\",\"portability\":\"Pravo na prenosivost podataka: Primite vaše podatke u strukturiranom, mašinski čitljivom formatu\",\"objection\":\"Pravo na prigovor: Prigovorite određenim vrstama obrade vaših podataka\"}},\"security\":{\"title\":\"Bezbednost podataka\",\"description\":\"Primenjujemo odgovarajuće tehničke i organizacione mere bezbednosti za zaštitu vaših ličnih podataka od neovlašćenog pristupa, izmene, otkrivanja ili uništenja. Međutim, nijedna metoda prenosa preko interneta ili elektronskog skladištenja nije 100% sigurna i ne možemo garantovati apsolutnu bezbednost.\"}},\"contact\":{\"title\":\"Kontaktirajte nas u vezi privatnosti\",\"description\":\"Ako imate bilo kakva pitanja o ovoj Politici privatnosti ili želite da ostvarite svoja prava na privatnost, kontaktirajte nas na:\"},\"related\":{\"title\":\"Povezani dokumenti\",\"terms\":\"Uslovi korišćenja\",\"cookies\":\"Politika kolačića\"}},\"terms\":{\"hero\":{\"title\":\"Uslovi korišćenja\",\"description\":\"Molimo pažljivo pročitajte ove uslove pre korišćenja platforme Novi Kvadrat.\",\"lastUpdated\":\"Poslednje ažuriranje\",\"lastUpdatedDate\":\"Januar 2025\"},\"intro\":{\"text\":\"Dobrodošli na Novi Kvadrat. Ovi Uslovi korišćenja (\\\"Uslovi\\\") regulišu vaše korišćenje naše veb stranice i usluga. Pristupanjem ili korišćenjem Novi Kvadrat, pristajete da budete obavezani ovim Uslovima. Ako se ne slažete sa bilo kojim delom uslova, ne možete pristupiti našim uslugama.\"},\"sections\":{\"acceptance\":{\"title\":\"Prihvatanje uslova\",\"description\":\"Kreiranjem naloga ili korišćenjem bilo kog dela naše platforme, potvrđujete da ste pročitali, razumeli i da pristajete da budete obavezani ovim Uslovima korišćenja. Ako koristite naše usluge u ime organizacije, pristajete na ove Uslove u ime te organizacije.\"},\"services\":{\"title\":\"Naše usluge\",\"description\":\"Novi Kvadrat pruža onlajn platformu koja povezuje kupce nekretnina, prodavce, građevinare i agente za nekretnine u Srbiji. Naše usluge uključuju oglase nekretnina, funkciju pretrage, profile građevinara, kalkulatore kredita i povezane informacije o nekretninama. Delujemo kao posrednik i ne posedujemo, ne upravljamo niti direktno prodajemo bilo kakve nekretnine.\"},\"userObligations\":{\"title\":\"Obaveze korisnika\",\"description\":\"Kao korisnik naše platforme, pristajete na sledeće obaveze:\",\"items\":{\"accurate\":\"Pružite tačne i potpune informacije prilikom kreiranja naloga ili slanja upita\",\"lawful\":\"Koristite našu platformu samo u zakonite svrhe i u skladu sa ovim Uslovima\",\"respectful\":\"Ponašajte se prema drugim korisnicima, građevinarima i agentima sa poštovanjem i profesionalnošću\",\"security\":\"Održavajte bezbednost pristupnih podataka vašeg naloga i obavestite nas o svakom neovlašćenom pristupu\"}},\"propertyListings\":{\"title\":\"Oglasi nekretnina\",\"description\":\"Ako postavljate nekretnine na našoj platformi, pristajete na sledeće:\",\"items\":{\"accuracy\":\"Sve informacije u oglasu moraju biti tačne, potpune i ne smeju dovoditi u zabludu\",\"authorization\":\"Morate imati ovlašćenje za postavljanje nekretnine\",\"updates\":\"Održavajte oglase ažurnim i uklonite prodate ili nedostupne nekretnine pravovremeno\",\"compliance\":\"Postupajte u skladu sa svim važećim zakonima o nekretninama i propisima u Srbiji\"}},\"intellectualProperty\":{\"title\":\"Intelektualna svojina\",\"description\":\"Sav sadržaj na Novi Kvadrat, uključujući ali ne ograničavajući se na tekst, grafiku, logotipe, slike i softver, vlasništvo je Novi Kvadrat ili njegovih dobavljača sadržaja i zaštićen je zakonima o intelektualnoj svojini. Ne smete reprodukovati, distribuirati, menjati ili kreirati izvedena dela od našeg sadržaja bez izričite pisane dozvole.\"},\"disclaimer\":{\"title\":\"Odricanje od garancija\",\"description\":\"Naša platforma se pruža \\\"kakva jeste\\\" i \\\"kako je dostupna\\\" bez ikakvih garancija bilo koje vrste, bilo izričitih ili podrazumevanih. Ne garantujemo tačnost, potpunost ili pouzdanost bilo kojih oglasa nekretnina ili informacija koje pružaju treća lica. Korisnici bi trebalo nezavisno da provere sve informacije o nekretninama pre donošenja bilo kakvih odluka.\"},\"liability\":{\"title\":\"Ograničenje odgovornosti\",\"description\":\"U najvećoj meri dozvoljenoj zakonom, Novi Kvadrat neće biti odgovoran za bilo kakvu indirektnu, slučajnu, posebnu, posledičnu ili kaznenu štetu koja proizilazi iz ili je povezana sa vašim korišćenjem naše platforme. Naša ukupna odgovornost neće premašiti iznos koji ste nam platili, ako ste platili, u dvanaest meseci pre podnošenja zahteva.\"},\"changes\":{\"title\":\"Izmene uslova\",\"description\":\"Zadržavamo pravo da izmenimo ove Uslove u bilo kom trenutku. Obavestićemo korisnike o značajnim izmenama postavljanjem novih Uslova na ovoj stranici i ažuriranjem datuma \\\"Poslednje ažuriranje\\\". Vaše nastavak korišćenja platforme nakon izmena predstavlja prihvatanje izmenjenih Uslova.\"}},\"governingLaw\":{\"title\":\"Merodavno pravo\",\"description\":\"Ovi Uslovi će biti regulisani i tumačeni u skladu sa zakonima Republike Srbije. Svi sporovi koji proizilaze iz ovih Uslova biće pod isključivom nadležnošću sudova u Beogradu, Srbija.\"},\"contact\":{\"title\":\"Kontaktirajte nas\",\"description\":\"Ako imate bilo kakva pitanja o ovim Uslovima korišćenja, kontaktirajte nas na:\"},\"related\":{\"title\":\"Povezani dokumenti\",\"privacy\":\"Politika privatnosti\",\"cookies\":\"Politika kolačića\"}},\"cookies\":{\"hero\":{\"title\":\"Politika kolačića\",\"description\":\"Saznajte kako koristimo kolačiće i slične tehnologije na našoj platformi.\",\"lastUpdated\":\"Poslednje ažuriranje\",\"lastUpdatedDate\":\"Januar 2025\"},\"whatAreCookies\":{\"title\":\"Šta su kolačići?\",\"description\":\"Kolačići su mali tekstualni fajlovi koji se postavljaju na vaš uređaj kada posetite veb stranicu. Široko se koriste kako bi veb stranice funkcionisale efikasnije i pružale informacije vlasnicima veb stranica. Kolačići nam pomažu da zapamtimo vaše preferencije, razumemo kako koristite našu platformu i poboljšamo vaše ukupno iskustvo.\"},\"types\":{\"title\":\"Vrste kolačića koje koristimo\",\"essential\":{\"title\":\"Neophodni kolačići\",\"description\":\"Ovi kolačići su neophodni za pravilno funkcionisanje veb stranice. Omogućavaju osnovne funkcionalnosti kao što su bezbednost, upravljanje mrežom i pristup nalogu. Ne možete se odjaviti od ovih kolačića jer veb stranica ne može pravilno funkcionisati bez njih.\",\"examples\":{\"1\":\"Sesijski kolačići za autentifikaciju korisnika\",\"2\":\"Bezbednosni kolačići za sprečavanje prevara\"}},\"analytics\":{\"title\":\"Analitički kolačići\",\"description\":\"Ovi kolačići nam pomažu da razumemo kako posetioci koriste našu veb stranicu prikupljanjem i prijavljivanjem informacija anonimno. Ovo nam pomaže da poboljšamo našu platformu i pružimo bolje usluge.\",\"examples\":{\"1\":\"Google Analytics za analizu saobraćaja\",\"2\":\"Praćenje pregleda stranica i trajanja sesije\"}},\"marketing\":{\"title\":\"Marketinški kolačići\",\"description\":\"Ovi kolačići se koriste za praćenje posetilaca na veb stranicama i prikazivanje relevantnih reklama. Pomažu nam da merimo efikasnost naših reklamnih kampanja.\",\"examples\":{\"1\":\"Facebook Pixel za ciljanje reklama\",\"2\":\"Google Ads praćenje konverzija\"}},\"functional\":{\"title\":\"Funkcionalni kolačići\",\"description\":\"Ovi kolačići omogućavaju poboljšanu funkcionalnost i personalizaciju, kao što je pamćenje vaših preferencija, podešavanja jezika i sačuvanih pretraga.\",\"examples\":{\"1\":\"Kolačići za jezičke preferencije\",\"2\":\"Sačuvani kriterijumi pretrage nekretnina\"}}},\"required\":\"Obavezno\",\"examples\":\"Primeri\",\"thirdParty\":{\"title\":\"Kolačići trećih lica\",\"description\":\"Neki kolačići na našoj veb stranici postavljaju usluge trećih lica koje se pojavljuju na našim stranicama. Koristimo sledeće usluge trećih lica:\"},\"managing\":{\"title\":\"Upravljanje podešavanjima kolačića\",\"description\":\"Možete kontrolisati i upravljati kolačićima na različite načine. Imajte na umu da uklanjanje ili blokiranje kolačića može uticati na vaše korisničko iskustvo i neke funkcionalnosti možda više neće biti dostupne.\",\"browserSettings\":\"Možete upravljati kolačićima kroz podešavanja vašeg pretraživača:\"},\"contact\":{\"title\":\"Pitanja o kolačićima\",\"description\":\"Ako imate bilo kakva pitanja o našem korišćenju kolačića, kontaktirajte nas na:\"},\"related\":{\"title\":\"Povezani dokumenti\",\"privacy\":\"Politika privatnosti\",\"terms\":\"Uslovi korišćenja\"}}}"));}),
"[project]/src/locales/sr-cyrl.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v(JSON.parse("{\"common\":{\"search\":\"Претражи\",\"searchPlaceholder\":\"Претражи по локацији, пројекту или грађевинару...\",\"viewAll\":\"Види све\",\"from\":\"Од\",\"perSqm\":\"по m²\",\"completion\":\"Завршетак\",\"showPhone\":\"Прикажи број\",\"getConsultation\":\"Закажи консултацију\",\"save\":\"Сачувај\",\"saved\":\"Сачувано\",\"call\":\"Позови\",\"consultation\":\"Консултација\"},\"nav\":{\"home\":\"Почетна\",\"newDevelopments\":\"Новоградња\",\"developers\":\"Грађевинари\",\"aboutUs\":\"О нама\",\"contact\":\"Контакт\"},\"home\":{\"title\":\"Пронађите савршену некретнину у Србији\",\"subtitle\":\"Откријте новоградњу, станове, куће и пословне просторе\",\"featuredProjects\":\"Истакнути пројекти\",\"latestProperties\":\"Најновије некретнине\",\"topDevelopers\":\"Топ грађевинари\",\"popularCities\":\"Популарне локације\",\"statistics\":{\"projects\":\"Пројеката\",\"apartments\":\"Станова\",\"developers\":\"Грађевинара\",\"cities\":\"Градова\"}},\"projects\":{\"title\":\"Новоградња {city}\",\"projectsCount\":\"{count} пројеката\",\"filters\":{\"allMunicipalities\":\"Све општине\",\"allStatuses\":\"Сви статуси\",\"moreFilters\":\"Више филтера\",\"projectsOnMap\":\"Пројекти на мапи\",\"sortBy\":\"Сортирај по\",\"recommended\":\"Препоручено\",\"priceLowHigh\":\"Цена: најнижа прва\",\"priceHighLow\":\"Цена: највиша прва\",\"newest\":\"Најновији\",\"completionDate\":\"Датум завршетка\"},\"onRequest\":\"На упит\",\"status\":{\"planning\":\"У планирању\",\"underConstruction\":\"У изградњи\",\"grayFrame\":\"Сива фаза\",\"readyToMove\":\"Усељиво\",\"completed\":\"Завршено\"}},\"projectDetail\":{\"constructionProgress\":\"Напредак изградње\",\"completed\":\"завршено\",\"aboutProject\":\"О пројекту\",\"numberOfBuildings\":\"Број зграда\",\"numberOfFloors\":\"Број спратова\",\"totalApartments\":\"Укупно станова\",\"availableApartments\":\"Доступно станова\",\"parkingSpaces\":\"Паркинг места\",\"heating\":\"Грејање\",\"documents\":\"Документи\",\"downloadBrochure\":\"Преузми брошуру\",\"virtualTour\":\"Виртуелна тура\",\"showOnMap\":\"Прикажи на мапи\",\"layouts\":\"Распоред\",\"location\":\"Локација\",\"amenities\":\"Садржаји\",\"mortgage\":\"Калкулатор кредита\",\"similarProjects\":\"Слични пројекти\"},\"developer\":{\"verified\":\"Верификован\",\"activeProjects\":\"Активни пројекти\",\"completedProjects\":\"Завршени пројекти\",\"startingFrom\":\"Почев од\"},\"cities\":{\"belgrade\":\"Београд\",\"noviSad\":\"Нови Сад\",\"nis\":\"Ниш\",\"kragujevac\":\"Крагујевац\"},\"about\":{\"metadata\":{\"title\":\"О нама - Нови Квадрат\",\"description\":\"Сазнајте више о Нови Квадрат - водећој платформи за новоградњу и некретнине у Србији\"},\"hero\":{\"title\":\"О Нови Квадрат\",\"subtitle\":\"Ваш поуздан партнер за некретнине\",\"description\":\"Повезујемо купце са најбољим новоградњама и некретнинама широм Србије, чинећи ваш пут до сопственог дома једноставним и транспарентним.\"},\"company\":{\"title\":\"Ко смо ми\",\"description\":\"Нови Квадрат је водећа дигитална платформа у Србији за проналажење пројеката новоградње и некретнина. Основани са мисијом да револуционишемо искуство претраге некретнина, окупљамо купце, грађевинаре и професионалце у области некретнина на једном свеобухватном тржишту.\",\"story\":\"Наше путовање је започело једноставним запажањем: проналажење праве некретнине на растућем тржишту некретнина у Србији било је непотребно компликовано. Кренули смо да то променимо стварајући платформу која комбинује најновију технологију са дубоким познавањем локалног тржишта.\",\"founded\":\"Основано\",\"foundedYear\":\"2024\"},\"mission\":{\"title\":\"Наша мисија\",\"description\":\"Да омогућимо сваком грађанину Србије да пронађе савршен дом пружајући транспарентне, свеобухватне и доступне информације о некретнинама.\"},\"vision\":{\"title\":\"Наша визија\",\"description\":\"Да постанемо најпоузданија платформа за некретнине на Балкану, постављајући нове стандарде транспарентности и иновација у трансакцијама некретнина.\"},\"stats\":{\"title\":\"Платформа у бројевима\",\"properties\":\"Некретнина у понуди\",\"developers\":\"Поузданих грађевинара\",\"cities\":\"Градова\",\"users\":\"Задовољних корисника\"},\"features\":{\"title\":\"Зашто изабрати нас\",\"subtitle\":\"Откријте шта Нови Квадрат чини преферираним избором за купце некретнина у Србији\",\"verified\":{\"title\":\"Верификовани огласи\",\"description\":\"Свака некретнина на нашој платформи је верификована за тачност и аутентичност, пружајући вам сигурност.\"},\"search\":{\"title\":\"Паметна претрага\",\"description\":\"Наши напредни алати за претрагу и филтрирање помажу вам да пронађете тачно оно што тражите за неколико секунди.\"},\"database\":{\"title\":\"Свеобухватна база\",\"description\":\"Приступите највећој колекцији новоградњи и некретнина широм Србије.\"},\"developers\":{\"title\":\"Поуздани грађевинари\",\"description\":\"Сарађујемо само са угледним грађевинарима који имају доказану историју квалитетне градње.\"},\"insights\":{\"title\":\"Тржишни увиди\",\"description\":\"Будите информисани са актуелним тржишним трендовима, подацима о ценама и информацијама о насељима.\"},\"support\":{\"title\":\"Посвећена подршка\",\"description\":\"Наш тим стручњака за некретнине је ту да вас води кроз сваки корак вашег пута до некретнине.\"}},\"team\":{\"title\":\"Упознајте наш тим\",\"subtitle\":\"Страствени људи иза Нови Квадрат\",\"members\":{\"member1\":{\"name\":\"Марко Петровић\",\"position\":\"Директор и оснивач\",\"bio\":\"15+ година у развоју некретнина\"},\"member2\":{\"name\":\"Ана Јовановић\",\"position\":\"Руководилац операција\",\"bio\":\"Експерт за анализу тржишта некретнина\"},\"member3\":{\"name\":\"Стефан Николић\",\"position\":\"Технички директор\",\"bio\":\"Изградња иновативних PropTech решења\"},\"member4\":{\"name\":\"Јелена Марковић\",\"position\":\"Руководилац партнерстава\",\"bio\":\"Повезивање грађевинара са приликама\"}}},\"timeline\":{\"title\":\"Наше путовање\",\"events\":{\"event1\":{\"year\":\"2024\",\"title\":\"Лансирање платформе\",\"description\":\"Нови Квадрат званично покренут, доносећи модерну технологију некретнина у Србију.\"},\"event2\":{\"year\":\"2024\",\"title\":\"Покривеност Београда\",\"description\":\"Комплетна покривеност свих новоградњи у Београду и околини.\"},\"event3\":{\"year\":\"2024\",\"title\":\"Партнерства са грађевинарима\",\"description\":\"Успостављена партнерства са 50+ водећих грађевинских компанија.\"},\"event4\":{\"year\":\"2025\",\"title\":\"Експанзија\",\"description\":\"Ширење покривености на Нови Сад, Ниш и друге велике градове Србије.\"},\"event5\":{\"year\":\"2025\",\"title\":\"10.000 корисника\",\"description\":\"Достизање првог циља од 10.000 регистрованих корисника.\"}}},\"cta\":{\"title\":\"Спремни да пронађете дом из снова?\",\"description\":\"Започните претрагу некретнина данас и откријте зашто хиљаде верују Нови Квадрат.\",\"primaryBtn\":\"Прегледај некретнине\",\"secondaryBtn\":\"Контактирајте нас\"}},\"contact\":{\"title\":\"Контактирајте нас\",\"subtitle\":\"Ту смо да вам помогнемо да пронађете савршену некретнину\",\"form\":{\"name\":\"Име и презиме\",\"namePlaceholder\":\"Унесите ваше име и презиме\",\"email\":\"Емаил адреса\",\"emailPlaceholder\":\"Унесите вашу емаил адресу\",\"phone\":\"Број телефона\",\"phonePlaceholder\":\"Унесите ваш број телефона\",\"subject\":\"Тема\",\"subjectPlaceholder\":\"Изаберите тему\",\"subjects\":{\"general\":\"Општи упит\",\"property\":\"Питање о некретнини\",\"developer\":\"Сарадња са грађевинарима\",\"technical\":\"Техничка подршка\"},\"message\":\"Порука\",\"messagePlaceholder\":\"Како вам можемо помоћи?\",\"submit\":\"Пошаљи поруку\",\"sending\":\"Слање...\",\"success\":\"Порука је успешно послата!\",\"error\":\"Слање поруке није успело. Молимо покушајте поново.\"},\"info\":{\"title\":\"Ступите у контакт\",\"address\":\"Адреса\",\"addressValue\":\"Green Heart, Булевар Милутина Миланковића 11б, Београд 11070\",\"phone\":\"Телефон\",\"email\":\"Емаил\",\"workingHours\":\"Радно време\",\"workingHoursValue\":\"Пон - Пет: 9:00 - 18:00\",\"followUs\":\"Пратите нас\"},\"office\":{\"title\":\"Наша канцеларија\",\"description\":\"Посетите нас у нашем седишту у Београду\"}},\"heroSearch\":{\"tabs\":{\"properties\":\"Некретнине\",\"newProjects\":\"Новоградња\",\"agents\":\"Агенти\"},\"purpose\":{\"buy\":\"Куповина\",\"rent\":\"Изнајмљивање\"},\"completionStatus\":{\"all\":\"Све\",\"ready\":\"Усељиво\",\"offPlan\":\"У изградњи\"},\"propertyType\":{\"title\":\"Тип некретнине\",\"residential\":\"Стамбено\",\"commercial\":\"Пословно\",\"types\":{\"apartment\":\"Стан\",\"house\":\"Кућа\",\"villa\":\"Вила\",\"townhouse\":\"Градска кућа\",\"penthouse\":\"Пентхаус\",\"studio\":\"Гарсоњера\",\"duplex\":\"Дуплекс\",\"land\":\"Земљиште\",\"office\":\"Канцеларија\",\"retail\":\"Локал\",\"warehouse\":\"Магацин\",\"building\":\"Зграда\"}},\"bedsAndBaths\":{\"title\":\"Собе и купатила\",\"beds\":\"Собе\",\"baths\":\"Купатила\",\"studio\":\"Гарсоњера\"},\"price\":{\"title\":\"Цена\",\"priceRsd\":\"Цена (RSD)\",\"minimum\":\"Минимум\",\"maximum\":\"Максимум\",\"any\":\"Било која\"},\"search\":{\"placeholder\":\"Претражи пројекте, грађевинаре, насеља...\"},\"newProjectsFilters\":{\"handoverBy\":\"Усељење до\",\"paymentPlan\":\"План плаћања\",\"completion\":\"% Завршености\",\"years\":{\"2024\":\"2024\",\"2025\":\"2025\",\"2026\":\"2026\",\"2027\":\"2027\",\"2028Plus\":\"2028+\"},\"paymentPlans\":{\"any\":\"Било који\",\"installments\":\"На рате\",\"mortgage\":\"Кредит\",\"cash\":\"Кеш\"},\"completionLevels\":{\"any\":\"Било који\",\"notStarted\":\"Није започето\",\"underConstruction\":\"У изградњи\",\"almostReady\":\"При крају\",\"completed\":\"Завршено\"}},\"actions\":{\"search\":\"Претражи\",\"reset\":\"Поништи\",\"done\":\"Готово\"}},\"privacy\":{\"hero\":{\"title\":\"Политика приватности\",\"description\":\"Посвећени смо заштити ваше приватности и обезбеђивању сигурности ваших личних података.\",\"lastUpdated\":\"Последње ажурирање\",\"lastUpdatedDate\":\"Јануар 2025\"},\"intro\":{\"text\":\"Ова Политика приватности објашњава како Нови Квадрат (\\\"ми\\\", \\\"нас\\\" или \\\"наш\\\") прикупља, користи и штити ваше личне податке када користите нашу платформу за некретнине. Коришћењем наших услуга, пристајете на прикупљање и коришћење информација у складу са овом политиком.\"},\"sections\":{\"collection\":{\"title\":\"Подаци које прикупљамо\",\"description\":\"Прикупљамо различите врсте података како бисмо вам пружили и побољшали наше услуге.\",\"items\":{\"personal\":\"Лични подаци: име, емаил адреса, број телефона и приступни подаци налога\",\"property\":\"Преференције некретнина: историја претраге, сачуване некретнине и историја упита\",\"usage\":\"Подаци о коришћењу: како користите нашу платформу, посећене странице и коришћене функције\",\"device\":\"Подаци о уређају: IP адреса, тип претраживача, тип уређаја и оперативни систем\"}},\"usage\":{\"title\":\"Како користимо ваше податке\",\"description\":\"Податке које прикупљамо користимо у различите сврхе везане за пружање и побољшање наших услуга.\",\"items\":{\"services\":\"За пружање и одржавање услуга наше платформе за некретнине\",\"communication\":\"За комуникацију са вама о некретнинама, новостима и промотивним понудама\",\"improvement\":\"За анализу образаца коришћења и побољшање функционалности платформе\",\"legal\":\"За испуњавање законских обавеза и заштиту наших права\"}},\"sharing\":{\"title\":\"Дељење података\",\"description\":\"Можемо делити ваше податке са трећим лицима у одређеним околностима.\",\"items\":{\"developers\":\"Са грађевинарима и агентима када изразите интересовање за њихове некретнине\",\"providers\":\"Са пружаоцима услуга који нам помажу у раду платформе\",\"legal\":\"Када то захтева закон или ради заштите наших законских права\"}},\"cookies\":{\"title\":\"Колачићи и праћење\",\"description\":\"Користимо колачиће и сличне технологије праћења за праћење активности на нашој платформи и чување одређених информација. Колачићи нам помажу да побољшамо ваше искуство памћењем ваших преференција и разумевањем начина на који користите нашу платформу. Можете подесити претраживач да одбије све колачиће или да вас обавести када се колачић шаље.\"},\"rights\":{\"title\":\"Ваша права\",\"description\":\"Имате одређена права у вези са вашим личним подацима према важећим законима о заштити података.\",\"items\":{\"access\":\"Право приступа: Затражите копију личних података које чувамо о вама\",\"correction\":\"Право на исправку: Затражите исправку нетачних или непотпуних података\",\"deletion\":\"Право на брисање: Затражите брисање ваших личних података\",\"portability\":\"Право на преносивост података: Примите ваше податке у структурираном, машински читљивом формату\",\"objection\":\"Право на приговор: Приговорите одређеним врстама обраде ваших података\"}},\"security\":{\"title\":\"Безбедност података\",\"description\":\"Примењујемо одговарајуће техничке и организационе мере безбедности за заштиту ваших личних података од неовлашћеног приступа, измене, откривања или уништења. Међутим, ниједна метода преноса преко интернета или електронског складиштења није 100% сигурна и не можемо гарантовати апсолутну безбедност.\"}},\"contact\":{\"title\":\"Контактирајте нас у вези приватности\",\"description\":\"Ако имате било каква питања о овој Политици приватности или желите да остварите своја права на приватност, контактирајте нас на:\"},\"related\":{\"title\":\"Повезани документи\",\"terms\":\"Услови коришћења\",\"cookies\":\"Политика колачића\"}},\"terms\":{\"hero\":{\"title\":\"Услови коришћења\",\"description\":\"Молимо пажљиво прочитајте ове услове пре коришћења платформе Нови Квадрат.\",\"lastUpdated\":\"Последње ажурирање\",\"lastUpdatedDate\":\"Јануар 2025\"},\"intro\":{\"text\":\"Добродошли на Нови Квадрат. Ови Услови коришћења (\\\"Услови\\\") регулишу ваше коришћење наше веб странице и услуга. Приступањем или коришћењем Нови Квадрат, пристајете да будете обавезани овим Условима. Ако се не слажете са било којим делом услова, не можете приступити нашим услугама.\"},\"sections\":{\"acceptance\":{\"title\":\"Прихватање услова\",\"description\":\"Креирањем налога или коришћењем било ког дела наше платформе, потврђујете да сте прочитали, разумели и да пристајете да будете обавезани овим Условима коришћења. Ако користите наше услуге у име организације, пристајете на ове Услове у име те организације.\"},\"services\":{\"title\":\"Наше услуге\",\"description\":\"Нови Квадрат пружа онлајн платформу која повезује купце некретнина, продавце, грађевинаре и агенте за некретнине у Србији. Наше услуге укључују огласе некретнина, функцију претраге, профиле грађевинара, калкулаторе кредита и повезане информације о некретнинама. Делујемо као посредник и не поседујемо, не управљамо нити директно продајемо било какве некретнине.\"},\"userObligations\":{\"title\":\"Обавезе корисника\",\"description\":\"Као корисник наше платформе, пристајете на следеће обавезе:\",\"items\":{\"accurate\":\"Пружите тачне и потпуне информације приликом креирања налога или слања упита\",\"lawful\":\"Користите нашу платформу само у законите сврхе и у складу са овим Условима\",\"respectful\":\"Понашајте се према другим корисницима, грађевинарима и агентима са поштовањем и професионалношћу\",\"security\":\"Одржавајте безбедност приступних података вашег налога и обавестите нас о сваком неовлашћеном приступу\"}},\"propertyListings\":{\"title\":\"Огласи некретнина\",\"description\":\"Ако постављате некретнине на нашој платформи, пристајете на следеће:\",\"items\":{\"accuracy\":\"Све информације у огласу морају бити тачне, потпуне и не смеју доводити у заблуду\",\"authorization\":\"Морате имати овлашћење за постављање некретнине\",\"updates\":\"Одржавајте огласе ажурним и уклоните продате или недоступне некретнине правовремено\",\"compliance\":\"Поступајте у складу са свим важећим законима о некретнинама и прописима у Србији\"}},\"intellectualProperty\":{\"title\":\"Интелектуална својина\",\"description\":\"Сав садржај на Нови Квадрат, укључујући али не ограничавајући се на текст, графику, логотипе, слике и софтвер, власништво је Нови Квадрат или његових добављача садржаја и заштићен је законима о интелектуалној својини. Не смете репродуковати, дистрибуирати, мењати или креирати изведена дела од нашег садржаја без изричите писане дозволе.\"},\"disclaimer\":{\"title\":\"Одрицање од гаранција\",\"description\":\"Наша платформа се пружа \\\"каква јесте\\\" и \\\"како је доступна\\\" без икаквих гаранција било које врсте, било изричитих или подразумеваних. Не гарантујемо тачност, потпуност или поузданост било којих огласа некретнина или информација које пружају трећа лица. Корисници би требало независно да провере све информације о некретнинама пре доношења било каквих одлука.\"},\"liability\":{\"title\":\"Ограничење одговорности\",\"description\":\"У највећој мери дозвољеној законом, Нови Квадрат неће бити одговоран за било какву индиректну, случајну, посебну, последичну или казнену штету која произилази из или је повезана са вашим коришћењем наше платформе. Наша укупна одговорност неће премашити износ који сте нам платили, ако сте платили, у дванаест месеци пре подношења захтева.\"},\"changes\":{\"title\":\"Измене услова\",\"description\":\"Задржавамо право да изменимо ове Услове у било ком тренутку. Обавестићемо кориснике о значајним изменама постављањем нових Услова на овој страници и ажурирањем датума \\\"Последње ажурирање\\\". Ваше наставак коришћења платформе након измена представља прихватање измењених Услова.\"}},\"governingLaw\":{\"title\":\"Меродавно право\",\"description\":\"Ови Услови ће бити регулисани и тумачени у складу са законима Републике Србије. Сви спорови који произилазе из ових Услова биће под искључивом надлежношћу судова у Београду, Србија.\"},\"contact\":{\"title\":\"Контактирајте нас\",\"description\":\"Ако имате било каква питања о овим Условима коришћења, контактирајте нас на:\"},\"related\":{\"title\":\"Повезани документи\",\"privacy\":\"Политика приватности\",\"cookies\":\"Политика колачића\"}},\"cookies\":{\"hero\":{\"title\":\"Политика колачића\",\"description\":\"Сазнајте како користимо колачиће и сличне технологије на нашој платформи.\",\"lastUpdated\":\"Последње ажурирање\",\"lastUpdatedDate\":\"Јануар 2025\"},\"whatAreCookies\":{\"title\":\"Шта су колачићи?\",\"description\":\"Колачићи су мали текстуални фајлови који се постављају на ваш уређај када посетите веб страницу. Широко се користе како би веб странице функционисале ефикасније и пружале информације власницима веб страница. Колачићи нам помажу да запамтимо ваше преференције, разумемо како користите нашу платформу и побољшамо ваше укупно искуство.\"},\"types\":{\"title\":\"Врсте колачића које користимо\",\"essential\":{\"title\":\"Неопходни колачићи\",\"description\":\"Ови колачићи су неопходни за правилно функционисање веб странице. Омогућавају основне функционалности као што су безбедност, управљање мрежом и приступ налогу. Не можете се одјавити од ових колачића јер веб страница не може правилно функционисати без њих.\",\"examples\":{\"1\":\"Сесијски колачићи за аутентификацију корисника\",\"2\":\"Безбедносни колачићи за спречавање превара\"}},\"analytics\":{\"title\":\"Аналитички колачићи\",\"description\":\"Ови колачићи нам помажу да разумемо како посетиоци користе нашу веб страницу прикупљањем и пријављивањем информација анонимно. Ово нам помаже да побољшамо нашу платформу и пружимо боље услуге.\",\"examples\":{\"1\":\"Google Analytics за анализу саобраћаја\",\"2\":\"Праћење прегледа страница и трајања сесије\"}},\"marketing\":{\"title\":\"Маркетиншки колачићи\",\"description\":\"Ови колачићи се користе за праћење посетилаца на веб страницама и приказивање релевантних реклама. Помажу нам да меримо ефикасност наших рекламних кампања.\",\"examples\":{\"1\":\"Facebook Pixel за циљање реклама\",\"2\":\"Google Ads праћење конверзија\"}},\"functional\":{\"title\":\"Функционални колачићи\",\"description\":\"Ови колачићи омогућавају побољшану функционалност и персонализацију, као што је памћење ваших преференција, подешавања језика и сачуваних претрага.\",\"examples\":{\"1\":\"Колачићи за језичке преференције\",\"2\":\"Сачувани критеријуми претраге некретнина\"}}},\"required\":\"Обавезно\",\"examples\":\"Примери\",\"thirdParty\":{\"title\":\"Колачићи трећих лица\",\"description\":\"Неки колачићи на нашој веб страници постављају услуге трећих лица које се појављују на нашим страницама. Користимо следеће услуге трећих лица:\"},\"managing\":{\"title\":\"Управљање подешавањима колачића\",\"description\":\"Можете контролисати и управљати колачићима на различите начине. Имајте на уму да уклањање или блокирање колачића може утицати на ваше корисничко искуство и неке функционалности можда више неће бити доступне.\",\"browserSettings\":\"Можете управљати колачићима кроз подешавања вашег претраживача:\"},\"contact\":{\"title\":\"Питања о колачићима\",\"description\":\"Ако имате било каква питања о нашем коришћењу колачића, контактирајте нас на:\"},\"related\":{\"title\":\"Повезани документи\",\"privacy\":\"Политика приватности\",\"terms\":\"Услови коришћења\"}}}"));}),
"[project]/src/hooks/use-translations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useTranslations",
    ()=>useTranslations
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$en$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/en.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$sr$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/sr.json (json)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$sr$2d$cyrl$2e$json__$28$json$29$__ = __turbopack_context__.i("[project]/src/locales/sr-cyrl.json (json)");
'use client';
;
;
;
;
const translations = {
    'en': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$en$2e$json__$28$json$29$__["default"],
    'sr': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$sr$2e$json__$28$json$29$__["default"],
    'sr-cyrl': __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$locales$2f$sr$2d$cyrl$2e$json__$28$json$29$__["default"]
};
function useTranslations() {
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    const locale = segments[0] || 'sr';
    // Get translations for current locale
    const t = translations[locale] || translations['sr'];
    // Helper function to get nested translation
    const translate = (key, replacements)=>{
        const keys = key.split('.');
        let value = t;
        for (const k of keys){
            if (value && typeof value === 'object') {
                value = value[k];
            } else {
                return key // Return key if translation not found
                ;
            }
        }
        // Replace placeholders if any
        if (typeof value === 'string' && replacements) {
            Object.entries(replacements).forEach(([placeholder, replacement])=>{
                value = value.replace(`{${placeholder}}`, replacement);
            });
        }
        return value || key;
    };
    return {
        t: translate,
        locale
    };
}
}),
"[project]/src/components/layout/header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/menu.js [app-ssr] (ecmascript) <export default as Menu>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$language$2d$switcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/language-switcher.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$city$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/city-selector.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-translations.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
;
;
;
function NavItem({ item, isActive, onMouseEnter, onMouseLeave }) {
    const textRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [textWidth, setTextWidth] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isActive && textRef.current) {
            setTextWidth(textRef.current.offsetWidth);
        }
    }, [
        isActive
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-full flex items-center",
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: item.href,
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("px-4 py-2 text-sm font-medium text-secondary-700 hover:text-primary-500 transition-colors inline-flex items-center gap-1", isActive && "text-primary-500"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        ref: textRef,
                        className: "inline-block",
                        children: item.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this),
                    item.dropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                        className: "h-3 w-3"
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header.tsx",
                        lineNumber: 58,
                        columnNumber: 27
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/header.tsx",
                lineNumber: 48,
                columnNumber: 7
            }, this),
            isActive && textWidth > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute bottom-0 h-0.5 bg-secondary-900",
                style: {
                    left: '1rem',
                    width: `${textWidth}px`
                }
            }, void 0, false, {
                fileName: "[project]/src/components/layout/header.tsx",
                lineNumber: 62,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/header.tsx",
        lineNumber: 43,
        columnNumber: 5
    }, this);
}
function Header({ currentCity = 'Belgrade', user }) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [activeDropdown, setActiveDropdown] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const { t, locale } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$translations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTranslations"])();
    // Extract locale from pathname for links
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = segments[0] || 'sr';
    const navigationItems = [
        {
            label: t('nav.newDevelopments'),
            href: `/${currentLocale}/novogradnja/beograd`,
            dropdown: [
                {
                    label: 'Beograd',
                    href: `/${currentLocale}/novogradnja/beograd`
                },
                {
                    label: 'Novi Sad',
                    href: `/${currentLocale}/novogradnja/novi-sad`
                },
                {
                    label: 'Niš',
                    href: `/${currentLocale}/novogradnja/nis`
                }
            ]
        },
        {
            label: 'Sale',
            href: '/sale',
            dropdown: [
                {
                    label: 'Apartments',
                    href: '/sale/apartments'
                },
                {
                    label: 'Houses',
                    href: '/sale/houses'
                },
                {
                    label: 'Commercial',
                    href: '/sale/commercial'
                },
                {
                    label: 'Land',
                    href: '/sale/land'
                }
            ]
        },
        {
            label: 'Rent',
            href: '/rent',
            dropdown: [
                {
                    label: 'Apartments',
                    href: '/rent/apartments'
                },
                {
                    label: 'Houses',
                    href: '/rent/houses'
                },
                {
                    label: 'Commercial',
                    href: '/rent/commercial'
                },
                {
                    label: 'Daily Rental',
                    href: '/rent/daily'
                }
            ]
        },
        {
            label: t('nav.aboutUs'),
            href: `/${currentLocale}/o-nama`
        },
        {
            label: t('nav.contact'),
            href: `/${currentLocale}/kontakt`
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-50 w-full border-b border-border bg-white relative",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "container mx-auto px-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hidden lg:block",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-16 items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.svg",
                                        alt: "Novi Kvadrat",
                                        width: 120,
                                        height: 30,
                                        className: "h-8 w-auto",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/header.tsx",
                                        lineNumber: 132,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 131,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                    className: "flex items-center space-x-1 ml-10 relative h-full",
                                    children: navigationItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(NavItem, {
                                            item: item,
                                            isActive: pathname.startsWith(item.href),
                                            onMouseEnter: ()=>item.dropdown && setActiveDropdown(item.label),
                                            onMouseLeave: ()=>setActiveDropdown(null)
                                        }, item.label, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 145,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 143,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-3 ml-auto",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/header.tsx",
                                                lineNumber: 158,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$city$2d$selector$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CitySelector"], {
                                            currentCity: currentCity,
                                            currentLocale: currentLocale
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$language$2d$switcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageSwitcher"], {
                                            currentLocale: currentLocale
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 165,
                                            columnNumber: 15
                                        }, this),
                                        user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/header.tsx",
                                                lineNumber: 170,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 169,
                                            columnNumber: 17
                                        }, this),
                                        !user && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "default",
                                            size: "md",
                                            children: "Sign In"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 156,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 129,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "lg:hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex h-14 items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex items-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.svg",
                                        alt: "Novi Kvadrat",
                                        width: 100,
                                        height: 25,
                                        className: "h-6 w-auto",
                                        priority: true
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/header.tsx",
                                        lineNumber: 186,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 185,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            className: "h-9 w-9",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/header.tsx",
                                                lineNumber: 198,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 197,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$language$2d$switcher$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["LanguageSwitcher"], {
                                            currentLocale: currentLocale
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 200,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "icon",
                                            onClick: ()=>setIsMobileMenuOpen(!isMobileMenuOpen),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$menu$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Menu$3e$__["Menu"], {
                                                className: "h-5 w-5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/header.tsx",
                                                lineNumber: 206,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 201,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 196,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header.tsx",
                        lineNumber: 183,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/layout/header.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            activeDropdown && (()=>{
                const activeItem = navigationItems.find((item)=>item.label === activeDropdown && item.dropdown);
                if (!activeItem) return null;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "hidden lg:block absolute left-0 right-0 bg-white border-b border-border",
                    style: {
                        top: '100%'
                    },
                    onMouseEnter: ()=>setActiveDropdown(activeDropdown),
                    onMouseLeave: ()=>setActiveDropdown(null),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "container mx-auto px-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "py-4",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ml-10",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col space-y-1",
                                    children: activeItem.dropdown?.map((subItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: subItem.href,
                                            className: "block px-4 py-2 text-sm text-secondary-700 hover:text-primary-600 transition-colors",
                                            children: subItem.label
                                        }, subItem.label, false, {
                                            fileName: "[project]/src/components/layout/header.tsx",
                                            lineNumber: 230,
                                            columnNumber: 23
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/header.tsx",
                                    lineNumber: 228,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/header.tsx",
                                lineNumber: 227,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 226,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/header.tsx",
                        lineNumber: 225,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/header.tsx",
                    lineNumber: 219,
                    columnNumber: 11
                }, this);
            })(),
            isMobileMenuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "lg:hidden border-t border-border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                    className: "container mx-auto px-4 py-4",
                    children: [
                        navigationItems.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: item.href,
                                        className: "block py-2 text-sm font-medium text-secondary-700",
                                        onClick: ()=>setIsMobileMenuOpen(false),
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/header.tsx",
                                        lineNumber: 252,
                                        columnNumber: 17
                                    }, this),
                                    item.dropdown && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pl-4",
                                        children: item.dropdown.map((subItem)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: subItem.href,
                                                className: "block py-1.5 text-sm text-secondary-600",
                                                onClick: ()=>setIsMobileMenuOpen(false),
                                                children: subItem.label
                                            }, subItem.label, false, {
                                                fileName: "[project]/src/components/layout/header.tsx",
                                                lineNumber: 262,
                                                columnNumber: 23
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/header.tsx",
                                        lineNumber: 260,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, item.label, true, {
                                fileName: "[project]/src/components/layout/header.tsx",
                                lineNumber: 251,
                                columnNumber: 15
                            }, this)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4 pt-4 border-t border-border",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "default",
                                fullWidth: true,
                                size: "md",
                                className: "mt-2",
                                children: "Sign In"
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/header.tsx",
                                lineNumber: 276,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/components/layout/header.tsx",
                            lineNumber: 275,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/header.tsx",
                    lineNumber: 249,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/layout/header.tsx",
                lineNumber: 248,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/layout/header.tsx",
        lineNumber: 125,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/layout/footer.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/facebook.js [app-ssr] (ecmascript) <export default as Facebook>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/instagram.js [app-ssr] (ecmascript) <export default as Instagram>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mail.js [app-ssr] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/config.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
function Footer() {
    const currentYear = new Date().getFullYear();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // Extract locale from pathname
    const segments = pathname.split('/').filter(Boolean);
    const currentLocale = segments[0] || 'sr';
    const handleLanguageChange = (newLocale)=>{
        // Get current path without locale
        const pathSegments = pathname.split('/').filter(Boolean);
        // Remove current locale if present
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].includes(pathSegments[0])) {
            pathSegments.shift();
        }
        // Build new path with new locale
        const newPath = `/${newLocale}${pathSegments.length > 0 ? '/' + pathSegments.join('/') : ''}`;
        router.push(newPath);
    };
    const footerLinks = {
        about: [
            {
                label: 'About Platform',
                href: `/${currentLocale}/o-nama`
            },
            {
                label: 'Contact Us',
                href: `/${currentLocale}/kontakt`
            },
            {
                label: 'Careers',
                href: '/careers'
            },
            {
                label: "Buyer's Guide",
                href: '/guide'
            }
        ],
        terms: [
            {
                label: 'Privacy Policy',
                href: `/${currentLocale}/privacy-policy`
            },
            {
                label: 'Terms of Service',
                href: `/${currentLocale}/terms`
            },
            {
                label: 'Cookie Policy',
                href: `/${currentLocale}/cookies`
            }
        ],
        cities: [
            {
                label: 'Belgrade',
                href: `/${currentLocale}/novogradnja/beograd`
            },
            {
                label: 'Novi Sad',
                href: `/${currentLocale}/novogradnja/novi-sad`
            },
            {
                label: 'Niš',
                href: `/${currentLocale}/novogradnja/nis`
            },
            {
                label: 'Kragujevac',
                href: `/${currentLocale}/novogradnja/kragujevac`
            }
        ],
        categories: [
            {
                label: 'New Projects',
                href: `/${currentLocale}/novogradnja/beograd`
            },
            {
                label: 'Apartments for Sale',
                href: '/sale/apartments'
            },
            {
                label: 'Houses for Rent',
                href: '/rent/houses'
            },
            {
                label: 'Commercial Property',
                href: '/commercial'
            }
        ]
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "bg-secondary-50 border-t border-border",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex items-center mb-4",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        src: "/logo.svg",
                                        alt: "Novi Kvadrat",
                                        width: 120,
                                        height: 30,
                                        className: "h-8 w-auto"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/layout/footer.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-secondary-600 mb-4",
                                    children: "Your trusted real estate platform in Serbia"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 77,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex space-x-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "https://facebook.com",
                                            target: "_blank",
                                            className: "h-10 w-10 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$facebook$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Facebook$3e$__["Facebook"], {
                                                className: "h-5 w-5 text-secondary-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 86,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 81,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            href: "https://instagram.com",
                                            target: "_blank",
                                            className: "h-10 w-10 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-colors",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$instagram$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Instagram$3e$__["Instagram"], {
                                                className: "h-5 w-5 text-secondary-600"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 93,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-secondary-900 mb-4",
                                    children: "About"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: footerLinks.about.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-secondary-600 hover:text-primary-500 transition-colors",
                                                children: link.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 104,
                                                columnNumber: 19
                                            }, this)
                                        }, link.label, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 103,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 99,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-secondary-900 mb-4",
                                    children: "Popular Cities"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: footerLinks.cities.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-secondary-600 hover:text-primary-500 transition-colors",
                                                children: link.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 121,
                                                columnNumber: 19
                                            }, this)
                                        }, link.label, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 120,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 118,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 116,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-secondary-900 mb-4",
                                    children: "Categories"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 134,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-2",
                                    children: footerLinks.categories.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                href: link.href,
                                                className: "text-sm text-secondary-600 hover:text-primary-500 transition-colors",
                                                children: link.label
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 138,
                                                columnNumber: 19
                                            }, this)
                                        }, link.label, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 137,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "font-semibold text-secondary-900 mb-4",
                                    children: "Contact"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                    className: "space-y-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "tel:+381111234567",
                                                className: "flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-500 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/footer.tsx",
                                                        lineNumber: 158,
                                                        columnNumber: 19
                                                    }, this),
                                                    "+381 11 123 4567"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 154,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: "mailto:info@novikvadrat.rs",
                                                className: "flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-500 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                                        className: "h-4 w-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/layout/footer.tsx",
                                                        lineNumber: 167,
                                                        columnNumber: 19
                                                    }, this),
                                                    "info@novikvadrat.rs"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/layout/footer.tsx",
                                                lineNumber: 163,
                                                columnNumber: 17
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 152,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 65,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 pt-8 border-t border-border",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col items-center gap-4",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-secondary-600 mb-3",
                                    children: "Select Language / Izaberite jezik / Изаберите језик"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center gap-3",
                                    children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["locales"].map((locale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: ()=>handleLanguageChange(locale),
                                            className: `px-3 ${currentLocale === locale ? 'font-bold' : 'font-normal'}`,
                                            children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["localeNames"][locale]
                                        }, locale, false, {
                                            fileName: "[project]/src/components/layout/footer.tsx",
                                            lineNumber: 182,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/layout/footer.tsx",
                                    lineNumber: 180,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/layout/footer.tsx",
                            lineNumber: 178,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/layout/footer.tsx",
                        lineNumber: 177,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-8 pt-8 border-t border-border",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col md:flex-row justify-between items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-secondary-600",
                                children: [
                                    "© ",
                                    currentYear,
                                    " Novi Kvadrat. All rights reserved."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/layout/footer.tsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-4",
                                children: footerLinks.terms.map((link)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                        href: link.href,
                                        className: "text-sm text-secondary-600 hover:text-primary-500 transition-colors",
                                        children: link.label
                                    }, link.label, false, {
                                        fileName: "[project]/src/components/layout/footer.tsx",
                                        lineNumber: 205,
                                        columnNumber: 17
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/layout/footer.tsx",
                                lineNumber: 203,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/layout/footer.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/layout/footer.tsx",
                    lineNumber: 198,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/layout/footer.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/layout/footer.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__f60f6992._.js.map