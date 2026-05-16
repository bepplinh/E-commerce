export interface ProductImage {
    imageUrl: string;
    isPrimary: boolean;
}

export interface Product {
    id: number;
    name: string;
    slug: string;
    basePrice: number;
    brand?: {
        name: string;
        slug: string;
    };
    category: {
        name: string;
        slug: string;
    };
    images: ProductImage[];
    averageRating: number;
    reviewCount: number;
    colors: string[];
    variants?: any[];
}
