import React, { useEffect, useState } from 'react'
import { Search, AlertTriangle } from 'lucide-react'

export default function Home1() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-black relative overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div
          className="absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"
          style={{
            left: `${mousePos.x / 20}px`,
            top: `${mousePos.y / 20}px`,
            transition: 'all 0.3s ease-out',
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-400/25 rounded-full blur-3xl"
          style={{
            right: `${mousePos.x / 30}px`,
            bottom: `${mousePos.y / 30}px`,
            transition: 'all 0.4s ease-out',
          }}
        />
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />

        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-300/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
          10% { opacity: 0.5; }
          50% { transform: translateY(-100px) translateX(50px); opacity: 0.8; }
          90% { opacity: 0.5; }
        }
      `}</style>

      {/* Main Content */}
      <main className="container relative z-10 text-center py-32 px-6 flex flex-col items-center justify-center min-h-screen">
        <div className="p-10 sm:p-14 md:p-16 lg:p-20 rounded-3xl border-4 border-cyan-400/60 bg-white/5 backdrop-blur-md shadow-[0_0_60px_rgba(6,182,212,0.4)] max-w-5xl w-full mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight mb-8">
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 text-transparent bg-clip-text drop-shadow-[0_0_40px_rgba(6,182,212,0.8)]">
              ตรวจสอบและรายงาน
            </span>
            <br />
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              มิจฉาชีพออนไลน์
            </span>
          </h1>

          <p className="mt-6 text-gray-200 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            <strong className="text-cyan-300">ScamCatcher</strong> ช่วยให้คุณตรวจสอบข้อมูลผู้ที่มีประวัติการโกง<br className="hidden sm:block" />
            และรายงานมิจฉาชีพเพื่อป้องกันผู้อื่นจากการถูกหลอกลวง
          </p>

          <div className="mt-12 flex justify-center gap-6 flex-wrap">
            <button className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-xl hover:from-cyan-400 hover:to-blue-400 transition-all duration-300 shadow-xl shadow-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/70 hover:scale-105 transform">
              <Search className="w-7 h-7 group-hover:rotate-12 transition-transform" />
              ค้นหาข้อมูลมิจฉาชีพ
            </button>

            <button className="group flex items-center gap-3 px-10 py-5 rounded-2xl bg-white/15 backdrop-blur-md text-white font-bold text-xl border-2 border-cyan-400/50 hover:bg-cyan-400/20 hover:border-cyan-300/70 transition-all duration-300 shadow-xl shadow-cyan-400/20 hover:shadow-2xl hover:shadow-cyan-400/40 hover:scale-105 transform">
              <AlertTriangle className="w-7 h-7 group-hover:rotate-12 transition-transform" />
              รายงานมิจฉาชีพ
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
