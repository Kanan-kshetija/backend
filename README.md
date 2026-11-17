# Student Management Backend

## About the Project
This is a beginner-level backend project built using Node.js, Express.js and MongoDB.

It performs CRUD operations (Create, Read, Update and Delete) on student records.

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Postman
- Git and GitHub

## Project Structure

- config – Database connection
- models – Student database model
- controllers – CRUD operation logic
- routes – API routes
- server.js – Main server file

## Installation

1. Clone this repository.
2. Open the project folder in VS Code.
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the root folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. Start the server:

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint | Operation |
|---|---|---|
| POST | /api/students | Create student |
| GET | /api/students | Get all students |
| PUT | /api/students/:id | Update student |
| DELETE | /api/students/:id | Delete student |

## Testing
All CRUD APIs can be tested using Postman.

## Database
MongoDB Atlas is used to store student records.