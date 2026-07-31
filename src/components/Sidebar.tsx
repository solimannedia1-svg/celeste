import React from 'react';
import { motion } from 'motion/react';
import { 
  X, 
  Coffee, 
  ShoppingBag, 
  MapPin, 
  Info,
  Calendar,
  Sparkles,
  User as UserIcon,
  LogOut,
  ChevronLeft,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { Tab, User, RestaurantInfo } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  onOpenWelcomeModal?: () => void;
  currentUser?: User | null;
  restaurantInfo?: RestaurantInfo;
  onOpenAuth?: () => void;
  onLogout?: () => void;
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  activeTab, 
  setActiveTab, 
  onOpenWelcomeModal,
  currentUser,
  restaurantInfo,
  onOpenAuth,
  onLogout
}: SidebarProps) {
  if (!isOpen) return null;

  const menuItems = [
    { id: 'menu', label: 'قائمة الطعام والقهوة', icon: Coffee },
    { id: 'home', label: 'حجز طاولات سيلست', icon: Calendar },
    { id: 'cart', label: 'سلة المشتريات والطلب', icon: ShoppingBag },
    { id: 'track', label: 'تتبع حالة طلباتك وحجوزاتك', icon: MapPin },
  ];

  const handleNav = (tabId: string) => {
    setActiveTab(tabId as Tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" dir="rtl">
      {/* Backdrop overlay with blur */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Container */}
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-xs bg-surface-container-lowest h-full shadow-2xl flex flex-col z-10 border-l border-outline-variant/15"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-outline-variant/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
            <h2 className="text-xl font-bold text-primary tracking-wide">قائمة Celeste</h2>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-surface-container-high text-on-surface hover:bg-surface-container-highest transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Account Banner Section inside Drawer */}
        <div className="p-4 border-b border-outline-variant/10">
          {currentUser ? (
            <div className="bg-primary/10 p-3.5 rounded-2xl border border-primary/20 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="overflow-hidden">
                  <h4 className="font-bold text-sm text-primary truncate leading-tight">{currentUser.name}</h4>
                  <span className="text-[11px] text-secondary font-mono block mt-0.5">{currentUser.phone}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-primary/10">
                <button
                  onClick={() => {
                    onClose();
                    if (onOpenAuth) onOpenAuth();
                  }}
                  className="flex-1 py-2 px-3 rounded-xl bg-primary text-white text-xs font-bold transition-all hover:bg-primary/90 flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>حسابي وطلباتي</span>
                </button>
                {onLogout && (
                  <button
                    onClick={() => {
                      onLogout();
                      onClose();
                    }}
                    className="p-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                    title="تسجيل الخروج"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                if (onOpenAuth) onOpenAuth();
              }}
              className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-primary to-primary/85 text-white shadow-md flex items-center justify-between transition-all hover:opacity-95 active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 text-white flex items-center justify-center shrink-0">
                  <UserIcon className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <h4 className="font-bold text-sm leading-tight">تسجيل الدخول / حساب جديد</h4>
                  <p className="text-[10px] text-white/80 mt-0.5">تابع كافة طلباتك وحجوزاتك بكل سهولة</p>
                </div>
              </div>
              <ChevronLeft className="w-5 h-5 text-white/80 shrink-0" />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <div className="text-xs font-bold text-secondary/50 px-3 mb-2 uppercase tracking-wider">التصفح السريع</div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  isActive 
                    ? 'bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]' 
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-primary'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Dedicated Account Button in Nav items list */}
          <button
            onClick={() => {
              onClose();
              if (onOpenAuth) onOpenAuth();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          >
            <UserIcon className="w-5 h-5 text-primary" />
            <span>{currentUser ? 'تفاصيل حسابي والتسجيل' : 'تسجيل الدخول / حساب جديد'}</span>
          </button>

          {/* Information Section */}
          <div className="pt-5 border-t border-outline-variant/10 mt-5 space-y-2">
            <div className="text-xs font-bold text-secondary/50 px-3 mb-2 uppercase tracking-wider">معلومات الكافيه</div>
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 space-y-2.5">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant font-bold">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{restaurantInfo?.address || "طرح البحر - مجمع المطاعم - فرع بورسعيد"}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant font-bold">
                <Info className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>ساعات العمل: {restaurantInfo?.workingHours || "من 8:00 ص إلى 4:00 بعد منتصف الليل"}</span>
              </div>
              {restaurantInfo?.phone && (
                <div className="flex items-center gap-2 text-xs text-on-surface-variant font-bold">
                  <Phone className="w-3.5 h-3.5 text-primary shrink-0" />
                  <span>تليفون التواصل: <a href={`tel:${restaurantInfo.phone}`} className="underline font-mono">{restaurantInfo.phone}</a></span>
                </div>
              )}
              {onOpenWelcomeModal && (
                <div className="pt-1 space-y-1.5">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenWelcomeModal();
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-primary/10 text-primary hover:bg-primary/20 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>عرض الرسالة الترحيبية</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </motion.div>
    </div>
  );
}

