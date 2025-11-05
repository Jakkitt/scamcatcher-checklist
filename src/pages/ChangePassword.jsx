import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

const schema = z.object({
  oldPassword: z.string().min(6, 'อย่างน้อย 6 ตัวอักษร'),
  password: z.string().min(6, 'อย่างน้อย 6 ตัวอักษร'),
  confirmPassword: z.string().min(6, 'ยืนยันรหัสผ่าน'),
}).refine(d => d.password === d.confirmPassword, { message: 'รหัสผ่านไม่ตรงกัน', path: ['confirmPassword'] });

export default function ChangePassword(){
  const { register, handleSubmit, formState:{ errors, isSubmitting } } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async ()=>{ await new Promise(r=>setTimeout(r,600)); toast.success('เปลี่ยนรหัสผ่านเรียบร้อย (mock)'); };

  return (
    <main className="container py-12">
      <h1 className="text-2xl font-bold mb-6">เปลี่ยนรหัสผ่าน</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md border rounded-xl p-6 bg-white dark:bg-gray-900">
        <div className="mb-3"><input type="password" placeholder="รหัสผ่านเดิม" {...register('oldPassword')} />{errors.oldPassword && <p className="text-red-600 text-sm mt-1">{errors.oldPassword.message}</p>}</div>
        <div className="mb-3"><input type="password" placeholder="รหัสผ่านใหม่" {...register('password')} />{errors.password && <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>}</div>
        <div className="mb-4"><input type="password" placeholder="ยืนยันรหัสผ่านใหม่" {...register('confirmPassword')} />{errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword.message}</p>}</div>
        <button disabled={isSubmitting} className="w-full px-4 py-2 rounded-xl bg-black text-white disabled:opacity-60">{isSubmitting ? 'กำลังบันทึก…' : 'บันทึก'}</button>
      </form>
    </main>
  );
}
