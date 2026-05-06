import { cache } from "react";

const ENDPOINT =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// getFilter: data tĩnh (danh sách filter không thay đổi thường xuyên)
// → dùng revalidate theo thời gian thay vì no-store
export const getFilter = cache(async () => {
    try {
        const res = await fetch(`${ENDPOINT}/products/filter`, {
            next: { revalidate: 60 }, // cache 60 giây, tránh gọi lại mỗi request
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error("[getFilter]", err);
        return null;
    }
});

// getProducts: dynamic data theo searchParams
// → no-store để luôn lấy dữ liệu mới nhất khi filter/page thay đổi
export const getProducts = cache(
    async (searchParams: Record<string, string | string[] | undefined>) => {
        // Xử lý đúng array values (vd: color=red&color=blue)
        const urlParams = new URLSearchParams();
        for (const [key, value] of Object.entries(searchParams)) {
            if (Array.isArray(value)) {
                value.forEach((v) => urlParams.append(key, v));
            } else if (value !== undefined) {
                urlParams.set(key, value);
            }
        }

        try {
            const res = await fetch(
                `${ENDPOINT}/products?${urlParams.toString()}`,
                {
                    cache: "no-store", // dynamic — luôn fetch mới theo URL
                },
            );

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            const data = await res.json();
            return data.data || { products: [], total: 0 };
        } catch (err) {
            console.error("[getProducts]", err);
            return { products: [], total: 0 };
        }
    },
);

export const getProductBySlug = cache(async (slug: string) => {
    try {
        const res = await fetch(`${ENDPOINT}/products/${slug}`, {
            cache: "no-store",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        return data.data;
    } catch (err) {
        console.error("[getProductBySlug]", err);
        return null;
    }
});
