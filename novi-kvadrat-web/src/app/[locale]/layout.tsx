import { locales, type Locale } from '@/i18n/config'
import { ReactNode } from 'react'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function LocaleLayout({ children, params }: Props): Promise<ReactNode> {
  // Await params as required by Next.js 16
  const { locale } = await params
  return children
}