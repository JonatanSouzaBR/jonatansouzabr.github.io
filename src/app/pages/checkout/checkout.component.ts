import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CartService, CartItem } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-mc-black py-12">
      <div class="container mx-auto px-6">
        <div class="mb-8">
          <h1 class="text-mc-4xl font-mc-bold text-mc-white mb-2 font-mc">Finalizar Compra</h1>
          <p class="text-mc-text-secondary font-mc text-mc-base">Complete seu pedido e comece a aprender hoje</p>
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
          <!-- Checkout Form -->
          <div class="lg:col-span-2">
            <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
              <!-- Informações Pessoais -->
              <div class="bg-mc-gray-900 rounded-mc-lg p-6 mb-6">
                <h2 class="text-mc-xl font-mc-bold text-mc-white mb-6 font-mc">Informações Pessoais</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Nome Completo *</label>
                    <input type="text" 
                           formControlName="fullName"
                           class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                           placeholder="Seu nome completo">
                    <div *ngIf="checkoutForm.get('fullName')?.invalid && checkoutForm.get('fullName')?.touched" 
                         class="text-mc-red text-mc-xs mt-1 font-mc">
                      Nome é obrigatório
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">E-mail *</label>
                    <input type="email" 
                           formControlName="email"
                           class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                           placeholder="seu@email.com">
                    <div *ngIf="checkoutForm.get('email')?.invalid && checkoutForm.get('email')?.touched" 
                         class="text-mc-red text-mc-xs mt-1 font-mc">
                      E-mail inválido
                    </div>
                  </div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Telefone *</label>
                    <input type="tel" 
                           formControlName="phone"
                           class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                           placeholder="(11) 99999-9999">
                    <div *ngIf="checkoutForm.get('phone')?.invalid && checkoutForm.get('phone')?.touched" 
                         class="text-mc-red text-mc-xs mt-1 font-mc">
                      Telefone é obrigatório
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">CPF *</label>
                    <input type="text" 
                           formControlName="cpf"
                           class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                           placeholder="000.000.000-00">
                    <div *ngIf="checkoutForm.get('cpf')?.invalid && checkoutForm.get('cpf')?.touched" 
                         class="text-mc-red text-mc-xs mt-1 font-mc">
                      CPF é obrigatório
                    </div>
                  </div>
                </div>
              </div>

              <!-- Método de Pagamento -->
              <div class="bg-mc-gray-900 rounded-mc-lg p-6 mb-6">
                <h2 class="text-mc-xl font-mc-bold text-mc-white mb-6 font-mc">Método de Pagamento</h2>
                
                <div class="space-y-4 mb-6">
                  <label class="flex items-center p-4 border-2 rounded-mc-md cursor-pointer transition-all"
                         [class.border-mc-red]="checkoutForm.get('paymentMethod')?.value === 'credit'"
                         [class.border-mc-gray-700]="checkoutForm.get('paymentMethod')?.value !== 'credit'"
                         [class.bg-mc-gray-800]="checkoutForm.get('paymentMethod')?.value === 'credit'">
                    <input type="radio" 
                           formControlName="paymentMethod" 
                           value="credit"
                           class="mr-4 w-5 h-5 text-mc-red focus:ring-mc-red">
                    <div class="flex-1">
                      <div class="flex items-center">
                        <svg class="w-6 h-6 text-mc-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        <span class="text-mc-white font-mc-semibold font-mc">Cartão de Crédito</span>
                      </div>
                    </div>
                  </label>

                  <label class="flex items-center p-4 border-2 rounded-mc-md cursor-pointer transition-all"
                         [class.border-mc-red]="checkoutForm.get('paymentMethod')?.value === 'pix'"
                         [class.border-mc-gray-700]="checkoutForm.get('paymentMethod')?.value !== 'pix'"
                         [class.bg-mc-gray-800]="checkoutForm.get('paymentMethod')?.value === 'pix'">
                    <input type="radio" 
                           formControlName="paymentMethod" 
                           value="pix"
                           class="mr-4 w-5 h-5 text-mc-red focus:ring-mc-red">
                    <div class="flex-1">
                      <div class="flex items-center">
                        <svg class="w-6 h-6 text-mc-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-mc-white font-mc-semibold font-mc">PIX</span>
                        <span class="ml-2 px-2 py-1 bg-mc-red text-mc-white text-mc-xs rounded-mc-sm font-mc font-mc-semibold">5% OFF</span>
                      </div>
                    </div>
                  </label>
                </div>

                <!-- Cartão de Crédito Form -->
                <div *ngIf="checkoutForm.get('paymentMethod')?.value === 'credit'" class="space-y-4">
                  <div>
                    <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Número do Cartão *</label>
                    <input type="text" 
                           formControlName="cardNumber"
                           maxlength="19"
                           (input)="formatCardNumber($event)"
                           class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                           placeholder="0000 0000 0000 0000">
                    <div *ngIf="checkoutForm.get('cardNumber')?.invalid && checkoutForm.get('cardNumber')?.touched" 
                         class="text-mc-red text-mc-xs mt-1 font-mc">
                      Número do cartão inválido
                    </div>
                  </div>

                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Validade *</label>
                      <input type="text" 
                             formControlName="cardExpiry"
                             maxlength="5"
                             (input)="formatExpiry($event)"
                             class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                             placeholder="MM/AA">
                    </div>
                    
                    <div>
                      <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">CVV *</label>
                      <input type="text" 
                             formControlName="cardCvv"
                             maxlength="4"
                             class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                             placeholder="123">
                    </div>
                  </div>

                  <div>
                    <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Nome no Cartão *</label>
                    <input type="text" 
                           formControlName="cardName"
                           class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                           placeholder="Nome como está no cartão">
                  </div>
                </div>

                <!-- PIX Info -->
                <div *ngIf="checkoutForm.get('paymentMethod')?.value === 'pix'" class="bg-mc-gray-800 rounded-mc-md p-6 border border-mc-gray-700">
                  <div class="flex items-start mb-4">
                    <svg class="w-6 h-6 text-mc-red mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                      <h3 class="text-mc-white font-mc-semibold mb-2 font-mc">Pagamento via PIX</h3>
                      <p class="text-mc-text-secondary text-mc-sm font-mc mb-4">
                        Após confirmar o pedido, você receberá o QR Code e a chave PIX para pagamento. 
                        O acesso será liberado automaticamente após a confirmação.
                      </p>
                      <div class="bg-mc-black rounded-mc-md p-4">
                        <p class="text-mc-text-tertiary text-mc-xs font-mc mb-2">Desconto aplicado:</p>
                        <p class="text-mc-red font-mc-bold text-mc-lg font-mc">-5% no valor total</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

          <!-- Order Summary -->
          <div class="lg:col-span-1">
            <div class="bg-mc-gray-900 rounded-mc-lg p-6 sticky top-24">
              <h2 class="text-mc-xl font-mc-bold text-mc-white mb-6 font-mc">Resumo do Pedido</h2>
              
              <!-- Cart Items -->
              <div class="space-y-4 mb-6">
                <div *ngFor="let item of cartItems" class="flex items-start gap-3 pb-4 border-b border-mc-gray-700">
                  <img [src]="item.thumbnail || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=90'" 
                       [alt]="item.title"
                       (error)="handleImageError($event)"
                       class="w-16 h-16 rounded-mc-md object-cover flex-shrink-0">
                  <div class="flex-1 min-w-0">
                    <h3 class="text-mc-white font-mc-semibold text-mc-sm mb-1 line-clamp-2 font-mc">{{ item.title }}</h3>
                    <p class="text-mc-text-tertiary text-mc-xs font-mc">{{ item.mentor }}</p>
                    <p class="text-mc-white font-mc-bold text-mc-sm mt-1 font-mc">R$ {{ item.price }}</p>
                  </div>
                </div>
              </div>

              <!-- Pricing -->
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-mc-text-secondary font-mc text-mc-sm">
                  <span>Subtotal</span>
                  <span>R$ {{ getSubtotal() }}</span>
                </div>
                <div class="flex justify-between text-mc-text-secondary font-mc text-mc-sm">
                  <span>Taxa de serviço</span>
                  <span>Grátis</span>
                </div>
                <div *ngIf="checkoutForm.get('paymentMethod')?.value === 'pix'" class="flex justify-between text-mc-red font-mc text-mc-sm">
                  <span>Desconto PIX (5%)</span>
                  <span>-R$ {{ getDiscount() }}</span>
                </div>
                <div class="border-t border-mc-gray-700 pt-4 flex justify-between">
                  <span class="text-mc-white font-mc-bold text-mc-lg font-mc">Total</span>
                  <span class="text-mc-white font-mc-bold text-mc-2xl font-mc">R$ {{ getTotal() }}</span>
                </div>
              </div>

              <!-- Security Badges -->
              <div class="mb-6 pt-6 border-t border-mc-gray-700">
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-5 h-5 text-mc-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-mc-text-tertiary text-mc-xs font-mc">Pagamento 100% seguro</span>
                </div>
                <div class="flex items-center gap-2 mb-3">
                  <svg class="w-5 h-5 text-mc-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-mc-text-tertiary text-mc-xs font-mc">Garantia de 30 dias</span>
                </div>
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-mc-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-mc-text-tertiary text-mc-xs font-mc">Acesso vitalício</span>
                </div>
              </div>

              <!-- Submit Button -->
              <button (click)="onSubmit()" 
                      [disabled]="checkoutForm.invalid || isProcessing"
                      class="w-full bg-mc-red hover:bg-mc-button-primary-hover disabled:bg-mc-gray-700 disabled:cursor-not-allowed text-mc-white py-4 rounded-mc-md font-mc font-mc-semibold transition-colors">
                <span *ngIf="!isProcessing">Finalizar Pagamento</span>
                <span *ngIf="isProcessing" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </span>
              </button>

              <a routerLink="/carrinho" class="block text-center text-mc-text-tertiary hover:text-mc-white transition-colors mt-4 font-mc text-mc-sm">
                ← Voltar ao carrinho
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = [];
  isProcessing = false;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      paymentMethod: ['credit', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(13)]],
      cardExpiry: ['', [Validators.required]],
      cardCvv: ['', [Validators.required, Validators.minLength(3)]],
      cardName: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCartItems();
    
    if (this.cartItems.length === 0) {
      this.router.navigate(['/carrinho']);
      return;
    }

    // Conditional validators for credit card
    this.checkoutForm.get('paymentMethod')?.valueChanges.subscribe(method => {
      if (method === 'credit') {
        this.checkoutForm.get('cardNumber')?.setValidators([Validators.required, Validators.minLength(13)]);
        this.checkoutForm.get('cardExpiry')?.setValidators([Validators.required]);
        this.checkoutForm.get('cardCvv')?.setValidators([Validators.required, Validators.minLength(3)]);
        this.checkoutForm.get('cardName')?.setValidators([Validators.required]);
      } else {
        this.checkoutForm.get('cardNumber')?.clearValidators();
        this.checkoutForm.get('cardExpiry')?.clearValidators();
        this.checkoutForm.get('cardCvv')?.clearValidators();
        this.checkoutForm.get('cardName')?.clearValidators();
      }
      this.checkoutForm.get('cardNumber')?.updateValueAndValidity();
      this.checkoutForm.get('cardExpiry')?.updateValueAndValidity();
      this.checkoutForm.get('cardCvv')?.updateValueAndValidity();
      this.checkoutForm.get('cardName')?.updateValueAndValidity();
    });
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formattedValue.length <= 19) {
      this.checkoutForm.patchValue({ cardNumber: formattedValue });
    }
  }

  formatExpiry(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.checkoutForm.patchValue({ cardExpiry: value });
  }

  getSubtotal(): number {
    return this.cartService.getCartTotal();
  }

  getDiscount(): number {
    if (this.checkoutForm.get('paymentMethod')?.value === 'pix') {
      return Math.round(this.getSubtotal() * 0.05);
    }
    return 0;
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    const discount = this.getDiscount();
    return subtotal - discount;
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.notificationService.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    this.isProcessing = true;

    // Simular processamento de pagamento
    setTimeout(() => {
      this.isProcessing = false;
      this.notificationService.success('Pagamento processado com sucesso!');
      
      // Limpar carrinho
      this.cartService.clearCart();
      
      // Redirecionar para página de sucesso (a ser criada)
      setTimeout(() => {
        this.router.navigate(['/']);
        this.notificationService.info('Acesso aos cursos liberado!');
      }, 1500);
    }, 2000);
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=90';
  }
}

