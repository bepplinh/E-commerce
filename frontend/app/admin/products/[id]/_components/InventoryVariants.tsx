"use client";

import { memo } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { Trash2 } from "lucide-react";
import { cn } from "@/libs/utils";

interface InventoryVariantsProps {
  variants: any[];
}

export const InventoryVariants = memo(({ variants }: InventoryVariantsProps) => (
  <AdminCard title="Inventory Variants" description="Manage SKU, price and stock for each combination.">
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-[#262626] text-[#666666] text-[10px] uppercase tracking-wider">
            <th className="pb-3 px-2 font-bold">Variant</th>
            <th className="pb-3 px-2 font-bold">SKU</th>
            <th className="pb-3 px-2 font-bold">Price</th>
            <th className="pb-3 px-2 font-bold">Stock</th>
            <th className="pb-3 px-2 font-bold text-right">Action</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {variants.map((variant, idx) => (
            <tr key={idx} className="border-b border-[#262626]/50 hover:bg-[#141414] transition-colors">
              <td className="py-4 px-2">
                <div className="flex flex-wrap gap-1">
                  {Object.entries(variant.attributes).map(([k, v]) => (
                    <span key={k} className="px-1.5 py-0.5 bg-[#1e1e1e] text-[9px] text-[#a1a1a1] rounded">
                      {String(v)}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-4 px-2">
                <input 
                  className="bg-transparent border-none outline-none text-white font-admin-mono text-xs w-full"
                  value={variant.sku}
                  readOnly
                />
              </td>
              <td className="py-4 px-2">
                <input 
                  type="number"
                  className="bg-transparent border-none outline-none text-white font-admin-mono text-xs w-20"
                  value={variant.price}
                  readOnly
                />
              </td>
              <td className="py-4 px-2">
                <input 
                  type="number"
                  className={cn(
                    "bg-transparent border-none outline-none font-admin-mono text-xs w-16",
                    variant.stock === 0 ? "text-[#ef4444]" : "text-white"
                  )}
                  value={variant.stock}
                  readOnly
                />
              </td>
              <td className="py-4 px-2 text-right">
                <button className="text-[#666666] hover:text-[#ef4444] transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </AdminCard>
));

InventoryVariants.displayName = "InventoryVariants";
