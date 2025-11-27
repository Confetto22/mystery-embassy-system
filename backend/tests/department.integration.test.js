import request from 'supertest';
import express from 'express';
import departmentRoutes from '../src/routes/department.routes.js';

const app = express();
app.use(express.json());
app.use('/api/departments', departmentRoutes);

describe('Department Integration Tests', () => {
  let testDeptId;
  let testMemberId;

  beforeAll(async () => {
    // Setup test data
    const memberResponse = await request(app)
      .post('/api/members/new')
      .send({
        firstname: 'Test',
        lastname: 'User',
        email: 'test@example.com',
        memberType: 'member'
      });
    testMemberId = memberResponse.body.data?.id;
  });

  afterAll(async () => {
    // Cleanup test data
    if (testDeptId) {
      await request(app).delete(`/api/departments/${testDeptId}`);
    }
  });

  describe('Full Department Workflow', () => {
    it('should complete full department lifecycle', async () => {
      // 1. Create department
      const createResponse = await request(app)
        .post('/api/departments/new')
        .send({ name: 'Test Department' });
      
      expect(createResponse.status).toBe(201);
      testDeptId = createResponse.body.data.id;

      // 2. Get all departments
      const allResponse = await request(app).get('/api/departments/all');
      expect(allResponse.status).toBe(200);
      expect(allResponse.body.data).toContainEqual(
        expect.objectContaining({ name: 'Test Department' })
      );

      // 3. Get single department
      const singleResponse = await request(app).get(`/api/departments/${testDeptId}`);
      expect(singleResponse.status).toBe(200);
      expect(singleResponse.body.data.name).toBe('Test Department');

      // 4. Update department
      const updateResponse = await request(app)
        .put(`/api/departments/${testDeptId}`)
        .send({ name: 'Updated Test Department' });
      
      expect(updateResponse.status).toBe(201);
      expect(updateResponse.body.data.name).toBe('Updated Test Department');

      // 5. Add member to department (if member exists)
      if (testMemberId) {
        const addMemberResponse = await request(app)
          .post(`/api/departments/${testDeptId}/add-member`)
          .send({ memberId: testMemberId });
        
        expect([201, 400]).toContain(addMemberResponse.status);
      }

      // 6. Remove member from department (if member was added)
      if (testMemberId) {
        const removeMemberResponse = await request(app)
          .delete(`/api/departments/${testDeptId}/${testMemberId}`);
        
        expect([200, 400]).toContain(removeMemberResponse.status);
      }

      // 7. Delete department
      const deleteResponse = await request(app).delete(`/api/departments/${testDeptId}`);
      expect(deleteResponse.status).toBe(200);
    });
  });

  describe('Error Handling', () => {
    it('should handle invalid department ID', async () => {
      const response = await request(app).get('/api/departments/invalid-id');
      expect(response.status).toBe(400);
    });

    it('should handle missing request body', async () => {
      const response = await request(app).post('/api/departments/new').send({});
      expect(response.status).toBe(400);
    });

    it('should handle non-existent department update', async () => {
      const response = await request(app)
        .put('/api/departments/99999')
        .send({ name: 'Non-existent' });
      expect(response.status).toBe(400);
    });
  });
});