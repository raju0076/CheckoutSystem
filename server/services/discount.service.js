export const calculateDiscounts = (items) => {
  let total = 0
  let discounts = 0

  for (const item of items) {
    const { product, quantity } = item
    const { name, price } = product;

    if (name === "A") {
      const sets = Math.floor(quantity / 3)
      const remaining = quantity % 3;
      total += sets * 85 + remaining *price
      discounts += sets * (3*price - 85)
    } 
    else if (name === "B") {
      const sets = Math.floor(quantity / 2)
      const remaining = quantity % 2;
      total += sets * 35 + remaining* price
      discounts += sets * (2 * price - 35)
    } 
    else {
      total += quantity * price
    }
  }

  if (total > 150) {
    total -= 20;
    discounts += 20;
  }

  return { total, discounts }
};
