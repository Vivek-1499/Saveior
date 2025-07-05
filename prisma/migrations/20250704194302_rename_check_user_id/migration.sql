/*
  Warnings:

  - You are about to drop the column `checkUserId` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkUserId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkUserId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_checkUserId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "checkUserId",
ADD COLUMN     "clerkUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "users_clerkUserId_key" ON "users"("clerkUserId");
