'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  MapPin, Phone, Mail, Clock, Send, 
  Facebook, Instagram, Linkedin, Loader2, CheckCircle, AlertCircle 
} from 'lucide-react'
import { useTranslations } from '@/hooks/use-translations'

export default function ContactPage() {
  const { t } = useTranslations()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData(prev => ({ ...prev, subject: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {t('contact.title')}
            </h1>
            <p className="text-lg text-gray-600">
              {t('contact.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="order-2 lg:order-1">
              <CardContent className="p-6 lg:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.name')} *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.namePlaceholder')}
                      className="w-full"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.email')} *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.emailPlaceholder')}
                      className="w-full"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.phone')}
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.phonePlaceholder')}
                      className="w-full"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.subject')} *
                    </label>
                    <Select value={formData.subject} onValueChange={handleSubjectChange} required>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={t('contact.form.subjectPlaceholder')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">{t('contact.form.subjects.general')}</SelectItem>
                        <SelectItem value="property">{t('contact.form.subjects.property')}</SelectItem>
                        <SelectItem value="developer">{t('contact.form.subjects.developer')}</SelectItem>
                        <SelectItem value="technical">{t('contact.form.subjects.technical')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t('contact.form.messagePlaceholder')}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full" 
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5 mr-2" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-lg">
                      <CheckCircle className="h-5 w-5" />
                      <span>{t('contact.form.success')}</span>
                    </div>
                  )}

                  {submitStatus === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <span>{t('contact.form.error')}</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="order-1 lg:order-2 space-y-6">
              <Card>
                <CardContent className="p-6 lg:p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {t('contact.info.title')}
                  </h2>
                  
                  <div className="space-y-6">
                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {t('contact.info.address')}
                        </h3>
                        <p className="text-gray-600">
                          {t('contact.info.addressValue')}
                        </p>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {t('contact.info.phone')}
                        </h3>
                        <a 
                          href="tel:+381111234567" 
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          +381 11 123 4567
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {t('contact.info.email')}
                        </h3>
                        <a 
                          href="mailto:info@novikvadrat.rs" 
                          className="text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          info@novikvadrat.rs
                        </a>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {t('contact.info.workingHours')}
                        </h3>
                        <p className="text-gray-600">
                          {t('contact.info.workingHoursValue')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {t('contact.info.followUs')}
                    </h3>
                    <div className="flex gap-3">
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors"
                        aria-label="Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-pink-100 hover:text-pink-600 transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                      <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-blue-100 hover:text-blue-700 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location / Map Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {t('contact.office.title')}
            </h2>
            <p className="text-gray-600">
              {t('contact.office.description')}
            </p>
          </div>
          
          {/* Map Placeholder */}
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-[16/9] lg:aspect-[21/9] bg-gray-200 flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.4673276398566!2d20.4106!3d44.8025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a7aa8c5c5c5c5%3A0x1234567890abcdef!2sGreen%20Heart%2C%20Bulevar%20Milutina%20Milankovi%C4%87a%2011b%2C%20Beograd%2011070!5e0!3m2!1sen!2srs!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
