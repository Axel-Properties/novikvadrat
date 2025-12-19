'use client'

import Link from 'next/link'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { cn } from '@/lib/utils'
import {
  Building2,
  Home,
  Image,
  Layers,
  Sparkles,
  Camera,
  TrendingUp,
  LayoutGrid,
  Calendar
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ElementType
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '', icon: LayoutGrid },
  { label: 'Buildings', href: '/buildings', icon: Building2 },
  { label: 'Units', href: '/units', icon: Home },
  { label: 'Layouts', href: '/layouts', icon: Layers },
  { label: 'Images', href: '/images', icon: Image },
  { label: 'Amenities', href: '/amenities', icon: Sparkles },
  { label: 'Progress', href: '/progress', icon: Camera },
  { label: 'Calendar', href: '/calendar', icon: Calendar },
  { label: 'Price History', href: '/price-history', icon: TrendingUp },
]

interface ProjectSubNavProps {
  projectId?: string
  className?: string
}

export function ProjectSubNav({ projectId: propProjectId, className }: ProjectSubNavProps) {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const locale = params.locale as string || 'en'
  const projectId = propProjectId || params.id as string

  const basePath = `/${locale}/admin/projects/${projectId}`

  const isActive = (item: NavItem) => {
    const fullPath = `${basePath}${item.href}`
    if (item.href === '') {
      // For "Edit" tab, only match exact path
      return pathname === basePath
    }
    return pathname.startsWith(fullPath)
  }

  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    // Use startTransition to avoid blocking the UI during navigation
    startTransition(() => {
      router.push(href)
    })
  }

  return (
    <div className={cn('mb-4', className)}>
      <nav 
        className={cn(
          "flex overflow-x-auto border-b border-gray-200 -mx-4 px-4 transition-opacity duration-150 scrollbar-hide",
          isPending && "opacity-70"
        )}
      >
        <div className="flex gap-0.5 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item)
            const href = `${basePath}${item.href}`

            return (
              <Link
                key={item.href}
                href={href}
                onClick={(e) => handleNavigation(e, href)}
                prefetch={true}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-2 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap',
                  active
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
