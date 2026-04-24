export default function BagSkeleton() {
    return (
        <div className="w-full animate-pulse">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="uppercase text-[14px] font-medium tracking-widest text-gray-900 border-b border-gray-100">
                        <td className="w-[45%] pb-4 text-left">Product</td>
                        <td className="w-[15%] pb-4 text-left">Price</td>
                        <td className="w-[20%] pb-4 text-left">Quantity</td>
                        <td className="w-[15%] pb-4 text-left">Subtotal</td>
                        <td className="w-[5%] pb-4"></td>
                    </tr>
                </thead>

                <tbody>
                    {[1, 2, 3].map((i) => (
                        <tr key={i} className="border-b border-gray-100">
                            <td className="py-8">
                                <div className="flex items-center gap-8">
                                    <div className="w-[120px] h-[120px] bg-gray-100 shrink-0" />
                                    <div className="flex flex-col gap-3">
                                        <div className="h-4 w-48 bg-gray-100 rounded" />
                                        <div className="h-3 w-24 bg-gray-100 rounded" />
                                        <div className="h-3 w-20 bg-gray-100 rounded" />
                                    </div>
                                </div>
                            </td>
                            <td className="py-8">
                                <div className="h-4 w-12 bg-gray-100 rounded" />
                            </td>
                            <td className="py-8">
                                <div className="w-[110px] h-[45px] bg-gray-50 border border-gray-100 rounded" />
                            </td>
                            <td className="py-8">
                                <div className="h-4 w-16 bg-gray-100 rounded" />
                            </td>
                            <td className="py-8">
                                <div className="h-5 w-5 bg-gray-100 rounded-full ml-auto" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="mt-8 p-4 border-2 border-gray-100 inline-block">
                <div className="flex gap-4 items-center">
                    <div className="h-6 w-64 bg-gray-100 rounded" />
                    <div className="h-6 w-24 bg-gray-100 rounded" />
                </div>
            </div>
        </div>
    );
}
