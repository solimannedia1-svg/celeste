import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User as UserIcon, 
  Lock, 
  Phone, 
  UserCheck, 
  X, 
  LogOut, 
  ShoppingBag, 
  Calendar, 
  Edit3, 
  Check, 
  Key, 
  Sparkles, 
  Clock, 
  AlertCircle,
  Eye,
  EyeOff,
  ChevronLeft
} from 'lucide-react';
import { User, Order, Reservation } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  users: User[];
  orders: Order[];
  reservations: Reservation[];
  onRegister: (newUser: User) => void;
  onLogin: (user: User) => void;
  onLogout: () => void;
  onUpdateProfile: (updatedUser: User) => void;
  onTriggerToast?: (msg: string) => void;
}

export default function AuthModal({
  isOpen,
  onClose,
  currentUser,
  users,
  orders,
  reservations,
  onRegister,
  onLogin,
  onLogout,
  onUpdateProfile,
  onTriggerToast
}: AuthModalProps) {
  // Mode when not logged in: 'login' | 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Tab inside profile when logged in: 'info' | 'orders' | 'reservations'
  const [profileTab, setProfileTab] = useState<'info' | 'orders' | 'reservations'>('info');

  // Form states
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regUsername, setRegUsername] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser?.name || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phone || '');
  const [editPassword, setEditPassword] = useState('');

  // Errors
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanIdentifier = loginIdentifier.trim().toLowerCase();
    const cleanPassword = loginPassword.trim();

    if (!cleanIdentifier || !cleanPassword) {
      setErrorMsg('الرجاء إدخال اسم المستخدم/رقم الهاتف وكلمة المرور');
      return;
    }

    const foundUser = users.find(u => 
      (u.username.toLowerCase() === cleanIdentifier || u.phone === cleanIdentifier) &&
      u.password === cleanPassword
    );

    if (!foundUser) {
      setErrorMsg('اسم المستخدم أو كلمة المرور غير صحيحة');
      return;
    }

    if (foundUser.status === 'blocked') {
      setErrorMsg('هذا الحساب محظور حالياً. يرجى التواصل مع إدارة سيلست.');
      return;
    }

    onLogin(foundUser);
    onTriggerToast(`مرحباً بك مجدداً، ${foundUser.name}! 👋`);
    onClose();
  };

  // Handle Registration
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = regName.trim();
    const cleanUsername = regUsername.trim().toLowerCase();
    const cleanPhone = regPhone.trim();
    const cleanPassword = regPassword.trim();

    if (!cleanName || !cleanUsername || !cleanPhone || !cleanPassword) {
      setErrorMsg('جميع الحقول مطلوبة لتسجيل الحساب');
      return;
    }

    if (cleanPassword.length < 4) {
      setErrorMsg('كلمة المرور يجب أن تكون 4 خانات على الأقل');
      return;
    }

    if (cleanPassword !== regConfirmPassword.trim()) {
      setErrorMsg('كلمات المرور غير متطابقة');
      return;
    }

    // Check unique username
    const usernameExists = users.some(u => u.username.toLowerCase() === cleanUsername);
    if (usernameExists) {
      setErrorMsg('اسم المستخدم مستخدم بالفعل، اختر اسماً آخر');
      return;
    }

    // Check unique phone
    const phoneExists = users.some(u => u.phone === cleanPhone);
    if (phoneExists) {
      setErrorMsg('رقم الهاتف مسجل لحساب آخر بالفعل');
      return;
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: cleanName,
      username: cleanUsername,
      phone: cleanPhone,
      password: cleanPassword,
      createdAt: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }),
      status: 'active'
    };

    onRegister(newUser);
    onTriggerToast(`تم إنشاء حسابك بنجاح! مرحباً بك يا ${cleanName} 🎉`);
    onClose();
  };

  // Handle Profile Update
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    if (!editName.trim() || !editPhone.trim()) {
      setErrorMsg('الاسم ورقم الهاتف مطلوبين');
      return;
    }

    const updated: User = {
      ...currentUser,
      name: editName.trim(),
      phone: editPhone.trim(),
      password: editPassword.trim() ? editPassword.trim() : currentUser.password
    };

    onUpdateProfile(updated);
    setIsEditing(false);
    onTriggerToast('تم تحديث بيانات حسابك بنجاح ✨');
  };

  // User's orders and reservations
  const myOrders = currentUser
    ? orders.filter(o => o.userId === currentUser.id || o.customerPhone === currentUser.phone)
    : [];

  const myReservations = currentUser
    ? reservations.filter(r => r.userId === currentUser.id || r.customerPhone === currentUser.phone)
    : [];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6" dir="rtl">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/20 z-10 overflow-hidden text-right flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between p-5 border-b border-outline-variant/10 bg-surface-container-low/50 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-bold">
                {currentUser ? (
                  <span className="text-base font-serif">{currentUser.name.charAt(0)}</span>
                ) : (
                  <UserIcon className="w-5 h-5" />
                )}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-on-surface">
                  {currentUser ? currentUser.name : (authMode === 'login' ? 'تسجيل الدخول' : 'حساب جديد')}
                </h3>
                <p className="text-xs text-on-surface-variant font-medium">
                  {currentUser ? `@${currentUser.username}` : 'سيليست كافيه ومطعم'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto flex-1 space-y-6">
            {errorMsg && (
              <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {!currentUser ? (
              /* NOT LOGGED IN: LOGIN / REGISTER FORMS */
              <div>
                {/* Tabs Switcher */}
                <div className="flex rounded-2xl bg-surface-container-low p-1 border border-outline-variant/10 mb-6">
                  <button
                    onClick={() => {
                      setAuthMode('login');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      authMode === 'login'
                        ? 'bg-primary text-white shadow-md'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    تسجيل الدخول
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('register');
                      setErrorMsg(null);
                    }}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                      authMode === 'register'
                        ? 'bg-primary text-white shadow-md'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    إنشاء حساب جديد
                  </button>
                </div>

                {authMode === 'login' ? (
                  /* LOGIN FORM */
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1.5">
                        اسم المستخدم أو رقم الهاتف
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          placeholder="مثال: ahmed_2025 أو 01012345678"
                          className="w-full py-3 pr-10 pl-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium"
                        />
                        <UserIcon className="w-4 h-4 text-on-surface-variant absolute right-3.5 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1.5">
                        كلمة المرور
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full py-3 pr-10 pl-10 rounded-2xl bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium"
                        />
                        <Lock className="w-4 h-4 text-on-surface-variant absolute right-3.5 top-3.5" />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute left-3.5 top-3.5 text-on-surface-variant hover:text-on-surface"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer mt-2"
                    >
                      تسجيل الدخول
                    </button>

                    <div className="text-center pt-2">
                      <p className="text-xs text-on-surface-variant">
                        ليس لديك حساب؟{' '}
                        <button
                          type="button"
                          onClick={() => setAuthMode('register')}
                          className="text-primary font-bold hover:underline cursor-pointer"
                        >
                          إنشاء حساب جديد الآن
                        </button>
                      </p>
                    </div>
                  </form>
                ) : (
                  /* REGISTER FORM */
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1.5">
                        الاسم الكامل
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={regName}
                          onChange={(e) => setRegName(e.target.value)}
                          placeholder="مثال: أحمد محمد"
                          className="w-full py-3 pr-10 pl-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium"
                        />
                        <UserCheck className="w-4 h-4 text-on-surface-variant absolute right-3.5 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1.5">
                        اسم المستخدم (للتسجيل والدخول)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          value={regUsername}
                          onChange={(e) => setRegUsername(e.target.value)}
                          placeholder="مثال: ahmed_mohamed"
                          className="w-full py-3 pr-10 pl-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium"
                        />
                        <UserIcon className="w-4 h-4 text-on-surface-variant absolute right-3.5 top-3.5" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface mb-1.5">
                        رقم الهاتف
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="01012345678"
                          className="w-full py-3 pr-10 pl-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium"
                        />
                        <Phone className="w-4 h-4 text-on-surface-variant absolute right-3.5 top-3.5" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-on-surface mb-1.5">
                          كلمة المرور
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            required
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full py-3 pr-10 pl-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium"
                          />
                          <Lock className="w-4 h-4 text-on-surface-variant absolute right-3.5 top-3.5" />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-on-surface mb-1.5">
                          تأكيد كلمة المرور
                        </label>
                        <div className="relative">
                          <input
                            type="password"
                            required
                            value={regConfirmPassword}
                            onChange={(e) => setRegConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full py-3 pr-10 pl-3 rounded-2xl bg-surface-container-low border border-outline-variant/20 focus:outline-none focus:border-primary text-xs font-medium"
                          />
                          <Lock className="w-4 h-4 text-on-surface-variant absolute right-3.5 top-3.5" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all cursor-pointer mt-2"
                    >
                      تأكيد وإنشاء الحساب
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* LOGGED IN USER PROFILE */
              <div className="space-y-5">
                {/* Profile Tabs */}
                <div className="flex rounded-2xl bg-surface-container-low p-1 border border-outline-variant/10">
                  <button
                    onClick={() => setProfileTab('info')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      profileTab === 'info'
                        ? 'bg-primary text-white shadow'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>حسابي</span>
                  </button>

                  <button
                    onClick={() => setProfileTab('orders')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      profileTab === 'orders'
                        ? 'bg-primary text-white shadow'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>طلباتي ({myOrders.length})</span>
                  </button>

                  <button
                    onClick={() => setProfileTab('reservations')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      profileTab === 'reservations'
                        ? 'bg-primary text-white shadow'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>حجوزاتي ({myReservations.length})</span>
                  </button>
                </div>

                {/* TAB 1: USER INFO */}
                {profileTab === 'info' && (
                  <div className="space-y-4">
                    {!isEditing ? (
                      <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/10 space-y-3">
                        <div className="flex items-center justify-between pb-3 border-b border-outline-variant/10">
                          <div>
                            <span className="text-[11px] font-bold text-on-surface-variant">الاسم الكامل</span>
                            <p className="text-sm font-extrabold text-on-surface">{currentUser.name}</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                            عضو نشط
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-on-surface-variant">اسم المستخدم:</span>
                            <p className="font-bold text-on-surface">@{currentUser.username}</p>
                          </div>

                          <div>
                            <span className="text-on-surface-variant">رقم الهاتف:</span>
                            <p className="font-bold text-on-surface" dir="ltr">{currentUser.phone}</p>
                          </div>

                          <div>
                            <span className="text-on-surface-variant">تاريخ الانضمام:</span>
                            <p className="font-bold text-on-surface">{currentUser.createdAt}</p>
                          </div>

                          <div>
                            <span className="text-on-surface-variant">إجمالي الطلبات:</span>
                            <p className="font-bold text-primary">{myOrders.length} طلبات</p>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-outline-variant/10 flex gap-2">
                          <button
                            onClick={() => {
                              setEditName(currentUser.name);
                              setEditPhone(currentUser.phone);
                              setEditPassword('');
                              setIsEditing(true);
                            }}
                            className="flex-1 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-primary" />
                            <span>تعديل بيانات الحساب</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* EDIT PROFILE FORM */
                      <form onSubmit={handleSaveProfile} className="space-y-3.5 p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20">
                        <h4 className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                          <Edit3 className="w-4 h-4 text-primary" />
                          <span>تعديل معلومات الحساب</span>
                        </h4>

                        <div>
                          <label className="block text-[11px] font-bold text-on-surface mb-1">الاسم الكامل</label>
                          <input
                            type="text"
                            required
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full py-2 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-on-surface mb-1">رقم الهاتف</label>
                          <input
                            type="tel"
                            required
                            value={editPhone}
                            onChange={(e) => setEditPhone(e.target.value)}
                            className="w-full py-2 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-xs font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-on-surface mb-1">تغيير كلمة المرور (اختياري)</label>
                          <input
                            type="password"
                            placeholder="أدخل كلمة مرور جديدة إذا أردت تغييرها"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            className="w-full py-2 px-3 rounded-xl bg-surface-container-lowest border border-outline-variant/20 text-xs font-medium"
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="py-2 px-4 rounded-xl bg-surface-container-high text-on-surface font-bold text-xs"
                          >
                            إلغاء
                          </button>
                          <button
                            type="submit"
                            className="flex-1 py-2 px-4 rounded-xl bg-primary text-white font-bold text-xs shadow"
                          >
                            حفظ التغييرات
                          </button>
                        </div>
                      </form>
                    )}

                    {/* LOGOUT BUTTON */}
                    <button
                      onClick={() => {
                        onLogout();
                        onTriggerToast('تم تسجيل الخروج بنجاح');
                        onClose();
                      }}
                      className="w-full py-3 px-4 rounded-2xl bg-red-500/10 hover:bg-red-500/20 text-red-600 font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>تسجيل الخروج من الحساب</span>
                    </button>
                  </div>
                )}

                {/* TAB 2: MY ORDERS */}
                {profileTab === 'orders' && (
                  <div className="space-y-3">
                    {myOrders.length === 0 ? (
                      <div className="text-center py-8 text-on-surface-variant space-y-2">
                        <ShoppingBag className="w-10 h-10 mx-auto opacity-30" />
                        <p className="text-xs font-bold">لا توجد طلبات سابقة مسجلة باسمك بعد</p>
                      </div>
                    ) : (
                      myOrders.map((ord) => (
                        <div key={ord.id} className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/10 space-y-2 text-xs">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-on-surface">طلب #{ord.id.slice(-6)}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                              ord.status === 'delivered' ? 'bg-emerald-500/10 text-emerald-600' :
                              ord.status === 'on_the_way' ? 'bg-amber-500/10 text-amber-600' :
                              'bg-primary/10 text-primary'
                            }`}>
                              {ord.status === 'delivered' ? 'تم التوصيل' :
                               ord.status === 'on_the_way' ? 'في الطريق' :
                               ord.status === 'preparing' ? 'جاري التحضير' : 'تم الاستلام'}
                            </span>
                          </div>

                          <div className="text-on-surface-variant text-[11px] space-y-0.5">
                            {ord.items.map((it, idx) => (
                              <div key={idx} className="flex justify-between">
                                <span>{it.quantity}x {it.menuItem.name}</span>
                                <span>{(it.menuItem.price * it.quantity).toFixed(0)} ج.م</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-outline-variant/10 flex justify-between font-bold text-on-surface">
                            <span>الإجمالي</span>
                            <span className="text-primary">{ord.total.toFixed(0)} ج.م</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* TAB 3: MY RESERVATIONS */}
                {profileTab === 'reservations' && (
                  <div className="space-y-3">
                    {myReservations.length === 0 ? (
                      <div className="text-center py-8 text-on-surface-variant space-y-2">
                        <Calendar className="w-10 h-10 mx-auto opacity-30" />
                        <p className="text-xs font-bold">لا توجد حجوزات طاولات حالية</p>
                      </div>
                    ) : (
                      myReservations.map((res) => (
                        <div key={res.id} className="p-3.5 rounded-2xl bg-surface-container-low border border-outline-variant/10 space-y-2 text-xs">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-on-surface">حجز طاولة #{res.id.slice(-5)}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                              res.status === 'confirmed' ? 'bg-emerald-500/10 text-emerald-600' :
                              res.status === 'cancelled' ? 'bg-red-500/10 text-red-600' :
                              'bg-amber-500/10 text-amber-600'
                            }`}>
                              {res.status === 'confirmed' ? 'مؤكد' :
                               res.status === 'cancelled' ? 'ملغي' : 'قيد الانتظار'}
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-on-surface-variant text-[11px]">
                            <div>التاريخ: <span className="font-bold text-on-surface">{res.date}</span></div>
                            <div>الوقت: <span className="font-bold text-on-surface">{res.timeSlot}</span></div>
                            <div>الأفراد: <span className="font-bold text-on-surface">{res.guests} شخص</span></div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
