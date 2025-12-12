'use client'

import * as React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTranslations } from '@/hooks/use-translations'
import { Button } from '@/components/ui/button'
import type {
  PropertyCategory,
  PropertyType,
  PropertyTypeDropdownProps,
  ResidentialPropertyType,
  CommercialPropertyType,
} from '../types'
import { RESIDENTIAL_PROPERTY_TYPES, COMMERCIAL_PROPERTY_TYPES } from '../types'

export function PropertyTypeDropdown({
  category,
  selectedTypes,
  onCategoryChange,
  onTypesChange,
  className,
}: PropertyTypeDropdownProps) {
  const { t } = useTranslations()
  const [open, setOpen] = React.useState(false)
  const [localCategory, setLocalCategory] = React.useState<PropertyCategory>(category)
  const [localTypes, setLocalTypes] = React.useState<PropertyType[]>(selectedTypes)

  // Sync local state when props change
  React.useEffect(() => {
    setLocalCategory(category)
    setLocalTypes(selectedTypes)
  }, [category, selectedTypes])

  const currentTypes =
    localCategory === 'residential' ? RESIDENTIAL_PROPERTY_TYPES : COMMERCIAL_PROPERTY_TYPES

  const handleTypeToggle = (type: PropertyType) => {
    setLocalTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    )
  }

  const handleReset = () => {
    setLocalCategory('residential')
    setLocalTypes([])
  }

  const handleDone = () => {
    onCategoryChange(localCategory)
    onTypesChange(localTypes)
    setOpen(false)
  }

  const getDisplayLabel = () => {
    if (selectedTypes.length === 0) {
      return t(`heroSearch.propertyType.${category}`)
    }
    if (selectedTypes.length === 1) {
      return t(`heroSearch.propertyType.types.${selectedTypes[0]}`)
    }
    return `${selectedTypes.length} ${t('heroSearch.propertyType.title').toLowerCase()}`
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
            selectedTypes.length > 0 && 'text-secondary-900',
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
          {/* Category Tabs */}
          <div className="flex items-center gap-1 p-1 mb-4 rounded-lg bg-secondary-100">
            <button
              type="button"
              onClick={() => setLocalCategory('residential')}
              className={cn(
                'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                localCategory === 'residential'
                  ? 'bg-white text-secondary-900 shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900'
              )}
            >
              {t('heroSearch.propertyType.residential')}
            </button>
            <button
              type="button"
              onClick={() => setLocalCategory('commercial')}
              className={cn(
                'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                localCategory === 'commercial'
                  ? 'bg-white text-secondary-900 shadow-sm'
                  : 'text-secondary-600 hover:text-secondary-900'
              )}
            >
              {t('heroSearch.propertyType.commercial')}
            </button>
          </div>

          {/* Property Types Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {currentTypes.map((type) => (
              <label
                key={type}
                className={cn(
                  'flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all duration-200',
                  'hover:bg-secondary-50',
                  localTypes.includes(type) && 'bg-success-50'
                )}
              >
                <input
                  type="checkbox"
                  checked={localTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                  className={cn(
                    'h-4 w-4 rounded border-secondary-300',
                    'text-success-500 focus:ring-success-500'
                  )}
                />
                <span
                  className={cn(
                    'text-sm',
                    localTypes.includes(type) ? 'text-success-700 font-medium' : 'text-secondary-700'
                  )}
                >
                  {t(`heroSearch.propertyType.types.${type}`)}
                </span>
              </label>
            ))}
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
