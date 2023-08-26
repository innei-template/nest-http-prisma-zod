/*
  Warnings:

  - You are about to drop the column `authorId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `text` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `authCode` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "published",
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "text" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "authCode" TEXT NOT NULL,
ADD COLUMN     "avatar" TEXT,
ADD COLUMN     "introduce" TEXT,
ADD COLUMN     "lastLoginIp" TEXT,
ADD COLUMN     "lastLoginTime" TIMESTAMP(3),
ADD COLUMN     "mail" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "socialIds" JSONB,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "ApiToken" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "created" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "expired" TIMESTAMP(3),
    "name" TEXT NOT NULL,

    CONSTRAINT "ApiToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OAuth" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "oauthId" TEXT NOT NULL,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiToken_name_key" ON "ApiToken"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_slug_idx" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "modified" ON "Post"("created");

-- CreateIndex
CREATE INDEX "text" ON "Post"("text");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "ApiToken" ADD CONSTRAINT "ApiToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
