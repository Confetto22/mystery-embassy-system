/*
  Warnings:

  - You are about to drop the column `memberType` on the `Guest` table. All the data in the column will be lost.
  - You are about to drop the column `memberType` on the `Member` table. All the data in the column will be lost.
  - Added the required column `address` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstname` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastname` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "firstname" TEXT NOT NULL,
ADD COLUMN     "lastname" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Guest" DROP COLUMN "memberType";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "memberType";
