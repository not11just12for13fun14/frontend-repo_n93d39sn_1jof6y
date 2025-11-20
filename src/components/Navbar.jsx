import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Brush, GalleryHorizontal, Calculator, Info, Mail, BookOpenCheck } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = React.useState(false)

  const navItem = (to, label, Icon) => (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `inline-flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
          isActive ? 'text-white bg-white/10' : 'text-slate-200 hover:text-white hover:bg-white/10'
        }`}
    >
      {Icon && <Icon size={18} />}
      <span>{label}</span>
    </NavLink>
  )

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-emerald-400 via-cyan-400 to-indigo-500 shadow-lg shadow-cyan-500/20 grid place-items-center">
            <Brush className="text-slate-900" size={18} />
          </div>
          <div className="leading-tight">
            <div className="text-white font-semibold tracking-tight">SoulPainterMinis</div>
            <div className="text-[11px] text-cyan-300/80 -mt-0.5">Commission Studio</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItem('/', 'Home')}
          {navItem('/about', 'About', Info)}
          {navItem('/services', 'Services', BookOpenCheck)}
          {navItem('/calculator', 'Calculator', Calculator)}
          {navItem('/gallery', 'Gallery', GalleryHorizontal)}
          {navItem('/process', 'Process')}
          <Link to="/contact" className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-900 font-semibold hover:from-cyan-400 hover:to-indigo-400 transition-colors">
            <Mail size={18} />
            Get a Quote
          </Link>
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-slate-100">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-slate-900/90">
          <div className="px-4 py-3 flex flex-col gap-2">
            {navItem('/', 'Home')}
            {navItem('/about', 'About')}
            {navItem('/services', 'Services')}
            {navItem('/calculator', 'Calculator')}
            {navItem('/gallery', 'Gallery')}
            {navItem('/process', 'Process')}
            <Link to="/contact" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-500 text-slate-900 font-semibold">
              <Mail size={18} />
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
