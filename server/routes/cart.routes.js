import express from "express";
import { addToCart, getCart } from "../controllers/cart.controller.js";
const cartRoutes = express.Router();

cartRoutes.post("/add", addToCart);
cartRoutes.get("/", getCart);

export default cartRoutes;
