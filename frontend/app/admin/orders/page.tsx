import { AdminCard, StatCard } from "@/components/admin/AdminCard";
import { AdminButton, AdminInput } from "@/components/admin/AdminControls";
import { Search, Filter, Pencil, Trash2, Package, Truck, CheckCircle2, Clock } from "lucide-react";
import { cn } from "@/libs/utils";

export default function AdminOrdersPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Orders Pipeline</h1>
          <p className="text-sm text-[#a1a1a1]">Monitor and fulfill customer orders in real-time.</p>
        </div>
      </div>

      {/* Mini Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="New Orders" value="12" description="Needs processing" icon={<Package className="w-4 h-4" />} />
        <StatCard title="Processing" value="45" description="Being prepared" icon={<Clock className="w-4 h-4" />} />
        <StatCard title="Out for Delivery" value="8" description="With courier" icon={<Truck className="w-4 h-4" />} />
        <StatCard title="Delivered Today" value="32" description="Successfully completed" icon={<CheckCircle2 className="w-4 h-4" />} />
      </div>

      <AdminCard>
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            <AdminInput 
              placeholder="Search by order ID, customer name, or email..." 
              className="pl-9 bg-[#050505] border-[#262626]"
            />
          </div>
          <div className="flex items-center gap-2">
            <AdminButton variant="secondary" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </AdminButton>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#262626] text-[#666666] text-[10px] uppercase tracking-wider">
                <th className="pb-3 px-4 font-bold">Order ID</th>
                <th className="pb-3 px-4 font-bold">Customer</th>
                <th className="pb-3 px-4 font-bold">Date</th>
                <th className="pb-3 px-4 font-bold">Status</th>
                <th className="pb-3 px-4 font-bold">Total</th>
                <th className="pb-3 px-4 font-bold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {[
                { id: "ORD-99021", name: "Alice Cooper", email: "alice@example.com", date: "Today, 14:32", status: "New", total: "$1,299.00" },
                { id: "ORD-99020", name: "Bob Builder", email: "bob@example.com", date: "Today, 11:15", status: "Processing", total: "$45.50" },
                { id: "ORD-99019", name: "Charlie Delta", email: "charlie@example.com", date: "Yesterday", status: "Shipped", total: "$349.99" },
                { id: "ORD-99018", name: "Diana Prince", email: "diana@example.com", date: "Yesterday", status: "Delivered", total: "$89.00" },
                { id: "ORD-99017", name: "Evan Wright", email: "evan@example.com", date: "Jan 20, 2024", status: "Cancelled", total: "$240.00" },
              ].map((order) => (
                <tr key={order.id} className="border-b border-[#262626]/50 hover:bg-[#141414] transition-colors group">
                  <td className="py-4 px-4 font-admin-mono text-[13px] text-white font-medium">{order.id}</td>
                  <td className="py-4 px-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{order.name}</span>
                      <span className="text-xs text-[#666666] mt-0.5">{order.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-[#a1a1a1]">{order.date}</td>
                  <td className="py-4 px-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                      order.status === "Delivered" ? "bg-[#10b981]/10 text-[#10b981]" : 
                      order.status === "New" ? "bg-[#3b82f6]/10 text-[#3b82f6]" : 
                      order.status === "Processing" ? "bg-[#f59e0b]/10 text-[#f59e0b]" : 
                      order.status === "Shipped" ? "bg-[#7c3aed]/10 text-[#7c3aed]" : 
                      "bg-[#ef4444]/10 text-[#ef4444]"
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-admin-mono tabular-nums text-white">{order.total}</td>
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
      </AdminCard>
    </div>
  );
}
