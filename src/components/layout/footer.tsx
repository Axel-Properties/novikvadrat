import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Mail, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    about: [
      { label: 'About Platform', href: '/about' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: "Buyer's Guide", href: '/guide' },
    ],
    terms: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
    cities: [
      { label: 'Tbilisi', href: '/city/tbilisi' },
      { label: 'Batumi', href: '/city/batumi' },
      { label: 'Kutaisi', href: '/city/kutaisi' },
      { label: 'Rustavi', href: '/city/rustavi' },
    ],
    categories: [
      { label: 'New Projects', href: '/new-projects' },
      { label: 'Apartments for Sale', href: '/sale/apartments' },
      { label: 'Houses for Rent', href: '/rent/houses' },
      { label: 'Commercial Property', href: '/commercial' },
    ]
  }

  return (
    <footer className="bg-secondary-50 border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-primary-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold text-secondary-900">Novi Kvadrat</span>
            </Link>
            <p className="text-sm text-secondary-600 mb-4">
              Your trusted real estate platform in Georgia
            </p>
            <div className="flex space-x-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                className="h-10 w-10 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-colors"
              >
                <Facebook className="h-5 w-5 text-secondary-600" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                className="h-10 w-10 rounded-lg bg-white border border-border flex items-center justify-center hover:bg-primary-50 hover:border-primary-300 transition-colors"
              >
                <Instagram className="h-5 w-5 text-secondary-600" />
              </Link>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold text-secondary-900 mb-4">About</h3>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-600 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="font-semibold text-secondary-900 mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              {footerLinks.cities.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-600 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-secondary-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-secondary-600 hover:text-primary-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-secondary-900 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+995555123456"
                  className="flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-500 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  +995 555 123 456
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@novikvaadrat.ge"
                  className="flex items-center gap-2 text-sm text-secondary-600 hover:text-primary-500 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  info@novikvaadrat.ge
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-600">
              © {currentYear} Novi Kvadrat. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4">
              {footerLinks.terms.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-secondary-600 hover:text-primary-500 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}