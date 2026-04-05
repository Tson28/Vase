# CLAUDE.md

## 🧠 Project Overview

Project name: **Vase**

Vase is a full-featured e-commerce platform for selling AI tool accounts (user/password), targeting developers and tech users. The platform provides a seamless experience for browsing, purchasing, and managing AI-related digital products.

This project is built by a team of 3 developers with separated frontend and backend architecture.

---

## 🏗️ Tech Stack

### Frontend

* Next.js (React framework)
* TailwindCSS
* Component Library: (flexible, prefer modern libraries like shadcn/ui)
* State management: optional (Zustand or React Context)

### Backend

* Node.js
* Express.js (or similar minimal framework)

### Database

* MongoDB
* Mongoose (ODM)

### Authentication

* NextAuth.js (handled in frontend or gateway layer)

### Payment

* MoMo payment gateway integration

### Package Manager

* npm

---

## 📁 Project Structure

This is a separated architecture:

* `/frontend` → Next.js app
* `/backend` → Node.js API server

Frontend handles UI and authentication flow. Backend handles business logic, database, and payment processing.

---

## 👥 Team Responsibilities

* Frontend Developer (User):

  * UI/UX implementation
  * API integration
  * State management
  * Auth integration (NextAuth)

* Backend Developers:

  * API design
  * Database schema
  * Payment integration (MoMo)
  * Business logic

---

## 🎯 Core Features

* User authentication (login/register)
* Product listing (AI accounts)
* Product detail
* Cart and checkout
* MoMo payment integration
* Order management
* Delivery system (account distribution)
* User dashboard (orders + purchased accounts)
* Admin panel (products, users, orders, inventory)

---

## 🔑 Product Logic

Products are AI accounts (username/password).

Important:

* Accounts must be stored securely
* Each purchase assigns one account to a user
* Prevent duplicate assignment
* Inventory must be tracked

---

## ⚙️ Development Commands

### Frontend

* Install: `npm install`
* Dev: `npm run dev`
* Build: `npm run build`
* Start: `npm start`

### Backend

* Install: `npm install`
* Dev: `npm run dev`
* Start: `npm start`

---

## 🧠 Coding Guidelines

* Prioritize simplicity and working features over perfection
* Write clean, readable code but avoid over-engineering
* Use modular structure
* Reuse components when possible
* Avoid unnecessary abstractions

### Comments

* Use **Vietnamese** for code comments
* Keep comments short and clear

---

## 🎨 Frontend Guidelines

* Use TailwindCSS for styling
* Follow modern SaaS UI design
* Ensure responsive design (mobile + desktop)
* Use reusable components
* Keep UI clean and minimal

### UI Language

* Can use English or Vietnamese depending on context

---

## 🔐 Security Rules

* Never expose raw account data in API responses unless authorized
* Encrypt sensitive data if possible
* Validate all inputs on backend
* Use proper authentication checks

---

## 🚫 Boundaries (VERY IMPORTANT)

### Allowed

* Install new npm packages when needed
* Refactor code for clarity or improvement

### Ask Before Doing

* Changing database schema
* Modifying core business logic (order, payment, account delivery)

### Not Allowed

* Breaking existing working features
* Introducing unnecessary complexity

---

## 🔄 API Rules

* Use RESTful conventions
* Keep endpoints simple and predictable
* Always handle error cases
* Return consistent response format

---

## 🧩 Database Rules

* Use Mongoose models
* Keep schema simple and flexible
* Avoid deep nesting
* Use references where needed

⚠️ IMPORTANT:

* Any schema change must be approved first

---

## 💳 Payment Rules

* Integrate MoMo properly with callback/webhook
* Verify payment before marking order as "paid"
* Never trust frontend payment status

---

## 🚀 Development Philosophy

* Build fast, iterate quickly
* Focus on core functionality first
* Optimize later if needed

---

## 📌 Notes for AI Agent

* Always understand context before coding
* Do not assume missing requirements
* If unsure → ask instead of guessing
* Prefer simple working solutions over complex ones
* Keep consistency across frontend and backend

---

End of CLAUDE.md
