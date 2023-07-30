const fs = require('fs');
const request = require('supertest');
const app = require('../index'); // Import the Express app from index.js
const dataController = require('../controllers/dataController');
const { findAll } = dataController;
require('dotenv').config()


beforeAll((done) => {
    app.listen(3000, () => { // Use a different port, e.g., 3000
      console.log(`Test server running on http://localhost:3000`);
      done();
    });
  });
  

describe('dataController', () => {
  const testData = [
    { id: '1', name: 'John', age: "30", email: 'john@example.com', phone: '123-456-7890' },
    { id: '2', name: 'Alice', age: "25", email: 'alice@example.com', phone: '987-654-3210' },
    
  ];

  const writeTestDataToCSV = (data) => {
    const csvContent = 'id,name,age,email,phone\n' + data.map((row) => Object.values(row).join(',')).join('\n');
    fs.writeFileSync('./testData.csv', csvContent);
  };

  beforeEach(() => {
    process.env.NODE_ENV = 'test';
    writeTestDataToCSV(testData);
  });
  
  afterEach(() => {
    process.env.NODE_ENV = 'development';
    fs.unlinkSync('./testData.csv');
  });

  it('should get all records', async () => {
    const response = await request(app).get('/api/data');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(testData);
  });

  it('should get a record by ID', async () => {
    const id = 1;
    const expectedRecord = testData.find((record) => record.id == id);
    const response = await request(app).get(`/api/data/${id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedRecord);
  });

  it('should create a new record', async () => {
    const newRecord = { name: 'Jane', age: '28', email: 'jane@example.com', phone: '555-555-5555' };
    const response = await request(app).post('/api/data').send(newRecord);
    expect(response.status).toBe(201);
    const createdRecord = response.body;
    expect(createdRecord.id).toBeDefined();
    
    // Convert the id to a string
    createdRecord.id = String(createdRecord.id);
  
    expect(createdRecord).toEqual({ ...newRecord, id: createdRecord.id });
  
    // Verify that the created record exists in the data
    const updatedData = await findAll();
    const createdRecordInData = updatedData.find((record) => record.id === createdRecord.id);
    expect(createdRecordInData).toEqual({ ...newRecord, id: createdRecord.id });
  });
  

  it('should update a record', async () => {
    let id = 1;
    const updatedRecord = { name: 'Updated Name', age: '40', email: 'updated@example.com', phone: '111-222-3333' };
    const response = await request(app).put(`/api/data/${id}`).send(updatedRecord);
    // console.log(response)
    expect(response.status).toBe(200);
  
    // Introduce a delay of 500ms to allow time for the update operation to complete
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    const updatedData = await findAll();
    const updatedRecordInData = updatedData.find((record) => record.id == id);
    id = String(id)
    expect(updatedRecordInData).toEqual({ ...updatedRecord, id });
  });

  it('should delete a record', async () => {
    const id = 1;
    const response = await request(app).delete(`/api/data/${id}`);
    expect(response.status).toBe(200);

    // Verify that the record has been deleted from the data
    const updatedData = await findAll();
    const deletedRecord = updatedData.find((record) => record.id === id);
    expect(deletedRecord).toBeUndefined();
  });

});
