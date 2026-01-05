import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

// Helper to safely parse JSON from localStorage
// Changed to function declaration to avoid JSX generic parsing issues
function getInitialState<T>(key: string, defaultValue: T): T {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error: unknown) {
    console.error(`Error parsing state from localStorage for key "${key}":`, error);
    return defaultValue;
  }
}

// Explicitly define children prop type for React.FC, as PropsWithChildren is not allowed.
export const StoreProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => getInitialState<Product[]>('spiritflow_products', INITIAL_PRODUCTS));
  const [orders, setOrders] = useState<Order[]>(() => getInitialState<Order[]>('spiritflow_orders', INITIAL_ORDERS));
  const [config, setConfig] = useState<StoreConfig>(() => getInitialState<StoreConfig>('spiritflow_config', INITIAL_CONFIG));
  const [cart, setCart] = useState<CartItem[]>(() => getInitialState<CartItem[]>('spiritflow_cart', []));

  // Save state to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('spiritflow_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('spiritflow_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('spiritflow_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('spiritflow_cart', JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    setProducts(prevProducts => [...prevProducts, { ...product, id: newId }]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts(prevProducts => prevProducts.map(p => (p.id === id ? { ...p, ...updatedProduct } : p)));
  };

  const deleteProduct = (id: number) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
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
        // Use product.price as the base price for cart items
        price: product.price,
        quantity: quantity,
        image: product.image
      }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const clearCart = () => setCart([]);

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prevOrders => prevOrders.map(o => (o.id