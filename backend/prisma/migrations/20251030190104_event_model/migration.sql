/*
  Warnings:

  - You are about to drop the column `service_id` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the `Service` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Attendance" DROP CONSTRAINT "Attendance_service_id_fkey";

-- DropIndex
DROP INDEX "public"."Attendance_service_id_time_idx";

-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "service_id";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "startDate",
ADD COLUMN     "date" TEXT NOT NULL,
ALTER COLUMN "endDate" DROP NOT NULL,
ALTER COLUMN "endDate" SET DATA TYPE TEXT,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "public"."Service";
