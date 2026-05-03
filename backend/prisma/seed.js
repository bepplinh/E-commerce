import { PrismaClient } from '../generated/prisma/index.js';
import { seedBrands } from './seeders/brand.seeder.js';
import { seedCategories } from './seeders/category.seeder.js';
import { seedProducts } from './seeders/product.seeder.js';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Start Seeding ---');
  
  try {
    await seedBrands(prisma);
    await seedCategories(prisma);
    await seedProducts(prisma);
    
    console.log('--- Seeding Completed Successfully ---');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
