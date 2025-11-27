/*
  Warnings:

  - The `date` column on the `Attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `time` column on the `Attendance` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `endDate` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `date` column on the `Event` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Attendance" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "time",
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "endDate",
ADD COLUMN     "endDate" TIMESTAMP(3),
DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Attendance_event_id_time_idx" ON "Attendance"("event_id", "time");
