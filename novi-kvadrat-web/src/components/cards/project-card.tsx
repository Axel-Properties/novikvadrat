'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Calendar, TrendingUp, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn, formatCurrency } from '@/lib/utils'

interface ProjectCardProps {
  id: string
  slug: string
  name: string
  image: string
  address: string
  district: string
  city?: string
  priceFrom: number | null
  pricePerSqm: number | null
  currency?: string
  developer: {
    id: string
    name: string
    slug: string
    isVerified?: boolean
  }
  completionPercentage?: number
  completionDate?: string
  isFeatured?: boolean
  isFavorite?: boolean
  onFavoriteToggle?: () => void
}

export function ProjectCard({
  id,
  slug,
  name,
  image,
  address,
  district,
  city = 'Tbilisi',
  priceFrom,
  pricePerSqm,
  currency = '€',
  developer,
  completionPercentage,
  completionDate,
  isFeatured,
  isFavorite,
  onFavoriteToggle
}: ProjectCardProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div className="group relative bg-white rounded-lg border border-secondary-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary-100">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TrendingUp className="h-12 w-12 text-secondary-300" />
          </div>
        )}
        
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3 left-3">
            <Badge variant="warning">Featured</Badge>
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            onFavoriteToggle?.()
          }}
          className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isFavorite ? "fill-error-500 text-error-500" : "text-secondary-600"
            )}
          />
        </button>
      </div>

      {/* Content Section */}
      <Link href={`/projekat/${slug}`} className="block p-4">
        {/* Project Name & Developer */}
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-secondary-900 line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm text-secondary-600">by {developer.name}</span>
            {developer.isVerified && (
              <CheckCircle className="h-4 w-4 text-primary-500" />
            )}
          </div>
        </div>

        {/* Pricing */}
        {priceFrom && (
          <div className="flex items-baseline justify-between mb-3 pt-3 border-t border-secondary-100">
            <div>
              <span className="text-xs text-secondary-500">From</span>
              <div className="text-xl font-bold text-secondary-900">
                {formatCurrency(priceFrom)}
              </div>
            </div>
            {pricePerSqm && (
              <div className="text-sm text-secondary-500">
                {formatCurrency(pricePerSqm)}/m²
              </div>
            )}
          </div>
        )}

        {/* Location */}
        <div className="flex items-center gap-1 mb-3 text-sm text-secondary-700">
          <MapPin className="h-4 w-4 text-secondary-400" />
          <span>{district}, {city}</span>
        </div>

        {/* Progress Bar */}
        {completionPercentage !== undefined && (
          <div className="mb-2">
            <div className="flex items-center justify-between text-xs text-secondary-600 mb-1">
              <span>Construction Progress</span>
              <span>{completionPercentage}%</span>
            </div>
            <div className="h-2 bg-secondary-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Completion Date */}
        {completionDate && (
          <div className="flex items-center gap-1 text-sm text-secondary-600">
            <Calendar className="h-4 w-4" />
            <span>Completion: {completionDate}</span>
          </div>
        )}
      </Link>
    </div>
  )
}