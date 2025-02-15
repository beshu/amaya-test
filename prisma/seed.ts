import { PrismaClient, AppName } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.productApp.createMany({
    data: [
      { name: AppName.FARM },
      { name: AppName.ALPHABET },
      { name: AppName.CARS },
      { name: AppName.COLORS },
      { name: AppName.PUZZLE },
    ],
  });

  const apps = await prisma.productApp.findMany();

  // Create product logos
  for (const app of apps) {
    await prisma.productAppLogo.create({
      data: {
        productAppId: app.id,
        logoFileName: `${app.name.toLowerCase()}_logo.png`,
        active: true,
      },
    });
  }

  for (const app of apps) {
    await prisma.review.create({
      data: {
        productAppId: app.id,
        score: Math.floor(Math.random() * 5) + 1, // Random score between 1-5
        text: `Great app for ${app.name.toLowerCase()}!`,
        signature: "User123",
      },
    });
  }
}

main()
  .then(() => console.log("Seeding completed!"))
  .catch((error) => {
    console.error("Seeding error:", error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
