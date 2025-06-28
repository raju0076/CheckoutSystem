# 🛒 Shopping Cart API (Backend)

This is a backend project using **Node.js**, **Express.js**, and **MongoDB**.  
You can use it to:

- Show all products (A, B, C, D)
- Add products to cart
- See cart total with discounts

---

🧰 Tech Stack Used :-

        Node.js – Backend runtime

        Express.js – Web framework

        MongoDB – Database

        Mongoose – Connects MongoDB with Node.js

        dotenv – For using environment variables

        nodemon – Auto-restarts server while developing



server/
├── index.js      # Main entry point of the app
├── .env          # Environment variables file
├── package.json   # Project config and scripts
│
├── config/
│ └── mongo.config.js    # MongoDB connection setup
│
├── controllers/
│ ├── cart.controller.js      # Cart-related logic
│ └── product.controller.js   # Product-related logic
│
├── models/
│ ├── cart.model.js      # Cart schema
│ └── product.model.js    # Product schema
│
├── routes/
│ ├── cart.routes.js       # All cart routes
│ └── product.routes.js     # All product routes
│
├── services/
│ └── discount.service.js      # Business logic like discounts
│
└── README.md    # This file


## 🔗 API Routes

   ✅ [GET] /products
        Get all products.
    ✅ [POST] /cart/add
        Add a product to the cart.
    ✅ [GET] /cart
        Get the full cart with product name, quantity, price, total, and discount.

        
    
## ✅ How to Install

### 1. Clone the project
```bash
git clone https://github.com/raju0076/CheckoutSystem

cd server
