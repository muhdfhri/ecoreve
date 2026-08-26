import React, { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setIsSubscribed(true);
      setTimeout(() => setIsSubscribed(false), 4000);
    }
  };

  return (
    <div className="w-full min-h-screen bg-background text-foreground pb-12 pt-3">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 md:px-8">
        {/* Split 2-Column Grid Layout (Matching User Reference Image 100%) */}
        <div className="grid gap-6 lg:grid-cols-12 items-stretch min-h-[640px]">
          {/* LEFT COLUMN: Top Featured Image (hero-footer.webp) + Bottom Newsletter Box */}
          <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
            {/* Top Box: Featured Image (hero-footer.webp) */}
            <div className="relative overflow-hidden rounded-2xl bg-card flex-1 min-h-[340px] group">
              <img
                src={heroFooterImg}
                alt="EcoReve Wastewater Treatment Facility"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Bottom Box: Dark Teal/Blue Newsletter Subscription Card */}
            <div className="rounded-2xl bg-[#224e63] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[220px]">
              <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug max-w-md text-white">
                {t.contactPage.subtitle}
              </h3>

              {isSubscribed ? (
                <div className="mt-4 p-3 rounded-xl bg-white/15 text-white text-xs font-bold flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#8ec63f]" />
                  <span>{t.contactPage.formSuccess}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="mt-6 relative flex items-center border-b border-white/40 pb-2">
                  <input
                    type="email"
                    required
                    placeholder={t.contactPage.formEmail}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-transparent text-xs text-white placeholder:text-white/60 outline-none pr-10 font-medium"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-0 text-white/80 hover:text-white transition-all hover:translate-x-1"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Minimalist Soft Grayish-Teal Form Card ("Let's talk") */}
          <div className="lg:col-span-6 rounded-2xl bg-[#c3d5db]/80 dark:bg-[#0f222e] text-[#1a2328] dark:text-white p-8 sm:p-12 md:p-14 flex flex-col justify-between">
            <div className="space-y-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#1a2328] dark:text-white">
                {t.contactPage.title}
              </h2>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-white/60 dark:bg-white/10 text-center space-y-3 animate-in fade-in-0 duration-300">
                  <div className="h-12 w-12 rounded-full bg-[#005883] text-white flex items-center justify-center mx-auto">
                    <Check className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1a2328] dark:text-white">{t.contactPage.formSuccess}</h3>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-7">
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

                  {/* Submit Action Pair Buttons (Matching Reference Black Button Pair) */}
                  <div className="pt-4 flex items-center gap-2">
                    <button
                      type="submit"
                      aria-label="Submit icon"
                      className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#1a2328] dark:bg-white text-white dark:text-[#1a2328] hover:bg-[#005883] dark:hover:bg-[#008193] transition-colors shrink-0"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>

                    <button
                      type="submit"
                      className="rounded-xl bg-[#1a2328] dark:bg-white text-white dark:text-[#1a2328] hover:bg-[#005883] dark:hover:bg-[#008193] px-8 py-3.5 text-xs font-mono font-extrabold tracking-widest uppercase transition-colors"
                    >
                      {t.contactPage.formSubmit}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
