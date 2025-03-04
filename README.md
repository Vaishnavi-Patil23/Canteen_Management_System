# Canteen Management System

## Introduction

The **Canteen Management System** is a MERN stack-based web application that facilitates online food ordering and management for both customers and canteen owners. It allows customers to browse the menu, place orders, and track their order status while enabling owners to manage the menu, process orders, and update order statuses.

## Features

### Customer Features:

- View menu items with prices and availability
- Place food orders
- Track order status (Pending, In Progress, Completed)
- View past orders
- Participate in anonymous chat

### Owner Features:

- Add, edit, or remove menu items
- View and manage customer orders
- Update order status (Pending, In Progress, Completed)
- Engage in anonymous chat

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Tokens)
- **State Management:** React Context API

## Installation

### Prerequisites:

- Node.js installed
- MongoDB set up locally or using MongoDB Atlas

### Steps:

1. **Clone the repository:**
   git clone https://github.com/Vaishnavi-Patil23/Canteen_Management_System.git)
   cd canteen-management-system

2. **Install dependencies:**
   - Frontend:
     cd frontend
     npm install

   - Backend:
     cd backend
     npm install

3. **Set up environment variables:**
   - Create a `.env` file in the backend directory and add:
     MONGO_URI=mongodb+srv://vp657741:SnQNRnb3YuIWwU2T@canteenmanagementsys.shftc.mongodb.net/?retryWrites=true&w=majority&appName=CanteenManagementSys
     JWT_SECRET="CanteenProject"

4. **Run the application:**
   - Start backend server:
     cd backend
     node index.js

   - Start frontend server:
     cd frontend
     npm start

5. **Access the application:**
   Open `http://localhost:3000` in your browser.

## Future Enhancements

- Add a rating and review system for menu items
- Implement real-time order tracking using WebSockets

6. **Some important Creadentials for use**
  Customer Signin ID:
  Name: Customer1
  Email: customer1@gmail.com
  Password: 123
  
  Owner/Admin Signin Id:
  Email: owner@canteen.com
  Password: owner123
