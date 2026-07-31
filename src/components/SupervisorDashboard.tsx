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
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Order, Reservation, MenuItem, User, RestaurantInfo } from '../types';

interface SupervisorDashboardProps {
  orders: Order[];
  reservations: Reservation[];
  menuItems: MenuItem[];
  categories: string[];
  restaurantInfo: RestaurantInfo;
  currentUser?: User | null;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onUpdateReservationStatus: (reservationId: string, status: Reservation['status']) => void;
  onUpdateMenuItem?: (updatedItem: MenuItem) => void;
  onClose: () => void;
}

export default function SupervisorDashboard({
  orders,
  reservations,
  menuItems,
  categories,
  restaurantInfo,
  currentUser,
  onUpdateOrderStatus,
  onUpdateReservationStatus,
  onUpdateMenuItem,
  onClose
}: SupervisorDashboardProps) {
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'menu'>('orders');

  // Orders Filters & Search
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'received' | 'preparing' | 'on_the_way' | 'delivered'>('all');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

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

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <LogOut className="w-4 h-4 text-amber-400" />
              <span>الخروج للواجهة الرئيسية</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Metric Quick Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
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
        </div>

        {/* Supervisor Tabs Bar */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 mb-6 shadow-sm">
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

      </main>
    </div>
  );
}
