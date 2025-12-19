'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from './sidebar'

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname?.includes('/admin/login')

  return (
    <div className="flex min-h-screen bg-gray-100">
      {!isLoginPage && <Sidebar />}
      <div className={`flex-1 flex flex-col ${!isLoginPage ? 'ml-64' : ''}`}>
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
        {!isLoginPage && (
          <footer className="border-t bg-white px-4 py-3">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} Novi Kvadrat. All rights reserved.
            </p>
          </footer>
        )}
      </div>
    </div>
  )
}
