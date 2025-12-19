import { Skeleton } from '@/components/ui/skeleton'

export default function CalendarLoading() {
  return (
    <div className="space-y-4">
      {/* Page Header Skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-8 w-8 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* SubNav Skeleton */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 mb-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded" />
        ))}
      </div>

      {/* Calendar Card Skeleton */}
      <div className="rounded-lg border bg-white">
        <div className="p-6 border-b flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded" />
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-8 w-8 rounded" />
          </div>
        </div>
        <div className="p-6">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>
    </div>
  )
}

