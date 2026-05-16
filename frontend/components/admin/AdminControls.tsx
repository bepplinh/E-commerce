import * as React from "react";
import { cn } from "@/libs/utils";

interface AdminButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "xs" | "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const AdminButton = React.forwardRef<HTMLButtonElement, AdminButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
    const variants = {
      primary: "bg-[#7c3aed] text-white hover:bg-[#8b5cf6] active:scale-[0.98]",
      secondary: "bg-admin-surface-elevated text-admin-text-primary border border-admin-border-default hover:opacity-80 active:scale-[0.98]",
      ghost: "bg-transparent text-admin-text-secondary hover:text-admin-text-primary hover:bg-admin-surface-elevated",
      danger: "bg-[#ef4444]/10 text-[#ef4444] border border-[#ef4444]/20 hover:bg-[#ef4444]/20 active:scale-[0.98]",
    };

    const sizes = {
      xs: "px-2 py-1 text-[10px] font-bold uppercase tracking-wider",
      sm: "px-3 py-1.5 text-xs font-medium",
      md: "px-4 py-2 text-sm font-medium",
      lg: "px-6 py-3 text-base font-medium",
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || props.disabled}
        className={cn(
          "inline-flex items-center justify-center rounded transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-3 w-3 animate-pulse bg-current rounded-full" />
        ) : null}
        {children}
      </button>
    );
  }
);

AdminButton.displayName = "AdminButton";

export const AdminInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full bg-admin-surface border border-admin-border-default rounded px-3 py-2 text-sm text-admin-text-primary placeholder:text-admin-text-tertiary outline-none transition-all focus:border-[#7c3aed] focus:ring-1 focus:ring-[#7c3aed]/30 disabled:opacity-40",
          className
        )}
        {...props}
      />
    );
  }
);

AdminInput.displayName = "AdminInput";
