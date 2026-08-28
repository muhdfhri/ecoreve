<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title inertia>Ecoreve - Qingdao Topolar New Material Co.,Ltd.</title>
    <link rel="icon" type="image/png" href="/logo.png">
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/logo.png">
    <!-- Google Fonts Inter & Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- GOOGLE SITELINKS & ORGANIZATION JSON-LD SCHEMA.ORG -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": "https://ecoreve.com/#website",
          "url": "https://ecoreve.com/",
          "name": "EcoReve",
          "description": "Sustainable Industrial Water & Environmental Engineering Solutions",
          "publisher": {
            "@type": "Organization",
            "name": "PT EcoReve Indonesia",
            "logo": "https://ecoreve.com/logo.png"
          }
        },
        {
          "@type": "ItemList",
          "name": "EcoReve Navigation Sitelinks",
          "itemListElement": [
            {
              "@type": "SiteNavigationElement",
              "position": 1,
              "name": "Products & Solutions",
              "description": "Industrial wastewater treatment equipment, MBR membranes, and ZLD systems.",
              "url": "https://ecoreve.com/products"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 2,
              "name": "Engineering Services",
              "description": "Turnkey EPC project execution, environmental consulting, and plant maintenance.",
              "url": "https://ecoreve.com/services"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 3,
              "name": "News & Research",
              "description": "Latest green technology research, industrial partnerships, and company updates.",
              "url": "https://ecoreve.com/news"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 4,
              "name": "About Us",
              "description": "Leading environmental engineering firm dedicated to industrial sustainability.",
              "url": "https://ecoreve.com/about"
            },
            {
              "@type": "SiteNavigationElement",
              "position": 5,
              "name": "Contact & Inquiries",
              "description": "Get in touch with EcoReve environmental engineering specialists.",
              "url": "https://ecoreve.com/contact"
            }
          ]
        }
      ]
    }
    </script>

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
    @inertiaHead
  </head>
  <body class="font-sans antialiased bg-background text-foreground selection:bg-[#005883] selection:text-white">
    @inertia
  </body>
</html>
