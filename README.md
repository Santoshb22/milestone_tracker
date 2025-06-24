# milestone_tracker 

--------------------------------------
# ------------- BACKEND--------------- 
--------------------------------------
A secure RESTful backend for a pregnancy and parenting milestone tracking app. Built with **Node.js**, **Express**, **MongoDB**, and **JWT authentication**, this API allows users to perform CRUD operations for their milestones, view community tips, and interact with others securely.

---

## 📦 Features

- User authentication (register, login) with JWT tokens (access & refresh)
- Protected routes with role-based access (RBAC-ready)
- Personal milestone creation, editing, deletion
- Public tip sharing & upvoting for community learning

---

## 🚀 Getting Started

## 1. Clone the repository
- git clone https://github.com/Santoshb22/milestone_tracker.git
- cd backend
- npm install

## Setup .env variables
- PORT=5000
- MONGO_URI=your_mongo_connection_string
- JWT_ACCESS_TOKEN_SECRET=your_access_secret
- JWT_REFRESH_TOKEN_SECRET=your_refresh_secret
- JWT_ACCESS_EXPIRATION_MINUTES=15m
- JWT_REFRESH_EXPIRATION_DAYS=7d

## Run the server
- npm start

## API Authentication 
- Authorization: Bearer <access_token>

## Api endpoints
- POST	/api/auth/login	Authenticate user
- POST  /api/auth/register Register user
- GET	/api/milestones	Fetch all user milestones
- POST	/api/milestones	Add a milestone
- PUT	/api/milestones/:id	Edit a milestone
- DELETE	/api/milestones/:id	Delete a milestone
- GET	/api/milestones/:id/tips	Get tips for a milestone
- POST	/api/milestones/:id/tips	Add a tip
- PUT	/api/tips/:id/like	Upvote/like a tip

--------------------------------------
# ------------- Frontend--------------- 
--------------------------------------
