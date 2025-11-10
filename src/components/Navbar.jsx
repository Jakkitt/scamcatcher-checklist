import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar(){
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <header className="bg-white border-b dark:bg-gray-900 dark:border-gray-800">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="font-extrabold text-xl">ScamCatcher</Link>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/search/detail" className={({isActive})=>isActive?'font-semibold':''}>ค้นหา</NavLink>
          <NavLink to="/report" className={({isActive})=>isActive?'font-semibold':''}>รายงาน</NavLink>
          {user?.role === 'admin' && (
            <NavLink to="/admin" className={({isActive})=>isActive?'font-semibold':''}>แอดมิน</NavLink>
          )}
          {!user ? (
            <>
              <NavLink to="/login" className="px-3 py-1.5 rounded-lg border dark:border-gray-700">เข้าสู่ระบบ</NavLink>
              <NavLink to="/register" className="px-3 py-1.5 rounded-lg bg-black text-white">สมัครสมาชิก</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={({isActive})=>isActive?'font-semibold':''}>โปรไฟล์</NavLink>
              <button onClick={handleLogout} className="px-3 py-1.5 rounded-lg border dark:border-gray-700">ออกจากระบบ</button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
