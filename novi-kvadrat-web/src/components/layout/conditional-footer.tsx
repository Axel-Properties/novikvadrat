'use client'

import { usePathname } from 'next/navigation'
import { Footer } from './footer'

export function ConditionalFooter() {
  const pathname = usePathname()
  
  // Hide footer in admin routes
  if (pathname?.includes('/admin')) {
    return null
  }
  
  return <Footer />
}
