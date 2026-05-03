"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RegisterSchema from "@/schema/RegisterSchema";
import FormField from "@/components/shared/ui/FormField";
import Button from "@/components/shared/ui/Button";
import Link from "next/link";
import { toast } from "sonner";

import { useAuthResponse } from "@/hooks/useAuthResponse";
import { handleRegister } from "@/actions/auth/register";

export default function RegisterForm() {
    const { handleResponse } = useAuthResponse();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
    });

    const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
        try {
            const result = await handleRegister(data);
            handleResponse(result);
        } catch (error) {
            toast.error("An unexpected error occurred");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
                <FormField
                    label="Username"
                    placeholder="Your Username"
                    registration={register("username")}
                    error={errors.username?.message}
                    required
                />

                <FormField
                    label="Email address"
                    type="email"
                    placeholder="your@email.com"
                    registration={register("email")}
                    error={errors.email?.message}
                    required
                />

                <FormField
                    label="Mobile"
                    type="tel"
                    placeholder="0123456789"
                    registration={register("mobile")}
                    error={errors.mobile?.message}
                />

                <FormField
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    registration={register("password")}
                    error={errors.password?.message}
                    required
                />

                <FormField
                    label="Confirm Password"
                    type="password"
                    placeholder="••••••••"
                    registration={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                    required
                />
            </div>

            <p className="text-[13px] text-gray-500 leading-relaxed text-pretty">
                Your personal data will be used to support your experience throughout this website,
                to manage access to your account, and for other purposes described in our{" "}
                <Link href="/privacy-policy" className="underline hover:text-black transition-colors">
                    privacy policy
                </Link>.
            </p>

            <div className="pt-2">
                <Button
                    type="submit"
                    title="REGISTER"
                    className="w-full py-4 text-sm font-bold uppercase tracking-[0.2em] bg-neutral-900 hover:bg-black text-white transition-all duration-200"
                />

                <div className="mt-8 text-center">
                    <p className="text-[13px] font-medium text-gray-500 uppercase tracking-tight">
                        Have an account?{" "}
                        <Link
                            href="/login"
                            className="text-black hover:underline underline-offset-4 decoration-gray-300 hover:decoration-black transition-all"
                        >
                            Login to your Account
                        </Link>
                    </p>
                </div>
            </div>
        </form>
    );
}
