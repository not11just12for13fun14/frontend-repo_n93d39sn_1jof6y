import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-28">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-32 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              SoulPainterMinis – Bring Your Armies to Life
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="mt-5 text-lg text-slate-300">
              Premium commission painting for Warhammer & other wargames.
            </motion.p>
            <div className="mt-8 flex items-center gap-4">
              <Link to="/contact" className="px-5 py-3 rounded-md bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold shadow-lg shadow-cyan-500/20">
                Get a Quote
              </Link>
              <Link to="/gallery" className="px-5 py-3 rounded-md border border-white/20 text-slate-100 hover:bg-white/10">
                View Gallery
              </Link>
            </div>
            <div className="mt-10 grid sm:grid-cols-2 gap-4">
              {[
                { title: 'Shikai Tier', desc: 'Quality tabletop+ painting' },
                { title: 'Bankai Tier', desc: 'High-end, showcase-level painting' },
                { title: 'Fast communication', desc: 'Personalized service' },
                { title: 'Transparent pricing', desc: 'Clear timelines' },
              ].map((f) => (
                <div key={f.title} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-white font-semibold">{f.title}</div>
                  <div className="text-slate-300 text-sm">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-800 to-slate-900">
              <img src="https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=1470&auto=format&fit=crop" alt="Painted miniature showcase" className="w-full h-full object-cover mix-blend-lighten" />
            </div>
            <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-md bg-cyan-500 text-slate-900 font-semibold shadow-xl">
              Shikai & Bankai Tiers
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
