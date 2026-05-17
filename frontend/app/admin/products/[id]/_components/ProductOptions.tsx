"use client";

import { memo } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { AdminButton } from "@/components/admin/AdminControls";
import { Trash2, Plus } from "lucide-react";

interface ProductOptionsProps {
  options: any[];
}

export const ProductOptions = memo(({ options }: ProductOptionsProps) => (
  <AdminCard title="Options" description="Manage product variations like color, size, etc.">
    <div className="flex flex-col gap-4">
      {options.map((option, idx) => (
        <div key={idx} className="p-4 rounded border border-[#262626] bg-[#0a0a0a] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white uppercase tracking-wider">{option.name}</span>
            <button className="text-[#ef4444] hover:text-[#ef4444]/80 transition-colors">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {option.values.map((val: string, vIdx: number) => (
              <div key={vIdx} className="px-2 py-1 bg-[#1e1e1e] border border-[#333333] rounded text-[10px] font-bold text-white uppercase">
                {val}
              </div>
            ))}
            <button className="px-2 py-1 border border-dashed border-[#333333] rounded text-[10px] font-bold text-[#666666] hover:text-white hover:border-white transition-all">
              + ADD VALUE
            </button>
          </div>
        </div>
      ))}
      <AdminButton variant="ghost" size="sm" className="w-fit border border-dashed border-[#262626] hover:border-[#7c3aed] text-[#666666]">
        <Plus className="w-4 h-4 mr-2" />
        Add Another Option
      </AdminButton>
    </div>
  </AdminCard>
));

ProductOptions.displayName = "ProductOptions";
