import { ProductEditForm } from "./_components/ProductEditForm";

// This is a Server Component
export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const isNew = params.id === "new";

  // In a real app, you would fetch data here
  // const product = await getProduct(params.id);
  
  const initialData = {
    name: isNew ? "" : "Nike Air Force 1 '07",
    slug: isNew ? "" : "nike-air-force-1-07",
    description: isNew ? "" : "Classic basketball-inspired sneakers with clean lines and everyday comfort.",
    basePrice: isNew ? 0 : 110,
    categoryId: 1,
    brandId: 1,
    isActive: true,
    images: [
      { url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop", isPrimary: true },
      { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop", isPrimary: false }
    ],
    options: [
      { name: "Color", values: ["White", "Black"] },
      { name: "Size", values: ["39", "40", "41", "42", "43"] }
    ],
    variants: [
      { sku: "AF1-WHT-39", price: 110, stock: 12, attributes: { Color: "White", Size: "39" } },
      { sku: "AF1-WHT-40", price: 110, stock: 8, attributes: { Color: "White", Size: "40" } },
      { sku: "AF1-BLK-39", price: 115, stock: 5, attributes: { Color: "Black", Size: "39" } },
    ]
  };

  return <ProductEditForm initialData={initialData} isNew={isNew} />;
}
