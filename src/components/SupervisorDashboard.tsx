import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Users, 
  Coffee, 
  CheckCircle2, 
  Clock, 
  Truck, 
  ChefHat, 
  Search, 
  X, 
  LogOut, 
  ShieldCheck, 
  Phone, 
  MapPin, 
  Calendar,
  AlertCircle,
  Eye,
  RefreshCw,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  Bell,
  BellRing,
  Printer,
  Ticket,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, Reservation, MenuItem, User, RestaurantInfo, PromoCode } from '../types';
import PromoManagement from './PromoManagement';

// Helper function to play a synthesized multi-tone bell chime alert using Web Audio API
const playNewOrderAlertSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    // Pleasant bell chime sequence: C5 (523Hz) -> E5 (659Hz) -> G5 (784Hz) -> C6 (1046Hz)
    const notes = [523.25, 659.25, 784.00, 1046.50];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
      
      gain.gain.setValueAtTime(0.25, ctx.currentTime + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.15 + 0.4);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 0.45);
    });
  } catch (err) {
    console.error('Audio alert error:', err);
  }
};

interface SupervisorDashboardProps {
  orders: Order[];
  reservations: Reservation[];
  menuItems: MenuItem[];
  categories: string[];
  restaurantInfo: RestaurantInfo;
  promoCodes?: PromoCode[];
  currentUser?: User | null;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onDeleteOrder?: (orderId: string) => void;
  onUpdateReservationStatus: (reservationId: string, status: Reservation['status']) => void;
  onUpdateMenuItem?: (updatedItem: MenuItem) => void;
  onAddPromoCode?: (promo: PromoCode) => void;
  onUpdatePromoCode?: (promo: PromoCode) => void;
  onDeletePromoCode?: (promoId: string) => void;
  onTogglePromoCodeStatus?: (promoId: string) => void;
  onClose: () => void;
}

export default function SupervisorDashboard({
  orders,
  reservations,
  menuItems,
  categories,
  restaurantInfo,
  promoCodes = [],
  currentUser,
  onUpdateOrderStatus,
  onDeleteOrder,
  onUpdateReservationStatus,
  onUpdateMenuItem,
  onAddPromoCode = () => {},
  onUpdatePromoCode = () => {},
  onDeletePromoCode = () => {},
  onTogglePromoCodeStatus = () => {},
  onClose
}: SupervisorDashboardProps) {
  const perms = currentUser?.permissions || { orders: true, reservations: true, menu: true, promos: true };
  const canManageOrders = perms.orders ?? true;
  const canManageReservations = perms.reservations ?? true;
  const canManageMenu = perms.menu ?? true;
  const canManagePromos = perms.promos ?? true;

  const hasAnyPermission = canManageOrders || canManageReservations || canManageMenu || canManagePromos;

  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'menu' | 'promos'>(() => {
    if (canManageOrders) return 'orders';
    if (canManageReservations) return 'reservations';
    if (canManageMenu) return 'menu';
    if (canManagePromos) return 'promos';
    return 'orders';
  });

  // Auto-switch active tab if current tab is not permitted
  React.useEffect(() => {
    if (activeTab === 'orders' && !canManageOrders) {
      if (canManageReservations) setActiveTab('reservations');
      else if (canManageMenu) setActiveTab('menu');
      else if (canManagePromos) setActiveTab('promos');
    } else if (activeTab === 'reservations' && !canManageReservations) {
      if (canManageOrders) setActiveTab('orders');
      else if (canManageMenu) setActiveTab('menu');
      else if (canManagePromos) setActiveTab('promos');
    } else if (activeTab === 'menu' && !canManageMenu) {
      if (canManageOrders) setActiveTab('orders');
      else if (canManageReservations) setActiveTab('reservations');
      else if (canManagePromos) setActiveTab('promos');
    } else if (activeTab === 'promos' && !canManagePromos) {
      if (canManageOrders) setActiveTab('orders');
      else if (canManageReservations) setActiveTab('reservations');
      else if (canManageMenu) setActiveTab('menu');
    }
  }, [activeTab, canManageOrders, canManageReservations, canManageMenu, canManagePromos]);

  // Sound alert state (saved to localStorage)
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('supervisor_sound_alerts');
    return saved !== null ? saved === 'true' : true;
  });

  const [newOrderAlert, setNewOrderAlert] = useState<Order | null>(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);
  const prevReceivedOrderIdsRef = React.useRef<Set<string>>(new Set());
  const isInitialMountRef = React.useRef<boolean>(true);

  // Toggle audio alerts
  const toggleSound = () => {
    setSoundEnabled(prev => {
      const next = !prev;
      localStorage.setItem('supervisor_sound_alerts', String(next));
      if (next) {
        playNewOrderAlertSound(); // Test sound when enabling
      }
      return next;
    });
  };

  // Monitor incoming new orders for audio and visual alerts
  React.useEffect(() => {
    const currentReceivedOrders = orders.filter(o => o.status === 'received');
    const currentIds = new Set(currentReceivedOrders.map(o => o.id));

    // Avoid triggering sound on first mount
    if (isInitialMountRef.current) {
      prevReceivedOrderIdsRef.current = currentIds;
      isInitialMountRef.current = false;
      return;
    }

    // Find new orders that were not present previously
    const newlyArrived = currentReceivedOrders.filter(o => !prevReceivedOrderIdsRef.current.has(o.id));

    if (newlyArrived.length > 0) {
      const latestOrder = newlyArrived[0];
      setNewOrderAlert(latestOrder);

      // Trigger audio chime if sound is enabled
      if (soundEnabled) {
        playNewOrderAlertSound();
      }
    }

    prevReceivedOrderIdsRef.current = currentIds;
  }, [orders, soundEnabled]);

  // Orders Filters & Search
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'received' | 'preparing' | 'on_the_way' | 'delivered'>('all');

  // Reservations Filters & Search
  const [resSearchQuery, setResSearchQuery] = useState('');
  const [resStatusFilter, setResStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled'>('all');

  // Menu Search
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  // Stats calculations
  const receivedOrders = orders.filter(o => o.status === 'received');
  const preparingOrders = orders.filter(o => o.status === 'preparing');
  const onTheWayOrders = orders.filter(o => o.status === 'on_the_way');
  const deliveredOrders = orders.filter(o => o.status === 'delivered');

  const pendingReservations = reservations.filter(r => (r.status || 'pending') === 'pending');
  const confirmedReservations = reservations.filter(r => r.status === 'confirmed');

  // Filtered Orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
      order.customerPhone.includes(orderSearchQuery) ||
      order.id.toLowerCase().includes(orderSearchQuery.toLowerCase());
    const matchesStatus = orderStatusFilter === 'all' ? true : order.status === orderStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Reservations
  const filteredReservations = reservations.filter(res => {
    const matchesSearch = 
      res.customerName.toLowerCase().includes(resSearchQuery.toLowerCase()) ||
      res.customerPhone.includes(resSearchQuery) ||
      res.id.toLowerCase().includes(resSearchQuery.toLowerCase());
    const status = res.status || 'pending';
    const matchesStatus = resStatusFilter === 'all' ? true : status === resStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filtered Menu Items
  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(menuSearchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'الكل' ? true : item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-body-md" dir="rtl">
      {/* Top Header for Supervisor */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-extrabold tracking-tight">لوحة تحكم المشرفين 🛡️</h1>
                <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  صلاحيات التشغيل والمتابعة
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-bold">
                {restaurantInfo.name} ({restaurantInfo.branch}) • مرحباً بك {currentUser?.name || 'المشرف'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Alert Toggle Button */}
            <button
              onClick={toggleSound}
              className={`font-bold text-xs px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 cursor-pointer border ${
                soundEnabled
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
              }`}
              title={soundEnabled ? "التنبيهات الصوتية مفعّلة (اضغط للكتم)" : "التنبيهات الصوتية مكتومة (اضغط للتفعيل)"}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="hidden sm:inline">التنبيه الصوتي: مفعل</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-400" />
                  <span className="hidden sm:inline">التنبيه الصوتي: مكتوم</span>
                </>
              )}
            </button>

            {/* Test Sound Button */}
            <button
              onClick={playNewOrderAlertSound}
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-bold text-xs px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
              title="تجربة صوت النغمة والتأكد من إذن الصوت في المتصفح"
            >
              <Bell className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">تجربة الجرس 🔔</span>
            </button>

            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <LogOut className="w-4 h-4 text-amber-400" />
              <span>الخروج</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">

        {!hasAnyPermission ? (
          <div className="bg-white rounded-3xl p-10 border border-amber-200 shadow-md text-center max-w-lg mx-auto my-12 space-y-4">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">حسابك لا يمتلك صلاحيات نشطة حالياً</h3>
            <p className="text-xs text-slate-600 font-bold leading-relaxed">
              لم يحدد مدير النظام أي صلاحيات تشغيلية لحسابك بعد. يرجى التواصل مع إدارة المطعم لمنحك صلاحية إدارة الطلبات، الحجوزات، أو المنيو.
            </p>
            <button
              onClick={onClose}
              className="py-2.5 px-6 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
            >
              العودة للرئيسية
            </button>
          </div>
        ) : (
          <>
            {/* PERSISTENT VISUAL ALERT BANNER FOR NEW ORDERS */}
            {canManageOrders && receivedOrders.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 p-4 rounded-2xl shadow-lg border border-amber-300 mb-6 flex flex-wrap items-center justify-between gap-3 animate-pulse"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-950 text-amber-400 flex items-center justify-center shrink-0 shadow-sm">
                    <BellRing className="w-6 h-6 animate-bounce" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm sm:text-base flex items-center gap-2">
                      <span>🚨 تنبيه عاجل: يوجد {receivedOrders.length} طلب جديد بحاجة للتحضير!</span>
                    </h3>
                    <p className="text-xs font-bold text-slate-900/80 mt-0.5">
                      يرجى تأكيد الطلبات والبدء في تجهيزها فوراً لضمان سرعة التوصيل وعدم تأخير العملاء.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setActiveTab('orders');
                    setOrderStatusFilter('received');
                  }}
                  className="bg-slate-950 hover:bg-slate-900 text-amber-400 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95 shrink-0"
                >
                  <Eye className="w-4 h-4" />
                  <span>عرض الطلبات الجديدة الآن ({receivedOrders.length})</span>
                </button>
              </motion.div>
            )}

            {/* Metric Quick Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
              {canManageOrders && (
                <>
                  <div 
                    onClick={() => { setActiveTab('orders'); setOrderStatusFilter('received'); }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                      receivedOrders.length > 0 
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md animate-pulse' 
                        : 'bg-white border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold opacity-80">طلبات جديدة</span>
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <p className="text-xl font-black mt-1">{receivedOrders.length} طلب</p>
                  </div>

                  <div 
                    onClick={() => { setActiveTab('orders'); setOrderStatusFilter('preparing'); }}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 text-slate-800 hover:border-amber-400 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-amber-600">
                      <span className="text-[11px] font-bold text-slate-500">جاري التحضير</span>
                      <ChefHat className="w-4 h-4" />
                    </div>
                    <p className="text-xl font-black text-slate-900 mt-1">{preparingOrders.length} طلب</p>
                  </div>

                  <div 
                    onClick={() => { setActiveTab('orders'); setOrderStatusFilter('on_the_way'); }}
                    className="bg-white p-3.5 rounded-2xl border border-slate-200 text-slate-800 hover:border-blue-400 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-blue-600">
                      <span className="text-[11px] font-bold text-slate-500">جاري التوصيل</span>
                      <Truck className="w-4 h-4" />
                    </div>
                    <p className="text-xl font-black text-slate-900 mt-1">{onTheWayOrders.length} طلب</p>
                  </div>
                </>
              )}

              {canManageReservations && (
                <div 
                  onClick={() => { setActiveTab('reservations'); setResStatusFilter('pending'); }}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200 text-slate-800 hover:border-purple-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-purple-600">
                    <span className="text-[11px] font-bold text-slate-500">حجوزات قيد الانتظار</span>
                    <Users className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-black text-slate-900 mt-1">{pendingReservations.length} حجز</p>
                </div>
              )}

              {canManageOrders && (
                <div 
                  onClick={() => { setActiveTab('orders'); setOrderStatusFilter('delivered'); }}
                  className="col-span-2 sm:col-span-4 lg:col-span-1 bg-white p-3.5 rounded-2xl border border-slate-200 text-slate-800 hover:border-green-400 transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-green-600">
                    <span className="text-[11px] font-bold text-slate-500">طلبات مكتملة اليوم</span>
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p className="text-xl font-black text-slate-900 mt-1">{deliveredOrders.length} طلب</p>
                </div>
              )}
            </div>

            {/* Supervisor Tabs Bar */}
            <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 mb-6 shadow-sm">
              {canManageOrders && (
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'orders'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>إدارة الطلبات ({orders.length})</span>
                  {receivedOrders.length > 0 && (
                    <span className="bg-amber-500 text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-full">
                      {receivedOrders.length} جديد
                    </span>
                  )}
                </button>
              )}

              {canManageReservations && (
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'reservations'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>حجوزات الطاولات ({reservations.length})</span>
                  {pendingReservations.length > 0 && (
                    <span className="bg-purple-500 text-white font-bold text-[10px] px-2 py-0.5 rounded-full">
                      {pendingReservations.length} معلق
                    </span>
                  )}
                </button>
              )}

              {canManageMenu && (
                <button
                  onClick={() => setActiveTab('menu')}
                  className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'menu'
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Coffee className="w-4 h-4 text-green-400" />
                  <span>قائمة الطعام وحالة الأصناف ({menuItems.length})</span>
                </button>
              )}

              {canManagePromos && (
                <button
                  onClick={() => setActiveTab('promos')}
                  className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    activeTab === 'promos'
                      ? 'bg-amber-600 text-white shadow-md'
                      : 'text-amber-900 bg-amber-50 hover:bg-amber-100'
                  }`}
                >
                  <Ticket className="w-4 h-4 text-amber-500" />
                  <span>أكواد الخصم والقسائم ({promoCodes.length})</span>
                </button>
              )}
            </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Search and Filter Controls */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="ابحث باسم العميل، رقم الهاتف، أو رقم الطلب..."
                  value={orderSearchQuery}
                  onChange={(e) => setOrderSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none bg-slate-50 font-medium"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setOrderStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    orderStatusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  الكل ({orders.length})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('received')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    orderStatusFilter === 'received' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                  }`}
                >
                  جديد ({receivedOrders.length})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('preparing')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    orderStatusFilter === 'preparing' ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-800 hover:bg-orange-100'
                  }`}
                >
                  جاري التحضير ({preparingOrders.length})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('on_the_way')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    orderStatusFilter === 'on_the_way' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
                  }`}
                >
                  جاري التوصيل ({onTheWayOrders.length})
                </button>
                <button
                  onClick={() => setOrderStatusFilter('delivered')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    orderStatusFilter === 'delivered' ? 'bg-green-700 text-white' : 'bg-green-50 text-green-800 hover:bg-green-100'
                  }`}
                >
                  تم التوصيل ({deliveredOrders.length})
                </button>
              </div>
            </div>

            {/* Orders Cards Grid */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700 text-sm">لا توجد طلبات مطابقة</h3>
                <p className="text-xs text-slate-400 mt-1">تأكد من فلتر البحث أو حالة الطلب المحدد</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredOrders.map(order => (
                  <div 
                    key={order.id}
                    className={`bg-white rounded-2xl border transition-all shadow-sm overflow-hidden flex flex-col ${
                      order.status === 'received' 
                        ? 'border-amber-400 ring-2 ring-amber-400/20' 
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Order Card Header */}
                    <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-500">#{order.id.slice(-6)}</span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            order.status === 'received' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                            order.status === 'preparing' ? 'bg-orange-100 text-orange-900 border border-orange-300' :
                            order.status === 'on_the_way' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                            'bg-green-100 text-green-900 border border-green-300'
                          }`}>
                            {order.status === 'received' ? 'طلب جديد 🆕' :
                             order.status === 'preparing' ? 'جاري التحضير 🍳' :
                             order.status === 'on_the_way' ? 'في الطريق 🛵' : 'تم التسليم ✔️'}
                          </span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-sm mt-1">{order.customerName}</h4>
                      </div>

                      <div className="text-left">
                        <p className="text-sm font-black text-amber-600">{order.total.toFixed(2)} ج.م</p>
                        <span className="text-[10px] text-slate-400 block font-bold mt-0.5">
                          {order.timestamps.received || 'الآن'}
                        </span>
                      </div>
                    </div>

                    {/* Order Items & Info */}
                    <div className="p-4 space-y-3 flex-1">
                      <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="font-bold">{item.quantity}x {item.menuItem.name}</span>
                            <span className="font-mono text-slate-500">{(item.menuItem.price * item.quantity).toFixed(0)} ج.م</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-100 text-xs space-y-1 text-slate-600">
                        <div className="flex items-center gap-2 font-medium">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <a href={`tel:${order.customerPhone}`} className="text-blue-600 font-bold underline font-mono">{order.customerPhone}</a>
                        </div>
                        <div className="flex items-start gap-2 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                          <span className="truncate">{order.address || 'استلام من الفرع'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status Controller Action Buttons */}
                    <div className="p-3 bg-slate-50 border-t border-slate-100 flex flex-col gap-2">
                      <div className="text-[11px] font-bold text-slate-400 text-center">تحديث حالة الطلب فوراً:</div>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                          className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            order.status === 'preparing'
                              ? 'bg-orange-600 text-white shadow-sm ring-2 ring-orange-400'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-orange-50'
                          }`}
                        >
                          <ChefHat className="w-3 h-3 text-orange-500" />
                          <span>تحضير</span>
                        </button>

                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'on_the_way')}
                          className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            order.status === 'on_the_way'
                              ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-400'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50'
                          }`}
                        >
                          <Truck className="w-3 h-3 text-blue-500" />
                          <span>توصيل</span>
                        </button>

                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
                          className={`py-2 px-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1 ${
                            order.status === 'delivered'
                              ? 'bg-green-700 text-white shadow-sm ring-2 ring-green-400'
                              : 'bg-white border border-slate-200 text-slate-700 hover:bg-green-50'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-green-600" />
                          <span>مكتمل</span>
                        </button>
                      </div>

                      {/* Print Invoice & Details Actions */}
                      <div className="flex items-center gap-1.5 pt-1 border-t border-slate-200/60">
                        <button
                          onClick={() => setPrintingOrder(order)}
                          className={`flex-1 py-2 px-2 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95 ${
                            order.status === 'delivered'
                              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                              : 'bg-slate-900 hover:bg-slate-800 text-white'
                          }`}
                          title="طباعة الفاتورة والإيصال للعميل"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-400" />
                          <span>طباعة الفاتورة</span>
                        </button>
                        <button
                          onClick={() => setSelectedOrderDetails(order)}
                          className="py-2 px-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center cursor-pointer"
                          title="عرض تفاصيل الطلب بالكامل"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`هل أنت متاكد من حذف الطلب رقم (${order.id}) نهائياً؟`)) {
                              onDeleteOrder?.(order.id);
                            }
                          }}
                          className="py-2 px-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs transition-colors flex items-center justify-center cursor-pointer active:scale-95"
                          title="حذف الطلب نهائياً"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RESERVATIONS MANAGEMENT */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="ابحث باسم العميل أو رقم الهاتف في الحجوزات..."
                  value={resSearchQuery}
                  onChange={(e) => setResSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none bg-slate-50 font-medium"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setResStatusFilter('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    resStatusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  الكل ({reservations.length})
                </button>
                <button
                  onClick={() => setResStatusFilter('pending')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    resStatusFilter === 'pending' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-800'
                  }`}
                >
                  معلق ({pendingReservations.length})
                </button>
                <button
                  onClick={() => setResStatusFilter('confirmed')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    resStatusFilter === 'confirmed' ? 'bg-green-700 text-white' : 'bg-green-50 text-green-800'
                  }`}
                >
                  مؤكد ({confirmedReservations.length})
                </button>
              </div>
            </div>

            {filteredReservations.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
                <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="font-bold text-slate-700 text-sm">لا توجد حجوزات طاولات حالياً</h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredReservations.map(res => {
                  const status = res.status || 'pending';
                  return (
                    <div key={res.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm">{res.customerName}</h4>
                          <a href={`tel:${res.customerPhone}`} className="text-xs text-blue-600 font-bold underline font-mono block mt-0.5">
                            {res.customerPhone}
                          </a>
                        </div>
                        <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                          status === 'confirmed' ? 'bg-green-100 text-green-800 border border-green-200' :
                          status === 'cancelled' ? 'bg-red-100 text-red-800 border border-red-200' :
                          'bg-purple-100 text-purple-900 border border-purple-200'
                        }`}>
                          {status === 'confirmed' ? 'حجز مؤكد 🟢' : status === 'cancelled' ? 'حجز ملغي 🔴' : 'قيد الانتظار ⏳'}
                        </span>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span><strong>تاريخ الحجز:</strong> {res.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span><strong>توقيت الحجز:</strong> {res.timeSlot}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span><strong>عدد الأفراد:</strong> {res.guests} أشخاص</span>
                        </div>
                        {res.specialRequests && (
                          <div className="pt-1 text-slate-500 italic">
                            ملاحظات: "{res.specialRequests}"
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => onUpdateReservationStatus(res.id, 'confirmed')}
                          className="flex-1 py-2 px-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-xs transition-all shadow-sm active:scale-95"
                        >
                          تأكيد الحجز 🟢
                        </button>
                        <button
                          onClick={() => onUpdateReservationStatus(res.id, 'cancelled')}
                          className="py-2 px-3 rounded-xl bg-red-100 hover:bg-red-200 text-red-700 font-bold text-xs transition-all active:scale-95"
                        >
                          إلغاء 🔴
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MENU AVAILABILITY */}
        {activeTab === 'menu' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="ابحث في قائمة الطعام والتصنيفات..."
                  value={menuSearchQuery}
                  onChange={(e) => setMenuSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none bg-slate-50 font-medium"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
                <button
                  onClick={() => setSelectedCategory('الكل')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer ${
                    selectedCategory === 'الكل' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  الكل ({menuItems.length})
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer whitespace-nowrap ${
                      selectedCategory === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMenuItems.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
                  <div className="h-32 bg-slate-100 relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-2 right-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{item.name}</h4>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{item.description || 'لا يوجد وصف متاح'}</p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                      <span className="font-black text-amber-600 text-sm">{item.price} ج.م</span>
                      <span className="text-[10px] bg-green-50 text-green-700 font-bold px-2 py-0.5 rounded-md border border-green-200">
                        متوفر بالمنيو
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PROMO CODES MANAGEMENT */}
        {activeTab === 'promos' && canManagePromos && (
          <PromoManagement
            promoCodes={promoCodes}
            onAddPromoCode={onAddPromoCode}
            onUpdatePromoCode={onUpdatePromoCode}
            onDeletePromoCode={onDeletePromoCode}
            onTogglePromoCodeStatus={onTogglePromoCodeStatus}
          />
        )}

        </>)}

        {/* FLOATING TOAST POPUP FOR NEW INCOMING ORDER */}
        <AnimatePresence>
          {newOrderAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed bottom-6 left-6 z-[200] max-w-md w-full bg-slate-900 text-white rounded-3xl p-5 shadow-2xl border-2 border-amber-500 space-y-3"
            >
              <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black animate-bounce shrink-0 shadow-md">
                    <Bell className="w-5 h-5 text-slate-950" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md border border-amber-500/30">
                      وصل طلب جديد الآن! 🔔
                    </span>
                    <h4 className="font-extrabold text-sm text-white mt-0.5">العميل: {newOrderAlert.customerName}</h4>
                  </div>
                </div>
                <button
                  onClick={() => setNewOrderAlert(null)}
                  className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-300 space-y-1.5 font-bold">
                <div className="flex justify-between items-center text-slate-400">
                  <span>رقم الطلب: #{newOrderAlert.id.slice(0, 8)}</span>
                  <span className="text-amber-300 font-black text-sm">{newOrderAlert.total.toFixed(2)} {restaurantInfo.currency}</span>
                </div>
                <p className="line-clamp-2 text-slate-300">
                  الأصناف: {newOrderAlert.items.map(i => `${i.quantity}x ${i.name}`).join('، ')}
                </p>
                {newOrderAlert.customerPhone && (
                  <p className="text-[11px] text-slate-400">
                    هاتف العميل: <span dir="ltr" className="font-mono">{newOrderAlert.customerPhone}</span>
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => {
                    onUpdateOrderStatus(newOrderAlert.id, 'preparing');
                    setNewOrderAlert(null);
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                >
                  <ChefHat className="w-4 h-4" />
                  <span>بدء التحضير فوراً 👨‍🍳</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedOrderDetails(newOrderAlert);
                    setNewOrderAlert(null);
                    setActiveTab('orders');
                  }}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                >
                  <Eye className="w-4 h-4" />
                  <span>التفاصيل</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ORDER DETAILS MODAL */}
        <AnimatePresence>
          {selectedOrderDetails && (
            <div className="fixed inset-0 z-[180] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs" dir="rtl">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-slate-400">#{selectedOrderDetails.id}</span>
                    <h3 className="font-black text-slate-900 text-base flex items-center gap-2 mt-0.5">
                      <ShoppingBag className="w-5 h-5 text-amber-500" />
                      <span>تفاصيل طلب العميل: {selectedOrderDetails.customerName}</span>
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedOrderDetails(null)}
                    className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 grid grid-cols-2 gap-2 text-slate-700">
                    <div>
                      <span className="text-slate-400 font-bold block">اسم العميل:</span>
                      <span className="font-extrabold text-slate-900">{selectedOrderDetails.customerName}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-bold block">رقم الهاتف:</span>
                      <a href={`tel:${selectedOrderDetails.customerPhone}`} className="font-mono font-bold text-blue-600 underline">
                        {selectedOrderDetails.customerPhone}
                      </a>
                    </div>
                    <div className="col-span-2 pt-1 border-t border-slate-200/60">
                      <span className="text-slate-400 font-bold block">عنوان التوصيل:</span>
                      <span className="font-bold text-slate-800">{selectedOrderDetails.address || 'استلام مباشر من المطعم'}</span>
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <h4 className="font-extrabold text-slate-900 mb-2">الأصناف المطلوبة ({selectedOrderDetails.items.length}):</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {selectedOrderDetails.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                          <div>
                            <span className="font-bold text-slate-900">{item.quantity}x {item.menuItem.name}</span>
                            {item.selectedSideDishes && item.selectedSideDishes.length > 0 && (
                              <p className="text-[10px] text-slate-500 font-medium">
                                أطباق جانبية: {item.selectedSideDishes.join('، ')}
                              </p>
                            )}
                          </div>
                          <span className="font-mono font-black text-slate-900">{(item.menuItem.price * item.quantity).toFixed(2)} ج.م</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Total and Print */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-slate-400 font-bold block text-[11px]">المبلغ الإجمالي المطلوب:</span>
                      <span className="text-lg font-black text-amber-600">{selectedOrderDetails.total.toFixed(2)} {restaurantInfo.currency}</span>
                    </div>

                    <button
                      onClick={() => {
                        setPrintingOrder(selectedOrderDetails);
                        setSelectedOrderDetails(null);
                      }}
                      className="py-2.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs transition-all flex items-center gap-2 shadow-md active:scale-95 cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-amber-300" />
                      <span>طباعة الفاتورة والإيصال 🖨️</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* PRINTABLE INVOICE MODAL */}
        <AnimatePresence>
          {printingOrder && (
            <div
              onClick={(e) => {
                if (e.target === e.currentTarget) setPrintingOrder(null);
              }}
              className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
              dir="rtl"
            >
              <div className="w-full max-w-md my-8 relative">
                {/* Control Action Bar (Hidden when printing) */}
                <div className="no-print bg-slate-900 text-white p-3.5 rounded-t-3xl flex items-center justify-between border-b border-slate-800 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Printer className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-xs text-slate-200">معاينة وتأكيد طباعة الفاتورة</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => window.print()}
                      className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                    >
                      <Printer className="w-4 h-4" />
                      <span>طباعة الآن 🖨️</span>
                    </button>
                    <button
                      onClick={() => setPrintingOrder(null)}
                      className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer active:scale-95"
                      title="إغلاق الفاتورة والخروج"
                    >
                      <X className="w-4 h-4 stroke-[2.5]" />
                      <span>إغلاق X</span>
                    </button>
                  </div>
                </div>

                {/* RECEIPT PAPER CONTAINER (Printed via @media print) */}
                <div className="print-invoice-area bg-white text-slate-950 p-6 rounded-b-3xl shadow-2xl font-mono text-xs border border-slate-200 space-y-4">
                  {/* Restaurant Header */}
                  <div className="text-center space-y-1 pb-3 border-b-2 border-dashed border-slate-300">
                    <h2 className="text-xl font-black text-slate-900 tracking-wider uppercase">{restaurantInfo.name || 'مطعم سيلست'}</h2>
                    <p className="text-[11px] font-bold text-slate-600">Celeste Fine Dining & Cafe</p>
                    <p className="text-[10px] text-slate-500">فاتورة ضريبية مبسطة | SIMPLIFIED TAX INVOICE</p>
                    <p className="text-[10px] text-slate-500">رقم التسجيل الضريبي: 789-456-123 VAT</p>
                    {restaurantInfo.phone && <p className="text-[10px] text-slate-500" dir="ltr">Tel: {restaurantInfo.phone}</p>}
                  </div>

                  {/* Order Metadata */}
                  <div className="space-y-1 text-[11px] pb-3 border-b-2 border-dashed border-slate-300">
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-500">رقم الفاتورة:</span>
                      <span className="font-black text-slate-900">#{printingOrder.id.slice(0, 8)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-500">التاريخ والوقت:</span>
                      <span className="font-bold text-slate-900">{printingOrder.timestamps.received || new Date().toLocaleString('ar-EG')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-500">اسم العميل:</span>
                      <span className="font-black text-slate-900">{printingOrder.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-500">رقم الهاتف:</span>
                      <span className="font-bold text-slate-900" dir="ltr">{printingOrder.customerPhone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-500">نوع الطلب / العنوان:</span>
                      <span className="font-bold text-slate-900">{printingOrder.address || 'استلام من الفرع'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-bold text-slate-500">حالة الطلب:</span>
                      <span className="font-black text-emerald-700">
                        {printingOrder.status === 'delivered' ? 'مكتمل ومدفوع ✔️' : 'مقبول / جاري التجهيز'}
                      </span>
                    </div>
                  </div>

                  {/* Table of Items */}
                  <div className="space-y-2 pb-3 border-b-2 border-dashed border-slate-300">
                    <div className="flex justify-between font-black text-slate-900 text-[11px] border-b border-slate-200 pb-1">
                      <span className="flex-1">الصنف</span>
                      <span className="w-12 text-center">الكمية</span>
                      <span className="w-16 text-left">الإجمالي</span>
                    </div>

                    {printingOrder.items.map((item, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between font-bold text-slate-900 text-[11px]">
                          <span className="flex-1">{item.menuItem.name}</span>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <span className="w-16 text-left">{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                        </div>
                        {item.selectedSideDishes && item.selectedSideDishes.length > 0 && (
                          <p className="text-[10px] text-slate-500 pr-2">
                            + {item.selectedSideDishes.join('، ')}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Summary Totals */}
                  <div className="space-y-1.5 text-[11px] pb-3 border-b-2 border-dashed border-slate-300">
                    <div className="flex justify-between text-slate-600 font-bold">
                      <span>المجموع الفرعي (Subtotal):</span>
                      <span>{(printingOrder.total * 0.86).toFixed(2)} ج.م</span>
                    </div>
                    <div className="flex justify-between text-slate-600 font-bold">
                      <span>ضريبة القيمة المضافة 14% (VAT):</span>
                      <span>{(printingOrder.total * 0.14).toFixed(2)} ج.م</span>
                    </div>
                    <div className="flex justify-between text-slate-600 font-bold">
                      <span>رسوم الخدمة والتوصيل:</span>
                      <span>مجاناً 0.00 ج.م</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-300">
                      <span>الإجمالي النهائي (TOTAL):</span>
                      <span className="text-base font-black text-slate-950">{printingOrder.total.toFixed(2)} {restaurantInfo.currency}</span>
                    </div>
                  </div>

                  {/* Receipt Footer Message */}
                  <div className="text-center space-y-2 pt-1">
                    <p className="font-extrabold text-slate-800 text-[11px]">شكراً لاختياركم {restaurantInfo.name}! ❤️</p>
                    <p className="text-[10px] text-slate-500">نتمنى لكم وجبة شهية - يسعدنا خدمتكم دائماً</p>
                    
                    {/* Simulated Receipt Barcode */}
                    <div className="pt-2 opacity-80 flex flex-col items-center">
                      <div className="h-8 w-48 bg-slate-900 rounded-xs flex items-center justify-around px-2">
                        <div className="w-1 h-full bg-white"></div>
                        <div className="w-2 h-full bg-white"></div>
                        <div className="w-0.5 h-full bg-white"></div>
                        <div className="w-3 h-full bg-white"></div>
                        <div className="w-1 h-full bg-white"></div>
                        <div className="w-2 h-full bg-white"></div>
                        <div className="w-0.5 h-full bg-white"></div>
                        <div className="w-2 h-full bg-white"></div>
                        <div className="w-1 h-full bg-white"></div>
                      </div>
                      <span className="text-[9px] font-mono text-slate-400 mt-1">*{printingOrder.id.slice(0, 12)}*</span>
                    </div>
                  </div>

                  {/* Bottom Close Button (Hidden when printing) */}
                  <div className="no-print pt-4 border-t border-slate-200">
                    <button
                      onClick={() => setPrintingOrder(null)}
                      className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                    >
                      <X className="w-4 h-4 text-red-400 stroke-[3]" />
                      <span>إغلاق معاينة الفاتورة والخروج ✖</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
