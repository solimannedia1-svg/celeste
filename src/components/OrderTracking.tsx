import { useState } from 'react';
import { Order, Reservation, User as UserType, RestaurantInfo } from '../types';
import { Truck, Check, Clock, Calendar, Users, ShoppingBag, Phone, User as UserIcon, MessageSquare, MapPin, Utensils, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderTrackingProps {
  order?: Order | null;
  userOrders?: Order[];
  userReservations?: Reservation[];
  currentUser?: UserType | null;
  restaurantInfo?: RestaurantInfo;
  onSelectOrder?: (order: Order) => void;
  onOpenMenu?: () => void;
  onOpenBooking?: () => void;
  onOpenAuth?: () => void;
}

export default function OrderTracking({ 
  order, 
  userOrders = [], 
  userReservations = [], 
  currentUser,
  restaurantInfo,
  onSelectOrder,
  onOpenMenu,
  onOpenBooking,
  onOpenAuth
}: OrderTrackingProps) {
  const [filterType, setFilterType] = useState<'all' | 'orders' | 'reservations'>('all');
  const [selectedItemKey, setSelectedItemKey] = useState<string | null>(null);

  // Combine food orders and reservations
  const allOrders = userOrders.length > 0 ? userOrders : (order ? [order] : []);
  const allReservations = userReservations;

  // Determine selected item
  let currentOrder: Order | null = null;
  let currentReservation: Reservation | null = null;

  if (selectedItemKey) {
    currentOrder = allOrders.find(o => o.id === selectedItemKey) || null;
    currentReservation = allReservations.find(r => r.id === selectedItemKey) || null;
  }

  if (!currentOrder && !currentReservation) {
    if (order && allOrders.some(o => o.id === order.id)) {
      currentOrder = order;
    } else if (allOrders.length > 0) {
      currentOrder = allOrders[0];
    } else if (allReservations.length > 0) {
      currentReservation = allReservations[0];
    }
  }

  const hasItems = allOrders.length > 0 || allReservations.length > 0;

  if (!hasItems) {
    return (
      <div className="text-center py-16 px-4 space-y-5 text-right" dir="rtl">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-inner">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2 max-w-sm mx-auto">
          <h3 className="font-headline-lg text-xl text-primary font-bold">لا توجد طلبات أو حجوزات مسجلة</h3>
          <p className="text-secondary text-xs leading-relaxed">
            {currentUser 
              ? `أهلاً ${currentUser.name}! لم تقم بإجراء أي طلب طعام أو حجز طاولة بعد.`
              : 'لم تقم بإجراء أي طلبات حتى الآن. يمكنك تسجيل الدخول لمتابعة كافة سوابق طلباتك وحجوزاتك.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {!currentUser && onOpenAuth && (
            <button
              onClick={onOpenAuth}
              className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-full text-xs shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
            >
              <UserIcon className="w-4 h-4" />
              <span>تسجيل الدخول للحساب</span>
            </button>
          )}
          {onOpenMenu && (
            <button
              onClick={onOpenMenu}
              className="w-full sm:w-auto px-6 py-3 bg-surface-container-high text-primary font-bold rounded-full text-xs border border-outline-variant/40 hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2"
            >
              <Utensils className="w-4 h-4" />
              <span>تصفح قائمة الطعام</span>
            </button>
          )}
          {onOpenBooking && (
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3 bg-surface-container-high text-secondary font-bold rounded-full text-xs border border-outline-variant/40 hover:bg-surface-container-highest transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>حجز طاولة جديدة</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-24 text-right relative" dir="rtl">
      {/* Activity Filter Header */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-headline-md text-2xl text-primary font-bold">تتبع الطلبات والحجوزات</h2>
            <p className="text-xs text-secondary mt-0.5">
              {currentUser ? `سجل النشاطات الخاص بحساب ${currentUser.name}` : 'متابعة الطلبات والحجوزات'}
            </p>
          </div>
          {currentUser && (
            <span className="bg-primary/10 text-primary font-bold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
              <UserIcon className="w-3.5 h-3.5" />
              {currentUser.name}
            </span>
          )}
        </div>

        {/* Filter Pills if user has items */}
        <div className="flex items-center gap-2 border-b border-outline-variant/30 pb-3 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              filterType === 'all'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container text-secondary hover:bg-surface-container-high'
            }`}
          >
            الكل ({allOrders.length + allReservations.length})
          </button>
          <button
            onClick={() => setFilterType('orders')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filterType === 'orders'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container text-secondary hover:bg-surface-container-high'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            طلبات الطعام ({allOrders.length})
          </button>
          <button
            onClick={() => setFilterType('reservations')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              filterType === 'reservations'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container text-secondary hover:bg-surface-container-high'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            حجوزات الطاولات ({allReservations.length})
          </button>
        </div>

        {/* List Selector Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(filterType === 'all' || filterType === 'orders') && allOrders.map(o => {
            const statusLabel = 
              o.status === 'delivered' ? 'تم التوصيل' :
              o.status === 'on_the_way' ? 'في الطريق' :
              o.status === 'preparing' ? 'جاري التجهيز' : 'تم الاستلام';
            
            const isSelected = currentOrder?.id === o.id;

            return (
              <button
                key={o.id}
                onClick={() => {
                  setSelectedItemKey(o.id);
                  if (onSelectOrder) onSelectOrder(o);
                }}
                className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-md scale-105'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:border-primary/40'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <div className="text-right">
                  <div className="font-mono text-[11px] leading-tight">{o.id}</div>
                  <div className={`text-[9px] font-semibold ${isSelected ? 'text-white/80' : 'text-primary'}`}>
                    طلب طعام • {statusLabel}
                  </div>
                </div>
              </button>
            );
          })}

          {(filterType === 'all' || filterType === 'reservations') && allReservations.map(r => {
            const statusLabel = 
              r.status === 'confirmed' ? 'مؤكد ومحجوز' :
              r.status === 'cancelled' ? 'ملغي' : 'قيد الانتظار';

            const isSelected = currentReservation?.id === r.id;

            return (
              <button
                key={r.id}
                onClick={() => setSelectedItemKey(r.id)}
                className={`px-3 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-primary text-white border-primary shadow-md scale-105'
                    : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:border-primary/40'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <div className="text-right">
                  <div className="font-mono text-[11px] leading-tight">{r.id}</div>
                  <div className={`text-[9px] font-semibold ${isSelected ? 'text-white/80' : 'text-emerald-700'}`}>
                    حجز طاولة • {statusLabel}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER TABLE RESERVATION DETAILS IF SELECTED */}
      {currentReservation && (
        <motion.div
          key={currentReservation.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          {/* Reservation Card Header */}
          <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/30 shadow-sm space-y-5">
            <div className="flex justify-between items-start border-b border-outline-variant/20 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  حجز طاولة طعام
                </span>
                <h3 className="font-headline-md text-xl font-bold text-primary">تفاصيل الحجز #{currentReservation.id}</h3>
                <p className="text-xs text-secondary mt-0.5">تم تقديم الطلب بتاريخ: {currentReservation.timestamp}</p>
              </div>

              <div className="text-left">
                {currentReservation.status === 'confirmed' ? (
                  <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 font-bold px-3 py-1.5 rounded-full text-xs border border-green-200 shadow-sm">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    مؤكد ومحجوز
                  </span>
                ) : currentReservation.status === 'cancelled' ? (
                  <span className="inline-flex items-center gap-1 bg-red-100 text-red-800 font-bold px-3 py-1.5 rounded-full text-xs border border-red-200">
                    <XCircle className="w-3.5 h-3.5" />
                    ملغي
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 font-bold px-3 py-1.5 rounded-full text-xs border border-amber-200">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
                    قيد التجهيز والتحقق
                  </span>
                )}
              </div>
            </div>

            {/* Grid Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-surface-container p-4 rounded-2xl space-y-3 border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-secondary font-bold block">ميعاد الحجز المحدد</span>
                    <span className="font-bold text-sm text-on-surface">{currentReservation.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-outline-variant/20">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-secondary font-bold block">التوقيت والتفاصيل</span>
                    <span className="font-bold text-sm text-on-surface">{currentReservation.timeSlot}</span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container p-4 rounded-2xl space-y-3 border border-outline-variant/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-secondary font-bold block">عدد الحضور</span>
                    <span className="font-bold text-sm text-on-surface">{currentReservation.guests} أشخاص</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-outline-variant/20">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                    <UserIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] text-secondary font-bold block">اسم صاحب الحجز</span>
                    <span className="font-bold text-sm text-on-surface">{currentReservation.customerName} ({currentReservation.customerPhone})</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            {currentReservation.specialRequests && (
              <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/60 space-y-1">
                <span className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                  <MessageSquare className="w-4 h-4 text-amber-700" />
                  الطلبات والملاحظات الخاصة:
                </span>
                <p className="text-xs text-amber-950 font-medium italic pr-5">
                  "{currentReservation.specialRequests}"
                </p>
              </div>
            )}

            {/* Restaurant Info Notice */}
            <div className="bg-surface-container p-4 rounded-2xl flex items-center justify-between gap-4 border border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-primary">{restaurantInfo?.name || "مطعم ومقهى سيلست Celeste"}</h4>
                  <p className="text-[11px] text-secondary">{restaurantInfo?.address || "طرح البحر - مجمع المطاعم - فرع بورسعيد"}</p>
                </div>
              </div>
              <a
                href={`tel:${restaurantInfo?.phone || "01012345678"}`}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all flex items-center gap-1.5 shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>اتصل بالمطعم</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* RENDER FOOD ORDER DETAILS IF SELECTED */}
      {currentOrder && (
        <motion.div
          key={currentOrder.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Order Header */}
          <div className="flex justify-between items-end">
            <div className="space-y-0.5">
              <p className="font-label-lg text-xs text-secondary font-semibold">
                رقم الطلب: <span className="font-mono">{currentOrder.id}</span>
              </p>
              <h2 className="font-headline-md text-2xl text-primary font-bold">تتبع طلب الطعام</h2>
            </div>
            <div className="bg-primary-container text-on-primary-container px-4 py-1.5 rounded-full shadow-sm">
              <p className="font-label-lg text-xs font-bold">{currentOrder.estimatedTime}</p>
            </div>
          </div>

          {/* Map View */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden sunbaked-shadow border border-outline-variant/30">
            <div className="absolute inset-0 bg-surface-container-high flex items-center justify-center">
              <div
                className="absolute inset-0 opacity-50 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD7Ad3LmpCYxVaTA534D-9W_WyX04e3L7GDZ1MlKburkB-V6MCMpOuy3Gg1OrBe88QeLo85cfXmD6MlNBWoLlc36TBr4DfT4bYr6aE84Z00CO4du4bvSA_C8p1s0tIzs1R23Emuo9BjbvPFymrbUCsjWkN7NVOqiODcpZVGhugiQHF_ojBBePl26nmN6RX0GRNTgcmyf0Kwr9AouR1YcE54d-xu8SrtM2C1QKufiZnX6c2LjrTpTfyykwRxReOhaEWn2iIMxHvzQ84')",
                }}
              />

              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 400 256">
                <path
                  d="M50,180 Q150,150 200,100 T350,50"
                  fill="none"
                  stroke="#8e3a1f"
                  strokeDasharray="8 4"
                  strokeWidth="4"
                  className="opacity-90"
                />
                <circle cx="350" cy="50" fill="#8e3a1f" r="8" className="animate-ping" />
                <circle cx="350" cy="50" fill="#8e3a1f" r="6" />
                <rect fill="#6f240a" height="20" rx="4" width="20" x="40" y="170" />
              </svg>

              {currentOrder.status === 'on_the_way' && (
                <motion.div
                  animate={{
                    x: [-110, 110],
                    y: [40, -60],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute bg-white px-3 py-1.5 rounded-full shadow-lg border border-outline-variant/30 flex items-center gap-1.5"
                >
                  <Truck className="w-4 h-4 text-primary" />
                  <span className="font-label-lg text-xs text-primary font-bold">الطلب في طريقه إليك</span>
                </motion.div>
              )}

              {currentOrder.status === 'preparing' && (
                <div className="absolute bg-white px-3 py-1.5 rounded-full shadow-lg border border-outline-variant/30 flex items-center gap-1.5 animate-bounce">
                  <Clock className="w-4 h-4 text-orange-600" />
                  <span className="font-label-lg text-xs text-orange-700 font-bold">جاري تجهيز طلبك اللذيذ</span>
                </div>
              )}

              {currentOrder.status === 'delivered' && (
                <div className="absolute bg-green-50 px-3 py-1.5 rounded-full shadow-lg border border-green-300 flex items-center gap-1.5 animate-bounce">
                  <Check className="w-4 h-4 text-green-700 stroke-[3]" />
                  <span className="font-label-lg text-xs text-green-800 font-bold">تم توصيل طلبك بالسلامة!</span>
                </div>
              )}
            </div>
          </div>

          {/* Live Status Stepper Container */}
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-5">
            <div className="flex flex-col gap-6 relative pr-3">
              <div className="absolute right-6 top-3 bottom-3 w-0.5 bg-outline-variant/30"></div>

              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="relative z-10">
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
                <div className="space-y-0.5">
                  <p className="font-label-lg text-sm text-primary font-bold">تم استلام الطلب</p>
                  <p className="text-[10px] text-secondary font-semibold">{currentOrder.timestamps.received}</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="relative z-10">
                  {currentOrder.status === 'received' ? (
                    <div className="w-6 h-6 rounded-full bg-outline-variant/40 flex items-center justify-center"></div>
                  ) : currentOrder.status === 'preparing' ? (
                    <div className="w-6 h-6 rounded-full bg-primary-container active-dot flex items-center justify-center text-primary">
                      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <p
                    className={`font-label-lg text-sm font-bold ${
                      currentOrder.status === 'preparing' ? 'text-primary font-extrabold' : 'text-on-surface'
                    }`}
                  >
                    جاري التجهيز
                  </p>
                  <p className="text-[10px] text-secondary font-semibold">{currentOrder.timestamps.preparing}</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="relative z-10">
                  {currentOrder.status === 'received' || currentOrder.status === 'preparing' ? (
                    <div className="w-6 h-6 rounded-full bg-outline-variant/40 flex items-center justify-center"></div>
                  ) : currentOrder.status === 'on_the_way' ? (
                    <div className="w-6 h-6 rounded-full bg-primary-container active-dot flex items-center justify-center text-primary">
                      <div className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <p
                    className={`font-label-lg text-sm font-bold ${
                      currentOrder.status === 'on_the_way' ? 'text-primary font-extrabold' : 'text-on-surface'
                    }`}
                  >
                    في الطريق إليك
                  </p>
                  <p className="text-[10px] text-primary font-bold">{currentOrder.timestamps.on_the_way}</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="relative z-10">
                  {currentOrder.status !== 'delivered' ? (
                    <div className="w-6 h-6 rounded-full bg-outline-variant/40 flex items-center justify-center"></div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="space-y-0.5">
                  <p
                    className={`font-label-lg text-sm font-bold ${
                      currentOrder.status === 'delivered' ? 'text-green-700 font-extrabold' : 'text-secondary'
                    }`}
                  >
                    تم التوصيل
                  </p>
                  {currentOrder.status === 'delivered' && (
                    <p className="text-[10px] text-green-600 font-bold">بالهناء والشفاء! شكراً لاختيارك سيلست.</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Customer Card */}
          <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/30 shadow-sm space-y-4 text-right">
            <h3 className="font-headline-md text-base font-bold text-primary border-b border-outline-variant/30 pb-2">تفاصيل الطلب والعميل</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-secondary text-xs block">اسم العميل:</span>
                <span className="font-bold text-on-surface text-sm">{currentOrder.customerName}</span>
              </div>
              <div>
                <span className="text-secondary text-xs block">رقم التليفون:</span>
                <span className="font-bold text-on-surface text-sm">{currentOrder.customerPhone}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-outline-variant/10">
              <span className="text-secondary text-xs block">العنوان المحدد:</span>
              <p className="font-bold text-on-surface text-sm mt-0.5">{currentOrder.address}</p>
            </div>

            {/* Items Purchased List */}
            {currentOrder.items && currentOrder.items.length > 0 && (
              <div className="pt-3 border-t border-outline-variant/20 space-y-2">
                <span className="text-secondary text-xs font-bold block">الأصناف المطلوبة:</span>
                <div className="space-y-1.5 bg-surface-container p-3 rounded-xl border border-outline-variant/20">
                  {currentOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between text-xs font-medium text-on-surface">
                      <span>{it.quantity}x {it.menuItem.name}</span>
                      <span className="font-bold text-primary font-mono">{(it.menuItem.price * it.quantity).toFixed(0)} ج.م</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-outline-variant/20 flex justify-between text-sm font-bold text-primary">
                    <span>الإجمالي الكلي:</span>
                    <span className="font-mono">{currentOrder.total.toFixed(0)} ج.م</span>
                  </div>
                </div>
              </div>
            )}

            {/* Restaurant Info Notice */}
            <div className="bg-surface-container p-4 rounded-2xl flex items-center justify-between gap-4 border border-outline-variant/20 mt-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-primary">{restaurantInfo?.name || "مطعم ومقهى سيلست Celeste"}</h4>
                  <p className="text-[11px] text-secondary">{restaurantInfo?.address || "طرح البحر - مجمع المطاعم - فرع بورسعيد"}</p>
                </div>
              </div>
              <a
                href={`tel:${restaurantInfo?.phone || "01012345678"}`}
                className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all flex items-center gap-1.5 shrink-0"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>اتصل بالمطعم</span>
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

