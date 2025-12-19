import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from '@/i18n/config'

// Mapping of translated slugs to actual route paths
const routeRewrites: Record<string, string> = {
  // English translations -> actual routes
  'contact': 'kontakt',
  'new-developments': 'novogradnja',
  'project': 'projekat',
  'developer': 'gradjevinar',
  // Serbian Cyrillic translations -> actual routes
  'контакт': 'kontakt',
  'новоградња': 'novogradnja',
  'пројекат': 'projekat',
  'грађевинар': 'gradjevinar',
}

// Check if the user has a valid admin session
function isAuthenticated(request: NextRequest): boolean {
  const sessionCookie = request.cookies.get('admin_session')
  
  if (!sessionCookie) {
    return false
  }

  try {
    const sessionData = JSON.parse(
      Buffer.from(sessionCookie.value, 'base64').toString('utf-8')
    )

    // Check if session has expired
    if (sessionData.exp && Date.now() > sessionData.exp) {
      return false
    }

    return true
  } catch {
    return false
  }
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Check if pathname is missing a locale
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  
  // Exclude API routes, static files, and other system routes
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('/favicon.ico') ||
    pathname.includes('.') // files with extensions
  ) {
    return NextResponse.next()
  }
  
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    // Try to get locale from Accept-Language header
    const acceptLanguage = request.headers.get('accept-language')
    let detectedLocale = defaultLocale
    
    if (acceptLanguage) {
      // Check for Serbian
      if (acceptLanguage.includes('sr')) {
        detectedLocale = 'sr'
      }
      // Check for English
      else if (acceptLanguage.includes('en')) {
        detectedLocale = 'en'
      }
    }
    
    // Also check for saved preference in cookie
    const localeCookie = request.cookies.get('locale')
    if (localeCookie && locales.includes(localeCookie.value as any)) {
      detectedLocale = localeCookie.value as any
    }
    
    // Redirect to the same path with locale prefix
    return NextResponse.redirect(
      new URL(`/${detectedLocale}${pathname}`, request.url)
    )
  }
  
  // Handle route rewrites for translated URLs
  const segments = pathname.split('/')
  const locale = segments[1]
  let needsRewrite = false
  
  const rewrittenSegments = segments.map((segment, index) => {
    if (index <= 1) return segment // Keep empty string and locale
    if (routeRewrites[segment]) {
      needsRewrite = true
      return routeRewrites[segment]
    }
    return segment
  })
  
  if (needsRewrite) {
    const rewrittenPath = rewrittenSegments.join('/')
    return NextResponse.rewrite(new URL(rewrittenPath, request.url))
  }
  
  // Check admin route protection
  const isAdminRoute = pathname.includes('/admin')
  const isLoginPage = pathname.includes('/admin/login')
  
  if (isAdminRoute && !isLoginPage) {
    // Protect admin routes - redirect to login if not authenticated
    if (!isAuthenticated(request)) {
      return NextResponse.redirect(
        new URL(`/${locale}/admin/login`, request.url)
      )
    }
  }
  
  // If already authenticated and trying to access login page, redirect to admin dashboard
  if (isLoginPage && isAuthenticated(request)) {
    return NextResponse.redirect(
      new URL(`/${locale}/admin`, request.url)
    )
  }
  
  // Set locale cookie
  const response = NextResponse.next()
  response.cookies.set('locale', locale, { maxAge: 60 * 60 * 24 * 365 }) // 1 year
  
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}
