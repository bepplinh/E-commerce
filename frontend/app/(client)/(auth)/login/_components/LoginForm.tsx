"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LoginSchema from "@/schema/LoginSchema";
import FormField from "@/components/shared/ui/FormField";
import Button from "@/components/shared/ui/Button";
import Link from "next/link";
import { toast } from "sonner";
import useAuthStore from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import OrSeparator from "./OrSeparator";
import SocialLogins from "./SocialLogins";

export default function LoginForm() {
    const setIsAuth = useAuthStore((state) => state.setIsAuth);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
    });

    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        console.log("Login data:", data);
        setIsAuth();
        toast.success("Successfully logged in!");
        router.push("/");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
                <FormField
                    label="Email Address"
                    type="email"
                    placeholder="your@email.com"
                    registration={register("email")}
                    error={errors.email?.message}
                    required
                />

                <FormField
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    registration={register("password")}
                    error={errors.password?.message}
                    required
                />
            </div>

            <div className="flex flex-col gap-2 pt-2">
                <Button
                    type="submit"
                    title="Log in"
                    className="w-full py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors"
                />

                <OrSeparator />
                <SocialLogins />

                {/* Secondary Actions */}
                <div className="flex justify-between items-center text-[12px] font-medium tracking-tight uppercase border-t border-gray-100 pt-6">
                    <Link
                        href="/forgot-password"
                        className="text-gray-400 hover:text-black transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-black"
                    >
                        Forgot Password?
                    </Link>
                    <Link
                        href="/register"
                        className="text-gray-400 hover:text-black transition-colors underline underline-offset-4 decoration-gray-200 hover:decoration-black"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </form>
    );
}
