/**
 * Brand Seeder
 * Focuses on Fashion Brands
 */
export const seedBrands = async (prisma) => {
  const brands = [
    { name: 'Nike', slug: 'nike', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    { name: 'Adidas', slug: 'adidas', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
    { name: 'Puma', slug: 'puma', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/88/Puma_Logo.svg' },
    { name: 'Gucci', slug: 'gucci', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/79/1920s_Gucci_Logo.svg' },
    { name: 'Chanel', slug: 'chanel', logoUrl: 'https://upload.wikimedia.org/wikipedia/en/9/92/Chanel_logo_interlocking_cs.svg' },
    { name: 'Louis Vuitton', slug: 'louis-vuitton', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Louis_Vuitton_logo_and_wordmark.svg' },
    { name: 'Zara', slug: 'zara', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg' },
    { name: 'H&M', slug: 'hm', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg' },
    { name: 'Uniqlo', slug: 'uniqlo', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/92/UNIQLO_logo.svg' },
    { name: 'Levi\'s', slug: 'levis', logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Levi%27s_logo.svg' },
  ];

  console.log('Seeding brands...');

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: brand,
      create: brand,
    });
  }

  console.log(`Seeded ${brands.length} brands.`);
};
