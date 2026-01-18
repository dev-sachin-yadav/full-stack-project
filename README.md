# Task Management Application

Full MERN stack task management application with frontend React, backend Node.js/Express, and MongoDB database.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas connection string)

## Setup & Installation

### 1. Install Dependencies

```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` folder:

```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
```

For MongoDB Atlas, use:
```
MONGODB_URI=mongodb+srv://<taskadmin>:<taskmanegmentapp123>@<cluster>.mongodb.net/taskapp?retryWrites=true&w=majority
```

### 3. Run the Application

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm start
```

## Endpoints

- **Backend Health:** https://full-stack-project-smgk.onrender.com/api/health
- **Frontend:** https://task-manegment-app.netlify.app
- **API Base URL:** https://full-stack-project-smgk.onrender.com/api

## Running in Production

For production builds:

```bash
# Backend
cd server
npm start

# Frontend
cd client
npm run build
```

Make sure to include a `_redirects` file inside `client/public/` for Netlify deployment:
```
/*    /index.html    200
```

## Deployment

### Backend (Render)
1. Push server folder to GitHub.
2. Create a new Node.js web service on Render.
3. Set environment variables (MONGODB_URI, JWT_SECRET, PORT).
4. Enable auto-deploy from GitHub.
5. Check Render logs to confirm backend is running.

### Frontend (Netlify)
1. Connect client folder repository to Netlify.
2. Set build command: `npm run build`
3. Set publish directory: `build/`
4. Add `_redirects` file in `public/` folder.
5. Set environment variable `REACT_APP_API_URL` to backend URL.
6. Deploy and verify frontend.

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally on port 27017, or update `MONGODB_URI` in `.env`.
- For MongoDB Atlas, verify your connection string and IP whitelist.

### Port Already in Use
- Backend port 5000: `lsof -i :5000` (Mac/Linux) or `Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess` (Windows)
- Frontend port 3000: Change in `client/.env` or use: `PORT=3001 npm start`

## Scaling Notes
- Use HTTPS & secure cookies for production.
- JWT in HttpOnly cookies.
- Implement role-based access control.
- Add pagination & indexing for tasks.
- Redis for caching.
- CI/CD for automated deployment.

## Author
**Sachin Yadav** – BCA Student & Fullstack Developer
[GitHub Profile](https://github.com/dev-sachin-yadav)

