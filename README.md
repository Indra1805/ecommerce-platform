# Full-Stack E-Commerce Platform

A production-oriented **full-stack e-commerce application** built with **React** and **Django**, focusing on clean architecture, secure authentication, and real-world business workflows such as cart management, wishlists, and order lifecycle handling.

This project is designed to demonstrate how modern frontend applications integrate with a backend using **secure JWT authentication**, **HttpOnly cookies**, and **well-structured REST APIs**.

---

## 🚀 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Context API
- REST API integration

### Backend
- Django
- Django REST Framework
- JWT Authentication (Access & Refresh Tokens)
- HttpOnly Cookies
- CSRF Protection
- SQLite (development)

---

## 🔐 Authentication & Security

This project implements a **production-grade authentication flow** inspired by real-world systems:

- Short-lived JWT access tokens
- Refresh tokens stored in **HttpOnly cookies** to mitigate XSS attacks
- Silent access-token refresh on application load
- CSRF protection on refresh and logout endpoints
- Protected frontend routes for authenticated users
- Secure logout with refresh-token invalidation

This approach closely mirrors how authentication is handled in modern production applications.

---

## 🛒 Core Features

- Product listing and product details pages
- Cart management with quantity updates
- Wishlist management per authenticated user
- Order creation directly from cart
- Snapshot-based order items to preserve historical pricing
- Order history and order details pages
- Order cancellation with status updates
- Fully responsive, mobile-first UI

---

## 🧠 Key Architectural Decisions

- **Centralized API layer** on the frontend for consistent token handling and error management
- **Context-based state management** for authentication, cart, and wishlist
- **Snapshot-based order modeling** to ensure order history remains accurate even if product data changes
- Clear separation between UI components and business logic
- RESTful API design with strict per-user data isolation

---

## 📁 Project Structure

# Full-Stack E-Commerce Platform

A production-oriented **full-stack e-commerce application** built with **React** and **Django**, focusing on clean architecture, secure authentication, and real-world business workflows such as cart management, wishlists, and order lifecycle handling.

This project is designed to demonstrate how modern frontend applications integrate with a backend using **secure JWT authentication**, **HttpOnly cookies**, and **well-structured REST APIs**.

---

## 🚀 Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router
- Context API
- REST API integration

### Backend
- Django
- Django REST Framework
- JWT Authentication (Access & Refresh Tokens)
- HttpOnly Cookies
- CSRF Protection
- SQLite (development)

---

## 🔐 Authentication & Security

This project implements a **production-grade authentication flow** inspired by real-world systems:

- Short-lived JWT access tokens
- Refresh tokens stored in **HttpOnly cookies** to mitigate XSS attacks
- Silent access-token refresh on application load
- CSRF protection on refresh and logout endpoints
- Protected frontend routes for authenticated users
- Secure logout with refresh-token invalidation

This approach closely mirrors how authentication is handled in modern production applications.

---

## 🛒 Core Features

- Product listing and product details pages
- Cart management with quantity updates
- Wishlist management per authenticated user
- Order creation directly from cart
- Snapshot-based order items to preserve historical pricing
- Order history and order details pages
- Order cancellation with status updates
- Fully responsive, mobile-first UI

---

## 🧠 Key Architectural Decisions

- **Centralized API layer** on the frontend for consistent token handling and error management
- **Context-based state management** for authentication, cart, and wishlist
- **Snapshot-based order modeling** to ensure order history remains accurate even if product data changes
- Clear separation between UI components and business logic
- RESTful API design with strict per-user data isolation

---

## 📁 Project Structure

ecommerce-platform:
  frontend:
    src:
      components: Reusable UI components
      pages: Route-level pages
      context: Auth, Cart, Wishlist contexts
      services: API communication layer
      hooks: Custom React hooks
    public: Static assets
  backend:
    products: Product and category APIs
    cart: Cart management APIs
    wishlist: Wishlist APIs
    orders: Order creation, history, cancellation
    users: Authentication and user-related logic
    manage.py: Django entry point



---

## ⚙️ Environment Configuration

This project uses environment variables for configuration.

### Backend
- `.env` → local development (not committed)
- `.env.example` → documented configuration

### Frontend
- `.env.local` → local development (not committed)
- `.env.example` → documented configuration

This setup keeps secrets secure while making the project easy to configure.

---

## ▶️ Getting Started (Development)

### Backend
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


### Frontend

```bash
npm install
npm run dev



possible_improvements:
  - Payment gateway integration (e.g., Stripe)
  - Extended order lifecycle (shipped, delivered, returned)
  - Pagination and filtering for order history
  - Role-based access control for admin features
  - Improved loading skeletons and global error boundaries

notes: >
  This project prioritizes engineering quality, security, and architectural clarity
  over UI polish alone. It is intended to serve as a solid foundation for a real-world
  e-commerce system, demonstrating secure frontend-backend integration rather than
  acting as a marketplace or payment-ready product.

author:
  name: Virat

