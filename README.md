# 📓 Pocket Notes - Full-Stack Note-Making App

Pocket Notes is a responsive, secure, and feature-rich note-making application designed for seamless organization. Built with the MERN stack (MongoDB, Express, React, Node.js), it allows users to create color-coded groups, manage personal notes, and search through their content with ease.

## 🚀 Key Features

-   **Secure User Authentication**: Robust Login and Registration system powered by **JWT** and **Bcrypt**.
-   **Smart Group Management**:
    -   Create groups with custom color coding.
    -   Quickly search and filter groups.
    -   Organize notes within specific categories.
-   **Note Management**: Effortlessly create, edit, and manage notes within your groups.
-   **Mobile-First Responsive Design**: Optimized UI for both desktop and mobile devices using **Modular Vanilla CSS**.
-   **Enterprise-Grade Security**:
    -   Password hashing (Bcrypt).
    -   CORS protection for backend security.
    -   API Rate Limiting to prevent brute-force attacks.
    -   Comprehensive Server-side & Client-side form validation.
-   **Real-time Interaction**: Smooth UI updates and notifications using React Toastify.

## 🛠 Tech Stack

### Frontend
-   **Core**: React 18
-   **Routing**: React Router DOM (v7)
-   **Icons & Notifications**: React Icons, React Toastify
-   **Styling**: Modular Vanilla CSS (No UI libraries used, ensuring high performance)
-   **HTTP Client**: Axios

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Security**: JSON Web Token (JWT), BcryptJS, Express-Rate-Limit

## 📁 Project Structure

```text
├── backend
│   ├── controllers # Business logic (MVC Pattern)
│   ├── middleware  # Auth and validation middleware
│   ├── models      # Mongoose schemas (User, Group, Note)
│   ├── routes      # API endpoints
│   └── index.js    # Entry point
├── frontend
│   ├── src
│   │   ├── components # Reusable UI components
│   │   │   ├── *.module.css # Modular CSS files
│   │   ├── assets     # Static assets (images, icons)
│   │   ├── Global.css # Global styles
│   │   └── App.js     # Main application logic
└── netlify.toml       # Deployment configuration
```

## ⚙️ Setup Instructions

### 1. Prerequisites
-   Node.js (v16.x or higher)
-   MongoDB account (local or Atlas)

### 2. Backend Installation
1.  Navigate to the `backend` folder: `cd backend`
2.  Install dependencies: `npm install`
3.  Create a `.env` file:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_secret_key
    PORT=4000
    ```
4.  Start server: `npm start`

### 3. Frontend Installation
1.  Navigate to the `frontend` folder: `cd frontend`
2.  Install dependencies: `npm install`
3.  Start application: `npm start`
4.  Visit: `http://localhost:3000`

## 📡 API Endpoints (Highlights)

-   `POST /api/auth/register` - User registration
-   `POST /api/auth/login` - User login
-   `GET /api/groups` - Fetch all user groups
-   `POST /api/groups` - Create a new group
-   `GET /api/notes/:groupId` - Fetch notes for a group

## 📝 License
This project is licensed under the ISC License.
