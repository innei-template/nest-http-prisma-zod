/*
  Warnings:

  - The primary key for the `ApiToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `OAuth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "ApiToken" DROP CONSTRAINT "ApiToken_userId_fkey";

-- DropForeignKey
ALTER TABLE "OAuth" DROP CONSTRAINT "OAuth_userId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "ApiToken" DROP CONSTRAINT "ApiToken_pkey",
ALTER COLUMN "id" SET DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ApiToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ApiToken_id_seq";

-- AlterTable
ALTER TABLE "OAuth" DROP CONSTRAINT "OAuth_pkey",
ALTER COLUMN "id" SET DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "OAuth_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "OAuth_id_seq";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "id" SET DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Post_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" SET DEFAULT '',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "ApiToken" ADD CONSTRAINT "ApiToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
