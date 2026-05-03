/**
 * Category Seeder
 * Focuses on Fashion Categories
 */
export const seedCategories = async (prisma) => {
  const categories = [
    {
      name: 'Fashion',
      slug: 'fashion',
      description: 'Clothing, shoes, and accessories for everyone',
      children: [
        {
          name: 'Men\'s Fashion',
          slug: 'mens-fashion',
          children: [
            { name: 'Clothing', slug: 'mens-clothing' },
            { name: 'Shoes', slug: 'mens-shoes' },
            { name: 'Accessories', slug: 'mens-accessories' },
          ],
        },
        {
          name: 'Women\'s Fashion',
          slug: 'womens-fashion',
          children: [
            { name: 'Clothing', slug: 'womens-clothing' },
            { name: 'Shoes', slug: 'womens-shoes' },
            { name: 'Bags', slug: 'womens-bags' },
            { name: 'Accessories', slug: 'womens-accessories' },
          ],
        },
        {
          name: 'Unisex Fashion',
          slug: 'unisex-fashion',
        },
        {
          name: 'Kids\' Fashion',
          slug: 'kids-fashion',
        },
      ],
    },
  ];

  console.log('Seeding categories...');

  const upsertCategory = async (category, parentId = null) => {
    const { children, ...data } = category;
    
    const upserted = await prisma.category.upsert({
      where: { slug: data.slug },
      update: {
        ...data,
        parentId,
      },
      create: {
        ...data,
        parentId,
      },
    });

    if (children && children.length > 0) {
      for (const child of children) {
        await upsertCategory(child, upserted.id);
      }
    }
  };

  for (const category of categories) {
    await upsertCategory(category);
  }

  console.log('Seeded categories hierarchy.');
};
