import React, { useState } from "react";
import { Play } from "lucide-react";
import heroFooterImg from "@/assets/hero-footer.webp";
import prod1 from "@/assets/products/1.webp";
import prod2 from "@/assets/products/2.webp";
import prod3 from "@/assets/products/3.webp";
import prod4 from "@/assets/products/4.webp";
import prod5Jfif from "@/assets/products/5.jfif";
import { useTranslation } from "@/i18n/useTranslation";

interface VideoItem {
  id: number;
  title: string;
  desc: string;
  tag: string;
  duration: string;
  img: string;
}

export const VideoActionSection: React.FC = () => {
  const { t } = useTranslation();

  const videoList: VideoItem[] = [
    {
      id: 1,
      title: "EcoReve Water System — Automated Performance Test",
      desc: "Observe how our online COD analyzers and dosing pumps provide continuous real-time water quality monitoring and energy savings.",
      tag: "#Performance Test",
      duration: "12:48",
      img: heroFooterImg,
    },
    {
      id: 2,
      title: "Portable COD Testing Quick Field Guide",
      desc: "Step-by-step field operating procedures for rapid organic load detection in wastewater samples.",
      tag: "#Tutorial",
      duration: "08:24",
      img: prod1,
    },
    {
      id: 3,
      title: "Aeration Blowers: Energy Efficiency Benchmark",
      desc: "Power consumption analysis comparing high-speed centrifugal blowers against traditional roots blowers.",
      tag: "#System Comparison",
      duration: "10:15",
      img: prod3,
    },
    {
      id: 4,
      title: "Ceramic Membrane MBR Assembly & Cleaning",
      desc: "Complete walkthrough of ceramic membrane rack installation, anti-fouling backwash, and chemical flush.",
      tag: "#Installation",
      duration: "15:40",
      img: prod4,
    },
    {
      id: 5,
      title: "Online COD Analyzer 2-Point Calibration",
      desc: "Maintaining zero drift accuracy with automated 2-point reagent recalibration protocols.",
      tag: "#Maintenance",
      duration: "06:50",
      img: prod2,
    },
    {
      id: 6,
      title: "Zero Liquid Discharge (ZLD) Implementation",
      desc: "Field execution study on a 500m³/day chemical plant achieving zero liquid discharge compliance.",
      tag: "#Case Study",
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
        <div className="max-w-2xl text-left">
          <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-bold text-primary">
            {t.videos.badge}
          </span>
          <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-foreground">
            {t.videos.title}
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            Watch real-time performance tests and technical walkthroughs of EcoReve wastewater systems.
          </p>
        </div>

        {/* 2-Column Grid: Left Featured Main Player (Static on Mobile, Sticky on Desktop) + Right Interactive Playlist */}
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Column: Featured Main Video Player Card */}
          <div className="lg:col-span-6 static lg:sticky lg:top-24 self-start w-full">
            <div className="relative overflow-hidden rounded-2xl bg-black min-h-[300px] sm:min-h-[380px] md:min-h-[440px] flex flex-col justify-end border border-border/40 shadow-xl group transition-all">
              <img
                src={activeVideo.img}
                alt={activeVideo.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />

              <div className="relative z-10 p-5 sm:p-7 md:p-8 text-white text-left">
                <span className="inline-block rounded-full bg-[#008193]/80 backdrop-blur px-3 py-0.5 text-[10px] sm:text-xs font-extrabold text-white mb-2">
                  {activeVideo.tag}
                </span>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold leading-tight max-w-md">
                  {activeVideo.title}
                </h3>
                <p className="mt-2 sm:mt-3 max-w-sm text-xs leading-relaxed text-white/80 line-clamp-2">
                  {activeVideo.desc}
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
                Video Walkthrough Playlist
              </h4>
              <span className="text-[10px] sm:text-[11px] font-bold text-[#005883] dark:text-sky-400 shrink-0 whitespace-nowrap">
                {activeVideoIndex + 1} of {videoList.length}
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
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                    <span className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 rounded bg-black/80 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-white backdrop-blur">
                      {item.duration}
                    </span>
                  </div>
                  <div className="flex flex-col justify-center min-w-0 flex-1 overflow-hidden pr-0.5">
                    <span className="inline-block w-fit rounded-full bg-secondary px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-muted-foreground truncate">
                      {item.tag}
                    </span>
                    <h4 className={`mt-1 text-xs sm:text-sm font-bold leading-snug line-clamp-2 transition-colors ${
                      isActive ? "text-[#005883] dark:text-sky-400 font-extrabold" : "text-foreground"
                    }`}>
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {item.desc}
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
