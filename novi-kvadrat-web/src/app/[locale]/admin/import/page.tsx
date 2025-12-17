'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, CheckCircle, AlertCircle, Plus, Database } from 'lucide-react'

export default function ImportPage() {
  const [activeTab, setActiveTab] = useState<'developers' | 'projects'>('developers')
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<any>(null)

  // Sample Serbian developers data
  const sampleDevelopers = [
    {
      name: 'Eagle Hills',
      slug: 'eagle-hills',
      pib: '109726433',
      website: 'https://www.eaglehills.com',
      description: 'Leading developer of Belgrade Waterfront project',
      founded_year: 2014,
      is_verified: true
    },
    {
      name: 'AFI Europe Serbia',
      slug: 'afi-europe-serbia',
      pib: '104123456',
      website: 'https://www.afi-europe.rs',
      description: 'Developer of Airport City Belgrade and other premium projects',
      founded_year: 2007,
      is_verified: true
    },
    {
      name: 'Galens Invest',
      slug: 'galens-invest',
      pib: '100350156',
      website: 'https://www.galens.rs',
      description: 'One of the leading construction companies in Serbia',
      founded_year: 2004,
      is_verified: true
    },
    {
      name: 'PSP Farman',
      slug: 'psp-farman',
      pib: '100000834',
      website: 'https://www.pspfarman.rs',
      description: 'Developer of West 65 Tower and other Novi Beograd projects',
      founded_year: 1961,
      is_verified: true
    },
    {
      name: 'MPC Properties',
      slug: 'mpc-properties',
      pib: '107512228',
      website: 'https://www.mpcproperties.rs',
      description: 'Developer of Ušće Towers and Navigator Business Center',
      founded_year: 2002,
      is_verified: true
    }
  ]

  // Sample projects data
  const sampleProjects = [
    {
      name: 'Belgrade Waterfront - BW Terra',
      slug: 'bw-terra',
      developer: 'Eagle Hills',
      city: 'Belgrade',
      municipality: 'Savski Venac',
      status: 'u_izgradnji',
      completion: 2025,
      price_from: 250000,
      price_per_sqm_from: 3500
    },
    {
      name: 'West 65',
      slug: 'west-65',
      developer: 'PSP Farman',
      city: 'Belgrade',
      municipality: 'Novi Beograd',
      status: 'u_izgradnji',
      completion: 2024,
      price_from: 180000,
      price_per_sqm_from: 2800
    },
    {
      name: 'Airport City Belgrade',
      slug: 'airport-city',
      developer: 'AFI Europe Serbia',
      city: 'Belgrade',
      municipality: 'Novi Beograd',
      status: 'useljivo',
      completion: 2023,
      price_from: 150000,
      price_per_sqm_from: 2500
    }
  ]

  const handleImportDevelopers = async () => {
    setIsImporting(true)
    setImportResult(null)
    
    try {
      const response = await fetch('/api/import/developers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ developers: sampleDevelopers })
      })
      
      const result = await response.json()
      setImportResult(result)
    } catch (error) {
      setImportResult({ 
        success: false, 
        error: 'Failed to import developers' 
      })
    } finally {
      setIsImporting(false)
    }
  }

  const handleImportProjects = async () => {
    setIsImporting(true)
    setImportResult(null)
    
    try {
      const response = await fetch('/api/import/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ projects: sampleProjects })
      })
      
      const result = await response.json()
      setImportResult(result)
    } catch (error) {
      setImportResult({ 
        success: false, 
        error: 'Failed to import projects' 
      })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Data Import Tool</h1>
          <p className="text-gray-600">Import Serbian real estate developers and projects</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-6">
          <Button
            variant={activeTab === 'developers' ? 'default' : 'outline'}
            onClick={() => setActiveTab('developers')}
          >
            <Database className="h-4 w-4 mr-2" />
            Developers
          </Button>
          <Button
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            onClick={() => setActiveTab('projects')}
          >
            <Database className="h-4 w-4 mr-2" />
            Projects
          </Button>
        </div>

        {/* Import Result Alert */}
        {importResult && (
          <Card className={`mb-6 ${importResult.success ? 'border-green-500' : 'border-red-500'}`}>
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                {importResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${importResult.success ? 'text-green-700' : 'text-red-700'}`}>
                    {importResult.success ? 'Import Successful!' : 'Import Failed'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {importResult.message || importResult.error}
                  </p>
                  {importResult.imported && (
                    <p className="text-sm text-gray-600 mt-1">
                      Imported: {importResult.imported} | Skipped: {importResult.skipped || 0}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Developers Tab */}
        {activeTab === 'developers' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import Serbian Developers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Import pre-configured top Serbian real estate developers
                </p>
                <Button 
                  onClick={handleImportDevelopers}
                  disabled={isImporting}
                  className="w-full sm:w-auto"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isImporting ? 'Importing...' : `Import ${sampleDevelopers.length} Developers`}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sample Developers to Import</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleDevelopers.map((dev) => (
                    <div key={dev.slug} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-semibold">{dev.name}</p>
                        <p className="text-sm text-gray-600">PIB: {dev.pib} | Founded: {dev.founded_year}</p>
                      </div>
                      {dev.is_verified && (
                        <Badge variant="secondary">Verified</Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Import Sample Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Import sample Serbian real estate projects (novogradnja)
                </p>
                <Button 
                  onClick={handleImportProjects}
                  disabled={isImporting}
                  className="w-full sm:w-auto"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isImporting ? 'Importing...' : `Import ${sampleProjects.length} Projects`}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sample Projects to Import</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sampleProjects.map((project) => (
                    <div key={project.slug} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-semibold">{project.name}</p>
                        <p className="text-sm text-gray-600">
                          {project.developer} | {project.municipality} | From €{project.price_from.toLocaleString()}
                        </p>
                      </div>
                      <Badge variant={project.status === 'useljivo' ? 'default' : 'secondary'}>
                        {project.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Manual Add Form */}
            <Card>
              <CardHeader>
                <CardTitle>Add Project Manually</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="Project Name" />
                    <Input placeholder="Developer" />
                    <Input placeholder="City" />
                    <Input placeholder="Municipality" />
                    <Input type="number" placeholder="Price From (EUR)" />
                    <Input type="number" placeholder="Price per m² (EUR)" />
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}