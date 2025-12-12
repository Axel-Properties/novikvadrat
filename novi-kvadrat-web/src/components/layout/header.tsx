'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, User, MapPin, ChevronDown, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from '@/components/language-switcher'
import { CitySelector } from '@/components/city-selector'
import { useTranslations } from '@/hooks/use-translations'
import { type Locale } from '@/i18n/config'
import Image from 'next/image'

interface HeaderProps {
  currentCity?: string
  currentLanguage?: string
  user?: any
}

interface NavItemProps {
  item: {
    label: string
    href: string
    dropdown?: Array<{ label: string; href: string }>
  }
  isActive: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function NavItem({ item, isActive, onMouseEnter, onMouseLeave }: NavItemProps) {
  const textRef = useRef<HTMLSpanElement>(null)
  const [textWidth, setTextWidth] = useState(0)
  
  useEffect(() => {
    if (isActive && textRef.current) {
      setTextWidth(textRef.current.offsetWidth)
    }
  }, [isActive])
  
  return (
    <div
      className="relative h-full flex items-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href={item.href}
        className={cn(
          "px-4 py-2 text-sm font-medium text-secondary-700 hover:text-primary-500 transition-colors inline-flex items-center gap-1",
          isActive && "text-primary-500"
        )}
      >
        <span ref={textRef} className="inline-block">
          {item.label}
        </span>
        {item.dropdown && <ChevronDown className="h-3 w-3" />}
      </Link>
      {/* Active bar at bottom of nav row (h-16), matching text width */}
      {isActive && textWidth > 0 && (
        <span 
          className="absolute bottom-0 h-0.5 bg-secondary-900"
          style={{
            left: '1rem',
            width: `${textWidth}px`
          }}
        />
      )}
    </div>
  )
}

export function Header({ currentCity = 'Belgrade', user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()
  const { t, locale } = useTranslations()
  
  // Extract locale from pathname for links
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale = segments[0] as Locale || 'sr'

  const navigationItems = [
    {
      label: t('nav.newDevelopments'),
      href: `/${currentLocale}/novogradnja/beograd`,
      dropdown: [
        { label: 'Beograd', href: `/${currentLocale}/novogradnja/beograd` },
        { label: 'Novi Sad', href: `/${currentLocale}/novogradnja/novi-sad` },
        { label: 'Niš', href: `/${currentLocale}/novogradnja/nis` },
      ]
    },
    {
      label: 'Sale',
      href: '/sale',
      dropdown: [
        { label: 'Apartments', href: '/sale/apartments' },
        { label: 'Houses', href: '/sale/houses' },
        { label: 'Commercial', href: '/sale/commercial' },
        { label: 'Land', href: '/sale/land' },
      ]
    },
    {
      label: 'Rent',
      href: '/rent',
      dropdown: [
        { label: 'Apartments', href: '/rent/apartments' },
        { label: 'Houses', href: '/rent/houses' },
        { label: 'Commercial', href: '/rent/commercial' },
        { label: 'Daily Rental', href: '/rent/daily' },
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
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white relative">
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="flex h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Novi Kvadrat" 
                width={120} 
                height={30}
                className="h-8 w-auto"
                priority
              />
            </Link>

            {/* Navigation - moved 40px after logo */}
            <nav className="flex items-center space-x-1 ml-10 relative h-full">
              {navigationItems.map((item) => (
                <NavItem
                  key={item.label}
                  item={item}
                  isActive={pathname.startsWith(item.href)}
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                />
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3 ml-auto">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>

              {/* City Selector */}
              <CitySelector currentCity={currentCity} currentLocale={currentLocale} />

              {/* Language Selector */}
              <LanguageSwitcher currentLocale={currentLocale} />

              {/* User Menu */}
              {user && (
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              )}
              {!user && (
                <Button variant="default" size="md">
                  Sign In
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden">
          <div className="flex h-14 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Novi Kvadrat" 
                width={100} 
                height={25}
                className="h-6 w-auto"
                priority
              />
            </Link>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Search className="h-5 w-5" />
              </Button>
              <LanguageSwitcher currentLocale={currentLocale} />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Full Size Dropdown Menu - positioned relative to header */}
      {activeDropdown && (() => {
        const activeItem = navigationItems.find(item => item.label === activeDropdown && item.dropdown)
        if (!activeItem) return null
        
        return (
          <div 
            className="hidden lg:block absolute left-0 right-0 bg-white border-b border-border"
            style={{ top: '100%' }}
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <div className="container mx-auto px-4">
              <div className="py-4">
                <div className="ml-10">
                  <div className="flex flex-col space-y-1">
                    {activeItem.dropdown?.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-secondary-700 hover:text-primary-600 transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border">
          <nav className="container mx-auto px-4 py-4">
            {navigationItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block py-2 text-sm font-medium text-secondary-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
                {item.dropdown && (
                  <div className="pl-4">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block py-1.5 text-sm text-secondary-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              <Button variant="default" fullWidth size="md" className="mt-2">
                Sign In
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}