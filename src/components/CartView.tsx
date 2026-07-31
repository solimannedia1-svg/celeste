import { useState, useEffect } from 'react';
import { CartItem, Order, User, PromoCode } from '../types';
import { Trash2, Plus, Minus, Store, Truck, MapPin, Ticket, CheckCircle, ShoppingBag, User as UserIcon, Phone, X, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartViewProps {
  cartItems: CartItem[];
  currentUser?: User | null;
  promoCodes?: PromoCode[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (order: Order) => void;
  onOpenAuth?: () => void;
}

export default function CartView({ cartItems, currentUser, promoCodes = [], onUpdateQuantity, onRemoveItem, onCheckout, onOpenAuth }: CartViewProps) {
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'home'>('pickup');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customAddress, setCustomAddress] = useState('');
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [appliedPromoInfo, setPromoAppliedInfo] = useState<{ code: string; label: string; amount: number } | null>(null);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.name);
      if (!customerPhone) setCustomerPhone(currentUser.phone);
    }
  }, [currentUser]);

  // Calculate prices
  const subtotal = cartItems.reduce((sum, item) => {
    const extrasTotal = item.extras.reduce((s, e) => s + e.price, 0);
    return sum + (item.menuItem.price + extrasTotal) * item.quantity;
  }, 0);

  const deliveryFee = deliveryType === 'home' ? 30.0 : 0.0;
  
  // Re-evaluate discount if subtotal changes
  let discountAmount = 0;
  if (promoApplied && appliedPromoInfo) {
    const foundCode = promoCodes.find(p => p.code.toUpperCase() === appliedPromoInfo.code.toUpperCase());
    if (foundCode) {
      if (foundCode.type === 'percentage') {
        discountAmount = subtotal * (foundCode.value / 100);
        if (foundCode.maxDiscount && discountAmount > foundCode.maxDiscount) {
          discountAmount = foundCode.maxDiscount;
        }
      } else {
        discountAmount = Math.min(foundCode.value, subtotal);
      }
    } else {
      discountAmount = appliedPromoInfo.amount;
    }
  }

  const total = Math.max(0, subtotal + deliveryFee - discountAmount);

  const handleApplyPromo = (codeToApply?: string) => {
    setPromoError('');
    const code = (codeToApply || promoCodeInput).trim().toUpperCase();
    if (!code) {
      setPromoError('الرجاء إدخال الرمز الترويجي أولاً');
      return;
    }

    const availablePromos = promoCodes && promoCodes.length > 0 ? promoCodes : [
      { id: '1', code: 'WELCOME10', type: 'percentage' as const, value: 10, minOrderValue: 100, isActive: true },
      { id: '2', code: 'CELESTE50', type: 'fixed' as const, value: 50, minOrderValue: 200, isActive: true }
    ];

    const found = availablePromos.find(p => p.code.toUpperCase() === code);

    if (!found) {
      setPromoError('كود الخصم غير صحيح أو غير موجود.');
      return;
    }

    if (!found.isActive) {
      setPromoError('كود الخصم هذا متوقف حالياً.');
      return;
    }

    if (found.expiryDate) {
      const expiry = new Date(found.expiryDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (expiry < today) {
        setPromoError('عفواً، انتهت صلاحية هذا الكود (منتهي التاريخ).');
        return;
      }
    }

    if (found.maxUses !== undefined && found.maxUses !== null && found.maxUses > 0) {
      const currentUses = found.usageCount || 0;
      if (currentUses >= found.maxUses) {
        setPromoError('عفواً، استنفد هذا الكود الحد الأقصى للمستخدمين والمستفيدين ولم يعد متاحاً (اكسبيرد).');
        return;
      }
    }

    if (found.minOrderValue && subtotal < found.minOrderValue) {
      setPromoError(`الحد الأدنى للطلب لاستخدام كود الخصم هذا هو ${found.minOrderValue} ج.م`);
      return;
    }

    let calculatedDiscount = 0;
    let label = '';
    if (found.type === 'percentage') {
      calculatedDiscount = subtotal * (found.value / 100);
      if (found.maxDiscount && calculatedDiscount > found.maxDiscount) {
        calculatedDiscount = found.maxDiscount;
        label = `خصم ${found.value}% (بحد أقصى ${found.maxDiscount} ج.م)`;
      } else {
        label = `خصم ${found.value}%`;
      }
    } else {
      calculatedDiscount = Math.min(found.value, subtotal);
      label = `خصم ${found.value} ج.م`;
    }

    setPromoAppliedInfo({
      code: found.code,
      label,
      amount: calculatedDiscount
    });
    setPromoCodeInput(found.code);
    setPromoApplied(true);
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setPromoAppliedInfo(null);
    setPromoCodeInput('');
    setPromoError('');
  };

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;

    if (!currentUser) {
      if (onOpenAuth) onOpenAuth();
      alert('عفواً! يلزم تسجيل الدخول أو إنشاء حساب جديد أولاً حتى تتمكن من تأكيد وإرسال الطلب.');
      return;
    }

    if (!customerName.trim()) {
      alert('الرجاء إدخال اسم العميل أولاً لإتمام الطلب.');
      return;
    }
    if (!customerPhone.trim()) {
      alert('الرجاء إدخال رقم تليفون العميل أولاً لإتمام الطلب.');
      return;
    }
    if (deliveryType === 'home' && !customAddress.trim()) {
      alert('الرجاء إدخال عنوان التوصيل بالتفصيل.');
      return;
    }

    const addressText = deliveryType === 'home' 
      ? customAddress.trim() 
      : 'طرح البحر - مجمع المطاعم - فرع بورسعيد - استلام شخصي';

    const newOrder: Order = {
      id: `#CEL-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: currentUser?.id,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      items: cartItems,
      subtotal,
      deliveryFee,
      total,
      deliveryType,
      address: addressText,
      status: 'received',
      estimatedTime: '15-20 دقيقة',
      promoCode: promoApplied ? appliedPromoInfo?.code : undefined,
      discountAmount: promoApplied ? discountAmount : undefined,
      timestamps: {
        received: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        preparing: new Date(Date.now() + 5 * 60 * 1000).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        on_the_way: new Date(Date.now() + 15 * 60 * 1000).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      }
    };

    onCheckout(newOrder);
  };

  return (
    <div className="space-y-6 pb-44 text-right">
      {/* Title */}
      <h2 className="font-headline-md text-xl text-primary font-bold px-1">طلبك الحالي</h2>

      {/* Cart Items List */}
      <section className="space-y-3">
        <AnimatePresence initial={false}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => {
              const extrasText = item.extras.map(e => e.name).join('، ');
              const customDetails = [
                item.selectedSideDish ? `الطبق الجانبي: ${item.selectedSideDish}` : '',
                item.breadType === 'brioche' ? 'خبز البريوش' : item.breadType === 'oat' ? 'خبز الشوفان' : '',
                extrasText
              ].filter(Boolean).join(' • ');

              const extrasCost = item.extras.reduce((sum, e) => sum + e.price, 0);
              const singlePrice = item.menuItem.price + extrasCost;

              return (
                <motion.div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  initial={{ opacity: 0, height: 0, y: -20 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -20 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                  className="bg-surface-container-low p-4 rounded-2xl flex gap-4 border border-outline-variant/30 sunbaked-shadow overflow-hidden"
                >
                  {/* Item Image */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-outline-variant/20">
                    <img
                      className="w-full h-full object-cover"
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <h3 className="font-headline-md text-base text-primary font-bold leading-tight">
                          {item.menuItem.name}
                        </h3>
                        {customDetails && (
                          <p className="text-secondary text-xs font-semibold leading-relaxed">
                            {customDetails}
                          </p>
                        )}
                      </div>
                      
                      {/* Delete Button */}
                      <button
                        id={`delete-cart-item-${item.id}`}
                        onClick={() => onRemoveItem(item.id)}
                        className="text-error hover:bg-error-container/20 p-2 rounded-full transition-colors active:scale-90"
                        title="حذف من السلة"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="font-bold text-primary text-sm">
                        {(singlePrice * item.quantity).toFixed(2)} ج.م
                      </span>

                      {/* Quantity Controls inside Card */}
                      <div className="flex items-center bg-surface-container-highest rounded-full p-0.5 gap-2 border border-outline-variant/10 shadow-sm">
                        <button
                          id={`qty-add-${item.id}`}
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center hover:opacity-90 active:scale-90 transition-all shadow-sm"
                        >
                          <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <span className="font-bold text-xs min-w-[20px] text-center text-on-surface">
                          {item.quantity}
                        </span>
                        <button
                          id={`qty-sub-${item.id}`}
                          onClick={() => {
                            if (item.quantity > 1) {
                              onUpdateQuantity(item.id, item.quantity - 1);
                            } else {
                              onRemoveItem(item.id);
                            }
                          }}
                          className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:opacity-90 active:scale-90 transition-all border border-outline-variant/10"
                        >
                          <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="text-center py-12 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/40 space-y-4">
              <ShoppingBag className="w-10 h-10 text-secondary/30 mx-auto" />
              <div className="space-y-1">
                <p className="text-on-surface font-bold text-sm">سلتك فارغة حالياً</p>
                <p className="text-secondary text-xs">أضف بعض المشروبات أو الوجبات اللذيذة لتستمتع بها.</p>
              </div>
            </div>
          )}
        </AnimatePresence>
      </section>

      {/* Delivery Options */}
      {cartItems.length > 0 && (
        <>
          <section className="space-y-3">
            <h2 className="font-headline-md text-lg text-on-surface-variant font-bold px-1">طريقة الاستلام</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* Pickup Option */}
              <label className="relative cursor-pointer select-none">
                <input
                  id="delivery-pickup-radio"
                  type="radio"
                  name="delivery_type"
                  checked={deliveryType === 'pickup'}
                  onChange={() => setDeliveryType('pickup')}
                  className="sr-only peer"
                />
                <div className="bg-surface-container-low border-2 border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary-fixed transition-all duration-300 rounded-2xl p-4 flex flex-col items-center gap-1.5 shadow-sm">
                  <Store className="w-7 h-7 text-primary" />
                  <span className="font-bold text-sm text-on-surface">استلام من الفرع</span>
                  <span className="text-xs text-secondary font-semibold">مجاناً</span>
                </div>
              </label>

              {/* Home Delivery Option */}
              <label className="relative cursor-pointer select-none">
                <input
                  id="delivery-home-radio"
                  type="radio"
                  name="delivery_type"
                  checked={deliveryType === 'home'}
                  onChange={() => setDeliveryType('home')}
                  className="sr-only peer"
                />
                <div className="bg-surface-container-low border-2 border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary-fixed transition-all duration-300 rounded-2xl p-4 flex flex-col items-center gap-1.5 shadow-sm">
                  <Truck className="w-7 h-7 text-primary" />
                  <span className="font-bold text-sm text-on-surface">توصيل للمنزل</span>
                  <span className="text-xs text-secondary font-semibold">30.00 ج.م</span>
                </div>
              </label>
            </div>
          </section>

          {/* Customer Details Form */}
          <section className="space-y-4 bg-surface-container-low p-5 rounded-3xl border border-outline-variant/30">
            {!currentUser && (
              <div className="bg-amber-500/10 border-2 border-amber-500/30 p-4 rounded-2xl space-y-2.5 text-right">
                <div className="flex items-center gap-2 text-amber-800 font-black text-xs md:text-sm">
                  <UserIcon className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <span>يلزم تسجيل الدخول أو إنشاء حساب جديد لإتمام الطلب 🔒</span>
                </div>
                <p className="text-xs text-amber-900/80 leading-relaxed font-bold">
                  عفواً، يتوجب عليك تسجيل الدخول بحسابك أولاً حتى تتمكن من إتمام الطلب ومتابعة حالته.
                </p>
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="w-full py-2.5 px-4 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>تسجيل الدخول / إنشاء حساب جديد الآن 👤</span>
                </button>
              </div>
            )}

            <h2 className="font-headline-md text-lg text-primary font-bold flex items-center gap-2">
              <UserIcon className="w-5 h-5 text-primary" />
              بيانات المستلم والتوصيل
            </h2>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-secondary mb-1">الاسم الكامل *</label>
                <div className="relative">
                  <UserIcon className="absolute right-4 top-3.5 w-4 h-4 text-secondary/60 pointer-events-none" />
                  <input
                    type="text"
                    id="checkout-name-input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثال: أحمد محمد"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-2.5 pr-10 pl-4 focus:ring-1 focus:ring-primary focus:border-primary text-right font-body-md text-sm text-on-surface placeholder:text-secondary/50 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-secondary mb-1">رقم التليفون *</label>
                <div className="relative">
                  <Phone className="absolute right-4 top-3.5 w-4 h-4 text-secondary/60 pointer-events-none" />
                  <input
                    type="tel"
                    id="checkout-phone-input"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="مثال: 01xxxxxxxxx"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-2.5 pr-10 pl-4 focus:ring-1 focus:ring-primary focus:border-primary text-right font-body-md text-sm text-on-surface placeholder:text-secondary/50 transition-all"
                    required
                  />
                </div>
              </div>

              {deliveryType === 'home' ? (
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">عنوان التوصيل بالتفصيل *</label>
                  <div className="relative">
                    <MapPin className="absolute right-4 top-3.5 w-4 h-4 text-secondary/60 pointer-events-none" />
                    <textarea
                      id="checkout-address-input"
                      value={customAddress}
                      onChange={(e) => setCustomAddress(e.target.value)}
                      placeholder="مثال: بورسعيد، شارع طرح البحر، عمارة 5، الدور الثالث، شقة 10"
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-2.5 pr-10 pl-4 focus:ring-1 focus:ring-primary focus:border-primary text-right font-body-md text-sm text-on-surface placeholder:text-secondary/50 transition-all min-h-[80px] resize-none"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container-highest/40 p-4 rounded-2xl border border-dashed border-outline/30 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-xs text-on-surface">استلام من الفرع الرئيسي</p>
                    <p className="text-[10px] text-secondary font-semibold">طرح البحر - مجمع المطاعم - فرع بورسعيد</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Promo Code Input */}
          <section className="space-y-3">
            <div className="relative">
              <Ticket className="absolute right-4 top-3.5 w-5 h-5 text-secondary/60 pointer-events-none" />
              <input
                id="promo-input"
                type="text"
                value={promoCodeInput}
                onChange={(e) => {
                  setPromoCodeInput(e.target.value);
                  setPromoError('');
                }}
                disabled={promoApplied}
                placeholder={promoApplied ? `كود مفعل: ${appliedPromoInfo?.code}` : 'هل لديك كود خصم ترويجي؟ أدخله هنا'}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl py-3.5 pr-11 pl-28 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-right font-body-md text-sm text-on-surface uppercase placeholder:text-secondary/50 placeholder:normal-case disabled:bg-emerald-50 disabled:text-emerald-900 disabled:border-emerald-300 font-extrabold"
              />
              {promoApplied ? (
                <button
                  onClick={handleRemovePromo}
                  className="absolute left-2 top-2 bottom-2 px-4 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-bold text-xs transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>إلغاء الخصم</span>
                </button>
              ) : (
                <button
                  id="apply-promo-btn"
                  onClick={() => handleApplyPromo()}
                  className="absolute left-2 top-2 bottom-2 px-6 bg-primary text-white rounded-xl font-bold text-xs hover:opacity-90 transition-all active:scale-95 cursor-pointer shadow-xs"
                >
                  تطبيق
                </button>
              )}
            </div>

            {/* Error Message */}
            {promoError && <p className="text-xs text-red-600 font-bold pr-3">{promoError}</p>}

            {/* Success Applied Banner */}
            {promoApplied && appliedPromoInfo && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between text-xs text-emerald-800 font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>تم تطبيق كود الخصم ({appliedPromoInfo.code}) - {appliedPromoInfo.label}</span>
                </div>
                <span className="font-mono font-black text-emerald-700">-{discountAmount.toFixed(2)} ج.م</span>
              </div>
            )}
          </section>

          {/* Order Summary & Confirmation Floating Bar */}
          <div className="fixed bottom-20 left-0 right-0 glass-summary z-40 p-5 border-t border-outline-variant/20 rounded-t-3xl shadow-[0_-10px_40px_rgba(111,36,10,0.06)] max-w-lg mx-auto">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-secondary text-xs font-semibold">
                  <span>المجموع الفرعي</span>
                  <span className="font-bold">{subtotal.toFixed(2)} ج.م</span>
                </div>
                
                <div className="flex justify-between text-secondary text-xs font-semibold">
                  <span>رسوم التوصيل</span>
                  <span className="font-bold">
                    {deliveryFee > 0 ? `${deliveryFee.toFixed(2)} ج.م` : 'مجاناً'}
                  </span>
                </div>

                {promoApplied && discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 text-xs font-semibold bg-emerald-50 p-2 rounded-xl border border-emerald-200">
                    <span>خصم كود الترويج ({appliedPromoInfo?.code})</span>
                    <span className="font-mono font-black">- {discountAmount.toFixed(2)} ج.م</span>
                  </div>
                )}

                <div className="flex justify-between text-primary pt-2 border-t border-outline-variant/30 mt-1">
                  <span className="font-headline-md text-base font-bold">المجموع الكلي</span>
                  <span className="font-headline-md text-lg font-extrabold">{total.toFixed(2)} ج.م</span>
                </div>
              </div>

              <button
                id="checkout-confirm-btn"
                onClick={handleConfirmOrder}
                className={`w-full py-4 rounded-full font-bold text-sm shadow-lg hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  currentUser
                    ? 'bg-primary text-white'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {currentUser ? (
                  <>
                    <span>تأكيد الطلب والشراء</span>
                    <CheckCircle className="w-5 h-5 stroke-[2.5]" />
                  </>
                ) : (
                  <>
                    <span>تسجيل الدخول أولاً لإتمام الطلب 🔒</span>
                    <UserIcon className="w-5 h-5 stroke-[2.5]" />
                  </>
                )}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
