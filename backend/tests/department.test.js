import request from 'supertest';
import express from 'express';
import departmentRoutes from '../src/routes/department.routes.js';
import { prisma } from '../src/db/db.js';

const app = express();
app.use(express.json());
app.use('/api/departments', departmentRoutes);

// Mock Prisma
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

describe('Department API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/departments/new', () => {
    it('should create a new department successfully', async () => {
      const deptData = { name: 'IT Department' };
      const newDept = { id: 1, name: 'IT Department' };

      prisma.department.findUnique.mockResolvedValue(null);
      prisma.department.create.mockResolvedValue(newDept);

      const response = await request(app)
        .post('/api/departments/new')
        .send(deptData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('IT Department department added successfully!');
      expect(response.body.data).toEqual(newDept);
    });

    it('should return error if department already exists', async () => {
      const deptData = { name: 'IT Department' };
      const existingDept = { id: 1, name: 'IT Department' };

      prisma.department.findUnique.mockResolvedValue(existingDept);

      const response = await request(app)
        .post('/api/departments/new')
        .send(deptData);

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Department already exists!');
    });
  });

  describe('GET /api/departments/all', () => {
    it('should return all departments with members', async () => {
      const departments = [
        { id: 1, name: 'IT Department', members: [] },
        { id: 2, name: 'HR Department', members: [{ id: 1, firstname: 'John' }] }
      ];

      prisma.department.findMany.mockResolvedValue(departments);

      const response = await request(app).get('/api/departments/all');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('All departments');
      expect(response.body.data).toEqual(departments);
    });
  });

  describe('GET /api/departments/:id', () => {
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

      const response = await request(app).get('/api/departments/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('IT Department');
      expect(response.body.data).toEqual(department);
      expect(response.body.hod).toEqual(deptWithHod.members[0]);
    });

    it('should return error if department does not exist', async () => {
      prisma.department.findFirst.mockResolvedValue(null);

      const response = await request(app).get('/api/departments/999');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Department does not exist!');
    });
  });

  describe('PUT /api/departments/:id', () => {
    it('should update department successfully', async () => {
      const updateData = { name: 'Updated IT Department' };
      const existingDept = { id: 1, name: 'IT Department' };
      const updatedDept = { id: 1, name: 'Updated IT Department' };

      prisma.department.findFirst.mockResolvedValue(existingDept);
      prisma.department.update.mockResolvedValue(updatedDept);

      const response = await request(app)
        .put('/api/departments/1')
        .send(updateData);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Department updated successfully!');
      expect(response.body.data).toEqual(updatedDept);
    });

    it('should return error if department does not exist', async () => {
      prisma.department.findFirst.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/departments/999')
        .send({ name: 'Updated Name' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Department does not exist!');
    });
  });

  describe('POST /api/departments/:id/add-member', () => {
    it('should add member to department successfully', async () => {
      const member = { id: 1, firstname: 'John', memberType: 'member', department_id: null };
      const department = { id: 1, name: 'IT Department' };
      const updatedMember = { ...member, department_id: 1 };

      prisma.member.findUnique.mockResolvedValue(member);
      prisma.department.findUnique.mockResolvedValue(department);
      prisma.member.findFirst.mockResolvedValue(null);
      prisma.member.update.mockResolvedValue(updatedMember);

      const response = await request(app)
        .post('/api/departments/1/add-member')
        .send({ memberId: 1 });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('John added to IT Department successfully');
      expect(response.body.data).toEqual(updatedMember);
    });

    it('should return error if member does not exist', async () => {
      prisma.member.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/departments/1/add-member')
        .send({ memberId: 999 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('member does not exist!');
    });

    it('should return error if department does not exist', async () => {
      const member = { id: 1, firstname: 'John', memberType: 'member' };

      prisma.member.findUnique.mockResolvedValue(member);
      prisma.department.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .post('/api/departments/999/add-member')
        .send({ memberId: 1 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Department does not exist!');
    });

    it('should return error if visitor tries to join department', async () => {
      const visitor = { id: 1, firstname: 'John', memberType: 'visitor' };
      const department = { id: 1, name: 'IT Department' };

      prisma.member.findUnique.mockResolvedValue(visitor);
      prisma.department.findUnique.mockResolvedValue(department);

      const response = await request(app)
        .post('/api/departments/1/add-member')
        .send({ memberId: 1 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Visitors cannot join a department!');
    });

    it('should return error if member already in department', async () => {
      const member = { id: 1, firstname: 'John', memberType: 'member', department_id: 1 };
      const department = { id: 1, name: 'IT Department' };

      prisma.member.findUnique.mockResolvedValue(member);
      prisma.department.findUnique.mockResolvedValue(department);

      const response = await request(app)
        .post('/api/departments/1/add-member')
        .send({ memberId: 1 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('John is already in IT Department department');
    });

    it('should return error if member belongs to different department', async () => {
      const member = { id: 1, firstname: 'John', memberType: 'member', department_id: 2 };
      const department = { id: 1, name: 'IT Department' };
      const diffDept = { id: 1, department_id: 2 };
      const actualDept = { id: 2, name: 'HR Department' };

      prisma.member.findUnique.mockResolvedValue(member);
      prisma.department.findUnique.mockResolvedValue(department);
      prisma.member.findFirst.mockResolvedValue(diffDept);
      prisma.department.findFirst.mockResolvedValue(actualDept);

      const response = await request(app)
        .post('/api/departments/1/add-member')
        .send({ memberId: 1 });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('John already belongs to the HR Department');
    });
  });

  describe('DELETE /api/departments/:id', () => {
    it('should delete department successfully', async () => {
      const department = { id: 1, name: 'IT Department' };

      prisma.department.delete.mockResolvedValue(department);

      const response = await request(app).delete('/api/departments/1');

      expect(response.status).toBe(200);
    });

    it('should handle department deletion error', async () => {
      prisma.department.delete.mockRejectedValue(new Error('Department does not exist!'));

      const response = await request(app).delete('/api/departments/999');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Department does not exist!');
    });
  });

  describe('DELETE /api/departments/:deptId/:memberId', () => {
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

      const response = await request(app).delete('/api/departments/1/1');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('John removed from IT Department successfully');
      expect(response.body.data).toEqual(removedMember);
    });

    it('should return error if member does not exist', async () => {
      prisma.member.findFirst.mockResolvedValueOnce(null);

      const response = await request(app).delete('/api/departments/1/999');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Member does not exist!');
    });

    it('should return error if department does not exist', async () => {
      const member = { id: 1, firstname: 'John' };

      prisma.member.findFirst
        .mockResolvedValueOnce(member)
        .mockResolvedValueOnce(null);

      const response = await request(app).delete('/api/departments/999/1');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Department does not exist!');
    });

    it('should return error if member is not in department', async () => {
      const member = { id: 1, firstname: 'John' };
      const department = { id: 1, name: 'IT Department' };

      prisma.member.findFirst
        .mockResolvedValueOnce(member)
        .mockResolvedValueOnce(department)
        .mockResolvedValueOnce(null);

      const response = await request(app).delete('/api/departments/1/1');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('John is not a member of this department');
    });
  });
});