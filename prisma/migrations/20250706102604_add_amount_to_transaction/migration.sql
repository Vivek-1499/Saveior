/*
  Warnings:

  - You are about to drop the column `amout` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `amount` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "amout",
ADD COLUMN     "amount" DECIMAL(65,30) NOT NULL;
