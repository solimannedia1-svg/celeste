import React, { useState, useEffect } from 'react';
import { MenuItem, CartItem, Reservation, Order, User, RestaurantInfo, PromoCode } from '../types';
import PromoManagement from './PromoManagement';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  CheckCircle, 
  XCircle, 
  Edit3, 
  Plus, 
  Coffee, 
  DollarSign, 
  Truck, 
  Clock, 
  RotateCcw,
  Sparkles,
  ChevronRight,
  Package,
  Calendar,
  Trash2,
  RefreshCw,
  UserCheck,
  UserX,
  Search,
  Lock,
  Eye,
  ShieldAlert,
  Phone,
  User as UserIcon,
  X,
  MapPin,
  Building,
  Save,
  Settings,
  Tag,
  Download,
  FileText,
  Printer,
  ShieldCheck,
  Key,
  Ticket
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminDashboardProps {
  orders: Order[];
  reservations: Reservation[];
  menuItems: MenuItem[];
  categories: string[];
  users: User[];
  restaurantInfo: RestaurantInfo;
  promoCodes?: PromoCode[];
  onAddPromoCode?: (promo: PromoCode) => void;
  onUpdatePromoCode?: (promo: PromoCode) => void;
  onDeletePromoCode?: (promoId: string) => void;
  onTogglePromoCodeStatus?: (promoId: string) => void;
  onUpdateRestaurantInfo: (info: RestaurantInfo) => void;
  onUpdateOrderStatus: (orderId: string, status: 'received' | 'preparing' | 'on_the_way' | 'delivered') => void;
  onDeleteOrder?: (orderId: string) => void;
  onUpdateReservationStatus: (resId: string, status: 'confirmed' | 'cancelled') => void;
  onUpdateMenuItem: (updatedItem: MenuItem) => void;
  onAddMenuItem: (newItem: MenuItem) => void;
  onDeleteMenuItem: (itemId: string) => void;
  onAddCategory: (categoryName: string) => void;
  onDeleteCategory: (categoryName: string) => void;
  onAddUser: (user: User) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (userId: string) => void;
  onToggleUserStatus: (userId: string) => void;
  onOpenSupervisorDashboard?: () => void;
  onClose: () => void;
}

export default function AdminDashboard({
  orders,
  reservations,
  menuItems,
  categories,
  users,
  restaurantInfo,
  promoCodes = [],
  onAddPromoCode = () => {},
  onUpdatePromoCode = () => {},
  onDeletePromoCode = () => {},
  onTogglePromoCodeStatus = () => {},
  onUpdateRestaurantInfo,
  onUpdateOrderStatus,
  onDeleteOrder,
  onUpdateReservationStatus,
  onUpdateMenuItem,
  onAddMenuItem,
  onDeleteMenuItem,
  onAddCategory,
  onDeleteCategory,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onToggleUserStatus,
  onOpenSupervisorDashboard,
  onClose
}: AdminDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'orders' | 'reservations' | 'users' | 'supervisors' | 'menu' | 'categories' | 'promos' | 'settings' | 'export'>('orders');
  
  // Restaurant Info state
  const [restaurantFormData, setRestaurantFormData] = useState<RestaurantInfo>(restaurantInfo);
  const [restaurantSavedMessage, setRestaurantSavedMessage] = useState(false);

  useEffect(() => {
    setRestaurantFormData(restaurantInfo);
  }, [restaurantInfo]);
  
  // User Management states
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userFormData, setUserFormData] = useState({
    name: '',
    username: '',
    phone: '',
    password: '',
    notes: ''
  });
  const [viewingUserActivity, setViewingUserActivity] = useState<User | null>(null);

  // Supervisor Management states
  const [supervisorSearchQuery, setSupervisorSearchQuery] = useState('');
  const [editingSupervisor, setEditingSupervisor] = useState<User | null>(null);
  const [isAddingSupervisor, setIsAddingSupervisor] = useState(false);
  const [supervisorFormData, setSupervisorFormData] = useState({
    name: '',
    username: '',
    phone: '',
    password: '',
    notes: '',
    permissions: {
      orders: true,
      reservations: true,
      menu: true
    }
  });

  const handleSaveSupervisorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supervisorFormData.name || !supervisorFormData.username || !supervisorFormData.password) {
      alert('الرجاء إدخال اسم المشرف، اسم المستخدم، وكلمة المرور.');
      return;
    }

    const cleanUsername = supervisorFormData.username.trim().toLowerCase();

    if (editingSupervisor) {
      const updated: User = {
        ...editingSupervisor,
        name: supervisorFormData.name.trim(),
        username: cleanUsername,
        phone: supervisorFormData.phone.trim() || editingSupervisor.phone,
        password: supervisorFormData.password.trim(),
        notes: supervisorFormData.notes.trim(),
        role: 'supervisor',
        permissions: supervisorFormData.permissions
      };
      onUpdateUser(updated);
      setEditingSupervisor(null);
    } else {
      const exists = users.some(u => u.username.toLowerCase() === cleanUsername);
      if (exists) {
        alert('اسم المستخدم هذا مستخدم بالفعل! اختر اسم مستخدم آخر.');
        return;
      }
      const newSupervisor: User = {
        id: `sup_${Date.now()}`,
        name: supervisorFormData.name.trim(),
        username: cleanUsername,
        phone: supervisorFormData.phone.trim() || '01000000000',
        password: supervisorFormData.password.trim(),
        createdAt: new Date().toLocaleDateString('ar-EG'),
        status: 'active',
        role: 'supervisor',
        notes: supervisorFormData.notes.trim() || 'مشرف مطعم معتمد',
        permissions: supervisorFormData.permissions
      };
      onAddUser(newSupervisor);
      setIsAddingSupervisor(false);
    }

    setSupervisorFormData({
      name: '',
      username: '',
      phone: '',
      password: '',
      notes: '',
      permissions: { orders: true, reservations: true, menu: true }
    });
  };

  // Export / Import states
  const [copied, setCopied] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);
  
  // Menu form states (for adding/editing)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  // PDF Export for users
  const handleDownloadUsersPDF = (filteredList?: User[]) => {
    const listToExport = filteredList || users;
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('يرجى السماح بالنوافذ المنبثقة (Popups) في متصفحك لتنزيل ملف الـ PDF');
      return;
    }

    const currentDate = new Date().toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const activeCount = listToExport.filter(u => u.status === 'active').length;
    const blockedCount = listToExport.filter(u => u.status === 'blocked').length;
    
    const totalSpentAll = listToExport.reduce((sum, u) => {
      const uOrders = orders.filter(o => o.userId === u.id || o.customerPhone === u.phone);
      return sum + uOrders.reduce((s, o) => s + o.total, 0);
    }, 0);

    const htmlContent = `
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <title>تقرير قاعدة بيانات الأعضاء - ${restaurantInfo.name || 'مطعم ومقهى سيلست'}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap');
          * { box-sizing: border-box; }
          body {
            font-family: 'Cairo', system-ui, -apple-system, sans-serif;
            direction: rtl;
            padding: 24px;
            color: #0f172a;
            background: #ffffff;
            margin: 0;
            line-height: 1.5;
          }
          .header-banner {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 3px solid #e2e8f0;
            padding-bottom: 16px;
            margin-bottom: 20px;
          }
          .brand-title {
            font-size: 22px;
            font-weight: 900;
            color: #b91c1c;
            margin: 0;
          }
          .brand-subtitle {
            font-size: 13px;
            color: #64748b;
            font-weight: 700;
            margin-top: 2px;
          }
          .meta-info {
            text-align: left;
            font-size: 12px;
            color: #475569;
            font-weight: 700;
          }
          .meta-info span { display: block; margin-bottom: 2px; }
          
          .summary-cards {
            display: grid;
            grid-template-cols: repeat(4, 1fr);
            gap: 12px;
            margin-bottom: 24px;
          }
          .card {
            background: #f8fafc;
            border: 1px solid #cbd5e1;
            border-radius: 12px;
            padding: 12px 14px;
            text-align: center;
          }
          .card-label {
            font-size: 11px;
            color: #64748b;
            font-weight: 700;
            display: block;
          }
          .card-value {
            font-size: 18px;
            font-weight: 800;
            color: #0f172a;
            margin-top: 4px;
            display: block;
          }
          
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-top: 10px;
          }
          th {
            background-color: #1e293b;
            color: #ffffff;
            font-weight: 800;
            padding: 10px 12px;
            text-align: right;
            border: 1px solid #1e293b;
          }
          td {
            padding: 9px 12px;
            border: 1px solid #e2e8f0;
            text-align: right;
            vertical-align: middle;
          }
          tr:nth-child(even) {
            background-color: #f8fafc;
          }
          .badge {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 9999px;
            font-weight: 800;
            font-size: 11px;
          }
          .badge-active {
            background-color: #dcfce7;
            color: #15803d;
            border: 1px solid #bbf7d0;
          }
          .badge-blocked {
            background-color: #fee2e2;
            color: #b91c1c;
            border: 1px solid #fecaca;
          }
          .phone-num { font-family: monospace; direction: ltr; font-weight: 800; }
          
          .print-btn {
            background: #b91c1c;
            color: #ffffff;
            border: none;
            padding: 10px 24px;
            font-family: 'Cairo', sans-serif;
            font-weight: 800;
            font-size: 14px;
            border-radius: 10px;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          }
          .print-btn:hover { background: #991b1b; }
          
          .footer-note {
            margin-top: 30px;
            border-top: 1px solid #e2e8f0;
            padding-top: 12px;
            text-align: center;
            font-size: 11px;
            color: #94a3b8;
            font-weight: 600;
          }
          
          @media print {
            body { padding: 0; }
            .no-print { display: none !important; }
            .card { border-color: #e2e8f0; }
          }
        </style>
      </head>
      <body>
        <div class="no-print" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; background: #fff7ed; border: 1px solid #ffedd5; padding: 12px 16px; border-radius: 12px;">
          <span style="font-size: 13px; font-weight: 700; color: #c2410c;">
            💡 تلميح: اختر "حفظ كـ PDF" (Save as PDF) من نافذة الطباعة لاحتفاظ بالملف على جهازك.
          </span>
          <button onclick="window.print()" class="print-btn">
            🖨️ طباعة وحفظ كـ PDF
          </button>
        </div>

        <div class="header-banner">
          <div>
            <h1 class="brand-title">🏛️ ${restaurantInfo.name || 'مطعم ومقهى سيلست'}</h1>
            <p class="brand-subtitle">سجل وقاعدة بيانات الأعضاء المسجلين (${restaurantInfo.branch || 'فرع بورسعيد'})</p>
          </div>
          <div class="meta-info">
            <span>📅 <strong>تاريخ الاستخراج:</strong> ${currentDate}</span>
            <span>📍 <strong>العنوان:</strong> ${restaurantInfo.address || 'طرح البحر - بورسعيد'}</span>
            <span>📞 <strong>الهاتف:</strong> <span class="phone-num">${restaurantInfo.phone}</span></span>
          </div>
        </div>

        <div class="summary-cards">
          <div class="card">
            <span class="card-label">إجمالي الأعضاء بالتقرير</span>
            <span class="card-value">${listToExport.length} عضو</span>
          </div>
          <div class="card">
            <span class="card-label">الأعضاء النشطين</span>
            <span class="card-value" style="color: #16a34a;">${activeCount}</span>
          </div>
          <div class="card">
            <span class="card-label">الأعضاء المحظورين</span>
            <span class="card-value" style="color: #dc2626;">${blockedCount}</span>
          </div>
          <div class="card">
            <span class="card-label">إجمالي الإنفاق</span>
            <span class="card-value" style="color: #0284c7;">${totalSpentAll.toFixed(0)} ج.م</span>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 40px;">#</th>
              <th>اسم العضو</th>
              <th>اسم المستخدم</th>
              <th>رقم الهاتف</th>
              <th>تاريخ الانضمام</th>
              <th>الطلبات</th>
              <th>إجمالي المشتريات</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            ${listToExport.map((usr, index) => {
              const usrOrders = orders.filter(o => o.userId === usr.id || o.customerPhone === usr.phone);
              const totalSpent = usrOrders.reduce((sum, o) => sum + o.total, 0);
              return `
                <tr>
                  <td>${index + 1}</td>
                  <td><strong>${usr.name}</strong></td>
                  <td dir="ltr" style="text-align: right;">@${usr.username}</td>
                  <td class="phone-num" style="text-align: right;">${usr.phone}</td>
                  <td>${usr.createdAt || 'جديد'}</td>
                  <td>${usrOrders.length} طلبات</td>
                  <td><strong>${totalSpent.toFixed(2)} ج.م</strong></td>
                  <td>
                    <span class="badge ${usr.status === 'active' ? 'badge-active' : 'badge-blocked'}">
                      ${usr.status === 'active' ? 'نشط' : 'محظور'}
                    </span>
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>

        <div class="footer-note">
          تم إنتاج هذا التقرير آلياً من نظام إدارة ${restaurantInfo.name || 'المطعم'} • ${currentDate}
        </div>

        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };
  const [isAddingNew, setIsAddingNew] = useState(false);
  
  // Custom side dishes (6 separate fields)
  const [sideDishes, setSideDishes] = useState<string[]>(['', '', '', '', '', '']);
  
  // Item form data
  const [formData, setFormData] = useState<Partial<MenuItem>>({
    name: '',
    description: '',
    price: 0,
    category: 'مشروبات ساخنة',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9IPr3LJXSkAwoMaVGqFmzlcNJm56rXBaBqlYlqr28I6yp_C8CyqHTabJO1v7ETYqhbF1Odgb7q-qJXLHfnnNDoz4ncAL2hMEb3cxTIN-Euh40d0iB_7dOtS3YM_j8yw5d3w5jt-DGkfQwjo-crsGk7DtW0_HLA-lPsmhmhHMG-pL2i7WAik0nYIIc-v3t5HdWKrTBnow8VA5Ep2Lt4mBhuWRLLiMJCI7LxdQBFiqZNotxf0x1w7okhB5n13hOQ5Kjun5I1hUH9_0',
    organic: false,
    popular: false,
    sideDishOptions: []
  });

  // Analytics calculations
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'delivered').length;
  const confirmedReservationsCount = reservations.filter(r => r.status === 'confirmed').length;

  const handleEditClick = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({ ...item });
    const options = item.sideDishOptions || [];
    const filledOptions = [...options, '', '', '', '', '', ''].slice(0, 6);
    setSideDishes(filledOptions);
    setIsAddingNew(false);
  };

  const handleAddNewClick = () => {
    setIsAddingNew(true);
    setEditingItem(null);
    setSideDishes(['', '', '', '', '', '']);
    setFormData({
      id: `custom_${Date.now()}`,
      name: '',
      description: '',
      price: 15,
      category: 'مشروبات ساخنة',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9IPr3LJXSkAwoMaVGqFmzlcNJm56rXBaBqlYlqr28I6yp_C8CyqHTabJO1v7ETYqhbF1Odgb7q-qJXLHfnnNDoz4ncAL2hMEb3cxTIN-Euh40d0iB_7dOtS3YM_j8yw5d3w5jt-DGkfQwjo-crsGk7DtW0_HLA-lPsmhmhHMG-pL2i7WAik0nYIIc-v3t5HdWKrTBnow8VA5Ep2Lt4mBhuWRLLiMJCI7LxdQBFiqZNotxf0x1w7okhB5n13hOQ5Kjun5I1hUH9_0',
      organic: false,
      popular: false,
      rating: 5.0,
      sideDishOptions: []
    });
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || formData.name.trim() === '') {
      alert('الرجاء إدخال اسم الصنف.');
      return;
    }
    
    if (formData.price === undefined || formData.price === null || isNaN(formData.price) || formData.price <= 0) {
      alert('الرجاء إدخال سعر صحيح أكبر من الصفر.');
      return;
    }

    const sideDishesList = sideDishes
      .map(s => s.trim())
      .filter(Boolean);

    const newItem: MenuItem = {
      id: formData.id || `custom_${Date.now()}`,
      name: formData.name,
      description: formData.description || '',
      price: formData.price,
      category: formData.category || 'مشروبات ساخنة',
      image: formData.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9IPr3LJXSkAwoMaVGqFmzlcNJm56rXBaBqlYlqr28I6yp_C8CyqHTabJO1v7ETYqhbF1Odgb7q-qJXLHfnnNDoz4ncAL2hMEb3cxTIN-Euh40d0iB_7dOtS3YM_j8yw5d3w5jt-DGkfQwjo-crsGk7DtW0_HLA-lPsmhmhHMG-pL2i7WAik0nYIIc-v3t5HdWKrTBnow8VA5Ep2Lt4mBhuWRLLiMJCI7LxdQBFiqZNotxf0x1w7okhB5n13hOQ5Kjun5I1hUH9_0',
      organic: formData.organic || false,
      popular: formData.popular || false,
      rating: formData.rating || 5.0,
      sideDishOptions: sideDishesList.length > 0 ? sideDishesList : undefined
    };

    if (isAddingNew) {
      onAddMenuItem(newItem);
      setIsAddingNew(false);
      alert(`تمت إضافة الصنف "${newItem.name}" بنجاح! يمكنك الآن تصفحه في قائمة الطعام.`);
    } else if (editingItem) {
      onUpdateMenuItem(newItem);
      setEditingItem(null);
      alert(`تم تحديث الصنف "${newItem.name}" بنجاح!`);
    }

    // Reset Form
    setSideDishes(['', '', '', '', '', '']);
    setFormData({
      name: '',
      description: '',
      price: 0,
      category: 'مشروبات ساخنة',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9IPr3LJXSkAwoMaVGqFmzlcNJm56rXBaBqlYlqr28I6yp_C8CyqHTabJO1v7ETYqhbF1Odgb7q-qJXLHfnnNDoz4ncAL2hMEb3cxTIN-Euh40d0iB_7dOtS3YM_j8yw5d3w5jt-DGkfQwjo-crsGk7DtW0_HLA-lPsmhmhHMG-pL2i7WAik0nYIIc-v3t5HdWKrTBnow8VA5Ep2Lt4mBhuWRLLiMJCI7LxdQBFiqZNotxf0x1w7okhB5n13hOQ5Kjun5I1hUH9_0',
      organic: false,
      popular: false,
      sideDishOptions: []
    });
  };

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-800 p-6 font-body-md" dir="rtl">
      {/* Top Admin Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-6 border-b border-slate-200">
        <div className="text-right">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm">لوحة الإدارة والمحاكاة</span>
          </div>
          <h1 className="font-headline-lg text-3xl font-extrabold text-slate-900 mt-1">لوحة تحكم سيلست الفاخرة</h1>
          <p className="text-slate-500 text-sm mt-0.5">تابع الطلبات، الحجوزات، وعدل قائمة المأكولات والمشروبات مباشرة.</p>
        </div>
        <div className="flex flex-wrap gap-3 self-start md:self-auto">
          <button
            onClick={() => setActiveSubTab('settings')}
            className="bg-amber-600 text-white font-bold px-5 py-3 rounded-full hover:bg-amber-700 shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Settings className="w-5 h-5" />
            <span>تعديل بيانات وتفاصيل المطعم ⚙️</span>
          </button>

          <button
            onClick={() => {
              if (window.confirm('هل أنت متأكد من رغبتك في إعادة تعيين كافة البيانات إلى الوضع الافتراضي ومسح الكاش؟ سيتم حذف جميع الطلبات والحجوزات التجريبية والمنيو المعدل.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
            className="bg-red-600 text-white font-bold px-5 py-3 rounded-full hover:bg-red-700 shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            title="مسح التخزين المؤقت وإعادة الضبط"
          >
            <RotateCcw className="w-5 h-5" />
            <span>إعادة تعيين ومسح الكاش</span>
          </button>

          <button
            onClick={() => {
              window.location.reload();
            }}
            className="bg-emerald-600 text-white font-bold px-5 py-3 rounded-full hover:bg-emerald-700 shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-5 h-5 animate-spin-hover" />
            <span>تحديث فوري للبيانات</span>
          </button>
          
          <button
            onClick={() => {
              window.location.hash = '';
              onClose();
            }}
            className="bg-primary text-white font-bold px-6 py-3 rounded-full hover:opacity-95 shadow-md active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
            <span>العودة لتطبيق العميل</span>
          </button>
        </div>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mt-6">
        {/* Restaurant Settings Quick Card */}
        <div 
          onClick={() => setActiveSubTab('settings')}
          className="bg-gradient-to-r from-amber-600 to-amber-700 text-white p-4 rounded-2xl shadow-sm flex items-center justify-between cursor-pointer hover:opacity-95 transition-all col-span-1 sm:col-span-2 lg:col-span-1"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0">
              <Settings className="w-5 h-5" />
            </div>
            <div className="text-right">
              <p className="text-[11px] text-white/80 font-bold">بيانات المطعم</p>
              <p className="text-xs font-extrabold text-white mt-0.5">تعديل الفرع والهاتف ⚙️</p>
            </div>
          </div>
        </div>

        {/* Revenue */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-green-600 shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400 font-bold">إجمالي الإيرادات</p>
            <p className="text-lg font-extrabold text-slate-900 mt-0.5">{totalRevenue.toFixed(2)} ج.م</p>
          </div>
        </div>

        {/* Live Orders */}
        <div 
          onClick={() => setActiveSubTab('orders')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 cursor-pointer hover:border-primary/40 transition-all"
        >
          <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-600 shrink-0">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400 font-bold">طلبات جارية</p>
            <p className="text-lg font-extrabold text-slate-900 mt-0.5">{activeOrdersCount} طلب</p>
          </div>
        </div>

        {/* Confirmed Tables */}
        <div 
          onClick={() => setActiveSubTab('reservations')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 cursor-pointer hover:border-primary/40 transition-all"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400 font-bold">طاولات مؤكدة</p>
            <p className="text-lg font-extrabold text-slate-900 mt-0.5">{confirmedReservationsCount} حجز</p>
          </div>
        </div>

        {/* Total Menu Items */}
        <div 
          onClick={() => setActiveSubTab('menu')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 cursor-pointer hover:border-primary/40 transition-all"
        >
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 shrink-0">
            <Coffee className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400 font-bold">أصناف القائمة</p>
            <p className="text-lg font-extrabold text-slate-900 mt-0.5">{menuItems.length} صنف</p>
          </div>
        </div>

        {/* Total Registered Users */}
        <div 
          onClick={() => setActiveSubTab('users')}
          className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 cursor-pointer hover:border-primary/40 transition-all"
        >
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div className="text-right">
            <p className="text-[11px] text-slate-400 font-bold">الأعضاء</p>
            <p className="text-lg font-extrabold text-slate-900 mt-0.5">{users.length} عضو</p>
          </div>
        </div>
      </div>

      {/* Main Layout Tabs */}
      <div className="flex flex-wrap gap-2 mt-8 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('orders')}
          className={`py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'orders' 
              ? 'bg-primary text-white shadow-sm' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>إدارة الطلبات ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reservations')}
          className={`py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'reservations' 
              ? 'bg-primary text-white shadow-sm' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>حجوزات الطاولات ({reservations.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('users')}
          className={`py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'users' 
              ? 'bg-primary text-white shadow-sm' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>الأعضاء والعملاء ({users.filter(u => u.role !== 'supervisor').length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('supervisors')}
          className={`py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'supervisors' 
              ? 'bg-purple-700 text-white shadow-sm ring-2 ring-purple-300' 
              : 'bg-purple-50 border border-purple-200 text-purple-900 hover:bg-purple-100'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-purple-600" />
          <span>إدارة المشرفين 👥 ({users.filter(u => u.role === 'supervisor').length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('menu')}
          className={`py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'menu' 
              ? 'bg-primary text-white shadow-sm' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Coffee className="w-4 h-4" />
          <span>إدارة وصناعة المنيو ({menuItems.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('categories')}
          className={`py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'categories' 
              ? 'bg-primary text-white shadow-sm' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>إدارة التصنيفات ({categories.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('promos')}
          className={`py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'promos' 
              ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300' 
              : 'bg-amber-50/80 border border-amber-200 text-amber-900 hover:bg-amber-100'
          }`}
        >
          <Ticket className="w-4 h-4 text-amber-600" />
          <span>أكواد الخصم والقسائم 🏷️ ({promoCodes.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('settings')}
          className={`py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'settings' 
              ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-300' 
              : 'bg-amber-50 border border-amber-300 text-amber-900 hover:bg-amber-100'
          }`}
        >
          <Settings className="w-4 h-4 text-amber-600 group-hover:text-amber-700" />
          <span>بيانات وإعدادات المطعم ⚙️</span>
        </button>

        <button
          onClick={() => setActiveSubTab('export')}
          className={`py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm transition-all cursor-pointer flex items-center gap-2 ${
            activeSubTab === 'export' 
              ? 'bg-primary text-white shadow-sm' 
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>تصدير ونقل البيانات ☁</span>
        </button>
      </div>

      {/* Subtab Contents */}
      <div className="mt-6">
        {/* ORDERS SUBTAB */}
        {activeSubTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-right">
            <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 text-sm">
              التحكم في حالات الطلبات الحالية (التغيير ينعكس فوراً عند العميل)
            </div>
            {orders.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="font-bold">لا توجد طلبات جارية بعد.</p>
                <p className="text-xs mt-1">قم بعمل طلب من شاشة السلة في التطبيق لتظهر هنا.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <div key={order.id} className="p-6 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono font-bold text-primary bg-primary/10 px-3 py-1 rounded-full text-xs">
                          {order.id}
                        </span>
                        <span className="text-xs text-slate-400 font-bold">
                          النوع: {order.deliveryType === 'home' ? 'توصيل منزلي' : 'استلام من الفرع'}
                        </span>
                        <span className="text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg font-bold">
                          اسم العميل: {order.customerName || 'عميل كافيه سيلست'}
                        </span>
                        <span className="text-xs text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg font-mono font-bold">
                          تليفون: {order.customerPhone || 'غير مسجل'}
                        </span>
                      </div>

                      <div className="text-sm font-semibold text-slate-800 space-y-1">
                        <span className="block mb-1 text-slate-500 text-xs font-bold">الأصناف المطلوبة والتعديلات:</span>
                        <ul className="list-disc list-inside space-y-1.5 pr-2">
                          {order.items.map((item, idx) => {
                            const extrasText = item.extras && item.extras.length > 0
                              ? item.extras.map(e => e.name).join('، ')
                              : '';
                            const breadText = item.breadType === 'brioche' 
                              ? 'خبز بريوش' 
                              : item.breadType === 'oat' 
                                ? 'خبز شوفان' 
                                : '';
                            const sideDishText = item.selectedSideDish ? `الطبق الجانبي: ${item.selectedSideDish}` : '';
                            const options = [sideDishText, breadText, extrasText].filter(Boolean).join(' • ');

                            return (
                              <li key={idx} className="text-slate-700 font-medium">
                                <span className="text-slate-900 font-bold">{item.menuItem.name}</span>
                                <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-md font-mono font-bold mr-1.5">x{item.quantity}</span>
                                {options && (
                                  <span className="text-xs text-secondary font-bold mr-2">({options})</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>

                      <p className="text-xs text-slate-400">
                        العنوان: <span className="font-bold text-slate-600">{order.address}</span>
                      </p>

                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">المجموع الكلي:</span>
                        <span className="text-sm font-extrabold text-emerald-700">{order.total.toFixed(2)} ج.م</span>
                      </div>
                    </div>

                    {/* Status Changer Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="text-xs font-bold text-slate-400">حالة الطلب:</div>
                      
                      {/* Status Badges with Clickable updates */}
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'received')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            order.status === 'received'
                              ? 'bg-blue-600 text-white shadow-sm scale-105'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          تم الاستلام
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'preparing')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            order.status === 'preparing'
                              ? 'bg-orange-600 text-white shadow-sm scale-105'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          قيد التحضير
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'on_the_way')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            order.status === 'on_the_way'
                              ? 'bg-purple-600 text-white shadow-sm scale-105'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          في الطريق
                        </button>
                        <button
                          onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                            order.status === 'delivered'
                              ? 'bg-green-600 text-white shadow-sm scale-105'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          تم التوصيل ✔
                        </button>
                        <button
                          onClick={() => setPrintingOrder(order)}
                          className="px-3 py-1.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                          title="طباعة الفاتورة للإيصال"
                        >
                          <Printer className="w-3.5 h-3.5 text-amber-400" />
                          <span>طباعة الفاتورة 🖨️</span>
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`هل أنت تأكد من حذف الطلب رقم (${order.id}) نهائياً؟`)) {
                              onDeleteOrder?.(order.id);
                            }
                          }}
                          className="px-3 py-1.5 rounded-xl font-bold text-xs bg-red-100 hover:bg-red-200 text-red-700 border border-red-200 transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                          title="حذف الطلب نهائياً"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>حذف الطلب 🗑️</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RESERVATIONS SUBTAB */}
        {activeSubTab === 'reservations' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-right">
            <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 text-sm">
              إدارة طلبات حجز الطاولات وتأكيد المقاعد
            </div>
            {reservations.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="font-bold">لا توجد حجوزات نشطة بعد.</p>
                <p className="text-xs mt-1">قم بعمل حجز طاولة من شاشة حجز الطاولة في التطبيق لتظهر هنا.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {reservations.map((res) => (
                  <div key={res.id} className="p-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4 hover:bg-slate-50/50 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-primary bg-primary/10 px-3 py-0.5 rounded-full text-xs">
                          {res.id}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                          res.status === 'confirmed' 
                            ? 'bg-green-100 text-green-700' 
                            : res.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {res.status === 'confirmed' ? 'حجز مؤكد' : res.status === 'cancelled' ? 'ملغي' : 'بانتظار التأكيد'}
                        </span>
                      </div>
                      <h3 className="font-bold text-base text-slate-800">حجز لـ {res.guests} أشخاص</h3>
                      <p className="text-xs text-slate-700 font-bold bg-slate-100/80 px-2 py-1 rounded-lg w-fit mt-1">
                        العميل: {res.customerName} • هاتف: {res.customerPhone}
                      </p>
                      <p className="text-xs text-slate-500 font-semibold mt-1">التاريخ والوقت: {res.date} • {res.timeSlot}</p>
                      {res.specialRequests && (
                        <p className="text-xs text-slate-400 italic mt-1">"الطلبات الخاصة: {res.specialRequests}"</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateReservationStatus(res.id, 'confirmed')}
                        className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl hover:bg-emerald-700 active:scale-95 transition-all flex items-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        تأكيد وقبول الحجز
                      </button>
                      <button
                        onClick={() => onUpdateReservationStatus(res.id, 'cancelled')}
                        className="bg-red-50 text-red-600 font-bold text-xs px-4 py-2 rounded-xl hover:bg-red-100 active:scale-95 transition-all flex items-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        إلغاء
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* USERS / MEMBERS MANAGEMENT SUBTAB */}
        {activeSubTab === 'users' && (
          <div className="space-y-6">
            {/* Header controls & search */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="البحث باسم العضو، رقم الهاتف، أو اسم المستخدم..."
                  value={userSearchQuery}
                  onChange={(e) => setUserSearchQuery(e.target.value)}
                  className="w-full py-2.5 pr-10 pl-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-primary"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const filtered = users.filter(u => 
                      u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                      u.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                      u.phone.includes(userSearchQuery)
                    );
                    handleDownloadUsersPDF(filtered);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                  title="تحميل كشف بيانات الأعضاء بصيغة PDF"
                >
                  <FileText className="w-4 h-4" />
                  <span>تحميل كشف الأعضاء PDF 📄</span>
                </button>

                <button
                  onClick={() => {
                    setIsAddingUser(true);
                    setEditingUser(null);
                    setUserFormData({ name: '', username: '', phone: '', password: '', notes: '' });
                  }}
                  className="bg-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة عضو جديد</span>
                </button>
              </div>
            </div>

            {/* Users List Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-right">
              {users.length === 0 ? (
                <div className="p-12 text-center text-slate-400 font-bold space-y-2">
                  <UserIcon className="w-12 h-12 mx-auto text-slate-300" />
                  <p>لا يوجد أعضاء مسجلين في الموقع حالياً</p>
                  <p className="text-xs text-slate-400">يمكن للعملاء التسجيل من واجهة الموقع أو يمكنك إضافتهم يدوياً من الأعلى</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500">
                        <th className="p-4">العضو</th>
                        <th className="p-4">رقم الهاتف</th>
                        <th className="p-4">تاريخ الانضمام</th>
                        <th className="p-4">النشاط (الطلبات والحجوزات)</th>
                        <th className="p-4">الحالة</th>
                        <th className="p-4 text-center">إجراءات التحكم</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
                      {users
                        .filter(u => 
                          u.name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          u.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
                          u.phone.includes(userSearchQuery)
                        )
                        .map((usr) => {
                          const userOrders = orders.filter(o => o.userId === usr.id || o.customerPhone === usr.phone);
                          const userReservations = reservations.filter(r => r.userId === usr.id || r.customerPhone === usr.phone);
                          const totalSpent = userOrders.reduce((sum, o) => sum + o.total, 0);

                          return (
                            <tr key={usr.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="p-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 font-extrabold flex items-center justify-center font-serif text-base border border-indigo-100">
                                    {usr.name.charAt(0)}
                                  </div>
                                  <div>
                                    <p className="font-bold text-slate-900 text-sm">{usr.name}</p>
                                    <p className="text-[11px] text-slate-400 font-mono">@{usr.username}</p>
                                  </div>
                                </div>
                              </td>

                              <td className="p-4 font-mono font-bold" dir="ltr">{usr.phone}</td>
                              <td className="p-4 text-slate-500">{usr.createdAt || 'جديد'}</td>

                              <td className="p-4">
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-lg text-[11px] ml-2">
                                    <ShoppingBag className="w-3 h-3" />
                                    {userOrders.length} طلبات ({totalSpent.toFixed(0)} ج.م)
                                  </span>
                                  <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 font-bold px-2 py-0.5 rounded-lg text-[11px]">
                                    <Calendar className="w-3 h-3" />
                                    {userReservations.length} حجوزات
                                  </span>
                                </div>
                              </td>

                              <td className="p-4">
                                <span className={`inline-flex items-center gap-1 font-bold px-2.5 py-1 rounded-full text-[11px] ${
                                  usr.status === 'active' 
                                    ? 'bg-emerald-100 text-emerald-700' 
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                  {usr.status === 'active' ? (
                                    <>
                                      <UserCheck className="w-3.5 h-3.5" />
                                      نشط
                                    </>
                                  ) : (
                                    <>
                                      <UserX className="w-3.5 h-3.5" />
                                      محظور
                                    </>
                                  )}
                                </span>
                              </td>

                              <td className="p-4">
                                <div className="flex items-center justify-center gap-1.5">
                                  {/* View Activity */}
                                  <button
                                    onClick={() => setViewingUserActivity(usr)}
                                    title="عرض سجل نشاط العضو"
                                    className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>

                                  {/* Edit user */}
                                  <button
                                    onClick={() => {
                                      setEditingUser(usr);
                                      setIsAddingUser(false);
                                      setUserFormData({
                                        name: usr.name,
                                        username: usr.username,
                                        phone: usr.phone,
                                        password: usr.password,
                                        notes: usr.notes || ''
                                      });
                                    }}
                                    title="تعديل بيانات العضو"
                                    className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors cursor-pointer"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>

                                  {/* Toggle Status (Block / Unblock) */}
                                  <button
                                    onClick={() => onToggleUserStatus(usr.id)}
                                    title={usr.status === 'active' ? 'حظر هذا الحساب' : 'تنشيط الحساب'}
                                    className={`p-2 rounded-xl transition-colors cursor-pointer ${
                                      usr.status === 'active'
                                        ? 'bg-amber-50 text-amber-600 hover:bg-amber-100'
                                        : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                    }`}
                                  >
                                    <Lock className="w-4 h-4" />
                                  </button>

                                  {/* Delete User */}
                                  <button
                                    onClick={() => {
                                      if (confirm(`هل أنت تأكد من حذف العضو "${usr.name}"؟`)) {
                                        onDeleteUser(usr.id);
                                      }
                                    }}
                                    title="حذف العضو نهائياً"
                                    className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MODAL: ADD / EDIT USER */}
        {(isAddingUser || editingUser) && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" dir="rtl">
            <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 text-right">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                  <UserIcon className="w-5 h-5 text-primary" />
                  <span>{editingUser ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}</span>
                </h3>
                <button
                  onClick={() => {
                    setIsAddingUser(false);
                    setEditingUser(null);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!userFormData.name || !userFormData.username || !userFormData.phone || !userFormData.password) {
                    alert('يرجى ملء جميع الحقول المطلوبة');
                    return;
                  }

                  if (editingUser) {
                    onUpdateUser({
                      ...editingUser,
                      name: userFormData.name.trim(),
                      username: userFormData.username.trim().toLowerCase(),
                      phone: userFormData.phone.trim(),
                      password: userFormData.password.trim(),
                      notes: userFormData.notes.trim()
                    });
                  } else {
                    const newUser: User = {
                      id: `usr_${Date.now()}`,
                      name: userFormData.name.trim(),
                      username: userFormData.username.trim().toLowerCase(),
                      phone: userFormData.phone.trim(),
                      password: userFormData.password.trim(),
                      createdAt: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'short', day: 'numeric' }),
                      status: 'active',
                      notes: userFormData.notes.trim()
                    };
                    onAddUser(newUser);
                  }

                  setIsAddingUser(false);
                  setEditingUser(null);
                }}
                className="space-y-3.5 text-xs"
              >
                <div>
                  <label className="block font-bold text-slate-700 mb-1">الاسم الكامل</label>
                  <input
                    type="text"
                    required
                    value={userFormData.name}
                    onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800"
                    placeholder="أحمد محمد"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">اسم المستخدم</label>
                  <input
                    type="text"
                    required
                    value={userFormData.username}
                    onChange={(e) => setUserFormData({ ...userFormData, username: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800"
                    placeholder="ahmed_mohamed"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">رقم الهاتف</label>
                  <input
                    type="tel"
                    required
                    value={userFormData.phone}
                    onChange={(e) => setUserFormData({ ...userFormData, phone: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800"
                    placeholder="01012345678"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">كلمة المرور</label>
                  <input
                    type="text"
                    required
                    value={userFormData.password}
                    onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800"
                    placeholder="••••••••"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">ملاحظات الإدارة (اختياري)</label>
                  <textarea
                    rows={2}
                    value={userFormData.notes}
                    onChange={(e) => setUserFormData({ ...userFormData, notes: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
                    placeholder="ملاحظات خاصة بالعضو..."
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingUser(false);
                      setEditingUser(null);
                    }}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-white font-bold text-xs shadow-md hover:bg-primary/90"
                  >
                    حفظ بيانات العضو
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* SUPERVISORS MANAGEMENT SUBTAB */}
        {activeSubTab === 'supervisors' && (
          <div className="space-y-6">
            {/* Header banner and search */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-purple-600" />
                  <span>إدارة المشرفين وصلاحيات التشغيل</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  يمكنك من هنا إدخال وإضافة حسابات المشرفين باسم مستخدم وكلمة مرور مخصصة لتمكينهم من الدخول وإدارة الطلبات والحجوزات.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {onOpenSupervisorDashboard && (
                  <button
                    onClick={onOpenSupervisorDashboard}
                    className="bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer active:scale-95"
                    title="فتح معاينة لوحة تحكم المشرفين"
                  >
                    <Key className="w-4 h-4 text-amber-400" />
                    <span>دخول لوحة المشرفين 🔑</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setIsAddingSupervisor(true);
                    setEditingSupervisor(null);
                    setSupervisorFormData({
                      name: '',
                      username: '',
                      phone: '',
                      password: '',
                      notes: '',
                      permissions: { orders: true, reservations: true, menu: true }
                    });
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة مشرف جديد</span>
                </button>
              </div>
            </div>

            {/* Search filter for supervisors */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="البحث باسم المشرف، اسم المستخدم، أو رقم الهاتف..."
                  value={supervisorSearchQuery}
                  onChange={(e) => setSupervisorSearchQuery(e.target.value)}
                  className="w-full py-2.5 pr-10 pl-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                />
                <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
              </div>

              <div className="text-xs font-extrabold text-purple-700 bg-purple-50 px-3 py-1.5 rounded-lg border border-purple-200">
                إجمالي المشرفين: {users.filter(u => u.role === 'supervisor').length} مشرف
              </div>
            </div>

            {/* Supervisors Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-right">
              {users.filter(u => u.role === 'supervisor').length === 0 ? (
                <div className="p-12 text-center space-y-3">
                  <ShieldCheck className="w-12 h-12 text-purple-300 mx-auto" />
                  <h4 className="font-extrabold text-slate-800 text-sm">لا يوجد مشرفين مضافين حالياً</h4>
                  <p className="text-xs text-slate-400">اضغط على زر "إضافة مشرف جديد" بالأعلى لإنشاء أول حساب مشرف وتحديد صلاحياته.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-xs font-bold">
                        <th className="p-4">اسم المشرف</th>
                        <th className="p-4">اسم المستخدم (Login)</th>
                        <th className="p-4">كلمة المرور</th>
                        <th className="p-4">الصلاحيات الممنوحة</th>
                        <th className="p-4">رقم الهاتف</th>
                        <th className="p-4">حالة الحساب</th>
                        <th className="p-4 text-center">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-800">
                      {users
                        .filter(u => u.role === 'supervisor')
                        .filter(sup => 
                          sup.name.toLowerCase().includes(supervisorSearchQuery.toLowerCase()) ||
                          sup.username.toLowerCase().includes(supervisorSearchQuery.toLowerCase()) ||
                          sup.phone.includes(supervisorSearchQuery)
                        )
                        .map(sup => {
                          const perms = sup.permissions || { orders: true, reservations: true, menu: true };
                          return (
                            <tr key={sup.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="p-4 font-bold flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center shrink-0">
                                  {sup.name.charAt(0)}
                                </span>
                                <div>
                                  <p className="font-extrabold text-slate-900">{sup.name}</p>
                                  <span className="text-[10px] text-purple-600 font-bold bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">
                                    مشرف معتمد
                                  </span>
                                </div>
                              </td>

                              <td className="p-4 font-mono font-bold text-slate-700" dir="ltr">
                                @{sup.username}
                              </td>

                              <td className="p-4 font-mono font-bold text-slate-900 bg-amber-50/50 rounded-lg">
                                <span className="px-2 py-1 bg-white border border-amber-200 rounded text-amber-900 font-bold">
                                  {sup.password}
                                </span>
                              </td>

                              <td className="p-4">
                                <div className="flex flex-wrap gap-1">
                                  {perms.orders && (
                                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-md">
                                      📦 الطلبات
                                    </span>
                                  )}
                                  {perms.reservations && (
                                    <span className="text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md">
                                      🪑 الحجوزات
                                    </span>
                                  )}
                                  {perms.menu && (
                                    <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md">
                                      🍔 المنيو
                                    </span>
                                  )}
                                  {!perms.orders && !perms.reservations && !perms.menu && (
                                    <span className="text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-md">
                                      ⚠️ بدون صلاحيات
                                    </span>
                                  )}
                                </div>
                              </td>

                              <td className="p-4 font-mono dir-ltr">{sup.phone}</td>

                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                                  sup.status === 'active' 
                                    ? 'bg-green-100 text-green-800 border border-green-200' 
                                    : 'bg-red-100 text-red-800 border border-red-200'
                                }`}>
                                  {sup.status === 'active' ? 'نشط 🟢' : 'محظور 🔴'}
                                </span>
                              </td>

                              <td className="p-4">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    onClick={() => {
                                      setEditingSupervisor(sup);
                                      setIsAddingSupervisor(false);
                                      setSupervisorFormData({
                                        name: sup.name,
                                        username: sup.username,
                                        phone: sup.phone,
                                        password: sup.password,
                                        notes: sup.notes || '',
                                        permissions: sup.permissions || { orders: true, reservations: true, menu: true }
                                      });
                                    }}
                                    className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
                                    title="تعديل بيانات ورخص المشرف"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>

                                  <button
                                    onClick={() => onToggleUserStatus(sup.id)}
                                    className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                      sup.status === 'active' 
                                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                                        : 'bg-green-100 text-green-800 hover:bg-green-200'
                                    }`}
                                    title={sup.status === 'active' ? 'حظر المشرف' : 'تفعيل المشرف'}
                                  >
                                    {sup.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                                  </button>

                                  <button
                                    onClick={() => {
                                      if (window.confirm(`هل أنت متأكد من حذف حساب المشرف "${sup.name}"؟`)) {
                                        onDeleteUser(sup.id);
                                      }
                                    }}
                                    className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors cursor-pointer"
                                    title="حذف المشرف"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* MODAL / FORM: ADD OR EDIT SUPERVISOR */}
            {(isAddingSupervisor || editingSupervisor) && (
              <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" dir="rtl">
                <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4 text-right max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-purple-600" />
                      <span>{editingSupervisor ? 'تعديل بيانات وصلاحيات المشرف' : 'إضافة مشرف جديد وتحديد الصلاحيات'}</span>
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingSupervisor(false);
                        setEditingSupervisor(null);
                      }}
                      className="p-1 rounded-full text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveSupervisorSubmit} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">اسم المشرف الكامل *</label>
                      <input
                        type="text"
                        required
                        value={supervisorFormData.name}
                        onChange={(e) => setSupervisorFormData({ ...supervisorFormData, name: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                        placeholder="أحمد علي (مشرف الوردية)"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">اسم المستخدم للدخول (Username) *</label>
                      <input
                        type="text"
                        required
                        value={supervisorFormData.username}
                        onChange={(e) => setSupervisorFormData({ ...supervisorFormData, username: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                        placeholder="super_ahmed"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">كلمة المرور (Password) *</label>
                      <input
                        type="text"
                        required
                        value={supervisorFormData.password}
                        onChange={(e) => setSupervisorFormData({ ...supervisorFormData, password: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl bg-amber-50 border border-amber-200 font-bold text-amber-900 focus:outline-none focus:border-amber-500"
                        placeholder="أدخل كلمة مرور قوية للمشرف..."
                      />
                    </div>

                    {/* PERMISSIONS SELECTION BLOCK */}
                    <div className="bg-purple-50/60 p-3.5 rounded-2xl border border-purple-100 space-y-2.5">
                      <label className="block font-extrabold text-purple-900 text-xs flex items-center gap-1.5">
                        <Key className="w-4 h-4 text-purple-600" />
                        <span>تحديد صلاحيات المشرف (Permissions):</span>
                      </label>
                      
                      <div className="space-y-2">
                        <label className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-purple-200/80 cursor-pointer hover:border-purple-400 transition-colors shadow-2xs">
                          <input
                            type="checkbox"
                            checked={supervisorFormData.permissions.orders}
                            onChange={(e) => setSupervisorFormData({
                              ...supervisorFormData,
                              permissions: { ...supervisorFormData.permissions, orders: e.target.checked }
                            })}
                            className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer"
                          />
                          <div className="text-right">
                            <span className="font-extrabold text-slate-900 text-xs block">
                              📦 إدارة الطلبات والتوصيل
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">
                              السماح للمشرف بمتابعة الطلبات وتغيير الحالات (تحضير، توصيل، مكتمل).
                            </span>
                          </div>
                        </label>

                        <label className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-purple-200/80 cursor-pointer hover:border-purple-400 transition-colors shadow-2xs">
                          <input
                            type="checkbox"
                            checked={supervisorFormData.permissions.reservations}
                            onChange={(e) => setSupervisorFormData({
                              ...supervisorFormData,
                              permissions: { ...supervisorFormData.permissions, reservations: e.target.checked }
                            })}
                            className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer"
                          />
                          <div className="text-right">
                            <span className="font-extrabold text-slate-900 text-xs block">
                              🪑 إدارة حجوزات الطاولات
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">
                              السماح للمشرف بمتابعة حجوزات الطاولات وتأكيد الحجز أو إلغائه.
                            </span>
                          </div>
                        </label>

                        <label className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-purple-200/80 cursor-pointer hover:border-purple-400 transition-colors shadow-2xs">
                          <input
                            type="checkbox"
                            checked={supervisorFormData.permissions.menu}
                            onChange={(e) => setSupervisorFormData({
                              ...supervisorFormData,
                              permissions: { ...supervisorFormData.permissions, menu: e.target.checked }
                            })}
                            className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer"
                          />
                          <div className="text-right">
                            <span className="font-extrabold text-slate-900 text-xs block">
                              🍔 إدارة قائمة الطعام والأصناف
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">
                              السماح للمشرف بتعديل توافر الأصناف وأسعارها وتحديث قائمة المنيو.
                            </span>
                          </div>
                        </label>

                        <label className="flex items-start gap-2.5 bg-white p-3 rounded-xl border border-purple-200/80 cursor-pointer hover:border-purple-400 transition-colors shadow-2xs">
                          <input
                            type="checkbox"
                            checked={supervisorFormData.permissions.promos ?? true}
                            onChange={(e) => setSupervisorFormData({
                              ...supervisorFormData,
                              permissions: { ...supervisorFormData.permissions, promos: e.target.checked }
                            })}
                            className="w-4 h-4 mt-0.5 rounded text-purple-600 focus:ring-purple-500 accent-purple-600 cursor-pointer"
                          />
                          <div className="text-right">
                            <span className="font-extrabold text-slate-900 text-xs block">
                              🏷️ إدارة القسائم وأكواد الخصم
                            </span>
                            <span className="text-[11px] text-slate-500 font-medium leading-tight block mt-0.5">
                              السماح للمشرف بإنشاء وتفعيل وإيقاف أكواد الخصم الترويجية.
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">رقم هاتف المشرف</label>
                      <input
                        type="tel"
                        value={supervisorFormData.phone}
                        onChange={(e) => setSupervisorFormData({ ...supervisorFormData, phone: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                        placeholder="01000000000"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">ملاحظات أو صِفة المشرف</label>
                      <input
                        type="text"
                        value={supervisorFormData.notes}
                        onChange={(e) => setSupervisorFormData({ ...supervisorFormData, notes: e.target.value })}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-purple-600"
                        placeholder="مشرف الصالة، مشرف المطبخ، أو وردية المساء..."
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingSupervisor(false);
                          setEditingSupervisor(null);
                        }}
                        className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md active:scale-95"
                      >
                        {editingSupervisor ? 'تحديث بيانات وصلاحيات المشرف' : 'حفظ وإنشاء حساب المشرف'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
        {viewingUserActivity && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" dir="rtl">
            <div className="bg-white rounded-3xl p-6 w-full max-w-2xl shadow-2xl space-y-4 text-right max-h-[85vh] flex flex-col">
              <div className="flex justify-between items-center pb-3 border-b border-slate-100 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center font-serif text-lg">
                    {viewingUserActivity.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-800 text-base">{viewingUserActivity.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">@{viewingUserActivity.username} • {viewingUserActivity.phone}</p>
                  </div>
                </div>

                <button
                  onClick={() => setViewingUserActivity(null)}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-5 text-xs">
                {/* Orders section */}
                <div className="space-y-2">
                  <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-amber-600" />
                    <span>طلبات العضو ({orders.filter(o => o.userId === viewingUserActivity.id || o.customerPhone === viewingUserActivity.phone).length})</span>
                  </h4>

                  {orders.filter(o => o.userId === viewingUserActivity.id || o.customerPhone === viewingUserActivity.phone).length === 0 ? (
                    <p className="text-slate-400 italic">لا توجد طلبات مسجلة لهذا العضو.</p>
                  ) : (
                    orders
                      .filter(o => o.userId === viewingUserActivity.id || o.customerPhone === viewingUserActivity.phone)
                      .map(ord => (
                        <div key={ord.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                          <div className="flex justify-between font-bold">
                            <span>طلب #{ord.id}</span>
                            <span className="text-primary">{ord.total.toFixed(0)} ر.س</span>
                          </div>
                          <div className="text-slate-600">
                            المنتجات: {ord.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join('، ')}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            العنوان: {ord.address || 'استلام من الفرع'} • الحالة: {ord.status}
                          </div>
                        </div>
                      ))
                  )}
                </div>

                {/* Table Reservations section */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span>حجوزات الطاولات ({reservations.filter(r => r.userId === viewingUserActivity.id || r.customerPhone === viewingUserActivity.phone).length})</span>
                  </h4>

                  {reservations.filter(r => r.userId === viewingUserActivity.id || r.customerPhone === viewingUserActivity.phone).length === 0 ? (
                    <p className="text-slate-400 italic">لا توجد حجوزات طاولات مسجلة لهذا العضو.</p>
                  ) : (
                    reservations
                      .filter(r => r.userId === viewingUserActivity.id || r.customerPhone === viewingUserActivity.phone)
                      .map(res => (
                        <div key={res.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center">
                          <div>
                            <p className="font-bold text-slate-800">حجز طاولة لـ {res.guests} أفراد</p>
                            <p className="text-[11px] text-slate-500">{res.date} • {res.timeSlot}</p>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            res.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {res.status === 'confirmed' ? 'مؤكد' : 'قيد الانتظار'}
                          </span>
                        </div>
                      ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* MENU MANAGEMENT SUBTAB */}
        {activeSubTab === 'menu' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left/Middle: Current Menu Items List */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-right">
              <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-700 text-sm">أصناف القائمة الحالية (اضغط لتعديل السعر والبيانات)</span>
                <button
                  onClick={handleAddNewClick}
                  className="bg-primary text-white font-bold text-xs px-3 py-1.5 rounded-full hover:bg-primary/95 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  إضافة صنف جديد
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
                {menuItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-12 h-12 rounded-full object-cover border border-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="text-right">
                        <h4 className="font-bold text-sm text-slate-800">{item.name}</h4>
                        <p className="text-[11px] text-slate-400 font-bold">{item.category}</p>
                        <p className="text-xs font-extrabold text-primary mt-0.5">{item.price.toFixed(2)} ج.م</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-primary hover:bg-primary/10 p-2 rounded-full transition-colors active:scale-95 cursor-pointer"
                        title="تعديل الصنف"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`هل أنت متأكد من رغبتك في حذف الصنف "${item.name}" نهائياً؟`)) {
                            onDeleteMenuItem(item.id);
                          }
                        }}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors active:scale-95 cursor-pointer"
                        title="حذف الصنف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Add/Edit Form Panel */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-right self-start">
              <h3 className="font-headline-md text-lg text-slate-800 font-bold border-b border-slate-100 pb-3 flex items-center gap-2">
                <Coffee className="w-5 h-5 text-primary" />
                {isAddingNew ? 'إضافة صنف جديد بالكامل' : editingItem ? `تعديل صنف: ${editingItem.name}` : 'اختر صنفاً لتعديله أو اضغط إضافة'}
              </h3>

              {(isAddingNew || editingItem) ? (
                <form onSubmit={handleSaveForm} className="space-y-4 mt-4">
                  {/* Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block">اسم الصنف</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ''}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-1 focus:ring-primary focus:border-primary text-right"
                      placeholder="مثال: إسبريسو مزدوج دبل"
                    />
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block">سعر الصنف (ج.م)</label>
                    <input
                      type="number"
                      required
                      min="1"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-1 focus:ring-primary focus:border-primary text-right"
                      placeholder="سعر الصنف"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block">التصنيف</label>
                    <select
                      value={formData.category || (categories[0] || 'مشروبات ساخنة')}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-1 focus:ring-primary focus:border-primary text-right bg-white"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block">وصف الصنف بالتفصيل</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary text-right min-h-[80px]"
                      placeholder="تفاصيل المكونات والنكهة..."
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-400 block">رابط صورة الصنف</label>
                    <input
                      type="text"
                      value={formData.image || ''}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary text-left"
                      placeholder="URL"
                    />
                  </div>

                  {/* Side Dishes Options (6 inputs) */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 block text-right">
                      خيارات الأطباق الجانبية (حتى 6 خيارات يختار منها العميل)
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <div key={index} className="flex gap-1.5 items-center">
                          <span className="text-[10px] text-slate-400 w-3 text-center">{index + 1}</span>
                          <input
                            type="text"
                            value={sideDishes[index] || ''}
                            onChange={(e) => {
                              const updated = [...sideDishes];
                              updated[index] = e.target.value;
                              setSideDishes(updated);
                            }}
                            className="w-full p-2.5 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-primary focus:border-primary text-right"
                            placeholder={`الخيار ${index + 1} (مثال: مكرونة وايت صوص)`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-600">
                      <input
                        type="checkbox"
                        checked={formData.organic || false}
                        onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                        className="rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>صنف عضوي (Organic)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-600">
                      <input
                        type="checkbox"
                        checked={formData.popular || false}
                        onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                        className="rounded text-primary focus:ring-primary h-4 w-4"
                      />
                      <span>صنف شائع (Popular)</span>
                    </label>
                  </div>

                  {/* Submit buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 transition-colors shadow-sm"
                    >
                      حفظ البيانات
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingNew(false);
                        setEditingItem(null);
                      }}
                      className="px-4 py-2.5 bg-slate-100 text-slate-500 font-bold text-xs rounded-xl hover:bg-slate-200 transition-colors"
                    >
                      إلغاء
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs space-y-2">
                  <Package className="w-10 h-10 text-slate-300 mx-auto" />
                  <p>اختر أي صنف من القائمة بالضغط على علامة القلم لتتمكن من تغيير سعره أو بياناته فوراً.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* CATEGORIES SUBTAB */}
        {activeSubTab === 'categories' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-right" dir="rtl">
            {/* Add Category Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 h-fit">
              <h3 className="font-bold text-base text-slate-800 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary" />
                إضافة تصنيف جديد
              </h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const input = (e.target as any).elements.categoryName;
                const val = input.value.trim();
                if (val) {
                  onAddCategory(val);
                  input.value = '';
                } else {
                  alert('الرجاء كتابة اسم التصنيف أولاً.');
                }
              }} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 block">اسم التصنيف الجديد *</label>
                  <input
                    type="text"
                    name="categoryName"
                    required
                    placeholder="مثال: عصائر طبيعية، مقبلات..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 text-sm focus:ring-1 focus:ring-primary focus:border-primary text-right"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-primary text-white font-bold text-xs rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  إضافة تصنيف جديد
                </button>
              </form>
            </div>

            {/* Existing Categories List */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-100 font-bold text-slate-700 text-sm">
                قائمة التصنيفات الحالية ({categories.length})
              </div>
              <div className="p-6">
                {categories.length === 0 ? (
                  <p className="text-center text-slate-400 text-sm py-8">لا توجد تصنيفات حالياً. أضف تصنيفاً لتبدأ!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {categories.map((cat) => {
                      const itemCount = menuItems.filter(item => item.category === cat).length;
                      return (
                        <div key={cat} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <div className="space-y-0.5">
                            <p className="font-bold text-slate-800 text-sm">{cat}</p>
                            <p className="text-xs text-slate-400">يحتوي على {itemCount} من المنتجات</p>
                          </div>
                          <button
                            onClick={() => {
                              if (window.confirm(`هل أنت متأكد من رغبتك في حذف تصنيف "${cat}" بالكامل؟ سيتم الاحتفاظ بالمنتجات ولكن لن تنتمي لهذا التصنيف.`)) {
                                onDeleteCategory(cat);
                              }
                            }}
                            className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors active:scale-95 cursor-pointer"
                            title="حذف التصنيف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* EXPORT SUBTAB */}
        {activeSubTab === 'export' && (
          <div className="space-y-6 text-right">
            {/* Header/Instructions */}
            <div className="bg-gradient-to-l from-orange-500/10 to-transparent p-6 rounded-2xl border border-orange-500/20">
              <div className="flex items-center gap-2 text-primary font-bold mb-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm">نقل البيانات بين بيئة التطوير وبيئة الإنتاج (celestesys.ai.studio)</span>
              </div>
              <p className="text-slate-700 text-sm leading-relaxed">
                جميع المنتجات والتصنيفات التي قمت بإضافتها أو تعديلها مخزنة حالياً في متصفحك المحلي (LocalStorage). 
                لكي تظهر هذه البيانات بشكل دائم وتلقائي لجميع زوار موقعك الرئيسي <strong className="text-primary font-extrabold">celestesys.ai.studio</strong>، اتبع الخطوات التالية:
              </p>
              <ol className="list-decimal list-inside text-xs text-slate-600 mt-4 space-y-2 font-semibold">
                <li>اضغط على زر <strong className="text-slate-800">"نسخ كود البيانات بالكامل"</strong> بالأسفل.</li>
                <li>أرسل الكود المنسوخ هنا في الشات مع المساعد الذكي واكتب له: <span className="text-primary bg-primary/5 px-1.5 py-0.5 rounded border border-primary/10">"تفضل كود البيانات التي قمت بإضافتها وتعديلها، يرجى كتابتها في المنيو الافتراضي بشكل دائم"</span>.</li>
                <li>سيقوم المساعد الذكي بكتابة الكود مباشرة داخل ملفات المشروع البرمجية، وبالتالي سيعمل تطبيقك على celestesys.ai.studio بكامل منتجاتك وتصنيفاتك الجديدة مدى الحياة للجميع!</li>
              </ol>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Copy / Export Section */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3">تصدير ونسخ بياناتك الحالية</h3>
                <p className="text-xs text-slate-400">هذا هو الكود البرمجي الذي يحتوي على كل منتجاتك وتصنيفاتك الحالية:</p>
                <textarea
                  readOnly
                  value={JSON.stringify({ categories, menuItems }, null, 2)}
                  className="w-full h-64 p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[10px] text-left"
                  dir="ltr"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify({ categories, menuItems }, null, 2));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 3000);
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
                    copied ? 'bg-green-600 text-white' : 'bg-primary text-white hover:opacity-90'
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span>{copied ? 'تم نسخ الكود بنجاح! ✔' : 'نسخ كود البيانات بالكامل'}</span>
                </button>
              </div>

              {/* Import / Paste Section */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
                <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3">استيراد بيانات من كود سابق (Backup Import)</h3>
                <p className="text-xs text-slate-400">إذا كان لديك كود بيانات سابق تريد استيراده وحفظه في هذا المتصفح، الصقه هنا:</p>
                <textarea
                  value={importJson}
                  onChange={(e) => {
                    setImportJson(e.target.value);
                    setImportError('');
                    setImportSuccess(false);
                  }}
                  placeholder='ضع كود الـ JSON هنا (مثال: { "categories": [], "menuItems": [] })'
                  className="w-full h-64 p-3 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[10px] text-left focus:ring-1 focus:ring-primary focus:border-primary"
                  dir="ltr"
                />
                
                {importError && (
                  <p className="text-xs text-red-500 font-bold bg-red-50 p-2.5 rounded-lg">{importError}</p>
                )}
                {importSuccess && (
                  <p className="text-xs text-green-600 font-bold bg-green-50 p-2.5 rounded-lg">تم استيراد وحفظ البيانات بنجاح! جاري إعادة التحميل...</p>
                )}

                <button
                  onClick={async () => {
                    try {
                      const parsed = JSON.parse(importJson);
                      if (!parsed.categories || !Array.isArray(parsed.categories) || !parsed.menuItems || !Array.isArray(parsed.menuItems)) {
                        setImportError('صيغة الكود غير صحيحة. يجب أن يحتوي على "categories" كصفوف و"menuItems" كصفوف.');
                        return;
                      }
                      
                      // Save to localStorage as fallback
                      localStorage.setItem('celeste_categories', JSON.stringify(parsed.categories));
                      localStorage.setItem('celeste_menu_items', JSON.stringify(parsed.menuItems));
                      
                      // POST to server so it is permanently stored on the server's data-store.json
                      try {
                        const res = await fetch('/api/state', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            categories: parsed.categories,
                            menuItems: parsed.menuItems
                          })
                        });
                        
                        if (!res.ok) {
                          throw new Error('Failed to save to server');
                        }
                      } catch (serverErr) {
                        console.error('Error syncing imported data to server:', serverErr);
                      }

                      setImportSuccess(true);
                      setImportJson('');
                      
                      setTimeout(() => {
                        window.location.reload();
                      }, 1500);
                    } catch (err) {
                      setImportError('الكود ليس بصيغة JSON صالحة. يرجى التأكد من نسخ ولصق الكود بالكامل بشكل صحيح.');
                    }
                  }}
                  className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-xs hover:bg-slate-900 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-5 h-5" />
                  <span>حفظ واستيراد البيانات الآن</span>
                </button>
              </div>
            </div>

            {/* PDF Report Export Card */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
              <h3 className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-600" />
                تصدير وتنزيل تقارير الأعضاء والعملاء (PDF Report)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                يمكنك من هنا تصدير سجل وحسابات جميع الأعضاء المسجلين في التطبيق والمطعم إلى ملف PDF احترافي يتضمن الإحصائيات، بيانات الاتصال، تاريخ التسجيل، ومجموع المشتريات للاحتفاظ بها.
              </p>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-slate-800">إجمالي قاعدة بيانات الأعضاء المسجلين</p>
                  <p className="text-sm font-extrabold text-primary mt-0.5">{users.length} عضو مسجل</p>
                </div>
                <button
                  onClick={() => handleDownloadUsersPDF()}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>تنزيل تقرير الأعضاء PDF 📄</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESTAURANT SETTINGS SUBTAB */}
        {activeSubTab === 'settings' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6 text-right">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  إدارة بيانات وتفاصيل الكافيه والمطعم
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  يمكنك من هنا تعديل كافة بيانات التواصل والفرع والعنوان لتظهر مباشرة في صفحة تتبع الطلبات والقائمة الجانبية للتطبيق.
                </p>
              </div>
            </div>

            {restaurantSavedMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span>تم حفظ وتحديث كافة بيانات المطعم بنجاح! تظهر التحديثات الآن للعملاء.</span>
              </motion.div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                onUpdateRestaurantInfo(restaurantFormData);
                setRestaurantSavedMessage(true);
                setTimeout(() => setRestaurantSavedMessage(false), 3500);
              }}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Building className="w-4 h-4 text-primary" />
                    اسم المطعم والمقهى:
                  </label>
                  <input
                    type="text"
                    value={restaurantFormData.name}
                    onChange={(e) => setRestaurantFormData({ ...restaurantFormData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="مثال: مطعم ومقهى سيلست Celeste"
                  />
                </div>

                {/* Branch */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    اسم الفرع:
                  </label>
                  <input
                    type="text"
                    value={restaurantFormData.branch}
                    onChange={(e) => setRestaurantFormData({ ...restaurantFormData, branch: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="مثال: فرع بورسعيد"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary" />
                    العنوان التفصيلي للفرع:
                  </label>
                  <input
                    type="text"
                    value={restaurantFormData.address}
                    onChange={(e) => setRestaurantFormData({ ...restaurantFormData, address: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="مثال: طرح البحر - مجمع المطاعم - فرع بورسعيد"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-primary" />
                    رقم تليفون التواصل والاتصال:
                  </label>
                  <input
                    type="text"
                    value={restaurantFormData.phone}
                    onChange={(e) => setRestaurantFormData({ ...restaurantFormData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold font-mono text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="مثال: 01012345678"
                  />
                </div>

                {/* Working Hours */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary" />
                    مواعيد وساعات العمل:
                  </label>
                  <input
                    type="text"
                    value={restaurantFormData.workingHours}
                    onChange={(e) => setRestaurantFormData({ ...restaurantFormData, workingHours: e.target.value })}
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="مثال: من 8:00 ص إلى 4:00 بعد منتصف الليل"
                  />
                </div>
              </div>

              {/* Live Preview Card */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-400 block mb-2">معاينة فورية للشريط كما يظهر للعميل:</span>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-primary">{restaurantFormData.name || 'اسم المطعم'}</h4>
                      <p className="text-[11px] text-slate-600 font-semibold">{restaurantFormData.address || 'العنوان'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700">
                      {restaurantFormData.phone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm active:scale-98 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ وتطبيق بيانات المطعم فوراً</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PROMO CODES MANAGEMENT SUBTAB */}
        {activeSubTab === 'promos' && (
          <PromoManagement
            promoCodes={promoCodes}
            onAddPromoCode={onAddPromoCode}
            onUpdatePromoCode={onUpdatePromoCode}
            onDeletePromoCode={onDeletePromoCode}
            onTogglePromoCodeStatus={onTogglePromoCodeStatus}
          />
        )}
      </div>

      {/* PRINTABLE INVOICE MODAL */}
      <AnimatePresence>
        {printingOrder && (
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) setPrintingOrder(null);
            }}
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto"
            dir="rtl"
          >
            <div className="w-full max-w-md my-8 relative">
              {/* Control Action Bar (Hidden when printing) */}
              <div className="no-print bg-slate-900 text-white p-3.5 rounded-t-3xl flex items-center justify-between border-b border-slate-800 shadow-lg">
                <div className="flex items-center gap-2">
                  <Printer className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-xs text-slate-200">معاينة وتأكيد طباعة الفاتورة</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => window.print()}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة الآن 🖨️</span>
                  </button>
                  <button
                    onClick={() => setPrintingOrder(null)}
                    className="flex items-center gap-1 px-3 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer active:scale-95"
                    title="إغلاق الفاتورة والخروج"
                  >
                    <X className="w-4 h-4 stroke-[2.5]" />
                    <span>إغلاق X</span>
                  </button>
                </div>
              </div>

              {/* RECEIPT PAPER CONTAINER (Printed via @media print) */}
              <div className="print-invoice-area bg-white text-slate-950 p-6 rounded-b-3xl shadow-2xl font-mono text-xs border border-slate-200 space-y-4">
                {/* Restaurant Header */}
                <div className="text-center space-y-1 pb-3 border-b-2 border-dashed border-slate-300">
                  <h2 className="text-xl font-black text-slate-900 tracking-wider uppercase">{restaurantInfo.name || 'مطعم سيلست'}</h2>
                  <p className="text-[11px] font-bold text-slate-600">Celeste Fine Dining & Cafe</p>
                  <p className="text-[10px] text-slate-500">فاتورة ضريبية مبسطة | SIMPLIFIED TAX INVOICE</p>
                  <p className="text-[10px] text-slate-500">رقم التسجيل الضريبي: 789-456-123 VAT</p>
                  {restaurantInfo.phone && <p className="text-[10px] text-slate-500" dir="ltr">Tel: {restaurantInfo.phone}</p>}
                </div>

                {/* Order Metadata */}
                <div className="space-y-1 text-[11px] pb-3 border-b-2 border-dashed border-slate-300">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-500">رقم الفاتورة:</span>
                    <span className="font-black text-slate-900">#{printingOrder.id.slice(0, 8)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-500">التاريخ والوقت:</span>
                    <span className="font-bold text-slate-900">{printingOrder.timestamps.received || new Date().toLocaleString('ar-EG')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-500">اسم العميل:</span>
                    <span className="font-black text-slate-900">{printingOrder.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-500">رقم الهاتف:</span>
                    <span className="font-bold text-slate-900" dir="ltr">{printingOrder.customerPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-500">نوع الطلب / العنوان:</span>
                    <span className="font-bold text-slate-900">{printingOrder.address || 'استلام من الفرع'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-500">حالة الطلب:</span>
                    <span className="font-black text-emerald-700">
                      {printingOrder.status === 'delivered' ? 'مكتمل ومدفوع ✔️' : 'مقبول / جاري التجهيز'}
                    </span>
                  </div>
                </div>

                {/* Table of Items */}
                <div className="space-y-2 pb-3 border-b-2 border-dashed border-slate-300">
                  <div className="flex justify-between font-black text-slate-900 text-[11px] border-b border-slate-200 pb-1">
                    <span className="flex-1">الصنف</span>
                    <span className="w-12 text-center">الكمية</span>
                    <span className="w-16 text-left">الإجمالي</span>
                  </div>

                  {printingOrder.items.map((item, idx) => (
                    <div key={idx} className="space-y-0.5">
                      <div className="flex justify-between font-bold text-slate-900 text-[11px]">
                        <span className="flex-1">{item.menuItem.name}</span>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <span className="w-16 text-left">{(item.menuItem.price * item.quantity).toFixed(2)}</span>
                      </div>
                      {item.selectedSideDishes && item.selectedSideDishes.length > 0 && (
                        <p className="text-[10px] text-slate-500 pr-2">
                          + {item.selectedSideDishes.join('، ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Summary Totals */}
                <div className="space-y-1.5 text-[11px] pb-3 border-b-2 border-dashed border-slate-300">
                  <div className="flex justify-between text-slate-600 font-bold">
                    <span>المجموع الفرعي (Subtotal):</span>
                    <span>{(printingOrder.total * 0.86).toFixed(2)} ج.م</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-bold">
                    <span>ضريبة القيمة المضافة 14% (VAT):</span>
                    <span>{(printingOrder.total * 0.14).toFixed(2)} ج.م</span>
                  </div>
                  <div className="flex justify-between text-slate-600 font-bold">
                    <span>رسوم الخدمة والتوصيل:</span>
                    <span>مجاناً 0.00 ج.م</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-slate-950 pt-2 border-t border-slate-300">
                    <span>الإجمالي النهائي (TOTAL):</span>
                    <span className="text-base font-black text-slate-950">{printingOrder.total.toFixed(2)} {restaurantInfo.currency}</span>
                  </div>
                </div>

                {/* Receipt Footer Message */}
                <div className="text-center space-y-2 pt-1">
                  <p className="font-extrabold text-slate-800 text-[11px]">شكراً لاختياركم {restaurantInfo.name}! ❤️</p>
                  <p className="text-[10px] text-slate-500">نتمنى لكم وجبة شهية - يسعدنا خدمتكم دائماً</p>
                  
                  {/* Simulated Receipt Barcode */}
                  <div className="pt-2 opacity-80 flex flex-col items-center">
                    <div className="h-8 w-48 bg-slate-900 rounded-xs flex items-center justify-around px-2">
                      <div className="w-1 h-full bg-white"></div>
                      <div className="w-2 h-full bg-white"></div>
                      <div className="w-0.5 h-full bg-white"></div>
                      <div className="w-3 h-full bg-white"></div>
                      <div className="w-1 h-full bg-white"></div>
                      <div className="w-2 h-full bg-white"></div>
                      <div className="w-0.5 h-full bg-white"></div>
                      <div className="w-2 h-full bg-white"></div>
                      <div className="w-1 h-full bg-white"></div>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400 mt-1">*{printingOrder.id.slice(0, 12)}*</span>
                  </div>
                </div>

                {/* Bottom Close Button (Hidden when printing) */}
                <div className="no-print pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setPrintingOrder(null)}
                    className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <X className="w-4 h-4 text-red-400 stroke-[3]" />
                    <span>إغلاق معاينة الفاتورة والخروج ✖</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
