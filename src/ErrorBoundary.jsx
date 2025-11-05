import React from 'react';
import toast from 'react-hot-toast';

export default class ErrorBoundary extends React.Component{
  constructor(props){ super(props); this.state = { hasError:false, error:null }; }
  static getDerivedStateFromError(error){ return { hasError:true, error }; }
  componentDidCatch(error){ console.error(error); toast.error(error?.message || 'เกิดข้อผิดพลาด'); }
  render(){
    if (this.state.hasError){
      return <div className="container py-20 text-center">เกิดข้อผิดพลาดในการแสดงผล ลองรีเฟรชหน้าอีกครั้ง</div>;
    }
    return this.props.children;
  }
}
