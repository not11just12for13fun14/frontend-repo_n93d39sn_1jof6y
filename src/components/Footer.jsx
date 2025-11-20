import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="text-white font-semibold text-lg">SoulPainterMinis</div>
            <p className="text-slate-300/80 mt-3 text-sm">Premium miniature painting studio bringing soul, light, and story to your armies.</p>
          </div>
          <div>
            <div className="text-slate-200 font-medium mb-3">Quick Links</div>
            <ul className="space-y-2 text-slate-300/90 text-sm">
              <li><Link to="/services" className="hover:text-white">Services</Link></li>
              <li><Link to="/gallery" className="hover:text-white">Gallery</Link></li>
              <li><Link to="/process" className="hover:text-white">Commission Process</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>
          <div>
            <div className="text-slate-200 font-medium mb-3">Contact</div>
            <ul className="space-y-2 text-slate-300/90 text-sm">
              <li>Email: hello@soulpainterminis.com</li>
              <li>Region: Your City, Your Country</li>
              <li>Hours: Mon–Fri 9am–6pm</li>
            </ul>
            <div className="flex gap-3 mt-3 text-sm">
              <a className="hover:text-white" href="#" aria-label="TikTok">TikTok</a>
              <a className="hover:text-white" href="#" aria-label="Instagram">Instagram</a>
              <a className="hover:text-white" href="#" aria-label="Facebook">Facebook</a>
            </div>
          </div>
          <div>
            <div className="text-slate-200 font-medium mb-3">Brand</div>
            <p className="text-slate-300/80 text-sm">Shikai = refined tabletop. Bankai = dramatic showcase. Choose the energy that fits your army.</p>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 text-slate-400 text-xs">
          © {new Date().getFullYear()} SoulPainterMinis. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
