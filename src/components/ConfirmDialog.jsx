import React from 'react';

export default function ConfirmDialog({ open, title='ยืนยัน', message='ต้องการทำรายการนี้ใช่ไหม?', onConfirm, onCancel }){
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg dark:bg-gray-900">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-3 py-1.5 rounded-lg border">ยกเลิก</button>
          <button onClick={onConfirm} className="px-3 py-1.5 rounded-lg bg-black text-white">ยืนยัน</button>
        </div>
      </div>
    </div>
  );
}
