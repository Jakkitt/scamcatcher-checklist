import React, { useEffect, useState } from 'react';
import { listMyReports } from '../services/reports';

export default function ReportList() {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  useEffect(() => {
    let ok = true;
    (async () => {
      try {
        const data = await listMyReports();
        if (ok) setItems(data);
      } finally {
        if (ok) setLoading(false);
      }
    })();
    return () => { ok = false; };
  }, []);

  return (
    <main className="container py-12">
      <h1 className="text-2xl font-bold mb-6">รายงานของฉัน</h1>
      {loading ? (
        <div className="grid gap-3">{[...Array(4)].map((_,i)=><div key={i} className="h-20 skeleton" />)}</div>
      ) : items.length === 0 ? (
        <div className="text-center border rounded-xl p-10 bg-white dark:bg-gray-900">ยังไม่มีรายงาน</div>
      ) : (
        <div className="grid gap-3">
          {items.map(x => (
            <div key={x.id} className="bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-4 flex items-center justify-between">
              <div>
                <div className="font-semibold">{x.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {x.bank} • {x.account} • {new Date(x.createdAt).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
