-- CreateEnum
CREATE TYPE "eventType" AS ENUM ('regular', 'occasion');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "eventType" "eventType" NOT NULL DEFAULT 'regular';

-- DropEnum
DROP TYPE "public"."Role";
