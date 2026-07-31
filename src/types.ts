export type Tab = 'home' | 'menu' | 'cart' | 'track';

export interface RestaurantInfo {
  name: string;
  branch: string;
  address: string;
  phone: string;
  workingHours: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
  password: string;
  createdAt: string;
  status: 'active' | 'blocked';
  notes?: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating?: number;
  organic?: boolean;
  popular?: boolean;
  sideDishOptions?: string[];
}

export interface CartItem {
  id: string; // unique cart entry ID (item id + selections hash)
  menuItem: MenuItem;
  quantity: number;
  breadType?: 'brioche' | 'oat';
  extras: {
    id: string;
    name: string;
    price: number;
  }[];
  selectedSideDish?: string;
}

export interface Reservation {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  date: string;
  guests: string;
  timeSlot: string;
  specialRequests: string;
  timestamp: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

export interface Order {
  id: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  deliveryType: 'pickup' | 'home';
  address: string;
  driverName?: string;
  driverRating?: number;
  driverReviewsCount?: number;
  driverImage?: string;
  status: 'received' | 'preparing' | 'on_the_way' | 'delivered';
  estimatedTime: string;
  timestamps: {
    received: string;
    preparing: string;
    on_the_way: string;
    delivered?: string;
  };
}
