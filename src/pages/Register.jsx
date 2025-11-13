import React, { useEffect, useState } from 'react'
import { UserPlus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Register() {
  const { register, handleSubmit, watch, setError, formState: { errors, isSubmitting } } = useForm()
  const navigate = useNavigate()
  const { register: registerUser } = useAuth()
  const [serverError, setServerError] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const password = watch('password')

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const onSubmit = async (data) => {
    setServerError('')
    try {
      if (data.password !== data.confirmPassword) throw new Error('รหัสผ่านไม่ตรงกัน')
      await registerUser({
        username: data.username,
        email: data.email,
        password: data.password,
        gender: data.gender,
        dob: data.dob
      })
      navigate('/profile', { replace: true })
    } catch (e) {
      const raw = String(e?.message || '')
      let friendly = raw || 'เกิดข้อผิดพลาด'
      const fields = e?.data?.error?.fields || {}
      const mapMsg = (code) => ({
        invalid_email: 'อีเมลไม่ถูกต้อง',
        min_8: 'อย่างน้อย 8 ตัวอักษร',
        max_72: 'ไม่เกิน 72 ตัวอักษร',
        max_bytes_72: 'ไม่เกิน 72 ไบต์'
      }[code] || 'ข้อมูลไม่ถูกต้อง')

      if (e?.status === 400 && fields) {
        if (fields.email) setError('email', { type: 'server', message: mapMsg(fields.email) })
        if (fields.password) setError('password', { type: 'server', message: mapMsg(fields.password) })
        if (fields.username) setError('username', { type: 'server', message: 'ชื่อผู้ใช้ไม่ถูกต้อง' })
        if (fields.dob) setError('dob', { type: 'server', message: 'วันเกิดไม่ถูกต้อง' })
        if (fields.gender) setError('gender', { type: 'server', message: 'เพศไม่ถูกต้อง' })
        friendly = 'ข้อมูลไม่ถูกต้อง'
      }
      if (/email\s*already\s*exists/i.test(raw) || /duplicate/i.test(raw)) {
        friendly = 'อีเมลนี้มีผู้ใช้งานแล้ว'
      }
      if (/VITE_API_BASE_URL/.test(raw)) {
        friendly = 'ระบบยังไม่พร้อมใช้งาน: โปรดตั้งค่า VITE_API_BASE_URL ในไฟล์ .env แล้วหยุด/รัน npm run dev ใหม่'
      }
      setServerError(friendly)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-black relative overflow-hidden flex items-center justify-center">
      {/* 🔹 Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing Orbs */}
        <div
          className="absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl"
          style={{
            left: `${mousePos.x / 20}px`,
            top: `${mousePos.y / 20}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div
          className="absolute w-96 h-96 bg-blue-400/25 rounded-full blur-3xl"
          style={{
            right: `${mousePos.x / 30}px`,
            bottom: `${mousePos.y / 30}px`,
            transition: 'all 0.4s ease-out'
          }}
        />
        <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" />

        {/* Subtle Grid */}
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
              animationDelay: `${Math.random() * 5}s`
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

      {/* 🔹 Register Form */}
      <div className="relative z-10 w-full max-w-lg mx-4">
        <div className="rounded-3xl p-10 sm:p-12 border-4 border-cyan-400/50 bg-white/5 backdrop-blur-md shadow-[0_0_60px_rgba(6,182,212,0.3)] text-white">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-cyan-300 via-blue-300 to-indigo-300 text-transparent bg-clip-text drop-shadow-[0_0_25px_rgba(6,182,212,0.8)]">
              ลงทะเบียน
            </h2>
            <p className="text-gray-300">กรอกข้อมูลเพื่อสร้างบัญชีของคุณ</p>
          </div>

          {serverError && <p className="text-center text-red-400 text-sm mb-4">{serverError}</p>}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm mb-2 font-medium text-cyan-300">ชื่อผู้ใช้</label>
              <input
                placeholder="ชื่อผู้ใช้"
                {...register('username', { required: 'กรุณากรอกชื่อผู้ใช้' })}
                className="w-full h-12 px-4 rounded-xl bg-gray-900/50 border border-cyan-400/30 text-white placeholder-gray-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
              />
              {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>}
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm mb-2 font-medium text-cyan-300">เพศ</label>
                <select
                  {...register('gender', { required: 'กรุณาเลือกเพศ' })}
                  className="w-full h-12 rounded-xl bg-gray-900/50 border border-cyan-400/30 text-white focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                >
                  <option value="">เลือกเพศ</option>
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                  <option value="other">อื่น ๆ</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-sm mb-2 font-medium text-cyan-300">วันเกิด</label>
                <input
                  type="date"
                  {...register('dob', { required: 'กรุณาเลือกวันเกิด' })}
                  className="w-full h-12 px-4 rounded-xl bg-gray-900/50 border border-cyan-400/30 text-white focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                />
              </div>
            </div>
            {(errors.gender || errors.dob) && (
              <p className="text-red-400 text-sm -mt-2">{errors.gender?.message || errors.dob?.message}</p>
            )}

            <div>
              <label className="block text-sm mb-2 font-medium text-cyan-300">อีเมล</label>
              <input
                type="email"
                placeholder="your@email.com"
                {...register('email', { required: 'กรุณากรอกอีเมล' })}
                className="w-full h-12 px-4 rounded-xl bg-gray-900/50 border border-cyan-400/30 text-white placeholder-gray-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="flex gap-2">
              <div className="w-1/2">
                <label className="block text-sm mb-2 font-medium text-cyan-300">รหัสผ่าน</label>
                <input
                  type="password"
                  placeholder="รหัสผ่าน"
                  {...register('password', {
                    required: 'กรุณากรอกรหัสผ่าน',
                    minLength: { value: 6, message: 'อย่างน้อย 6 ตัวอักษร' }
                  })}
                  className="w-full h-12 px-4 rounded-xl bg-gray-900/50 border border-cyan-400/30 text-white placeholder-gray-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                />
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
              </div>

              <div className="w-1/2">
                <label className="block text-sm mb-2 font-medium text-cyan-300">ยืนยันรหัสผ่าน</label>
                <input
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  {...register('confirmPassword', {
                    required: 'กรุณายืนยันรหัสผ่าน',
                    validate: v => v === password || 'รหัสผ่านไม่ตรงกัน'
                  })}
                  className="w-full h-12 px-4 rounded-xl bg-gray-900/50 border border-cyan-400/30 text-white placeholder-gray-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                />
                {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 
                         bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 
                         transition-all duration-300 shadow-lg shadow-cyan-500/40 hover:shadow-2xl hover:shadow-cyan-500/60"
            >
              {isSubmitting ? 'กำลังส่งข้อมูล...' : (
                <>
                  <UserPlus className="w-5 h-5" />
                  ลงทะเบียน
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-400 mt-6">
              มีบัญชีอยู่แล้ว?{' '}
              <Link to="/login" className="text-cyan-300 hover:underline">
                เข้าสู่ระบบ
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
