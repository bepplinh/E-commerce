import { AdminCard } from "@/components/admin/AdminCard";
import { AdminButton, AdminInput } from "@/components/admin/AdminControls";
import { Plus, Search, Filter, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/libs/utils";

export default function AdminProductsPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Products</h1>
          <p className="text-sm text-[#a1a1a1]">Manage your inventory and product listings.</p>
        </div>
        <div className="flex items-center gap-2">
          <AdminButton variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </AdminButton>
        </div>
      </div>

      <AdminCard>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            <AdminInput 
              placeholder="Search products by name, SKU, or tag..." 
              className="pl-9 bg-[#050505] border-[#262626]"
            />
          </div>
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </AdminButton>
            <AdminButton variant="ghost" size="sm">
              Clear
            </AdminButton>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#262626] text-[#666666] text-[10px] uppercase tracking-wider">
                <th className="pb-3 px-4 font-bold">Product</th>
                <th className="pb-3 px-4 font-bold">Status</th>
                <th className="pb-3 px-4 font-bold">Inventory</th>
                <th className="pb-3 px-4 font-bold">Category</th>
                <th className="pb-3 px-4 font-bold">Price</th>
                <th className="pb-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: "PRD-001", name: "Ergonomic Office Chair", sku: "FURN-CH-001", status: "Active", stock: 145, category: "Furniture", price: "$299.00" },
                { id: "PRD-002", name: "Mechanical Keyboard", sku: "TECH-KB-092", status: "Active", stock: 23, category: "Electronics", price: "$149.50" },
                { id: "PRD-003", name: "Noise Cancelling Headphones", sku: "TECH-AU-104", status: "Out of Stock", stock: 0, category: "Electronics", price: "$349.99" },
                { id: "PRD-004", name: "Ceramic Coffee Mug", sku: "HOME-MG-011", status: "Draft", stock: 500, category: "Home Goods", price: "$18.00" },
                { id: "PRD-005", name: "Leather Desk Pad", sku: "OFF-DP-045", status: "Active", stock: 89, category: "Office Supplies", price: "$45.00" },
              ].map((product) => (
                <tr key={product.id} className="border-b border-[#262626]/50 hover:bg-[#141414] transition-colors group">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#1e1e1e] border border-[#333333] flex-shrink-0" />
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{product.name}</span>
                        <span className="text-xs text-[#666666] font-admin-mono mt-0.5">{product.sku}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      product.status === "Active" ? "bg-[#10b981]/10 text-[#10b981]" : 
                      product.status === "Draft" ? "bg-[#f59e0b]/10 text-[#f59e0b]" : 
                      "bg-[#ef4444]/10 text-[#ef4444]"
                    )}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-admin-mono tabular-nums text-white">
                    <span className={cn(product.stock === 0 ? "text-[#ef4444]" : "text-white")}>
                      {product.stock} in stock
                    </span>
                  </td>
                  <td className="py-4 px-4 text-[#a1a1a1]">{product.category}</td>
                  <td className="py-4 px-4 font-admin-mono tabular-nums text-white">{product.price}</td>
                  <td className="py-4 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <AdminButton variant="ghost" size="xs" className="h-8 px-2.5">
                        <Pencil className="w-3 h-3 mr-1.5" />
                        Edit
                      </AdminButton>
                      <AdminButton variant="danger" size="xs" className="h-8 px-2.5">
                        <Trash2 className="w-3 h-3 mr-1.5" />
                        Delete
                      </AdminButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="mt-6 flex items-center justify-between border-t border-[#262626] pt-4">
          <span className="text-xs text-[#666666]">Showing <span className="text-white">1</span> to <span className="text-white">5</span> of <span className="text-white">142</span> results</span>
          <div className="flex items-center gap-1">
            <AdminButton variant="ghost" size="xs" disabled>Previous</AdminButton>
            <div className="px-2 text-xs text-white">1</div>
            <div className="px-2 text-xs text-[#666666]">2</div>
            <div className="px-2 text-xs text-[#666666]">3</div>
            <AdminButton variant="ghost" size="xs">Next</AdminButton>
          </div>
        </div>
      </AdminCard>
    </div>
  );
}
