function ProductCardSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="bg-gray-200 h-[290px] w-full mb-3" />
            <div className="flex justify-between items-center mb-1">
                <div className="h-4 bg-gray-200 w-16" />
                <div className="h-4 bg-gray-200 w-4 rounded-full" />
            </div>
            <div className="h-5 bg-gray-200 w-3/4 mb-2" />
            <div className="h-5 bg-gray-200 w-1/4 mb-4" />
            <div className="flex items-center gap-2">
                <div className="h-3 bg-gray-200 w-12" />
                <div className="h-3 bg-gray-200 w-20" />
            </div>
        </div>
    );
}

export default function ProductGridSkeleton({
    view,
}: {
    view: number;
}) {
    const gridClass =
        view === 2 ? "grid-cols-2" : view === 3 ? "grid-cols-3" : "grid-cols-4";

    return (
        <div className={`mt-8 grid ${gridClass} gap-x-8 gap-y-12`}>
            {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
            ))}
        </div>
    );
}
