"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/libs/utils";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps {
    label: string;
    placeholder?: string;
    error?: string;
    registration: UseFormRegisterReturn;
    className?: string;
    type?: string;
    required?: boolean;
}

export default function FormField({
    label,
    placeholder,
    error,
    registration,
    className,
    type = "text",
    required = false,
}: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordField = type === "password";
    const currentType = isPasswordField
        ? showPassword
            ? "text"
            : "password"
        : type;

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <div className={cn("flex flex-col gap-1 w-full", className)}>
            <div className="relative group">
                <fieldset
                    className={cn(
                        "border-2 rounded-none px-4 pb-2 pt-0 transition-all duration-200 bg-white",
                        error
                            ? "border-red-400"
                            : "border-gray-200 focus-within:border-black group-hover:border-gray-400",
                    )}
                >
                    <legend
                        className={cn(
                            "text-[12px] font-medium  px-2 ml-[-4px] uppercase tracking-widest transition-colors duration-200",
                            error
                                ? "text-red-400"
                                : "text-gray-500 group-hover:text-gray-600 focus-within:text-black group-focus-within:text-black",
                        )}
                    >
                        {label}
                        {required || registration.required ? (
                            <span className="text-gray-400 ml-1 italic">*</span>
                        ) : null}
                    </legend>

                    <div className="flex items-center gap-2">
                        <input
                            {...registration}
                            type={currentType}
                            placeholder={placeholder}
                            autoComplete={
                                type === "password" ? "current-password" : "on"
                            }
                            className="w-full bg-transparent outline-none text-[15px] font-medium text-black h-8 placeholder:text-gray-300"
                        />

                        {isPasswordField ? (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="text-gray-400 hover:text-black transition-colors focus:outline-none"
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword ? (
                                    <EyeOff size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        ) : null}
                    </div>
                </fieldset>
            </div>
            {error ? (
                <span className="text-[11px] text-red-500 font-medium uppercase tracking-wider ml-1 mt-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </span>
            ) : null}
        </div>
    );
}
