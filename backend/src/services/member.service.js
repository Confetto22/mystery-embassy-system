import { prisma } from "../db/db.js";

export const addMemberService = async (memberData) => {
  const { department, ...cleanedMemberData } = memberData;
  let department_id = null;
  //   Input validation
  if (
    !memberData.firstname.trim() ||
    memberData.firstname.length <= 2 ||
    !memberData.lastname.trim() ||
    memberData.lastname.length <= 2
  ) {
    throw new Error("Enter a valid firstname/lastname!");
  }

  // Check if department exists

  if (department) {
    const existingDept = await prisma.department.findUnique({
      where: {
        name: department.trim().toLowerCase(),
      },
    });
    if (!existingDept) {
      throw new Error("There is no such department!");
    } else {
      department_id = existingDept.id;
    }
  }

  // Check if member exists already
  const foundMember = await prisma.member.findUnique({
    where: { phone: memberData.phone.trim() },
  });
  if (!foundMember) {
    const newMember = await prisma.member.create({
      data: {
        ...cleanedMemberData,
        // isHead: false,
        department_id: department_id || null,
      },
    });
    return {
      message: `${memberData.firstname} is now an ambassador!`,
      data: newMember,
    };
  } else {
    throw new Error("Member already exists!");
  }
};

export const allMemberService = async () => {
  const members = await prisma.member.findMany({
    include: {
      department: true,
    },
  });

  return { message: "All records", data: members };
};

export const filterMembersService = async (filters = {}) => {
  const where = {};
  if (filters.firstname) where.firstname = filters.firstname;
  if (filters.memberType) where.memberType = filters.memberType;
  if (filters.lastname) where.lastname = filters.lastname;
  if (filters.departmentId) where.departmentId = filters.departmentId;
  if (filters.address) where.address = filters.address;
  if (filters.phone) where.phone = filters.phone;

  const filteredMembers = await prisma.member.findMany({
    where,
    include: {
      department: true,
    },
  });

  return { message: "Filtered members records", data: filteredMembers };
};

export const singleMemberService = async ({ id }) => {
  // Check existence of member
  const member = await prisma.member.findUnique({
    where: {
      id,
    },
  });
  if (!member) {
    throw new Error("member does not exist!");
  }
  return { message: `${member.firstname} member data`, data: member };
};

export const updateMemberService = async ({ id }, updateData) => {
  // Check existence of member
  const memberExistence = await prisma.member.findUnique({ where: { id } });
  if (!memberExistence) {
    throw new Error("member does not exist");
  }
  const updatedMember = await prisma.member.update({
    where: {
      id,
    },
    data: updateData,
    include: {
      department: true,
    },
  });

  return { message: "Member updated successfully", data: updatedMember };
};
export const deleteteMemberService = async ({ id }) => {
  const memberExistence = await prisma.member.findUnique({ where: { id } });
  if (!memberExistence) {
    throw new Error("member does not exist");
  }
  const deletedMember = await prisma.member.delete({
    where: { id },
  });

  return { message: "Member deleted successfully", data: deletedMember };
};
