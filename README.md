# Course Scheduler App

A full-stack web application built with the MERN stack (MongoDB, Express.js, React, Node.js) to manage course scheduling for students and administrators. The app enables users to create, view, and manage semester course plans, check for conflicts, and integrate with Georgia Tech’s SSO for secure authentication.

## Rationale for Project Artifact Implementation
Choosing a semester to work on, creating new plans, and scheduling classes on a calender are the building block of what out application will represent. This portion that we have coded to begin with will be used as a base and template for all of the code that will be written going forward. It provides a satisfying measure to our client and to ourselves that we are on the right track and will continue to meet the goals we have set for ourselves in this past semester.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [API Documentation](#api-documentation)
- [Non-Functional Requirements](#non-functional-requirements)
- [Future Enhancements](#future-enhancements)

## Features

- **User Management**: Manage users with roles and permissions.
- **Course and Semester Planning**: Administrators can create and update course plans for each semester.
- **Student Preferences**: Students can submit preferred courses for the semester.
- **Conflict Detection**: Checks for scheduling conflicts.
- **SSO Authentication**: Integrates with Georgia Tech’s SSO for secure access.
- **Backup & Recovery**: Option to export schedules and student preferences.

## Tech Stack

- **Frontend**: React.js, Axios, React Router, HTML, CSS
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Georgia Tech Single Sign-On (SSO)
- **Hosting**: AWS Lightsail for deployment
- **Additional Services**: Nodemailer for email notifications, Docker for containerization

## Project Structure

```
course-scheduler/
├── backend/                       # Backend (API) directory
│   ├── config/                    # Configuration files
│   ├── controllers/               # Request handlers for each route
│   ├── models/                    # Database schemas (Mongoose)
│   ├── routes/                    # API endpoints for CRUD operations
│   ├── middleware/                # Authentication and error handling
│   ├── utils/                     # Utility files (DB connection, SSO, email)
│   ├── .env                       # Backend environment variables
│   ├── package.json               # Backend dependencies
│   └── server.js                  # Main server file
└── frontend/                      # Frontend directory
    ├── public/                    # Public assets (index.html)
    ├── src/                       # React source files
    │   ├── components/            # Reusable components
    │   ├── pages/                 # Page components for routing
    │   ├── api.js                 # API calls
    │   ├── App.css                # Global styles
    │   ├── App.js                 # Main App component
    │   └── index.js               # React entry point
    ├── .env                       # Frontend environment variables
    └── package.json               # Frontend dependencies
```

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/course-scheduler.git
   cd course-scheduler
   ```

2. **Backend Setup**:
   - Navigate to the backend folder:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file with the following environment variables:
     ```plaintext
     PORT=5000
     DB_URI=mongodb://localhost:27017/course_scheduler
     EMAIL_USER=your_email@example.com
     EMAIL_PASS=your_password
     SSO_URL=https://login.gatech.edu/
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   - Navigate to the frontend folder:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file with the following environment variable:
     ```plaintext
     REACT_APP_API_URL=http://localhost:5000/api
     ```
   - Start the frontend server:
     ```bash
     npm start
     ```

4. **MongoDB Setup**:
   - Ensure MongoDB is running. If needed, start MongoDB:
     ```bash
     mongod --dbpath <path_to_your_database_folder>
     ```

The app should now be running with the frontend available at `http://localhost:3000` and the backend API at `http://localhost:5000`.

## API Documentation

| Endpoint                        | Method | Description                      |
|---------------------------------|--------|----------------------------------|
| `/api/users`                    | GET    | Fetch all users                  |
| `/api/users/:userId`            | GET    | Fetch a specific user by ID      |
| `/api/semesters`                | GET    | Fetch all semesters              |
| `/api/semesters/:semesterId`    | GET    | Fetch semester details           |
| `/api/plans`                    | POST   | Create a new plan                |
| `/api/plans/:planId/courses`    | GET    | Fetch all courses in a plan      |
| `/api/students`                 | GET    | Fetch all students               |
| `/api/students/:studentId`      | GET    | Fetch student details            |

Refer to the `backend/routes/` folder for detailed API routes and parameters.

The app should now be running with the frontend available at `http://localhost:3000` and the backend API at `http://localhost:5000`.


# Release Notes Section 
## Release Number 0.0.0 
### Features
- Able to select semester to work on
- Can use multiple plans and switch between them
- Can create new plans
- Can schedule classes with name, instructor, section, time and days of the week and they will appear on calender
- Can delete classes
- Can view a list of classes on left hand side of calender
  
### Bug Fixes 
No bugs as this is the first ever release
### Known Issues
There is limited function with the backend and database at this point so a lot of the data inputted by the user will not be saved

Also there features like the login page and buttons like the hamburger on the left hand side that do not have use yet and are just for visuals. 

The focus of this release is the project artifact implementation which is focused on adding and viewing classes on the calender, making plans and picking a semester to work on
