import { Tab } from '../types';
import { Home, Utensils, ShoppingBag, Truck } from 'lucide-react';

interface BottomNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  hasActiveOrder: boolean;
  cartCount: number;
}

export default function BottomNav({ activeTab, setActiveTab, hasActiveOrder, cartCount }: BottomNavProps) {
  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50 flex justify-around items-center px-6 py-2.5 bg-surface-container-low/95 backdrop-blur-lg shadow-[0_8px_32px_rgba(111,36,10,0.18)] rounded-[24px] border border-outline-variant/25 max-w-xl mx-auto">
      {/* Home tab */}
      <button
        id="nav-home"
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 min-w-[65px] ${
          activeTab === 'home'
            ? 'bg-primary/10 text-primary font-bold scale-105'
            : 'text-secondary hover:bg-secondary-container/50'
        }`}
      >
        <Home className={`w-5.5 h-5.5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-1 font-label-lg">الرئيسية</span>
      </button>

      {/* Menu tab */}
      <button
        id="nav-menu"
        onClick={() => setActiveTab('menu')}
        className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 min-w-[65px] ${
          activeTab === 'menu'
            ? 'bg-primary/10 text-primary font-bold scale-105'
            : 'text-secondary hover:bg-secondary-container/50'
        }`}
      >
        <Utensils className={`w-5.5 h-5.5 ${activeTab === 'menu' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-1 font-label-lg">القائمة</span>
      </button>

      {/* Cart / Orders tab */}
      <button
        id="nav-cart"
        onClick={() => setActiveTab('cart')}
        className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 min-w-[65px] ${
          activeTab === 'cart'
            ? 'bg-primary text-white font-bold scale-105 rounded-full px-4'
            : 'text-secondary hover:bg-secondary-container/50'
        }`}
      >
        <ShoppingBag className={`w-5.5 h-5.5 ${activeTab === 'cart' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
        <span className="text-[10px] mt-1 font-label-lg">السلة</span>
        {cartCount > 0 && activeTab !== 'cart' && (
          <span className="absolute top-1.5 right-2 bg-primary text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
      </button>

      {/* Active Order Tracking tab (Only shown if there is an active order) */}
      {hasActiveOrder && (
        <button
          id="nav-track"
          onClick={() => setActiveTab('track')}
          className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-300 min-w-[65px] ${
            activeTab === 'track'
              ? 'bg-primary/10 text-primary font-bold scale-105'
              : 'text-primary/70 animate-pulse hover:bg-secondary-container/50'
          }`}
        >
          <Truck className={`w-5.5 h-5.5 ${activeTab === 'track' ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
          <span className="text-[10px] mt-1 font-label-lg font-bold">التتبع</span>
          <span className="absolute top-1.5 right-3 bg-green-600 rounded-full w-2 h-2"></span>
        </button>
      )}
    </nav>
  );
}
