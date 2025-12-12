'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Globe } from 'lucide-react'
import { locales, localeNames, type Locale } from '@/i18n/config'

interface LanguageSwitcherProps {
  currentLocale?: Locale
}

export function LanguageSwitcher({ currentLocale = 'sr' }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()
  
  const handleLanguageChange = (newLocale: Locale) => {
    // Get current path without locale
    const segments = pathname.split('/').filter(Boolean)
    
    // Remove current locale if present
    if (locales.includes(segments[0] as Locale)) {
      segments.shift()
    }
    
    // Build new path with new locale
    const newPath = `/${newLocale}${segments.length > 0 ? '/' + segments.join('/') : ''}`
    
    router.push(newPath)
  }
  
  const getLanguageCode = (locale: Locale) => {
    switch(locale) {
      case 'en': return 'EN'
      case 'sr': return 'SR'
      case 'sr-cyrl': return 'СР'
      default: return locale.toUpperCase()
    }
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-1.5 px-2">
          <Globe className="h-4 w-4" />
          <span className="text-sm font-medium">{getLanguageCode(currentLocale)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[150px]">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLanguageChange(locale)}
            className={currentLocale === locale ? 'bg-primary-50' : ''}
          >
            <Globe className="h-4 w-4 mr-2" />
            <span className="font-medium">{getLanguageCode(locale)}</span>
            <span className="ml-auto text-xs text-gray-500">
              {locale === 'en' && 'English'}
              {locale === 'sr' && 'Srpski'}
              {locale === 'sr-cyrl' && 'Српски'}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}