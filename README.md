# Todo App

A full-stack Todo App built with React (frontend) and Node.js with Express (backend) using MongoDB for data storage. The app allows users to register, login, create, read, update, and delete tasks. JWT-based authentication ensures users only have access to their own tasks.

##  Features

- **User Authentication:** Register, login, and logout functionality with JWT tokens.
- **Task Management:** Create, read, update, and delete tasks.
- **Protected Routes:** Users can only access tasks if they are authenticated.
- **Responsive UI:** Built using React and Material-UI for better user experience.

##  Technologies Used

### Frontend
- **React**
- **Axios**
- **Material-UI**
- **React Router**

### Backend
- **Node.js**
- **Express**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Token)**
- **CORS**
- **bcrypt**

## Project Structure

todoapp/ ├── backend/ # Backend (Node.js + Express) │ ├── models/ # Mongoose models (User, Task) │ ├── routes/ # API routes (user, task) │ ├── controllers/ # Controllers for handling requests │ ├── middleware/ # Authentication middleware │ ├── config/ # MongoDB connection setup │ ├── server.js # Main backend server file │ └── package.json # Backend dependencies ├── frontend/ # Frontend (React) │ ├── public/ # Public assets │ ├── src/ # Source files │ │ ├── components/ # React components (Register, Login, TodoList, TaskForm) │ │ ├── context/ # React Context API setup │ │ ├── App.js # Main React application │ │ ├── index.js # React entry point │ └── package.json # Frontend dependencies ├── .gitignore ├── README.md

The backend server will run on **http://localhost:5000** and the frontend server will run on **http://localhost:3000**.
