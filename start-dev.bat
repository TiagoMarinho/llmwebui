@echo off
cd backend
start cmd /k "npm run dev"
cd ..
cd frontend
start cmd /k "npm run dev"