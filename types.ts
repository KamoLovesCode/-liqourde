export interface Product {
  id: number;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  comparePrice?: number;
  stock: number;
  sku: string;
  image: string;
  description: string;
  abv?: number;
  volume?: string;
  featured: boolean;
}

export interface OrderItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'processing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  date: string;
  deliveryAddress: string;
}

export interface StoreConfig {
  storeName: string;
  currency: string;
  primaryColor: string; // Hex code
  layout: 'grid' | 'list';
  heroImage: string;
  heroHeadline: string;
  heroSubheadline: string;
  contactEmail: string;
  contactPhone: string;
}

export interface CartItem extends OrderItem {}

export enum PrimaryColorPreset {
  Navy = '#0D3B66',
  Burgundy = '#8C2F39',
  Emerald = '#2E8B57',
  Amber = '#D4A017',
  Plum = '#6A4C93',
  Teal = '#20B2AA',
  Rust = '#B7410E',
  Charcoal = '#495057'
}