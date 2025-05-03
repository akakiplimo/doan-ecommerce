#!/bin/bash
# E-Commerce Project Initialization Script

# Text colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print section header
section() {
  echo -e "${BLUE}==== $1 ====${NC}"
}

# Print success message
success() {
  echo -e "${GREEN}✓ $1${NC}"
}

# Print error message
error() {
  echo -e "${RED}✗ $1${NC}"
  exit 1
}

# Check if command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
section "Checking Prerequisites"

# Check Python
if command_exists python3; then
  PYTHON_VERSION=$(python3 --version)
  success "Python is installed: $PYTHON_VERSION"
else
  error "Python 3 is not installed. Please install Python 3.9 or higher."
fi

# Check Node.js
if command_exists node; then
  NODE_VERSION=$(node --version)
  success "Node.js is installed: $NODE_VERSION"
else
  error "Node.js is not installed. Please install Node.js 18 or higher."
fi

# Check npm
if command_exists npm; then
  NPM_VERSION=$(npm --version)
  success "npm is installed: $NPM_VERSION"
else
  error "npm is not installed. Please install npm 9 or higher."
fi


# Check pnpm
if command_exists npm; then
  PNPM_VERSION=$(pnpm --version)
  success "pnpm is installed: $PNPM_VERSION"
else
  error "pnpm is not installed. Please install pnpm 8 or higher."
fi

# Create project directories
section "Creating Project Structure"

mkdir -p doan-ecommerce
cd doan-ecommerce
mkdir -p frontend backend
success "Project directory structure created"

# Setup Backend
section "Setting up Django Backend"

cd backend

# Create virtual environment
python3 -m venv venv
if [ $? -ne 0 ]; then
  error "Failed to create virtual environment"
fi
success "Virtual environment created"

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  source venv/Scripts/activate
else
  source venv/bin/activate
fi
success "Virtual environment activated"

# Install Django dependencies
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt Pillow
if [ $? -ne 0 ]; then
  error "Failed to install Django dependencies"
fi
success "Django dependencies installed"

# Create Django project
django-admin startproject ecommerce_backend
cd ecommerce_backend

# Create Django apps
python manage.py startapp users
python manage.py startapp products
python manage.py startapp orders
success "Django project and apps created"

echo "
# Next steps for Django backend:
# 1. Update settings.py with the configuration from the backend structure document
# 2. Create models in each app
# 3. Create serializers, views, and configure URLs
# 4. Run migrations and create superuser
" > BACKEND_SETUP_NOTES.txt

cd ../..

# Setup Frontend
section "Setting up React Frontend"

cd frontend

# Initialize Vite project
npm create vite@latest . -- --template react
if [ $? -ne 0 ]; then
  error "Failed to create Vite project"
fi
success "Vite React project created"

# Install dependencies
pnpm install
pnpm install @mui/material @emotion/react @emotion/styled
pnpm install @mui/icons-material
pnpm install react-router-dom
pnpm install @reduxjs/toolkit react-redux
pnpm install axios
pnpm install jwt-decode
if [ $? -ne 0 ]; then 
  error "Failed to install frontend dependencies"
fi
success "Frontend dependencies installed"

# Create directory structure
mkdir -p src/assets
mkdir -p src/components/{common,admin,auth,cart,layouts,orders,products}
mkdir -p src/pages/admin
mkdir -p src/redux/slices
mkdir -p src/services
mkdir -p src/utils
success "Frontend directory structure created"

echo "
# Next steps for React frontend:
# 1. Create Redux store and slices
# 2. Implement API services
# 3. Create components and pages
# 4. Set up routing in App.jsx
" > FRONTEND_SETUP_NOTES.txt

cd ..

# Final instructions
section "Project Initialization Complete"

echo "
Your e-commerce project has been initialized successfully!

Project Structure:
  doan-ecommerce/
  ├── backend/         - Django backend
  │   └── ecommerce_backend/
  │       ├── users/
  │       ├── products/
  │       └── orders/
  └── frontend/        - React frontend with Vite

Next Steps:
  1. Follow the instructions in BACKEND_SETUP_NOTES.txt and FRONTEND_SETUP_NOTES.txt
  2. Refer to the provided code templates for implementation details
  3. Start developing your e-commerce application!

To run the backend:
  cd backend
  source venv/bin/activate  # On Windows: venv\\Scripts\\activate
  cd ecommerce_backend
  python manage.py runserver

To run the frontend:
  cd frontend
  pnpm dev
"

success "Happy coding!"