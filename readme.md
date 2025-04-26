# School Management Backend

This is the backend for the School Management System, built using Node.js. It provides APIs for managing students, teachers, classes, and other school-related data.

## Technologies Used
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MySql**: Database
- **Prisma**: ORM for MySqk
- **dotenv**: Environment variable management

## Folder Structure
```
/school_mgmt_backend
├── /config          # Configuration files (e.g., prisma client)
├── /controllers     # Route logic and business logic
├── /prisma          # Prisma migrations, schemas and models
├── /routes          # API route definitions
├── index.js        # Entry point of the application
├── package.json     # Project metadata and dependencies
```

## API Routes (Schools)

- `GET /api/listSchools?latitude=XX.XX&longitude=YY.YY` - Get school sorted in ascending order of distance
- `POST /api/addSchool` - Add a new school with its location ie longitude and latitude

 ### References (API Docs)
 For more information on API testing and usage, refer to the [Postman Documentation](https://documenter.getpostman.com/view/39575061/2sB2j1gCPK).

## How to Run Locally
1. Clone the repository:
    ```bash
    git clone https://github.com/Pritthish20/scholl_mgmt.git
    cd scholl_mgmt
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```
    PORT=5000
    DATABASE_URL=your_mongodb_connection_string
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. The backend will run on `http://localhost:5000`.

## Notes
- Ensure Mysql Prisma client is running locally or provide a valid connection string in the `.env` file.
- Use tools like Postman or cURL to test the API endpoints.

