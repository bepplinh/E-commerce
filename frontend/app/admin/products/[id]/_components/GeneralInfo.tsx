"use client";

import { memo } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminInput, AdminTextArea } from "@/components/admin/AdminControls";

interface GeneralInfoProps {
  product: {
    name: string;
    description: string;
    basePrice: number;
    slug: string;
  };
  onChange: (val: any) => void;
}

export const GeneralInfo = memo(({ product, onChange }: GeneralInfoProps) => (
  <AdminCard title="General Information">
    <div className="grid grid-cols-1 gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#a1a1a1] uppercase tracking-wider">Product Name</label>
        <AdminInput 
          placeholder="e.g. Nike Air Force 1 '07" 
          value={product.name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#a1a1a1] uppercase tracking-wider">Description</label>
        <AdminTextArea 
          placeholder="Enter a detailed description of your product..." 
          value={product.description}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#a1a1a1] uppercase tracking-wider">Base Price ($)</label>
          <AdminInput 
            type="number" 
            placeholder="0.00" 
            value={product.basePrice}
            onChange={(e) => onChange({ basePrice: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#a1a1a1] uppercase tracking-wider">Product Slug</label>
          <AdminInput 
            placeholder="nike-air-force-1-07" 
            value={product.slug}
            onChange={(e) => onChange({ slug: e.target.value })}
          />
        </div>
      </div>
    </div>
  </AdminCard>
));

GeneralInfo.displayName = "GeneralInfo";
