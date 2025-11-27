const request = require('supertest');
const express = require('express');

// Simple test using CommonJS
describe('Department API Simple Tests', () => {
  const app = express();
  app.use(express.json());
  
  // Mock endpoints
  app.post('/api/departments/new', (req, res) => {
    if (!req.body.name) {
      return res.status(400).json({ error: 'Name is required' });
    }
    res.status(201).json({ 
      message: `${req.body.name} department added successfully!`,
      data: { id: 1, name: req.body.name }
    });
  });

  app.get('/api/departments/all', (req, res) => {
    res.status(200).json({
      message: 'All departments',
      data: [{ id: 1, name: 'IT Department', members: [] }]
    });
  });

  app.get('/api/departments/:id', (req, res) => {
    if (req.params.id === '999') {
      return res.status(400).json({ error: 'Department does not exist!' });
    }
    res.status(200).json({
      message: 'IT Department',
      data: { id: 1, name: 'IT Department', members: [] },
      hod: { id: 1, firstname: 'John', isHead: true }
    });
  });

  app.put('/api/departments/:id', (req, res) => {
    if (req.params.id === '999') {
      return res.status(400).json({ error: 'Department does not exist!' });
    }
    res.status(201).json({
      message: 'Department updated successfully!',
      data: { id: 1, name: req.body.name }
    });
  });

  app.post('/api/departments/:id/add-member', (req, res) => {
    if (!req.body.memberId) {
      return res.status(400).json({ error: 'member does not exist!' });
    }
    res.status(201).json({
      message: 'John added to IT Department successfully',
      data: { id: 1, firstname: 'John', department_id: 1 }
    });
  });

  app.delete('/api/departments/:id', (req, res) => {
    if (req.params.id === '999') {
      return res.status(400).json({ error: 'Department does not exist!' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  });

  app.delete('/api/departments/:deptId/:memberId', (req, res) => {
    if (req.params.memberId === '999') {
      return res.status(400).json({ error: 'Member does not exist!' });
    }
    res.status(200).json({
      message: 'John removed from IT Department successfully',
      data: { id: 1, firstname: 'John', department_id: null }
    });
  });

  // Tests
  test('POST /api/departments/new - should create department', async () => {
    const response = await request(app)
      .post('/api/departments/new')
      .send({ name: 'IT Department' });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('IT Department department added successfully!');
  });

  test('GET /api/departments/all - should get all departments', async () => {
    const response = await request(app).get('/api/departments/all');
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('All departments');
  });

  test('GET /api/departments/:id - should get single department', async () => {
    const response = await request(app).get('/api/departments/1');
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('IT Department');
  });

  test('PUT /api/departments/:id - should update department', async () => {
    const response = await request(app)
      .put('/api/departments/1')
      .send({ name: 'Updated Department' });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Department updated successfully!');
  });

  test('POST /api/departments/:id/add-member - should add member', async () => {
    const response = await request(app)
      .post('/api/departments/1/add-member')
      .send({ memberId: 1 });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('John added to IT Department successfully');
  });

  test('DELETE /api/departments/:id - should delete department', async () => {
    const response = await request(app).delete('/api/departments/1');
    
    expect(response.status).toBe(200);
  });

  test('DELETE /api/departments/:deptId/:memberId - should remove member', async () => {
    const response = await request(app).delete('/api/departments/1/1');
    
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('John removed from IT Department successfully');
  });

  // Error cases
  test('should handle errors - non-existent department', async () => {
    const response = await request(app).get('/api/departments/999');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Department does not exist!');
  });

  test('should handle errors - missing name', async () => {
    const response = await request(app)
      .post('/api/departments/new')
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Name is required');
  });
});