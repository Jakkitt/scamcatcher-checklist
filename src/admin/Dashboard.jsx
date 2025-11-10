import React from 'react';

export default function AdminDashboard(){
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">แดชบอร์ดผู้ดูแลระบบ</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[{k:'รายงานที่รอตรวจสอบ',v:30},{k:'รายงานที่อนุมัติแล้ว',v:76},{k:'รายงานที่ปฏิเสธ',v:69},{k:'ผู้ใช้งานทั้งหมด',v:1390}].map((c)=>(
          <div key={c.k} className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
            <div className="text-3xl font-extrabold">{c.v.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{c.k}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
          <h2 className="font-bold mb-3">การแจ้งเตือน</h2>
          <ul className="divide-y dark:divide-gray-800">
            {[1,2,3].map((i)=> (
              <li key={i} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">รายงานที่รอตรวจสอบ</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">มีรายงานใหม่ที่รอการตรวจสอบและอนุมัติ</div>
                </div>
                <button className="px-3 py-1.5 rounded-lg border text-sm">ตรวจสอบ</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
          <h2 className="font-bold mb-3">กิจกรรมล่าสุด</h2>
          <ul className="space-y-2 text-sm">
            {[1,2,3,4,5].map((i)=> (
              <li key={i} className="flex items-center justify-between">
                <span>admin0{i} อนุมัติรายงาน #{1230+i}</span>
                <span className="text-gray-500 dark:text-gray-400">{i*10} นาทีที่แล้ว</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

