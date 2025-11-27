/*
  Warnings:

  - You are about to drop the column `guest_phone` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the `Guest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `memberType` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_guest_phone_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "guest_phone",
ADD COLUMN     "memberType" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Guest";
