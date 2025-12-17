"use client"

import { useToast } from "@/components/ui/use-toast"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "relative flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all",
            "bg-white",
            toast.variant === "destructive" && "border-red-200 bg-red-50"
          )}
        >
          <div className="flex-1">
            {toast.title && (
              <p className={cn(
                "text-sm font-semibold",
                toast.variant === "destructive" ? "text-red-800" : "text-gray-900"
              )}>
                {toast.title}
              </p>
            )}
            {toast.description && (
              <p className={cn(
                "text-sm mt-1",
                toast.variant === "destructive" ? "text-red-600" : "text-gray-600"
              )}>
                {toast.description}
              </p>
            )}
          </div>
          <button
            onClick={() => dismiss(toast.id)}
            className={cn(
              "rounded-md p-1 hover:bg-gray-100",
              toast.variant === "destructive" && "hover:bg-red-100"
            )}
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  )
}

