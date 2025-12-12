'use client'

import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from '@/hooks/use-translations'
import { Button } from '@/components/ui/button'
import type { BedCount, BathCount, BedsAndBathsFilterProps } from '../types'
import { BED_OPTIONS, BATH_OPTIONS } from '../types'

export function BedsAndBathsFilter({
  beds,
  baths,
  onBedsChange,
  onBathsChange,
  className,
}: BedsAndBathsFilterProps) {
  const { t } = useTranslations()
  const [open, setOpen] = React.useState(false)
  const [localBeds, setLocalBeds] = React.useState<BedCount[]>(beds)
  const [localBaths, setLocalBaths] = React.useState<BathCount[]>(baths)

  // Sync local state when props change
  React.useEffect(() => {
    setLocalBeds(beds)
    setLocalBaths(baths)
  }, [beds, baths])

  const handleBedToggle = (bed: BedCount) => {
    setLocalBeds((prev) =>
      prev.includes(bed) ? prev.filter((b) => b !== bed) : [...prev, bed]
    )
  }

  const handleBathToggle = (bath: BathCount) => {
    setLocalBaths((prev) =>
      prev.includes(bath) ? prev.filter((b) => b !== bath) : [...prev, bath]
    )
  }

  const handleReset = () => {
    setLocalBeds([])
    setLocalBaths([])
  }

  const handleDone = () => {
    onBedsChange(localBeds)
    onBathsChange(localBaths)
    setOpen(false)
  }

  const getDisplayLabel = () => {
    const parts: string[] = []
    
    if (beds.length > 0) {
      const bedLabel = beds.length === 1 
        ? (beds[0] === 'studio' ? t('heroSearch.bedsAndBaths.studio') : `${beds[0]} ${t('heroSearch.bedsAndBaths.beds')}`)
        : `${beds.length} ${t('heroSearch.bedsAndBaths.beds')}`
      parts.push(bedLabel)
    }
    
    if (baths.length > 0) {
      const bathLabel = baths.length === 1
        ? `${baths[0]} ${t('heroSearch.bedsAndBaths.baths')}`
        : `${baths.length} ${t('heroSearch.bedsAndBaths.baths')}`
      parts.push(bathLabel)
    }
    
    return parts.length > 0 ? parts.join(', ') : t('heroSearch.bedsAndBaths.title')
  }

  const getBedLabel = (bed: BedCount): string => {
    if (bed === 'studio') {
      return t('heroSearch.bedsAndBaths.studio')
    }
    return String(bed)
  }

  const getBathLabel = (bath: BathCount): string => {
    return String(bath)
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
            (beds.length > 0 || baths.length > 0) && 'text-secondary-900',
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
            'z-50 min-w-[320px] rounded-xl border border-secondary-200 bg-white p-4 shadow-lg',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
            'data-[side=bottom]:slide-in-from-top-2'
          )}
        >
          {/* Beds Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              {t('heroSearch.bedsAndBaths.beds')}
            </label>
            <div className="flex flex-wrap gap-2">
              {BED_OPTIONS.map((bed) => (
                <button
                  key={String(bed)}
                  type="button"
                  onClick={() => handleBedToggle(bed)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200',
                    localBeds.includes(bed)
                      ? 'bg-success-500 border-success-500 text-white'
                      : 'bg-white border-secondary-200 text-secondary-700 hover:border-secondary-300'
                  )}
                >
                  {getBedLabel(bed)}
                </button>
              ))}
            </div>
          </div>

          {/* Baths Section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              {t('heroSearch.bedsAndBaths.baths')}
            </label>
            <div className="flex flex-wrap gap-2">
              {BATH_OPTIONS.map((bath) => (
                <button
                  key={String(bath)}
                  type="button"
                  onClick={() => handleBathToggle(bath)}
                  className={cn(
                    'px-3 py-1.5 text-sm font-medium rounded-full border transition-all duration-200',
                    localBaths.includes(bath)
                      ? 'bg-success-500 border-success-500 text-white'
                      : 'bg-white border-secondary-200 text-secondary-700 hover:border-secondary-300'
                  )}
                >
                  {getBathLabel(bath)}
                </button>
              ))}
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
