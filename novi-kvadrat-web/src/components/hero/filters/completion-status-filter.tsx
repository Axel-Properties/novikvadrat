'use client'

import { cn } from '@/lib/utils'
import { useTranslations } from '@/hooks/use-translations'
import type { CompletionStatus, CompletionStatusFilterProps } from '../types'

export function CompletionStatusFilter({ value, onChange, className }: CompletionStatusFilterProps) {
  const { t } = useTranslations()

  const options: { value: CompletionStatus; labelKey: string }[] = [
    { value: 'all', labelKey: 'heroSearch.completionStatus.all' },
    { value: 'ready', labelKey: 'heroSearch.completionStatus.ready' },
    { value: 'off-plan', labelKey: 'heroSearch.completionStatus.offPlan' },
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
            'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
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
