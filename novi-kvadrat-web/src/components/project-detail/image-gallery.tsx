'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Expand, 
  Images,
  Play,
  View
} from 'lucide-react'
interface GalleryImage {
  id: string
  url: string
  caption?: string | null
  image_type?: string
}

interface ImageGalleryProps {
  mainImage?: string | null
  images: GalleryImage[]
  projectName: string
  videoUrl?: string | null
  virtualTourUrl?: string | null
}

export function ImageGallery({ 
  mainImage, 
  images, 
  projectName,
  videoUrl,
  virtualTourUrl
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  // Combine main image with other images
  const allImages = [
    ...(mainImage ? [{ id: 'main', url: mainImage, caption: projectName, image_type: 'exterior' as const }] : []),
    ...images
  ].filter(img => img.url)

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % allImages.length)
  }, [allImages.length])

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)
  }, [allImages.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          goToNext()
          break
        case 'ArrowLeft':
          goToPrev()
          break
        case 'Escape':
          setIsLightboxOpen(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, goToNext, goToPrev])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen])

  if (allImages.length === 0) {
    return (
      <div className="relative h-[400px] lg:h-[500px] bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="text-center text-gray-500">
          <Images className="h-12 w-12 mx-auto mb-2" />
          <p>No images available</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Image */}
        <div 
          className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden cursor-pointer group"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={allImages[currentIndex].url}
            alt={allImages[currentIndex].caption || projectName}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Image counter */}
          <Badge 
            className="absolute top-4 left-4 bg-black/60 text-white hover:bg-black/70"
          >
            <Images className="h-3 w-3 mr-1" />
            {currentIndex + 1} / {allImages.length}
          </Badge>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            {videoUrl && (
              <Button
                variant="secondary"
                size="sm"
                className="bg-black/60 text-white hover:bg-black/80"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(videoUrl, '_blank')
                }}
              >
                <Play className="h-4 w-4 mr-1" />
                Video
              </Button>
            )}
            {virtualTourUrl && (
              <Button
                variant="secondary"
                size="sm"
                className="bg-black/60 text-white hover:bg-black/80"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(virtualTourUrl, '_blank')
                }}
              >
                <View className="h-4 w-4 mr-1" />
                3D Tour
              </Button>
            )}
            <Button
              variant="secondary"
              size="icon"
              className="bg-black/60 text-white hover:bg-black/80"
              onClick={(e) => {
                e.stopPropagation()
                setIsLightboxOpen(true)
              }}
            >
              <Expand className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation arrows */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrev()
                }}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>

        {/* Thumbnail Strip */}
        {allImages.length > 1 && (
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-thin">
            {allImages.map((img, index) => (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-24 h-16 rounded-md overflow-hidden flex-shrink-0 transition-all duration-200 ${
                  index === currentIndex 
                    ? 'ring-2 ring-blue-500 ring-offset-2' 
                    : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Image
                  src={img.url}
                  alt=""
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 z-10"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-white/80 text-sm z-10">
            {currentIndex + 1} / {allImages.length}
          </div>

          {/* Main image */}
          <div 
            className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[currentIndex].url}
              alt={allImages[currentIndex].caption || projectName}
              fill
              className="object-contain"
            />

            {/* Caption */}
            {allImages[currentIndex].caption && (
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white/90 text-sm bg-black/50 inline-block px-4 py-2 rounded-full">
                  {allImages[currentIndex].caption}
                </p>
              </div>
            )}
          </div>

          {/* Navigation */}
          {allImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  goToPrev()
                }}
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                onClick={(e) => {
                  e.stopPropagation()
                  goToNext()
                }}
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          )}

          {/* Thumbnail strip in lightbox */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 max-w-[90vw] overflow-x-auto pb-2">
              {allImages.map((img, index) => (
                <button
                  key={img.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    setCurrentIndex(index)
                  }}
                  className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 transition-all ${
                    index === currentIndex 
                      ? 'ring-2 ring-white' 
                      : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img.url}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
