-- DropForeignKey
ALTER TABLE "public"."Member" DROP CONSTRAINT "Member_department_id_fkey";

-- AlterTable
ALTER TABLE "Member" ALTER COLUMN "department_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Member" ADD CONSTRAINT "Member_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Department"("id") ON DELETE SET NULL ON UPDATE CASCADE;
