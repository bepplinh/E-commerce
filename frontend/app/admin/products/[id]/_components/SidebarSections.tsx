"use client";

import { memo } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminSelect } from "@/components/admin/AdminControls";
import { Globe, AlertCircle } from "lucide-react";
import { cn } from "@/libs/utils";

export const StatusSidebar = memo(({ isActive, onToggle }: { isActive: boolean, onToggle: () => void }) => (
  <AdminCard title="Status & Visibility">
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white uppercase tracking-wider">Active Status</span>
          <span className="text-[10px] text-[#666666]">Visible on storefront</span>
        </div>
        <button 
          onClick={onToggle}
          className={cn(
            "w-10 h-5 rounded-full transition-all relative flex items-center px-1",
            isActive ? "bg-[#7c3aed]" : "bg-[#262626]"
          )}
        >
          <div className={cn(
            "w-3 h-3 rounded-full bg-white transition-transform",
            isActive ? "translate-x-5" : "translate-x-0"
          )} />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#a1a1a1] uppercase tracking-wider">Publication Date</label>
        <div className="flex items-center justify-between px-3 py-2 bg-[#0a0a0a] border border-[#262626] rounded">
          <span className="text-xs text-white italic">Publishing immediately</span>
          <Globe className="w-3 h-3 text-[#666666]" />
        </div>
      </div>
    </div>
  </AdminCard>
));
StatusSidebar.displayName = "StatusSidebar";

export const OrganizationSidebar = memo(() => (
  <AdminCard title="Organization">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#a1a1a1] uppercase tracking-wider">Category</label>
        <AdminSelect defaultValue="1">
          <option value="1">Men's Shoes</option>
          <option value="2">Women's Shoes</option>
          <option value="3">Electronics</option>
        </AdminSelect>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#a1a1a1] uppercase tracking-wider">Brand</label>
        <AdminSelect defaultValue="1">
          <option value="1">Nike</option>
          <option value="2">Adidas</option>
          <option value="3">Puma</option>
        </AdminSelect>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-[#a1a1a1] uppercase tracking-wider">Tags</label>
        <div className="flex flex-wrap gap-2 p-2 bg-[#0a0a0a] border border-[#262626] rounded min-h-[40px]">
          {["Sneaker", "Lifestyle"].map(tag => (
            <span key={tag} className="px-1.5 py-0.5 bg-[#1e1e1e] text-[9px] font-bold text-[#a1a1a1] uppercase rounded flex items-center gap-1">
              {tag}
              <button className="hover:text-white">×</button>
            </span>
          ))}
          <input className="bg-transparent border-none outline-none text-xs text-white flex-1 min-w-[50px]" placeholder="Add..." />
        </div>
      </div>
    </div>
  </AdminCard>
));
OrganizationSidebar.displayName = "OrganizationSidebar";

export const SummarySidebar = memo(({ variantCount, totalStock }: { variantCount: number, totalStock: number }) => (
  <AdminCard title="Summary">
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between py-2 border-b border-[#262626]/50">
        <span className="text-xs text-[#a1a1a1]">Variants</span>
        <span className="text-xs font-bold text-white">{variantCount}</span>
      </div>
      <div className="flex items-center justify-between py-2 border-b border-[#262626]/50">
        <span className="text-xs text-[#a1a1a1]">Total Stock</span>
        <span className="text-xs font-bold text-white">{totalStock}</span>
      </div>
      <div className="flex items-center gap-2 p-3 bg-[#7c3aed]/5 rounded border border-[#7c3aed]/10">
        <AlertCircle className="w-4 h-4 text-[#7c3aed]" />
        <span className="text-[10px] text-[#a1a1a1] leading-tight">
          Last updated yesterday at 4:32 PM by admin@dovetail.io
        </span>
      </div>
    </div>
  </AdminCard>
));
SummarySidebar.displayName = "SummarySidebar";
