import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

export const seedProducts = async (req, res) => {
  const items = [
    { name: "A", price: 30 },
    { name: "B", price: 20 },
    { name: "C", price: 50 },
    { name: "D", price: 15 },
  ];
  await Product.insertMany(items);
  res.send("Products seeded");
};
