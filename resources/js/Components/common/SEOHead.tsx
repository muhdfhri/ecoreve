import React from "react";
import { Head } from "@inertiajs/react";

export interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "article";
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "EcoReve - Qingdao Topolar New Material Co., Ltd.",
  description = "EcoReve provides advanced wastewater treatment, MBR membranes, zero liquid discharge (ZLD), and green environmental engineering solutions across Southeast Asia.",
  image = "https://ecoreve.premier-engineering.co.id/assets/og-cover.png",
  url = "https://ecoreve.premier-engineering.co.id",
  type = "website",
}) => {
  const fullTitle = title;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="PT EcoReve Indonesia" />

      {/* Canonical URL */}
      <link rel="canonical" href={url} />

      {/* Multilingual Alternate Hreflang Tags */}
      <link rel="alternate" hrefLang="en" href={`${url}?lang=en`} />
      <link rel="alternate" hrefLang="id" href={`${url}?lang=id`} />
      <link rel="alternate" hrefLang="ms" href={`${url}?lang=ms`} />
      <link rel="alternate" hrefLang="th" href={`${url}?lang=th`} />
      <link rel="alternate" hrefLang="zh" href={`${url}?lang=zh`} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Open Graph / WhatsApp / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="EcoReve" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Head>
  );
};
