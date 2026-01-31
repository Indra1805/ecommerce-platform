# Full-Stack E-Commerce Platform

A production-oriented **full-stack e-commerce application** built with **React** and **Django**, focusing on clean architecture, secure authentication, and real-world business workflows such as cart management, wishlists, and order lifecycle handling.

This project demonstrates how modern frontend applications integrate with a backend using **secure JWT authentication**, **HttpOnly cookies**, and **well-structured REST APIs**.

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

- Centralized API layer on the frontend for consistent token handling and error management
- Context-based state management for authentication, cart, and wishlist
- Snapshot-based order modeling to ensure order history remains accurate even if product data changes
- Clear separation between UI components and business logic
- RESTful API design with strict per-user data isolation

---

## ⚙️ Environment Configuration

This project uses environment variables for configuration.

### Backend
- `.env` for local development (not committed)
- `.env.example` to document required variables

### Frontend
- `.env.local` for local development (not committed)
- `.env.example` to document required variables

This setup keeps secrets secure while making the project easy to configure.

---

## ▶️ Getting Started

### Backend
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

---

### Frontend
```bash
npm install
npm run dev

---

## 🔮 Possible Improvements
The current implementation provides a strong production-ready foundation.
The following enhancements could be added to further scale the application:
- Payment gateway integration (e.g., Stripe)
- Extended order lifecycle (shipped, delivered, returned)
- Pagination and filtering for order history
- Role-based access control for admin features
- Improved loading skeletons and global error handling

---

## 📌 Notes

This project prioritizes engineering quality, security, and architectural clarity over UI polish alone.

It is intended to serve as a solid foundation for a real-world e-commerce system, demonstrating secure frontend–backend integration rather than acting as a marketplace or payment-ready product.

---

## 👤 Author

Built and maintained by Virat
