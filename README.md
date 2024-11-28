# 🚴 Bi Cycle Store

## An Inventory Management Application

This repository contains the **Bi Cycle Store**, an Inventory Management Application focusing on backend technologies. It provides robust APIs for managing bicycle inventory and orders. Built using modern tools and technologies, this project demonstrates scalable backend development practices.

---

## 🔗 Links

- **GitHub Repository**: [Bi Cycle Store](https://github.com/Nadim-Nion/bi-cycle-store)
- **Live Deployment**: [Live on Vercel](https://bi-cycle-store-six.vercel.app/)
- **Live Demo**: [Loom Video](https://www.loom.com/share/b1a758227fd34c8aaa44af4264e0f982?sid=5b693e13-8baf-490d-839c-66031ff389c9)

---

## 💻 Technologies Used

- **Programming Language**: TypeScript
- **Frameworks and Libraries**:
  - Node.js
  - Express.js
  - Mongoose
  - Zod (for validation)
- **Database**: MongoDB
- **Tools**:
  - MongoDB Compass (Database Management)
  - Postman (API Testing)

---

## 🚀 Features

1. **CRUD Operations for Products**:
   - Add, view, update, and delete bicycle details.
2. **Order Management**:
   - Place orders and manage inventory dynamically.
3. **Revenue Calculation**:
   - Calculate total revenue using MongoDB aggregation.
4. **Search Functionality**:
   - Search bicycles by `name`, `brand`, or `type` using query parameters.
5. **Inventory Management**:
   - Automatically update stock levels when orders are placed.
   - Handle insufficient stock scenarios.

---

## 🛠️ API Endpoints

### Common Path: `/api/v1/products`

1. **Create a Bicycle**

   - **Endpoint**: `/createProduct`
   - **Method**: `POST`

2. **Get All Bicycles**

   - **Endpoint**: `/`
   - **Method**: `GET`
   - **Query**: `?searchTerm=type`

3. **Get a Specific Bicycle**

   - **Endpoint**: `/:productId`
   - **Method**: `GET`

4. **Update a Bicycle**

   - **Endpoint**: `/:productId`
   - **Method**: `PUT`

5. **Delete a Bicycle**
   - **Endpoint**: `/:productId`
   - **Method**: `DELETE`

---

### Common Path: `/api/v1/orders`

6. **Order a Bicycle**

   - **Endpoint**: `/`
   - **Method**: `POST`

7. **Calculate Revenue from Orders**
   - **Endpoint**: `/revenue`
   - **Method**: `GET`

---

## ⚙️ Setting Up Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Nadim-Nion/bi-cycle-store.git
   cd bicycle-store
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:  
   Create a `.env` file in the root directory with the following variables:

   ```env
   MONGO_URI=your-mongodb-connection-string
   PORT=5000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Test the APIs using Postman or your preferred API testing tool.

---

## 🧪 Testing API Endpoints

Use **Postman** or **MongoDB Compass** to test API functionality.

---

## About Me

Hi, I am Nadim Mahmud Nion. I have recently concluded my graduation from the department of Computer Science and Engineering (CSE) at the Daffodil International University (DIU). I have been learning MERN Stack Web Development since 2022. I am expertise in the following skills:

- React

- Express.js

- TypeScript

- Mongoose

- Postman

- MongoDB Compass

- NoSQLBooster

- Node.js

- MongoDB Atlas

- JWT

- Stripe

- Vite

- React Router

- Firebase (Authentication & Hosting)

- Vercel

- JavaScript

- Advanced JavaScript

- Daisy UI

- Bootstrap

- Tailwind

- HTML5

- CSS3

- Media Query

I have built multiple projects using these skills. You are invited to my GitHub profile to know about my projects and don't forget to give a star to my projects.
