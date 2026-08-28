import React, { useState, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import { Toaster, toast } from "@/Components/ui/sonner";
import { AdminLayout } from "@/Components/admin/layout/AdminLayout";
import { AdminTab } from "@/Components/admin/layout/AdminSidebar";
import { OverviewView } from "@/Components/admin/views/OverviewView";
import { ProductsAdminView } from "@/Components/admin/views/ProductsAdminView";
import { ServicesAdminView } from "@/Components/admin/views/ServicesAdminView";
import { InquiriesAdminView } from "@/Components/admin/views/InquiriesAdminView";
import { FaqsAdminView } from "@/Components/admin/views/FaqsAdminView";
import { OfficesAdminView } from "@/Components/admin/views/OfficesAdminView";
import { NewsAdminView } from "@/Components/admin/views/NewsAdminView";
import { UsersAdminView } from "@/Components/admin/views/UsersAdminView";
import { QuickCreateCommandPalette } from "@/Components/admin/QuickCreateCommandPalette";

export default function Dashboard({
  overviewStats = {},
  trendData = {},
  latestActivityFeed = [],
  recentInquiriesList = [],
  users = [],
  usersPagination = null,
  authAdmin,
  products = [],
  productsPagination = null,
  services = [],
  servicesPagination = null,
  faqs = [],
  faqsPagination = null,
  offices = [],
  officesPagination = null,
  news = [],
  newsPagination = null,
  inquiries = [],
  inquiriesPagination = null,
  productCategories = [],
  serviceCategories = [],
  newsCategories = [],
  filters = {},
}: {
  overviewStats?: any;
  trendData?: any;
  latestActivityFeed?: any[];
  recentInquiriesList?: any[];
  users?: any[];
  usersPagination?: any;
  authAdmin?: any;
  products?: any[];
  productsPagination?: any;
  services?: any[];
  servicesPagination?: any;
  faqs?: any[];
  faqsPagination?: any;
  offices?: any[];
  officesPagination?: any;
  news?: any[];
  newsPagination?: any;
  inquiries?: any[];
  inquiriesPagination?: any;
  productCategories?: any[];
  serviceCategories?: any[];
  newsCategories?: any[];
  filters?: any;
}) {
  const queryParams = new URLSearchParams(window.location.search);
  const tabFromUrl = queryParams.get("tab") as AdminTab | null;

  const [activeTab, setActiveTab] = useState<AdminTab>(tabFromUrl || "Overview");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const { flash } = usePage<any>().props;

  useEffect(() => {
    if (tabFromUrl) {
      const normalized = tabFromUrl.toLowerCase();
      if (normalized === "products") setActiveTab("Products");
      else if (normalized === "services") setActiveTab("Services");
      else if (normalized === "news") setActiveTab("News");
      else if (normalized === "overview") setActiveTab("Overview");
      else if (normalized === "inquiries") setActiveTab("Inquiries");
      else if (normalized === "faqs") setActiveTab("FAQs");
      else if (normalized === "offices") setActiveTab("Offices");
      else if (normalized === "users") setActiveTab("Users");
    }
  }, [tabFromUrl]);

  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success);
    }
    if (flash?.error) {
      toast.error(flash.error);
    }
  }, [flash]);

  // Global Ctrl+K / Cmd+K listener
  React.useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const renderActiveView = () => {
    switch (activeTab) {
      case "Overview":
        return (
          <OverviewView
            overviewStats={overviewStats}
            trendData={trendData}
            latestActivityFeed={latestActivityFeed}
            recentInquiriesList={recentInquiriesList}
          />
        );
      case "Products":
      case "products" as any:
        return (
          <ProductsAdminView
            products={products}
            productCategories={productCategories}
            productsPagination={productsPagination}
            filters={filters}
          />
        );
      case "Services":
      case "services" as any:
        return (
          <ServicesAdminView
            services={services}
            serviceCategories={serviceCategories}
            servicesPagination={servicesPagination}
            filters={filters}
          />
        );
      case "Inquiries":
        return (
          <InquiriesAdminView
            inquiries={inquiries}
            inquiriesPagination={inquiriesPagination}
            filters={filters}
          />
        );
      case "FAQs":
        return (
          <FaqsAdminView
            faqs={faqs}
            faqsPagination={faqsPagination}
            filters={filters}
          />
        );
      case "Offices":
        return (
          <OfficesAdminView
            offices={offices}
            officesPagination={officesPagination}
            filters={filters}
          />
        );
      case "News":
      case "news" as any:
        return (
          <NewsAdminView
            news={news}
            newsCategories={newsCategories}
            newsPagination={newsPagination}
            filters={filters}
          />
        );
      case "Users":
        return (
          <UsersAdminView
            users={users}
            usersPagination={usersPagination}
            filters={filters}
          />
        );
      default:
        return <OverviewView />;
    }
  };

  return (
    <>
      <AdminLayout
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        authAdmin={authAdmin}
        onQuickCreate={() => setIsCommandPaletteOpen(true)}
      >
        {renderActiveView()}
      </AdminLayout>

      <QuickCreateCommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        setActiveTab={setActiveTab}
        onOpenCreateProduct={() => router.get("/admin/products/create")}
        onOpenCreateService={() => router.get("/admin/services/create")}
        onOpenCreateNews={() => router.get("/admin/news/create")}
      />
      <Toaster position="bottom-right" richColors />
    </>
  );
}
