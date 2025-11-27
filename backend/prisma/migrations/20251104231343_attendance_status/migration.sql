-- CreateEnum
CREATE TYPE "attendanceStatus" AS ENUM ('absent', 'present');

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "attendance_status" "attendanceStatus" NOT NULL DEFAULT 'absent';
