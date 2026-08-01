/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Tab, MenuItem, CartItem, Reservation, Order, User, RestaurantInfo, PromoCode } from './types';
import { DEFAULT_RESTAURANT_INFO } from './data';
import * as firestore from './services/firestore';
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
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  
  // Dynamic application state loaded directly from Firebase Firestore in real-time
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('celeste_current_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [restaurantInfo, setRestaurantInfo] = useState<RestaurantInfo>(DEFAULT_RESTAURANT_INFO);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isSupervisorMode, setIsSupervisorMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [forceWelcomeModal, setForceWelcomeModal] = useState<boolean | undefined>(undefined);

  // Firestore Real-Time Subscriptions (onSnapshot)
  useEffect(() => {
    let isMounted = true;

    // First seed database if Firestore collections are empty
    firestore.seedInitialDataIfEmpty().catch(err => {
      console.warn('Initial seed notice:', err);
    });

    // Real-time listener for Menu Items
    const unsubMenu = firestore.subscribeToMenuItems((items) => {
      if (!isMounted) return;
      setMenuItems(items);
      setIsLoaded(true);
    });

    // Real-time listener for Categories
    const unsubCategories = firestore.subscribeToCategories((cats) => {
      if (!isMounted) return;
      setCategories(cats);
    });

    // Real-time listener for Orders
    const unsubOrders = firestore.subscribeToOrders((ordersList) => {
      if (!isMounted) return;
      setOrders(ordersList);

      // Keep active order updated live when status or details change in Firestore
      setActiveOrder((current) => {
        const savedId = localStorage.getItem('celeste_active_order_id');
        const targetId = current?.id || savedId;
        if (!targetId) return null;
        const match = ordersList.find(o => o.id === targetId);
        return match || current;
      });
    });

    // Real-time listener for Reservations
    const unsubReservations = firestore.subscribeToReservations((resList) => {
      if (!isMounted) return;
      setReservations(resList);
    });

    // Real-time listener for Users
    const unsubUsers = firestore.subscribeToUsers((usersList) => {
      if (!isMounted) return;
      setUsers(usersList);
      
      // Update currentUser session if user details change in Firestore
      setCurrentUser((current) => {
        if (!current) return null;
        const match = usersList.find(u => u.id === current.id);
        if (match) {
          localStorage.setItem('celeste_current_user', JSON.stringify(match));
          return match;
        }
        return current;
      });
    });

    // Real-time listener for Promo Codes
    const unsubPromos = firestore.subscribeToPromoCodes((promosList) => {
      if (!isMounted) return;
      setPromoCodes(promosList);
    });

    // Real-time listener for Restaurant Info Settings
    const unsubInfo = firestore.subscribeToRestaurantInfo((info) => {
      if (!isMounted) return;
      setRestaurantInfo(info);
    });

    return () => {
      isMounted = false;
      unsubSubscript(unsubMenu);
      unsubSubscript(unsubCategories);
      unsubSubscript(unsubOrders);
      unsubSubscript(unsubReservations);
      unsubSubscript(unsubUsers);
      unsubSubscript(unsubPromos);
      unsubSubscript(unsubInfo);
    };
  }, []);

  // Helper for cleanup of unsub functions
  const unsubSubscript = (fn: any) => {
    if (typeof fn === 'function') {
      try { fn(); } catch (_) {}
    }
  };

  // Sync current user to localStorage session
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('celeste_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('celeste_current_user');
    }
  }, [currentUser]);

  // Sync active order ID to localStorage
  useEffect(() => {
    if (activeOrder) {
      localStorage.setItem('celeste_active_order_id', activeOrder.id);
    } else {
      localStorage.removeItem('celeste_active_order_id');
    }
  }, [activeOrder]);

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

  const handleAddReservation = async (reservation: Reservation) => {
    await firestore.addReservation(reservation);
    triggerToast(`تم إرسال حجز الطاولة بنجاح! رقم الحجز: ${reservation.id}`);
  };

  const handleCheckout = async (order: Order) => {
    setActiveOrder(order);
    localStorage.setItem('celeste_active_order_id', order.id);
    await firestore.addOrder(order);

    if (order.promoCode) {
      const match = promoCodes.find(p => p.code.toUpperCase() === order.promoCode?.toUpperCase());
      if (match) {
        await firestore.updatePromoCode({
          ...match,
          usageCount: (match.usageCount || 0) + 1
        });
      }
    }
    setCartItems([]); // Clear cart
    setActiveTab('track'); // Switch to tracking
    triggerToast(`تم إرسال طلبك ${order.id} بنجاح!`);
  };

  // Admin Controls Firestore Updaters
  const handleDeleteOrder = async (orderId: string) => {
    await firestore.deleteOrder(orderId);
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(null);
      localStorage.removeItem('celeste_active_order_id');
    }
    triggerToast(`تم حذف الطلب (${orderId}) بنجاح! 🗑️`);
  };

  const handleUpdateOrderStatus = async (orderId: string, status: 'received' | 'preparing' | 'on_the_way' | 'delivered') => {
    await firestore.updateOrderStatus(orderId, status);
    if (activeOrder && activeOrder.id === orderId) {
      setActiveOrder(prev => prev ? { ...prev, status } : null);
    }
    triggerToast(`تم تحديث حالة الطلب ${orderId} بنجاح!`);
  };

  const handleUpdateReservationStatus = async (resId: string, status: 'confirmed' | 'cancelled') => {
    await firestore.updateReservationStatus(resId, status);
    triggerToast(status === 'confirmed' ? `تم تأكيد وقبول الحجز ${resId}!` : `تم إلغاء الحجز ${resId}`);
  };

  const handleUpdateMenuItem = async (updatedItem: MenuItem) => {
    await firestore.updateMenuItem(updatedItem);
    triggerToast(`تم تعديل الصنف ${updatedItem.name} بنجاح!`);
  };

  const handleAddMenuItem = async (newItem: MenuItem) => {
    await firestore.addMenuItem(newItem);
    triggerToast(`تمت إضافة الصنف ${newItem.name} بنجاح!`);
  };

  const handleDeleteMenuItem = async (itemId: string) => {
    await firestore.deleteMenuItem(itemId);
    triggerToast(`تم حذف الصنف بنجاح!`);
  };

  const handleAddCategory = async (categoryName: string) => {
    const trimmed = categoryName.trim();
    if (!trimmed) return;
    if (categories.includes(trimmed)) {
      triggerToast('هذا التصنيف موجود بالفعل!');
      return;
    }
    await firestore.addCategory(trimmed);
    triggerToast(`تمت إضافة التصنيف "${trimmed}" بنجاح!`);
  };

  const handleDeleteCategory = async (categoryName: string) => {
    await firestore.deleteCategory(categoryName);
    triggerToast(`تم حذف التصنيف "${categoryName}" بنجاح.`);
  };

  // User Management Firestore Updaters
  const handleRegisterUser = async (newUser: User) => {
    await firestore.addUser(newUser);
    setCurrentUser(newUser);

    // Link any guest order matching phone to this new user
    const matchingGuestOrder = orders.find(o => !o.userId && o.customerPhone === newUser.phone);
    if (matchingGuestOrder) {
      const updatedOrder = { ...matchingGuestOrder, userId: newUser.id };
      await firestore.addOrder(updatedOrder);
      setActiveOrder(updatedOrder);
    } else {
      const userOrders = orders.filter(o => o.userId === newUser.id);
      if (userOrders.length > 0) {
        setActiveOrder(userOrders[0]);
      } else {
        setActiveOrder(null);
        localStorage.removeItem('celeste_active_order_id');
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
      localStorage.removeItem('celeste_active_order_id');
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
    localStorage.removeItem('celeste_current_user');
    localStorage.removeItem('celeste_active_order_id');
    triggerToast('تم تسجيل الخروج بنجاح.');
  };

  const handleUpdateProfileUser = async (updatedUser: User) => {
    await firestore.updateUser(updatedUser);
    setCurrentUser(updatedUser);
    triggerToast('تم تحديث بيانات ملفك الشخصي بنجاح!');
  };

  const handleAddUserAdmin = async (newUser: User) => {
    await firestore.addUser(newUser);
    triggerToast(`تمت إضافة العضو ${newUser.name} بنجاح!`);
  };

  const handleUpdateUserAdmin = async (updatedUser: User) => {
    await firestore.updateUser(updatedUser);
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
    triggerToast(`تم تحديث بيانات العضو ${updatedUser.name} بنجاح!`);
  };

  const handleDeleteUserAdmin = async (userId: string) => {
    await firestore.deleteUser(userId);
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(null);
      localStorage.removeItem('celeste_current_user');
    }
    triggerToast(`تم حذف العضو بنجاح.`);
  };

  const handleToggleUserStatusAdmin = async (userId: string) => {
    await firestore.toggleUserStatus(userId);
    triggerToast('تم تغيير حالة حساب العضو.');
  };

  // Promo Code Handlers
  const handleAddPromoCode = async (promo: PromoCode) => {
    await firestore.addPromoCode(promo);
    triggerToast(`تمت إضافة كود الخصم (${promo.code}) بنجاح! 🏷️`);
  };

  const handleUpdatePromoCode = async (updatedPromo: PromoCode) => {
    await firestore.updatePromoCode(updatedPromo);
    triggerToast(`تم تحديث بيانات كود الخصم (${updatedPromo.code}) بنجاح! ✨`);
  };

  const handleDeletePromoCode = async (promoId: string) => {
    await firestore.deletePromoCode(promoId);
    triggerToast('تم حذف كود الخصم بنجاح.');
  };

  const handleTogglePromoCodeStatus = async (promoId: string) => {
    await firestore.togglePromoCodeStatus(promoId);
  };

  const handleUpdateRestaurantInfo = async (info: RestaurantInfo) => {
    await firestore.updateRestaurantInfo(info);
    triggerToast('تم تحديث بيانات ومعلومات المطعم في السحابة بنجاح! ☁️');
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
