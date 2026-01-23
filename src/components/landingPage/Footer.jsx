"use client"

import { Users, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t h-[20vh] border-gray-200 bg-gray-50">
      {/* Main Footer */}
      <div className="container  p-7">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-600">
                <Users className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">HomeServiceHub</span>
            </div>
           
            {/* Social Icons */}
            <div className=" ml-4 mt-4 flex gap-3">
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 hover:bg-teal-600 hover:text-white transition"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 hover:bg-teal-600 hover:text-white transition"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 hover:bg-teal-600 hover:text-white transition"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-100 text-teal-600 hover:bg-teal-600 hover:text-white transition"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-gray-900">Services</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  Plumbing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  Electrical
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  HVAC
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  Painting
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  General Repairs
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-gray-900">Company</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  Become a Pro
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-teal-600 transition">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-6 text-lg font-semibold text-gray-900">Contact</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <Phone className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">1-800-SERVICE</span>
              </li>
              <li className="flex gap-3">
                <Mail className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <a href="mailto:support@homeservicehub.com" className="text-gray-600 hover:text-teal-600 transition">
                  support@homeservicehub.com
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-600">Available Nationwide</span>
              </li>
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
