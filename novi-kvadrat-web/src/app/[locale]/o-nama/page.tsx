'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Building2, Users, MapPin, Target, Eye, Shield, Search, 
  Database, Handshake, TrendingUp, HeadphonesIcon, Calendar,
  ArrowRight, CheckCircle
} from 'lucide-react'
import { useTranslations } from '@/hooks/use-translations'
import { usePathname } from 'next/navigation'
import { type Locale } from '@/i18n/config'

export default function AboutPage() {
  const { t, locale } = useTranslations()
  const pathname = usePathname()
  
  // Extract locale from pathname for links
  const segments = pathname.split('/').filter(Boolean)
  const currentLocale = segments[0] as Locale || 'sr'

  // Stats data
  const stats = [
    { icon: Building2, value: '500+', label: t('about.stats.properties') },
    { icon: Handshake, value: '50+', label: t('about.stats.developers') },
    { icon: MapPin, value: '15+', label: t('about.stats.cities') },
    { icon: Users, value: '10,000+', label: t('about.stats.users') },
  ]

  // Features data
  const features = [
    { icon: Shield, key: 'verified' },
    { icon: Search, key: 'search' },
    { icon: Database, key: 'database' },
    { icon: Handshake, key: 'developers' },
    { icon: TrendingUp, key: 'insights' },
    { icon: HeadphonesIcon, key: 'support' },
  ]

  // Team members
  const teamMembers = [
    { key: 'member1', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
    { key: 'member2', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' },
    { key: 'member3', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
    { key: 'member4', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
  ]

  // Timeline events
  const timelineEvents = ['event1', 'event2', 'event3', 'event4', 'event5']

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 md:mb-6">
              {t('about.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-blue-100 mb-4 md:mb-6">
              {t('about.hero.subtitle')}
            </p>
            <p className="text-base md:text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
              {t('about.hero.description')}
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

      {/* About the Company Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {t('about.company.title')}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('about.company.description')}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {t('about.company.story')}
              </p>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{t('about.company.founded')}</p>
                  <p className="text-2xl font-bold text-gray-900">{t('about.company.foundedYear')}</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop"
                    alt="Modern building"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="hidden md:block absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-2xl -z-10" />
                <div className="hidden md:block absolute -top-6 -right-6 w-24 h-24 bg-blue-600 rounded-2xl -z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Mission Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {t('about.mission.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.mission.description')}
                </p>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 md:p-8">
                <div className="h-14 w-14 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  {t('about.vision.title')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.vision.description')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-10 md:mb-12">
            {t('about.stats.title')}
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 md:h-10 md:w-10 text-white" />
                </div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-sm md:text-base text-blue-100">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('about.features.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('about.features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 group">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-xl bg-blue-100 group-hover:bg-blue-600 flex items-center justify-center mb-4 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-blue-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {t(`about.features.${feature.key}.title`)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(`about.features.${feature.key}.description`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('about.team.title')}
            </h2>
            <p className="text-gray-600">
              {t('about.team.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={member.image}
                    alt={t(`about.team.members.${member.key}.name`)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 md:p-6 text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {t(`about.team.members.${member.key}.name`)}
                  </h3>
                  <p className="text-blue-600 text-sm mb-2">
                    {t(`about.team.members.${member.key}.position`)}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {t(`about.team.members.${member.key}.bio`)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-10 md:mb-12">
            {t('about.timeline.title')}
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />
              <div className="md:hidden absolute left-4 top-0 h-full w-0.5 bg-blue-200" />
              
              <div className="space-y-8 md:space-y-12">
                {timelineEvents.map((eventKey, index) => (
                  <div key={eventKey} className={`relative flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Mobile layout - always left aligned */}
                    <div className="md:hidden flex items-start gap-4">
                      <div className="relative z-10 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <Card className="flex-1 border-0 shadow-md">
                        <CardContent className="p-4">
                          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full mb-2">
                            {t(`about.timeline.events.${eventKey}.year`)}
                          </span>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {t(`about.timeline.events.${eventKey}.title`)}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {t(`about.timeline.events.${eventKey}.description`)}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Desktop layout - alternating */}
                    <div className="hidden md:flex w-full items-center">
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left order-last'}`}>
                        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                          <CardContent className="p-6">
                            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full mb-3">
                              {t(`about.timeline.events.${eventKey}.year`)}
                            </span>
                            <h3 className="font-semibold text-gray-900 mb-2">
                              {t(`about.timeline.events.${eventKey}.title`)}
                            </h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {t(`about.timeline.events.${eventKey}.description`)}
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                      
                      <div className="w-2/12 flex justify-center">
                        <div className="relative z-10 h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      </div>
                      
                      <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8' : 'pr-8 order-first'}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 md:mb-6">
              {t('about.cta.title')}
            </h2>
            <p className="text-blue-100 text-base md:text-lg mb-8 md:mb-10">
              {t('about.cta.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${currentLocale}`}>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                  {t('about.cta.primaryBtn')}
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href={`/${currentLocale}/kontakt`}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  {t('about.cta.secondaryBtn')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
