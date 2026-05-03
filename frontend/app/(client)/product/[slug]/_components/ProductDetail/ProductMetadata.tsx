interface ProductMetadataProps {
    sku: string;
    categories: string[];
    tags: string[];
}

export default function ProductMetadata({
    sku,
    categories,
    tags,
}: ProductMetadataProps) {
    return (
        <div className="space-y-4 text-sm text-gray-500 uppercase">
            <div>
                <span className="font-medium text-gray-400">SKU:</span>{" "}
                <span className="text-gray-800">{sku}</span>
            </div>
            <div>
                <span className="font-medium text-gray-400">Categories:</span>{" "}
                <span className="text-gray-800">{categories.join(", ")}</span>
            </div>
            <div>
                <span className="font-medium text-gray-400">Tags:</span>{" "}
                <span className="text-gray-800">{tags.join(", ")}</span>
            </div>
        </div>
    );
}
