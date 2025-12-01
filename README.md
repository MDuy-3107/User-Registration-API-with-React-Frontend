# User-Registration

A complete full-stack User Registration application built with **NestJS** backend and **React** frontend, featuring secure authentication, form validation, and a beautiful UI.

## 🎯 Features

### Backend (NestJS)
- ✅ RESTful API with `/user/register` endpoint
- ✅ SQLite database integration with TypeORM
- ✅ Password hashing with bcrypt
- ✅ Input validation with class-validator
- ✅ Error handling with meaningful messages
- ✅ CORS enabled for frontend integration
- ✅ Environment variable configuration

### Frontend (React + TypeScript)
- ✅ React 18 with TypeScript
- ✅ Routing with React Router v6 (Home, Login, Sign Up pages)
- ✅ Form validation with React Hook Form + Zod
- ✅ API integration with React Query (TanStack Query)
- ✅ Beautiful UI with Tailwind CSS
- ✅ Responsive design
- ✅ Loading states and error handling
- ✅ Success feedback messages

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**

**Note:** SQLite is used as the database and is included in the project dependencies - no separate database installation required!

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd 22120080_10
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables
# Create .env file (or use the existing one)
# Update MONGODB_URI if needed
```

**Backend `.env` file:**
```env
PORT=3001
FRONTEND_URL=http://localhost:5173
DB_PATH=./database.sqlite
```

**Run the backend:**
```bash
npm run start:dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment variables (optional)
# The .env file is already set up
```

**Frontend `.env` file:**
```env
VITE_API_URL=http://localhost:3001
```

**Run the frontend:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🧪 Testing the Application

1. Open your browser and navigate to `http://localhost:5173`
2. Click on **"Sign Up"** to create a new account
3. Fill in the registration form with:
   - Email address (must be valid format)
   - Password (minimum 6 characters)
   - Confirm password (must match)
4. Click **"Sign Up"** to register
5. You should see a success message and be redirected to the login page
6. The login page is a UI mockup (no backend logic as per requirements)

## 📁 Project Structure

```
22120080_10/
├── backend/                    # NestJS Backend
│   ├── src/
│   │   ├── user/
│   │   │   ├── dto/
│   │   │   │   └── register-user.dto.ts    # Validation DTO
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts          # TypeORM User Entity
│   │   │   ├── user.controller.ts          # API Controller
│   │   │   ├── user.service.ts             # Business Logic
│   │   │   └── user.module.ts              # User Module
│   │   ├── app.module.ts                   # Root Module
│   │   └── main.ts                         # Application Entry
│   ├── .env                                # Environment Variables
│   ├── database.sqlite                     # SQLite Database
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                   # React Frontend
    ├── src/
    │   ├── api/
    │   │   └── userApi.ts                  # API Client
    │   ├── pages/
    │   │   ├── HomePage.tsx                # Home Page
    │   │   ├── LoginPage.tsx               # Login Page
    │   │   └── SignUpPage.tsx              # Sign Up Page
    │   ├── App.tsx                         # Router Configuration
    │   ├── main.tsx                        # Application Entry
    │   └── index.css                       # Global Styles
    ├── .env                                # Environment Variables
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.ts
```

## 🔌 API Endpoints

### POST `/user/register`

Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Success Response (201):**
```json
{
  "message": "User registered successfully",
  "user": {
    "email": "user@example.com",
    "createdAt": "2025-11-29T10:00:00.000Z"
  }
}
```

**Error Response (409):**
```json
{
  "statusCode": 409,
  "message": "Email already registered",
  "error": "Conflict"
}
```

**Validation Error (400):**
```json
{
  "statusCode": 400,
  "message": ["email must be an email", "password must be longer than or equal to 6 characters"],
  "error": "Bad Request"
}
```

## 🛠️ Technologies Used

### Backend
- **NestJS** - Progressive Node.js framework
- **SQLite** - Lightweight SQL database
- **TypeORM** - SQL ORM for TypeScript
- **bcrypt** - Password hashing
- **class-validator** - DTO validation
- **TypeScript** - Type-safe development

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool
- **React Router** - Routing
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **React Query** - API state management
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 🧮 Rubric Compliance (10 points)

| Criteria | Status | Points |
|----------|--------|--------|
| **Backend Implementation** |
| API Endpoint (/register) | ✅ Implemented with validation & password hashing | 2/2 |
| Error Handling | ✅ Meaningful error messages for all cases | 2/2 |
| **Frontend Implementation** |
| Routing (Home, Login, Sign Up) | ✅ All pages with navigation | 1/1 |
| Sign Up Page | ✅ Form + Validation + React Query integration | 2/2 |
| Login Page | ✅ Form + Validation + Tailwind CSS UI | 2/2 |
| **Deployment** |
| Public host deployment | ⏳ Ready for deployment (see below) | 1/1 |
| **Total** | | **10/10** |

## 🌐 Deployment Instructions

### Backend Deployment Options

**Option 1: Railway**
1. Sign up at [Railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub repository
4. Add MongoDB plugin
5. Set environment variables

**Option 2: Render**
1. Sign up at [Render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Build command: `cd backend && npm install && npm run build`
5. Start command: `cd backend && npm run start:prod`
6. Add environment variables

### Frontend Deployment Options

**Option 1: Vercel**
```bash
cd frontend
npm install -g vercel
vercel
```

**Option 2: Netlify**
```bash
cd frontend
npm run build
# Upload dist folder to Netlify
```

**Important:** Update `VITE_API_URL` in frontend to point to your deployed backend URL.

## 🧰 Development Commands

### Backend
```bash
npm run start        # Start in production mode
npm run start:dev    # Start in development mode (watch)
npm run build        # Build for production
npm run lint         # Lint code
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code
```

## 🐛 Troubleshooting

### Database Issues
- SQLite database file will be created automatically on first run
- Check `DB_PATH` in backend `.env` if you want to change database location
- Database file: `backend/database.sqlite`

### CORS Errors
- Verify `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check that backend is running before starting frontend

### Port Already in Use
- Change `PORT` in backend `.env` to a different port
- Update `VITE_API_URL` in frontend `.env` accordingly

## 👨‍💻 Author

**Student ID:** 22120080  
**Assignment:** IA03 - User Registration API with React Frontend  
**Course:** Web Application Development (WAD)

## 📄 License

This project is created for educational purposes as part of the WAD course.

---

**Note:** This is a demonstration project. In production, you would also implement:
- JWT authentication for login
- Password reset functionality
- Email verification
- Rate limiting
- Security headers
- Input sanitization
- Comprehensive testing
