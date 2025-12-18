'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, X, Loader2, Image as ImageIcon } from 'lucide-react'

interface FileUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  folder?: string
  accept?: string
  placeholder?: string
  showPreview?: boolean
  className?: string
}

export function FileUpload({
  value,
  onChange,
  onRemove,
  folder = 'general',
  accept = 'image/*',
  placeholder = 'Upload file or paste URL',
  showPreview = true,
  className = ''
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Upload failed')
      }

      const data = await response.json()
      onChange(data.url)
      setUrlInput('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUrlAdd = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput('')
    }
  }

  const handleRemove = () => {
    onChange('')
    onRemove?.()
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Upload button and URL input */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="shrink-0"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          Upload Files
        </Button>
        <Input
          type="url"
          placeholder={placeholder}
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleUrlAdd()
            }
          }}
          className="flex-1"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleUrlAdd}
          disabled={!urlInput.trim()}
        >
          Add
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Preview */}
      {showPreview && value && (
        <div className="relative inline-block">
          <div className="relative w-full max-w-[200px] aspect-video bg-gray-100 rounded-lg border overflow-hidden">
            {value.match(/\.(jpg|jpeg|png|gif|webp)$/i) || value.startsWith('data:image') ? (
              <img
                src={value}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ImageIcon className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Empty state */}
      {showPreview && !value && (
        <div className="w-full max-w-[200px] aspect-video bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <ImageIcon className="h-8 w-8 mx-auto mb-1" />
            <p className="text-xs">No images uploaded</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Multi-file upload variant
interface MultiFileUploadProps {
  values: string[]
  onChange: (urls: string[]) => void
  folder?: string
  accept?: string
  maxFiles?: number
  className?: string
}

export function MultiFileUpload({
  values = [],
  onChange,
  folder = 'general',
  accept = 'image/*',
  maxFiles = 10,
  className = ''
}: MultiFileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    if (values.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    setIsUploading(true)
    setError(null)

    try {
      const uploadedUrls: string[] = []

      for (const file of Array.from(files)) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          const data = await response.json()
          throw new Error(data.error || 'Upload failed')
        }

        const data = await response.json()
        uploadedUrls.push(data.url)
      }

      onChange([...values, ...uploadedUrls])
      setUrlInput('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleUrlAdd = () => {
    if (urlInput.trim() && values.length < maxFiles) {
      onChange([...values, urlInput.trim()])
      setUrlInput('')
    }
  }

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Upload controls */}
      <div className="flex gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading || values.length >= maxFiles}
          className="shrink-0"
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Upload className="h-4 w-4 mr-2" />
          )}
          Upload Files
        </Button>
        <Input
          type="url"
          placeholder="Or paste image URL"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              handleUrlAdd()
            }
          }}
          className="flex-1"
        />
        <Button
          type="button"
          variant="secondary"
          onClick={handleUrlAdd}
          disabled={!urlInput.trim() || values.length >= maxFiles}
        >
          Add
        </Button>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Preview grid */}
      {values.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {values.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-video bg-gray-100 rounded-lg border overflow-hidden">
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full aspect-video max-w-[300px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <ImageIcon className="h-8 w-8 mx-auto mb-1" />
            <p className="text-xs">No images uploaded</p>
          </div>
        </div>
      )}

      {/* Count indicator */}
      <p className="text-xs text-gray-500">
        {values.length} / {maxFiles} files
      </p>
    </div>
  )
}
