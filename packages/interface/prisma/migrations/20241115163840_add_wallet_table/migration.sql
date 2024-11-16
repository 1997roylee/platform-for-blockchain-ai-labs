/*
  Warnings:

  - You are about to drop the column `walletAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `walletId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "walletAddress",
DROP COLUMN "walletId";

-- CreateTable
CREATE TABLE "wallets" (
    "id" TEXT NOT NULL,
    "wallet_id" VARCHAR(255) NOT NULL,
    "encrypted_seed" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "wallets" ADD CONSTRAINT "wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
