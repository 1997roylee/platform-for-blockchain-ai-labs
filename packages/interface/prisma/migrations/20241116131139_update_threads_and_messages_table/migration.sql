/*
  Warnings:

  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `_ThreadToUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Thread` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_userId_fkey";

-- DropForeignKey
ALTER TABLE "_ThreadToUser" DROP CONSTRAINT "_ThreadToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_ThreadToUser" DROP CONSTRAINT "_ThreadToUser_B_fkey";

-- DropIndex
DROP INDEX "Message_userId_idx";

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "Thread" ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ThreadToUser";

-- AddForeignKey
ALTER TABLE "Thread" ADD CONSTRAINT "Thread_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
