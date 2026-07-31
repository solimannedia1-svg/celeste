/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Tab, MenuItem, CartItem, Reservation, Order, User, RestaurantInfo, PromoCode } from './types';
import { INITIAL_MENU_ITEMS, CATEGORIES, DEFAULT_RESTAURANT_INFO, INITIAL_PROMO_CODES } from './data';
import BottomNav from './components/BottomNav';
import TableBooking from './components/TableBooking';
import MenuList from './components/MenuList';
import MealDetails from './components/MealDetails';
import CartView from './components/CartView';
import OrderTracking from './components/OrderTracking';
import AdminDashboard from './components/AdminDashboard';
import SupervisorDashboard from './components/SupervisorDashboard';
import Sidebar from './components/Sidebar';
import WelcomeModal from './components/WelcomeModal';
import AuthModal from './components/AuthModal';
import { Menu, Search, ShoppingBag, ArrowRight, Heart, Sparkles, CheckCircle2, ShieldCheck, User as UserIcon, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('home'); // Default to home screen
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeOrder, setActiveOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('celeste_active_order');
    return saved ? JSON.parse(saved) : null;
  });
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    const saved = localStorage.getItem('celeste_reservations');
    return saved ? JSON.parse(saved) : [];
  });
  
  // Dynamic application state shared between Customer & Admin views
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem('celeste_menu_items');
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('celeste_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [categories, setCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('celeste_categories');
    return saved ? JSON.parse(saved) : CATEGORIES;
  });
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('celeste_users');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('celeste_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(() => {
    const saved = localStorage.getItem('celeste_restaurant_info');
    return saved ? JSON.parse(saved) : DEFAULT_RESTAURANT_INFO;
  });
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(() => {
    const saved = localStorage.getItem('celeste_promo_codes');
    return saved ? JSON.parse(saved) : INITIAL_PROMO_CODES;
  });

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isSupervisorMode, setIsSupervisorMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [forceWelcomeModal, setForceWelcomeModal] = useState<boolean | undefined>(undefined);

  // Sync state to server when it changes (only after initial load has finished)
  useEffect(() => {
    localStorage.setItem('celeste_restaurant_info', JSON.stringify(restaurantInfo));
    if (isLoaded) {
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantInfo })
      }).catch(err => console.warn('Sync restaurantInfo notice:', err?.message || err));
    }
  }, [restaurantInfo, isLoaded]);

  useEffect(() => {
    localStorage.setItem('celeste_categories', JSON.stringify(categories));
    if (isLoaded) {
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categories })
      }).catch(err => console.warn('Sync categories notice:', err?.message || err));
    }
  }, [categories, isLoaded]);

  useEffect(() => {
    localStorage.setItem('celeste_users', JSON.stringify(users));
    if (isLoaded) {
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users })
      }).catch(err => console.warn('Sync users notice:', err?.message || err));
    }
  }, [users, isLoaded]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('celeste_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('celeste_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('celeste_menu_items', JSON.stringify(menuItems));
    if (isLoaded) {
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ menuItems })
      }).catch(err => console.warn('Sync menu items notice:', err?.message || err));
    }
  }, [menuItems, isLoaded]);

  useEffect(() => {
    localStorage.setItem('celeste_orders', JSON.stringify(orders));
    if (isLoaded) {
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders })
      }).catch(err => console.warn('Sync orders notice:', err?.message || err));
    }
    // Keep activeOrder synchronized with any updates in the orders list
    if (activeOrder) {
      const currentInList = orders.find(o => o.id === activeOrder.id);
      if (currentInList && (currentInList.status !== activeOrder.status || JSON.stringify(currentInList) !== JSON.stringify(activeOrder))) {
        setActiveOrder(currentInList);
      }
    }
  }, [orders, activeOrder, isLoaded]);

  useEffect(() => {
    localStorage.setItem('celeste_reservations', JSON.stringify(reservations));
    if (isLoaded) {
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservations })
      }).catch(err => console.warn('Sync reservations notice:', err?.message || err));
    }
  }, [reservations, isLoaded]);

  useEffect(() => {
    localStorage.setItem('celeste_promo_codes', JSON.stringify(promoCodes));
    if (isLoaded) {
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCodes })
      }).catch(err => console.warn('Sync promoCodes notice:', err?.message || err));
    }
  }, [promoCodes, isLoaded]);

  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('celeste_active_order', JSON.stringify(activeOrder));
    } else {
      localStorage.removeItem('celeste_active_order');
    }
  }, [activeOrder]);

  // Synchronize state across tabs/windows in real-time using storage event
  useEffect(() => {
    const handleStorageEvent = (e: StorageEvent) => {
      try {
        if (e.key === 'celeste_orders' && e.newValue) {
          const parsedOrders = JSON.parse(e.newValue);
          setOrders(parsedOrders);
          
          // Sync client's activeOrder status from the updated orders list!
          setActiveOrder((currentActive) => {
            if (!currentActive) return null;
            const match = parsedOrders.find((o: Order) => o.id === currentActive.id);
            return match ? match : currentActive;
          });
        }
        if (e.key === 'celeste_reservations' && e.newValue) {
          setReservations(JSON.parse(e.newValue));
        }
        if (e.key === 'celeste_menu_items' && e.newValue) {
          setMenuItems(JSON.parse(e.newValue));
        }
        if (e.key === 'celeste_categories' && e.newValue) {
          setCategories(JSON.parse(e.newValue));
        }
        if (e.key === 'celeste_users' && e.newValue) {
          setUsers(JSON.parse(e.newValue));
        }
        if (e.key === 'celeste_promo_codes' && e.newValue) {
          setPromoCodes(JSON.parse(e.newValue));
        }
        if (e.key === 'celeste_active_order') {
          setActiveOrder(e.newValue ? JSON.parse(e.newValue) : null);
        }
      } catch (err) {
        console.error('Error parsing cross-tab storage sync data:', err);
      }
    };

    window.addEventListener('storage', handleStorageEvent);
    return () => window.removeEventListener('storage', handleStorageEvent);
  }, []);

  // Fetch the latest global state from the server on mount, window focus, or tab visibility change
  useEffect(() => {
    const syncWithServerAndLocal = async () => {
      try {
        const res = await fetch('/api/state');
        if (res.ok) {
          const data = await res.json();
          if (data.menuItems) {
            setMenuItems(data.menuItems);
            localStorage.setItem('celeste_menu_items', JSON.stringify(data.menuItems));
          }
          if (data.categories) {
            setCategories(data.categories);
            localStorage.setItem('celeste_categories', JSON.stringify(data.categories));
          }
          if (data.users) {
            setUsers(data.users);
            localStorage.setItem('celeste_users', JSON.stringify(data.users));
          }
          if (data.orders) {
            setOrders(data.orders);
            localStorage.setItem('celeste_orders', JSON.stringify(data.orders));
            
            // Sync active order if it is tracked
            const savedActiveOrder = localStorage.getItem('celeste_active_order');
            if (savedActiveOrder) {
              setActiveOrder(JSON.parse(savedActiveOrder));
            } else {
              setActiveOrder((currentActive) => {
                if (!currentActive) return null;
                const match = data.orders.find((o: Order) => o.id === currentActive.id);
                return match ? match : currentActive;
              });
            }
          }
          if (data.reservations) {
            setReservations(data.reservations);
            localStorage.setItem('celeste_reservations', JSON.stringify(data.reservations));
          }
          if (data.restaurantInfo) {
            setRestaurantInfo(data.restaurantInfo);
            localStorage.setItem('celeste_restaurant_info', JSON.stringify(data.restaurantInfo));
          }
          if (data.promoCodes) {
            setPromoCodes(data.promoCodes);
            localStorage.setItem('celeste_promo_codes', JSON.stringify(data.promoCodes));
          }
        }
      } catch (err) {
        console.error('Error syncing state with backend server:', err);
      } finally {
        setIsLoaded(true);
      }
    };

    window.addEventListener('focus', syncWithServerAndLocal);
    document.addEventListener('visibilitychange', syncWithServerAndLocal);
    
    // Perform initial synchronization
    syncWithServerAndLocal();

    return () => {
      window.removeEventListener('focus', syncWithServerAndLocal);
      document.removeEventListener('visibilitychange', syncWithServerAndLocal);
    };
  }, []);

  // Listen to hash change to support direct URLs like #/admin or #/supervisor
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/admin') {
        setIsAdminMode(true);
        setIsSupervisorMode(false);
      } else if (window.location.hash === '#/supervisor') {
        setIsSupervisorMode(true);
        setIsAdminMode(false);
      } else {
        setIsAdminMode(false);
        setIsSupervisorMode(false);
      }
    };
    
    handleHashChange(); // Run on mount
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Start with an empty cart on first load as requested by the user
  useEffect(() => {
    setCartItems([]);
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Add Item to cart from Customization screen
  const handleAddToCartCustomized = (cartItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(i => i.id === cartItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += cartItem.quantity;
        return updated;
      }
      return [...prevItems, cartItem];
    });

    setSelectedItem(null); // Return to menu
    triggerToast(`تمت إضافة ${cartItem.quantity}x ${cartItem.menuItem.name} إلى السلة!`);
  };

  // Direct quick add from list
  const handleAddToCartDirectly = (item: MenuItem, selectedSideDish?: string) => {
    const sideDishHash = selectedSideDish ? encodeURIComponent(selectedSideDish) : '';
    const cartItemId = `${item.id}-default${sideDishHash ? `-${sideDishHash}` : ''}`;
    const cartItem: CartItem = {
      id: cartItemId,
      menuItem: item,
      quantity: 1,
      extras: [],
      selectedSideDish: selectedSideDish
    };

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(i => i.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prevItems, cartItem];
    });

    triggerToast(`تمت إضافة ${item.name} ${selectedSideDish ? `(مع ${selectedSideDish})` : ''} إلى السلة!`);
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    setCartItems((prevItems) =>
      prevItems.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const handleRemoveItem = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
    if (item) {
      triggerToast(`تمت إزالة ${item.menuItem.name} من السلة.`);
    }
  };

  const handleAddReservation = (reservation: Reservation) => {
    setReservations(prev => [reservation, ...prev]);
    triggerToast(`تم إرسال حجز الطاولة بنجاح! رقم الحجز: ${reservation.id}`);
  };

  const handleCheckout = (order: Order) => {
    setActiveOrder(order);
    setOrders(prev => [order, ...prev]);
    if (order.promoCode) {
      setPromoCodes(prev => prev.map(p => p.code.toUpperCase() === order.promoCode?.toUpperCase() ? { ...p, usageCount: (p.usageCount || 0) + 1 } : p));
    }
    setCartItems([]); // Clear cart
    setActiveTab('track'); // Switch to tracking
    triggerToast(`تم إرسال طلبك ${order.id} بنجاح!`);
  };

  // Admin Controls State-updaters
  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => {
      const updatedList = prev.filter(o => o.id !== orderId);
      localStorage.setItem('celeste_orders', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: updatedList })
      }).catch(err => console.error('Sync orders error:', err));
      return updatedList;
    });
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(null);
      localStorage.removeItem('celeste_active_order');
    }
    triggerToast(`تم حذف الطلب (${orderId}) بنجاح! 🗑️`);
  };

  const handleUpdateOrderStatus = (orderId: string, status: 'received' | 'preparing' | 'on_the_way' | 'delivered') => {
    setOrders(prev => {
      const updatedList = prev.map(o => o.id === orderId ? { ...o, status } : o);
      localStorage.setItem('celeste_orders', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: updatedList })
      }).catch(err => console.error('Sync orders error:', err));
      return updatedList;
    });
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(prev => prev ? { ...prev, status } : null);
    }
    triggerToast(`تم تحديث حالة الطلب ${orderId} بنجاح!`);
  };

  const handleUpdateReservationStatus = (resId: string, status: 'confirmed' | 'cancelled') => {
    setReservations(prev => prev.map(r => r.id === resId ? { ...r, status } : r));
    triggerToast(status === 'confirmed' ? `تم تأكيد وقبول الحجز ${resId}!` : `تم إلغاء الحجز ${resId}`);
  };

  const handleUpdateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    triggerToast(`تم تعديل الصنف ${updatedItem.name} بنجاح!`);
  };

  const handleAddMenuItem = (newItem: MenuItem) => {
    setMenuItems(prev => [newItem, ...prev]);
    triggerToast(`تمت إضافة الصنف ${newItem.name} بنجاح!`);
  };

  const handleDeleteMenuItem = (itemId: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== itemId));
    triggerToast(`تم حذف الصنف بنجاح!`);
  };

  const handleAddCategory = (categoryName: string) => {
    const trimmed = categoryName.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed)) {
      triggerToast('هذا التصنيف موجود بالفعل!');
      return;
    }
    setCategories(prev => [...prev, trimmed]);
    triggerToast(`تمت إضافة التصنيف "${trimmed}" بنجاح!`);
  };

  const handleDeleteCategory = (categoryName: string) => {
    setCategories(prev => prev.filter(c => c !== categoryName));
    triggerToast(`تم حذف التصنيف "${categoryName}" بنجاح.`);
  };

  // User Management state updaters
  const handleRegisterUser = (newUser: User) => {
    setUsers(prev => [newUser, ...prev]);
    setCurrentUser(newUser);

    // Link any guest order matching phone to this new user
    const matchingGuestOrder = orders.find(o => !o.userId && o.customerPhone === newUser.phone);
    if (matchingGuestOrder) {
      const updatedOrder = { ...matchingGuestOrder, userId: newUser.id };
      setActiveOrder(updatedOrder);
      setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    } else {
      const userOrders = orders.filter(o => o.userId === newUser.id);
      if (userOrders.length > 0) {
        setActiveOrder(userOrders[0]);
      } else {
        setActiveOrder(null);
        localStorage.removeItem('celeste_active_order');
      }
    }

    triggerToast(`أهلاً بك يا ${newUser.name}! تم إنشاء حسابك بنجاح.`);
  };

  const handleLoginUser = (user: User) => {
    setCurrentUser(user);
    const userOrders = orders.filter(o => o.userId === user.id || (!o.userId && o.customerPhone === user.phone));
    if (userOrders.length > 0) {
      setActiveOrder(userOrders[0]);
    } else {
      setActiveOrder(null);
      localStorage.removeItem('celeste_active_order');
    }

    if (user.role === 'supervisor') {
      setIsSupervisorMode(true);
      window.location.hash = '#/supervisor';
      triggerToast(`أهلاً بعودتك يا ${user.name} (مشرف المقهى)! تم دخول لوحة التحكم الخاصة بالمشرفين 🛡️`);
    } else {
      triggerToast(`أهلاً بعودتك يا ${user.name}!`);
    }
  };

  const handleLogoutUser = () => {
    setCurrentUser(null);
    setActiveOrder(null);
    localStorage.removeItem('celeste_active_order');
    triggerToast('تم تسجيل الخروج بنجاح.');
  };

  const handleUpdateProfileUser = (updatedUser: User) => {
    setUsers(prev => {
      const updatedList = prev.map(u => u.id === updatedUser.id ? updatedUser : u);
      localStorage.setItem('celeste_users', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: updatedList })
      }).catch(err => console.error('Sync users error:', err));
      return updatedList;
    });
    setCurrentUser(updatedUser);
    localStorage.setItem('celeste_current_user', JSON.stringify(updatedUser));
    triggerToast('تم تحديث بيانات ملفك الشخصي بنجاح!');
  };

  const handleAddUserAdmin = (newUser: User) => {
    setUsers(prev => {
      const updatedList = [newUser, ...prev];
      localStorage.setItem('celeste_users', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: updatedList })
      }).catch(err => console.error('Sync users error:', err));
      return updatedList;
    });
    triggerToast(`تمت إضافة العضو ${newUser.name} بنجاح!`);
  };

  const handleUpdateUserAdmin = (updatedUser: User) => {
    setUsers(prev => {
      const updatedList = prev.map(u => u.id === updatedUser.id ? updatedUser : u);
      localStorage.setItem('celeste_users', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: updatedList })
      }).catch(err => console.error('Sync users error:', err));
      return updatedList;
    });
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
      localStorage.setItem('celeste_current_user', JSON.stringify(updatedUser));
    }
    triggerToast(`تم تحديث بيانات العضو ${updatedUser.name} بنجاح!`);
  };

  const handleDeleteUserAdmin = (userId: string) => {
    setUsers(prev => {
      const updatedList = prev.filter(u => u.id !== userId);
      localStorage.setItem('celeste_users', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: updatedList })
      }).catch(err => console.error('Sync users error:', err));
      return updatedList;
    });
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(null);
      localStorage.removeItem('celeste_current_user');
    }
    triggerToast(`تم حذف العضو بنجاح.`);
  };

  const handleToggleUserStatusAdmin = (userId: string) => {
    setUsers(prev => {
      const updatedList = prev.map(u => {
        if (u.id === userId) {
          const newStatus: 'active' | 'blocked' = u.status === 'active' ? 'blocked' : 'active';
          return { ...u, status: newStatus };
        }
        return u;
      });
      localStorage.setItem('celeste_users', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ users: updatedList })
      }).catch(err => console.error('Sync users error:', err));
      return updatedList;
    });
    triggerToast('تم تغيير حالة حساب العضو.');
  };

  // Promo Code Handlers
  const handleAddPromoCode = (promo: PromoCode) => {
    setPromoCodes(prev => {
      const updatedList = [promo, ...prev];
      localStorage.setItem('celeste_promo_codes', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCodes: updatedList })
      }).catch(err => console.error('Sync promo codes error:', err));
      return updatedList;
    });
    triggerToast(`تمت إضافة كود الخصم (${promo.code}) بنجاح! 🏷️`);
  };

  const handleUpdatePromoCode = (updatedPromo: PromoCode) => {
    setPromoCodes(prev => {
      const updatedList = prev.map(p => p.id === updatedPromo.id ? updatedPromo : p);
      localStorage.setItem('celeste_promo_codes', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCodes: updatedList })
      }).catch(err => console.error('Sync promo codes error:', err));
      return updatedList;
    });
    triggerToast(`تم تحديث بيانات كود الخصم (${updatedPromo.code}) بنجاح! ✨`);
  };

  const handleDeletePromoCode = (promoId: string) => {
    setPromoCodes(prev => {
      const updatedList = prev.filter(p => p.id !== promoId);
      localStorage.setItem('celeste_promo_codes', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCodes: updatedList })
      }).catch(err => console.error('Sync promo codes error:', err));
      return updatedList;
    });
    triggerToast('تم حذف كود الخصم بنجاح.');
  };

  const handleTogglePromoCodeStatus = (promoId: string) => {
    setPromoCodes(prev => {
      const updatedList = prev.map(p => {
        if (p.id === promoId) {
          const updated = { ...p, isActive: !p.isActive };
          triggerToast(`تم ${updated.isActive ? 'تفعيل' : 'إيقاف'} كود الخصم (${updated.code})`);
          return updated;
        }
        return p;
      });
      localStorage.setItem('celeste_promo_codes', JSON.stringify(updatedList));
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoCodes: updatedList })
      }).catch(err => console.error('Sync promo codes error:', err));
      return updatedList;
    });
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Orders and reservations scoped to current user or active guest
  const currentUserOrders = currentUser
    ? orders.filter(o => o.userId === currentUser.id || (!o.userId && o.customerPhone === currentUser.phone))
    : [];

  const currentUserReservations = currentUser
    ? reservations.filter(r => r.userId === currentUser.id || (!r.userId && r.customerPhone === currentUser.phone))
    : reservations.filter(r => !r.userId && activeOrder && r.customerPhone === activeOrder.customerPhone);

  const visibleOrder = (() => {
    if (currentUser) {
      if (activeOrder && (activeOrder.userId === currentUser.id || (!activeOrder.userId && activeOrder.customerPhone === currentUser.phone))) {
        return activeOrder;
      }
      return currentUserOrders.length > 0 ? currentUserOrders[0] : null;
    } else {
      if (activeOrder && !activeOrder.userId) {
        return activeOrder;
      }
      return null;
    }
  })();

  // Render header contextually depending on active screen/state
  const renderHeader = () => {
    if (selectedItem) {
      return null;
    }

    const userButton = (
      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all font-bold text-xs"
        title="حساب العميل"
      >
        <UserIcon className="w-4 h-4" />
        <span className="max-w-[100px] truncate">{currentUser ? currentUser.name : 'تسجيل الدخول'}</span>
      </button>
    );

    switch (activeTab) {
      case 'home':
        return (
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md flex justify-between items-center border-b border-outline-variant/10 w-full shadow-sm">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 py-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:opacity-85 active:scale-95 transition-all cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-headline-lg-mobile text-2xl text-primary font-bold">Celeste</h1>
              <div>{userButton}</div>
            </div>
          </header>
        );
      case 'menu':
        return (
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md flex justify-between items-center border-b border-outline-variant/10 w-full shadow-sm">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 py-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:opacity-85 active:scale-95 transition-all cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-headline-lg-mobile text-2xl text-primary font-bold">سيلست</h1>
              <div className="flex items-center gap-3">
                {userButton}
                <button
                  onClick={() => setActiveTab('cart')}
                  className="relative w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:opacity-85 active:scale-95 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </header>
        );
      case 'cart':
        return (
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md flex justify-between items-center border-b border-outline-variant/10 w-full shadow-sm">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 py-4">
              <button
                onClick={() => setActiveTab('menu')}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:opacity-85 active:scale-95 transition-all cursor-pointer"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
              <h1 className="font-headline-lg-mobile text-xl text-primary font-bold">سلة تسوق سيلست</h1>
              <div>{userButton}</div>
            </div>
          </header>
        );
      case 'track':
        return (
          <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md flex justify-between items-center border-b border-outline-variant/10 w-full shadow-sm">
            <div className="max-w-7xl mx-auto w-full flex justify-between items-center px-6 py-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:opacity-85 active:scale-95 transition-all cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="font-headline-lg-mobile text-xl text-primary font-bold">تتبع الطلب</h1>
              <div className="flex items-center gap-3">
                {userButton}
              </div>
            </div>
          </header>
        );
    }
  };

  const handleUpdateRestaurantInfo = (newInfo: RestaurantInfo) => {
    setRestaurantInfo(newInfo);
    localStorage.setItem('celeste_restaurant_info', JSON.stringify(newInfo));
    fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ restaurantInfo: newInfo })
    }).catch(err => console.error('Sync restaurantInfo error:', err));
    triggerToast('تم تحديث بيانات وتفاصيل المطعم بنجاح!');
  };

  if (isSupervisorMode) {
    return (
      <SupervisorDashboard
        orders={orders}
        reservations={reservations}
        menuItems={menuItems}
        categories={categories}
        restaurantInfo={restaurantInfo}
        currentUser={currentUser}
        promoCodes={promoCodes}
        onAddPromoCode={handleAddPromoCode}
        onUpdatePromoCode={handleUpdatePromoCode}
        onDeletePromoCode={handleDeletePromoCode}
        onTogglePromoCodeStatus={handleTogglePromoCodeStatus}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onUpdateReservationStatus={handleUpdateReservationStatus}
        onUpdateMenuItem={handleUpdateMenuItem}
        onClose={() => {
          setIsSupervisorMode(false);
          window.location.hash = '';
        }}
      />
    );
  }

  if (isAdminMode) {
    return (
      <AdminDashboard
        orders={orders}
        reservations={reservations}
        menuItems={menuItems}
        categories={categories}
        users={users}
        restaurantInfo={restaurantInfo}
        promoCodes={promoCodes}
        onAddPromoCode={handleAddPromoCode}
        onUpdatePromoCode={handleUpdatePromoCode}
        onDeletePromoCode={handleDeletePromoCode}
        onTogglePromoCodeStatus={handleTogglePromoCodeStatus}
        onUpdateRestaurantInfo={handleUpdateRestaurantInfo}
        onUpdateOrderStatus={handleUpdateOrderStatus}
        onDeleteOrder={handleDeleteOrder}
        onUpdateReservationStatus={handleUpdateReservationStatus}
        onUpdateMenuItem={handleUpdateMenuItem}
        onAddMenuItem={handleAddMenuItem}
        onDeleteMenuItem={handleDeleteMenuItem}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
        onAddUser={handleAddUserAdmin}
        onUpdateUser={handleUpdateUserAdmin}
        onDeleteUser={handleDeleteUserAdmin}
        onToggleUserStatus={handleToggleUserStatusAdmin}
        onOpenSupervisorDashboard={() => {
          setIsAdminMode(false);
          setIsSupervisorMode(true);
          window.location.hash = '#/supervisor';
        }}
        onClose={() => {
          setIsAdminMode(false);
          window.location.hash = '';
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col font-body-md relative w-full pb-20" dir="rtl">
      {/* Dynamic Header */}
      {renderHeader()}

      {/* Main Container */}
      <main className={`flex-grow px-4 md:px-8 pb-24 w-full max-w-7xl mx-auto ${selectedItem ? 'pt-6' : 'pt-24'}`}>
        <AnimatePresence mode="wait">
          {selectedItem ? (
            /* Meal Detail / Customization View overrides the active tab */
            <motion.div
              key="meal-details"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.25 }}
            >
              <MealDetails
                item={selectedItem}
                onBack={() => setSelectedItem(null)}
                onAddToCart={handleAddToCartCustomized}
              />
            </motion.div>
          ) : (
            /* Tab Content */
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && (
                <TableBooking 
                  currentUser={currentUser}
                  onAddReservation={handleAddReservation} 
                />
              )}

              {activeTab === 'menu' && (
                <MenuList
                  menuItems={menuItems}
                  categories={categories}
                  onSelectItem={setSelectedItem}
                  onAddToCartDirectly={handleAddToCartDirectly}
                  cartCount={cartCount}
                  onOpenCart={() => setActiveTab('cart')}
                />
              )}

              {activeTab === 'cart' && (
                <CartView
                  cartItems={cartItems}
                  currentUser={currentUser}
                  promoCodes={promoCodes}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onCheckout={handleCheckout}
                  onOpenAuth={() => setIsAuthModalOpen(true)}
                />
              )}

              {activeTab === 'track' && (
                <OrderTracking 
                  order={visibleOrder} 
                  userOrders={currentUser ? currentUserOrders : (visibleOrder ? [visibleOrder] : [])}
                  userReservations={currentUserReservations}
                  currentUser={currentUser}
                  restaurantInfo={restaurantInfo}
                  onSelectOrder={(selected) => setActiveOrder(selected)}
                  onOpenMenu={() => setActiveTab('menu')}
                  onOpenBooking={() => setActiveTab('home')}
                  onOpenAuth={() => setIsAuthModalOpen(true)}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Bottom Nav */}
      {!selectedItem && (
        <BottomNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          hasActiveOrder={activeOrder !== null}
          cartCount={cartCount}
        />
      )}

      {/* High-Fidelity Custom Floating Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-4 right-4 z-[90] max-w-sm mx-auto"
          >
            <div className="bg-primary text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-primary-fixed/20">
              <CheckCircle2 className="w-5 h-5 text-white/90 flex-shrink-0" />
              <p className="text-xs font-bold leading-relaxed text-right flex-grow">{toastMessage}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation Drawer */}
      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenWelcomeModal={() => setForceWelcomeModal(true)}
            currentUser={currentUser}
            restaurantInfo={restaurantInfo}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onLogout={handleLogoutUser}
          />
        )}
      </AnimatePresence>

      {/* First Time Visitor Welcome Modal */}
      <WelcomeModal
        isOpen={forceWelcomeModal}
        onClose={() => {
          setForceWelcomeModal(false);
          setActiveTab('home');
        }}
        onStartExploring={() => {
          setForceWelcomeModal(false);
          setActiveTab('home');
        }}
      />

      {/* Customer Account & Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        users={users}
        orders={orders}
        reservations={reservations}
        onRegister={handleRegisterUser}
        onLogin={handleLoginUser}
        onLogout={handleLogoutUser}
        onUpdateProfile={handleUpdateProfileUser}
        onTriggerToast={triggerToast}
      />
    </div>
  );
}
