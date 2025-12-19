'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, X, Loader2, Image as ImageIcon, Link as LinkIcon, FileText } from 'lucide-react'
import { cn } from '@/lib/utils'

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
  placeholder = 'Drop file here or click to browse',
  showPreview = true,
  className = ''
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 100)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

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
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFileSelect(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }, [folder])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleUrlAdd = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim())
      setUrlInput('')
      setShowUrlInput(false)
    }
  }

  const handleRemove = () => {
    onChange('')
    onRemove?.()
  }

  const isImageFile = (url: string) => {
    return url.match(/\.(jpg|jpeg|png|gif|webp)$/i) || 
           url.startsWith('data:image') || 
           (url.includes('supabase') && !url.match(/\.(pdf|doc|docx)$/i))
  }

  const isDocumentFile = (url: string) => {
    return url.match(/\.(pdf|doc|docx)$/i)
  }

  const getFileTypeInfo = () => {
    if (accept?.includes('image')) {
      return { text: 'PNG, JPG, WEBP up to 10MB', urlLabel: 'Or paste image URL' }
    } else if (accept?.includes('pdf') || accept?.includes('doc')) {
      return { text: 'PDF, DOC, DOCX up to 10MB', urlLabel: 'Or paste document URL' }
    }
    return { text: 'Files up to 10MB', urlLabel: 'Or paste file URL' }
  }

  const fileTypeInfo = getFileTypeInfo()

  // If we have a value, show the preview replacing the upload zone
  if (showPreview && value) {
    return (
      <div className={cn('relative inline-block', className)}>
        {isImageFile(value) ? (
          <div className="relative w-full max-w-[280px] aspect-video bg-gray-50 rounded-lg border overflow-hidden group">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="mr-2"
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : isDocumentFile(value) ? (
          <div className="relative flex items-center gap-3 p-3 bg-gray-50 rounded-lg border group max-w-md">
            <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {value.split('/').pop() || 'Document'}
              </p>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative w-full max-w-[280px] aspect-video bg-gray-50 rounded-lg border overflow-hidden group">
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <ImageIcon className="h-10 w-10 text-gray-400" />
            </div>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                className="mr-2"
              >
                Replace
              </Button>
              <Button
                type="button"
                variant="danger"
                size="sm"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {/* Drag and drop zone */}
      <div
        onClick={() => !isUploading && fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          'relative w-full min-h-[140px] rounded-lg border-2 border-dashed transition-all cursor-pointer',
          'flex flex-col items-center justify-center gap-2 p-4',
          isDragOver
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100',
          isUploading && 'pointer-events-none opacity-70'
        )}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
        />

        {isUploading ? (
          <>
            <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
            <p className="text-sm text-gray-600">Uploading...</p>
            <div className="w-full max-w-[200px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </>
        ) : (
          <>
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">{placeholder}</p>
              <p className="text-xs text-gray-400 mt-1">{fileTypeInfo.text}</p>
            </div>
          </>
        )}
      </div>

      {/* URL input toggle */}
      {!showUrlInput ? (
        <button
          type="button"
          onClick={() => setShowUrlInput(true)}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <LinkIcon className="h-3 w-3" />
          {fileTypeInfo.urlLabel}
        </button>
      ) : (
        <div className="flex gap-2">
          <Input
            type="url"
            placeholder="https://..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                handleUrlAdd()
              }
              if (e.key === 'Escape') {
                setShowUrlInput(false)
                setUrlInput('')
              }
            }}
            className="flex-1 h-8 text-sm"
            autoFocus
          />
          <Button
            type="button"
            size="sm"
            onClick={handleUrlAdd}
            disabled={!urlInput.trim()}
            className="h-8"
          >
            Add
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              setShowUrlInput(false)
              setUrlInput('')
            }}
            className="h-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-sm text-red-600">{error}</p>}
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
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFilesSelect = async (files: FileList) => {
    if (values.length + files.length > maxFiles) {
      setError(`Maximum ${maxFiles} files allowed`)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)
    setError(null)

    try {
      const uploadedUrls: string[] = []
      const totalFiles = files.length

      for (let i = 0; i < totalFiles; i++) {
        const file = files[i]
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
        setUploadProgress(Math.round(((i + 1) / totalFiles) * 100))
      }

      onChange([...values, ...uploadedUrls])
      setUrlInput('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) handleFilesSelect(files)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files.length > 0) handleFilesSelect(files)
  }, [values, folder, maxFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleUrlAdd = () => {
    if (urlInput.trim() && values.length < maxFiles) {
      onChange([...values, urlInput.trim()])
      setUrlInput('')
      setShowUrlInput(false)
    }
  }

  const handleRemove = (index: number) => {
    onChange(values.filter((_, i) => i !== index))
  }

  const canAddMore = values.length < maxFiles

  return (
    <div className={cn('space-y-3', className)}>
      {/* Preview grid */}
      {values.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {values.map((url, index) => (
            <div key={index} className="relative group aspect-video">
              <div className="w-full h-full bg-gray-100 rounded-lg border overflow-hidden">
                <img
                  src={url}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 shadow-sm"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Upload zone */}
      {canAddMore && (
        <>
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={cn(
              'relative w-full min-h-[100px] rounded-lg border-2 border-dashed transition-all cursor-pointer',
              'flex flex-col items-center justify-center gap-2 p-4',
              isDragOver
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100',
              isUploading && 'pointer-events-none opacity-70'
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              multiple
              onChange={handleInputChange}
              className="hidden"
            />

            {isUploading ? (
              <>
                <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
                <p className="text-sm text-gray-600">Uploading...</p>
                <div className="w-full max-w-[200px] h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-200"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 text-gray-400" />
                <p className="text-sm text-gray-600">Drop files or click to add more</p>
              </>
            )}
          </div>

          {/* URL input toggle */}
          {!showUrlInput ? (
            <button
              type="button"
              onClick={() => setShowUrlInput(true)}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <LinkIcon className="h-3 w-3" />
              Or paste image URL
            </button>
          ) : (
            <div className="flex gap-2">
              <Input
                type="url"
                placeholder="https://..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleUrlAdd()
                  }
                  if (e.key === 'Escape') {
                    setShowUrlInput(false)
                    setUrlInput('')
                  }
                }}
                className="flex-1 h-8 text-sm"
                autoFocus
              />
              <Button
                type="button"
                size="sm"
                onClick={handleUrlAdd}
                disabled={!urlInput.trim()}
                className="h-8"
              >
                Add
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowUrlInput(false)
                  setUrlInput('')
                }}
                className="h-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}

      {/* Error message */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Count indicator */}
      <p className="text-xs text-gray-500">
        {values.length} / {maxFiles} files
      </p>
    </div>
  )
}
