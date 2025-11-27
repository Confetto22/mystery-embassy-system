/*
  Warnings:

  - You are about to drop the column `guest_id` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `member_id` on the `Attendance` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_guest_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_member_id_fkey";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "guest_id",
DROP COLUMN "member_id",
ADD COLUMN     "guest_phone" TEXT,
ADD COLUMN     "member_phone" TEXT;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_member_phone_fkey" FOREIGN KEY ("member_phone") REFERENCES "Member"("phone") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_guest_phone_fkey" FOREIGN KEY ("guest_phone") REFERENCES "Guest"("phone") ON DELETE SET NULL ON UPDATE CASCADE;
