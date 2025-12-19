import { Skeleton } from '@/components/ui/skeleton'

export default function LayoutDetailLoading() {
  return (
    <div className="space-y-4">
      {/* Page Header Skeleton */}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-8 w-8 rounded" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-64" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>

      {/* SubNav Skeleton */}
      <div className="flex gap-2 border-b border-gray-200 pb-2 mb-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded" />
        ))}
      </div>

      {/* Form Card Skeleton */}
      <div className="rounded-lg border bg-white">
        {/* Tabs Skeleton */}
        <div className="flex gap-2 border-b p-4">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>

        {/* Form Content Skeleton */}
        <div className="p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end gap-3">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  )
}
