// context/CartContext.jsx
import { AcceleratedAnimation } from "motion/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load cart từ localStorage khi load trang
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Cập nhật localStorage mỗi khi cart thay đổi
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }
    console.log(cart);

    setCart(updatedCart);
  };

  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartPrice = cart.reduce((acc, item) => acc + item.retailed_price, 0);

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Loại bỏ nếu số lượng = 0
    setCart(updatedCart);
  };

  const removeCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  }


  return (
    <CartContext.Provider 
      value={{ 
        cart,
        setCart,
        addToCart,
        cartQuantity,
        cartPrice,
        increaseQuantity,
        decreaseQuantity,
        removeCart }}>
      {children}
    </CartContext.Provider>
  );
};
