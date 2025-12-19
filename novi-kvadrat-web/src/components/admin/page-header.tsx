'use client'

import { Button } from '@/components/ui/button'
import { Plus, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface PageHeaderProps {
  title: string
  description?: string
  backHref?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  children?: React.ReactNode
}

export function PageHeader({ title, description, backHref, action, children }: PageHeaderProps) {
  const params = useParams()
  const locale = params.locale as string || 'en'

  const getHref = (href: string) => {
    if (href.startsWith('/admin')) {
      return `/${locale}${href}`
    }
    return href
  }

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      <div className="flex items-center gap-4">
        {backHref && (
          <Link href={getHref(backHref)}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {children}
        {action && (
          action.href ? (
            <Link href={getHref(action.href)}>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {action.label}
              </Button>
            </Link>
          ) : (
            <Button onClick={action.onClick}>
              <Plus className="h-4 w-4 mr-2" />
              {action.label}
            </Button>
          )
        )}
      </div>
    </div>
  )
}

