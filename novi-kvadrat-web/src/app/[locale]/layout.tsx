import { locales, type Locale } from '@/i18n/config'
import { ReactNode } from 'react'

// Generate static params for all locales from config
// This ensures new locales added to config are automatically included
export function generateStaticParams(): Array<{ locale: Locale }> {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: ReactNode
  // Use Locale type to maintain consistency with generateStaticParams and config
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children, params }: Props) {
  // Await params as required by Next.js 16
  const { locale } = await params
  return children
}