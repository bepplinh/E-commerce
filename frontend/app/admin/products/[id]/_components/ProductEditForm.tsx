"use client";

import { useState, useMemo } from "react";
import { AdminButton } from "@/components/admin/AdminControls";
import { 
  ArrowLeft, 
  Save 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/libs/utils";

import { GeneralInfo } from "./GeneralInfo";
import { ProductOptions } from "./ProductOptions";
import { ProductMedia } from "./ProductMedia";
import { InventoryVariants } from "./InventoryVariants";
import { StatusSidebar, OrganizationSidebar, SummarySidebar } from "./SidebarSections";

interface ProductEditFormProps {
  initialData: any;
  isNew: boolean;
}

export function ProductEditForm({ initialData, isNew }: ProductEditFormProps) {
  const [activeTab, setActiveTab] = useState("general");
  const [product, setProduct] = useState(initialData);

  const totalStock = useMemo(() => 
    product.variants.reduce((acc: number, v: any) => acc + v.stock, 0),
  [product.variants]);

  const handleProductChange = (updates: any) => {
    setProduct((prev: any) => ({ ...prev, ...updates }));
  };

  const handleToggleActive = () => {
    setProduct((prev: any) => ({ ...prev, isActive: !prev.isActive }));
  };

  return (
    <div className="p-8 max-w-[1200px] mx-auto pb-24">
      {/* Header / Breadcrumbs */}
      <div className="flex flex-col gap-4 mb-8">
        <Link 
          href="/admin/products" 
          className="flex items-center text-xs font-medium text-[#666666] hover:text-white transition-colors w-fit"
        >
          <ArrowLeft className="w-3 h-3 mr-1" />
          Back to Products
        </Link>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold tracking-tight text-white">
              {isNew ? "Create New Product" : product.name}
            </h1>
            <p className="text-sm text-[#a1a1a1]">
              {isNew ? "Set up your new product listing." : "Edit and manage product details and inventory."}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" size="sm">
              Discard Changes
            </AdminButton>
            <AdminButton variant="primary" size="sm" className="shadow-[0_0_20px_rgba(124,58,237,0.3)]">
              <Save className="w-4 h-4 mr-2" />
              Save Product
            </AdminButton>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Tabs Navigation */}
          <div className="flex items-center gap-1 border-b border-[#262626] pb-px">
            {["general", "images", "variants"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-2 text-xs font-bold uppercase tracking-widest transition-all relative",
                  activeTab === tab 
                    ? "text-[#7c3aed]" 
                    : "text-[#666666] hover:text-[#a1a1a1]"
                )}
              >
                {tab}
                {activeTab === tab ? (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#7c3aed]" />
                ) : null}
              </button>
            ))}
          </div>

          {activeTab === "general" ? (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <GeneralInfo product={product} onChange={handleProductChange} />
              <ProductOptions options={product.options} />
            </div>
          ) : activeTab === "images" ? (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <ProductMedia images={product.images} />
            </div>
          ) : (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <InventoryVariants variants={product.variants} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-8">
          <StatusSidebar isActive={product.isActive} onToggle={handleToggleActive} />
          <OrganizationSidebar />
          <SummarySidebar variantCount={product.variants.length} totalStock={totalStock} />
        </div>
      </div>
    </div>
  );
}
