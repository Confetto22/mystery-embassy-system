import {
  addDepartmentService,
  allDepartmentService,
  singleDepartmentService,
  updateDepartmentService,
  addMemberDeptService,
  deleteDeptService,
  removeMemberDeptService
} from '../src/services/department.service.js';
import { prisma } from '../src/db/db.js';

jest.mock('../src/db/db.js', () => ({
  prisma: {
    department: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    member: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}));

describe('Department Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('addDepartmentService', () => {
    it('should add new department successfully', async () => {
      const deptData = { name: 'IT Department' };
      const newDept = { id: 1, name: 'IT Department' };

      prisma.department.findUnique.mockResolvedValue(null);
      prisma.department.create.mockResolvedValue(newDept);

      const result = await addDepartmentService(deptData);

      expect(result.message).toBe('IT Department department added successfully!');
      expect(result.data).toEqual(newDept);
      expect(prisma.department.findUnique).toHaveBeenCalledWith({
        where: { name: 'IT Department' }
      });
      expect(prisma.department.create).toHaveBeenCalledWith({
        data: deptData
      });
    });

    it('should throw error if department already exists', async () => {
      const deptData = { name: 'IT Department' };
      const existingDept = { id: 1, name: 'IT Department' };

      prisma.department.findUnique.mockResolvedValue(existingDept);

      await expect(addDepartmentService(deptData)).rejects.toThrow('Department already exists!');
    });
  });

  describe('allDepartmentService', () => {
    it('should return all departments with members', async () => {
      const departments = [
        { id: 1, name: 'IT Department', members: [] },
        { id: 2, name: 'HR Department', members: [] }
      ];

      prisma.department.findMany.mockResolvedValue(departments);

      const result = await allDepartmentService();

      expect(result.message).toBe('All departments');
      expect(result.data).toEqual(departments);
      expect(prisma.department.findMany).toHaveBeenCalledWith({
        include: { members: true }
      });
    });
  });

  describe('singleDepartmentService', () => {
    it('should return single department with HOD', async () => {
      const department = { id: 1, name: 'IT Department', members: [] };
      const deptWithHod = { 
        id: 1, 
        name: 'IT Department', 
        members: [{ id: 1, firstname: 'John', isHead: true }] 
      };

      prisma.department.findFirst
        .mockResolvedValueOnce(department)
        .mockResolvedValueOnce(deptWithHod);

      const result = await singleDepartmentService({ id: 1 });

      expect(result.message).toBe('IT Department');
      expect(result.data).toEqual(department);
      expect(result.hod).toEqual(deptWithHod.members[0]);
    });

    it('should throw error if department does not exist', async () => {
      prisma.department.findFirst.mockResolvedValue(null);

      await expect(singleDepartmentService({ id: 999 })).rejects.toThrow('Department does not exist!');
    });
  });

  describe('updateDepartmentService', () => {
    it('should update department successfully', async () => {
      const existingDept = { id: 1, name: 'IT Department' };
      const updatedDept = { id: 1, name: 'Updated IT Department' };
      const updateData = { name: 'Updated IT Department' };

      prisma.department.findFirst.mockResolvedValue(existingDept);
      prisma.department.update.mockResolvedValue(updatedDept);

      const result = await updateDepartmentService({ id: 1 }, updateData);

      expect(result.message).toBe('Department updated successfully!');
      expect(result.data).toEqual(updatedDept);
    });

    it('should throw error if department does not exist', async () => {
      prisma.department.findFirst.mockResolvedValue(null);

      await expect(updateDepartmentService({ id: 999 }, { name: 'Test' }))
        .rejects.toThrow('Department does not exist!');
    });
  });

  describe('addMemberDeptService', () => {
    it('should add member to department successfully', async () => {
      const member = { id: 1, firstname: 'John', memberType: 'member', department_id: null };
      const department = { id: 1, name: 'IT Department' };
      const updatedMember = { ...member, department_id: 1 };

      prisma.member.findUnique.mockResolvedValue(member);
      prisma.department.findUnique.mockResolvedValue(department);
      prisma.member.findFirst.mockResolvedValue(null);
      prisma.member.update.mockResolvedValue(updatedMember);

      const result = await addMemberDeptService({ id: 1 }, { memberId: 1 });

      expect(result.message).toBe('John added to IT Department successfully');
      expect(result.data).toEqual(updatedMember);
    });

    it('should throw error if member does not exist', async () => {
      prisma.member.findUnique.mockResolvedValue(null);

      await expect(addMemberDeptService({ id: 1 }, { memberId: 999 }))
        .rejects.toThrow('member does not exist!');
    });

    it('should throw error if department does not exist', async () => {
      const member = { id: 1, firstname: 'John', memberType: 'member' };

      prisma.member.findUnique.mockResolvedValue(member);
      prisma.department.findUnique.mockResolvedValue(null);

      await expect(addMemberDeptService({ id: 999 }, { memberId: 1 }))
        .rejects.toThrow('Department does not exist!');
    });

    it('should throw error if visitor tries to join department', async () => {
      const visitor = { id: 1, firstname: 'John', memberType: 'visitor' };
      const department = { id: 1, name: 'IT Department' };

      prisma.member.findUnique.mockResolvedValue(visitor);
      prisma.department.findUnique.mockResolvedValue(department);

      await expect(addMemberDeptService({ id: 1 }, { memberId: 1 }))
        .rejects.toThrow('Visitors cannot join a department!');
    });

    it('should throw error if member already in department', async () => {
      const member = { id: 1, firstname: 'John', memberType: 'member', department_id: 1 };
      const department = { id: 1, name: 'IT Department' };

      prisma.member.findUnique.mockResolvedValue(member);
      prisma.department.findUnique.mockResolvedValue(department);

      await expect(addMemberDeptService({ id: 1 }, { memberId: 1 }))
        .rejects.toThrow('John is already in IT Department department');
    });

    it('should throw error if member belongs to different department', async () => {
      const member = { id: 1, firstname: 'John', memberType: 'member', department_id: 2 };
      const department = { id: 1, name: 'IT Department' };
      const diffDept = { id: 1, department_id: 2 };
      const actualDept = { id: 2, name: 'HR Department' };

      prisma.member.findUnique.mockResolvedValue(member);
      prisma.department.findUnique.mockResolvedValue(department);
      prisma.member.findFirst.mockResolvedValue(diffDept);
      prisma.department.findFirst.mockResolvedValue(actualDept);

      await expect(addMemberDeptService({ id: 1 }, { memberId: 1 }))
        .rejects.toThrow('John already belongs to the HR Department');
    });
  });

  describe('deleteDeptService', () => {
    it('should delete department successfully', async () => {
      const department = { id: 1, name: 'IT Department' };

      prisma.department.delete.mockResolvedValue(department);

      await deleteDeptService({ id: 1 });

      expect(prisma.department.delete).toHaveBeenCalledWith({
        where: { id: 1 }
      });
    });
  });

  describe('removeMemberDeptService', () => {
    it('should remove member from department successfully', async () => {
      const member = { id: 1, firstname: 'John', department_id: 1 };
      const department = { id: 1, name: 'IT Department' };
      const memberBelongs = { id: 1, department_id: 1 };
      const removedMember = { ...member, department_id: null };

      prisma.member.findFirst
        .mockResolvedValueOnce(member)
        .mockResolvedValueOnce(department)
        .mockResolvedValueOnce(memberBelongs);
      prisma.member.update.mockResolvedValue(removedMember);

      const result = await removeMemberDeptService({ deptId: 1, memberId: 1 });

      expect(result.message).toBe('John removed from IT Department successfully');
      expect(result.data).toEqual(removedMember);
    });

    it('should throw error if member does not exist', async () => {
      prisma.member.findFirst.mockResolvedValueOnce(null);

      await expect(removeMemberDeptService({ deptId: 1, memberId: 999 }))
        .rejects.toThrow('Member does not exist!');
    });

    it('should throw error if department does not exist', async () => {
      const member = { id: 1, firstname: 'John' };

      prisma.member.findFirst
        .mockResolvedValueOnce(member)
        .mockResolvedValueOnce(null);

      await expect(removeMemberDeptService({ deptId: 999, memberId: 1 }))
        .rejects.toThrow('Department does not exist!');
    });

    it('should throw error if member is not in department', async () => {
      const member = { id: 1, firstname: 'John' };
      const department = { id: 1, name: 'IT Department' };

      prisma.member.findFirst
        .mockResolvedValueOnce(member)
        .mockResolvedValueOnce(department)
        .mockResolvedValueOnce(null);

      await expect(removeMemberDeptService({ deptId: 1, memberId: 1 }))
        .rejects.toThrow('John is not a member of this department');
    });
  });
});