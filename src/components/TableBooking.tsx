import { useState, useEffect } from 'react';
import { Reservation, User as UserType } from '../types';
import { GUESTS_OPTIONS } from '../data';
import { Calendar, Users, Clock, MessageSquare, CheckCircle, Sparkles, ChevronLeft, ChevronRight, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TableBookingProps {
  currentUser?: UserType | null;
  onAddReservation: (reservation: Reservation) => void;
}

const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
];

const ARABIC_DAYS_OF_WEEK = [
  'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'
];

const WEEKDAY_HEADERS = ['أحد', 'نثن', 'ثلا', 'ربع', 'خميس', 'جمع', 'سبت'];

export default function TableBooking({ currentUser, onAddReservation }: TableBookingProps) {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDay, setSelectedDay] = useState(today.getDate());
  
  const [selectedGuests, setSelectedGuests] = useState('2'); // Default 2 guests
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('07:30 م'); // Default 7:30 PM
  const [customerName, setCustomerName] = useState(currentUser?.name || '');
  const [customerPhone, setCustomerPhone] = useState(currentUser?.phone || '');
  const [specialRequests, setSpecialRequests] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastReservation, setLastReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    if (currentUser) {
      if (!customerName) setCustomerName(currentUser.name);
      if (!customerPhone) setCustomerPhone(currentUser.phone);
    }
  }, [currentUser]);

  // Helper to format Arabic date output
  const getSelectedDateText = () => {
    try {
      const dateObj = new Date(selectedYear, selectedMonth, selectedDay);
      const dayName = ARABIC_DAYS_OF_WEEK[dateObj.getDay()];
      const monthName = ARABIC_MONTHS[selectedMonth];
      return `${dayName}، ${selectedDay} ${monthName} ${selectedYear}`;
    } catch (e) {
      return `${selectedDay}/${selectedMonth + 1}/${selectedYear}`;
    }
  };

  // Month navigation calculation
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingSlots = Array.from({ length: firstDayIndex }, (_, i) => null);
  const calendarSlots = [...paddingSlots, ...daysArray];

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  const handleConfirm = () => {
    if (!customerName.trim()) {
      alert('الرجاء إدخال اسم العميل لإتمام الحجز.');
      return;
    }
    if (!customerPhone.trim()) {
      alert('الرجاء إدخال رقم تليفون العميل للتواصل.');
      return;
    }

    const newReservation: Reservation = {
      id: `CEL-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: currentUser?.id,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      date: getSelectedDateText(),
      guests: selectedGuests,
      timeSlot: selectedTimeSlot,
      specialRequests: specialRequests,
      status: 'pending',
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    onAddReservation(newReservation);
    setLastReservation(newReservation);
    setShowSuccess(true);
  };

  const handleReset = () => {
    setShowSuccess(false);
    const now = new Date();
    setSelectedYear(now.getFullYear());
    setSelectedMonth(now.getMonth());
    setSelectedDay(now.getDate());
    setSelectedGuests('2');
    setSelectedTimeSlot('07:30 م');
    setCustomerName('');
    setCustomerPhone('');
    setSpecialRequests('');
  };

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Visual Section */}
      <div className="relative w-full h-48 rounded-2xl overflow-hidden sunbaked-shadow border border-outline-variant/30">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDAfWskyXBLZ2aCEtzzoMkgGGGCLAQvyK4O3AAbUa9vLIg8a5iiLaDc56Dqe_EJHNiQ8OS9iN9gcvR91RoqX-aSQrlCXRruuqpoaA1avS8HD0h_w_l1sPptLPaV-ZMgWFqLox35honKZ7VSdNMaDaHWLUVorWGbI8ZjyBIjUVaAHZte6OBYypG4rw6ovBJetkKQ9-Ho51OYOaOV16MacWMGn4GKorAL38fLrmZ_jAxfYijiowgGnap1AqU1w0CZ6KwD5mHvLPHwQco')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/30 to-transparent"></div>
        <div className="absolute bottom-4 right-4 text-right">
          <h2 className="font-headline-lg text-2xl text-white font-bold tracking-wide">حجز طاولة</h2>
          <p className="font-body-md text-white/90 text-sm mt-0.5">استمتع بتجربة طعام استثنائية ونكهات فريدة</p>
        </div>
      </div>

      {/* Booking Form State */}
      {!showSuccess ? (
        <div className="space-y-6">
          {/* Date Selection */}
          <section className="space-y-4 bg-surface-container-low p-5 rounded-3xl border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <h3 className="font-headline-md text-lg text-primary font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                تحديد تاريخ الحجز
              </h3>
              
              {/* Year Select & Native Picker Shortcut */}
              <div className="flex items-center gap-2">
                <select
                  id="year-selector"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="bg-surface-container-high text-xs font-bold text-on-surface border border-outline-variant/30 px-3 py-1.5 rounded-xl cursor-pointer"
                >
                  {[2026, 2027, 2028, 2029, 2030].map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>

                <input
                  type="date"
                  id="native-date-shortcut"
                  min={`${new Date().getFullYear()}-01-01`}
                  onChange={(e) => {
                    if (e.target.value) {
                      const d = new Date(e.target.value);
                      setSelectedYear(d.getFullYear());
                      setSelectedMonth(d.getMonth());
                      setSelectedDay(d.getDate());
                    }
                  }}
                  className="bg-surface-container-high text-[11px] font-bold text-primary border border-outline-variant/30 px-2 py-1 rounded-xl cursor-pointer"
                  title="اختر بواسطة روزنامة النظام"
                />
              </div>
            </div>

            {/* Custom Interactive Calendar */}
            <div className="bg-surface-container p-4 rounded-2xl border border-outline-variant/20">
              {/* Month Header Nav */}
              <div className="flex justify-between items-center mb-4">
                <button
                  type="button"
                  id="prev-month-btn"
                  onClick={handlePrevMonth}
                  className="p-1.5 rounded-full hover:bg-surface-container-high text-secondary transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <span className="font-bold text-sm text-primary">
                  {ARABIC_MONTHS[selectedMonth]} {selectedYear}
                </span>
                <button
                  type="button"
                  id="next-month-btn"
                  onClick={handleNextMonth}
                  className="p-1.5 rounded-full hover:bg-surface-container-high text-secondary transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Weekday Headers */}
              <div className="grid grid-cols-7 text-center text-[10px] font-bold text-secondary mb-2">
                {WEEKDAY_HEADERS.map((h, idx) => (
                  <div key={idx} className="py-1">{h}</div>
                ))}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {calendarSlots.map((day, idx) => {
                  if (day === null) {
                    return <div key={`empty-${idx}`} className="aspect-square"></div>;
                  }

                  const isSelected = selectedDay === day;
                  return (
                    <button
                      key={`day-${day}`}
                      type="button"
                      id={`day-btn-${day}`}
                      onClick={() => setSelectedDay(day)}
                      className={`aspect-square rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-primary text-white shadow-[0_4px_12px_rgba(111,36,10,0.3)] scale-110'
                          : 'text-on-surface hover:bg-surface-container-high'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Display selected formatted text */}
            <div className="bg-primary-fixed/30 p-3 rounded-xl border border-primary/10 flex items-center justify-between text-right">
              <span className="text-xs text-secondary font-semibold">التاريخ المحدد حالياً:</span>
              <span className="text-sm font-bold text-primary">{getSelectedDateText()}</span>
            </div>
          </section>

          {/* Number of Guests */}
          <section className="space-y-3">
            <h3 className="font-headline-md text-lg text-primary font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              عدد الأشخاص
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {GUESTS_OPTIONS.map((opt) => {
                const isActive = selectedGuests === opt;
                return (
                  <button
                    key={opt}
                    id={`guests-btn-${opt}`}
                    onClick={() => setSelectedGuests(opt)}
                    className={`h-12 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 border ${
                      isActive
                        ? 'bg-primary text-white border-primary shadow-[0_4px_12px_rgba(111,36,10,0.2)] scale-105'
                        : 'bg-surface-container text-on-surface border-outline-variant/30 hover:border-primary/40'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Time Selection */}
          <section className="space-y-4 bg-surface-container-low p-5 rounded-3xl border border-outline-variant/30 text-right" dir="rtl">
            <h3 className="font-headline-md text-lg text-primary font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              تحديد وقت الحجز
            </h3>

            <div className="space-y-4">
              {/* Option A: Native Time Picker */}
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-secondary text-right">حدد الوقت بالضبط من الساعة *</label>
                <div className="relative flex items-center gap-2 bg-surface-container border border-outline-variant/30 rounded-2xl p-2.5">
                  <Clock className="w-4 h-4 text-primary ml-1" />
                  <input
                    type="time"
                    id="custom-time-picker"
                    value={(() => {
                      if (selectedTimeSlot.includes('م') || selectedTimeSlot.includes('ص')) {
                        const isPm = selectedTimeSlot.includes('م');
                        const parts = selectedTimeSlot.replace(/[مص\s]/g, '').split(':');
                        if (parts.length === 2) {
                          let h = parseInt(parts[0]);
                          if (isPm && h < 12) h += 12;
                          if (!isPm && h === 12) h = 0;
                          return `${h.toString().padStart(2, '0')}:${parts[1]}`;
                        }
                      }
                      return '19:30';
                    })()}
                    onChange={(e) => {
                      const timeVal = e.target.value;
                      if (timeVal) {
                        const [hoursStr, minutesStr] = timeVal.split(':');
                        let hours = parseInt(hoursStr);
                        const ampm = hours >= 12 ? 'م' : 'ص';
                        hours = hours % 12;
                        hours = hours ? hours : 12;
                        const formatted = `${hours.toString().padStart(2, '0')}:${minutesStr} ${ampm}`;
                        setSelectedTimeSlot(formatted);
                      }
                    }}
                    className="bg-transparent text-sm font-bold text-on-surface focus:outline-none w-full text-right cursor-pointer"
                  />
                </div>
              </div>

              {/* Option B: Manual Typed Entry */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-secondary text-right">أو اكتب الوقت يدوياً بالتفصيل *</label>
                <input
                  type="text"
                  id="booking-time-text-input"
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  placeholder="مثال: 07:30 م أو 4:00 عصراً"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 px-4 focus:ring-1 focus:ring-primary focus:border-primary text-right font-bold text-sm text-on-surface placeholder:text-secondary/50 transition-all"
                  required
                />
              </div>

              {/* Quick Shortcuts */}
              <div>
                <p className="text-[11px] font-bold text-slate-400 mb-2 text-right">أوقات مقترحة سريعة:</p>
                <div className="flex flex-wrap gap-2 justify-start" dir="rtl">
                  {['01:00 م', '04:00/م', '07:30 م', '09:00 م', '11:00 م', '01:00 ص'].map((slot) => {
                    const cleanedSlot = slot.replace('/م', ' م');
                    const isActive = selectedTimeSlot === cleanedSlot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(cleanedSlot)}
                        className={`py-1.5 px-3 rounded-xl font-bold text-xs transition-all duration-300 border ${
                          isActive
                            ? 'bg-primary text-white border-primary shadow-sm scale-105'
                            : 'bg-surface-container border-outline-variant/20 text-secondary hover:bg-primary/10'
                        }`}
                      >
                        {cleanedSlot}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Customer Info (Name and Phone) */}
          <section className="space-y-4 bg-surface-container-low p-5 rounded-3xl border border-outline-variant/30">
            <h3 className="font-headline-md text-lg text-primary font-bold flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              بيانات العميل للتواصل
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-secondary mb-1">الاسم الكامل *</label>
                <div className="relative">
                  <User className="absolute right-4 top-3.5 w-4 h-4 text-secondary/60 pointer-events-none" />
                  <input
                    type="text"
                    id="booking-name-input"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="مثال: أحمد محمد"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 pr-10 pl-4 focus:ring-1 focus:ring-primary focus:border-primary text-right font-body-md text-sm text-on-surface placeholder:text-secondary/50 transition-all"
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
                    id="booking-phone-input"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="مثال: 01xxxxxxxxx"
                    className="w-full bg-surface-container border border-outline-variant/30 rounded-2xl py-3 pr-10 pl-4 focus:ring-1 focus:ring-primary focus:border-primary text-right font-body-md text-sm text-on-surface placeholder:text-secondary/50 transition-all"
                    required
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Special Requests */}
          <section className="space-y-3">
            <h3 className="font-headline-md text-lg text-primary font-bold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              طلبات خاصة
            </h3>
            <textarea
              id="special-requests-textarea"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full min-h-[120px] p-4 rounded-2xl bg-surface-container-low border border-outline-variant/40 focus:ring-1 focus:ring-primary focus:border-primary font-body-md text-on-surface placeholder:text-secondary/50 transition-all resize-none text-right"
              placeholder="هل تود إخبارنا بشيء؟ (مثلاً: احتفال بعيد ميلاد، حساسية تجاه نوع طعام...)"
            />
          </section>

          {/* Confirm Button */}
          <div className="pt-4">
            <button
              id="confirm-booking-btn"
              onClick={handleConfirm}
              className="w-full h-14 bg-primary text-white rounded-full font-bold text-base shadow-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              <span>تأكيد الحجز</span>
            </button>
          </div>
        </div>
      ) : (
        /* Booking Confirmation Success State */
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/30 shadow-xl space-y-6 text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600 animate-pulse">
            <CheckCircle className="w-10 h-10 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <h3 className="font-headline-lg text-2xl text-primary font-bold">تم تأكيد حجزك بنجاح!</h3>
            <p className="text-secondary text-sm">يسعدنا استقبالك قريباً في سيلست وتقديم تجربة مميزة لك.</p>
          </div>

          {lastReservation && (
            <div className="bg-surface-container p-4 rounded-xl text-right space-y-3 border border-outline-variant/20">
              <div className="flex justify-between items-center pb-2 border-b border-outline-variant/30">
                <span className="text-secondary text-xs">رقم الحجز:</span>
                <span className="font-mono font-bold text-primary text-sm">{lastReservation.id}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 pb-2 border-b border-outline-variant/30">
                <div>
                  <span className="text-secondary text-xs block">اسم العميل:</span>
                  <span className="font-bold text-on-surface text-sm">{lastReservation.customerName}</span>
                </div>
                <div>
                  <span className="text-secondary text-xs block">رقم التليفون:</span>
                  <span className="font-bold text-on-surface text-sm">{lastReservation.customerPhone}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-secondary text-xs block">عدد الحضور:</span>
                  <span className="font-bold text-on-surface text-sm">{lastReservation.guests} أشخاص</span>
                </div>
                <div>
                  <span className="text-secondary text-xs block">التاريخ:</span>
                  <span className="font-bold text-on-surface text-sm">{lastReservation.date}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-secondary text-xs block">التوقيت:</span>
                  <span className="font-bold text-on-surface text-sm">{lastReservation.timeSlot}</span>
                </div>
                <div>
                  <span className="text-secondary text-xs block">الحالة:</span>
                  <span className="text-green-700 font-bold text-xs flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-600 animate-ping"></span>
                    مؤكد ومحجوز
                  </span>
                </div>
              </div>
              {lastReservation.specialRequests && (
                <div className="pt-2 border-t border-outline-variant/30">
                  <span className="text-secondary text-xs block">طلباتك الخاصة:</span>
                  <p className="text-on-surface-variant text-xs mt-1 bg-white/50 p-2 rounded-lg italic">
                    "{lastReservation.specialRequests}"
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={handleReset}
              className="w-full h-12 bg-primary text-white rounded-full font-bold text-sm shadow-md hover:bg-primary/90 transition-colors"
            >
              حجز طاولة أخرى
            </button>
            <div className="flex items-center justify-center gap-2 text-primary font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>نتطلع بشوق لزيارتك، أهلاً بك دائماً</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
