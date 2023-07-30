# crud_assignment

API Endpoints
GET /api/data: Get all records in the table.
GET /api/data/:id: Get a specific record by its ID.
POST /api/data: Create a new record.
PUT /api/data/:id: Update an existing record by its ID.
DELETE /api/data/:id: Delete a record by its ID.
API Documentation
Get all records
Endpoint: GET /api/data
Description: Fetches all records from the database.
Response: Status 200 OK
Response Body: An array of records in JSON format.
Get a record by ID
Endpoint: GET /api/data/:id
Description: Fetches a specific record by its ID from the database.
Parameters:
id (number) - The ID of the record to fetch.
Response: Status 200 OK
Response Body: The record object in JSON format.
Create a new record
Endpoint: POST /api/data
Description: Creates a new record and adds it to the database.
Request Body: The record data in JSON format (name, age, email, phone).
Response: Status 201 Created
Response Body: The created record object in JSON format with a unique ID.
Update a record
Endpoint: PUT /api/data/:id
Description: Updates an existing record in the database by its ID.
Parameters:
id (number) - The ID of the record to update.
Request Body: The updated record data in JSON format (name, age, email, phone).
Response: Status 200 OK
Response Body: The updated record object in JSON format.
Delete a record
Endpoint: DELETE /api/data/:id
Description: Deletes a record from the database by its ID.
Parameters:
id (number) - The ID of the record to delete.
Response: Status 200 OK
Testing
The backend uses Jest for testing. To run the tests, use the following command:
jest
