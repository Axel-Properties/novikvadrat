import { ReactNode } from 'react'

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'sr' },
    { locale: 'sr-cyrl' }
  ]
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  return children
}