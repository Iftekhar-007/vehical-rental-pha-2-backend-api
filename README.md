###<h2>Vehicle Rental System-Backend</h2>

<h4>Live URL: https://vehicle-alpha.vercel.app/</h4>
<p>A backend service for managing vehicle rentals, customer bookings, admin operations, and secure authentication. Built with Node.js, Express.js, TypeScript, and JWT.</p>


## ⭐ Features

### **👤 User Features**
- **Create rental bookings**
- **View booking details**
- **Cancel or update bookings**
- **Secure login and signup (JWT)**

### **🛠️ Admin Features**
- **Manage all bookings**
- **Update booking status** (returned, cancelled)
- **Role-based access control**

### **⚙️ System Features**
- **Fully typed backend using TypeScript**
- **Modular Express.js architecture**
- **Centralized error handling**
- **Environment-based configuration**
- **Deployed on Vercel**


## 🛠️ Technology Stack

### **Backend**
- **Node.js**
- **Express.js**
- **TypeScript**

### **Authentication**
- **JWT (JSON Web Token)**

### **Database**
- **PostgreSQL**

### **Deployment**
- **Vercel**


## 📁 Project Structure (Modular Pattern)

src/
 ├── modules/
 │    ├── users/
 │    │     ├── users.controller.ts
 │    │     ├── users.service.ts
 │    │     ├── users.routes.ts
 │    │     └── users.validation.ts
 │    ├── bookings/
 │    ├── vehicles/
 │    └── ...
 ├── middleware/
 ├── config/
 ├── app.ts
 └── server.ts

 ## ⚙️ Project Setup


 ```bash

 **1️⃣ Clone the Repository**

git clone (https://github.com/Iftekhar-007/vehical-rental-pha-2-backend-api)
cd your-repo-name

2️⃣ Install Dependencies
npm install

3️⃣ Environment Variables
in the config file

🚀 Running the Project
🔹 Development Mode

(TypeScript live compile with ts-node-dev)

npm run dev

🔹 Build the Project
npm run build

🔹 Run Compiled JavaScript
npm start



📦 Usage Instructions
🔐 Authentication

Signup → /api/v1/auth/signup

Login → /api/v1/auth/login
Login করলে JWT token পাবে — Authorization  --->  Bearer Token এ দিতে হবে:

Authorization: Bearer <token>
