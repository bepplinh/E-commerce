import React from "react";
import clsx from "clsx";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    variant?: "primary" | "secondary" | "outline";
    loading?: boolean;
};

export default function Button({
    title,
    className,
    variant = "primary",
    loading = false,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyle =
        "px-4 py-2 font-medium transition duration-200 flex items-center justify-center gap-2";

    const variants = {
        primary: "bg-black text-white ",
        secondary: "bg-gray-200 text-black hover:bg-gray-300",
        outline: "border border-gray-400 hover:bg-gray-100",
    };

    return (
        <button
            className={clsx(baseStyle, variants[variant], className, {
                "opacity-50 cursor-not-allowed": disabled || loading,
            })}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? "Loading..." : title}
        </button>
    );
}
