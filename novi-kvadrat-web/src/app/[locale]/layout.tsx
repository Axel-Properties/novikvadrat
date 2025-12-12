import { locales } from '@/i18n/config'
import { ReactNode } from 'react'

export function generateStaticParams(): Array<{ locale: "en" | "sr" | "sr-cyrl" }> {
  return locales.map((locale) => ({ locale }))
}

type Props = {
  children: ReactNode
  params: Promise<{ locale: "en" | "sr" | "sr-cyrl" }>
}

export default async function LocaleLayout({ children, params }: Props) {
  // Await params as required by Next.js 16
  const { locale } = await params
  return children
}