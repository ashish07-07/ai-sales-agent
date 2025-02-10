/*
  Warnings:

  - Added the required column `itemname` to the `quote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quote" ADD COLUMN     "itemname" TEXT NOT NULL;
