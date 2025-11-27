/*
  Warnings:

  - Added the required column `gender` to the `Member` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "gender" AS ENUM ('male', 'female');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "gender" "gender" NOT NULL;
