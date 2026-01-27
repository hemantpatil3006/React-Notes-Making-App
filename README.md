# Pocket Notes

A responsive and secure note-making application built with React and Node.js.

## Features

- **User Authentication**: Secure Login and Registration with JWT.
- **Group Management**: Create, search, and delete groups with custom colors.
- **Note Management**: Create, edit, and delete notes within groups.
- **Responsive Design**: Works seamlessly on mobile and desktop.
- **Security**: 
  - Password hashing with bcrypt.
  - CORS protection.
  - Rate limiting on authentication routes.
  - Server-side and client-side validation.

## Tech Stack

- **Frontend**: React, Axios, React Icons, React Toastify.
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT.

## Local Setup

### 1. Prerequisites
- Node.js installed.
- MongoDB running locally or a MongoDB Atlas URI.

### 2. Backend Setup
1. Navigate to the `backend` folder: `cd backend`.
2. Install dependencies: `npm install`.
3. Create a `.env` file and add the following:
   ```env
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   PORT=4000
   ```
4. Start the server: `npm start`.

### 3. Frontend Setup
1. Navigate to the `frontend` folder: `cd frontend`.
2. Install dependencies: `npm install`.
3. Start the application: `npm start`.
4. Open `http://localhost:3000` in your browser.

## Deployment to Production

### Backend
1. Host the `backend` folder on a platform like Render or Railway.
2. Ensure you set the environment variables (`MONGODB_URI`, `JWT_SECRET`) in your hosting provider's dashboard.

### Frontend (Netlify)
1. Deploy the `frontend` folder to Netlify.
2. In Netlify Site Settings, add an environment variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://your-backend-url.com/api`
3. Redeploy your site.
