# AI Resume Analyzer
A full-stack web application that analyzes your resume and gives instant, actionable feedback to help you land your next job.

## Live Demo
- Frontend: https://ai-resume-analyzer-sa.netlify.app
- Backend: https://ai-resume-analyzer-pt6e.onrender.com

## What It Does
Upload your resume as a PDF, and the app will:
- Calculate an **ATS Score** to show how well your resume performs against applicant tracking systems
- Identify **missing skills** compared to what's required for your target role
- Generate a personalized **roadmap** to help you learn and develop those missing skills
- Suggest a **suitable job role** based on the skills detected in your resume
- Display everything on a clean, **dark-themed** dashboard

## Tech Stack
**Frontend**
- React (Vite)
- Tailwind CSS
- Axios
- React Router

**Backend**
- Node.js
- Express
- MongoDB (Mongoose)
- Multer (file upload handling)

## How It Works
1. User uploads a resume (PDF) through the frontend.
2. The file is sent to the backend via a REST API call.
3. The backend extracts text from the PDF and analyzes it against a set of required technical skills.
4. It returns an ATS score, missing skills, a suggested role, and a roadmap.
5. The frontend displays the results in a clean, easy-to-read dashboard.

## Running Locally

**Backend**
```bash
cd backend
npm install
# create a .env file with:
# MONGO_URI=your_mongodb_connection_string
npm start
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

## Future Improvements
- Integrate Google Gemini API for deeper, AI-generated resume feedback
- Add user authentication to save analysis history
- Support additional file formats (.docx)
- Add unit tests
