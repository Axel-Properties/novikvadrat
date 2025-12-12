'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Upload, CheckCircle, AlertCircle, FileSpreadsheet, Loader2 } from 'lucide-react'

export default function ImportExcelPage() {
  const [isImporting, setIsImporting] = useState(false)
  const [importResult, setImportResult] = useState<any>(null)

  const handleImport = async () => {
    setIsImporting(true)
    setImportResult(null)
    
    try {
      const response = await fetch('/api/import/excel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      const result = await response.json()
      setImportResult(result)
    } catch (error) {
      setImportResult({ 
        success: false, 
        error: 'Failed to import Excel data' 
      })
    } finally {
      setIsImporting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Excel Data Import</h1>
          <p className="text-gray-600">Import data from intern's Excel file collection</p>
        </div>

        {/* Import Result */}
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
                  
                  {importResult.results && (
                    <div className="mt-4 space-y-2">
                      {Object.entries(importResult.results).map(([key, value]: [string, any]) => (
                        <div key={key} className="flex items-center justify-between py-2 border-b">
                          <span className="capitalize font-medium">{key}</span>
                          <div className="flex gap-2">
                            <Badge variant="secondary">
                              Imported: {value.imported}
                            </Badge>
                            <Badge variant="outline">
                              Skipped: {value.skipped}
                            </Badge>
                            {value.errors.length > 0 && (
                              <Badge variant="error">
                                Errors: {value.errors.length}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              Excel Data Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">Cities</p>
                  <p className="text-xl font-semibold">12</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">Municipalities</p>
                  <p className="text-xl font-semibold">14</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">Developers</p>
                  <p className="text-xl font-semibold">100</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">Projects</p>
                  <p className="text-xl font-semibold">104</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">Layouts</p>
                  <p className="text-xl font-semibold">253</p>
                </div>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-sm text-gray-600">Amenities</p>
                  <p className="text-xl font-semibold">104</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold">Notable Developers:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Eagle Hills (Belgrade Waterfront)</li>
                <li>• AFI Europe Serbia</li>
                <li>• Galens Invest</li>
                <li>• MPC Properties</li>
                <li>• PSP Farman</li>
              </ul>
            </div>

            <div className="space-y-3 mb-6">
              <h3 className="font-semibold">Major Projects:</h3>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Belgrade Waterfront (multiple buildings)</li>
                <li>• Airport City Belgrade</li>
                <li>• West 65</li>
                <li>• Skyline Belgrade</li>
                <li>• Victory Gardens</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This will import all data from the Excel file. 
                Existing records with the same slug or PIB will be skipped to avoid duplicates.
              </p>
            </div>

            <Button 
              onClick={handleImport}
              disabled={isImporting}
              className="w-full"
              size="lg"
            >
              {isImporting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 mr-2" />
                  Import All Excel Data
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}