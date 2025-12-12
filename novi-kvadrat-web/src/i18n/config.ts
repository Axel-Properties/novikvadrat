export const locales = ['en', 'sr', 'sr-cyrl'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'sr'

export const localeNames: Record<Locale, string> = {
  'en': 'English',
  'sr': 'Srpski',
  'sr-cyrl': 'Српски'
}

// URL slug mappings for each language
export const slugTranslations = {
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
}

export function getLocalizedSlug(slug: string, locale: Locale): string {
  // Check if this slug has a translation
  const translations = slugTranslations[slug as keyof typeof slugTranslations]
  if (translations) {
    return translations[locale] || slug
  }
  
  // Return original slug if no translation exists
  return slug
}

export function getLocalizedPath(path: string, locale: Locale): string {
  // Split path into segments
  const segments = path.split('/').filter(Boolean)
  
  // Translate each segment
  const translatedSegments = segments.map(segment => {
    return getLocalizedSlug(segment, locale)
  })
  
  // Add locale prefix and reconstruct path
  return `/${locale}/${translatedSegments.join('/')}`
}