
import prisma from '../src/config/prisma.js';

async function main() {
  const user = await prisma.user.findFirst();
  const variant = await prisma.productVariant.findFirst({
    where: { stockQuantity: { gt: 0 } }
  });
  console.log(JSON.stringify({ user, variant }, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
