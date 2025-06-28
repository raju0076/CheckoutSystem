import express from "express";
import { connectDB } from "./config/mongo.config.js";
import dotenv from "dotenv"
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
dotenv.config()

const PORT= process.env.PORT
const app=express()
app.use(express.json())



connectDB()
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);


app.listen(PORT,()=>{
    console.log(`serven on ${PORT}`)
})