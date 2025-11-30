import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService, CartItem } from '../../services/cart.service';
import { ModalService } from '../../services/modal.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-mc-black py-12 pt-24">
      <div class="container mx-auto px-6">
        <div class="mb-8">
          <h1 class="text-mc-4xl font-mc-bold text-mc-white mb-4 font-mc">Carrinho de Compras</h1>
        </div>

        <div *ngIf="cartItems.length === 0" class="text-center py-20">
          <svg class="w-24 h-24 mx-auto text-mc-gray-700 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h2 class="text-mc-2xl font-mc-bold text-mc-white mb-4 font-mc">Seu carrinho está vazio</h2>
          <p class="text-mc-text-tertiary mb-8 font-mc text-mc-base">Adicione cursos ao carrinho para continuar</p>
          <a routerLink="/masterclasses" class="inline-block bg-mc-red hover:bg-mc-button-primary-hover text-mc-white px-6 py-3 rounded-mc-md font-mc font-mc-semibold transition-colors">
            Explorar Masterclasses
          </a>
        </div>

        <div *ngIf="cartItems.length > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Cart Items -->
          <div class="lg:col-span-2 space-y-4">
            <div *ngFor="let item of cartItems" 
                 class="bg-mc-gray-900 rounded-mc-lg overflow-hidden flex flex-col md:flex-row">
              <div class="md:w-48 flex-shrink-0 aspect-video md:aspect-auto relative">
                <img [src]="item.thumbnail || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=90'" 
                     [alt]="item.title"
                     loading="lazy"
                     (error)="handleImageError($event)"
                     class="w-full h-full object-cover">
              </div>
              <div class="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div class="flex items-center mb-3">
                    <img [src]="item.mentorImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'" 
                         [alt]="item.mentor"
                         loading="lazy"
                         (error)="handleMentorImageError($event)"
                         class="w-10 h-10 rounded-full object-cover mr-3 border-2 border-mc-gray-700">
                    <p class="text-mc-text-tertiary font-mc text-mc-sm">{{ item.mentor }}</p>
                  </div>
                  <h3 class="text-mc-xl font-mc-semibold mb-2 font-mc text-mc-white">
                    {{ item.title }}
                  </h3>
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-mc-gray-700">
                  <span class="text-mc-white font-mc-bold text-mc-lg">R$ {{ item.price }}</span>
                  <button (click)="removeFromCart(item.id)" 
                          class="text-mc-text-tertiary hover:text-mc-red transition-colors font-mc text-mc-sm">
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-mc-gray-900 rounded-mc-lg p-6 sticky top-24">
              <h2 class="text-mc-xl font-mc-bold text-mc-white mb-6 font-mc">Resumo do Pedido</h2>
              
              <div class="space-y-4 mb-6">
                <div class="flex justify-between text-mc-text-secondary font-mc text-mc-base">
                  <span>Subtotal</span>
                  <span>R$ {{ getSubtotal() }}</span>
                </div>
                <div class="flex justify-between text-mc-text-secondary font-mc text-mc-base">
                  <span>Taxa de serviço</span>
                  <span>Grátis</span>
                </div>
                <div class="border-t border-mc-gray-700 pt-4 flex justify-between">
                  <span class="text-mc-white font-mc-bold text-mc-lg font-mc">Total</span>
                  <span class="text-mc-white font-mc-bold text-mc-2xl font-mc">R$ {{ getTotal() }}</span>
                </div>
              </div>

              <button (click)="checkout()" 
                      class="w-full bg-mc-red hover:bg-mc-button-primary-hover text-mc-white py-4 rounded-mc-md font-mc font-mc-semibold transition-colors mb-4">
                Finalizar Compra
              </button>

              <button (click)="clearCart()" 
                      class="w-full border-2 border-mc-gray-700 text-mc-text-tertiary hover:border-mc-gray-600 hover:text-mc-white py-3 rounded-mc-md font-mc font-mc-medium transition-colors">
                Limpar Carrinho
              </button>

              <div class="mt-6 pt-6 border-t border-mc-gray-700">
                <p class="text-mc-text-tertiary font-mc text-mc-xs text-center">
                  ✓ Garantia de 30 dias<br>
                  ✓ Acesso vitalício<br>
                  ✓ Certificado de conclusão
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCart();
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
    });
  }

  loadCart() {
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(id: number) {
    const item = this.cartItems.find(i => i.id === id);
    this.cartService.removeFromCart(id);
    if (item) {
      this.notificationService.info(`${item.title} removido do carrinho`);
    }
  }

  clearCart() {
    this.modalService.confirm(
      'Limpar Carrinho',
      'Tem certeza que deseja remover todos os itens do carrinho?',
      () => {
        this.cartService.clearCart();
        this.notificationService.info('Carrinho limpo');
      }
    );
  }

  getSubtotal(): number {
    return this.cartService.getCartTotal();
  }

  getTotal(): number {
    return this.cartService.getCartTotal();
  }

  checkout() {
    if (this.cartItems.length === 0) {
      this.notificationService.warning('Seu carrinho está vazio');
      return;
    }
    this.router.navigate(['/checkout']);
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

