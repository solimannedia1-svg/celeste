export type Tab = 'home' | 'menu' | 'cart' | 'track';

export interface RestaurantInfo {
  name: string;
  branch: string;
  address: string;
  phone: string;
  workingHours: string;
  currency?: string;
}

export interface SupervisorPermissions {
  orders: boolean;       // إدارة الطلبات
  reservations: boolean; // إدارة حجوزات الطاولات
  menu: boolean;         // إدارة قائمة الطعام والأصناف
  promos?: boolean;      // إدارة كروت الخصم والقسائم
}

export interface PromoCode {
  id: string;
  code: string;
  type: 'percentage' | 'fixed';
  value: number; // e.g. 20 for 20% or 50 for 50 EGP
  minOrderValue?: number;
  maxDiscount?: number;
  isActive: boolean;
  expiryDate?: string;
  usageCount?: number;
  maxUses?: number; // الحد الأقصى لعدد العملاء/الاستخدامات
}

export interface User {
  id: string;
  name: string;
  username: string;
  phone: string;
  password: string;
  createdAt: string;
  status: 'active' | 'blocked';
  role?: 'admin' | 'supervisor' | 'customer';
  notes?: string;
  permissions?: SupervisorPermissions;
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
  promoCode?: string;
  discountAmount?: number;
  timestamps: {
    received: string;
    preparing: string;
    on_the_way: string;
    delivered?: string;
  };
}
