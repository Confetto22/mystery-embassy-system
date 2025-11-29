import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { fetchMembers } from "../actions/members.action";
import type { Member } from "@/lib/types";
import { EntityDataTable } from "@/components/entity-data-table";
import { columns } from "./columns";
import { MembersPageClient } from "./members-page-client";
import { fetchDepartments } from "../actions/departments.action";
import type { ColumnDef } from "@tanstack/react-table";

const MembersPage = async () => {
  const { data: members, isLoading, isError } = await fetchMembers({});
  const { data: departments } = await fetchDepartments({});

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Members</h1>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Members</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <MembersPageClient depts={departments} />
        </div>
      </div>

      {/* Table */}
      <EntityDataTable
        columns={columns as ColumnDef<Member & { id: string }, unknown>[]}
        data={members}
        filterColumn="firstname"
        filterPlaceholder="Filter by first name..."
        isLoading={isLoading}
        endpoint="/members"
      />
    </main>
  );
};

export default MembersPage;
