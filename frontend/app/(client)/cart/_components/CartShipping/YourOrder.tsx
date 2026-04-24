function YourOrder() {
    return (
        <div className="w-full">
            <div className="p-8 border border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.05)]">
                <h3 className="text-[20px] font-medium uppercase tracking-[0.2em] mb-8 pb-4 border-b-2 border-black/5">
                    Your Order
                </h3>

                <div className="space-y-6">
                    {/* Header Row */}
                    <div className="flex justify-between items-center text-[11px] font-medium uppercase tracking-widest text-black/40 pb-2 border-b border-black/10">
                        <span>Product</span>
                        <span>Total</span>
                    </div>

                    {/* ITEM LIST */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-start group">
                            <div className="flex flex-col">
                                <span className="text-[15px] font-medium text-gray-900 group-hover:text-black transition-colors">
                                    Zessi Dresses{" "}
                                    <span className="text-xs text-gray-400 font-normal">
                                        x2
                                    </span>
                                </span>
                            </div>
                            <span className="text-[15px] font-medium text-gray-900">
                                $65.00
                            </span>
                        </div>

                        <div className="flex justify-between items-start group">
                            <div className="flex flex-col">
                                <span className="text-[15px] font-medium text-gray-900 group-hover:text-black transition-colors">
                                    Kirby T-Shirt
                                </span>
                            </div>
                            <span className="text-[15px] font-medium text-gray-900">
                                $29.90
                            </span>
                        </div>
                    </div>

                    {/* CALCULATION SECTION */}
                    <div className="pt-6 border-t-2 border-black space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-[13px] font-medium uppercase tracking-wider text-black/60">
                                Subtotal
                            </span>
                            <span className="text-[15px] font-medium text-gray-900">
                                $94.90
                            </span>
                        </div>

                        <div className="flex justify-between items-start">
                            <span className="text-[13px] font-medium uppercase tracking-wider text-black/60">
                                Shipping
                            </span>
                            <div className="text-right">
                                <span className="text-[15px] font-medium text-black">
                                    Free Shipping
                                </span>
                                <p className="text-[10px] text-gray-400 uppercase tracking-tighter mt-1">
                                    Standard Delivery
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-between items-center">
                            <span className="text-[13px] font-medium uppercase tracking-wider text-black/60">
                                VAT (10%)
                            </span>
                            <span className="text-[15px] font-medium text-gray-900">
                                $9.49
                            </span>
                        </div>
                    </div>

                    {/* TOTAL */}
                    <div className="pt-6 border-t border-black/10">
                        <div className="flex justify-between items-end">
                            <div className="flex flex-col">
                                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-black/30 mb-1">
                                    Final Amount
                                </span>
                                <span className="text-[14px] font-medium uppercase tracking-widest text-black">
                                    Total
                                </span>
                            </div>
                            <span className="text-2xl font-black text-black tracking-tighter">
                                $104.39
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default YourOrder;
