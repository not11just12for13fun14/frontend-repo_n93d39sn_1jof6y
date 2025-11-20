import React from 'react'

export default function Highlights() {
  const steps = [
    {
      title: 'Send your list',
      desc: 'Share your army list or box IDs to scope the project.',
    },
    {
      title: 'Get a custom quote',
      desc: 'Transparent pricing with estimated turnaround time.',
    },
    {
      title: 'Approve & enjoy',
      desc: 'We paint with care. You receive soul-filled minis.',
    },
  ]

  return (
    <section className="mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {[
            { title: 'Shikai Tier', desc: 'Quality tabletop+ painting' },
            { title: 'Bankai Tier', desc: 'High-end, showcase-level painting' },
            { title: 'Pro Service', desc: 'Fast communication & clear timelines' },
          ].map((f) => (
            <div key={f.title} className="p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
              <div className="text-white font-semibold">{f.title}</div>
              <div className="text-slate-300 text-sm mt-1">{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-white font-semibold text-lg">How it works</div>
              <div className="text-slate-300 text-sm">A simple 3-step process</div>
            </div>
            <a href="/process" className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold">Full Process →</a>
          </div>

          <div className="mt-6 grid sm:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <div key={s.title} className="p-4 rounded-xl bg-slate-900/60 border border-white/10">
                <div className="text-cyan-300 font-semibold">{String(i + 1).padStart(2, '0')}</div>
                <div className="text-white">{s.title}</div>
                <div className="text-slate-300 text-sm">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
