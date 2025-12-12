'use client'

import { cn } from '@/lib/utils'
import { useTranslations } from '@/hooks/use-translations'
import type { Purpose, PurposeToggleProps } from '../types'

export function PurposeToggle({ value, onChange, className }: PurposeToggleProps) {
  const { t } = useTranslations()

  const options: { value: Purpose; labelKey: string }[] = [
    { value: 'buy', labelKey: 'heroSearch.purpose.buy' },
    { value: 'rent', labelKey: 'heroSearch.purpose.rent' },
  ]

  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-lg border border-secondary-200 bg-white p-1',
        className
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
            value === option.value
              ? 'bg-success-50 text-success-600'
              : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-50'
          )}
        >
          {t(option.labelKey)}
        </button>
      ))}
    </div>
  )
}
