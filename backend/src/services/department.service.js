import { prisma } from "../db/db.js";

export const addDepartmentService = async (deptData) => {
  const { name } = deptData;
  // Check existence of dept
  const foundDept = await prisma.department.findUnique({
    where: {
      name,
    },
  });
  if (!foundDept) {
    const newDept = await prisma.department.create({
      data: deptData,
    });
    return { message: `${name} department added successfully!`, data: newDept };
  } else {
    throw new Error("Department already exists!");
  }
};

export const allDepartmentService = async () => {
  const departments = await prisma.department.findMany({
    include: {
      _count: { select: { members: true } },
      members: {
        where: {
          isHead: true,
        },
        select: {
          isHead: true,
          firstname: true,
          lastname: true,
        },
      },
    },
  });
  return { message: "All departments", data: departments };
};

export const singleDepartmentService = async ({ id }) => {
  // Check existence of department

  const department = await prisma.department.findFirst({
    where: {
      id,
    },
    include: {
      members: true,
    },
  });
  if (department) {
    const deptHead = await prisma.department.findFirst({
      where: {
        id,
      },
      include: {
        members: {
          where: { isHead: true },
        },
      },
    });
    return {
      message: `${department.name}`,
      data: department,
      hod: deptHead.members[0],
    };
  }
  throw new Error("Department does not exist!");
};

export const updateDepartmentService = async ({ id }, updateData) => {
  // Check existence of department

  const department = await prisma.department.findFirst({
    where: {
      id,
    },
  });
  if (!department) {
    throw new Error("Department does not exist!");
  }
  const updatedDepartment = await prisma.department.update({
    where: {
      id,
    },
    data: updateData,
  });
  return {
    message: "Department updated successfully!",
    data: updatedDepartment,
  };
};

export const addMemberDeptService = async ({ id }, { memberId }) => {
  // Check if Member & department exists
  const foundMember = await prisma.member.findUnique({
    where: { id: memberId },
    // include: { department: true },
  });

  if (!foundMember) {
    throw new Error("member does not exist!");
  }

  // Check if department exists
  const foundDept = await prisma.department.findUnique({
    where: { id },
  });

  if (!foundDept) {
    throw new Error("Department does not exist!");
  }

  // Check if member does not belong to another department already?
  // And add a prompt as to whether they are sure they want to update him/her
  const diffDept = await prisma.member.findFirst({
    where: {
      AND: [
        {
          id: foundMember.id,
        },
        {
          department_id: {
            not: foundDept.id,
          },
        },
      ],
    },
  });

  // Extract the actual department the member already belongs in
  if (diffDept) {
    const actualDept = await prisma.department.findFirst({
      where: {
        id: diffDept.department_id,
      },
    });
    throw new Error(
      `${foundMember.firstname} already belongs to the ${actualDept.name}`
    );
  }

  // Check if person is a church member first. Visitors can't join departments
  if (foundMember.memberType === "visitor") {
    throw new Error("Visitors cannot join a department!");
  }

  if (!foundMember) {
    throw new Error("Member not found");
  }

  if (!foundDept) {
    throw new Error("Department not found");
  }

  // Check if member is already in this department
  if (foundMember.department_id === id) {
    throw new Error(
      `${foundMember.firstname} is already in ${foundDept.name} department`
    );
  }

  // Update member's department

  const updatedMember = await prisma.member.update({
    where: { id: memberId },
    data: { department_id: id },
  });

  return {
    message: `${foundMember.firstname} added to ${foundDept.name} successfully`,
    data: updatedMember,
  };
};

export const deleteDeptService = async ({ id }) => {
  // Check existence of department
  const department = await prisma.department.delete({
    where: {
      id,
    },
  });
  if (!department) {
    throw new Error("Department does not exist!");
  }
};

// Remove member from department
// api/departments/:deptId/:/memberId

export const removeMemberDeptService = async ({ deptId, memberId }) => {
  // check if member exists
  const member = await prisma.member.findFirst({
    where: {
      id: memberId,
    },
  });
  if (!member) {
    throw new Error("Member does not exist!");
  }

  // Check existence of department
  const department = await prisma.member.findFirst({
    where: {
      id: deptId,
    },
  });
  if (!department) {
    throw new Error("Department does not exist!");
  }

  // check if member belongs to that department
  const memberBelongs = await prisma.member.findFirst({
    where: {
      AND: [
        {
          id: member.id,
        },
        {
          department_id: department.id,
        },
      ],
    },
  });
  if (!memberBelongs) {
    throw new Error(
      `${member?.firstname || "Person"} is not a member of this department`
    );
  }
  const removedMember = await prisma.member.update({
    where: {
      id: memberId,
    },
    data: {
      department_id: null,
    },
  });
  return {
    message: `${member.firstname} removed from ${department.name} successfully`,
    data: removedMember,
  };
};
