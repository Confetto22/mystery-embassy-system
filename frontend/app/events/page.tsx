import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import Link from "next/link";
import { EntityDataTable } from "@/components/entity-data-table";
import { columns } from "./columns";
import { fetchEvents } from "../actions/events.action";

export default async function EventsPage() {
  const { data: events, isLoading, isError } = await fetchEvents();
  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Events</h1>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Events</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <EntityDataTable
        columns={columns}
        data={events}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        isLoading={isLoading}
        endpoint="/events"
      />
    </main>
  );
}
