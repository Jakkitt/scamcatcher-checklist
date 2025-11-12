import React from 'react';
import { adminListReports, approveReport, rejectReport, purgeOrphans, countOrphans } from '../services/reports';

function Badge({ status }){
  const map = {
    'รอตรวจสอบ':'bg-amber-100 text-amber-700',
    'อนุมัติแล้ว':'bg-green-100 text-green-700',
    'ปฏิเสธแล้ว':'bg-red-100 text-red-700',
  };
  return <span className={`px-2 py-0.5 rounded text-xs ${map[status]||'bg-gray-100 text-gray-700'}`}>{status}</span>;
}

export default function AdminReports(){
  const [rows, setRows] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [purgeState, setPurgeState] = React.useState(null);

  React.useEffect(() => {
    let alive = true;
    (async () => {
      const list = await adminListReports();
      if (!alive) return;
      setRows(list);
      setLoading(false);
      try { setPurgeState(await countOrphans()); } catch {}
    })();
    return () => { alive = false };
  }, []);

  const onApprove = async (id)=>{
    const updated = await approveReport(id);
    setRows(prev => prev.map(x => x.id === id ? updated : x));
  };
  const onReject = async (id)=>{
    const updated = await rejectReport(id);
    setRows(prev => prev.map(x => x.id === id ? updated : x));
  };
  const onPurge = async ()=>{
    await purgeOrphans();
    const list = await adminListReports();
    setRows(list);
    try { setPurgeState(await countOrphans()); } catch {}
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-extrabold">จัดการรายงานมิจฉาชีพ</h1>
        <div className="text-sm">
          <button onClick={onPurge} className="px-3 py-1 rounded-lg border">
            ล้างรายงานกำพร้า {purgeState?.count ? `(${purgeState.count})` : ''}
          </button>
        </div>
      </div>

      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
        {loading ? (
          <div className="p-6 text-sm text-gray-500">กำลังโหลด…</div>
        ) : (
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
            {(rows||[]).map(r => (
              <tr key={r.id} className="border-b last:border-b-0 dark:border-gray-800">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.name || '-'}</td>
                <td className="p-3">{r.category || '-'}</td>
                <td className="p-3">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="p-3">{Number(r.amount||0).toLocaleString()} บาท</td>
                <td className="p-3"><Badge status={r.status==='approved'?'อนุมัติแล้ว':(r.status==='rejected'?'ปฏิเสธแล้ว':'รอตรวจสอบ')}/></td>
                <td className="p-3 space-x-2">
                  <button onClick={()=>onApprove(r.id)} className="px-2 py-1 rounded border text-xs">อนุมัติ</button>
                  <button onClick={()=>onReject(r.id)} className="px-2 py-1 rounded border text-xs">ปฏิเสธ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>) }
      </div>
    </div>
  );
}
