import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, StoreConfig, CartItem } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_CONFIG } from '../constants';

interface StoreContextType {
  products: Product[];
  orders: Order[];
  config: StoreConfig;
  cart: CartItem[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  updateConfig: (config: Partial<StoreConfig>) => void;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  checkout: (details: { name: string; email: string; address: string; phone: string }) => string;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [config, setConfig] = useState<StoreConfig>(INITIAL_CONFIG);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts([...products, { ...product, id: newId }]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(products.map(p => (p.id === id ? { ...p, ...updatedProduct } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const updateConfig = (newConfig: Partial<StoreConfig>) => {
    setConfig(prev => ({ ...prev, ...newConfig }));
  };

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        productId: product.id,
        name: product.name,
        price: product.comparePrice || product.price,
        quantity,
        image: product.image
      }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o => (o.id === id ? { ...o, status } : o)));
  };

  const checkout = (details: { name: string; email: string; address: string; phone: string }) => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId = `ORD-${Date.now().toString().slice(-6)}`;
    
    const newOrder: Order = {
      id: orderId,
      customerName: details.name,
      customerEmail: details.email,
      customerPhone: details.phone,
      deliveryAddress: details.address,
      items: cart,
      total,
      status: 'pending',
      date: new Date().toISOString()
    };
    
    setOrders([newOrder, ...orders]);
    clearCart();
    return orderId;
  };

  return (
    <StoreContext.Provider value={{
      products,
      orders,
      config,
      cart,
      addProduct,
      updateProduct,
      deleteProduct,
      updateConfig,
      addToCart,
      removeFromCart,
      clearCart,
      updateOrderStatus,
      checkout
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
