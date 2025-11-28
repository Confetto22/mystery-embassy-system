import { fetchSingleDepartment } from "@/app/actions/departments.action";

const DepartmentDetails = async ({
  params,
}: {
  params: Promise<{ deptId: string }>;
}) => {
  const { deptId } = await params;
  const { data: department } = await fetchSingleDepartment(deptId);
  //   console.log(department);
  return (
    <div>
      <p>{deptId}</p>
    </div>
  );
};

export default DepartmentDetails;
