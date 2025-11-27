/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "phone" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_phone_key" ON "Attendance"("phone");
