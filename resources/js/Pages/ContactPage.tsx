import React, { useState } from "react";
import { router } from "@inertiajs/react";
import { AppLayout } from "../Layouts/AppLayout";
import { SEOHead } from "@/Components/common/SEOHead";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import heroFooterImg from "@/assets/hero-footer.webp";
import { useTranslation } from "@/i18n/useTranslation";

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    message: "",
  });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    router.post(
      "/contact/inquiry",
      {
        full_name: formData.fullName,
        work_email: formData.email,
        company_name: formData.company,
        message: formData.message,
      },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setIsSubmitted(true);
          setFormData({ fullName: "", email: "", company: "", message: "" });
          setTimeout(() => setIsSubmitted(false), 5000);
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <AppLayout activeNav="Contact">
      <SEOHead
        title="Contact & Inquiries — EcoReve"
        description="Get in touch with EcoReve environmental engineering specialists for custom plant designs, MBR membrane quotes, and ZLD consultations."
        url="https://ecoreve.com/contact"
      />
      <div className="w-full min-h-screen bg-background text-foreground pb-12 pt-3">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
        {/* Split 2-Column Grid Layout (50% / 50%) */}
        <div className="grid gap-6 lg:grid-cols-2 items-stretch">
          {/* LEFT COLUMN: Top Featured Image + Bottom Newsletter Box */}
          <div className="flex flex-col gap-6 justify-between">
            {/* Top Box: Featured Image */}
            <div className="reveal relative overflow-hidden rounded-2xl bg-card flex-1 min-h-[340px] shadow-xl border border-white/20 group">
              <img
                src={heroFooterImg}
                alt="EcoReve Wastewater Treatment Facility"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
              
              {/* Eyebrow Glass Pill Badge */}
              <div className="relative z-10 p-6 sm:p-8">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 backdrop-blur-md border border-white/20 text-xs font-semibold text-white/90 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#008193] animate-pulse" />
                  <span className="uppercase text-[11px] tracking-wider font-bold">
                    {t.contactPage.badge || "GET IN TOUCH"}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Box: Dark Teal/Blue Newsletter Subscription Card */}
            <div className="reveal rounded-2xl bg-[#224e63] text-white p-8 sm:p-10 flex flex-col justify-center min-h-[180px] shadow-xl border border-white/10">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug max-w-md text-white drop-shadow-xs">
                {t.contactPage.subtitle}
              </h3>
            </div>
          </div>

          {/* RIGHT COLUMN: Minimalist Soft Grayish-Teal Form Card ("Let's talk") */}
          <div className="reveal rounded-2xl bg-[#c3d5db]/90 dark:bg-[#0f222e] text-[#1a2328] dark:text-white p-8 sm:p-10 md:p-12 flex flex-col justify-between shadow-2xl border border-white/30 dark:border-white/10">
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#1a2328] dark:text-white leading-tight">
                {t.contactPage.title}
              </h2>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-white/60 dark:bg-white/10 text-center space-y-3 animate-in fade-in-0 duration-300">
                  <div className="h-12 w-12 rounded-full bg-[#005883] text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1a2328] dark:text-white">{t.contactPage.formSuccess}</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Field 1: Full Name */}
                  <div className="border-b border-[#1a2328]/30 dark:border-white/30 pb-2">
                    <input
                      type="text"
                      required
                      placeholder={t.contactPage.formName}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-transparent text-sm text-[#1a2328] dark:text-white placeholder:text-[#1a2328]/60 dark:placeholder:text-white/60 outline-none font-medium transition-colors"
                    />
                  </div>

                  {/* Field 2: Email Address */}
                  <div className="border-b border-[#1a2328]/30 dark:border-white/30 pb-2">
                    <input
                      type="email"
                      required
                      placeholder={t.contactPage.formEmail}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-transparent text-sm text-[#1a2328] dark:text-white placeholder:text-[#1a2328]/60 dark:placeholder:text-white/60 outline-none font-medium transition-colors"
                    />
                  </div>

                  {/* Field 3: Company */}
                  <div className="border-b border-[#1a2328]/30 dark:border-white/30 pb-2">
                    <input
                      type="text"
                      required
                      placeholder={t.contactPage.formCompany}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full bg-transparent text-sm text-[#1a2328] dark:text-white placeholder:text-[#1a2328]/60 dark:placeholder:text-white/60 outline-none font-medium transition-colors"
                    />
                  </div>

                  {/* Field 4: Your Message */}
                  <div className="border-b border-[#1a2328]/30 dark:border-white/30 pb-2">
                    <textarea
                      rows={3}
                      required
                      placeholder={t.contactPage.formMessage}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent text-sm text-[#1a2328] dark:text-white placeholder:text-[#1a2328]/60 dark:placeholder:text-white/60 outline-none font-medium resize-none transition-colors"
                    />
                  </div>

                  {/* Submit Action Button */}
                  <div className="pt-2 flex items-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-xl bg-[#1a2328] dark:bg-white text-white dark:text-[#1a2328] hover:bg-[#005883] dark:hover:bg-[#008193] hover:text-white px-8 py-3.5 text-xs font-mono font-extrabold tracking-widest uppercase shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? "SENDING..." : t.contactPage.formSubmit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </AppLayout>
  );
};

export default ContactPage;
