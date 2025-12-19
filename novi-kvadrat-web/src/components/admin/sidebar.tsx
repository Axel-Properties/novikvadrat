'use client'

import Link from 'next/link'
import { usePathname, useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Globe,
  MapPin,
  Building2,
  FolderKanban,
  Users,
  Sparkles,
  ChevronDown,
  ChevronRight,
  Upload,
  Tags,
  LogOut,
  User
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

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
    title: 'Building Types',
    href: '/admin/building-types',
    icon: <Tags className="h-5 w-5" />
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

interface UserData {
  id: string
  email: string
  fullName: string
  avatarUrl: string | null
  roleName: string | null
}

export function Sidebar() {
  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const locale = params.locale as string || 'en'
  // Only one menu can be open at a time (accordion behavior)
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const [user, setUser] = useState<UserData | null>(null)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

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

  useEffect(() => {
    fetchUser()
    // Auto-expand menu if current path matches a submenu
    const currentItem = navItems.find(item => {
      if (item.children) {
        return item.children.some(child => {
          const fullHref = getHref(child.href)
          return pathname.startsWith(fullHref)
        })
      }
      return false
    })
    if (currentItem) {
      setOpenMenu(currentItem.title)
    }
  }, [pathname, locale])

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
      }
    } catch (error) {
      console.error('Failed to fetch user:', error)
    }
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push(`/${locale}/admin/login`)
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const toggleMenu = (title: string) => {
    setOpenMenu(prev => prev === title ? null : title)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40">
      {/* Logo - Fixed at top */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200">
        <Link href={getHref('/admin')} className="flex items-center gap-3">
          <Image 
            src="/logo.svg" 
            alt="Novi Kvadrat" 
            width={120} 
            height={30}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
      </div>

      {/* Navigation - Scrollable middle section */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1 min-h-0">
        {navItems.map((item) => (
          <div key={item.title}>
            {item.children ? (
              <>
                <button
                  onClick={() => toggleMenu(item.title)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  )}
                >
                  <span className="flex items-center gap-3">
                    {item.icon}
                    {item.title}
                  </span>
                  {openMenu === item.title ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                {openMenu === item.title && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={getHref(child.href)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                          isActive(child.href)
                            ? "bg-blue-600 text-white"
                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {item.icon}
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* User & Footer - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        {/* User Info */}
        {user && (
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatarUrl || ''} alt={user.fullName} />
                <AvatarFallback>
                  <User className="h-4 w-4 text-gray-400" />
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.fullName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.roleName || 'User'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="p-4 space-y-1">
          <Link
            href={`/${locale}`}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
          >
            <Globe className="h-5 w-5" />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <LogOut className="h-5 w-5" />
            {isLoggingOut ? 'Signing out...' : 'Sign Out'}
          </button>
        </div>
      </div>
    </aside>
  )
}

