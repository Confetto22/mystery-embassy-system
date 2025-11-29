import { fetchSingleDepartment } from "@/app/actions/departments.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, Edit, Trash2, Download, Award } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { DepartmentDetailsClient } from "./department-details-client";

const DepartmentDetails = async ({
  params,
}: {
  params: Promise<{ deptId: string }>;
}) => {
  const { deptId } = await params;
  const { data: department } = await fetchSingleDepartment(deptId);

  if (!department) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 justify-center items-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Department Not Found</h1>
          <p className="text-gray-500 mb-4">
            The department you are looking for does not exist.
          </p>
          <Button asChild>
            <Link href="/departments">Go Back to Departments</Link>
          </Button>
        </div>
      </main>
    );
  }

  const departmentHead = department.members?.find((m) => m.isHead);
  const regularMembers = department.members?.filter((m) => !m.isHead) || [];

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="space-y-2">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/dashboard">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/departments">Departments</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{department.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: department.color || "#3b82f6" }}
                />
                <h1 className="text-3xl font-bold text-gray-900">
                  {department.name}
                </h1>
              </div>
              <p className="text-gray-600 mb-4">{department.description}</p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>
                    {department._count?.members || department.members?.length || 0}{" "}
                    Member
                    {(department._count?.members || department.members?.length || 0) !== 1
                      ? "s"
                      : ""}
                  </span>
                </div>
                {departmentHead && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Award className="h-4 w-4" />
                    <span>
                      Head: {departmentHead.firstname} {departmentHead.lastname}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <DepartmentDetailsClient department={department} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle>Department Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Name</p>
              <p className="font-semibold text-gray-900">{department.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Description</p>
              <p className="font-semibold text-gray-900">
                {department.description || "No description"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Established</p>
              <p className="font-semibold text-gray-900">
                {format(new Date(department.created_at), "PPP")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Members</p>
              <p className="font-semibold text-gray-900">
                {department._count?.members || department.members?.length || 0}
              </p>
            </div>
          </CardContent>
        </Card>

        {department.members && department.members.length > 0 && (
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle>
                Members ({department.members.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentHead && (
                    <TableRow>
                      <TableCell className="font-medium">
                        {departmentHead.firstname} {departmentHead.lastname}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{departmentHead.memberType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="bg-yellow-100 text-yellow-800 border-yellow-200"
                        >
                          Head
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )}
                  {regularMembers.slice(0, 4).map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/members/${member.id}`}
                          className="hover:underline"
                        >
                          {member.firstname} {member.lastname}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.memberType}</Badge>
                      </TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {regularMembers.length > 4 && (
                <div className="mt-4 text-center">
                  <Button variant="outline" asChild>
                    <Link href={`/members?departmentId=${department.id}`}>
                      View All Members
                    </Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
};

export default DepartmentDetails;
