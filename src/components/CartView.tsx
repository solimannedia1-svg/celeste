import { useState, useEffect } from 'react';
import { CartItem, Order, User } from '../types';
import { Trash2, Plus, Minus, Store, Truck, MapPin, Ticket, CheckCircle, ShoppingBag, User as UserIcon, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartViewProps {
  cartItems: CartItem[];
  currentUser?: User | null;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (order: Order) => void;
}

export default function CartView({ cartItems, currentUser, onUpdateQuantity, onRemoveItem, onCheckout }: CartViewProps) {
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'home'>('pickup');
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [customAddress, setCustomAddress] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [discountPercent, setDiscountPercent] = useState(0);
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
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal + deliveryFee - discountAmount;

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'CELESTE10') {
      setDiscountPercent(10);
      setPromoApplied(true);
    } else if (code === 'FREE') {
      setDiscountPercent(20);
      setPromoApplied(true);
    } else if (code === '') {
      setPromoError('الرجاء إدخال الرمز الترويجي أولاً');
    } else {
      setPromoError('رمز ترويجي غير صالح');
    }
  };

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) return;

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
          <section className="space-y-2">
            <div className="relative">
              <Ticket className="absolute right-4 top-3.5 w-5 h-5 text-secondary/60 pointer-events-none" />
              <input
                id="promo-input"
                type="text"
                value={promoCode}
                onChange={(e) => {
                  setPromoCode(e.target.value);
                  setPromoError('');
                }}
                disabled={promoApplied}
                placeholder={promoApplied ? 'تم تطبيق الرمز الترويجي بنجاح' : 'هل لديك رمز ترويجي؟ جرب CELESTE10'}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-3.5 pr-11 pl-28 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-right font-body-md text-sm text-on-surface placeholder:text-secondary/50 disabled:bg-green-50 disabled:text-green-800 disabled:border-green-300"
              />
              <button
                id="apply-promo-btn"
                onClick={handleApplyPromo}
                disabled={promoApplied}
                className="absolute left-2 top-2 bottom-2 px-6 bg-primary text-white rounded-full font-bold text-xs hover:opacity-90 disabled:bg-green-600 disabled:text-white transition-all active:scale-95"
              >
                {promoApplied ? 'مطبّق' : 'تطبيق'}
              </button>
            </div>
            {promoError && <p className="text-xs text-red-600 font-bold pr-3">{promoError}</p>}
            {promoApplied && (
              <p className="text-xs text-green-700 font-bold pr-3 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                تم تطبيق خصم {discountPercent}% بنجاح!
              </p>
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

                {promoApplied && (
                  <div className="flex justify-between text-green-700 text-xs font-semibold bg-green-50 p-2 rounded-lg">
                    <span>خصم الرمز الترويجي ({discountPercent}%)</span>
                    <span className="font-bold">- {discountAmount.toFixed(2)} ج.م</span>
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
                className="w-full bg-primary text-white py-4 rounded-full font-bold text-sm shadow-lg hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>تأكيد الطلب وشراء</span>
                <CheckCircle className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
