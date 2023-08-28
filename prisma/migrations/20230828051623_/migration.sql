/*
  Warnings:

  - You are about to drop the column `authCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastLoginIp` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastLoginTime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `socialIds` on the `User` table. All the data in the column will be lost.
  - Added the required column `auth_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "authCode",
DROP COLUMN "lastLoginIp",
DROP COLUMN "lastLoginTime",
DROP COLUMN "socialIds",
ADD COLUMN     "auth_code" TEXT NOT NULL,
ADD COLUMN     "last_login_ip" TEXT,
ADD COLUMN     "last_login_time" TIMESTAMP(3),
ADD COLUMN     "social_ids" JSONB DEFAULT '{}';
