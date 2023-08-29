/*
  Warnings:

  - A unique constraint covering the columns `[slug,categoryId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CategoryType" AS ENUM ('Category', 'Tag');

-- DropIndex
DROP INDEX "Post_slug_key";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categoryId" TEXT NOT NULL,
ALTER COLUMN "slug" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL,
    "type" "CategoryType" NOT NULL DEFAULT 'Category',
    "slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "slugIndex" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_categoryId_key" ON "Post"("slug", "categoryId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
