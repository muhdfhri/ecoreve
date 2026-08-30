# EcoReve - Enterprise Environmental Protection & Water Treatment Engineering Platform

**EcoReve** (Qingdao Topolar New Material Co.,Ltd. / PT EcoReve Indonesia) is an enterprise-grade, full-stack web platform and Management System engineered for industrial wastewater treatment equipment, MBR membrane filtration systems, zero liquid discharge (ZLD) plants, and environmental engineering telemetry.

The platform is architected around a **Laravel 13** backend engine paired seamlessly with a **Server-Driven SPA via Inertia.js 3.0, React 19, and TypeScript**, fully adhering to **Option 3 Design System Rules (Natural Modern Curves)** for visual consistency across device viewports.

---

## Technical Stack & Architecture Specification

### 1. Frontend & Client-Side Architecture
- **Core Engine**: React 19 with TypeScript strict mode, served via Inertia.js 3.0 SPA adapter.
- **Styling Architecture**: Tailwind CSS v4 + Vanilla CSS custom glassmorphism design tokens.
- **UI Primitives & Components**: Shadcn UI Primitives, Radix UI (Dialogs, Selects, Dropdowns), TanStack DataTable, and Lucide React Icons.
- **Internationalization (i18n)**: Custom React i18n Engine supporting 5 languages (**English [EN]**, **Indonesian [ID]**, **Malay [MS]**, **Chinese [ZH]**, **Thai [TH]**) with persistent state synchronization.
- **Performance & Media Optimization**: Eager/async image decoding, instant Shadcn modal preview handlers, and responsive layout math.

### 2. Backend & Server Engine
- **Framework Core**: Laravel 13 running on PHP 8.3+.
- **Database & Data Modeling**: MySQL / PostgreSQL utilizing Eloquent ORM for Products, Product Categories, Services, Service Categories, News, News Categories, Media, and Inquiries.
- **Security & Authentication**: Custom JWT (JSON Web Token) / Session authentication layer, rate limiting, sliding inactivity timeout, and URL masking for admin portals.
- **Media Asset Processing**: Dynamic physical storage scanner for `/assets/products/` and `/assets/news/` directories with automated metadata extraction (dimensions, filesize, mime-type, alt-text tags).

### 3. SEO, Open Graph & Search Engine Infrastructure
- **Google Sitelinks Schema**: Embedded JSON-LD Schema.org (`WebSite`, `Organization`, `SiteNavigationElement`, `ItemList`) explicitly mapping main Navbar routes for automated Google Search Console Sitelinks indexing.
- **Open Graph & Twitter Cards**: Dynamic Meta Open Graph (`og:type`, `og:title`, `og:description`, `og:image`, `og:url`) and Twitter Card attributes for WhatsApp, LinkedIn, and X preview cards.
- **Multilingual Indexing**: Multilingual `hreflang` alternate tags for EN, ID, MS, TH, and ZH.
- **Dynamic XML Sitemap Generator**: Server-side Blade XML sitemap builder (`/sitemap.xml`) with priority weighting for products, news, and core catalog routes.
- **Web Crawler Directives**: Pre-configured `public/robots.txt` disallowing internal admin and auth routes from search engine indexing.

---

## Comprehensive Platform Feature Breakdown

### A. Administrative Management System (CMS & CRM)

#### 1. Overview & Business Intelligence Dashboard
- **KPI Monitoring**: Real-time stats for Total Inquiries, Active Products, Engineering Services, and Published Research Articles.
- **Engagement Trend Analytics**: Visual trend charts monitoring monthly lead inquiries.
- **Live Activity Feed**: Real-time system log feed displaying operational updates.
- **Recent Inquiry Snapshot**: Dedicated dashboard table for immediate client lead review.

#### 2. Products Catalog Management
- **Catalog Operations**: Complete CRUD workflows for industrial water treatment equipment, MBR membranes, and ZLD systems.
- **Category Navigation**: Horizontal tab navigation bar featuring smooth scroll arrow controls (`ChevronLeft`/`ChevronRight`).
- **Control Bar & Filters**: Full-width mobile search bar, active category badge pills with instant clearing, and 2-column grid button controls.
- **Media Selector Integration**: Single-click image asset selection powered by the unified Media Library.
- **Table Data Grid**: Interactive TanStack `DataTable` featuring ID sorting, status badges, batch deletion, and instant Shadcn UI image preview modals right next to ID columns.

#### 3. Services Solution Manager
- **Engineering Solutions**: Management of turnkey EPC execution, plant commissioning, and maintenance service records.
- **Structured Metadata**: Technical specifications, deliverables, turnaround estimates, and metric badges.
- **Control Bar Standard**: Uniform layout matching the Products module with category filters and search inputs.

#### 4. News & Research Publishing Hub
- **Article Publisher**: Multi-language article editor with cover image attachments, featured status toggles, read time estimates, and publication scheduling.
- **Category Management**: Dedicated news category manager modal for grouping technical insights.
- **Image Preview Modals**: Instant cover image viewing directly from the article table grid.

#### 5. CRM Inquiry Center
- **Lead Pipeline**: Client inquiry records submitted via public contact forms.
- **Workflow Status Stages**: Real-time status switching (*Pending*, *In Process*, *Closed*).
- **Filtering & Search**: Deep search capabilities across contact names, company names, work emails, and message snippets.
- **Interactive Details Modal**: Deep-dive lead response modal with complete client requirement displays.

#### 6. Dynamic Media Library Engine
- **Folder Categorization Sub-Tabs**: Organized asset tabs (*All Media*, *Products Assets*, *News Assets*).
- **Physical Sync**: Dynamic scanning of `/assets/products/*.webp` and `/assets/news/*.webp` files into the `media` database table.
- **Metadata Management**: Live file size calculation, dimension checks, mime-type tagging, and Alt Text editing.
- **Instant Preview**: Shadcn UI Dialog preview modal with zero-delay rendering (`duration-75`).

#### 7. Command Palette & Global Accessibility
- **Quick Create Drawer**: Keyboard shortcut drawer (`Alt+P`, `Alt+S`, `Alt+N`, `Alt+O`, `Alt+U`, `Alt+1..5`).
- **Global Key Listeners**: Instant navigation to creation forms and theme toggles from anywhere within the admin panel.

---

### B. Public Client Portal

#### 1. Responsive Multi-Language Header & Navigation
- **Mega Menu Dropdowns**: Multi-column product and service category dropdowns with custom technical icons.
- **Mobile Menu Overlay**: Smooth right-to-left fullscreen mobile menu drawer with dark commitment cards (`#1a2328`).
- **Language Switcher**: Persistent 5-language selector with country flags.

#### 2. Interactive Products & Solutions Catalog
- **Multi-Filter System**: Instant filtering by category, target industry, and search keywords.
- **View Modes**: Toggle between Grid view and List view formats.
- **Technical Specification Modals**: Full technical parameter breakdown popups with PDF datasheet request triggers.

#### 3. Engineering Services & Telemetry Presentation
- **Turnkey Breakdown**: Visual service process steps, key metrics, and deliverables.
- **FAQ Accordion**: Expandable technical FAQ accordions with smooth CSS grid height animations.

#### 4. News & Research Publication
- **Featured Articles**: Hero article banner showcasing featured engineering research.
- **Category Filtering**: Instant article filtering by news categories (*Partnership*, *Research*, *Funding*, *Technology*).
- **Article Detail View**: Deep-reading article layout with author bio metadata and publication dates.

#### 5. Contact & Inquiry Submission
- **CRM Lead Form**: 2-column split layout with direct inquiry submission to the admin CRM center.
- **Location Information**: Headquarters and regional office details.

---

## Detailed Directory Architecture

```
ecoreve/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── AdminAuthController.php   # Admin Login & Auth Session
│   │   │   ├── HomeController.php        # Public Landing Controller
│   │   │   ├── MediaController.php       # Media Library API Endpoint
│   │   │   ├── NewsController.php        # News CRUD Controller
│   │   │   ├── ProductController.php     # Products CRUD Controller
│   │   │   └── ServiceController.php     # Services CRUD Controller
│   │   └── Middleware/
│   │       ├── HandleInertiaRequests.php # Shared Inertia Props
│   │       └── JwtAdminAuth.php          # Admin Protection Middleware
│   └── Models/                           # Eloquent Models (Media, Product, News, Inquiry)
├── database/
│   ├── migrations/                       # Table Schemas (media, products, news, inquiries)
│   └── seeders/                          # Seeders (MediaSeeder, ProductSeeder, NewsSeeder)
├── public/
│   ├── assets/                           # Physical Assets
│   │   ├── news/                         # News Image Assets
│   │   └── products/                     # Product WebP Assets (96 Items)
│   ├── robots.txt                        # Search Engine Directives
│   └── favicon.ico                       # Website Favicon
├── resources/
│   ├── css/
│   │   └── app.css                       # Design System Tokens & Utility Classes
│   ├── js/
│   │   ├── Components/
│   │   │   ├── admin/                    # Admin Views, Dashboards, Quick Palette
│   │   │   │   ├── media/                # MediaPickerModal, ImageSelectorInput, ImageViewerModal
│   │   │   │   └── views/                # ProductsAdminView, NewsAdminView, ServicesAdminView, InquiriesAdminView
│   │   │   ├── common/                   # SEOHead.tsx Reusable Meta Component
│   │   │   ├── layout/                   # Navbar, Footer, LanguageDropdown, MobileDrawer
│   │   │   ├── sections/                 # Landing Page Section Components
│   │   │   └── ui/                       # Shadcn Primitives (Dialog, Select, DataTable)
│   │   ├── i18n/                         # 5-Language Dictionaries (en, id, ms, zh, th)
│   │   ├── Pages/                        # Public Pages & Admin CRUD Form Pages
│   │   ├── types/                        # TypeScript Interfaces & Types
│   │   └── utils/                        # Helper Utilities (transHelper, etc.)
│   └── views/
│       ├── app.blade.php                 # Root HTML & Google Sitelinks JSON-LD Schema
│       └── sitemap.blade.php             # Dynamic XML Sitemap Template
└── routes/
    └── web.php                           # Application Web Routes & API Endpoints
```

---

## Design System Standard (Option 3 - Natural Modern Curves)

All components strictly comply with the **Option 3 Design System Rules**:
1. **Container Radius**: Primary Cards, Modals, Banner Containers, & Sidebars use `rounded-2xl` (16px) or max `rounded-3xl` (24px for major hero banners).
2. **Buttons & Inputs Radius**: Form Inputs, Select Dropdowns, Action Buttons, & Interactive Cards use `rounded-xl` (12px) or `rounded-lg` (8px). Floating Navigation Bar uses standard `rounded-full`.
3. **Outlines & Borders**: Search forms and text inputs use clean, natural black border outlines (`border-2 border-black/80 dark:border-white/80 focus:border-black dark:focus:border-white`) without artificial drop shadows (`shadow-none` / natural flat layout).

---

## License & Intellectual Property

Copyright © 2026 **Qingdao Topolar New Material Co.,Ltd.**. All rights reserved.
