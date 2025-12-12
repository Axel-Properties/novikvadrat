'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, Eye, Database, Users, Lock, FileText, 
  Mail, ArrowRight, Cookie, Server, UserCheck
} from 'lucide-react'
import { useTranslations } from '@/hooks/use-translations'
import { usePathname } from 'next/navigation'
import { type Locale } from '@/i18n/config'

export default function PrivacyPolicyPage() {
  const { t, locale } = useTranslations()
  const pathname = usePathname()
  
  // Extract locale from pathname for links
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale = segments[0] as Locale || 'sr'

  const sections = [
    { icon: Database, key: 'collection' },
    { icon: Eye, key: 'usage' },
    { icon: Users, key: 'sharing' },
    { icon: Cookie, key: 'cookies' },
    { icon: UserCheck, key: 'rights' },
    { icon: Lock, key: 'security' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16 md:py-20 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="h-16 w-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t('privacy.hero.title')}
            </h1>
            <p className="text-lg text-blue-100/90 max-w-2xl mx-auto">
              {t('privacy.hero.description')}
            </p>
            <p className="text-sm text-blue-200 mt-4">
              {t('privacy.hero.lastUpdated')}: {t('privacy.hero.lastUpdatedDate')}
            </p>
          </div>
        </div>
        
        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <p className="text-gray-600 leading-relaxed">
                  {t('privacy.intro.text')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            {sections.map((section, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <section.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                        {t(`privacy.sections.${section.key}.title`)}
                      </h2>
                      <div className="text-gray-600 leading-relaxed space-y-3">
                        <p>{t(`privacy.sections.${section.key}.description`)}</p>
                        {section.key === 'collection' && (
                          <ul className="list-disc list-inside space-y-2 mt-4 text-gray-600">
                            <li>{t('privacy.sections.collection.items.personal')}</li>
                            <li>{t('privacy.sections.collection.items.property')}</li>
                            <li>{t('privacy.sections.collection.items.usage')}</li>
                            <li>{t('privacy.sections.collection.items.device')}</li>
                          </ul>
                        )}
                        {section.key === 'usage' && (
                          <ul className="list-disc list-inside space-y-2 mt-4 text-gray-600">
                            <li>{t('privacy.sections.usage.items.services')}</li>
                            <li>{t('privacy.sections.usage.items.communication')}</li>
                            <li>{t('privacy.sections.usage.items.improvement')}</li>
                            <li>{t('privacy.sections.usage.items.legal')}</li>
                          </ul>
                        )}
                        {section.key === 'sharing' && (
                          <ul className="list-disc list-inside space-y-2 mt-4 text-gray-600">
                            <li>{t('privacy.sections.sharing.items.developers')}</li>
                            <li>{t('privacy.sections.sharing.items.providers')}</li>
                            <li>{t('privacy.sections.sharing.items.legal')}</li>
                          </ul>
                        )}
                        {section.key === 'rights' && (
                          <ul className="list-disc list-inside space-y-2 mt-4 text-gray-600">
                            <li>{t('privacy.sections.rights.items.access')}</li>
                            <li>{t('privacy.sections.rights.items.correction')}</li>
                            <li>{t('privacy.sections.rights.items.deletion')}</li>
                            <li>{t('privacy.sections.rights.items.portability')}</li>
                            <li>{t('privacy.sections.rights.items.objection')}</li>
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-white">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {t('privacy.contact.title')}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {t('privacy.contact.description')}
                    </p>
                    <a 
                      href="mailto:privacy@novikvadrat.rs" 
                      className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      privacy@novikvadrat.rs
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
              {t('privacy.related.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href={`/${currentLocale}/terms`}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900">{t('privacy.related.terms')}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </CardContent>
                </Card>
              </Link>
              <Link href={`/${currentLocale}/cookies`}>
                <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
                  <CardContent className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Cookie className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-gray-900">{t('privacy.related.cookies')}</span>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
