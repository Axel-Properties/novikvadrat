'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Share2, MapPin, Building2, Maximize2 } from 'lucide-react'
import type { ProjectBuilding } from '@/types/database'

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface ProjectMapProps {
  projectName: string
  address?: string
  latitude: number | null
  longitude: number | null
  buildings?: ProjectBuilding[]
  cityName?: string
  municipalityName?: string
}

export function ProjectMap({
  projectName,
  address,
  latitude,
  longitude,
  buildings = [],
  cityName,
  municipalityName
}: ProjectMapProps) {
  const [isClient, setIsClient] = useState(false)
  const [selectedBuilding, setSelectedBuilding] = useState<ProjectBuilding | null>(null)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // If no coordinates, show placeholder
  if (!latitude || !longitude) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            {projectName} on the map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-500">
            <MapPin className="h-12 w-12 mb-3 text-gray-400" />
            <p>Map coordinates not available</p>
            {address && <p className="text-sm mt-2">{address}</p>}
          </div>
        </CardContent>
      </Card>
    )
  }

  const center: [number, number] = [latitude, longitude]
  
  // Get all building coordinates for markers
  const buildingMarkers = buildings.filter(b => b.latitude && b.longitude)

  const handleShare = async () => {
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: projectName,
          text: `Check out ${projectName} location`,
          url
        })
      } catch (err) {
        // User cancelled or share failed
        window.open(url, '_blank')
      }
    } else {
      window.open(url, '_blank')
    }
  }

  const handleFullscreen = () => {
    const url = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`
    window.open(url, '_blank')
  }

  const locationText = [address, municipalityName, cityName]
    .filter(Boolean)
    .join(', ')

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold mb-1">
              {projectName} on the map
            </CardTitle>
            {locationText && (
              <p className="text-sm text-gray-600">{locationText}</p>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="relative h-[450px] rounded-b-lg overflow-hidden">
          {isClient && (
            <>
              {/* Import leaflet CSS */}
              <link
                rel="stylesheet"
                href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
                integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
                crossOrigin=""
              />
              <MapContainer
                center={center}
                zoom={16}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Main project marker */}
                <Marker position={center}>
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-semibold text-lg">{projectName}</h3>
                      {address && <p className="text-sm text-gray-600 mt-1">{address}</p>}
                      {buildings.length > 0 && (
                        <p className="text-sm text-gray-500 mt-2">
                          {buildings.length} building{buildings.length > 1 ? 's' : ''} in this project
                        </p>
                      )}
                    </div>
                  </Popup>
                </Marker>

                {/* Building markers */}
                {buildingMarkers.map((building) => (
                  <Marker
                    key={building.id}
                    position={[building.latitude!, building.longitude!]}
                  >
                    <Popup>
                      <div className="p-2 min-w-[200px]">
                        <h4 className="font-semibold">{building.name}</h4>
                        {building.address && (
                          <p className="text-sm text-gray-600">{building.address}</p>
                        )}
                        <div className="mt-2 space-y-1 text-sm">
                          {building.floors && (
                            <p>Floors: <span className="font-medium">{building.floors}</span></p>
                          )}
                          {building.available_units !== null && building.total_units && (
                            <p>
                              Available: <span className="font-medium">
                                {building.available_units}/{building.total_units} units
                              </span>
                            </p>
                          )}
                          {building.construction_status && (
                            <p className="capitalize">
                              Status: <span className="font-medium">
                                {building.construction_status.replace(/_/g, ' ')}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </>
          )}

          {/* Map controls overlay */}
          <div className="absolute top-3 right-3 z-[1000] flex flex-col gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white shadow-md hover:bg-gray-50"
              onClick={handleFullscreen}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Building info cards overlay (if buildings exist) */}
          {selectedBuilding && (
            <div className="absolute bottom-4 left-4 right-4 z-[1000]">
              <Card className="shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-lg">{selectedBuilding.name}</h4>
                      {selectedBuilding.address && (
                        <p className="text-sm text-gray-600">{selectedBuilding.address}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedBuilding(null)}
                    >
                      ×
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Building selector (if multiple buildings) */}
        {buildings.length > 1 && (
          <div className="p-4 border-t bg-gray-50">
            <p className="text-sm text-gray-600 mb-2">
              {buildings.length} buildings in this project:
            </p>
            <div className="flex flex-wrap gap-2">
              {buildings.map((building) => (
                <Button
                  key={building.id}
                  variant={selectedBuilding?.id === building.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedBuilding(
                    selectedBuilding?.id === building.id ? null : building
                  )}
                >
                  <Building2 className="h-3 w-3 mr-1" />
                  {building.name}
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}



