"use client"

import { Users, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"
import { Link } from "react-router-dom"

export function Footer() {
  const services = [
    { name: 'Plumbing', href: '/services/plumbing' },
    { name: 'Electrical', href: '/services/electrical' },
    { name: 'HVAC', href: '/services/hvac' },
    { name: 'Painting', href: '/services/painting' },
    { name: 'General Repairs', href: '/services/general-repairs' },
  ]

  const company = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Become a Pro', href: '/signup' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
  ]

  const contact = [
    { icon: Phone, label: '1-800-SERVICE', href: 'tel:1-800-7387423' },
    { icon: Mail, label: 'support@homeservicehub.com', href: 'mailto:support@homeservicehub.com' },
    { icon: MapPin, label: 'Available Nationwide', href: '#' },
  ]

  const social = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Instagram, href: '#' },
  ]

  return (
    <footer className="border-t border-gray-200 bg-gray-50">
      {/* Main Footer */}
      <div className="container p-7">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HomeServiceHub</span>
            </Link>

            {/* Social Icons */}
            <div className="ml-4 mt-4 flex gap-3">
              {social.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    key={index}
                    to={item.href}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 hover:bg-teal-600 hover:text-white transition"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-gray-900">Services</h4>
            <ul className="space-y-3 text-sm">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-gray-600 hover:text-teal-600 transition"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-gray-900">Company</h4>
            <ul className="space-y-3 text-sm">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-600 hover:text-teal-600 transition"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-gray-900">Contact</h4>
            <ul className="space-y-4 text-sm">
              {contact.map((item) => {
                const Icon = item.icon
                return (
                  <li key={item.label} className="flex gap-3">
                    <Icon className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <Link
                      to={item.href}
                      className="text-gray-600 hover:text-teal-600 transition"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <p className="text-sm text-gray-600">&copy; 2026 HomeServiceHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}