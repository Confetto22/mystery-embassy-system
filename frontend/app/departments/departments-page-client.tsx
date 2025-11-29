"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DepartmentForm } from "@/components/departments/department-form";

export function DepartmentsPageClient() {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setFormOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Create Department
      </Button>
      <DepartmentForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSuccess={() => {
          window.location.reload();
        }}
      />
    </>
  );
}

