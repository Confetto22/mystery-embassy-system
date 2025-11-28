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

const DepartmentsPage = async () => {
  const { data: departments, isLoading, isError } = await fetchDepartments({});
  // const [departments, setDepartments] = useState<Department[]>([]);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   let isMounted = true;

  //   const getDepartments = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetchDepartments({});
  //       if (!isMounted) {
  //         return;
  //       }
  //       setDepartments(res.data);
  //     } finally {
  //       if (isMounted) {
  //         setIsLoading(false);
  //       }
  //     }
  //   };
  //   getDepartments();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
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
