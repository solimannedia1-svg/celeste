import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, ShoppingBag, ArrowLeft, Heart, Utensils, X, ChevronRight, CheckCircle2 } from 'lucide-react';
import CelesteLogo from './CelesteLogo';

interface WelcomeModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  onStartExploring?: () => void;
}

export default function WelcomeModal({ isOpen: externalIsOpen, onClose, onStartExploring }: WelcomeModalProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    // If explicitly provided via props, use external boolean
    if (typeof externalIsOpen === 'boolean') {
      setInternalIsOpen(externalIsOpen);
      if (externalIsOpen) setStep(1);
      return;
    }

    // Check localStorage for first time visitor
    const hasVisited = localStorage.getItem('celeste_welcome_shown');
    if (!hasVisited) {
      const timer = setTimeout(() => {
        setInternalIsOpen(true);
        setStep(1);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [externalIsOpen]);

  const handleClose = () => {
    localStorage.setItem('celeste_welcome_shown', 'true');
    setInternalIsOpen(false);
    if (onClose) onClose();
  };

  const handleFinish = () => {
    handleClose();
    if (onStartExploring) onStartExploring();
  };

  const showModal = typeof externalIsOpen === 'boolean' ? externalIsOpen : internalIsOpen;

  return (
    <AnimatePresence>
      {showModal && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6" dir="rtl">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl p-6 sm:p-8 shadow-2xl border border-outline-variant/20 z-10 overflow-hidden text-right"
          >
            {/* Background Ambient Glows */}
            <div className="absolute -top-20 -right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Header Steps Indicator & Close */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1.5">
                <span className={`w-6 h-2 rounded-full transition-all ${step === 1 ? 'bg-primary w-8' : 'bg-primary/20'}`} />
                <span className={`w-6 h-2 rounded-full transition-all ${step === 2 ? 'bg-primary w-8' : 'bg-primary/20'}`} />
              </div>

              <button
                onClick={handleClose}
                className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
                aria-label="إغلاق"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 ? (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Step 1 Content */}
                  <div className="flex flex-col items-center text-center">
                    {/* Attached Brand Logo above 'مرحباً بك في تجربة استثنائية' */}
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-3xl bg-surface-container-low border border-primary/20 flex items-center justify-center text-primary shadow-sm p-3">
                        <CelesteLogo className="w-16 h-16 text-primary" strokeWidth={5} />
                      </div>
                      <div className="absolute -bottom-1 -left-1 bg-amber-500 text-white p-1.5 rounded-full shadow-md">
                        <Sparkles className="w-4 h-4" />
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3 shadow-xs">
                      <Heart className="w-3.5 h-3.5 fill-primary text-primary" />
                      <span>مرحباً بك في تجربة استثنائية</span>
                    </span>

                    <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-on-surface tracking-tight">
                      CÉLESTE
                    </h2>
                    <p className="text-xs font-bold text-primary tracking-widest mt-0.5 uppercase">
                      Restaurant & Café
                    </p>

                    <p className="mt-3 text-sm text-on-surface-variant leading-relaxed max-w-md">
                      أهلاً بك في سيلست! صُمم هذا المكان ليكون ملاذك الدافئ حيث تلتقي أجود أنواع القهوة المختصة مع أشهى الأطباق والحلويات الفاخرة.
                    </p>
                  </div>

                  {/* Banner Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-surface-container-low to-amber-500/10 border border-primary/15 text-center">
                    <p className="text-xs sm:text-sm font-bold text-on-surface">
                      ✨ نتمنى لك أوقاتاً ممتعة ولحظات لا تُنسى رفقتنا
                    </p>
                  </div>

                  {/* Step 1 Actions */}
                  <div className="space-y-2 pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="w-full py-3.5 px-6 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <span>التالي</span>
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </button>

                    <button
                      onClick={handleFinish}
                      className="w-full py-2.5 text-center text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
                    >
                      تخطي إلى الرئيسية
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  {/* Step 2 Content */}
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-on-surface">
                      كل ما تحتاجه في تطبيق واحد 🌟
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                      اكتشف الخدمات المتاحة لك لتستمتع بزيارة سلسة ومريحة
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 my-4">
                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                      <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
                        <Utensils className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">منيو متنوع وفاخر</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          تصفح أشهى الأطباق والمشروبات مع إمكانية التخصيص والإضافة للسلة.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">حجز الطاولات المباشر</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          احجز طاولتك المفضلة وحدد عدد الأفراد والوقت بسهولة وسرعة.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/10">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0 mt-0.5">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-on-surface">تتبع الطلبات والخدمة</h4>
                        <p className="text-xs text-on-surface-variant mt-0.5">
                          متابعة دقيقة لحالة الطلب وتحديد نوع الخدمة سواء استلام أو توصيل.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Step 2 Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="py-3 px-4 rounded-2xl bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container-highest transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <ChevronRight className="w-4 h-4" />
                      <span>السابق</span>
                    </button>

                    <button
                      onClick={handleFinish}
                      className="flex-1 py-3.5 px-6 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>الانتقال إلى الرئيسية</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


