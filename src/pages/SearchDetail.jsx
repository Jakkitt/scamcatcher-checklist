// src/pages/SearchDetail.jsx
import React from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BANKS, TRANSFER_CHANNELS } from "../constants/banks";
import { formatAccountNumber, sanitizeText } from "../utils/format";

const schema = z.object({
  name: z.string().optional(),
  account: z.string().optional(),
  bank: z.string().optional(),
  channel: z.string().optional(),
  channelOther: z.string().optional(),
});

export default function SearchDetail() {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch, formState: { isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: "", account: "", bank: "", channel: "", channelOther: "" },
  });
  const channelValue = watch('channel');
  const [errorMsg, setErrorMsg] = React.useState('');
  const bankValue = watch('bank');

  const onAccountChange = (e) => {
    setValue("account", formatAccountNumber(e.target.value), { shouldDirty: true });
  };

  const onSubmit = async (raw) => {
    const params = {
      name: sanitizeText(raw.name || ""),
      account: sanitizeText(raw.account || ""),
      bank: raw.bank || "",
      channel: raw.channel === 'OTHER' ? sanitizeText(raw.channelOther || '') : (raw.channel || ''),
    };
    const hasAny = Boolean(params.name || params.account || params.bank || params.channel);
    if (!hasAny) {
      setErrorMsg('กรุณากรอกอย่างน้อย 1 ช่องเพื่อค้นหา');
      return;
    }
    setErrorMsg('');
    navigate({
      pathname: "/search/results",
      search: `?${createSearchParams(params)}`,
    });
  };

  return (
    <div className="relative overflow-hidden bg-gray-50 dark:bg-gradient-to-br dark:from-gray-950 dark:via-slate-950 dark:to-black">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <div className="absolute w-96 h-96 bg-cyan-400/30 rounded-full blur-3xl animate-pulse" style={{ left: '10%', top: '20%' }} />
        <div className="absolute w-96 h-96 bg-blue-400/25 rounded-full blur-3xl animate-pulse" style={{ right: '10%', bottom: '20%', animationDelay: '1s' }} />
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <main className="container relative z-10 py-10">
        <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">ค้นหามิจฉาชีพ</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6 rounded-2xl p-6 bg-white border border-gray-200 shadow-xl text-gray-900 dark:bg-[#061427]/90 dark:border-cyan-400/40 dark:text-white dark:shadow-[0_25px_80px_rgba(6,182,212,0.25)]"
        >
          <div className="md:col-span-2 h-5 -mt-2 text-center text-sm">
            <span className={errorMsg ? 'text-red-500' : 'opacity-0'}>{errorMsg || 'placeholder'}</span>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-gray-600 dark:text-cyan-300">ชื่อ–นามสกุล</label>
            <input
              {...register("name")}
              placeholder="เช่น นายสมชาย ใจดี"
              className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-300"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 text-gray-600 dark:text-cyan-300">ธนาคาร</label>
            <select
              {...register("bank")}
              className="appearance-none w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:focus:border-cyan-300"
            >
              <option value="">— เลือกธนาคาร —</option>
              {BANKS.map((b) => (
                <option key={b.value} value={b.value}>{b.label}</option>
              ))}
            </select>
          </div>

          {bankValue && (
            <div>
              <label className="block text-sm mb-1 text-gray-600 dark:text-cyan-300">เลขบัญชี</label>
              <input
                {...register("account")}
                onChange={onAccountChange}
                placeholder="เช่น 123-4-56789-0"
                className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-300"
              />
            </div>
          )}

          <div className="md:col-span-2">
            <label className="block text-sm mb-1 text-gray-600 dark:text-cyan-300">ช่องทาง</label>
            <div className="grid md:grid-cols-2 gap-3">
              <select
                {...register("channel")}
                className="appearance-none w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:focus:border-cyan-300"
              >
                <option value="">— เลือกช่องทาง —</option>
                {TRANSFER_CHANNELS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
                <option value="OTHER">อื่น ๆ / ระบุเอง</option>
              </select>
              {channelValue === 'OTHER' && (
                <input
                  {...register("channelOther")}
                  placeholder="ระบุช่องทาง (ถ้าเลือก อื่น ๆ)"
                  className="w-full h-12 px-4 rounded-xl bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all dark:bg-[#0f1f34] dark:border-cyan-400/40 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-300"
                />
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <button
              disabled={isSubmitting}
              className="w-full h-12 rounded-xl bg-black text-white font-semibold shadow-lg shadow-black/20 hover:bg-gray-900 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed dark:bg-gradient-to-r dark:from-cyan-400 dark:via-sky-500 dark:to-blue-500 dark:shadow-cyan-500/30 dark:hover:shadow-cyan-500/50 dark:hover:from-cyan-300 dark:hover:via-sky-400 dark:hover:to-blue-400"
            >
              {isSubmitting ? "กำลังค้นหา…" : "ค้นหาข้อมูลมิจฉาชีพ"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}








