import { ReactNode } from 'react'

export function generateStaticParams(): { locale: "en" | "sr" | "sr-cyrl" }[] {
  return [
    { locale: 'en' },
    { locale: 'sr' },
    { locale: 'sr-cyrl' }
  ]
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