import React from "react";
import logoImg from "@/assets/logo.png";
import { useTranslation } from "@/i18n/useTranslation";
import { getTrans } from "@/utils/transHelper";
import { usePage } from "@inertiajs/react";

interface OfficeItem {
  id?: number | string;
  badge?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  footer_desc_1?: string;
  footer_desc_2?: string;
}

interface FooterProps {
  offices?: OfficeItem[];
  onNavigate?: (pageName: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ offices: propOffices, onNavigate }) => {
  const { t, currentLanguage } = useTranslation();
  const pageProps = usePage<{ offices?: OfficeItem[] }>().props;

  // Resolved Offices Array from props or Inertia page share
  const rawOffices = propOffices && propOffices.length > 0 ? propOffices : pageProps.offices;

  // Fallback office cards matching reference layout
  const fallbackOffices: OfficeItem[] = [
    {
      id: 1,
      badge: t.footer.chinaOfficeTitle || "China Office",
      name: t.footer.chinaOfficeName || "Qingdao EcoReve Environmental Technology Co., LTD",
      address: t.footer.chinaOfficeAddress || "No. 117 Wannian Quan Road, Licang District, Qingdao City, Shandong Province, China",
      phone: "+86 (0532) 8000-8888",
      email: "info@ecoreve.com",
    },
    {
      id: 2,
      badge: t.footer.malaysiaOfficeTitle || "Malaysia Office",
      name: t.footer.malaysiaOfficeName || "EcoReve Environmental Sdn. Bhd.",
      address: t.footer.malaysiaOfficeAddress || "No. 15 Jalan Industrial 3, Taman Sains, 47100 Puchong, Selangor, Malaysia",
      phone: "+60 3-8000 9999",
      email: "malaysia@ecoreve.com",
    },
  ];

  const actualOffices: OfficeItem[] = rawOffices && rawOffices.length > 0 ? rawOffices : fallbackOffices;

  // Find primary office that has footer commitment description text
  const primaryDescOffice = actualOffices.find(o => o.footer_desc_1 && String(o.footer_desc_1).trim().length > 0);

  const commitmentParagraph1 = primaryDescOffice?.footer_desc_1 ? getTrans(primaryDescOffice.footer_desc_1, currentLanguage) : t.footer.commitmentText;
  const commitmentParagraph2 = primaryDescOffice?.footer_desc_2 ? getTrans(primaryDescOffice.footer_desc_2, currentLanguage) : t.footer.marketText;

  return (
    <footer className="w-full bg-[#1a2328] text-white border-none mt-0 shadow-2xl">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8 py-10 md:py-14">
        {/* Top Grid: Mission Statement & Company Offices */}
        <div className="grid gap-12 lg:grid-cols-12">
          
          {/* Left Column: EcoReve Mission & Environmental Commitment */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="EcoReve Logo" className="h-11 sm:h-12 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="text-base md:text-lg font-normal leading-relaxed text-white/90">
              {commitmentParagraph1}
            </p>
            {commitmentParagraph2 && (
              <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                {commitmentParagraph2}
              </p>
            )}
          </div>

          {/* Right Column: Global Offices & Contact Information */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs leading-relaxed">
            {actualOffices.map((office, idx) => (
              <div key={office.id || idx} className="rounded-2xl bg-white text-foreground p-6 shadow-xl space-y-3 border border-white">
                <div className="flex items-center gap-2">
                  <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-extrabold text-white ${
                    idx % 2 === 0 ? "bg-[#005883]" : "bg-[#008193]"
                  }`}>
                    {getTrans(office.badge, currentLanguage) || "Global Office"}
                  </span>
                </div>
                <h4 className="font-extrabold text-foreground text-sm leading-snug">
                  {getTrans(office.name, currentLanguage)}
                </h4>
                <div className="space-y-1 pt-1">
                  <p className="font-bold text-muted-foreground text-[11px] uppercase tracking-wider">Address</p>
                  <p className="text-foreground/90 font-medium">{getTrans(office.address, currentLanguage)}</p>
                </div>
                {(office.phone || office.email) && (
                  <div className="space-y-1">
                    <p className="font-bold text-muted-foreground text-[11px] uppercase tracking-wider">Contact</p>
                    {office.phone && <p className="text-foreground/90 font-medium">{office.phone}</p>}
                    {office.email && <p className="text-foreground/90 font-medium">{office.email}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Rights Reserved Row */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>{t.footer.allRightsReserved}</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Environmental Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
