import React, { useState } from "react";
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
  users = [],
  authAdmin,
  products = [],
  services = [],
  faqs = [],
  offices = [],
  news = [],
  inquiries = [],
  productCategories = [],
  serviceCategories = [],
  newsCategories = [],
}: {
  users?: any[];
  authAdmin?: any;
  products?: any[];
  services?: any[];
  faqs?: any[];
  offices?: any[];
  news?: any[];
  inquiries?: any[];
  productCategories?: any[];
  serviceCategories?: any[];
  newsCategories?: any[];
}) {
  const [activeTab, setActiveTab] = useState<AdminTab>("Overview");
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

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
        return <OverviewView />;
      case "Products":
        return <ProductsAdminView products={products} productCategories={productCategories} />;
      case "Services":
        return <ServicesAdminView services={services} serviceCategories={serviceCategories} />;
      case "Inquiries":
        return <InquiriesAdminView inquiries={inquiries} />;
      case "FAQs":
        return <FaqsAdminView faqs={faqs} />;
      case "Offices":
        return <OfficesAdminView offices={offices} />;
      case "News":
        return <NewsAdminView news={news} newsCategories={newsCategories} />;
      case "Users":
        return <UsersAdminView users={users} />;
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
      />
    </>
  );
}
