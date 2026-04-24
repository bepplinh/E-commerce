import { Check } from "lucide-react";

export default function Confirmation() {
    return (
        <div className="flex flex-col gap-7 items-center mx-auto max-w-[760px]">
            <div>
                <div className="flex flex-col items-center gap-5">
                    <div className="flex items-center justify-center w-[70px] h-[70px] rounded-full bg-[#B9A16B] relative">
                        <Check className="text-white" size={35} />
                    </div>

                    <div className="flex flex-col items-center">
                        <h3 className="font-medium text-[35px]">
                            Your order is completed!
                        </h3>
                        <p className="text-[#767676]">
                            Thank you. Your order has been received.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-8 flex justify-between w-full border-dashed border-2 border-gray-500">
                <div className="flex flex-1 flex-col gap-2">
                    <label className="text-[#767676]" htmlFor="">
                        Order Number
                    </label>
                    <span className="font-medium">13119</span>
                </div>

                <div className="flex flex-1 flex-col gap-2 ">
                    <label className="text-[#767676]" htmlFor="">
                        Date
                    </label>
                    <span className="font-medium">27/10/2023</span>
                </div>

                <div className="flex flex-1 flex-col gap-2 ">
                    <label className="text-[#767676]" htmlFor="">
                        Total
                    </label>
                    <span className="font-medium">$81.40</span>
                </div>

                <div className="flex flex-1 flex-col gap-2 ">
                    <label className="text-[#767676]" htmlFor="">
                        Payment Method
                    </label>
                    <span className="font-medium">Direct Bank Transfer</span>
                </div>
            </div>

            <div className="border border-gray-400 w-full px-8 py-8">
                <h3 className="mb-8 font-medium uppercase tracking-wider">
                    Order Details
                </h3>
                <div className="flex flex-col">
                    {/* Header Row */}
                    <div className="flex justify-between border-b border-gray-400 pb-4 mb-4 text-xs font-medium uppercase tracking-widest text-black">
                        <span>Product</span>
                        <span>Subtotal</span>
                    </div>

                    {/* Product Rows */}
                    <div className="flex flex-col gap-4 border-b border-gray-200 pb-4 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-[#333]">
                                Zessi Dresses x 2
                            </span>
                            <span className="font-medium">$32.50</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-[#333]">Kirby T-Shirt</span>
                            <span className="font-medium">$29.90</span>
                        </div>
                    </div>

                    {/* Pricing Summary */}
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium uppercase text-[11px] tracking-widest">
                                Subtotal
                            </span>
                            <span className="font-medium">$62.40</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-gray-100">
                            <span className="font-medium uppercase text-[11px] tracking-widest whitespace-nowrap">
                                Shipping
                            </span>
                            <span className="text-[#333] text-sm">
                                Free shipping
                            </span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="font-medium uppercase text-[11px] tracking-widest">
                                Vat
                            </span>
                            <span className="font-medium">$19</span>
                        </div>
                        <div className="flex justify-between items-center pt-6">
                            <span className="font-medium uppercase text-[13px] tracking-[0.15em]">
                                Total
                            </span>
                            <span className="font-medium text-xl">$81.40</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
