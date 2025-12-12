import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary-100 text-primary-700 hover:bg-primary-200",
        secondary:
          "border-transparent bg-secondary-100 text-secondary-700 hover:bg-secondary-200",
        success:
          "border-transparent bg-success-100 text-success-700",
        warning:
          "border-transparent bg-warning-100 text-warning-700",
        error:
          "border-transparent bg-error-100 text-error-700",
        outline: 
          "border border-secondary-200 text-secondary-700",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }