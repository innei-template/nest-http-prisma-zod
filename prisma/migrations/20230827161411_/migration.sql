/*
  Warnings:

  - You are about to drop the column `created` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "modified";

-- AlterTable
ALTER TABLE "ApiToken" ALTER COLUMN "created" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "created",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ALTER COLUMN "socialIds" SET DEFAULT '{}';

-- CreateIndex
CREATE INDEX "Post_created_at_idx" ON "Post"("created_at");
