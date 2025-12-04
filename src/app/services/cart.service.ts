import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  title: string;
  mentor: string;
  price: number;
  thumbnail: string;
  mentorImage: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  mentor: string;
  price: number;
  thumbnail: string;
  mentorImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private wishlistItems: WishlistItem[] = [];
  
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private wishlistSubject = new BehaviorSubject<WishlistItem[]>([]);

  cart$: Observable<CartItem[]> = this.cartSubject.asObservable();
  wishlist$: Observable<WishlistItem[]> = this.wishlistSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  // Cart Methods
  addToCart(item: CartItem): void {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (!existingItem) {
      this.cartItems.push(item);
      this.saveToStorage();
      this.cartSubject.next([...this.cartItems]);
    }
  }

  removeFromCart(id: string): void {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    this.saveToStorage();
    this.cartSubject.next([...this.cartItems]);
  }

  clearCart(): void {
    this.cartItems = [];
    this.saveToStorage();
    this.cartSubject.next([]);
  }

  getCartItems(): CartItem[] {
    return [...this.cartItems];
  }

  getCartCount(): number {
    return this.cartItems.length;
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  isInCart(id: string): boolean {
    return this.cartItems.some(item => item.id === id);
  }

  // Wishlist Methods
  addToWishlist(item: WishlistItem): void {
    const existingItem = this.wishlistItems.find(i => i.id === item.id);
    if (!existingItem) {
      this.wishlistItems.push(item);
      this.saveToStorage();
      this.wishlistSubject.next([...this.wishlistItems]);
    }
  }

  removeFromWishlist(id: string): void {
    this.wishlistItems = this.wishlistItems.filter(item => item.id !== id);
    this.saveToStorage();
    this.wishlistSubject.next([...this.wishlistItems]);
  }

  clearWishlist(): void {
    this.wishlistItems = [];
    this.saveToStorage();
    this.wishlistSubject.next([]);
  }

  getWishlistItems(): WishlistItem[] {
    return [...this.wishlistItems];
  }

  getWishlistCount(): number {
    return this.wishlistItems.length;
  }

  isInWishlist(id: string): boolean {
    return this.wishlistItems.some(item => item.id === id);
  }

  moveToCart(id: string): void {
    const item = this.wishlistItems.find(i => i.id === id);
    if (item) {
      this.addToCart(item);
      this.removeFromWishlist(id);
    }
  }

  // Storage Methods
  private saveToStorage(): void {
    localStorage.setItem('mentormatch_cart', JSON.stringify(this.cartItems));
    localStorage.setItem('mentormatch_wishlist', JSON.stringify(this.wishlistItems));
  }

  private loadFromStorage(): void {
    try {
      const cartData = localStorage.getItem('mentormatch_cart');
      const wishlistData = localStorage.getItem('mentormatch_wishlist');
      
      if (cartData) {
        const parsedCart: CartItem[] = JSON.parse(cartData);
        this.cartItems = parsedCart.map(item => ({ ...item, id: String(item.id) }));
        this.cartSubject.next([...this.cartItems]);
      }
      
      if (wishlistData) {
        const parsedWishlist: WishlistItem[] = JSON.parse(wishlistData);
        this.wishlistItems = parsedWishlist.map(item => ({ ...item, id: String(item.id) }));
        this.wishlistSubject.next([...this.wishlistItems]);
      }
    } catch (error) {
      console.error('Error loading cart/wishlist from storage:', error);
    }
  }
}






