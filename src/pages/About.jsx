import React from 'react';
export default function About(){
  return (
    <main className="container py-12 prose dark:prose-invert max-w-3xl">
      <h1>ศูนย์ช่วยเหลือ</h1>
      <p><strong>ScamCatcher</strong> โปรเจคเพื่อการศึกษาในการตรวจสอบ/รายงานมิจฉาชีพ</p>
      <h3>ติดต่อ</h3>
      <ul>
        <li>Email: support@scamcatcher.local</li>
        <li>Facebook: /scamcatcher</li>
      </ul>
      <h3>คำแนะนำการใช้งาน</h3>
      <ol>
        <li>ค้นหาผู้ต้องสงสัยจากเมนู “ค้นหา”</li>
        <li>หากพบเหตุการณ์จริง กด “รายงาน” และกรอกข้อมูลให้ครบ</li>
      </ol>
    </main>
  );
}
