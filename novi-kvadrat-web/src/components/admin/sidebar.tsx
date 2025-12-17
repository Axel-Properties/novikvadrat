'use client'

import Link from 'next/link'
import { usePathname, useParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Globe,
  MapPin,
  Building2,
  FolderKanban,
  Settings,
  Users,
  Shield,
  Image,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Upload,
  FileSpreadsheet
} from 'lucide-react'
import { useState } from 'react'

interface NavItem {
  title: string
  href?: string
  icon: React.ReactNode
  children?: { title: string; href: string }[]
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: <LayoutDashboard className="h-5 w-5" />
  },
  {
    title: 'Location',
    icon: <Globe className="h-5 w-5" />,
    children: [
      { title: 'Countries', href: '/admin/countries' },
      { title: 'Cities', href: '/admin/cities' },
      { title: 'Municipalities', href: '/admin/municipalities' }
    ]
  },
  {
    title: 'Developers',
    href: '/admin/developers',
    icon: <Building2 className="h-5 w-5" />
  },
  {
    title: 'Projects',
    href: '/admin/projects',
    icon: <FolderKanban className="h-5 w-5" />
  },
  {
    title: 'Amenities',
    href: '/admin/amenities',
    icon: <Sparkles className="h-5 w-5" />
  },
  {
    title: 'Import',
    icon: <Upload className="h-5 w-5" />,
    children: [
      { title: 'Manual Import', href: '/admin/import' },
      { title: 'Excel Import', href: '/admin/import-excel' }
    ]
  },
  {
    title: 'Users',
    icon: <Users className="h-5 w-5" />,
    children: [
      { title: 'All Users', href: '/admin/users' },
      { title: 'Roles', href: '/admin/roles' }
    ]
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const params = useParams()
  const locale = params.locale as string || 'en'
  const [openMenus, setOpenMenus] = useState<string[]>(['Location', 'Import', 'Users'])

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => 
      prev.includes(title) 
        ? prev.filter(t => t !== title)
        : [...prev, title]
    )
  }

  const getHref = (href: string) => {
    return `/${locale}${href}`
  }

  const isActive = (href: string) => {
    const fullHref = getHref(href)
    if (href === '/admin') {
      return pathname === fullHref || pathname === `/${locale}/admin`
    }
    return pathname.startsWith(fullHref)
  }

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href={getHref('/admin')} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">NK</span>
          </div>
          <span className="font-semibold text-lg">Novi Kvadrat</span>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    "text-gray-300 hover:text-white hover:bg-gray-800"
                  )}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.title}
                  </span>
                  {openMenus.includes(item.title) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {openMenus.includes(item.title) && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={getHref(child.href)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive(child.href)
                            ? "bg-blue-600 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800"
                        )}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        {child.title}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={getHref(item.href!)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive(item.href!)
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
        >
          <Globe className="h-5 w-5" />
          View Website
        </Link>
      </div>
    </aside>
  )
}

