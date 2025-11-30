import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

interface MembershipPlan {
  id: string;
  name: string;
  price: number;
  devices: number;
  offlineMode: boolean;
  bestValue?: boolean;
  features: string[];
}

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-mc-black">
      <!-- Header with Progress Steps -->
      <header class="sticky top-0 z-50 bg-mc-black border-b border-mc-gray-800">
        <div class="container mx-auto px-6 py-4">
          <div class="flex items-center justify-between">
            <!-- Logo -->
            <a routerLink="/" class="mentormatch-logo-chanel cursor-pointer">
              <span class="logo-text-chanel">MentorMatch</span>
            </a>

            <!-- Progress Steps -->
            <div class="hidden md:flex items-center space-x-8">
              <div class="flex items-center">
                <div class="flex items-center">
                  <div [class.bg-green-500]="currentStep >= 1" 
                       [class.bg-mc-gray-700]="currentStep < 1"
                       class="w-8 h-8 rounded-full flex items-center justify-center text-white font-mc font-mc-semibold text-sm">
                    <span *ngIf="currentStep > 1">✓</span>
                    <span *ngIf="currentStep === 1">1</span>
                  </div>
                  <div [class.text-green-500]="currentStep >= 1" 
                       [class.text-mc-gray-500]="currentStep < 1"
                       class="ml-3 font-mc font-mc-semibold text-sm">Plano</div>
                </div>
              </div>
              <div class="w-12 h-0.5 bg-mc-gray-700"></div>
              <div class="flex items-center">
                <div [class.bg-green-500]="currentStep >= 2" 
                     [class.bg-mc-gray-700]="currentStep < 2"
                     class="w-8 h-8 rounded-full flex items-center justify-center text-white font-mc font-mc-semibold text-sm">
                  <span *ngIf="currentStep > 2">✓</span>
                  <span *ngIf="currentStep <= 2">2</span>
                </div>
                <div [class.text-green-500]="currentStep >= 2" 
                     [class.text-mc-gray-500]="currentStep < 2"
                     class="ml-3 font-mc font-mc-semibold text-sm">Conta</div>
              </div>
              <div class="w-12 h-0.5 bg-mc-gray-700"></div>
              <div class="flex items-center">
                <div [class.bg-green-500]="currentStep >= 3" 
                     [class.bg-mc-gray-700]="currentStep < 3"
                     class="w-8 h-8 rounded-full flex items-center justify-center text-white font-mc font-mc-semibold text-sm">
                  <span *ngIf="currentStep > 3">✓</span>
                  <span *ngIf="currentStep <= 3">3</span>
                </div>
                <div [class.text-green-500]="currentStep >= 3" 
                     [class.text-mc-gray-500]="currentStep < 3"
                     class="ml-3 font-mc font-mc-semibold text-sm">Pagamento</div>
              </div>
            </div>

            <!-- Login Link -->
            <a href="#" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm font-mc-semibold">
              Entrar
            </a>
          </div>
        </div>
      </header>


      <!-- Step 1: Membership Selection -->
      <div *ngIf="currentStep === 1" class="py-12 md:py-16">
        <div class="container mx-auto px-6 max-w-6xl">
          <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-mc-bold text-mc-white mb-4 font-mc">
              Escolha um plano anual
            </h1>
            <p class="text-mc-text-secondary text-lg font-mc">
              Todos os planos incluem garantia de satisfação de 30 dias.
            </p>
          </div>

          <!-- Membership Plans -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div *ngFor="let plan of membershipPlans" 
                 (click)="selectPlan(plan.id)"
                 [class.border-mc-red]="selectedPlanId === plan.id"
                 [class.border-mc-gray-700]="selectedPlanId !== plan.id"
                 class="bg-mc-gray-900 rounded-mc-lg p-8 border-2 cursor-pointer hover:border-mc-gray-600 transition-all relative">
              <!-- Best Value Badge -->
              <div *ngIf="plan.bestValue" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span class="bg-mc-black text-mc-white px-4 py-1 rounded-full text-xs font-mc font-mc-semibold uppercase">
                  Melhor Custo-Benefício
                </span>
              </div>

              <h3 class="text-2xl font-mc-bold text-mc-white mb-6 font-mc">{{ plan.name }}</h3>
              
              <!-- Features -->
              <div class="mb-6 space-y-3">
                <div class="flex items-center text-mc-text-secondary font-mc text-sm">
                  <span>{{ plan.devices }} dispositivo{{ plan.devices > 1 ? 's' : '' }}</span>
                </div>
                <div class="flex items-center text-mc-text-secondary font-mc text-sm">
                  <span *ngIf="plan.offlineMode">✓ Modo offline</span>
                  <span *ngIf="!plan.offlineMode">✗ Sem modo offline</span>
                </div>
              </div>

              <!-- Pricing -->
              <div class="mb-6">
                <div class="flex items-baseline">
                  <span class="text-3xl font-mc-bold text-mc-white font-mc">R$ {{ plan.price }}</span>
                </div>
                <div class="text-mc-text-secondary text-sm font-mc mt-2">
                  Preço mensal (cobrado anualmente)
                </div>
              </div>

              <!-- Device Count -->
              <div class="mb-6 pt-6 border-t border-mc-gray-700">
                <div class="text-mc-text-secondary text-sm font-mc mb-2">
                  Dispositivos que você pode assistir ao mesmo tempo
                </div>
                <div class="text-2xl font-mc-bold text-mc-white font-mc">{{ plan.devices }}</div>
                <div class="text-mc-text-secondary text-sm font-mc mt-1">
                  Compartilhe com sua família.
                </div>
              </div>

              <!-- Select Button -->
              <button [class.bg-mc-red]="selectedPlanId === plan.id"
                      [class.bg-mc-gray-700]="selectedPlanId !== plan.id"
                      [class.text-mc-white]="selectedPlanId === plan.id"
                      class="w-full py-3 rounded-mc-md font-mc font-mc-semibold transition-colors">
                {{ selectedPlanId === plan.id ? 'Selecionado' : 'Selecionar' }}
              </button>
            </div>
          </div>

          <!-- Feature Comparison -->
          <div class="bg-mc-gray-900 rounded-mc-lg p-8 mb-8">
            <h2 class="text-xl font-mc-bold text-mc-white mb-6 font-mc">Comparativo de Recursos</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-mc-gray-700">
                    <th class="text-left py-4 text-mc-text-secondary font-mc font-mc-semibold">Recursos</th>
                    <th class="text-center py-4 text-mc-white font-mc font-mc-semibold w-32">Standard</th>
                    <th class="text-center py-4 text-mc-white font-mc font-mc-semibold w-32">Plus</th>
                    <th class="text-center py-4 text-mc-white font-mc font-mc-semibold w-32">Premium</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-mc-gray-700">
                    <td class="py-4 text-mc-text-secondary font-mc">Dispositivos simultâneos</td>
                    <td class="text-center py-4 text-mc-white font-mc">1</td>
                    <td class="text-center py-4 text-mc-white font-mc">2</td>
                    <td class="text-center py-4 text-mc-white font-mc">6</td>
                  </tr>
                  <tr class="border-b border-mc-gray-700">
                    <td class="py-4 text-mc-text-secondary font-mc">Download para offline</td>
                    <td class="text-center py-4 text-mc-text-tertiary font-mc">✗</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                  </tr>
                  <tr class="border-b border-mc-gray-700">
                    <td class="py-4 text-mc-text-secondary font-mc">Qualidade de vídeo</td>
                    <td class="text-center py-4 text-mc-white font-mc">HD</td>
                    <td class="text-center py-4 text-mc-white font-mc">Full HD</td>
                    <td class="text-center py-4 text-mc-white font-mc">4K Ultra HD</td>
                  </tr>
                  <tr class="border-b border-mc-gray-700">
                    <td class="py-4 text-mc-text-secondary font-mc">Certificados de conclusão</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                  </tr>
                  <tr class="border-b border-mc-gray-700">
                    <td class="py-4 text-mc-text-secondary font-mc">Suporte prioritário</td>
                    <td class="text-center py-4 text-mc-text-tertiary font-mc">✗</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                  </tr>
                  <tr class="border-b border-mc-gray-700">
                    <td class="py-4 text-mc-text-secondary font-mc">Eventos exclusivos</td>
                    <td class="text-center py-4 text-mc-text-tertiary font-mc">✗</td>
                    <td class="text-center py-4 text-mc-text-tertiary font-mc">✗</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                  </tr>
                  <tr class="border-b border-mc-gray-700">
                    <td class="py-4 text-mc-text-secondary font-mc">Mentoria personalizada</td>
                    <td class="text-center py-4 text-mc-text-tertiary font-mc">✗</td>
                    <td class="text-center py-4 text-mc-text-tertiary font-mc">✗</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                  </tr>
                  <tr>
                    <td class="py-4 text-mc-text-secondary font-mc">Compartilhamento familiar</td>
                    <td class="text-center py-4 text-mc-text-tertiary font-mc">✗</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                    <td class="text-center py-4 text-green-500 font-mc">✓</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Continue Button -->
          <div class="text-center">
            <button (click)="goToNextStep()" 
                    [disabled]="!selectedPlanId"
                    class="bg-mc-red hover:bg-mc-button-primary-hover disabled:bg-mc-gray-700 disabled:cursor-not-allowed text-mc-white px-12 py-4 rounded-mc-md font-mc font-mc-semibold text-lg transition-colors">
              Continuar
            </button>
          </div>
        </div>
      </div>

      <!-- Step 2: Create Account -->
      <div *ngIf="currentStep === 2" class="py-12 md:py-16">
        <div class="container mx-auto px-6 max-w-2xl">
          <div class="bg-mc-gray-900 rounded-mc-lg p-8 md:p-12">
            <!-- Back Button -->
            <button (click)="goToPreviousStep()" 
                    class="text-mc-text-secondary hover:text-mc-white mb-8 flex items-center font-mc text-sm">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Voltar
            </button>

            <h1 class="text-3xl md:text-4xl font-mc-bold text-mc-white mb-4 font-mc">
              Suas aulas estão esperando
            </h1>
            <p class="text-mc-text-secondary mb-8 font-mc">
              Crie uma conta para começar. Você está a apenas um passo de distância.
            </p>


            <form [formGroup]="accountForm" (ngSubmit)="onAccountSubmit()">
              <!-- Social Sign Up -->
              <div class="space-y-3 mb-6">
                <button type="button" 
                        class="w-full bg-mc-white text-mc-black py-3 rounded-mc-md font-mc font-mc-semibold hover:bg-mc-gray-200 transition-colors flex items-center justify-center">
                  <svg class="w-5 h-5 mr-3" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Criar Conta com Google
                </button>
                <button type="button" 
                        class="w-full bg-mc-white text-mc-black py-3 rounded-mc-md font-mc font-mc-semibold hover:bg-mc-gray-200 transition-colors flex items-center justify-center">
                  <svg class="w-5 h-5 mr-3" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  Criar Conta com Facebook
                </button>
              </div>

              <div class="relative my-6">
                <div class="absolute inset-0 flex items-center">
                  <div class="w-full border-t border-mc-gray-700"></div>
                </div>
                <div class="relative flex justify-center text-sm">
                  <span class="px-2 bg-mc-gray-900 text-mc-text-secondary font-mc">ou</span>
                </div>
              </div>

              <!-- Email Form -->
              <div class="mb-6">
                <label class="block text-mc-white font-mc font-mc-semibold mb-2">
                  Seu endereço de e-mail *
                </label>
                <input type="email" 
                       formControlName="email"
                       placeholder="Seu endereço de e-mail"
                       class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red transition-colors font-mc">
                <div *ngIf="accountForm.get('email')?.invalid && accountForm.get('email')?.touched" 
                     class="text-mc-red text-sm mt-1 font-mc">
                  E-mail inválido
                </div>
              </div>

              <div class="mb-6">
                <label class="flex items-center">
                  <input type="checkbox" 
                         formControlName="keepMeUpdated"
                         class="mr-3 w-4 h-4 text-mc-red focus:ring-mc-red">
                  <span class="text-mc-text-secondary text-sm font-mc">
                    Mantenha-me atualizado sobre eventos e produtos MentorMatch.
                  </span>
                </label>
              </div>

              <!-- Terms -->
              <p class="text-mc-text-secondary text-xs mb-6 font-mc">
                Ao clicar em "Criar Conta com Google", "Criar Conta com Facebook" ou ao compartilhar seu e-mail, você concorda com nossos 
                <a href="#" class="text-mc-red hover:underline">Termos de Serviço</a> e 
                <a href="#" class="text-mc-red hover:underline">Política de Privacidade</a>.
              </p>

              <!-- Continue Button -->
              <button type="submit" 
                      [disabled]="accountForm.invalid || isSubmitting"
                      class="w-full bg-mc-red hover:bg-mc-button-primary-hover disabled:bg-mc-gray-700 disabled:cursor-not-allowed text-mc-white py-4 rounded-mc-md font-mc font-mc-semibold text-lg transition-colors">
                <span *ngIf="!isSubmitting">Continuar</span>
                <span *ngIf="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Step 3: Payment -->
      <div *ngIf="currentStep === 3" class="py-12 md:py-16">
        <div class="container mx-auto px-6 max-w-4xl">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Payment Form -->
            <div class="lg:col-span-2">
              <!-- Back Button -->
              <button (click)="goToPreviousStep()" 
                      class="text-mc-text-secondary hover:text-mc-white mb-8 flex items-center font-mc text-sm">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Voltar
              </button>

              <div class="bg-mc-gray-900 rounded-mc-lg p-8 mb-6">
                <h2 class="text-2xl font-mc-bold text-mc-white mb-6 font-mc">
                  Escolha como pagar
                </h2>
                <p class="text-mc-text-secondary mb-8 font-mc">
                  Seu pagamento é 100% seguro e criptografado.
                </p>

                <form [formGroup]="paymentForm" (ngSubmit)="onPaymentSubmit()">
                  <!-- Payment Method Selection -->
                  <div class="space-y-4 mb-8">
                    <label (click)="selectPaymentMethod('credit')"
                           [class.border-mc-red]="paymentForm.get('paymentMethod')?.value === 'credit'"
                           [class.border-mc-gray-700]="paymentForm.get('paymentMethod')?.value !== 'credit'"
                           class="flex items-center justify-between p-4 border-2 rounded-mc-md cursor-pointer hover:border-mc-gray-600 transition-all bg-mc-gray-800">
                      <div class="flex items-center">
                        <svg class="w-6 h-6 text-mc-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                        </svg>
                        <span class="text-mc-white font-mc font-mc-semibold">Cartão de Crédito</span>
                        <div class="ml-4 flex space-x-2">
                          <img src="https://logo.clearbit.com/visa.com" alt="Visa" class="h-6">
                          <img src="https://logo.clearbit.com/mastercard.com" alt="Mastercard" class="h-6">
                        </div>
                      </div>
                      <input type="radio" 
                             formControlName="paymentMethod" 
                             value="credit"
                             class="w-5 h-5 text-mc-red">
                    </label>

                    <label (click)="selectPaymentMethod('pix')"
                           [class.border-mc-red]="paymentForm.get('paymentMethod')?.value === 'pix'"
                           [class.border-mc-gray-700]="paymentForm.get('paymentMethod')?.value !== 'pix'"
                           class="flex items-center justify-between p-4 border-2 rounded-mc-md cursor-pointer hover:border-mc-gray-600 transition-all bg-mc-gray-800">
                      <div class="flex items-center">
                        <svg class="w-6 h-6 text-mc-white mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-mc-white font-mc font-mc-semibold">PIX</span>
                        <span class="ml-4 px-3 py-1 bg-green-500 text-white text-xs rounded font-mc font-mc-semibold">5% OFF</span>
                      </div>
                      <input type="radio" 
                             formControlName="paymentMethod" 
                             value="pix"
                             class="w-5 h-5 text-mc-red">
                    </label>
                  </div>

                  <!-- Credit Card Form -->
                  <div *ngIf="paymentForm.get('paymentMethod')?.value === 'credit'">
                    <div class="mb-4">
                      <label class="block text-mc-white font-mc font-mc-semibold mb-2">
                        Número do Cartão *
                      </label>
                      <input type="text" 
                             formControlName="cardNumber"
                             maxlength="19"
                             (input)="formatCardNumber($event)"
                             placeholder="1234 1234 1234 1234"
                             class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red transition-colors font-mc">
                    </div>

                    <div class="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label class="block text-mc-white font-mc font-mc-semibold mb-2">
                          Data de Validade *
                        </label>
                        <input type="text" 
                               formControlName="cardExpiry"
                               maxlength="5"
                               (input)="formatExpiry($event)"
                               placeholder="MM / AA"
                               class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red transition-colors font-mc">
                      </div>
                      <div>
                        <label class="block text-mc-white font-mc font-mc-semibold mb-2">
                          Código de Segurança *
                        </label>
                        <input type="text" 
                               formControlName="cardCvv"
                               maxlength="4"
                               placeholder="CVC"
                               class="w-full bg-mc-gray-800 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red transition-colors font-mc">
                      </div>
                    </div>
                  </div>

                  <!-- Terms -->
                  <div class="bg-mc-gray-800 rounded-mc-md p-4 mb-6">
                    <p class="text-mc-text-secondary text-sm font-mc">
                      Ao clicar em "Fazer Pedido Seguro", você concorda em se inscrever em nosso plano de assinatura anual e em nossos 
                      <a href="#" class="text-mc-red hover:underline">Termos de Oferta</a>, 
                      <a href="#" class="text-mc-red hover:underline">Termos de Serviço</a> e 
                      <a href="#" class="text-mc-red hover:underline">Política de Privacidade</a>. 
                      Seu método de pagamento será cobrado pelo preço promocional no primeiro ano e anualmente a partir de então pelo preço não promocional atual; os preços incluem impostos. 
                      Cancele em Configurações; sem reembolsos para períodos parciais não utilizados.
                    </p>
                  </div>

                  <!-- Submit Button -->
                  <button type="submit" 
                          [disabled]="paymentForm.invalid || isProcessing"
                          class="w-full bg-mc-red hover:bg-mc-button-primary-hover disabled:bg-mc-gray-700 disabled:cursor-not-allowed text-mc-white py-4 rounded-mc-md font-mc font-mc-semibold text-lg transition-colors">
                    <span *ngIf="!isProcessing">Fazer Pedido Seguro</span>
                    <span *ngIf="isProcessing" class="flex items-center justify-center">
                      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </span>
                  </button>
                </form>
              </div>

              <!-- Guarantee Section -->
              <div class="bg-mc-gray-900 rounded-mc-lg p-8">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <div class="text-4xl font-mc-bold text-mc-white mb-2 font-mc">100%</div>
                    <div class="text-xl font-mc-bold text-mc-white mb-2 font-mc">GARANTIDO</div>
                    <p class="text-mc-text-secondary font-mc">
                      O MentorMatch oferece garantia de reembolso de 30 dias, se você não amar a Assinatura Anual.
                    </p>
                  </div>
                  <div>
                    <div class="flex items-center mb-4">
                      <svg class="w-6 h-6 text-mc-white mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                      </svg>
                      <span class="text-mc-text-secondary font-mc">Protegido com SSL</span>
                    </div>
                    <div>
                      <p class="text-mc-text-secondary font-mc mb-1">Tem uma pergunta?</p>
                      <a href="tel:+5511999999999" class="text-mc-white font-mc-bold text-lg">+55 11 99999-9999</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Order Summary -->
            <div class="lg:col-span-1">
              <div class="bg-mc-gray-900 rounded-mc-lg p-6 sticky top-24">
                <h3 class="text-xl font-mc-bold text-mc-white mb-4 font-mc">
                  {{ getSelectedPlan()?.name }}
                </h3>
                
                <div class="mb-4">
                  <div class="flex items-baseline">
                    <span class="text-2xl font-mc-bold text-mc-white font-mc">R$ {{ getSelectedPlan()?.price }}</span>
                  </div>
                  <div class="text-mc-text-secondary text-sm font-mc mt-1">
                    /mês (cobrado anualmente)
                  </div>
                  <div class="text-mc-text-secondary text-base font-mc mt-3 pt-3 border-t border-mc-gray-700">
                    <div class="flex justify-between mb-1">
                      <span>Subtotal (12 meses):</span>
                      <span class="font-mc-bold text-mc-white">R$ {{ getTotalPrice() }}</span>
                    </div>
                  </div>
                </div>

                <div class="pt-6 border-t border-mc-gray-700">
                  <div class="space-y-2 text-mc-text-secondary text-sm font-mc">
                    <div class="flex items-center">
                      <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span>Acesso ilimitado</span>
                    </div>
                    <div class="flex items-center">
                      <svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span>Garantia de 30 dias</span>
                    </div>
                  </div>
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
export class MembershipComponent implements OnInit {
  currentStep = 1;
  selectedPlanId: string | null = null;
  isSubmitting = false;
  isProcessing = false;

  membershipPlans: MembershipPlan[] = [
    {
      id: 'standard',
      name: 'Standard',
      price: 297,
      devices: 1,
      offlineMode: false,
      features: ['1 dispositivo', 'Sem modo offline']
    },
    {
      id: 'plus',
      name: 'Plus',
      price: 497,
      devices: 2,
      offlineMode: true,
      features: ['2 dispositivos', 'Modo offline']
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 797,
      devices: 6,
      offlineMode: true,
      bestValue: true,
      features: ['6 dispositivos', 'Modo offline']
    }
  ];

  accountForm: FormGroup;
  paymentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.accountForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      keepMeUpdated: [false]
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['credit', [Validators.required]],
      cardNumber: ['', [Validators.required, Validators.minLength(13)]],
      cardExpiry: ['', [Validators.required]],
      cardCvv: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  ngOnInit() {
    // Set default plan to Plus
    this.selectedPlanId = 'plus';
  }

  selectPlan(planId: string) {
    this.selectedPlanId = planId;
  }

  getSelectedPlan(): MembershipPlan | undefined {
    return this.membershipPlans.find(p => p.id === this.selectedPlanId);
  }

  goToNextStep() {
    if (this.currentStep === 1 && !this.selectedPlanId) {
      this.notificationService.warning('Por favor, selecione um plano');
      return;
    }
    this.currentStep++;
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onAccountSubmit() {
    if (this.accountForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.goToNextStep();
    }, 1000);
  }

  selectPaymentMethod(method: string) {
    this.paymentForm.patchValue({ paymentMethod: method });
  }

  formatCardNumber(event: any) {
    let value = event.target.value.replace(/\s/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    value = value.replace(/(.{4})/g, '$1 ').trim();
    this.paymentForm.patchValue({ cardNumber: value });
  }

  formatExpiry(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + ' / ' + value.slice(2, 4);
    }
    this.paymentForm.patchValue({ cardExpiry: value });
  }

  getTotalPrice(): number {
    const plan = this.getSelectedPlan();
    if (!plan) return 0;
    return plan.price * 12;
  }

  onPaymentSubmit() {
    if (this.paymentForm.invalid) {
      return;
    }

    this.isProcessing = true;
    setTimeout(() => {
      this.isProcessing = false;
      this.notificationService.success('Assinatura realizada com sucesso! Bem-vindo ao MentorMatch!');
      this.router.navigate(['/']);
    }, 2000);
  }
}

