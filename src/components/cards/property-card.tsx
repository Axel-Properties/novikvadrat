import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, MapPin, Maximize, Home, Building } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PropertyCardProps {
  id: string
  title: string
  images: string[]
  price: number
  pricePerSqm?: number
  currency?: string
  rooms?: number
  area: number
  floor?: number
  totalFloors?: number
  district: string
  city: string
  listingType?: 'sale' | 'rent' | 'daily'
  propertyType?: 'apartment' | 'house' | 'commercial'
  isNew?: boolean
  isFeatured?: boolean
  isVerified?: boolean
  isFavorite?: boolean
  onFavoriteToggle?: () => void
}

export function PropertyCard({
  id,
  title,
  images,
  price,
  pricePerSqm,
  currency = '$',
  rooms,
  area,
  floor,
  totalFloors,
  district,
  city,
  listingType = 'sale',
  propertyType = 'apartment',
  isNew,
  isFeatured,
  isVerified,
  isFavorite,
  onFavoriteToggle
}: PropertyCardProps) {
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div className="group relative bg-white rounded-lg border border-secondary-200 overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary-100">
        {images[0] ? (
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Home className="h-12 w-12 text-secondary-300" />
          </div>
        )}
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {isNew && <Badge variant="success">New</Badge>}
          {isFeatured && <Badge variant="warning">Featured</Badge>}
          {isVerified && <Badge variant="default">Verified</Badge>}
        </div>

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

        {/* Image Count */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/60 text-white text-xs font-medium">
            📷 {images.length}
          </div>
        )}
      </div>

      {/* Content Section */}
      <Link href={`/property/${id}`} className="block p-4">
        {/* Price */}
        <div className="flex items-baseline justify-between mb-3">
          <div className="text-xl font-bold text-secondary-900">
            {currency}{formatPrice(price)}
            {listingType === 'rent' && <span className="text-sm font-normal">/month</span>}
          </div>
          {pricePerSqm && (
            <div className="text-sm text-secondary-500">
              {currency}{formatPrice(pricePerSqm)}/m²
            </div>
          )}
        </div>

        {/* Property Info */}
        <div className="flex items-center gap-4 mb-3 text-sm text-secondary-600">
          {rooms && (
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>{rooms} rooms</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Maximize className="h-4 w-4" />
            <span>{area} m²</span>
          </div>
          {floor && totalFloors && (
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{floor}/{totalFloors}</span>
            </div>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-sm text-secondary-700">
          <MapPin className="h-4 w-4 text-secondary-400" />
          <span>{district}, {city}</span>
        </div>

        {/* Title */}
        <h3 className="mt-2 text-sm text-secondary-600 line-clamp-2">
          {title}
        </h3>
      </Link>
    </div>
  )
}