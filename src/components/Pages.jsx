import React from 'react'
import { motion } from 'framer-motion'

export function AboutPage() {
  return (
    <PageWrap title="About the Studio" subtitle="Craftsmanship, reliability, and passion for wargaming.">
      <p>
        Founded by a dedicated miniature artist, the studio exists to bring soul and character to every model. We are inspired by the dual energies of Shikai and Bankai—refined tabletop and dramatic showcase—guiding how we approach each commission.
      </p>
      <div className="grid sm:grid-cols-2 gap-6 mt-8">
        {[
          { h: 'Decade+ Experience', p: 'Years of painting for games and collectors.' },
          { h: 'Visual Consistency', p: 'Crisp palettes, clean lines, and cohesive forces.' },
          { h: 'Careful Handling', p: 'Secure packaging and protective shipping.' },
          { h: 'Communication', p: 'We update, verify concepts, and align expectations.' },
        ].map((c) => (
          <Card key={c.h} title={c.h} subtitle={c.p} />
        ))}
      </div>
    </PageWrap>
  )
}

export function ServicesPage() {
  const addons = [
    { name: 'OSL Effects', desc: 'Glow and power effects with controlled gradients.' },
    { name: 'Weathering / Battle Damage', desc: 'Chips, grime, and battlefield wear.' },
    { name: 'Advanced Basing', desc: 'Scenic bases to match your lore.' },
    { name: 'Fine Freehand Details', desc: 'Iconography, script, and heraldry.' },
    { name: 'Conversions / Kitbashing', desc: 'Pose, parts, and character changes.' },
    { name: 'Magnetization', desc: 'Swappable loadouts and transport safety.' },
  ]
  return (
    <PageWrap title="Services" subtitle="Choose the energy that fits your army.">
      <Tier
        name="Shikai"
        priceNote="Pricing: Box price × 2"
        points={['Tabletop+ quality', 'Clean lines', 'Washes & highlights', 'Solid tabletop presence']}
        accent="from-cyan-400 to-emerald-400"
      />
      <Tier
        name="Bankai"
        priceNote="Pricing: Box price × 4"
        points={[
          'High-end display quality',
          'Multiple highlight layers',
          'Advanced textures, glazing, edge highlights',
          'Power effects & dramatic lighting',
        ]}
        accent="from-indigo-500 to-fuchsia-500"
      />

      <div className="mt-12">
        <h3 className="text-white text-xl font-semibold">Add-ons</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {addons.map((a) => (
            <div key={a.name} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-white font-medium">{a.name}</div>
              <div className="text-slate-300 text-sm">{a.desc}</div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <a href="/calculator" className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold">Calculate Your Price →</a>
        </div>
      </div>
    </PageWrap>
  )
}

export function CalculatorPage() {
  const [boxPrice, setBoxPrice] = React.useState(60)
  const [tier, setTier] = React.useState('Shikai')
  const [addons, setAddons] = React.useState([])
  const ADDONS = [
    'OSL Effects',
    'Weathering / Battle Damage',
    'Advanced Basing',
    'Fine Freehand Details',
    'Conversions / Kitbashing',
    'Magnetization',
  ]

  const backend = import.meta.env.VITE_BACKEND_URL || ''

  const toggleAddon = (a) => {
    setAddons((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]))
  }

  const [estimate, setEstimate] = React.useState(null)
  const calc = async () => {
    try {
      const res = await fetch(`${backend}/api/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ box_price: Number(boxPrice), tier, addons }),
      })
      const data = await res.json()
      setEstimate(data.estimated_total)
    } catch (e) {
      // Fallback calc
      const mult = tier === 'Shikai' ? 2 : 4
      let total = Number(boxPrice) * mult
      const map = { 'OSL Effects': 0.2, 'Weathering / Battle Damage': 0.15, 'Advanced Basing': 0.15, 'Fine Freehand Details': 0.25, 'Conversions / Kitbashing': 0.3, 'Magnetization': 0.1 }
      addons.forEach((a) => (total += Number(boxPrice) * (map[a] || 0)))
      setEstimate(Math.round(total * 100) / 100)
    }
  }

  React.useEffect(() => { calc() }, [boxPrice, tier, addons])

  return (
    <PageWrap title="Price Calculator" subtitle="Estimate your commission. Placeholder behavior; request an official quote for exact pricing.">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-slate-200 text-sm mb-1">Army / Faction</label>
            <select className="w-full bg-slate-900/60 border border-white/10 rounded-md p-2 text-slate-100">
              <option>Warhammer 40K</option>
              <option>Age of Sigmar</option>
              <option>Sci‑fi</option>
              <option>Fantasy</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-200 text-sm mb-1">Box Price (USD)</label>
            <input type="number" min="0" value={boxPrice} onChange={(e) => setBoxPrice(e.target.value)} className="w-full bg-slate-900/60 border border-white/10 rounded-md p-2 text-slate-100" />
          </div>
          <div>
            <label className="block text-slate-200 text-sm mb-1">Tier</label>
            <div className="flex gap-2">
              {['Shikai', 'Bankai'].map((t) => (
                <button key={t} onClick={() => setTier(t)} className={`px-3 py-2 rounded-md border ${tier === t ? 'bg-cyan-500 text-slate-900 border-transparent' : 'border-white/10 text-slate-100'}`}>{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-slate-200 text-sm mb-1">Add-ons</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ADDONS.map((a) => (
                <label key={a} className="inline-flex items-center gap-2 text-slate-200 text-sm bg-slate-900/60 border border-white/10 rounded-md p-2">
                  <input type="checkbox" checked={addons.includes(a)} onChange={() => toggleAddon(a)} />
                  {a}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-slate-300">Estimated Total</div>
          <div className="mt-1 text-4xl font-extrabold text-white">{estimate ? `$${estimate}` : '--'}</div>
          <div className="mt-6">
            <a href="/contact" className="px-4 py-2 rounded-md bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold">Request Official Quote</a>
          </div>
        </div>
      </div>
    </PageWrap>
  )
}

export function GalleryPage() {
  const filters = ['Warhammer 40K', 'Age of Sigmar', 'Sci‑fi', 'Fantasy', 'Shikai Tier', 'Bankai Tier']
  const [active, setActive] = React.useState('Warhammer 40K')
  const images = [
    { url: 'https://images.unsplash.com/photo-1618588507085-c79565432917?q=80&w=1200&auto=format&fit=crop', caption: 'Intercessors – Shikai' },
    { url: 'https://images.unsplash.com/photo-1606011334315-025e4baab810?q=80&w=1200&auto=format&fit=crop', caption: 'Sorcerer – Bankai' },
    { url: 'https://images.unsplash.com/photo-1622178031583-4f9bfc977e10?q=80&w=1200&auto=format&fit=crop', caption: 'Mech Walker – Bankai' },
    { url: 'https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1200&auto=format&fit=crop', caption: 'Elven Warrior – Shikai' },
    { url: 'https://images.unsplash.com/photo-1612036782180-6f0b6a6c9267?q=80&w=1200&auto=format&fit=crop', caption: 'Knight – Bankai' },
    { url: 'https://images.unsplash.com/photo-1605727216801-e27ce1d0cc28?q=80&w=1200&auto=format&fit=crop', caption: 'Armored Unit – Shikai' },
  ]
  const [lightbox, setLightbox] = React.useState(null)

  return (
    <PageWrap title="Gallery" subtitle="Selected works across systems and tiers.">
      <div className="flex flex-wrap gap-2 mb-6">
        {filters.map((f) => (
          <button key={f} onClick={() => setActive(f)} className={`px-3 py-1.5 rounded-full text-sm border ${active === f ? 'bg-cyan-500 text-slate-900 border-transparent' : 'border-white/10 text-slate-100'}`}>{f}</button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, i) => (
          <button key={i} className="group relative overflow-hidden rounded-xl border border-white/10" onClick={() => setLightbox(img)}>
            <img src={img.url} alt={img.caption} className="w-full h-52 object-cover group-hover:scale-105 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent" />
            <div className="absolute bottom-2 left-2 text-white text-sm">{img.caption}</div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center p-6 z-50">
          <div className="max-w-3xl w-full">
            <img src={lightbox.url} alt={lightbox.caption} className="w-full rounded-xl" />
            <div className="text-white mt-2">{lightbox.caption}</div>
          </div>
        </div>
      )}

      <div className="mt-12">
        <h3 className="text-white text-xl font-semibold mb-3">Highlights</h3>
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex gap-4 min-w-max pr-4">
            {images.slice(0, 6).map((img, i) => (
              <div key={i} className="w-72 flex-shrink-0 rounded-xl overflow-hidden border border-white/10">
                <img src={img.url} alt={img.caption} className="w-full h-44 object-cover" />
                <div className="p-3 text-slate-200 text-sm">{img.caption}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrap>
  )
}

export function ProcessPage() {
  const steps = [
    { t: 'Contact & Concept Discussion', d: 'Share your list or box links. We align on vision and energy.' },
    { t: 'Quote & Agreement', d: 'Pricing, timeline, and expectations confirmed.' },
    { t: 'Model Preparation', d: 'Cleaning, assembly, magnetizing as needed, priming.' },
    { t: 'Painting', d: 'Tier-specific methods to achieve Shikai or Bankai finish.' },
    { t: 'Final Approval', d: 'Photos shared before completion for any touches.' },
    { t: 'Secure Shipping', d: 'Protective packaging and tracked delivery.' },
  ]

  const faqs = [
    { q: 'How long does a project take?', a: 'Typical turnaround ranges from 2–6 weeks depending on scope and tier.' },
    { q: 'Do you provide assembly?', a: 'Yes. Assembly, cleaning, and priming are available.' },
    { q: 'What if I want revisions?', a: 'We offer a collaborative process with reasonable revisions built in.' },
    { q: 'Do you ship internationally?', a: 'Yes, tracked and protected. Customs fees are the client’s responsibility.' },
  ]

  return (
    <PageWrap title="Commission Process" subtitle="Clear steps from first message to final delivery.">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {steps.map((s, i) => (
            <div key={s.t} className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="text-cyan-300 font-semibold">Step {String(i + 1).padStart(2, '0')}</div>
              <div className="text-white">{s.t}</div>
              <div className="text-slate-300 text-sm">{s.d}</div>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10">
          <div className="text-white font-semibold">FAQ</div>
          <div className="mt-3 space-y-3">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-white/10 pb-3">
                <div className="text-slate-200">{f.q}</div>
                <div className="text-slate-400 text-sm">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrap>
  )
}

export function ContactPage() {
  const backend = import.meta.env.VITE_BACKEND_URL || ''
  const [form, setForm] = React.useState({ name: '', email: '', description: '', tier: 'Shikai', addons: [] })
  const [sending, setSending] = React.useState(false)
  const [result, setResult] = React.useState(null)
  const ADDONS = ['OSL Effects', 'Weathering / Battle Damage', 'Advanced Basing', 'Fine Freehand Details', 'Conversions / Kitbashing', 'Magnetization']

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setResult(null)
    try {
      const fd = new FormData()
      fd.append('name', form.name)
      fd.append('email', form.email)
      fd.append('description', form.description)
      fd.append('tier', form.tier)
      fd.append('addons', form.addons.join(','))
      const res = await fetch(`${backend}/api/contact`, { method: 'POST', body: fd })
      const data = await res.json()
      setResult({ ok: true, msg: data.message })
    } catch (e) {
      setResult({ ok: false, msg: 'Something went wrong. Please try again.' })
    } finally {
      setSending(false)
    }
  }

  const toggleAddon = (a) => {
    setForm((f) => ({ ...f, addons: f.addons.includes(a) ? f.addons.filter((x) => x !== a) : [...f.addons, a] }))
  }

  return (
    <PageWrap title="Contact" subtitle="Tell us about your project and desired tier.">
      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <div>
            <label className="block text-slate-200 text-sm mb-1">Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-slate-900/60 border border-white/10 rounded-md p-2 text-slate-100" />
          </div>
          <div>
            <label className="block text-slate-200 text-sm mb-1">Email</label>
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full bg-slate-900/60 border border-white/10 rounded-md p-2 text-slate-100" />
          </div>
          <div>
            <label className="block text-slate-200 text-sm mb-1">Tier Preference</label>
            <select value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })} className="w-full bg-slate-900/60 border border-white/10 rounded-md p-2 text-slate-100">
              <option>Shikai</option>
              <option>Bankai</option>
            </select>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-200 text-sm mb-1">Project Description</label>
            <textarea required rows={6} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-slate-900/60 border border-white/10 rounded-md p-2 text-slate-100" />
          </div>
          <div>
            <label className="block text-slate-200 text-sm mb-1">Optional Add-ons</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {ADDONS.map((a) => (
                <label key={a} className="inline-flex items-center gap-2 text-slate-200 text-sm bg-slate-900/60 border border-white/10 rounded-md p-2">
                  <input type="checkbox" checked={form.addons.includes(a)} onChange={() => toggleAddon(a)} />
                  {a}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 flex items-center gap-4">
          <button disabled={sending} className="px-5 py-3 rounded-md bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold disabled:opacity-60">
            {sending ? 'Sending...' : 'Send Request'}
          </button>
          {result && <div className={`${result.ok ? 'text-emerald-400' : 'text-rose-400'}`}>{result.msg}</div>}
        </div>
      </form>
    </PageWrap>
  )
}

function PageWrap({ title, subtitle, children }) {
  return (
    <section className="pt-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl font-bold text-white">{title}</motion.h2>
        {subtitle && <p className="text-slate-300 mt-2">{subtitle}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

function Card({ title, subtitle }) {
  return (
    <div className="p-5 rounded-xl bg-white/5 border border-white/10">
      <div className="text-white font-medium">{title}</div>
      <div className="text-slate-300 text-sm">{subtitle}</div>
    </div>
  )
}

function Tier({ name, priceNote, points, accent = 'from-cyan-400 to-indigo-500' }) {
  return (
    <div className="relative overflow-hidden p-6 rounded-2xl bg-white/5 border border-white/10 mt-6">
      <div className={`absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl opacity-20 bg-gradient-to-br ${accent}`} />
      <div className="relative">
        <div className="text-white text-2xl font-bold">{name}</div>
        <div className="text-slate-300 text-sm">{priceNote}</div>
        <ul className="mt-4 space-y-2 text-slate-200 text-sm">
          {points.map((p) => (
            <li key={p} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400" />
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
