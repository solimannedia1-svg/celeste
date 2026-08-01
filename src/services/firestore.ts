import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';
import { ref, uploadBytes, uploadString, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { MenuItem, Order, Reservation, User, RestaurantInfo, PromoCode } from '../types';
import { INITIAL_MENU_ITEMS, CATEGORIES, DEFAULT_RESTAURANT_INFO, INITIAL_PROMO_CODES } from '../data';

const COLLECTIONS = {
  MENU_ITEMS: 'menuItems',
  CATEGORIES: 'categories',
  ORDERS: 'orders',
  RESERVATIONS: 'reservations',
  USERS: 'users',
  PROMO_CODES: 'promoCodes',
  SETTINGS: 'settings'
};

// -------------------------------------------------------------
// Real-time Firestore Subscriptions (onSnapshot)
// -------------------------------------------------------------

export function subscribeToMenuItems(onUpdate: (items: MenuItem[]) => void, onError?: (err: any) => void) {
  const q = collection(db, COLLECTIONS.MENU_ITEMS);
  return onSnapshot(q, (snapshot) => {
    const items: MenuItem[] = [];
    snapshot.forEach((docSnap) => {
      items.push({ id: docSnap.id, ...docSnap.data() } as MenuItem);
    });
    onUpdate(items);
  }, (err) => {
    console.error("Firestore MenuItems error:", err);
    if (onError) onError(err);
  });
}

export function subscribeToCategories(onUpdate: (cats: string[]) => void, onError?: (err: any) => void) {
  const q = collection(db, COLLECTIONS.CATEGORIES);
  return onSnapshot(q, (snapshot) => {
    const cats: string[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.name && !cats.includes(data.name)) {
        cats.push(data.name);
      }
    });
    if (cats.length > 0) {
      onUpdate(cats);
    }
  }, (err) => {
    console.error("Firestore Categories error:", err);
    if (onError) onError(err);
  });
}

export function subscribeToOrders(onUpdate: (orders: Order[]) => void, onError?: (err: any) => void) {
  const q = collection(db, COLLECTIONS.ORDERS);
  return onSnapshot(q, (snapshot) => {
    const list: Order[] = [];
    snapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() } as Order);
    });
    list.sort((a, b) => b.id.localeCompare(a.id));
    onUpdate(list);
  }, (err) => {
    console.error("Firestore Orders error:", err);
    if (onError) onError(err);
  });
}

export function subscribeToReservations(onUpdate: (res: Reservation[]) => void, onError?: (err: any) => void) {
  const q = collection(db, COLLECTIONS.RESERVATIONS);
  return onSnapshot(q, (snapshot) => {
    const list: Reservation[] = [];
    snapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() } as Reservation);
    });
    list.sort((a, b) => b.id.localeCompare(a.id));
    onUpdate(list);
  }, (err) => {
    console.error("Firestore Reservations error:", err);
    if (onError) onError(err);
  });
}

export function subscribeToUsers(onUpdate: (users: User[]) => void, onError?: (err: any) => void) {
  const q = collection(db, COLLECTIONS.USERS);
  return onSnapshot(q, (snapshot) => {
    const list: User[] = [];
    snapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() } as User);
    });
    onUpdate(list);
  }, (err) => {
    console.error("Firestore Users error:", err);
    if (onError) onError(err);
  });
}

export function subscribeToPromoCodes(onUpdate: (promos: PromoCode[]) => void, onError?: (err: any) => void) {
  const q = collection(db, COLLECTIONS.PROMO_CODES);
  return onSnapshot(q, (snapshot) => {
    const list: PromoCode[] = [];
    snapshot.forEach((docSnap) => {
      list.push({ id: docSnap.id, ...docSnap.data() } as PromoCode);
    });
    onUpdate(list);
  }, (err) => {
    console.error("Firestore PromoCodes error:", err);
    if (onError) onError(err);
  });
}

export function subscribeToRestaurantInfo(onUpdate: (info: RestaurantInfo) => void, onError?: (err: any) => void) {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'restaurantInfo');
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      onUpdate(snapshot.data() as RestaurantInfo);
    }
  }, (err) => {
    console.error("Firestore RestaurantInfo error:", err);
    if (onError) onError(err);
  });
}

// -------------------------------------------------------------
// Direct Firestore Mutations
// -------------------------------------------------------------

export async function addMenuItem(item: MenuItem): Promise<void> {
  const docRef = doc(db, COLLECTIONS.MENU_ITEMS, item.id);
  await setDoc(docRef, item);
}

export async function updateMenuItem(item: MenuItem): Promise<void> {
  const docRef = doc(db, COLLECTIONS.MENU_ITEMS, item.id);
  await setDoc(docRef, item, { merge: true });
}

export async function deleteMenuItem(itemId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.MENU_ITEMS, itemId);
  await deleteDoc(docRef);
}

export async function addCategory(categoryName: string): Promise<void> {
  const docId = `cat_${encodeURIComponent(categoryName.trim())}`;
  const docRef = doc(db, COLLECTIONS.CATEGORIES, docId);
  await setDoc(docRef, { id: docId, name: categoryName.trim() });
}

export async function deleteCategory(categoryName: string): Promise<void> {
  const docId = `cat_${encodeURIComponent(categoryName.trim())}`;
  const docRef = doc(db, COLLECTIONS.CATEGORIES, docId);
  await deleteDoc(docRef);
}

export async function addOrder(order: Order): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ORDERS, order.id);
  await setDoc(docRef, order);
}

export async function updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const currentData = snapshot.data() as Order;
    const timestamps = {
      ...currentData.timestamps,
      [status]: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };
    await updateDoc(docRef, { status, timestamps });
  }
}

export async function deleteOrder(orderId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.ORDERS, orderId);
  await deleteDoc(docRef);
}

export async function addReservation(reservation: Reservation): Promise<void> {
  const docRef = doc(db, COLLECTIONS.RESERVATIONS, reservation.id);
  await setDoc(docRef, reservation);
}

export async function updateReservationStatus(resId: string, status: Reservation['status']): Promise<void> {
  const docRef = doc(db, COLLECTIONS.RESERVATIONS, resId);
  await updateDoc(docRef, { status });
}

export async function addUser(user: User): Promise<void> {
  const docRef = doc(db, COLLECTIONS.USERS, user.id);
  await setDoc(docRef, user);
}

export async function updateUser(user: User): Promise<void> {
  const docRef = doc(db, COLLECTIONS.USERS, user.id);
  await setDoc(docRef, user, { merge: true });
}

export async function deleteUser(userId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  await deleteDoc(docRef);
}

export async function toggleUserStatus(userId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.USERS, userId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const current = snapshot.data() as User;
    const newStatus = current.status === 'active' ? 'blocked' : 'active';
    await updateDoc(docRef, { status: newStatus });
  }
}

export async function addPromoCode(promo: PromoCode): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROMO_CODES, promo.id);
  await setDoc(docRef, promo);
}

export async function updatePromoCode(promo: PromoCode): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROMO_CODES, promo.id);
  await setDoc(docRef, promo, { merge: true });
}

export async function deletePromoCode(promoId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROMO_CODES, promoId);
  await deleteDoc(docRef);
}

export async function togglePromoCodeStatus(promoId: string): Promise<void> {
  const docRef = doc(db, COLLECTIONS.PROMO_CODES, promoId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    const current = snapshot.data() as PromoCode;
    await updateDoc(docRef, { isActive: !current.isActive });
  }
}

export async function updateRestaurantInfo(info: RestaurantInfo): Promise<void> {
  const docRef = doc(db, COLLECTIONS.SETTINGS, 'restaurantInfo');
  await setDoc(docRef, info, { merge: true });
}

export async function uploadImageToStorage(fileOrDataUrl: File | Blob | string): Promise<string> {
  if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('http')) {
    return fileOrDataUrl;
  }
  const filename = `images/${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const storageRef = ref(storage, filename);
  
  if (typeof fileOrDataUrl === 'string' && fileOrDataUrl.startsWith('data:')) {
    await uploadString(storageRef, fileOrDataUrl, 'data_url');
    return await getDownloadURL(storageRef);
  } else if (fileOrDataUrl instanceof File || fileOrDataUrl instanceof Blob) {
    await uploadBytes(storageRef, fileOrDataUrl);
    return await getDownloadURL(storageRef);
  }
  return typeof fileOrDataUrl === 'string' ? fileOrDataUrl : '';
}

// -------------------------------------------------------------
// Auto Initial Database Seeder
// -------------------------------------------------------------

export async function seedInitialDataIfEmpty(): Promise<void> {
  try {
    const menuSnap = await getDocs(collection(db, COLLECTIONS.MENU_ITEMS));
    if (menuSnap.empty) {
      console.log('Seeding initial menu items to Firestore...');
      const chunkSize = 100;
      for (let i = 0; i < INITIAL_MENU_ITEMS.length; i += chunkSize) {
        const batch = writeBatch(db);
        const chunk = INITIAL_MENU_ITEMS.slice(i, i + chunkSize);
        chunk.forEach(item => {
          const docRef = doc(db, COLLECTIONS.MENU_ITEMS, item.id);
          batch.set(docRef, item);
        });
        await batch.commit();
      }
    }

    const catSnap = await getDocs(collection(db, COLLECTIONS.CATEGORIES));
    if (catSnap.empty) {
      console.log('Seeding initial categories to Firestore...');
      const batch = writeBatch(db);
      CATEGORIES.forEach(cat => {
        const docId = `cat_${encodeURIComponent(cat.trim())}`;
        const docRef = doc(db, COLLECTIONS.CATEGORIES, docId);
        batch.set(docRef, { id: docId, name: cat });
      });
      await batch.commit();
    }

    const promoSnap = await getDocs(collection(db, COLLECTIONS.PROMO_CODES));
    if (promoSnap.empty) {
      console.log('Seeding initial promo codes to Firestore...');
      const batch = writeBatch(db);
      INITIAL_PROMO_CODES.forEach(promo => {
        const docRef = doc(db, COLLECTIONS.PROMO_CODES, promo.id);
        batch.set(docRef, promo);
      });
      await batch.commit();
    }

    const settingsDoc = await getDoc(doc(db, COLLECTIONS.SETTINGS, 'restaurantInfo'));
    if (!settingsDoc.exists()) {
      console.log('Seeding initial restaurant info to Firestore...');
      await setDoc(doc(db, COLLECTIONS.SETTINGS, 'restaurantInfo'), DEFAULT_RESTAURANT_INFO);
    }
  } catch (err) {
    console.error('Error seeding initial data to Firestore:', err);
  }
}
