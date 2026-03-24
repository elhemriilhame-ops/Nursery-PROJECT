import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = useCallback((product, quantity = 1, size = 'Standard') => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size);
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { ...product, quantity, size }];
    });
  }, []);

  const updateQuantity = useCallback((id, size, delta) => {
    setItems(prev =>
      prev.map(i =>
        i.id === id && i.size === size
          ? { ...i, quantity: Math.max(1, i.quantity + delta) }
          : i
      )
    );
  }, []);

  const removeItem = useCallback((id, size) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)));
  }, []);

  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, updateQuantity, removeItem, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
