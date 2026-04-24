const infoItems = [
    { label: "Weight", value: "1.25 kg" },
    { label: "Dimensions", value: "90 x 60 x 90 cm" },
    { label: "Size", value: "XS, S, M, L, XL" },
    { label: "Color", value: "Black, Orange, White" },
    { label: "Storage", value: "Relaxed fit shirt-style dress with a rugged" },
];

export default function TabAdditionalInfo() {
    return (
        <div className="max-w-2xl">
            <div className="space-y-6">
                {infoItems.map((item) => (
                    <div
                        key={item.label}
                        className="grid grid-cols-[180px_1fr] items-start"
                    >
                        <span className="text-[15px] font-medium text-gray-900">
                            {item.label}
                        </span>
                        <span className="text-[15px] text-gray-500 leading-relaxed">
                            {item.value}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
