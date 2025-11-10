import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function Item({ to, children }){
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg text-sm ${isActive ? 'bg-gray-100 dark:bg-gray-800 font-semibold' : 'text-gray-700 dark:text-gray-300'}`
      }
    >
      {children}
    </NavLink>
  );
}

export default function AdminLayout(){
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <div className="container py-6 grid lg:grid-cols-12 gap-6">
        <aside className="lg:col-span-3">
          <div className="sticky top-6 space-y-2 border rounded-xl p-4 bg-white dark:bg-gray-900 dark:border-gray-800">
            <div className="text-lg font-bold mb-2">แอดมิน</div>
            <Item to="/admin">แดชบอร์ด</Item>
            <Item to="/admin/reports">รายงานมิจฉาชีพ</Item>
            <Item to="/admin/users">จัดการผู้ใช้งาน</Item>
          </div>
        </aside>
        <section className="lg:col-span-9">
          <Outlet />
        </section>
      </div>
    </div>
  );
}

