import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { problems } from "@/data/problemsData";
import { useTranslation } from "@/i18n/useTranslation";
import { getTrans } from "@/utils/transHelper";
import problemBgImg from "@/assets/problem-bg.png";

export const ProblemSection: React.FC = () => {
  const { t, language } = useTranslation();
  const currentLang = language ? language.toLowerCase() : "id";
  const [activeProblem, setActiveProblem] = useState<number>(1);

  const localizedProblems = [
    {
      n: "01",
      t: JSON.stringify({
        en: "Complex Wastewater Regulations & Strict Emission Standards",
        id: "Regulasi Air Limbah Rumit & Standar Emisi Ketat",
        ms: "Peraturan Air Sisa Yang Rumit & Piawaian Pelepasan Ketat",
        th: "ข้อกำหนดกฎหมายน้ำเสียที่ซับซ้อนและมาตรฐานการปล่อยที่เข้มงวด",
        zh: "复杂的废水排放法规与严格的环保合规标准"
      }),
      desc: JSON.stringify({
        en: "Navigating local zero-discharge rules and discharge compliance without expert guidance is overwhelming.",
        id: "Menavigasi aturan zero-discharge lokal dan kepatuhan pembuangan tanpa panduan ahli sangat menyulitkan.",
        ms: "Menavigasi peraturan pelepasan sifar tempatan dan pematuhan pelepasan tanpa panduan pakar adalah sukar.",
        th: "การทำความเข้าใจกฎระเบียบการปล่อยน้ำเสียเป็นศูนย์ (ZLD) โดยไม่มีผู้เชี่ยวชาญให้คำแนะนำเป็นเรื่องที่ท้าทาย",
        zh: "在缺乏专业技术指导的情况下，满足地方零液体排放（ZLD）与排放合规要求极为困难。"
      }),
    },
    {
      n: "02",
      t: JSON.stringify({
        en: "High Operating Costs & Intensive Labor Expenses",
        id: "Biaya Operasional Tinggi & Pengeluaran Tenaga Kerja Intensif",
        ms: "Kos Operasi Tinggi & Perbelanjaan Tenaga Kerja Intensif",
        th: "ค่าใช้จ่ายในการดำเนินงานสูงและค่าแรงคนงานสูง",
        zh: "高昂的运行成本与高强度的人力维护开支"
      }),
      desc: JSON.stringify({
        en: "Unautomated systems waste chemical dosing, increase energy consumption, and require heavy manual labor.",
        id: "Sistem tanpa otomasi membuang bahan kimia, meningkatkan konsumsi energi, dan membutuhkan tenaga kerja manual berlebih.",
        ms: "Sistem tanpa automasi membazirkan dos kimia, meningkatkan penggunaan tenaga dan memerlukan tenaga kerja manual.",
        th: "ระบบที่ไม่มีระบบอัตโนมัติสิ้นเปลืองสารเคมี เพิ่มการใช้พลังงาน และต้องใช้แรงงานคนจำนวนมาก",
        zh: "未实现自动化的传统水处理系统存在药剂浪费、能耗高昂及人工依赖度大等问题。"
      }),
    },
    {
      n: "03",
      t: JSON.stringify({
        en: "Uncertainty in Choosing Equipment & Chemical Resins",
        id: "Ketidakpastian Dalam Memilih Peralatan & Resin Kimia",
        ms: "Ketidakpastian Dalam Memilih Peralatan & Resin Kimia",
        th: "ความไม่แน่นอนในการเลือกอุปกรณ์และเรซินสารเคมี",
        zh: "关键设备选型与离子交换树脂匹配的不确定性"
      }),
      desc: JSON.stringify({
        en: "Selecting improper aeration blowers, membranes, or ion exchange resins risks frequent process failures.",
        id: "Memilih blower aerasi, membran, atau resin penukar ion yang tidak tepat berisiko menyebabkan kegagalan proses.",
        ms: "Memilih blower aerasi, membran, atau resin penukar ion yang tidak tepat berisiko menyebabkan kegagalan proses.",
        th: "การเลือกเครื่องเป่าอากาศ เมมเบรน หรือเรซินที่ไม่เหมาะสมมีความเสี่ยงที่จะเกิดความผิดพลาดในระบบ",
        zh: "选用不匹配的曝气鼓风机、膜元件或离子交换树脂极易引发频繁的工艺故障。"
      }),
    },
    {
      n: "04",
      t: JSON.stringify({
        en: "Concerns Over Equipment Maintenance & Spare Parts Supply",
        id: "Kekhawatiran Terhadap Pemeliharaan & Pasokan Suku Cadang",
        ms: "Kebimbangan Terhadap Penyelenggaraan & Bekalan Suku Cadang",
        th: "ความกังวลเกี่ยวกับการบำรุงรักษาและการจัดหาอะไหล่",
        zh: "设备后期运维困难与原厂备品备件供应脱节"
      }),
      desc: JSON.stringify({
        en: "Lack of long-term lifecycle support leads to unexpected downtime and costly emergency repairs.",
        id: "Kurangnya dukungan siklus hidup jangka panjang menyebabkan downtime tak terduga dan perbaikan darurat mahal.",
        ms: "Kekurangan sokongan kitar hayat jangka panjang membawa kepada masa henti yang tidak dijangka dan pembaikan mahal.",
        th: "การขาดการสนับสนุนวงจรชีวิตระยะยาวนำไปสู่การหยุดทำงานที่ไม่คาดคิดและการซ่อมแซมที่มีราคาแพง",
        zh: "缺乏长期的全生命周期技术支持会导致意料之外的停机与昂贵的紧急维修费用。"
      }),
    },
  ];

  return (
    <section className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-8 md:py-10">
      <div className="rounded-3xl bg-[#1a2328] text-white p-6 sm:p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
        {/* Top-Right Background Image */}
        <div className="absolute top-0 right-0 w-full sm:w-[55%] lg:w-[48%] h-[240px] md:h-[280px] pointer-events-none z-0 overflow-hidden rounded-tr-3xl">
          <img
            src={problemBgImg}
            alt="Industrial Water Treatment Equipment Background"
            className="w-full h-full object-cover object-right-top opacity-50 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#1a2328]/70 to-[#1a2328]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2328] via-[#1a2328]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1a2328]/40 via-transparent to-[#1a2328]" />
        </div>

        {/* Header Content Row */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight max-w-xl leading-snug text-white drop-shadow-sm">
              {t.problems.title}
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base leading-relaxed text-white/80 font-normal">
            {t.problems.subtitle}
          </p>
        </div>

        {/* 4 Cards Grid with Staggered Delays */}
        <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {localizedProblems.map((prob, idx) => {
            const isActive = activeProblem === idx + 1;
            const delayClass = `animate-delay-${(idx + 4) * 100}`;
            return (
              <div
                key={prob.n}
                onClick={() => setActiveProblem(idx + 1)}
                className={`animate-element ${delayClass} group cursor-pointer rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between min-h-[220px] ${
                  isActive
                    ? "bg-[#005883] text-white shadow-xl ring-1 ring-white/30"
                    : "bg-white/5 backdrop-blur-md hover:bg-white/10 text-white/80 border border-white/10"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl sm:text-4xl font-mono font-extrabold tracking-wider text-white">
                    {prob.n}
                  </span>
                  <span className={`flex h-9 w-9 items-center justify-center rounded-full transition-all ${
                    isActive ? "bg-white text-[#005883] shadow-md" : "bg-white/10 text-white group-hover:bg-white/20"
                  }`}>
                    <ArrowUpRight className={`h-4.5 w-4.5 transition-transform duration-300 ${
                      isActive ? "rotate-45" : "group-hover:rotate-45"
                    }`} />
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-snug">
                    {getTrans(prob.t, currentLang)}
                  </h3>
                  <p className={`mt-2 text-xs leading-relaxed line-clamp-3 ${isActive ? "text-white/90" : "text-white/60"}`}>
                    {getTrans(prob.desc, currentLang)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
