import React from 'react';
import { listUsers, suspendUser, unsuspendUser, deleteUser } from '../services/admin';
import { useAuth } from '../contexts/AuthContext';

export default function AdminUsers(){
  const { user: me } = useAuth();
  const [rows, setRows] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [acting, setActing] = React.useState('');

  React.useEffect(()=>{
    let alive = true;
    (async ()=>{
      const data = await listUsers();
      if (!alive) return; setRows(data); setLoading(false);
    })();
    return ()=>{ alive=false };
  },[]);

  const onSuspend = async (id, flag)=>{
    setActing(id+String(flag));
    try{
      if (flag) await suspendUser(id); else await unsuspendUser(id);
      setRows(prev => prev.map(x => x.id===id ? { ...x, suspended: flag } : x));
    }finally{ setActing(''); }
  };
  const onDelete = async (id)=>{
    if (!confirm('ยืนยันลบผู้ใช้และรายงานทั้งหมดของผู้ใช้นี้?')) return;
    setActing('del'+id);
    try{ await deleteUser(id); setRows(prev => prev.filter(x => x.id!==id)); }finally{ setActing(''); }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">จัดการผู้ใช้งาน</h1>
      <div className="rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 overflow-x-auto">
        {loading ? (
          <div className="p-6 text-sm text-gray-500">กำลังโหลด…</div>
        ) : (
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
            {(rows||[]).map(u => (
              <tr key={u.id} className="border-b last:border-b-0 dark:border-gray-800">
                <td className="p-3 break-all">{u.id}</td>
                <td className="p-3">{u.username || '-'}</td>
                <td className="p-3 break-all">{u.email}</td>
                <td className="p-3">{new Date(u.joinedAt).toLocaleDateString()}</td>
                <td className="p-3">{u.reports}</td>
                <td className="p-3">{u.suspended ? 'ระงับการใช้งาน' : (u.role==='admin' ? 'แอดมิน' : 'ใช้งานอยู่')}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2 justify-end whitespace-nowrap">
                    {u.role !== 'admin' && (
                    <button
                      onClick={()=>onSuspend(u.id, true)}
                      disabled={u.suspended || acting===u.id+'true' || me?.id===u.id}
                      className="h-8 px-3 rounded border text-xs bg-white dark:bg-gray-900 disabled:opacity-50"
                      title={me?.id===u.id ? 'ห้ามระงับบัญชีของตนเอง' : ''}
                    >ระงับ</button>)}
                    {u.role !== 'admin' && (
                    <button
                      onClick={()=>onSuspend(u.id, false)}
                      disabled={!u.suspended || acting===u.id+'false' || me?.id===u.id}
                      className="h-8 px-3 rounded border text-xs bg-white dark:bg-gray-900 disabled:opacity-50"
                      title={me?.id===u.id ? 'ห้ามปลดระงับ/จัดการตนเอง' : ''}
                    >ปลดระงับ</button>)}
                    <button onClick={()=>onDelete(u.id)} disabled={acting==='del'+u.id || u.role==='admin' || me?.id===u.id} className="h-8 px-3 rounded border text-xs bg-white dark:bg-gray-900 disabled:opacity-50" title={u.role==='admin' ? 'ห้ามลบผู้ดูแลระบบ' : (me?.id===u.id ? 'ห้ามลบตนเอง' : '')}>ลบ</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>) }
      </div>
    </div>
  );
}
