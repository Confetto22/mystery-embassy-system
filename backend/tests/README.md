# Department API Tests

This directory contains comprehensive tests for all department API endpoints and functionalities.

## Test Files

### 1. `department.test.js`
Unit tests for department API endpoints with mocked dependencies:
- POST `/api/departments/new` - Create new department
- GET `/api/departments/all` - Get all departments
- GET `/api/departments/:id` - Get single department
- PUT `/api/departments/:id` - Update department
- POST `/api/departments/:id/add-member` - Add member to department
- DELETE `/api/departments/:id` - Delete department
- DELETE `/api/departments/:deptId/:memberId` - Remove member from department

### 2. `department.service.test.js`
Unit tests for department service functions:
- `addDepartmentService`
- `allDepartmentService`
- `singleDepartmentService`
- `updateDepartmentService`
- `addMemberDeptService`
- `deleteDeptService`
- `removeMemberDeptService`

### 3. `department.integration.test.js`
Integration tests that test the complete workflow and error handling.

## Running Tests

```bash
# Install dependencies first
npm install

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## Test Coverage

The tests cover:
- ✅ All API endpoints
- ✅ Success scenarios
- ✅ Error handling
- ✅ Edge cases
- ✅ Validation logic
- ✅ Database interactions (mocked)
- ✅ Business logic validation

## Test Scenarios Covered

### Department Creation
- ✅ Successful department creation
- ✅ Duplicate department prevention

### Department Retrieval
- ✅ Get all departments with members
- ✅ Get single department with HOD
- ✅ Handle non-existent department

### Department Updates
- ✅ Successful department update
- ✅ Handle non-existent department update

### Member Management
- ✅ Add member to department
- ✅ Prevent visitors from joining departments
- ✅ Prevent duplicate department membership
- ✅ Handle member already in different department
- ✅ Remove member from department
- ✅ Handle member not in department

### Error Handling
- ✅ Invalid department IDs
- ✅ Missing request data
- ✅ Database errors
- ✅ Business rule violations