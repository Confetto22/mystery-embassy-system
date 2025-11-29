"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Download, UserPlus } from "lucide-react";
import { DepartmentForm } from "@/components/departments/department-form";
import { AssignHeadDialog } from "@/components/departments/assign-head-dialog";
import { deleteDepartment } from "@/app/actions/departments.action";
import { toast } from "sonner";
import type { Department } from "@/lib/types";

export function DepartmentDetailsClient({
  department,
}: {
  department: Department;
}) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [headDialogOpen, setHeadDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const departmentHead = department.members?.find((m) => m.isHead);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this department?")) {
      return;
    }

    setDeleting(true);
    try {
      await deleteDepartment(department.id);
      toast.success("Department deleted successfully");
      router.push("/departments");
    } catch (error: any) {
      toast.error(error.message || "Failed to delete department");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setHeadDialogOpen(true)}
      >
        <UserPlus className="h-4 w-4" />
        {departmentHead ? "Change Head" : "Assign Head"}
      </Button>
      <Button
        variant="outline"
        className="gap-2"
        onClick={() => setFormOpen(true)}
      >
        <Edit className="h-4 w-4" />
        Edit
      </Button>
      <Button
        variant="outline"
        className="gap-2 text-red-600 hover:text-red-700"
        onClick={handleDelete}
        disabled={deleting}
      >
        <Trash2 className="h-4 w-4" />
        Delete
      </Button>
      <Button variant="outline" className="gap-2">
        <Download className="h-4 w-4" />
        Export
      </Button>
      <DepartmentForm
        open={formOpen}
        onOpenChange={setFormOpen}
        department={department}
        onSuccess={() => {
          router.refresh();
        }}
      />
      <AssignHeadDialog
        open={headDialogOpen}
        onOpenChange={setHeadDialogOpen}
        departmentId={department.id}
        currentHeadId={departmentHead?.id}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </>
  );
}

