import React from 'react';

const users = [
  { id:'user123', name:'คุณสมหวัง รัตน์ดี', email:'somwang@example.com', joined:'2022-10-15', reports:3, status:'ใช้งานอยู่' },
  { id:'user456', name:'คุณสมศรี นุ้ยง', email:'somsri@example.com', joined:'2022-11-20', reports:1, status:'ใช้งานอยู่' },
  { id:'user789', name:'คุณสมชาย ใจดี', email:'somchai@example.com', joined:'2023-01-05', reports:0, status:'ระงับการใช้งาน' },
];

export default function AdminUsers(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">จัดการผู้ใช้งาน</h1>
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left">
            <tr className="border-b dark:border-gray-800">
              <th className="p-3">รหัส</th>
              <th className="p-3">ชื่อผู้ใช้งาน</th>
              <th className="p-3">อีเมล</th>
              <th className="p-3">วันที่ลงทะเบียน</th>
              <th className="p-3">จำนวนรายงาน</th>
              <th className="p-3">สถานะ</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-b last:border-b-0 dark:border-gray-800">
                <td className="p-3">{u.id}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.joined}</td>
                <td className="p-3">{u.reports}</td>
                <td className="p-3">{u.status}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2 justify-end whitespace-nowrap">
                    <button className="h-8 px-3 rounded border text-xs bg-white dark:bg-gray-900">ดู</button>
                    <button className="h-8 px-3 rounded border text-xs bg-white dark:bg-gray-900">ระงับ</button>
                    <button className="h-8 px-3 rounded border text-xs bg-white dark:bg-gray-900">ลบ</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
