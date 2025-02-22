import { PrismaClient, AppName } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.productApp.createMany({
    data: [
      { name: AppName.FARM, logoFileName: "farm.png" },
      { name: AppName.ALPHABET, logoFileName: "alphabet.png" },
      { name: AppName.CARS, logoFileName: "cars.png" },
      { name: AppName.COLORS, logoFileName: "colors.png" },
      { name: AppName.PUZZLE, logoFileName: "puzzle.png" },
    ],
  });

  const apps = await prisma.productApp.findMany();
  const reviewTexts = [
    "Самое первое приложение у моего сына. Он запомнил звуки животных и научился играть своими пальчиками, вообще без моей помощи!",
    "Хороший способ выучить с ребенком английский алфавит без зубрежки. Очень милый дизайн и классные мини-игры. Однозначно лайк!",
    "Решили купить сборник со всеми видами транспорта. И не зря! Прикольные игры + можно играть без интернета, спасают нас в долгих поездках.",
    "У нас близнецы, любят разные виды транспорта и задания. Можно играть на  нескольких устройствах с одной подпиской, так что больше не деремся за телефон. Один всегда может поиграть на планшете.",
    "Просто, приятно и полезно! Сын-дошкольник любит пробовать разные режимы в раскрасках и даже в сочетании с математикой, когда нужно решать примеры, чтобы подобрать цвет.",
  ];

  const reviewsData = [
    {
      productAppId: apps.find((app) => app.name === AppName.FARM).id,
      score: Math.floor(Math.random() * 5) + 1,
      signature: "Yoga276",
    },
    {
      productAppId: apps.find((app) => app.name == AppName.ALPHABET).id,
      score: Math.floor(Math.random() * 5) + 1,
      signature: "Саша К.",
    },
    {
      productAppId: apps.find((app) => app.name == AppName.CARS).id,
      score: Math.floor(Math.random() * 5) + 1,
      signature: "Виктор",
    },
    {
      productAppId: apps.find((app) => app.name == AppName.PUZZLE).id,
      score: Math.floor(Math.random() * 5) + 1,
      signature: "LoveYourLife",
    },
    {
      productAppId: apps.find((app) => app.name == AppName.COLORS).id,
      score: Math.floor(Math.random() * 5) + 1,
      signature: "LizaM",
    },
  ];

  for (const [i, r] of reviewsData.entries()) {
    await prisma.review.create({
      data: {
        ...r,
        text: reviewTexts[i],
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
