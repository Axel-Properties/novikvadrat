'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, Heart, User, MapPin, Globe, Plus, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeaderProps {
  currentCity?: string
  currentLanguage?: string
  user?: any
}

export function Header({ currentCity = 'Tbilisi', currentLanguage = 'EN', user }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  const navigationItems = [
    {
      label: 'New Projects',
      href: '/new-projects',
      dropdown: [
        { label: 'Residential Projects', href: '/new-projects/residential' },
        { label: 'Cottages', href: '/new-projects/cottages' },
        { label: 'Developers', href: '/developers' },
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
      label: 'Mortgage',
      href: '/mortgage'
    }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white">
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden lg:block">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-secondary-900">Novi Kvadrat</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium text-secondary-700 hover:text-primary-500 transition-colors inline-flex items-center gap-1",
                      pathname.startsWith(item.href) && "text-primary-500"
                    )}
                  >
                    {item.label}
                    {item.dropdown && <ChevronDown className="h-3 w-3" />}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-64 rounded-lg bg-white shadow-lg border border-border py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-secondary-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              
              <Button variant="outline" size="md" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>

              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>

              {/* City Selector */}
              <Button variant="ghost" size="sm" className="gap-1">
                <MapPin className="h-4 w-4" />
                {currentCity}
                <ChevronDown className="h-3 w-3" />
              </Button>

              {/* Language Selector */}
              <Button variant="ghost" size="sm" className="gap-1">
                <Globe className="h-4 w-4" />
                {currentLanguage}
                <ChevronDown className="h-3 w-3" />
              </Button>

              {/* User Menu */}
              {user ? (
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              ) : (
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
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-7 w-7 rounded-lg bg-primary-500 flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-lg font-bold text-secondary-900">Novi Kvadrat</span>
            </Link>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
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
              <Button variant="outline" fullWidth size="md" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Property
              </Button>
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