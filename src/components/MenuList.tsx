import { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { INITIAL_MENU_ITEMS, CATEGORIES } from '../data';
import { Search, Plus, Star, Leaf, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface MenuListProps {
  menuItems: MenuItem[];
  categories: string[];
  onSelectItem: (item: MenuItem) => void;
  onAddToCartDirectly: (item: MenuItem, selectedSideDish?: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function MenuList({ menuItems, categories, onSelectItem, onAddToCartDirectly, cartCount, onOpenCart }: MenuListProps) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || 'مشروبات ساخنة');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Keep track of selected side dishes per menu item ID (multi-selection)
  const [selectedSideDishes, setSelectedSideDishes] = useState<Record<string, string[]>>({});

  // Set default selected side dish for items that have options
  useEffect(() => {
    const initial: Record<string, string[]> = {};
    menuItems.forEach(item => {
      if (item.sideDishOptions && item.sideDishOptions.length > 0) {
        initial[item.id] = [item.sideDishOptions[0]];
      }
    });
    setSelectedSideDishes(prev => ({ ...initial, ...prev }));
  }, [menuItems]);

  // Keep selected category synced if the categories array changes
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(selectedCategory)) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-24">
      {/* Dynamic Search Bar */}
      <div className="relative">
        <Search className="absolute right-4 top-3.5 w-5 h-5 text-secondary/60 pointer-events-none" />
        <input
          id="search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ابحث عن مشروبك أو وجبتك المفضلة..."
          className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-3 pr-11 pl-4 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-right font-body-md text-sm text-on-surface placeholder:text-secondary/50 shadow-sm"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute left-4 top-3 text-secondary text-xs hover:text-primary transition-colors font-bold"
          >
            مسح
          </button>
        )}
      </div>

      {/* Categories Slider */}
      <section className="overflow-x-auto whitespace-nowrap no-scrollbar -mx-5 px-5 py-1">
        <div className="flex gap-3">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`category-btn-${cat}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSearchQuery(''); // Clear search when switching categories
                }}
                className={`px-6 py-2.5 rounded-full font-bold text-xs transition-all duration-300 shadow-sm ${
                  isActive
                    ? 'bg-primary text-white scale-105 shadow-[0_4px_12px_rgba(111,36,10,0.2)]'
                    : 'bg-surface-container border border-outline-variant/30 text-secondary hover:bg-secondary-container/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Menu List */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={item.id}
              id={`menu-item-${item.id}`}
              className="flex items-center p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20 transition-all active:scale-[0.98] shadow-[0_2px_8px_rgba(142,58,31,0.03)] hover:shadow-md hover:border-outline-variant/40"
            >
              {/* Image with details trigger */}
              <div 
                onClick={() => onSelectItem(item)}
                className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ml-4 border-2 border-primary-fixed cursor-pointer relative group"
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  src={item.image}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                />
                {item.rating && (
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-bold flex items-center justify-center py-0.5 gap-0.5">
                    <Star className="w-2 h-2 fill-yellow-500 stroke-none" />
                    <span>{item.rating}</span>
                  </div>
                )}
              </div>

              {/* Item Info with details trigger */}
              <div 
                onClick={() => onSelectItem(item)}
                className="flex-grow cursor-pointer text-right space-y-1"
              >
                <div className="flex justify-between items-start gap-1">
                  <h3 className="font-headline-md text-base text-on-surface font-bold leading-tight group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-primary font-bold text-sm whitespace-nowrap">
                    {item.price.toFixed(2)} ج.م
                  </span>
                </div>
                
                <p className="text-on-surface-variant font-body-md text-xs leading-relaxed line-clamp-2">
                  {item.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.organic && (
                    <span className="px-1.5 py-0.5 rounded-full bg-green-50 text-green-700 text-[9px] font-semibold flex items-center gap-0.5">
                      <Leaf className="w-2 h-2 text-green-700" />
                      عضوي
                    </span>
                  )}
                  {item.popular && (
                    <span className="px-1.5 py-0.5 rounded-full bg-orange-50 text-orange-700 text-[9px] font-semibold flex items-center gap-0.5">
                      <Flame className="w-2 h-2 text-orange-700" />
                      شائع
                    </span>
                  )}
                </div>

                {/* Direct Side Dishes Selection */}
                {item.sideDishOptions && item.sideDishOptions.length > 0 && (
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="pt-2 mt-2 border-t border-dashed border-outline-variant/20 space-y-1 text-right"
                  >
                    <span className="text-[10px] font-bold text-secondary">الأطباق الجانبية (اختر ما تريد):</span>
                    <div className="flex flex-wrap gap-1">
                      {item.sideDishOptions.map((opt) => {
                        const currentSelections = selectedSideDishes[item.id] || [];
                        const isSelected = currentSelections.includes(opt);
                        return (
                          <button
                            key={opt}
                            onClick={() => {
                              const updated = isSelected 
                                ? currentSelections.filter(x => x !== opt)
                                : [...currentSelections, opt];
                              setSelectedSideDishes(prev => ({ ...prev, [item.id]: updated }));
                            }}
                            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all border ${
                              isSelected
                                ? 'bg-primary/10 text-primary border-primary'
                                : 'bg-surface-container border-outline-variant/30 text-secondary hover:border-primary/40'
                            }`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Add Button */}
              <button
                id={`add-btn-${item.id}`}
                onClick={(e) => {
                  e.stopPropagation();
                  const currentSelections = selectedSideDishes[item.id] || [];
                  onAddToCartDirectly(item, currentSelections.join('، '));
                }}
                className="mr-3 w-9 h-9 rounded-full bg-primary-container text-on-primary-container hover:bg-primary hover:text-white flex items-center justify-center transition-all shadow-sm active:scale-90"
                title="إضافة سريعة إلى السلة"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </button>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12 bg-surface-container-low rounded-2xl border border-dashed border-outline-variant/40">
            <Sparkles className="w-8 h-8 text-secondary/40 mx-auto mb-2" />
            <p className="text-secondary text-sm">عذراً، لم نجد أصنافاً مطابقة لطلبك.</p>
            <button 
              onClick={() => { setSelectedCategory('مشروبات ساخنة'); setSearchQuery(''); }}
              className="text-primary font-bold text-xs mt-3 underline"
            >
              عرض المشروبات الساخنة
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
