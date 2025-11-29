import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Department } from "@/lib/types";
import { fetchDepartments } from "../actions/departments.action";
import { columns } from "./columns";
import { EntityDataTable } from "@/components/entity-data-table";

import { DepartmentsPageClient } from "./departments-page-client";

const DepartmentsPage = async () => {
  const { data: departments, isLoading, isError } = await fetchDepartments({});

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Departments</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DepartmentsPageClient />
        </div>
      </div>

      <EntityDataTable
        columns={columns}
        data={departments}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        isLoading={isLoading}
        endpoint="/departments"
      />
    </main>
  );
};

export default DepartmentsPage;
