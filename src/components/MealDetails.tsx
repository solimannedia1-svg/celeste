import { useState } from 'react';
import { MenuItem, CartItem } from '../types';
import { ArrowRight, Heart, Star, Plus, Minus, ShoppingBag, Check, CheckSquare } from 'lucide-react';
import { motion } from 'motion/react';

interface MealDetailsProps {
  item: MenuItem;
  onBack: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function MealDetails({ item, onBack, onAddToCart }: MealDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [breadType, setBreadType] = useState<'brioche' | 'oat'>('brioche');
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Helper function to check if a side dish is pasta
  const isPastaSideDish = (name: string): boolean => {
    if (!name) return false;
    const normalized = name.trim().toLowerCase();
    return (
      normalized.includes('مكر') ||   // matches مكرونة, مكرونه, مكروة, مكروه, مكروا, مكروني
      normalized.includes('باستا') ||
      normalized.includes('pasta') ||
      normalized.includes('spaghe') ||
      normalized.includes('macaro') ||
      normalized.includes('نجرسكو') ||
      normalized.includes('بشاميل') ||
      normalized.includes('الفريدو') ||
      normalized.includes('صوص')     // matches وايت صوص, ريد صوص
    );
  };

  // Custom side dish state (multiple choices allowed: 1 pasta OR up to 2 non-pasta dishes)
  const [selectedSideDishes, setSelectedSideDishes] = useState<string[]>(
    item.sideDishOptions && item.sideDishOptions.length > 0 ? [item.sideDishOptions[0]] : []
  );

  const handleSideDishToggle = (option: string) => {
    const isSelected = selectedSideDishes.includes(option);
    const isPasta = isPastaSideDish(option);

    if (isSelected) {
      setSelectedSideDishes(prev => prev.filter(x => x !== option));
    } else {
      if (isPasta) {
        // Pasta is exclusive: replaces all current choices with this single pasta option
        setSelectedSideDishes([option]);
      } else {
        // Non-pasta dish
        const hasPasta = selectedSideDishes.some(x => isPastaSideDish(x));
        if (hasPasta) {
          // Replace pasta with this non-pasta choice
          setSelectedSideDishes([option]);
        } else {
          // Currently selecting non-pasta dishes: max 2 allowed
          if (selectedSideDishes.length >= 2) {
            // Replace oldest non-pasta dish to maintain max 2
            setSelectedSideDishes(prev => [prev[1], option]);
          } else {
            setSelectedSideDishes(prev => [...prev, option]);
          }
        }
      }
    }
  };

  // Custom extras selection
  const [selectedExtras, setSelectedExtras] = useState<{ id: string; name: string; price: number }[]>([]);

  const extrasOptions = [
    { id: 'truffle_sauce', name: 'صوص الترافل الخاص', price: 8.0 },
    { id: 'extra_cheese', name: 'شريحة جبن إضافية', price: 5.0 }
  ];

  const handleToggleExtra = (extra: { id: string; name: string; price: number }) => {
    const isSelected = selectedExtras.some(e => e.id === extra.id);
    if (isSelected) {
      setSelectedExtras(selectedExtras.filter(e => e.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddClick = () => {
    // Generate a unique cart entry ID based on item id and selected customizations
    const extrasIds = selectedExtras.map(e => e.id).sort().join('-');
    const joinedSideDishes = selectedSideDishes.join('، ');
    const sideDishHash = joinedSideDishes ? encodeURIComponent(joinedSideDishes) : '';
    const cartItemId = `${item.id}-${breadType}-${extrasIds}-${sideDishHash}`;

    const cartItem: CartItem = {
      id: cartItemId,
      menuItem: item,
      quantity,
      breadType: item.category === 'مشروبات ساخنة' ? undefined : breadType, // Only food has bread
      extras: selectedExtras,
      selectedSideDish: joinedSideDishes || undefined,
    };

    onAddToCart(cartItem);
  };

  // Calculate customized unit price
  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const singleItemPrice = item.price + extrasTotal;
  const totalPrice = singleItemPrice * quantity;

  return (
    <div className="space-y-6 pb-28">
      {/* Top Header */}
      <div className="flex justify-between items-center">
        <button
          id="back-to-menu-btn"
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high text-primary hover:opacity-80 transition-opacity active:scale-95"
          title="رجوع للقائمة"
        >
          {/* Points RIGHT in Arabic RTL for back */}
          <ArrowRight className="w-5 h-5" />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-primary/60 font-label-lg">سيلست</span>
          <h1 className="font-headline-lg-mobile text-lg text-primary font-bold">تفاصيل الوجبة</h1>
        </div>
        <button
          id="toggle-favorite-btn"
          onClick={() => setIsFavorite(!isFavorite)}
          className={`w-10 h-10 flex items-center justify-center rounded-full bg-surface-container-high transition-colors active:scale-95 ${
            isFavorite ? 'text-red-500 bg-red-50' : 'text-primary'
          }`}
          title="أضف للمفضلة"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 stroke-red-500' : ''}`} />
        </button>
      </div>

      {/* Hero Image Section */}
      <section className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_20px_40px_rgba(142,58,31,0.15)] bg-surface-container border border-outline-variant/20">
        <img
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
        />
        {item.rating && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
            <Star className="w-4 h-4 fill-yellow-600 stroke-yellow-600" />
            <span className="font-label-lg text-sm text-on-surface font-bold">{item.rating}</span>
          </div>
        )}
      </section>

      {/* Product Identity */}
      <section className="flex justify-between items-start gap-4">
        <div className="space-y-1.5 text-right">
          <h2 className="font-headline-lg-mobile text-2xl text-on-surface font-bold tracking-tight">
            {item.name}
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {item.organic && (
              <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-[10px] font-bold">
                عضوي
              </span>
            )}
            <span className="px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 text-[10px] font-bold">
              الأكثر طلباً
            </span>
          </div>
        </div>
        <div className="text-left whitespace-nowrap">
          <span className="font-headline-md text-2xl text-primary font-bold">
            {item.price.toFixed(2)} ج.م
          </span>
        </div>
      </section>

      {/* Description */}
      <section className="text-right space-y-1 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/10">
        <h3 className="font-label-lg text-xs text-secondary font-bold">عن الوجبة في سيلست</h3>
        <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
          {item.description}
        </p>
      </section>

      {/* Side Dish Selection Section */}
      {item.sideDishOptions && item.sideDishOptions.length > 0 && (
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            {selectedSideDishes.some(x => isPastaSideDish(x)) ? (
              <span className="text-[10px] text-amber-800 font-bold bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-200">
                المكرونة: خيار 1 فقط
              </span>
            ) : selectedSideDishes.length === 2 ? (
              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200">
                تم اختيار 2 من 2 طبق جانبي
              </span>
            ) : selectedSideDishes.length === 1 ? (
              <span className="text-[10px] text-blue-800 font-bold bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
                تم اختيار 1 من 2 أطباق جانبية
              </span>
            ) : (
              <span className="text-[10px] text-slate-600 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
                طبقين جانبيين أو طبق مكرونة واحد
              </span>
            )}
            <h3 className="font-label-lg text-sm text-secondary font-bold text-right">الأطباق الجانبية المفضلة</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {item.sideDishOptions.map((option) => {
              const isSelected = selectedSideDishes.includes(option);
              const isPastaOption = isPastaSideDish(option);
              return (
                <button
                  key={option}
                  id={`side-dish-${option}`}
                  onClick={() => handleSideDishToggle(option)}
                  className={`flex items-center justify-between p-3.5 rounded-xl border-2 transition-all text-right relative ${
                    isSelected
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-outline-variant/40 hover:border-primary/50 bg-white'
                  }`}
                >
                  <div className="flex flex-col text-right">
                    <span className={`font-bold text-sm ${isSelected ? 'text-primary' : 'text-on-surface-variant'}`}>
                      {option}
                    </span>
                    {isPastaOption && (
                      <span className="text-[9px] font-semibold text-amber-700">
                        (مكرونة - خيار واحد فقط)
                      </span>
                    )}
                  </div>
                  <span className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all shrink-0 ${
                    isSelected ? 'border-primary bg-primary' : 'border-outline-variant'
                  }`}>
                    {isSelected && <Check className="w-3 h-3 text-white" />}
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Customization Options (Only for non-drinks, e.g. Burger) */}
      {item.category !== 'مشروبات ساخنة' && (
        <section className="space-y-6">
          {/* Bread Selection */}
          <div className="space-y-3">
            <h3 className="font-label-lg text-sm text-secondary font-bold text-right">نوع الخبز</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                id="bread-brioche-btn"
                onClick={() => setBreadType('brioche')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-right ${
                  breadType === 'brioche'
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant/40 hover:border-primary/50'
                }`}
              >
                <span className={`font-bold text-sm ${breadType === 'brioche' ? 'text-primary' : 'text-on-surface-variant'}`}>
                  خبز البريوش
                </span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  breadType === 'brioche' ? 'border-primary bg-primary' : 'border-outline-variant'
                }`}>
                  {breadType === 'brioche' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </span>
              </button>

              <button
                id="bread-oat-btn"
                onClick={() => setBreadType('oat')}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all text-right ${
                  breadType === 'oat'
                    ? 'border-primary bg-primary/5'
                    : 'border-outline-variant/40 hover:border-primary/50'
                }`}
              >
                <span className={`font-bold text-sm ${breadType === 'oat' ? 'text-primary' : 'text-on-surface-variant'}`}>
                  خبز الشوفان
                </span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  breadType === 'oat' ? 'border-primary bg-primary' : 'border-outline-variant'
                }`}>
                  {breadType === 'oat' && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                </span>
              </button>
            </div>
          </div>

          {/* Extra Toppings */}
          <div className="space-y-3">
            <h3 className="font-label-lg text-sm text-secondary font-bold text-right">إضافات مميزة من سيلست</h3>
            <div className="space-y-2">
              {extrasOptions.map((extra) => {
                const isSelected = selectedExtras.some(e => e.id === extra.id);
                return (
                  <button
                    key={extra.id}
                    id={`extra-option-${extra.id}`}
                    onClick={() => handleToggleExtra(extra)}
                    className="w-full flex items-center justify-between p-4 bg-surface-container hover:bg-surface-container-high rounded-xl transition-all border border-outline-variant/10 text-right active:scale-[0.99]"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded flex items-center justify-center border transition-all ${
                        isSelected ? 'border-primary bg-primary text-white' : 'border-outline-variant bg-white'
                      }`}>
                        {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-on-surface">{extra.name}</p>
                        <p className="text-xs text-on-surface-variant font-semibold">+{extra.price.toFixed(2)} ج.م</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Floating Bottom Action Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-[60] bg-surface/90 backdrop-blur-xl px-5 pb-8 pt-3 flex items-center gap-4 shadow-[0_-10px_30px_rgba(111,36,10,0.08)] max-w-lg mx-auto border-t border-outline-variant/20 rounded-t-2xl">
        {/* Quantity Selector */}
        <div className="flex items-center bg-secondary-container rounded-full p-1 gap-2 border border-outline-variant/20 shadow-inner">
          <button
            id="qty-decrement-btn"
            onClick={handleDecrement}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-primary shadow-sm hover:opacity-85 active:scale-90 transition-all"
          >
            <Minus className="w-4 h-4 stroke-[2.5]" />
          </button>
          <span 
            id="qty-display"
            className="font-headline-md text-lg min-w-[2.5ch] text-center text-on-surface font-bold"
          >
            {quantity}
          </span>
          <button
            id="qty-increment-btn"
            onClick={handleIncrement}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white shadow-md hover:opacity-90 active:scale-90 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          id="add-customized-to-cart-btn"
          onClick={handleAddClick}
          className="flex-1 bg-primary text-white h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-lg hover:opacity-95 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>إضافة للسلة • {totalPrice.toFixed(2)} ج.م</span>
        </button>
      </footer>
    </div>
  );
}
