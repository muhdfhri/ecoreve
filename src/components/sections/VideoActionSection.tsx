import React from "react";
import { Play } from "lucide-react";
import heroFooterImg from "@/assets/hero-footer.webp";
import prod1 from "@/assets/products/1.webp";
import prod2 from "@/assets/products/2.webp";
import prod3 from "@/assets/products/3.webp";
import prod4 from "@/assets/products/4.webp";
import prod5Jfif from "@/assets/products/5.jfif";
import { useTranslation } from "@/i18n/useTranslation";

export const VideoActionSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="mx-auto max-w-7xl px-5 py-12" id="demonstration">
      <div className="rounded-[2.5rem] bg-card p-8 md:p-12 border border-border shadow-md">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block rounded-full bg-secondary px-3.5 py-1 text-xs font-bold text-primary">
              {t.videos.badge}
            </span>
            <h2 className="mt-2 text-2xl md:text-3xl font-extrabold tracking-tight">
              {t.videos.title}
            </h2>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Main Video Demonstration Feature Container */}
          <div className="relative overflow-hidden rounded-3xl bg-black min-h-[380px] md:min-h-[460px] flex flex-col justify-end lg:col-span-7 border border-border/40 shadow-xl group">
            <img
              src={heroFooterImg}
              alt="EcoReve Automated Wastewater Treatment System Demo"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="relative z-10 p-8 text-white">
              <h3 className="text-2xl md:text-3xl font-extrabold leading-tight max-w-md">
                EcoReve Water System —<br />Automated Performance Test
              </h3>
              <p className="mt-3 max-w-sm text-xs leading-relaxed text-white/70">
                Observe how our online COD analyzers and dosing pumps provide continuous real-time water quality monitoring and energy savings.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-[#008193] text-white transition-transform hover:scale-105 shadow-md">
                  <Play className="h-4 w-4 fill-current ml-0.5" />
                </button>
                <span className="text-xs font-semibold text-white/90">{t.videos.watchDemo}</span>
                <span className="text-xs text-white/40">|</span>
                <span className="text-xs text-white/60">12:48</span>
              </div>
            </div>
          </div>

          {/* Video List Sidebar with Active Vertical Scrollbar */}
          <div className="flex flex-col justify-between overflow-hidden relative lg:col-span-5">
            <div className="flex flex-col gap-3.5 pr-2 overflow-y-auto max-h-[480px] custom-scrollbar scroll-smooth">
              {/* Item 1 */}
              <div className="flex gap-4 items-center group cursor-pointer p-2.5 rounded-2xl transition-colors hover:bg-secondary/70 border border-transparent hover:border-border/60">
                <div className="relative shrink-0 overflow-hidden rounded-2xl w-32 h-20 bg-muted">
                  <img src={prod1} alt="Portable COD Meter Tutorial" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                    08:24
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="inline-block w-fit rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                    #Tutorial
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    Portable COD Testing<br />Quick Field Guide
                  </h4>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-4 items-center group cursor-pointer p-2.5 rounded-2xl transition-colors hover:bg-secondary/70 border border-transparent hover:border-border/60">
                <div className="relative shrink-0 overflow-hidden rounded-2xl w-32 h-20 bg-muted">
                  <img src={prod3} alt="Centrifugal Blower Aeration" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                    10:15
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="inline-block w-fit rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                    #System Comparison
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    Aeration Blowers:<br />Energy Efficiency Test
                  </h4>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-4 items-center group cursor-pointer p-2.5 rounded-2xl transition-colors hover:bg-secondary/70 border border-transparent hover:border-border/60">
                <div className="relative shrink-0 overflow-hidden rounded-2xl w-32 h-20 bg-muted">
                  <img src={prod4} alt="Ceramic Membrane Bioreactor" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                    15:40
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="inline-block w-fit rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                    #Installation
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    Ceramic Membrane MBR<br />System Assembly Setup
                  </h4>
                </div>
              </div>

              {/* Item 4 */}
              <div className="flex gap-4 items-center group cursor-pointer p-2.5 rounded-2xl transition-colors hover:bg-secondary/70 border border-transparent hover:border-border/60">
                <div className="relative shrink-0 overflow-hidden rounded-2xl w-32 h-20 bg-muted">
                  <img src={prod2} alt="Online COD Analyzer Calibration" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                    06:50
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="inline-block w-fit rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                    #Maintenance
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    Online COD Analyzer<br />Calibration Steps
                  </h4>
                </div>
              </div>

              {/* Item 5 */}
              <div className="flex gap-4 items-center group cursor-pointer p-2.5 rounded-2xl transition-colors hover:bg-secondary/70 border border-transparent hover:border-border/60">
                <div className="relative shrink-0 overflow-hidden rounded-2xl w-32 h-20 bg-muted">
                  <img src={prod5Jfif} alt="Specialist Consultation" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur">
                    07:12
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="inline-block w-fit rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold text-muted-foreground">
                    #Case Study
                  </span>
                  <h4 className="mt-1.5 text-xs font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
                    Zero Liquid Discharge<br />Industrial Implementation
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
