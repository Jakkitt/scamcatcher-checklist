import React from 'react';

const rows = [
  { id:12345, name:'นายสมชาย ใจดี', category:'อีคอมเมิร์ซ', date:'2023-04-15', amount:15000, status:'รอตรวจสอบ' },
  { id:12346, name:'นางสาวสมหญิง รื่นรมย์', category:'รับหัวแพ็ก', date:'2023-04-10', amount:8500, status:'อนุมัติแล้ว' },
  { id:12347, name:'นายสมศักดิ์', category:'ลงทุนออนไลน์', date:'2023-04-05', amount:50000, status:'รอตรวจสอบ' },
  { id:12348, name:'นางสาวอนิจ', category:'บัตรคอนเสิร์ต', date:'2023-04-01', amount:12000, status:'อนุมัติแล้ว' },
];

function Badge({ status }){
  const map = {
    'รอตรวจสอบ':'bg-amber-100 text-amber-700',
    'อนุมัติแล้ว':'bg-green-100 text-green-700',
    'ปฏิเสธแล้ว':'bg-red-100 text-red-700',
  };
  return <span className={`px-2 py-0.5 rounded text-xs ${map[status]||'bg-gray-100 text-gray-700'}`}>{status}</span>;
}

export default function AdminReports(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">จัดการรายงานมิจฉาชีพ</h1>

      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left">
            <tr className="border-b dark:border-gray-800">
              <th className="p-3">รหัส</th>
              <th className="p-3">ชื่อมิจฉาชีพ</th>
              <th className="p-3">หมวดหมู่</th>
              <th className="p-3">วันที่รายงาน</th>
              <th className="p-3">จำนวนเงิน</th>
              <th className="p-3">สถานะ</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-b last:border-b-0 dark:border-gray-800">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.name}</td>
                <td className="p-3">{r.category}</td>
                <td className="p-3">{r.date}</td>
                <td className="p-3">{r.amount.toLocaleString()} บาท</td>
                <td className="p-3"><Badge status={r.status}/></td>
                <td className="p-3 space-x-2">
                  <button className="px-2 py-1 rounded border text-xs">ดู</button>
                  <button className="px-2 py-1 rounded border text-xs">อนุมัติ</button>
                  <button className="px-2 py-1 rounded border text-xs">ปฏิเสธ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
