import React, { useState } from 'react';
import { PromoCode } from '../types';
import { Ticket, Plus, Edit, Trash2, Power, CheckCircle, AlertCircle, Calendar, DollarSign, Percent, ArrowLeft, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PromoManagementProps {
  promoCodes: PromoCode[];
  onAddPromoCode: (promo: PromoCode) => void;
  onUpdatePromoCode: (promo: PromoCode) => void;
  onDeletePromoCode: (promoId: string) => void;
  onTogglePromoCodeStatus: (promoId: string) => void;
}

export default function PromoManagement({
  promoCodes,
  onAddPromoCode,
  onUpdatePromoCode,
  onDeletePromoCode,
  onTogglePromoCodeStatus
}: PromoManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoCode | null>(null);
  const [deletingPromo, setDeletingPromo] = useState<PromoCode | null>(null);

  // Form states
  const [code, setCode] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState<number | ''>('');
  const [minOrderValue, setMinOrderValue] = useState<number | ''>('');
  const [maxDiscount, setMaxDiscount] = useState<number | ''>('');
  const [maxUses, setMaxUses] = useState<number | ''>('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  const openAddModal = () => {
    setEditingPromo(null);
    setCode('');
    setType('percentage');
    setValue('');
    setMinOrderValue('');
    setMaxDiscount('');
    setMaxUses('');
    setExpiryDate('');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (promo: PromoCode) => {
    setEditingPromo(promo);
    setCode(promo.code);
    setType(promo.type);
    setValue(promo.value);
    setMinOrderValue(promo.minOrderValue || '');
    setMaxDiscount(promo.maxDiscount || '');
    setMaxUses(promo.maxUses || '');
    setExpiryDate(promo.expiryDate || '');
    setIsActive(promo.isActive);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || value === '' || Number(value) <= 0) {
      alert('الرجاء إدخال كود الخصم والقيمة بشكل صحيح.');
      return;
    }

    const cleanedCode = code.trim().toUpperCase();

    if (editingPromo) {
      const updated: PromoCode = {
        ...editingPromo,
        code: cleanedCode,
        type,
        value: Number(value),
        minOrderValue: minOrderValue !== '' ? Number(minOrderValue) : undefined,
        maxDiscount: maxDiscount !== '' ? Number(maxDiscount) : undefined,
        maxUses: maxUses !== '' ? Number(maxUses) : undefined,
        expiryDate: expiryDate || undefined,
        isActive
      };
      onUpdatePromoCode(updated);
    } else {
      const newPromo: PromoCode = {
        id: `promo_${Date.now()}`,
        code: cleanedCode,
        type,
        value: Number(value),
        minOrderValue: minOrderValue !== '' ? Number(minOrderValue) : undefined,
        maxDiscount: maxDiscount !== '' ? Number(maxDiscount) : undefined,
        maxUses: maxUses !== '' ? Number(maxUses) : undefined,
        expiryDate: expiryDate || undefined,
        isActive,
        usageCount: 0
      };
      onAddPromoCode(newPromo);
    }

    setIsModalOpen(false);
  };

  const activeCount = promoCodes.filter(p => p.isActive).length;
  const totalUsages = promoCodes.reduce((sum, p) => sum + (p.usageCount || 0), 0);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Title & Action Header */}
      <div className="bg-surface-container-low p-6 rounded-3xl border border-outline-variant/20 shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Ticket className="w-6 h-6" />
            <h2>إدارة أكواد الخصم والقسائم الترويجية</h2>
          </div>
          <p className="text-secondary text-xs mt-1">
            إنشاء، تفعيل، أو إيقاف أكواد الخصم للعملاء وتتبع عدد مرات استخدامها
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary text-white px-5 py-3 rounded-2xl font-bold text-xs hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>إنشاء كود خصم جديد</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
            <Tag className="w-6 h-6" />
          </div>
          <div>
            <p className="text-secondary text-xs font-semibold">إجمالي الكوبونات</p>
            <p className="font-headline-md text-xl font-black text-on-surface">{promoCodes.length}</p>
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
            <Power className="w-6 h-6" />
          </div>
          <div>
            <p className="text-secondary text-xs font-semibold">الكوبونات المفعّلة حالياً</p>
            <p className="font-headline-md text-xl font-black text-emerald-700">{activeCount}</p>
          </div>
        </div>

        <div className="bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-secondary text-xs font-semibold">إجمالي عمليات الاستخدام</p>
            <p className="font-headline-md text-xl font-black text-blue-700">{totalUsages}</p>
          </div>
        </div>
      </div>

      {/* Promo Codes List Grid */}
      {promoCodes.length === 0 ? (
        <div className="bg-surface-container-low p-12 rounded-3xl text-center border border-dashed border-outline-variant/40 space-y-3">
          <Ticket className="w-12 h-12 text-secondary/40 mx-auto" />
          <h3 className="font-bold text-on-surface">لا توجد أكواد خصم ترويجية حتى الآن</h3>
          <p className="text-secondary text-xs">قم بإنشاء كود الخصم الأول ليتمكن العملاء من استخدامه في سلة التسوق.</p>
          <button
            onClick={openAddModal}
            className="mt-2 bg-primary text-white px-4 py-2 rounded-xl text-xs font-bold hover:opacity-90 transition-all inline-flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة كود خصم</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {promoCodes.map((promo) => {
            const isExpired = promo.expiryDate && new Date(promo.expiryDate) < new Date(new Date().setHours(0, 0, 0, 0));
            const isMaxUsesReached = promo.maxUses !== undefined && promo.maxUses !== null && promo.maxUses > 0 && (promo.usageCount || 0) >= promo.maxUses;

            return (
              <div
                key={promo.id}
                className={`bg-surface-container-low p-5 rounded-3xl border transition-all space-y-4 relative ${
                  promo.isActive && !isExpired && !isMaxUsesReached
                    ? 'border-emerald-500/30 shadow-xs'
                    : 'border-outline-variant/20 opacity-75 bg-surface-container-high/30'
                }`}
              >
                {/* Header Badge */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-mono font-black text-lg text-primary tracking-wider uppercase bg-primary/10 px-3 py-1 rounded-xl inline-block border border-primary/20">
                      {promo.code}
                    </span>
                    {isMaxUsesReached && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-red-100 text-red-700 border border-red-200 block mt-1.5 w-fit">
                        منتهي الاستخدامات (اكسبيرد ⛔)
                      </span>
                    )}
                  </div>

                  {/* Toggle Active Switch */}
                  <button
                    onClick={() => onTogglePromoCodeStatus(promo.id)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                      promo.isActive
                        ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                    }`}
                  >
                    <Power className="w-3.5 h-3.5" />
                    <span>{promo.isActive ? 'مفعّل' : 'متوقف'}</span>
                  </button>
                </div>

                {/* Main Offer Value */}
                <div className="bg-surface-container p-3 rounded-2xl border border-outline-variant/15 flex items-center justify-between">
                  <span className="text-xs text-secondary font-semibold">نوع ومقدار الخصم:</span>
                  <span className="font-bold text-sm text-on-surface flex items-center gap-1">
                    {promo.type === 'percentage' ? (
                      <>
                        <Percent className="w-4 h-4 text-amber-600" />
                        <span>خصم {promo.value}%</span>
                      </>
                    ) : (
                      <>
                        <DollarSign className="w-4 h-4 text-emerald-600" />
                        <span>خصم {promo.value} ج.م</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Details list */}
                <div className="space-y-1.5 text-xs text-secondary font-medium">
                  {promo.minOrderValue && (
                    <div className="flex justify-between">
                      <span>الحد الأدنى للطلب:</span>
                      <span className="font-bold text-on-surface">{promo.minOrderValue} ج.م</span>
                    </div>
                  )}

                  {promo.type === 'percentage' && promo.maxDiscount && (
                    <div className="flex justify-between">
                      <span>الحد الأقصى للخصم:</span>
                      <span className="font-bold text-on-surface">{promo.maxDiscount} ج.م</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>تاريخ الانتهاء:</span>
                    <span className={`font-bold ${isExpired ? 'text-red-600' : 'text-on-surface'}`}>
                      {promo.expiryDate ? promo.expiryDate : 'بدون تاريخ انتهائي'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>الحد الأقصى للعملاء:</span>
                    <span className="font-bold text-on-surface">
                      {promo.maxUses ? `${promo.maxUses} عميل` : 'غير محدود'}
                    </span>
                  </div>

                  <div className="flex justify-between pt-1 border-t border-outline-variant/10">
                    <span>عدد الاستخدامات الفعلي:</span>
                    <span className={`font-bold ${isMaxUsesReached ? 'text-red-600 font-extrabold' : 'text-primary'}`}>
                      {promo.usageCount || 0} {promo.maxUses ? `من أصل ${promo.maxUses} عميل` : 'مرة'}
                    </span>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                  <button
                    onClick={() => openEditModal(promo)}
                    className="p-2 rounded-xl bg-surface-container hover:bg-primary/10 text-secondary hover:text-primary transition-all cursor-pointer"
                    title="تعديل الكود"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeletingPromo(promo)}
                    className="p-2 rounded-xl bg-surface-container hover:bg-red-50 text-secondary hover:text-red-600 transition-all cursor-pointer"
                    title="حذف الكود"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal for Add / Edit Promo Code */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/20"
            >
              <div className="bg-surface-container-low px-6 py-4 border-b border-outline-variant/20 flex justify-between items-center">
                <div className="flex items-center gap-2 text-primary font-bold text-base">
                  <Ticket className="w-5 h-5" />
                  <h3>{editingPromo ? 'تعديل كود الخصم' : 'إضافة كود خصم جديد'}</h3>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-secondary transition-all cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4 text-right">
                {/* Code Field */}
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">كود الخصم (Promo Code) *</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    placeholder="مثال: WELCOME20 أو CELESTE50"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 px-4 font-mono font-extrabold uppercase text-sm text-primary focus:ring-1 focus:ring-primary"
                    required
                  />
                </div>

                {/* Type & Value */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary mb-1">نوع الخصم *</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as 'percentage' | 'fixed')}
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 px-4 text-xs font-bold text-on-surface focus:ring-1 focus:ring-primary"
                    >
                      <option value="percentage">نسبة مئوية (%)</option>
                      <option value="fixed">قيمة ثابتة (ج.م)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-secondary mb-1">
                      {type === 'percentage' ? 'نسبة الخصم (%) *' : 'مبلغ الخصم (ج.م) *'}
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={type === 'percentage' ? 100 : 5000}
                      value={value}
                      onChange={(e) => setValue(e.target.value ? Number(e.target.value) : '')}
                      placeholder={type === 'percentage' ? 'مثال: 15' : 'مثال: 50'}
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 px-4 text-xs font-bold text-on-surface focus:ring-1 focus:ring-primary"
                      required
                    />
                  </div>
                </div>

                {/* Optional Constraints */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary mb-1">الحد الأدنى للطلب (اختياري)</label>
                    <input
                      type="number"
                      min="0"
                      value={minOrderValue}
                      onChange={(e) => setMinOrderValue(e.target.value ? Number(e.target.value) : '')}
                      placeholder="مثال: 150 ج.م"
                      className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 px-4 text-xs text-on-surface focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  {type === 'percentage' && (
                    <div>
                      <label className="block text-xs font-bold text-secondary mb-1">الحد الأقصى للخصم (اختياري)</label>
                      <input
                        type="number"
                        min="0"
                        value={maxDiscount}
                        onChange={(e) => setMaxDiscount(e.target.value ? Number(e.target.value) : '')}
                        placeholder="مثال: 100 ج.م"
                        className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 px-4 text-xs text-on-surface focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  )}
                </div>

                {/* Max Uses Limit (Number of clients/uses allowed) */}
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">
                    الحد الأقصى لعدد العملاء / الاستخدامات المسموحة (اختياري)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={maxUses}
                    onChange={(e) => setMaxUses(e.target.value ? Number(e.target.value) : '')}
                    placeholder="مثال: 1 (لعميل واحد فقط، أو اتركه فارغاً لعدد غير محدود)"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 px-4 text-xs font-bold text-on-surface focus:ring-1 focus:ring-primary"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    مثال: إذا حددت <span className="font-bold text-amber-700">1</span>، سيستفيد عميل واحد فقط بالكوبون، وبعدها يصبح الكوبون متوقفاً تلقائياً (اكسبيرد).
                  </p>
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-xs font-bold text-secondary mb-1">تاريخ الانتهاء (اختياري)</label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 px-4 text-xs text-on-surface focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Is Active Checkbox */}
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="promo-active-checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="w-4 h-4 text-primary rounded-md border-outline-variant/40 focus:ring-primary"
                  />
                  <label htmlFor="promo-active-checkbox" className="text-xs font-bold text-on-surface cursor-pointer">
                    تفعيل كود الخصم فوراً للعملاء
                  </label>
                </div>

                {/* Modal Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-xl border border-outline-variant/30 text-xs font-bold text-secondary hover:bg-surface-container transition-all cursor-pointer"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md"
                  >
                    {editingPromo ? 'حفظ التغييرات' : 'إضافة الكود'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* Modal for Delete Confirmation */}
        {deletingPromo && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-background w-full max-w-md rounded-3xl shadow-2xl p-6 space-y-4 border border-outline-variant/20 text-right"
            >
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                <Trash2 className="w-6 h-6" />
              </div>

              <div className="text-center space-y-1">
                <h3 className="font-bold text-base text-on-surface">تأكيد حذف كود الخصم</h3>
                <p className="text-xs text-secondary leading-relaxed">
                  هل أنت تأكد من حذف كود الخصم <span className="font-mono font-black text-red-600">({deletingPromo.code})</span>؟ لن يتمكن العملاء من استخدامه بعد الحذف.
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeletingPromo(null)}
                  className="flex-1 py-3 rounded-2xl border border-outline-variant/30 text-xs font-bold text-secondary hover:bg-surface-container transition-all cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onDeletePromoCode(deletingPromo.id);
                    setDeletingPromo(null);
                  }}
                  className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold active:scale-95 transition-all cursor-pointer shadow-md"
                >
                  تأكيد الحذف
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
