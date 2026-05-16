import { StatCard, AdminCard } from "@/components/admin/AdminCard";
import { AdminButton } from "@/components/admin/AdminControls";
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  Activity,
  Pencil,
  Trash2,
  Download
} from "lucide-react";
import { cn } from "@/libs/utils";

export default function AdminDashboardPage() {
  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-tight text-white">Engineering Overview</h1>
          <p className="text-sm text-[#a1a1a1]">Real-time command center analytics and system health.</p>
        </div>
        <div className="flex items-center gap-2">
          <AdminButton variant="secondary" size="sm">
            <Download className="w-3 h-3 mr-2" />
            Export Data
          </AdminButton>
          <AdminButton variant="primary" size="sm">
            Refresh Metrics
          </AdminButton>
        </div>
      </div>
      
      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Revenue" 
          value="$128,430.20" 
          trend={{ value: "12.5%", isPositive: true }}
          description="vs last month"
          icon={<DollarSign className="w-4 h-4" />}
        />
        <StatCard 
          title="Active Customers" 
          value="2,350" 
          trend={{ value: "18.2%", isPositive: true }}
          description="vs last month"
          icon={<Users className="w-4 h-4" />}
        />
        <StatCard 
          title="Sales Volume" 
          value="+12,234" 
          trend={{ value: "4.3%", isPositive: false }}
          description="vs last month"
          icon={<CreditCard className="w-4 h-4" />}
        />
        <StatCard 
          title="Server Health" 
          value="99.98%" 
          description="Operational"
          icon={<Activity className="w-4 h-4" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions */}
        <div className="lg:col-span-2">
          <AdminCard 
            title="Recent Transactions" 
            description="Latest order activity across all channels."
            headerAction={
              <AdminButton variant="ghost" size="xs">View All</AdminButton>
            }
          >
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[#262626] text-[#666666] text-[10px] uppercase tracking-wider">
                    <th className="pb-3 font-bold">Transaction ID</th>
                    <th className="pb-3 font-bold">Customer</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold">Amount</th>
                    <th className="pb-3 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { id: "TX-9021", user: "Liam Johnson", status: "Success", amount: "+$1,999.00" },
                    { id: "TX-9022", user: "Noah Williams", status: "Pending", amount: "+$350.50" },
                    { id: "TX-9023", user: "James Brown", status: "Success", amount: "+$1,200.00" },
                    { id: "TX-9024", user: "Emma Jones", status: "Success", amount: "+$89.00" },
                    { id: "TX-9025", user: "Sophia Miller", status: "Failed", amount: "+$240.00" },
                  ].map((tx) => (
                    <tr key={tx.id} className="border-b border-[#262626]/50 hover:bg-[#141414] transition-colors group">
                      <td className="py-4 font-admin-mono text-[13px] text-white">{tx.id}</td>
                      <td className="py-4 text-white">{tx.user}</td>
                      <td className="py-4">
                        <span className={cn(
                          "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase",
                          tx.status === "Success" ? "bg-[#10b981]/10 text-[#10b981]" : 
                          tx.status === "Pending" ? "bg-[#f59e0b]/10 text-[#f59e0b]" : 
                          "bg-[#ef4444]/10 text-[#ef4444]"
                        )}>
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 font-admin-mono tabular-nums text-white">{tx.amount}</td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <AdminButton variant="ghost" size="xs" className="h-7 px-2">
                            <Pencil className="w-3 h-3 mr-1" />
                            Edit
                          </AdminButton>
                          <AdminButton variant="danger" size="xs" className="h-7 px-2">
                            <Trash2 className="w-3 h-3 mr-1" />
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

        {/* Sidebar Info */}
        <div className="flex flex-col gap-6">
          <AdminCard title="Quick Actions" description="Common administrative tasks.">
            <div className="flex flex-col gap-2">
              <AdminButton variant="secondary" className="w-full justify-start text-xs">Create New Product</AdminButton>
              <AdminButton variant="secondary" className="w-full justify-start text-xs">Generate Report</AdminButton>
              <AdminButton variant="secondary" className="w-full justify-start text-xs">Manage Users</AdminButton>
              <AdminButton variant="danger" className="w-full justify-start text-xs">System Maintenance</AdminButton>
            </div>
          </AdminCard>

          <AdminCard title="System Health" description="API and Database status.">
            <div className="flex flex-col gap-4">
              {[
                { label: "Main API", status: "Healthy", color: "#10b981" },
                { label: "Search Engine", status: "Slow", color: "#f59e0b" },
                { label: "Redis Cache", status: "Healthy", color: "#10b981" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-xs text-[#a1a1a1]">{s.label}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                    <span className="text-[10px] font-bold text-white uppercase">{s.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}
