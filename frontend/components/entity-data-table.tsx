"use client";

import { ColumnDef } from "@tanstack/react-table";

import { DataTableShell } from "@/components/data-table-shell";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface EntityDataTableProps<TData extends { id: string }, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filterColumn: string;
  filterPlaceholder: string;
  isLoading?: boolean;
  className?: string;
  endpoint: string;
}

export function EntityDataTable<TData extends { id: string }, TValue>({
  columns,
  endpoint,
  data,
  filterColumn,
  filterPlaceholder,
  isLoading = false,
  className,
}: EntityDataTableProps<TData, TValue>) {
  return (
    <section
      className={cn(
        "bg-white rounded-lg border shadow-sm px-0 py-8",
        className
      )}
    >
      {isLoading ? (
        <div className="space-y-4 p-6">
          <Skeleton className="h-9 w-1/3" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        </div>
      ) : (
        <DataTableShell
          columns={columns}
          data={data}
          filterColumn={filterColumn}
          filterPlaceholder={filterPlaceholder}
          midEndpoint={endpoint}
        />
      )}
    </section>
  );
}
