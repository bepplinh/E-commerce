import { cn } from "@/libs/utils";

interface AdminCardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
}

export function AdminCard({ children, className, title, description, headerAction }: AdminCardProps) {
  return (
    <div className={cn("bg-admin-surface border border-admin-border-subtle rounded-lg overflow-hidden", className)}>
      {(title || description || headerAction) && (
        <div className="px-6 py-4 border-b border-admin-border-subtle flex items-center justify-between">
          <div>
            {title && <h3 className="text-sm font-semibold text-admin-text-primary tracking-tight">{title}</h3>}
            {description && <p className="text-xs text-admin-text-tertiary mt-0.5">{description}</p>}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div className="p-6 text-admin-text-primary">
        {children}
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ title, value, description, trend, icon, className }: StatCardProps) {
  return (
    <div className={cn("p-6 bg-admin-surface border border-admin-border-subtle rounded-lg relative overflow-hidden group hover:border-admin-border-default transition-colors", className)}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] font-bold text-admin-text-tertiary uppercase tracking-[0.1em]">{title}</span>
        {icon && <div className="text-admin-text-secondary group-hover:text-admin-text-primary transition-colors">{icon}</div>}
      </div>
      
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold font-admin-mono tabular-nums text-admin-text-primary tracking-tight">
          {value}
        </h2>
        
        {(trend || description) && (
          <div className="flex items-center gap-2 mt-1">
            {trend && (
              <span className={cn("text-[11px] font-bold px-1.5 py-0.5 rounded", 
                trend.isPositive ? "bg-[#10b981]/10 text-[#10b981]" : "bg-[#ef4444]/10 text-[#ef4444]"
              )}>
                {trend.isPositive ? "↑" : "↓"} {trend.value}
              </span>
            )}
            {description && <span className="text-[11px] text-admin-text-tertiary">{description}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
