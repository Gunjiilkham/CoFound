'use client';

export default function NavBar() {
    return (
        <nav className="w-full bg-black sticky top-0 left-0">
            <header className="sticky w-full flex justify-left align-left px-10 py-1 z-50 bg-white hover:drop-shadow-[0_4px_10px_rgba(255,255,255,0.8)] transition-shadow">
              <div className="flex items-center">
              <img src="/logo_light.JPEG" alt="Logo" className="h-10 w-10 mr-1"/>
                  <h1 className="text-2xl font-serif leading-10 font-semibold text-slate-900 hover:italic">
                  <a href="/">Tindernship</a></h1>
              </div>
            </header>
        </nav>
    )
}