import { createProductImages, createProductOptions, createProductVariants } from "../../src/modules/product/helpers/transaction.helpers.js";
import { uploadImageSetToCloudinary } from "./cloudinary-upload.helper.js";
import { productsData } from "./product.catalog.data.js";

const cartesian = (groups) => {
  if (!groups.length) return [[]];

  return groups.reduce(
    (acc, group) =>
      acc.flatMap((prefix) => group.map((item) => [...prefix, item])),
    [[]]
  );
};

const normalizeSkuPart = (value) =>
  String(value)
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 12);

const buildSku = (product, attributes, variantIndex) => {
  const brandPrefix = (product.brandSlug ?? "prd").slice(0, 3).toUpperCase();
  const slugPrefix = product.slug
    .split("-")
    .slice(0, 4)
    .map((part) => normalizeSkuPart(part))
    .join("");
  const optionSuffix = Object.values(attributes)
    .map((value) => normalizeSkuPart(value))
    .join("-");

  return [brandPrefix, slugPrefix, optionSuffix, String(variantIndex + 1).padStart(2, "0")]
    .filter(Boolean)
    .join("-")
    .slice(0, 100);
};

const buildVariantImageMap = (product, uploadedImages) => {
  const colorOption = product.options.find((option) => option.name === "Color");
  const colors = colorOption?.values?.map((item) => item.value) ?? [];

  if (colors.length === 0) {
    return new Map([["__default__", uploadedImages[0]]]);
  }

  return new Map(colors.map((color, index) => [color, uploadedImages[index % uploadedImages.length]]));
};

const buildVariants = (product, uploadedImages) => {
  const optionGroups = product.options.map((option) =>
    option.values.map((value) => ({
      optionName: option.name,
      value: value.value,
    }))
  );

  const combinations = cartesian(optionGroups);
  const variantImageMap = buildVariantImageMap(product, uploadedImages);

  return combinations.map((combo, index) => {
    const attributes = Object.fromEntries(combo.map((item) => [item.optionName, item.value]));
    const colorKey = attributes.Color ?? "__default__";
    const primaryVariantImage = variantImageMap.get(colorKey) ?? uploadedImages[0];
    const fallbackImages = uploadedImages.filter((url) => url !== primaryVariantImage).slice(0, 1);
    const variantImages = [primaryVariantImage, ...fallbackImages]
      .filter(Boolean)
      .map((url, imageIndex) => ({
        url,
        isPrimary: imageIndex === 0,
        sortOrder: imageIndex,
      }));

    return {
      sku: buildSku(product, attributes, index),
      price: product.basePrice,
      stockQuantity: product.stockQuantity ?? 40 + ((index + product.slug.length) % 20),
      isActive: true,
      attributes,
      images: variantImages,
    };
  });
};

/**
 * Product Seeder
 * Tạo 50 sản phẩm fashion với ảnh thật được upload lên Cloudinary.
 */
export const seedProducts = async (prisma) => {
  console.log("Seeding products...");

  for (const productData of productsData) {
    const brand = await prisma.brand.findUnique({ where: { slug: productData.brandSlug } });
    const category = await prisma.category.findUnique({ where: { slug: productData.categorySlug } });

    if (!brand || !category) {
      console.warn(
        `[!] Skipping ${productData.name}: Brand '${productData.brandSlug}' or Category '${productData.categorySlug}' not found.`
      );
      continue;
    }

    const publicIdPrefix = `ecommerce/seed/products/${productData.slug}`;
    const uploadedImages = await uploadImageSetToCloudinary(productData.imageUrls, publicIdPrefix);
    const variants = buildVariants(productData, uploadedImages);

    await prisma.$transaction(async (tx) => {
      const existingProduct = await tx.product.findUnique({
        where: { slug: productData.slug },
        select: { id: true },
      });

      if (existingProduct) {
        await tx.product.delete({
          where: { id: existingProduct.id },
        });
      }

      const product = await tx.product.create({
        data: {
          slug: productData.slug,
          name: productData.name,
          description: productData.description,
          basePrice: productData.basePrice,
          brandId: brand.id,
          categoryId: category.id,
          isActive: true,
        },
      });

      await createProductImages(
        tx,
        product.id,
        uploadedImages.map((url, index) => ({
          url,
          isPrimary: index === 0,
          sortOrder: index,
        }))
      );

      const optionValueMap = await createProductOptions(tx, product.id, productData.options);
      await createProductVariants(tx, product.id, variants, optionValueMap);
    });

    console.log(`- Seeded ${productData.name} with ${variants.length} variants.`);
  }

  console.log("Finished seeding products.");
};
