import React from 'react'
import { Link } from 'react-router-dom'
import { Search, AlertTriangle } from 'lucide-react'
export default function Home1(){return(
  <main className='container text-center py-16'>
    <div className='inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 text-sm mb-6'>
      <AlertTriangle className='w-4 h-4'/> ป้องกันการถูกหลอกลวงออนไลน์
    </div>
    <h1 className='text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 dark:text-white'>ตรวจสอบและรายงานมิจฉาชีพออนไลน์</h1>
    <p className='mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto'><strong>ScamCatcher</strong> ช่วยให้คุณตรวจสอบข้อมูลผู้ที่มีประวัติการโกงและรายงานมิจฉาชีพเพื่อป้องกันผู้อื่น</p>
    <div className='mt-8 flex justify-center gap-4 flex-wrap'>
      <Link to='/search/detail' className='flex items-center gap-2 px-5 py-3 rounded-xl bg-black text-white font-medium hover:bg-gray-800 transition'>
        <Search className='w-5 h-5'/> ค้นหาข้อมูลมิจฉาชีพ
      </Link>
      <Link to='/report' className='flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-gray-900 font-medium border hover:bg-gray-50 transition'>
        <AlertTriangle className='w-5 h-5'/> รายงานมิจฉาชีพ
      </Link>
    </div>
  </main>
) }
