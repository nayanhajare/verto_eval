# 📦 Warehouse API

A backend-heavy API built with **Node.js, Express, and MongoDB** to track and manage products in a warehouse.

---

## 🚀 Features

### **Core Features**
- **Product Management**: Full CRUD (Create, Read, Update, Delete) operations for products.
- **Inventory Logic**:
  - Prevents stock from going below zero.
  - Endpoints to **increase** and **decrease** stock.
- **Error Handling**: Returns meaningful error responses (e.g., `400 Bad Request` for invalid stock operations).

### **Bonus Features ✨**
- `low_stock_threshold` field for products.
- Endpoint to list products that are below the defined stock threshold.
- Unit tests for stock addition and removal, including edge cases.

---

## 🛠️ Tech Stack
- **Backend Framework**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ORM
- **Testing**: Jest & Supertest

---

## 📂 Project Structure
```
warehouse-api/
│── models/            # Mongoose schemas
│── routes/            # Express routes
│── controllers/       # Business logic
│── tests/             # Jest test cases
│── app.js             # Express app setup
│── server.js          # Server entry point
│── package.json       # Dependencies and scripts
│── README.md          # Documentation
```

---

## ⚙️ Setup & Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/warehouse-api.git
cd warehouse-api
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
Create a `.env` file in the root folder:
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/warehouseDB
```

4. **Run the server**
```bash
npm run dev
```
Server will start at `http://localhost:5000` 🚀

---

## 🔑 API Endpoints

### **Product Management**
- `POST   /api/products` → Create a product
- `GET    /api/products` → Get all products
- `GET    /api/products/:id` → Get product by ID
- `PUT    /api/products/:id` → Update product
- `DELETE /api/products/:id` → Delete product

### **Stock Management**
- `POST /api/products/:id/increase` → Increase stock
- `POST /api/products/:id/decrease` → Decrease stock

### **Low Stock**
- `GET /api/products/low-stock` → Get all products below threshold

---

## 📬 Postman Queries

### Create Product
```http
POST http://localhost:5000/api/products
Content-Type: application/json

{
  "name": "Laptop",
  "description": "Dell XPS 15",
  "stock_quantity": 10,
  "low_stock_threshold": 5
}
```

### Increase Stock
```http
POST http://localhost:5000/api/products/<PRODUCT_ID>/increase
Content-Type: application/json

{
  "amount": 5
}
```

### Decrease Stock
```http
POST http://localhost:5000/api/products/<PRODUCT_ID>/decrease
Content-Type: application/json

{
  "amount": 3
}
```

### Low Stock Products
```http
GET http://localhost:5000/api/products/low-stock
```

*(See full list of Postman queries in `/postman_collection.json`)*

---

## 🧪 Running Tests
```bash
npm test
```
Tests include:
- Stock increase logic
- Stock decrease logic (including insufficient stock error)
- CRUD functionality

---

## 📜 License
MIT © 2025 Your Name