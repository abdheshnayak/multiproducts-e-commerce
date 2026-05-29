export const placeOrder = ({ id, product, qnt }) => {
  const address = JSON.parse(
    localStorage.getItem("addressData")
  );

  if (!address) {
    return {
      success: false,
      message: "Please add address",
    };
  }

  const order = {
    productId: id,
    title: product.title,
    quantity: qnt,
    price: product.price,
    total: product.price * qnt + 40,
    address,
    date: new Date().toDateString(),
  };

  localStorage.setItem(
    "order",
    JSON.stringify(order)
  );

  return {
    success: true,
    order,
  };
};