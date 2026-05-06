import { PrismaClient } from '../../generated/prisma/index.js';

/**
 * Product Seeder
 * Connects Brands, Categories, and generates Variants based on Options.
 */
export const seedProducts = async (prisma) => {
  console.log('Seeding products...');

  // 1. Dữ liệu thô (Raw Data)
  const productsData = [
    {
      slug: 'nike-air-force-1-07',
      name: "Nike Air Force 1 '07",
      description: 'The radiance lives on in the Nike Air Force 1 ’07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold colours and the perfect amount of flash to make you shine.',
      basePrice: 110.00,
      brandSlug: 'nike',
      categorySlug: 'mens-shoes',
      primaryImage: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000&auto=format&fit=crop',
      options: {
        'Color': ['White', 'Black'],
        'Size': ['39', '40', '41', '42']
      }
    },
    {
      slug: 'adidas-ultraboost-22',
      name: 'Adidas Ultraboost 22',
      description: 'Running shoes with incredible energy return and a comfortable fit, made in part with Parley Ocean Plastic.',
      basePrice: 190.00,
      brandSlug: 'adidas',
      categorySlug: 'mens-shoes',
      primaryImage: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?q=80&w=1000&auto=format&fit=crop',
      options: {
        'Color': ['Black', 'Grey'],
        'Size': ['40', '41', '42', '43']
      }
    },
    {
      slug: 'zara-slim-fit-chino',
      name: 'Zara Slim Fit Chino',
      description: 'Slim fit trousers made of a stretchy cotton blend. Features front pockets, rear double welt pockets and zip fly and top button fastening.',
      basePrice: 49.90,
      brandSlug: 'zara',
      categorySlug: 'mens-clothing',
      primaryImage: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
      options: {
        'Color': ['Beige', 'Navy'],
        'Size': ['S', 'M', 'L', 'XL']
      }
    },
    {
      slug: 'uniqlo-heattech-tshirt',
      name: 'Uniqlo Heattech Crew Neck T-shirt',
      description: 'Bio-warming, insulating, moisture-wicking, and shape-retaining comfort features. Stretchy fabric with a soft texture.',
      basePrice: 19.90,
      brandSlug: 'uniqlo',
      categorySlug: 'womens-clothing',
      primaryImage: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
      options: {
        'Color': ['White', 'Pink', 'Black'],
        'Size': ['XS', 'S', 'M', 'L']
      }
    },
    {
      slug: 'levis-501-original-jeans',
      name: "Levi's 501 Original Jeans",
      description: 'The blueprint for every jean ever—the 501® Original. With its classic straight leg and iconic styling, they’re literally the blueprint for every pair of jeans in existence.',
      basePrice: 79.50,
      brandSlug: 'levis',
      categorySlug: 'mens-clothing',
      primaryImage: 'https://images.unsplash.com/photo-1602293589930-45aad59ba3ab?q=80&w=1000&auto=format&fit=crop',
      options: {
        'Color': ['Navy', 'Black'],
        'Size': ['S', 'M', 'L', 'XL']
      }
    }
  ];

  // Helper function for Cartesian Product
  const cartesian = (...args) => {
    const r = [], max = args.length - 1;
    function helper(arr, i) {
      for (let j = 0, l = args[i].length; j < l; j++) {
        let a = arr.slice(0);
        a.push(args[i][j]);
        if (i == max) r.push(a);
        else helper(a, i + 1);
      }
    }
    helper([], 0);
    return r;
  };

  for (const pData of productsData) {
    // 2. Tra cứu ID của Brand và Category
    const brand = await prisma.brand.findUnique({ where: { slug: pData.brandSlug } });
    const category = await prisma.category.findUnique({ where: { slug: pData.categorySlug } });

    if (!brand || !category) {
      console.warn(`[!] Skipping ${pData.name}: Brand '${pData.brandSlug}' or Category '${pData.categorySlug}' not found.`);
      continue;
    }

    // 3. Tạo Product
    const product = await prisma.product.upsert({
      where: { slug: pData.slug },
      update: {
        name: pData.name,
        description: pData.description,
        basePrice: pData.basePrice,
        brandId: brand.id,
        categoryId: category.id,
      },
      create: {
        slug: pData.slug,
        name: pData.name,
        description: pData.description,
        basePrice: pData.basePrice,
        brandId: brand.id,
        categoryId: category.id,
      }
    });

    // 4. Tạo Product Image (Primary)
    const existingImage = await prisma.productImage.findFirst({
      where: { productId: product.id, isPrimary: true }
    });

    if (!existingImage) {
      await prisma.productImage.create({
        data: {
          productId: product.id,
          imageUrl: pData.primaryImage,
          isPrimary: true,
          sortOrder: 1
        }
      });
    }

    // 5. Xử lý Options và Values
    const optionNames = Object.keys(pData.options); // ['Color', 'Size']
    const optionValueMap = {}; // { 'Color': { 'White': ID, 'Black': ID } }

    for (const optName of optionNames) {
      // Tìm hoặc tạo Attribute tổng (Màu sắc, Kích thước...)
      const attribute = await prisma.attribute.upsert({
        where: { name: optName },
        update: {},
        create: { name: optName }
      });

      // Tìm hoặc tạo ProductOption cho sản phẩm này
      let productOption = await prisma.productOption.findFirst({
        where: { 
          productId: product.id, 
          attributeId: attribute.id 
        }
      });

      if (!productOption) {
        productOption = await prisma.productOption.create({
          data: { 
            productId: product.id, 
            attributeId: attribute.id 
          }
        });
      }

      optionValueMap[optName] = {};

      for (const valString of pData.options[optName]) {
        // Tìm hoặc tạo OptionValue
        let optionValue = await prisma.optionValue.findFirst({
          where: { optionId: productOption.id, value: valString }
        });

        if (!optionValue) {
          optionValue = await prisma.optionValue.create({
            data: { optionId: productOption.id, value: valString }
          });
        }
        optionValueMap[optName][valString] = optionValue.id;
      }
    }

    // 6. Generate Variants
    // Cấu trúc để generate:
    // array các cặp { name: 'Color', value: 'White', id: 123 }
    const optionGroups = optionNames.map(optName => {
      return pData.options[optName].map(valStr => ({
        name: optName,
        value: valStr,
        id: optionValueMap[optName][valStr]
      }));
    });

    const variantCombinations = cartesian(...optionGroups);

    for (const combo of variantCombinations) {
      // combo là mảng các object: [{ name: 'Color', value: 'White', id: 1 }, { name: 'Size', value: 'M', id: 5 }]
      
      // Tạo SKU: PREFIX-COLOR-SIZE (NK-AF1-WHT-40)
      const brandPrefix = brand.name.substring(0, 3).toUpperCase();
      const productShort = pData.name.replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase();
      
      const optString = combo.map(c => c.value.substring(0, 3).toUpperCase()).join('-');
      const sku = `${brandPrefix}-${productShort}-${optString}`;

      // Upsert Variant
      const variant = await prisma.productVariant.upsert({
        where: { sku: sku },
        update: {
          price: pData.basePrice, // Giả định giá bằng basePrice
          stockQuantity: 50, // Mặc định 50
        },
        create: {
          productId: product.id,
          sku: sku,
          price: pData.basePrice,
          stockQuantity: 50,
        }
      });

      // 7. Tạo quan hệ Variant ↔ OptionValue
      for (const optVal of combo) {
        const existingRelation = await prisma.variantOptionValue.findUnique({
          where: {
            variantId_optionValueId: {
              variantId: variant.id,
              optionValueId: optVal.id
            }
          }
        });

        if (!existingRelation) {
          await prisma.variantOptionValue.create({
            data: {
              variantId: variant.id,
              optionValueId: optVal.id
            }
          });
        }
      }
    }
    
    console.log(`- Seeded ${pData.name} with ${variantCombinations.length} variants.`);
  }

  console.log('Finished seeding products.');
};
