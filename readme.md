# Doan Store E-Commerce

A full-stack e-commerce catalog application built with React.js (frontend) and Django (backend). The application allows users to browse products, filter and sort them, manage shopping carts, and authenticate with a login/signup system.

## Features

- **User Authentication**

  - User registration and login with JWT authentication
  - Password reset functionality
  - Protected routes for authenticated users

- **Product Management**

  - Product listing with detailed information
  - Category-based filtering
  - Price range filtering
  - Sorting by price and name
  - Pagination with 10 products per page

- **Shopping Cart**

  - Add products to cart
  - View and update cart items
  - Remove items from cart
  - Persistent cart for authenticated users

- **Order Management**

  - Place orders from cart
  - View order history and details
  - Track order status

- **Admin Panel**

  - Manage products (CRUD operations)
  - View and update orders
  - Role-based access control

- **Responsive Design**
  - Mobile-friendly interface
  - Adapts to different screen sizes

## Technology Stack

### Frontend

- React.js with hooks
- Vite for fast development and building
- Material-UI for UI components
- Redux Toolkit for state management
- React Router for client-side routing
- Axios for API requests

### Backend

- Django for the web framework
- Django REST Framework for API endpoints
- JWT authentication with Simple JWT
- SQLite for the database (can be switched to PostgreSQL for production)
- CORS handling for frontend-backend communication

## Project Structure

```
doan-ecommerce/
├── frontend/           # React.js with Vite
│   ├── public/         # Public assets
│   └── src/
│       ├── assets/     # Static assets
│       ├── components/ # Reusable components
│       ├── pages/      # Page components
│       ├── redux/      # Redux state management
│       ├── services/   # API services
│       └── utils/      # Utility functions
└── backend/            # Django project
    └── ecommerce_backend/
        ├── users/      # User authentication and profiles
        ├── products/   # Product and category management
        └── orders/     # Order and cart management
```

## Setup Instructions

### Prerequisites

- Python 3.9 or higher
- Node.js 18 or higher
- npm 9 or higher

### Backend Setup

1. Create and activate a virtual environment:

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install django djangorestframework django-cors-headers djangorestframework-simplejwt Pillow
   ```

3. Navigate to the Django project:

   ```bash
   cd ecommerce_backend
   ```

4. Apply migrations:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Create a superuser:

   ```bash
   python manage.py createsuperuser
   ```

6. Run the server:
   ```bash
   python manage.py runserver
   ```

The backend server will be available at http://localhost:8000/.

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:
   ```bash
   pnpm dev
   ```

The frontend will be available at http://localhost:5173/ (or another port if 5173 is in use).

## API Endpoints

### Authentication

- `POST /api/users/register/` - Register a new user
- `POST /api/users/login/` - Login and get tokens
- `POST /api/users/token/refresh/` - Refresh access token
- `GET /api/users/profile/` - Get user profile
- `PUT /api/users/profile/` - Update user profile

### Products

- `GET /api/products/` - List all products
- `GET /api/products/{id}/` - Get a specific product
- `POST /api/products/` - Create a product (admin only)
- `PUT /api/products/{id}/` - Update a product (admin only)
- `DELETE /api/products/{id}/` - Delete a product (admin only)
- `GET /api/products/categories/` - List all categories

### Cart and Orders

- `GET /api/orders/cart/` - Get current user's cart
- `POST /api/orders/cart/items/` - Add item to cart
- `PUT /api/orders/cart/items/{id}/` - Update cart item
- `DELETE /api/orders/cart/items/{id}/` - Remove item from cart
- `POST /api/orders/orders/` - Create an order from cart
- `GET /api/orders/orders/` - Get user's orders
- `GET /api/orders/orders/{id}/` - Get specific order
- `PATCH /api/orders/orders/{id}/` - Update order status (admin only)

## Deployment

### Frontend

The frontend of this project has been deployed to **Vercel**. It includes an environment variable that points to the backend API for seamless integration.

<a href="https://doan-ecommerce.vercel.app/" target="_blank">Frontend Link</a>

### Backend

The backend has been **dockerized** and deployed to a **Digital Ocean VPS** using Droplets. The deployment includes the following setup:

- Requests are allowed only from the specific frontend host through its IP.
- The backend is configured with **ngrok** to expose the API endpoint securely.

<a href="https://doan-commerce-api.duckdns.org/admin" target="_blank">Django Admin Link</a>

### Environment Variables

Ensure the following environment variables are set correctly:

- **Frontend**: API URL pointing to the backend.
- **Backend**: Proper configuration for allowed hosts and ngrok setup.

This setup ensures a smooth and secure connection between the frontend and backend.

## Deployment Recommendations

### Backend

For production, consider:

- Using PostgreSQL instead of SQLite
- Configuring proper environment variables
- Setting up static and media file hosting
- Securing the Django application
- Using Gunicorn or uWSGI as a WSGI server
- Setting up Nginx as a reverse proxy

### Frontend

For production, consider:

- Building the React application with `npm run build`
- Deploying to a static file hosting service
- Setting up proper environment variables for API endpoints
- Configuring CORS correctly for production

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Material-UI for the UI components
- Django REST Framework for the API framework
- React and Redux for the frontend architecture
