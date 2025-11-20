import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import { AboutPage, ServicesPage, CalculatorPage, GalleryPage, ProcessPage, ContactPage } from './components/Pages'

function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-20%,rgba(34,211,238,0.12),transparent_60%),radial-gradient(1200px_600px_at_110%_120%,rgba(99,102,241,0.12),transparent_60%)] bg-slate-950 text-slate-100">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/process" element={<ProcessPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<SimplePage title="Privacy Policy" />} />
        <Route path="/terms" element={<SimplePage title="Terms & Conditions" />} />
      </Routes>
      <Footer />
    </div>
  )
}

function SimplePage({ title }) {
  return (
    <section className="pt-28">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white">{title}</h1>
        <p className="text-slate-300 mt-3">Content coming soon.</p>
      </div>
    </section>
  )
}
