'use client'

import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from '@/hooks/use-translations'
import { Button } from '@/components/ui/button'
import type { PriceRangeFilterProps } from '../types'

function formatPrice(value: number | null): string {
  if (value === null || value === 0) return ''
  return new Intl.NumberFormat('de-DE').format(value)
}

function parsePrice(value: string): number | null {
  if (!value.trim()) return null
  // Remove all non-digit characters
  const cleanValue = value.replace(/\D/g, '')
  const num = parseInt(cleanValue, 10)
  return isNaN(num) ? null : num
}

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  className,
}: PriceRangeFilterProps) {
  const { t } = useTranslations()
  const [open, setOpen] = React.useState(false)
  const [localMin, setLocalMin] = React.useState<string>(formatPrice(minPrice))
  const [localMax, setLocalMax] = React.useState<string>(formatPrice(maxPrice))

  // Sync local state when props change
  React.useEffect(() => {
    setLocalMin(formatPrice(minPrice))
    setLocalMax(formatPrice(maxPrice))
  }, [minPrice, maxPrice])

  const handleReset = () => {
    setLocalMin('')
    setLocalMax('')
  }

  const handleDone = () => {
    onMinPriceChange(parsePrice(localMin))
    onMaxPriceChange(parsePrice(localMax))
    setOpen(false)
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow only digits and formatting characters
    const cleanValue = value.replace(/[^\d]/g, '')
    if (cleanValue === '') {
      setLocalMin('')
    } else {
      const num = parseInt(cleanValue, 10)
      setLocalMin(formatPrice(num))
    }
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const cleanValue = value.replace(/[^\d]/g, '')
    if (cleanValue === '') {
      setLocalMax('')
    } else {
      const num = parseInt(cleanValue, 10)
      setLocalMax(formatPrice(num))
    }
  }

  const getDisplayLabel = () => {
    if (minPrice === null && maxPrice === null) {
      return t('heroSearch.price.priceRsd')
    }
    
    if (minPrice !== null && maxPrice !== null) {
      return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)} RSD`
    }
    
    if (minPrice !== null) {
      return `${formatPrice(minPrice)}+ RSD`
    }
    
    if (maxPrice !== null) {
      return `${t('heroSearch.price.maximum')} ${formatPrice(maxPrice)} RSD`
    }
    
    return t('heroSearch.price.priceRsd')
  }

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            'flex items-center justify-between gap-2 h-10 px-3 rounded-lg border border-secondary-200 bg-white text-sm text-secondary-700',
            'hover:border-secondary-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
            'transition-all duration-200 min-w-[140px]',
            (minPrice !== null || maxPrice !== null) && 'text-secondary-900',
            className
          )}
        >
          <span className="truncate">{getDisplayLabel()}</span>
          <ChevronDown className="h-4 w-4 shrink-0 text-secondary-400" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="start"
          sideOffset={4}
          className={cn(
            'z-50 min-w-[280px] rounded-xl border border-secondary-200 bg-white p-4 shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2'
          )}
        >
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Minimum Price */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                {t('heroSearch.price.minimum')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={localMin}
                  onChange={handleMinChange}
                  placeholder="0"
                  className={cn(
                    'w-full h-10 px-3 pr-12 rounded-lg border border-secondary-200 bg-white text-sm text-secondary-900',
                    'placeholder:text-secondary-400',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    'transition-all duration-200'
                  )}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-secondary-400">
                  RSD
                </span>
              </div>
            </div>

            {/* Maximum Price */}
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-1.5">
                {t('heroSearch.price.maximum')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={localMax}
                  onChange={handleMaxChange}
                  placeholder={t('heroSearch.price.any')}
                  className={cn(
                    'w-full h-10 px-3 pr-12 rounded-lg border border-secondary-200 bg-white text-sm text-secondary-900',
                    'placeholder:text-secondary-400',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    'transition-all duration-200'
                  )}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-secondary-400">
                  RSD
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-secondary-200">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              {t('heroSearch.actions.reset')}
            </Button>
            <Button
              size="sm"
              onClick={handleDone}
              className="bg-success-500 hover:bg-success-600 text-white"
            >
              {t('heroSearch.actions.done')}
            </Button>
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
