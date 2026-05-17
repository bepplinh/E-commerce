"use client";

import { memo } from "react";
import { AdminCard } from "@/components/admin/AdminCard";
import { Image as ImageIcon, Settings2, Trash2 } from "lucide-react";

interface ProductMediaProps {
  images: any[];
}

export const ProductMedia = memo(({ images }: ProductMediaProps) => (
  <AdminCard title="Product Media" description="Upload and arrange product images.">
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {images.map((img, idx) => (
        <div key={idx} className="relative aspect-square rounded border border-[#262626] overflow-hidden group">
          <img src={img.url} alt="" className="w-full h-full object-cover" />
          {img.isPrimary && (
            <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#7c3aed] text-[8px] font-bold text-white uppercase rounded">
              Primary
            </div>
          )}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button className="p-1.5 bg-[#1e1e1e] rounded hover:bg-[#333333] text-white">
              <Settings2 className="w-4 h-4" />
            </button>
            <button className="p-1.5 bg-[#ef4444]/20 rounded hover:bg-[#ef4444]/40 text-[#ef4444]">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      <button className="aspect-square rounded border-2 border-dashed border-[#262626] hover:border-[#7c3aed] transition-all flex flex-col items-center justify-center gap-2 text-[#666666] hover:text-[#7c3aed]">
        <ImageIcon className="w-6 h-6" />
        <span className="text-[10px] font-bold uppercase tracking-wider">Upload Image</span>
      </button>
    </div>
  </AdminCard>
));

ProductMedia.displayName = "ProductMedia";
