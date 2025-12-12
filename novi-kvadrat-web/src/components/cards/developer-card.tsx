'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Building2, CheckCircle, TrendingUp, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatCurrency } from '@/lib/utils'

interface DeveloperCardProps {
  id: string
  slug: string
  name: string
  logo: string
  projectsOnSale: number
  completedProjects?: number
  priceFrom: number
  currency?: string
  isVerified?: boolean
  rating?: number
  cities?: string[]
}

export function DeveloperCard({
  id,
  slug,
  name,
  logo,
  projectsOnSale,
  completedProjects = 0,
  priceFrom,
  currency = '€',
  isVerified,
  rating,
  cities = []
}: DeveloperCardProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div className="group bg-white rounded-lg border border-secondary-200 p-6 hover:shadow-lg transition-all duration-300">
      {/* Logo and Verification */}
      <div className="flex items-start justify-between mb-4">
        <div className="relative h-16 w-16 bg-secondary-100 rounded-lg overflow-hidden">
          {logo ? (
            <Image
              src={logo}
              alt={name}
              fill
              className="object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Building2 className="h-8 w-8 text-secondary-400" />
            </div>
          )}
        </div>
        {isVerified && (
          <Badge variant="default" className="gap-1">
            <CheckCircle className="h-3 w-3" />
            Verified
          </Badge>
        )}
      </div>

      {/* Developer Name */}
      <h3 className="text-lg font-semibold text-secondary-900 mb-1">
        {name}
      </h3>

      {/* Rating */}
      {rating && (
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={i < Math.floor(rating) ? "text-warning-500" : "text-secondary-200"}
            >
              ★
            </span>
          ))}
          <span className="text-sm text-secondary-600 ml-1">({rating})</span>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4 py-4 border-y border-secondary-100">
        <div>
          <div className="flex items-center gap-1 text-primary-600 mb-1">
            <TrendingUp className="h-4 w-4" />
            <span className="text-2xl font-bold">{projectsOnSale}</span>
          </div>
          <p className="text-xs text-secondary-600">Active Projects</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-success-600 mb-1">
            <Award className="h-4 w-4" />
            <span className="text-2xl font-bold">{completedProjects}</span>
          </div>
          <p className="text-xs text-secondary-600">Completed</p>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <p className="text-xs text-secondary-500 mb-1">Starting from</p>
        <p className="text-xl font-bold text-secondary-900">
          {formatCurrency(priceFrom)}
        </p>
      </div>

      {/* Cities */}
      {cities.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {cities.slice(0, 3).map((city) => (
              <Badge key={city} variant="outline" className="text-xs">
                {city}
              </Badge>
            ))}
            {cities.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{cities.length - 3}
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Action Button */}
      <Link href={`/developer/${slug}`}>
        <Button variant="outline" fullWidth size="md">
          View All Projects
        </Button>
      </Link>
    </div>
  )
}