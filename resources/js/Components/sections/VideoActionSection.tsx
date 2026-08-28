import React, { useState } from "react";
import { Play } from "lucide-react";
import heroFooterImg from "@/assets/hero-footer.webp";
import prod1 from "@/assets/products/1.webp";
import prod2 from "@/assets/products/2.webp";
import prod3 from "@/assets/products/3.webp";
import prod4 from "@/assets/products/4.webp";
import prod5Jfif from "@/assets/products/5.jfif";
import { useTranslation } from "@/i18n/useTranslation";
import { getTrans } from "@/utils/transHelper";

interface VideoItem {
  id: number;
  title: string;
  desc: string;
  tag: string;
  duration: string;
  img: string;
}

export const VideoActionSection: React.FC = () => {
  const { t, language } = useTranslation();
  const currentLang = language ? language.toLowerCase() : "id";

  const videoList: VideoItem[] = [
    {
      id: 1,
      title: JSON.stringify({
        en: "EcoReve Water System — Automated Performance Test",
        id: "Sistem Air EcoReve — Uji Kinerja Otomatis",
        ms: "Sistem Air EcoReve — Ujian Prestasi Automatik",
        th: "ระบบน้ำ EcoReve — การทดสอบประสิทธิภาพอัตโนมัติ",
        zh: "EcoReve 水处理系统 — 自动化性能测试"
      }),
      desc: JSON.stringify({
        en: "Observe how our online COD analyzers and dosing pumps provide continuous real-time water quality monitoring and energy savings.",
        id: "Amati bagaimana penganalisis COD online dan pompa dosis kami memberikan pemantauan kualitas air real-time dan penghematan energi.",
        ms: "Perhatikan bagaimana penganalisis COD dalam talian dan pam dos kami menyediakan pemantauan kualiti air masa nyata berterusan.",
        th: "สังเกตวิธีที่เครื่องวิเคราะห์ COD ออนไลน์และปั๊มตวงสารเคมีของเราให้บริการตรวจสอบคุณภาพน้ำแบบเรียลไทม์",
        zh: "观察我们的在线 COD 分析仪和加药泵如何提供连续的实时水质监测与显著的节能效果。"
      }),
      tag: JSON.stringify({
        en: "#Performance Test",
        id: "#Uji Kinerja",
        ms: "#Ujian Prestasi",
        th: "#การทดสอบประสิทธิภาพ",
        zh: "#性能测试"
      }),
      duration: "12:48",
      img: heroFooterImg,
    },
    {
      id: 2,
      title: JSON.stringify({
        en: "Portable COD Testing Quick Field Guide",
        id: "Panduan Lapangan Cepat Pengujian COD Portabel",
        ms: "Panduan Lapangan Cepat Ujian COD Portabel",
        th: "คู่มือภาคสนามอย่างเร็วสำหรับการทดสอบ COD แบบพกพา",
        zh: "便携式 COD 检测现场快速指南"
      }),
      desc: JSON.stringify({
        en: "Step-by-step field operating procedures for rapid organic load detection in wastewater samples.",
        id: "Prosedur operasi lapangan langkah-demi-langkah untuk deteksi beban organik cepat pada sampel air limbah.",
        ms: "Prosedur operasi lapangan langkah demi langkah untuk pengesanan beban organik pantas dalam sampel air sisa.",
        th: "ขั้นตอนการปฏิบัติงานภาคสนามสำหรับการตรวจจับภาระสารอินทรีย์อย่างรวดเร็วในตัวอย่างน้ำเสีย",
        zh: "用于废水样品中有机负荷快速检测的步步现场操作规程。"
      }),
      tag: JSON.stringify({
        en: "#Tutorial",
        id: "#Panduan",
        ms: "#Panduan",
        th: "#คู่มือ",
        zh: "#教程"
      }),
      duration: "08:24",
      img: prod1,
    },
    {
      id: 3,
      title: JSON.stringify({
        en: "Aeration Blowers: Energy Efficiency Benchmark",
        id: "Blower Aerasi: Tolok Ukur Efisiensi Energi",
        ms: "Blower Aerasi: Penanda Aras Kecekapan Tenaga",
        th: "เครื่องเป่าอากาศ Aeration: เกณฑ์มาตรฐานประสิทธิภาพพลังงาน",
        zh: "曝气鼓风机：能效基准对比"
      }),
      desc: JSON.stringify({
        en: "Power consumption analysis comparing high-speed centrifugal blowers against traditional roots blowers.",
        id: "Analisis konsumsi daya yang membandingkan blower sentrifugal kecepatan tinggi dengan blower roots tradisional.",
        ms: "Analisis penggunaan kuasa membandingkan blower sentrifugal kelajuan tinggi berbanding blower roots tradisional.",
        th: "การวิเคราะห์การใช้อุปกรณ์เปรียบเทียบเครื่องเป่าอากาศแบบแรงเหวี่ยงความเร็วสูงกับเครื่องเป่า roots",
        zh: "高速单级悬浮离心鼓风机与传统罗茨鼓风机功耗对比分析。"
      }),
      tag: JSON.stringify({
        en: "#System Comparison",
        id: "#Komparasi Sistem",
        ms: "#Perbandingan Sistem",
        th: "#การเปรียบเทียบระบบ",
        zh: "#系统对比"
      }),
      duration: "10:15",
      img: prod3,
    },
    {
      id: 4,
      title: JSON.stringify({
        en: "Ceramic Membrane MBR Assembly & Cleaning",
        id: "Pemasangan & Pembersihan MBR Membran Keramik",
        ms: "Pemasangan & Pembersihan MBR Membran Seramik",
        th: "การประกอบและทำความสะอาดเมมเบรนเซรามิก MBR",
        zh: "陶瓷膜 MBR 组装与清洗维护"
      }),
      desc: JSON.stringify({
        en: "Complete walkthrough of ceramic membrane rack installation, anti-fouling backwash, and chemical flush.",
        id: "Panduan lengkap instalasi rak membran keramik, pencucian balik anti-penyumbatan, dan pembilasan kimia.",
        ms: "Panduan lengkap pemasangan rak membran seramik, pencucian balik anti-kotoran dan pembilasan kimia.",
        th: "ขั้นตอนการติดตั้งชั้นวางเมมเบรนเซรามิก การล้างกลับป้องกัน anti-fouling และการล้างด้วยสารเคมี",
        zh: "陶瓷膜支架安装、抗污染反冲洗及化学清洗的全流程演示。"
      }),
      tag: JSON.stringify({
        en: "#Installation",
        id: "#Instalasi",
        ms: "#Pemasangan",
        th: "#การติดตั้ง",
        zh: "#安装"
      }),
      duration: "15:40",
      img: prod4,
    },
    {
      id: 5,
      title: JSON.stringify({
        en: "Online COD Analyzer 2-Point Calibration",
        id: "Kalibrasi 2-Titik Penganalisis COD Online",
        ms: "Kalibrasi 2-Titik Penganalisis COD Dalam Talian",
        th: "การปรับเทียบ 2 จุดสำหรับเครื่องวิเคราะห์ COD ออนไลน์",
        zh: "在线 COD 分析仪两点标定校准"
      }),
      desc: JSON.stringify({
        en: "Maintaining zero drift accuracy with automated 2-point reagent recalibration protocols.",
        id: "Menjaga akurasi bebas drift dengan protokol re-kalibrasi reagen 2-titik otomatis.",
        ms: "Mengekalkan ketepatan bebas hanyutan dengan protokol re-kalibrasi reagen 2-titik automatik.",
        th: "รักษาความแม่นยำด้วยโปรโตคอลการปรับเทียบสารเคมี 2 จุดอัตโนมัติ",
        zh: "通过自动两点试剂重校准协议保持无漂移的高精度。"
      }),
      tag: JSON.stringify({
        en: "#Maintenance",
        id: "#Pemeliharaan",
        ms: "#Penyelenggaraan",
        th: "#การบำรุงรักษา",
        zh: "#维护"
      }),
      duration: "06:50",
      img: prod2,
    },
    {
      id: 6,
      title: JSON.stringify({
        en: "Zero Liquid Discharge (ZLD) Implementation",
        id: "Implementasi Zero Liquid Discharge (ZLD)",
        ms: "Pelaksanaan Zero Liquid Discharge (ZLD)",
        th: "การใช้งานระบบ Zero Liquid Discharge (ZLD)",
        zh: "零液体排放（ZLD）系统实施案例"
      }),
      desc: JSON.stringify({
        en: "Field execution study on a 500m³/day chemical plant achieving zero liquid discharge compliance.",
        id: "Studi eksekusi lapangan pada pabrik kimia 500m³/hari yang mencapai kepatuhan zero liquid discharge.",
        ms: "Kajian pelaksanaan lapangan di loji kimia 500m³/hari yang mencapai pematuhan pelepasan cecair sifar.",
        th: "การศึกษาการทำงานภาคสนามในโรงงานเคมีขนาด 500 ลบ.ม./วัน ที่บรรลุมาตรฐาน ZLD",
        zh: "日处理量 500m³ 化工厂实现废水零液体排放合规的现场执行研究。"
      }),
      tag: JSON.stringify({
        en: "#Case Study",
        id: "#Studi Kasus",
        ms: "#Kajian Kes",
        th: "#กรณีศึกษา",
        zh: "#案例研究"
      }),
      duration: "07:12",
      img: prod5Jfif,
    },
  ];

  const [activeVideoIndex, setActiveVideoIndex] = useState<number>(0);
  const activeVideo = videoList[activeVideoIndex] ?? videoList[0];

  return (
    <section className="w-full bg-card border-y border-border py-10 sm:py-16 md:py-20" id="demonstration">
      <div className="mx-auto max-w-[1440px] px-3.5 sm:px-6 md:px-8 space-y-6 sm:space-y-8">
        {/* Full Width Section Header */}
        <div className="max-w-3xl text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-snug text-foreground">
            {t.videos.title}
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base leading-relaxed text-muted-foreground font-normal max-w-2xl">
            {getTrans(JSON.stringify({
              en: "Watch real-time performance tests and technical walkthroughs of EcoReve wastewater systems.",
              id: "Tonton uji kinerja real-time dan panduan teknis sistem air limbah EcoReve.",
              ms: "Tonton ujian prestasi masa nyata dan panduan teknikal sistem air sisa EcoReve.",
              th: "รับชมการทดสอบประสิทธิภาพแบบเรียลไทม์และคู่มือทางเทคนิคของระบบน้ำเสีย EcoReve",
              zh: "观看 EcoReve 工业废水处理系统的实时性能测试与技术演示视频。"
            }), currentLang)}
          </p>
        </div>

        {/* 2-Column Grid: Left Featured Main Player (Static on Mobile, Sticky on Desktop) + Right Interactive Playlist */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Column: Featured Main Video Player Card */}
          <div className="lg:col-span-6 static lg:sticky lg:top-24 self-start w-full">
            <div className="relative overflow-hidden rounded-2xl bg-black min-h-[300px] sm:min-h-[380px] md:min-h-[440px] flex flex-col justify-end border border-border/40 shadow-xl group transition-all">
              <img
                src={activeVideo.img}
                alt={getTrans(activeVideo.title, currentLang)}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

              <div className="relative z-10 p-5 sm:p-7 md:p-8 text-white text-left">
                <span className="inline-block rounded-full bg-[#008193]/80 backdrop-blur px-3 py-0.5 text-[10px] sm:text-xs font-extrabold text-white mb-2">
                  {getTrans(activeVideo.tag, currentLang)}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight max-w-md">
                  {getTrans(activeVideo.title, currentLang)}
                </h3>
                <p className="mt-2 sm:mt-3 max-w-sm text-xs leading-relaxed text-white/80 line-clamp-2">
                  {getTrans(activeVideo.desc, currentLang)}
                </p>
                <div className="mt-4 sm:mt-6 flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Play video"
                    className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-[#005883] text-white transition-transform hover:scale-110 shadow-lg cursor-pointer"
                  >
                    <Play className="h-5 w-5 fill-current ml-0.5" />
                  </button>
                  <div>
                    <span className="text-xs font-bold text-white block">{t.videos.watchDemo}</span>
                    <span className="text-[11px] text-white/70 font-medium">
                      Full HD Video • {activeVideo.duration}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Playlist (Strict padding & line-clamp limits for perfect proportions) */}
          <div className="lg:col-span-6 flex flex-col gap-3.5 w-full text-left overflow-hidden">
            <div className="flex items-center justify-between gap-2 pb-1 border-b border-border/40 w-full overflow-hidden">
              <h4 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-muted-foreground truncate">
                {getTrans(JSON.stringify({
                  en: "Video Walkthrough Playlist",
                  id: "Daftar Putar Panduan Video",
                  ms: "Senarai Main Panduan Video",
                  th: "เพลย์ลิสต์วิดีโอสาธิตการใช้งาน",
                  zh: "技术视频演示播放列表"
                }), currentLang)}
              </h4>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#005883] dark:text-sky-400 shrink-0 whitespace-nowrap">
                {activeVideoIndex + 1} {getTrans(JSON.stringify({ en: "of", id: "dari", ms: "daripada", th: "จาก", zh: "/" }), currentLang)} {videoList.length}
              </span>
            </div>

            {videoList.map((item, index) => {
              const isActive = activeVideoIndex === index;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveVideoIndex(index)}
                  className={`flex gap-3 sm:gap-4 items-center cursor-pointer p-3 sm:p-4 rounded-2xl transition-all border text-left overflow-hidden w-full ${
                    isActive
                      ? "bg-[#005883]/10 dark:bg-[#005883]/20 border-[#005883]/40 shadow-sm"
                      : "bg-white dark:bg-card border-border/40 hover:border-border/80 hover:bg-secondary/60"
                  }`}
                >
                  <div className="relative shrink-0 overflow-hidden rounded-xl sm:rounded-2xl w-24 sm:w-36 h-18 sm:h-24 bg-muted">
                    <img
                      src={item.img}
                      alt={getTrans(item.title, currentLang)}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-white backdrop-blur">
                      {item.duration}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1 overflow-hidden pr-0.5">
                    <span className="inline-block w-fit rounded-full bg-secondary px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-muted-foreground truncate">
                      {getTrans(item.tag, currentLang)}
                    </span>
                    <h4 className={`mt-1 text-xs sm:text-sm font-bold leading-snug line-clamp-2 transition-colors ${
                      isActive ? "text-[#005883] dark:text-sky-400 font-extrabold" : "text-foreground"
                    }`}>
                      {getTrans(item.title, currentLang)}
                    </h4>
                    <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {getTrans(item.desc, currentLang)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
