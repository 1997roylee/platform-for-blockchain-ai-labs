/*
  Warnings:

  - You are about to drop the column `wallet` on the `User` table. All the data in the column will be lost.
  - Added the required column `walletAddress` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `walletId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "wallet",
ADD COLUMN     "walletAddress" TEXT NOT NULL,
ADD COLUMN     "walletId" TEXT NOT NULL;
