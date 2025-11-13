import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { BANKS, TRANSFER_CHANNELS } from '../constants/banks'
import { createReport } from '../services/reports'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อผู้กระทำผิด'),
  bank: z.string().optional(),
  account: z.string().optional().refine(v => !v || String(v).replace(/\D/g, '').length >= 6, 'เลขบัญชีสั้นเกินไป'),
  amount: z.coerce.number().min(1, 'กรุณาระบุจำนวนเงิน'),
  date: z.string().min(1, 'กรุณาระบุวันที่โอน'),
  category: z.string().min(1, 'กรุณาระบุหมวดหมู่'),
  channel: z.string().optional(),
  channelOther: z.string().optional(),
})

export default function Report() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset, watch } = useForm({ resolver: zodResolver(schema) })
  const fileRef = React.useRef(null)
  const [files, setFiles] = React.useState([])
  const [previews, setPreviews] = React.useState([])
  const channelValue = watch('channel')
  const bankValue = watch('bank')

  const onFiles = (e) => {
    const picked = Array.from(e.target.files || [])
    if (picked.length === 0) return
    const next = [...files, ...picked].slice(0, 3)
    setFiles(next)
    setPreviews(next.map(f => URL.createObjectURL(f)))
    e.target.value = ''
  }

  const removePhoto = (idx) => {
    setFiles(prev => prev.filter((_, i) => i !== idx))
    setPreviews(prev => prev.filter((_, i) => i !== idx))
  }

  const onSubmit = async (d) => {
    try {
      if (files.length === 0) {
        toast.error('โปรดอัปโหลดรูปอย่างน้อย 1 รูป')
        return
      }
      if (d.channel === 'OTHER' && d.channelOther) {
        d.channel = d.channelOther
      }
      delete d.channelOther
      const fd = new FormData()
      Object.entries(d).forEach(([k, v]) => fd.append(k, String(v ?? '')))
      files.forEach(f => fd.append('photos', f))
      await createReport(fd)
      toast.success('ส่งรายงานสำเร็จ')
      reset()
      setFiles([]); setPreviews([])
      navigate('/reports')
    } catch (e) {
      toast.error(e?.message || 'ไม่สามารถส่งรายงานได้')
    }
  }

  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-slate-950 dark:to-black">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ left: '10%', top: '20%' }} />
        <div className="absolute w-96 h-96 bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{ right: '10%', bottom: '20%', animationDelay: '1s' }} />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <main className="container relative z-10 py-10">
        <h1 className="text-3xl font-extrabold text-center text-gray-900 dark:text-white mb-6">รายงานมิจฉาชีพ</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 bg-white text-gray-900 rounded-2xl p-6 shadow-xl border border-gray-200 dark:bg-[#061427]/90 dark:text-white dark:border-cyan-400/40 dark:shadow-[0_25px_80px_rgba(6,182,212,0.25)]"
        >
          <div>
            <label className="block text-sm text-gray-600 dark:text-cyan-300 mb-1 font-medium">ชื่อ–นามสกุลผู้กระทำผิด *</label>
            <input
              {...register('name')}
              placeholder="ระบุชื่อ–นามสกุล"
              className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-300"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-cyan-300 mb-1 font-medium">หมวดหมู่ *</label>
            <input
              {...register('category')}
              placeholder="เช่น การลงทุน"
              className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-300"
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-cyan-300 mb-1 font-medium">ธนาคาร</label>
            <select
              {...register('bank')}
              className="appearance-none w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:focus:border-cyan-300"
            >
              <option value="">-- เลือกธนาคาร --</option>
              {BANKS.map(b => <option key={b.value} value={b.value}>{b.label}</option>)}
            </select>
          </div>

          {bankValue && (
            <div>
              <label className="block text-sm text-gray-600 dark:text-cyan-300 mb-1 font-medium">เลขบัญชี</label>
              <input
                {...register('account')}
                placeholder="เช่น 123-4-56789-0"
                className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-300"
              />
              {errors.account && <p className="text-red-500 text-sm mt-1">{errors.account.message}</p>}
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 dark:text-cyan-300 mb-1 font-medium">ช่องทาง</label>
            <div className="grid md:grid-cols-2 gap-3">
              <select
                {...register('channel')}
                className="appearance-none w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:focus:border-cyan-300"
              >
                <option value="">— เลือกช่องทาง —</option>
                {TRANSFER_CHANNELS.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
                <option value="OTHER">อื่น ๆ / ระบุเอง</option>
              </select>
              {channelValue === 'OTHER' && (
                <input
                  {...register('channelOther')}
                  placeholder="ระบุช่องทาง (ถ้าเลือก อื่น ๆ)"
                  className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-300"
                />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-cyan-300 mb-1 font-medium">ยอดโอน (บาท) *</label>
            <input
              type="number"
              {...register('amount')}
              placeholder="ระบุจำนวนเงิน"
              className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-300"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-cyan-300 mb-1 font-medium">วันที่โอนเงิน *</label>
            <input
              type="date"
              {...register('date')}
              className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:focus:border-cyan-300"
            />
            {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 dark:text-cyan-300 mb-1 font-medium">รายละเอียดเพิ่มเติม</label>
            <textarea
              {...register('desc')}
              placeholder="อธิบายเหตุการณ์โดยย่อ"
              className="w-full min-h-28 p-3 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-300"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-gray-600 dark:text-cyan-300 mb-2 font-medium">รูปภาพประกอบ (สูงสุด 3 รูป)</label>
            <div className="flex items-center gap-3 flex-wrap">
              {previews.map((src, idx) => (
                <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-cyan-400/40">
                  <img src={src} alt={`evidence-${idx + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removePhoto(idx)}
                    className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1.5 py-0.5 dark:bg-cyan-600"
                  >
                    x
                  </button>
                </div>
              ))}
              {files.length < 3 && (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="w-20 h-20 rounded-lg border border-gray-300 flex items-center justify-center text-sm text-gray-600 hover:bg-gray-100 transition-all dark:border-cyan-400/40 dark:text-cyan-300 dark:hover:bg-cyan-500/10"
                >
                  + รูป
                </button>
              )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
          </div>

          <div className="md:col-span-2">
            <button
              disabled={isSubmitting}
              type="submit"
              className="w-full h-12 rounded-xl bg-black text-white font-semibold shadow-lg shadow-black/20 hover:bg-gray-900 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-gradient-to-r dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-cyan-500/30 dark:hover:shadow-cyan-500/50 dark:hover:from-cyan-300 dark:hover:via-sky-400 dark:hover:to-blue-400"
            >
              {isSubmitting ? 'กำลังส่ง…' : 'ส่งรายงาน'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}




