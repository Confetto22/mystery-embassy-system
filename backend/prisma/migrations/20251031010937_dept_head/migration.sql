/*
  Warnings:

  - Made the column `isHead` on table `Member` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "isHead" SET NOT NULL,
ALTER COLUMN "isHead" SET DEFAULT false;
