'use client'

import { usePathname } from 'next/navigation'
import { type Locale } from '@/i18n/config'
import enTranslations from '@/locales/en.json'
import srTranslations from '@/locales/sr.json'
import srCyrlTranslations from '@/locales/sr-cyrl.json'

const translations = {
  'en': enTranslations,
  'sr': srTranslations,
  'sr-cyrl': srCyrlTranslations
}

export function useTranslations() {
  const pathname = usePathname()
  
  // Extract locale from pathname
  const segments = pathname.split('/').filter(Boolean)
  const locale = (segments[0] as Locale) || 'sr'
  
  // Get translations for current locale
  const t = translations[locale] || translations['sr']
  
  // Helper function to get nested translation
  const translate = (key: string, replacements?: Record<string, string>) => {
    const keys = key.split('.')
    let value: any = t
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    // Replace placeholders if any
    if (typeof value === 'string' && replacements) {
      Object.entries(replacements).forEach(([placeholder, replacement]) => {
        value = value.replace(`{${placeholder}}`, replacement)
      })
    }
    
    return value || key
  }
  
  return { t: translate, locale }
}