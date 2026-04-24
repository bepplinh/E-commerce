import Button from "@/components/shared/ui/Button";
import ChangeAddress from "./ChangeAddress";

export default function CartReview() {
    return (
        <div className="w-full max-w-[480px]">
            <div className="p-10 border border-black bg-white">
                <h3 className="text-[18px] font-medium uppercase tracking-widest mb-2">
                    Cart totals
                </h3>
                <div className="w-full flex flex-col">
                    {/* SUBTOTAL */}
                    <div className="flex border-b border-gray-200 py-2">
                        <div className="w-2/5 text-[15px] font-medium uppercase text-gray-900">
                            Subtotal
                        </div>
                        <div className="w-3/5 text-[15px] font-medium text-gray-900">
                            $1300
                        </div>
                    </div>

                    {/* SHIPPING */}
                    <div className="flex border-b border-gray-200 py-3">
                        <div className="w-2/5 text-[15px] font-medium uppercase text-gray-900">
                            Shipping
                        </div>
                        <div className="w-3/5 text-[15px] text-gray-800 flex flex-col gap-2">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className="w-[18px] h-[18px] border-2 border-black p-[2px] flex items-center justify-center shrink-0">
                                    <div className="w-full h-full bg-black"></div>
                                </div>
                                <span className="font-medium text-gray-900">
                                    Free shipping
                                </span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className="w-[18px] h-[18px] border border-gray-300 flex items-center justify-center shrink-0"></div>
                                <span>Flat rate: $49</span>
                            </label>

                            <label className="flex items-center gap-3 cursor-pointer">
                                <div className="w-[18px] h-[18px] border border-gray-300 flex items-center justify-center shrink-0"></div>
                                <span>Local pickup: $8</span>
                            </label>

                            <div className="mt-2 flex flex-col items-start gap-2">
                                <span className="text-gray-900">
                                    Shipping to AL.
                                </span>
                                <ChangeAddress />
                            </div>
                        </div>
                    </div>

                    {/* VAT */}
                    <div className="flex border-b border-gray-200 py-2">
                        <div className="w-2/5 text-[15px] font-medium uppercase text-gray-900">
                            VAT
                        </div>
                        <div className="w-3/5 text-[15px] font-medium text-gray-900">
                            $19
                        </div>
                    </div>

                    {/* TOTAL */}
                    <div className="flex pt-3">
                        <div className="w-2/5 text-[15px] font-medium uppercase text-gray-900">
                            Total
                        </div>
                        <div className="w-3/5 text-[15px] font-medium text-gray-900">
                            $1319
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <Button
                    title="PROCEED TO CHECKOUT"
                    variant="primary"
                    className="w-full font-medium tracking-widest py-4"
                />
            </div>
        </div>
    );
}
