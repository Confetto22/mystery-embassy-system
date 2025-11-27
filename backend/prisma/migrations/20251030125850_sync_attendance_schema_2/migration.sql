/*
  Warnings:

  - Added the required column `memberType` to the `Guest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `memberType` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Guest" ADD COLUMN     "memberType" "memberType" NOT NULL;

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "memberType" "memberType" NOT NULL;
