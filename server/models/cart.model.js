import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: Number,
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  createdAt: { type: Date, default: Date.now },
});

export const Cart= mongoose.model("Cart", cartSchema);
