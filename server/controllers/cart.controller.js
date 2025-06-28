import { Cart } from "../models/cart.model.js";
import { calculateDiscounts } from "../services/discount.service.js";



export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  let cart = await Cart.findOne();

  if (!cart) {
    cart = new Cart({ items: [] });
  }

  const index = cart.items.findIndex(item => item.product.equals(productId));

  if (index !== -1) {
    cart.items[index].quantity += quantity
  } else {
    cart.items.push({ product: productId, quantity })
  }

  await cart.save();
  res.status(200).json({ message: "Item added to cart", cart })
};

export const getCart = async (req, res) => {
  const cart = await Cart.findOne().populate("items.product");

  if (!cart) return res.status(404).json({ message: "Cart is empty" });

  const { total, discounts } = calculateDiscounts(cart.items);

  res.json({
    items: cart.items.map(i => ({
      name: i.product.name,
      quantity: i.quantity,
      price: i.product.price,
    })),
    total,
    discounts
  });
};
