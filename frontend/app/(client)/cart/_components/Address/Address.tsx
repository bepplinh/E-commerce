"use client";

import useCartStore from "@/stores/useCartStore";
import { X } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

function Address() {
    const { modalAddress, setModalAddress } = useCartStore(
        useShallow((state) => ({
            modalAddress: state.modalAddress,
            setModalAddress: state.setModalAddress,
        })),
    );

    if (!modalAddress) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                onClick={setModalAddress}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[700px] bg-white rounded-xl shadow-2xl overflow-hidden p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-medium text-gray-900 tracking-tight">
                        Shipping Address
                    </h2>
                    <button
                        onClick={setModalAddress}
                        className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-all active:scale-95"
                    >
                        <X size={24} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Address;
