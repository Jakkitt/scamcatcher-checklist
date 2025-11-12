import React from 'react';
import { useNavigate } from 'react-router-dom';
import { adminListReports } from '../services/reports';

export default function AdminDashboard(){
  const nav = useNavigate();
  const [stats, setStats] = React.useState({ pending: 0, approved: 0, rejected: 0, total: 0 });
  const [latest, setLatest] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try{
        const list = await adminListReports();
        if (!alive) return;
        const pending = list.filter(x => x.status === 'pending').length;
        const approved = list.filter(x => x.status === 'approved').length;
        const rejected = list.filter(x => x.status === 'rejected').length;
        const total = list.length;
        setStats({ pending, approved, rejected, total });
        setLatest(list.slice(0,5));
      } finally { setLoading(false); }
    })();
    return () => { alive = false };
  }, []);

  const tiles = [
    { k: 'รายงานที่รอตรวจสอบ', v: stats.pending },
    { k: 'รายงานที่อนุมัติแล้ว', v: stats.approved },
    { k: 'รายงานที่ปฏิเสธ', v: stats.rejected },
    { k: 'รายงานทั้งหมด', v: stats.total },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold">แดชบอร์ดผู้ดูแลระบบ</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tiles.map((c)=>(
          <div key={c.k} className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
            <div className="text-3xl font-extrabold">{(c.v||0).toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{c.k}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
          <h2 className="font-bold mb-3">การแจ้งเตือน</h2>
          {loading ? (
            <div className="text-sm text-gray-500">กำลังโหลด…</div>
          ) : (
          <ul className="divide-y dark:divide-gray-800">
            {(latest||[]).filter(x=>x.status==='pending').slice(0,3).map((r)=> (
              <li key={r.id} className="py-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{r.name || 'ไม่ระบุชื่อ'}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">หมวดหมู่: {r.category || '-'} • {new Date(r.createdAt).toLocaleString()}</div>
                </div>
                <button onClick={()=>nav('/admin/reports')} className="px-3 py-1.5 rounded-lg border text-sm">ตรวจสอบ</button>
              </li>
            ))}
            {latest.filter(x=>x.status==='pending').length === 0 && (
              <li className="py-3 text-sm text-gray-500">ไม่มีรายการที่รอตรวจสอบ</li>
            )}
          </ul>) }
        </div>

        <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 p-4">
          <h2 className="font-bold mb-3">กิจกรรมล่าสุด</h2>
          {loading ? (
            <div className="text-sm text-gray-500">กำลังโหลด…</div>
          ) : (
          <ul className="space-y-2 text-sm">
            {(latest||[]).map((r)=> (
              <li key={r.id} className="flex items-center justify-between">
                <span>{r.status==='approved'?'อนุมัติ':'รอตรวจสอบ/ปฏิเสธ'} รายงาน #{r.id}</span>
                <span className="text-gray-500 dark:text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>) }
        </div>
      </div>
    </div>
  );
}
