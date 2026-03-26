'use client'

import { useState } from 'react'

export default function FloorPlan() {
  const [isOpen, setIsOpen] = useState(false)
  const pdfPath = '/Anthony - SD 2026.03.13.pdf'

  return (
    <section id="floorplan" className="py-24 px-6 max-w-7xl mx-auto border-t border-slate-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-bold mb-4">Floor Plans</h2>
          <p className="text-slate-500 text-lg">Detailed architectural layouts for 66 Anthony Street.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="bg-slate-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-700 transition"
          >
            {isOpen ? 'Close Viewer' : 'View Floor Plans'}
          </button>
          <a 
            href={pdfPath} 
            download 
            className="border border-slate-200 px-8 py-3 rounded-full font-semibold hover:bg-slate-50 transition"
          >
            Download PDF
          </a>
        </div>
      </div>

      {isOpen && (
        <div className="w-full h-[800px] bg-slate-200 rounded-2xl overflow-hidden shadow-2xl transition-all duration-500">
          <iframe 
            src={`${pdfPath}#toolbar=0`} 
            className="w-full h-full border-none"
            title="Floor Plan Viewer"
          />
        </div>
      )}
    </section>
  )
}
