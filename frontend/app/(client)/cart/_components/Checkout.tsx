import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ShippingDetailSchema from "@/schema/ShippingDetailSchema";

import FormField from "@/components/shared/ui/FormField";

export default function Checkout() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof ShippingDetailSchema>>({
        resolver: zodResolver(ShippingDetailSchema),
    });

    const onSubmit = (data: z.infer<typeof ShippingDetailSchema>) => {
        console.log(data);
    };

    return (
        <div className="w-full">
            <h2 className="text-[18px] font-medium mb-8 uppercase tracking-widest text-[#1a1a1a]">
                Shipping details
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Row 1: Full Name, Phone Number */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <FormField
                        label="Landmark"
                        registration={register("landmark")}
                        error={errors.landmark?.message}
                    />
                </div>
            </form>
        </div>
    );
}
