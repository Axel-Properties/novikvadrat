'use client'

import { usePathname } from 'next/navigation'
import { Header } from './header'

export function ConditionalHeader() {
  const pathname = usePathname()
  
  // Hide header in admin routes
  if (pathname?.includes('/admin')) {
    return null
  }
  
  return <Header />
}

