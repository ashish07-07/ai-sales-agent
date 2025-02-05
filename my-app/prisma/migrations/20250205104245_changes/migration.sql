/*
  Warnings:

  - You are about to drop the `itemdetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "itemdetails";

-- CreateTable
CREATE TABLE "ItemDetails" (
    "id" SERIAL NOT NULL,
    "itemName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageLink" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "sizes" TEXT[],
    "colors" TEXT[],
    "stock" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemDetails_pkey" PRIMARY KEY ("id")
);
