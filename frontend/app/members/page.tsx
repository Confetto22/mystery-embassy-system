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

const MembersPage = async () => {
  const { data: members, isLoading, isError } = await fetchMembers({});

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
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

      {/* Table */}
      <EntityDataTable
        columns={columns}
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
