import { ReactNode } from 'react'

export function generateStaticParams() {
  return [
    { locale: 'en' as const },
    { locale: 'sr' as const },
    { locale: 'sr-cyrl' as const }
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