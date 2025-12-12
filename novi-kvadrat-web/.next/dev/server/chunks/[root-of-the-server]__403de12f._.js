module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

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
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/lib/supabase/server.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createClient",
    ()=>createClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@supabase/ssr/dist/module/createServerClient.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
async function createClient() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$ssr$2f$dist$2f$module$2f$createServerClient$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createServerClient"])(("TURBOPACK compile-time value", "https://pmzzhxoalkixcxrnmxco.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtenpoeG9hbGtpeGN4cm5teGNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0ODI3NDIsImV4cCI6MjA4MTA1ODc0Mn0.yx-GFgAA4J1-Ih_txBWZN_0V7pqoP6dkZpP5epUPvRM"), {
        cookies: {
            getAll () {
                return cookieStore.getAll();
            },
            setAll (cookiesToSet) {
                try {
                    cookiesToSet.forEach(({ name, value, options })=>{
                        cookieStore.set(name, value, options);
                    });
                } catch (error) {
                // The `set` method was called from a Server Component.
                // This can be ignored if you have middleware refreshing
                // user sessions.
                }
            }
        }
    });
}
}),
"[project]/src/app/api/projects/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/supabase/server.ts [app-route] (ecmascript)");
;
;
async function GET(request) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const supabase = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$supabase$2f$server$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createClient"])();
        // Parse query parameters
        const city = searchParams.get('city');
        const municipality = searchParams.get('municipality');
        const status = searchParams.get('status');
        const priceMin = searchParams.get('price_min');
        const priceMax = searchParams.get('price_max');
        const pricePerSqmMin = searchParams.get('price_per_sqm_min');
        const pricePerSqmMax = searchParams.get('price_per_sqm_max');
        const developer = searchParams.get('developer');
        const featured = searchParams.get('featured');
        const sort = searchParams.get('sort') || 'featured';
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        console.log('API Filters:', {
            city,
            municipality,
            status,
            sort,
            page
        });
        // Start building the query
        let query = supabase.from('projects').select(`
        *,
        developer:developers(id, name, slug, is_verified),
        city:cities(id, name_en, name_sr_lat, slug),
        municipality:municipalities(id, name_en, name_sr_lat, slug)
      `, {
            count: 'exact'
        }).eq('is_active', true);
        // Apply filters
        if (city) {
            const { data: cityData } = await supabase.from('cities').select('id').eq('slug', city).single();
            if (cityData) {
                query = query.eq('city_id', cityData.id);
            }
        }
        if (municipality) {
            const { data: municipalityData } = await supabase.from('municipalities').select('id').eq('slug', municipality).single();
            console.log('Municipality lookup:', municipality, municipalityData);
            if (municipalityData) {
                query = query.eq('municipality_id', municipalityData.id);
            }
        }
        if (status) {
            console.log('Applying status filter:', status);
            query = query.eq('construction_status', status);
        }
        if (priceMin) {
            query = query.gte('price_from', priceMin);
        }
        if (priceMax) {
            query = query.lte('price_to', priceMax);
        }
        if (pricePerSqmMin) {
            query = query.gte('price_per_sqm_from', pricePerSqmMin);
        }
        if (pricePerSqmMax) {
            query = query.lte('price_per_sqm_to', pricePerSqmMax);
        }
        if (developer) {
            const { data: developerData } = await supabase.from('developers').select('id').eq('slug', developer).single();
            if (developerData) {
                query = query.eq('developer_id', developerData.id);
            }
        }
        if (featured === 'true') {
            query = query.eq('featured', true);
        }
        // Apply sorting
        switch(sort){
            case 'price_asc':
                query = query.order('price_from', {
                    ascending: true,
                    nullsLast: true
                });
                break;
            case 'price_desc':
                query = query.order('price_from', {
                    ascending: false,
                    nullsFirst: true
                });
                break;
            case 'newest':
                query = query.order('created_at', {
                    ascending: false
                });
                break;
            case 'completion':
                query = query.order('completion_date', {
                    ascending: true,
                    nullsLast: true
                });
                break;
            case 'featured':
            default:
                query = query.order('featured', {
                    ascending: false
                }).order('featured_order', {
                    ascending: true,
                    nullsLast: true
                }).order('created_at', {
                    ascending: false
                });
                break;
        }
        // Apply pagination
        const offset = (page - 1) * limit;
        query = query.range(offset, offset + limit - 1);
        // Execute query
        const { data, error, count } = await query;
        if (error) {
            throw error;
        }
        // Get aggregations for filters
        const aggregations = await getAggregations(supabase, city);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: data || [],
            pagination: {
                page,
                limit,
                total: count || 0,
                totalPages: Math.ceil((count || 0) / limit)
            },
            aggregations
        });
    } catch (error) {
        console.error('Projects API error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to fetch projects'
        }, {
            status: 500
        });
    }
}
async function getAggregations(supabase, citySlug) {
    const aggregations = {};
    // Get municipalities for the selected city
    if (citySlug) {
        const { data: city } = await supabase.from('cities').select('id').eq('slug', citySlug).single();
        if (city) {
            const { data: municipalities } = await supabase.from('municipalities').select('id, name_en, name_sr_lat, slug').eq('city_id', city.id).order('name_en');
            aggregations.municipalities = municipalities || [];
        }
    }
    // Get construction statuses with counts
    const { data: statuses } = await supabase.from('projects').select('construction_status').eq('is_active', true).not('construction_status', 'is', null);
    if (statuses) {
        const statusCounts = statuses.reduce((acc, proj)=>{
            acc[proj.construction_status] = (acc[proj.construction_status] || 0) + 1;
            return acc;
        }, {});
        aggregations.statuses = Object.entries(statusCounts).map(([status, count])=>({
                status,
                count,
                label: getStatusLabel(status)
            }));
    }
    // Get price ranges
    const { data: priceData } = await supabase.from('projects').select('price_from, price_to').eq('is_active', true).not('price_from', 'is', null);
    if (priceData && priceData.length > 0) {
        const prices = priceData.map((p)=>p.price_from).filter(Boolean);
        aggregations.priceRange = {
            min: Math.min(...prices),
            max: Math.max(...prices)
        };
    }
    return aggregations;
}
function getStatusLabel(status) {
    const labels = {
        'planning': 'U planiranju',
        'u_izgradnji': 'U izgradnji',
        'siva_faza': 'Siva faza',
        'useljivo': 'Useljivo',
        'completed': 'Završeno'
    };
    return labels[status] || status;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__403de12f._.js.map