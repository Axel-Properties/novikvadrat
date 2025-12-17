'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Images, X, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import type { ConstructionProgressSpotWithPhotos } from '@/types/database'

interface ConstructionProgressProps {
  projectName: string
  spots: ConstructionProgressSpotWithPhotos[]
  latestUpdate?: string
}

export function ConstructionProgress({ 
  projectName, 
  spots,
  latestUpdate 
}: ConstructionProgressProps) {
  const [selectedSpot, setSelectedSpot] = useState<ConstructionProgressSpotWithPhotos | null>(null)
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

  if (spots.length === 0) {
    return null
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return ''
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })
  }

  const formatDateRange = (startDate: string | null, endDate: string | null) => {
    const start = formatDate(startDate)
    const end = formatDate(endDate)
    if (start && end && start !== end) {
      return `${start} — ${end}`
    }
    return start || end || ''
  }

  // Get the latest update date from all spots
  const getLatestUpdate = () => {
    if (latestUpdate) return formatDate(latestUpdate)
    
    const dates = spots
      .map(s => s.latest_date)
      .filter(Boolean)
      .map(d => new Date(d!).getTime())
    
    if (dates.length === 0) return null
    return formatDate(new Date(Math.max(...dates)).toISOString())
  }

  const latestUpdateText = getLatestUpdate()

  const handleSpotClick = (spot: ConstructionProgressSpotWithPhotos) => {
    setSelectedSpot(spot)
    setCurrentPhotoIndex(0)
  }

  const closeModal = () => {
    setSelectedSpot(null)
    setCurrentPhotoIndex(0)
  }

  const nextPhoto = () => {
    if (selectedSpot?.photos) {
      setCurrentPhotoIndex((prev) => 
        (prev + 1) % selectedSpot.photos!.length
      )
    }
  }

  const prevPhoto = () => {
    if (selectedSpot?.photos) {
      setCurrentPhotoIndex((prev) => 
        (prev - 1 + selectedSpot.photos!.length) % selectedSpot.photos!.length
      )
    }
  }

  return (
    <section className="py-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Construction progress {projectName}</h2>
        <p className="text-gray-600 mt-2">
          We take photos of complex from same spots, to show real status and dynamics of development.
        </p>
        {latestUpdateText && (
          <p className="text-gray-600 mt-1">
            The latest update — <span className="font-medium text-gray-900">{latestUpdateText}</span>
          </p>
        )}
      </div>

      {/* Spots Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {spots.map((spot) => (
          <Card 
            key={spot.id}
            className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-200"
            onClick={() => handleSpotClick(spot)}
          >
            <div className="relative aspect-[4/3]">
              {spot.cover_image_url ? (
                <Image
                  src={spot.cover_image_url}
                  alt={spot.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Images className="h-8 w-8 text-gray-400" />
                </div>
              )}
              
              {/* Photo count badge */}
              {(spot.photo_count || 0) > 0 && (
                <Badge 
                  className="absolute top-3 right-3 bg-gray-900/80 text-white hover:bg-gray-900"
                >
                  <Images className="h-3 w-3 mr-1" />
                  {spot.photo_count}
                </Badge>
              )}

              {/* Spot name overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white font-medium">{spot.name}</p>
              </div>
            </div>
            
            {/* Date range */}
            <CardContent className="p-3">
              <p className="text-sm text-gray-600">
                {formatDateRange(spot.start_date, spot.latest_date)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Photo Modal/Lightbox */}
      {selectedSpot && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-5xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-12 right-0 text-white hover:bg-white/20"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Photo container */}
            <div className="relative aspect-[16/10] bg-black rounded-lg overflow-hidden">
              {selectedSpot.photos && selectedSpot.photos.length > 0 ? (
                <>
                  <Image
                    src={selectedSpot.photos[currentPhotoIndex].url}
                    alt={`${selectedSpot.name} - Photo ${currentPhotoIndex + 1}`}
                    fill
                    className="object-contain"
                  />
                  
                  {/* Navigation arrows */}
                  {selectedSpot.photos.length > 1 && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={prevPhoto}
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                        onClick={nextPhoto}
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </>
                  )}

                  {/* Photo info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <p className="font-medium">{selectedSpot.name}</p>
                        {selectedSpot.photos[currentPhotoIndex].taken_at && (
                          <p className="text-sm text-gray-300 flex items-center mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(selectedSpot.photos[currentPhotoIndex].taken_at)}
                          </p>
                        )}
                      </div>
                      <div className="text-sm">
                        {currentPhotoIndex + 1} / {selectedSpot.photos.length}
                      </div>
                    </div>
                  </div>
                </>
              ) : selectedSpot.cover_image_url ? (
                <Image
                  src={selectedSpot.cover_image_url}
                  alt={selectedSpot.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <p>No photos available</p>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {selectedSpot.photos && selectedSpot.photos.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2 justify-center">
                {selectedSpot.photos.map((photo, index) => (
                  <button
                    key={photo.id}
                    onClick={() => setCurrentPhotoIndex(index)}
                    className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 ${
                      index === currentPhotoIndex 
                        ? 'ring-2 ring-white' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={photo.url}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

