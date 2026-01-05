import { Product, Order, StoreConfig, PrimaryColorPreset } from './types';

export const CURRENCY = '$';

export const INITIAL_CONFIG: StoreConfig = {
  storeName: "SpiritFlow Liquors",
  currency: "$",
  primaryColor: PrimaryColorPreset.Navy,
  layout: 'grid',
  heroImage: "https://images.unsplash.com/photo-1569937756447-e24e5256e409?auto=format&fit=crop&q=80&w=2000",
  heroHeadline: "Premium Spirits Delivered",
  heroSubheadline: "From top shelf to your door in under 60 minutes.",
  contactEmail: "support@spiritflow.com",
  contactPhone: "(555) 123-4567"
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Golden Reserve Whiskey",
    category: "Spirits",
    subcategory: "Whiskey",
    price: 45.99,
    stock: 24,
    sku: "WHK-001",
    image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Golden+Reserve",
    description: "A smooth, aged whiskey with notes of vanilla and oak.",
    abv: 40,
    volume: "750ml",
    featured: true
  },
  {
    id: 2,
    name: "Coastal Gin",
    category: "Spirits",
    subcategory: "Gin",
    price: 32.50,
    comparePrice: 38.00,
    stock: 12,
    sku: "GIN-002",
    image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Coastal+Gin",
    description: "Botanical gin distilled with coastal herbs.",
    abv: 42,
    volume: "750ml",
    featured: true
  },
  {
    id: 3,
    name: "Craft IPA 6-Pack",
    category: "Beer",
    subcategory: "IPA",
    price: 12.99,
    stock: 100,
    sku: "BER-003",
    image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Craft+IPA",
    description: "Hoppy and refreshing local craft brew.",
    abv: 6.5,
    volume: "6 x 355ml",
    featured: false
  },
  {
    id: 4,
    name: "Vintage Cabernet",
    category: "Wine",
    subcategory: "Red",
    price: 28.00,
    stock: 8,
    sku: "WIN-004",
    image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Vintage+Red",
    description: "Full-bodied red wine from Napa Valley.",
    abv: 13.5,
    volume: "750ml",
    featured: true
  },
  {
    id: 5,
    name: "Silver Tequila",
    category: "Spirits",
    subcategory: "Tequila",
    price: 49.99,
    stock: 18,
    sku: "TEQ-005",
    image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Silver+Tequila",
    description: "Crisp agave tequila perfect for margaritas.",
    abv: 40,
    volume: "750ml",
    featured: false
  },
  {
    id: 6,
    name: "Japanese Lager",
    category: "Beer",
    subcategory: "Lager",
    price: 9.99,
    stock: 150,
    sku: "BER-006",
    image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Japanese+Lager",
    description: "Dry and crisp rice lager.",
    abv: 5.0,
    volume: "6 x 330ml",
    featured: false
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-1001",
    customerName: "Alex Johnson",
    customerEmail: "alex@example.com",
    customerPhone: "(555) 987-6543",
    date: "2023-10-25T14:30:00",
    status: "pending",
    total: 58.98,
    deliveryAddress: "123 Maple Ave, Apt 4B",
    items: [
      { 
        productId: 1, 
        name: "Golden Reserve Whiskey", 
        price: 45.99, 
        quantity: 1, 
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Golden+Reserve" 
      },
      { 
        productId: 3, 
        name: "Craft IPA 6-Pack", 
        price: 12.99, 
        quantity: 1, 
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Craft+IPA" 
      }
    ]
  },
  {
    id: "ORD-1002",
    customerName: "Sarah Smith",
    customerEmail: "sarah@example.com",
    customerPhone: "(555) 111-2222",
    date: "2023-10-25T12:15:00",
    status: "delivered",
    total: 32.50,
    deliveryAddress: "45 Oak Lane",
    items: [
      { 
        productId: 2, 
        name: "Coastal Gin", 
        price: 32.50, 
        quantity: 1, 
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Coastal+Gin" 
      }
    ]
  },
  {
    id: "ORD-1003",
    customerName: "Mike Brown",
    customerEmail: "mike@example.com",
    customerPhone: "(555) 333-4444",
    date: "2023-10-24T18:45:00",
    status: "processing",
    total: 28.00,
    deliveryAddress: "789 Pine St",
    items: [
      { 
        productId: 4, 
        name: "Vintage Cabernet", 
        price: 28.00, 
        quantity: 1, 
        image: "https://placehold.co/600x600/e2e8f0/1e293b?text=Vintage+Red" 
      }
    ]
  }
];