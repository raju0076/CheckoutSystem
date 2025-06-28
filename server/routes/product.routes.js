import express from "express";
import { getProducts, seedProducts } from "../controllers/product.controller.js";
const productRoutes = express.Router();

productRoutes.get("/", getProducts);
productRoutes.post("/seed", seedProducts);

export default productRoutes;
