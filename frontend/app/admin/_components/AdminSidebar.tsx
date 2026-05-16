"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  BarChart3, 
  Layers,
  ShoppingBag,
  Bell
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
  { label: "Customers", href: "/admin/customers", icon: Users },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Inventory", href: "/admin/inventory", icon: Layers },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-admin-border-subtle bg-admin-bg flex flex-col h-screen sticky top-0">
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#7c3aed] rounded flex items-center justify-center font-bold text-white italic">
            D
          </div>
          <span className="font-bold tracking-tight text-admin-text-primary uppercase text-xs tracking-[0.2em]">Dovetail</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        <div className="px-3 mb-2">
          <span className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Main Menu</span>
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded transition-all duration-150 group",
                isActive 
                  ? "bg-admin-surface-elevated text-admin-text-primary" 
                  : "text-admin-text-secondary hover:text-admin-text-primary hover:bg-admin-surface-elevated"
              )}
            >
              <item.icon className={cn("w-4 h-4", isActive ? "text-[#7c3aed]" : "text-admin-text-tertiary group-hover:text-admin-text-secondary")} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-admin-border-subtle flex flex-col gap-1">
        <Link
          href="/admin/settings"
          className={cn(
            "flex items-center gap-3 px-3 py-2 rounded text-admin-text-secondary hover:text-admin-text-primary hover:bg-admin-surface-elevated transition-all",
            pathname === "/admin/settings" && "bg-admin-surface-elevated text-admin-text-primary"
          )}
        >
          <Settings className="w-4 h-4" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <div className="flex items-center justify-between px-3 py-2 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-admin-surface-elevated border border-admin-border-default" />
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-admin-text-primary leading-none">Admin User</span>
              <span className="text-[9px] text-admin-text-tertiary leading-none mt-1">admin@dovetail.io</span>
            </div>
          </div>
          <Bell className="w-3 h-3 text-admin-text-tertiary hover:text-admin-text-primary cursor-pointer" />
        </div>
      </div>
    </aside>
  );
}
