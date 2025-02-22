-- CreateEnum
CREATE TYPE "AppName" AS ENUM ('FARM', 'ALPHABET', 'CARS', 'COLORS', 'PUZZLE');

-- CreateTable
CREATE TABLE "ProductApp" (
    "id" SERIAL NOT NULL,
    "name" "AppName" NOT NULL,
    "logoFileName" TEXT NOT NULL,

    CONSTRAINT "ProductApp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productAppId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "text" TEXT,
    "signature" TEXT NOT NULL DEFAULT 'Anonymous',

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductApp_name_key" ON "ProductApp"("name");

-- CreateIndex
CREATE INDEX "Review_signature_idx" ON "Review"("signature");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productAppId_fkey" FOREIGN KEY ("productAppId") REFERENCES "ProductApp"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
