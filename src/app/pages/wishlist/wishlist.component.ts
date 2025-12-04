import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, WishlistItem } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-mc-black py-12">
      <div class="container mx-auto px-6">
        <div class="mb-8">
          <h1 class="text-mc-4xl font-mc-bold text-mc-white mb-4 font-mc">Lista de Desejos</h1>
          <p class="text-mc-text-secondary font-mc text-mc-base">Seus cursos favoritos estão aqui</p>
        </div>

        <div *ngIf="wishlistItems.length === 0" class="text-center py-20">
          <svg class="w-24 h-24 mx-auto text-mc-gray-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
          <h2 class="text-mc-2xl font-mc-bold text-mc-white mb-4 font-mc">Sua lista de desejos está vazia</h2>
          <p class="text-mc-text-tertiary mb-8 font-mc text-mc-base">Adicione cursos que você gostaria de fazer mais tarde</p>
          <a routerLink="/masterclasses" class="inline-block bg-mc-red hover:bg-mc-button-primary-hover text-mc-white px-6 py-3 rounded-mc-md font-mc font-mc-semibold transition-colors">
            Explorar Masterclasses
          </a>
        </div>

        <div *ngIf="wishlistItems.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let item of wishlistItems" 
               class="bg-mc-gray-900 rounded-mc-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-mc-slow group">
            <div class="aspect-video relative overflow-hidden">
              <img [src]="item.thumbnail || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=90'" 
                   [alt]="item.title"
                   loading="lazy"
                   (error)="handleImageError($event)"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="absolute inset-0 bg-mc-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                <svg class="w-20 h-20 text-mc-white opacity-70 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <button (click)="removeFromWishlist(item.id)" 
                      class="absolute top-4 right-4 bg-mc-black bg-opacity-75 hover:bg-opacity-90 p-2 rounded-full transition-all">
                <svg class="w-5 h-5 text-mc-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
              </button>
            </div>
            <div class="p-6">
              <div class="flex items-center mb-3">
                <img [src]="item.mentorImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'" 
                     [alt]="item.mentor"
                     loading="lazy"
                     (error)="handleMentorImageError($event)"
                     class="w-12 h-12 rounded-full object-cover mr-3 border-2 border-mc-gray-700">
                <p class="text-mc-text-tertiary font-mc text-mc-sm">{{ item.mentor }}</p>
              </div>
              <h3 class="text-mc-xl font-mc-semibold mb-2 group-hover:text-mc-gray-300 transition-colors font-mc text-mc-white">
                {{ item.title }}
              </h3>
              <div class="flex items-center justify-between pt-4 border-t border-mc-gray-700">
                <span class="text-mc-white font-mc-bold text-mc-lg">R$ {{ item.price }}</span>
                <div class="flex gap-2">
                  <button (click)="moveToCart(item.id)" 
                          class="bg-mc-red hover:bg-mc-button-primary-hover text-mc-white px-4 py-2 rounded-mc-md text-mc-sm font-mc font-mc-semibold transition-colors">
                    Adicionar ao Carrinho
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class WishlistComponent implements OnInit {
  wishlistItems: WishlistItem[] = [];

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.loadWishlist();
    this.cartService.wishlist$.subscribe(items => {
      this.wishlistItems = items;
    });
  }

  loadWishlist() {
    this.wishlistItems = this.cartService.getWishlistItems();
  }

  removeFromWishlist(id: string) {
    const item = this.wishlistItems.find(i => i.id === id);
    this.cartService.removeFromWishlist(id);
    if (item) {
      this.notificationService.info(`${item.title} removido da lista de desejos`);
    }
  }

  moveToCart(id: string) {
    const item = this.wishlistItems.find(i => i.id === id);
    this.cartService.moveToCart(id);
    if (item) {
      this.notificationService.success(`${item.title} adicionado ao carrinho!`);
    }
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=90';
  }

  handleMentorImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
  }
}

