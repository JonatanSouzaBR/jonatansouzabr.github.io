import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-gifts',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen bg-mc-black">
      <!-- Hero Section -->
      <section class="relative pt-8 pb-16 md:pt-12 md:pb-24 bg-mc-black">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-mc-bold text-mc-white mb-6 font-mc">
              Presenteie Conhecimento
            </h1>
            <p class="text-xl md:text-2xl text-mc-text-secondary mb-8 font-mc">
              Dê o melhor presente: acesso ilimitado às melhores masterclasses do mundo
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <button (click)="scrollToForm()" 
                      class="bg-mc-red hover:bg-mc-button-primary-hover text-mc-white px-8 py-4 rounded-mc-md font-mc font-mc-semibold text-lg transition-colors">
                Criar Vale-Presente
              </button>
              <a routerLink="/masterclasses" 
                 class="border-2 border-mc-gray-700 hover:border-mc-gray-600 text-mc-white px-8 py-4 rounded-mc-md font-mc font-mc-semibold text-lg transition-colors">
                Ver Masterclasses
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="py-16 md:py-24 bg-mc-gray-900">
        <div class="container mx-auto px-6">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-mc-bold text-mc-white mb-12 text-center font-mc">
              Por que presentear com MentorMatch?
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="text-center">
                <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-8 h-8 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-mc-semibold text-mc-white mb-4 font-mc">Acesso Ilimitado</h3>
                <p class="text-mc-text-secondary font-mc">
                  Mais de 200+ masterclasses de líderes e especialistas mundiais
                </p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-8 h-8 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-mc-semibold text-mc-white mb-4 font-mc">Aprendizado no Seu Ritmo</h3>
                <p class="text-mc-text-secondary font-mc">
                  Estude quando e onde quiser, sem pressão ou prazo
                </p>
              </div>
              <div class="text-center">
                <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg class="w-8 h-8 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                </div>
                <h3 class="text-xl font-mc-semibold text-mc-white mb-4 font-mc">Mensagem Personalizada</h3>
                <p class="text-mc-text-secondary font-mc">
                  Adicione uma mensagem especial para tornar o presente único
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Gift Plans Section -->
      <section class="py-16 md:py-24 bg-mc-black">
        <div class="container mx-auto px-6">
          <div class="max-w-6xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-mc-bold text-mc-white mb-4 text-center font-mc">
              Escolha o Plano Ideal
            </h2>
            <p class="text-mc-text-secondary text-center mb-12 font-mc">
              Todos os planos incluem acesso completo a todas as masterclasses
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <!-- Plano Anual -->
              <div class="bg-mc-gray-900 rounded-mc-lg p-8 border border-mc-gray-800 hover:border-mc-red transition-colors">
                <div class="text-center mb-6">
                  <h3 class="text-2xl font-mc-bold text-mc-white mb-2 font-mc">Anual</h3>
                  <div class="mb-4">
                    <span class="text-4xl font-mc-bold text-mc-white font-mc">R$ 120</span>
                    <span class="text-mc-text-secondary font-mc">/ano</span>
                  </div>
                  <p class="text-mc-text-secondary text-sm font-mc">Melhor custo-benefício</p>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-mc-red mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-sm">Acesso a todas as masterclasses</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-mc-red mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-sm">Novas masterclasses mensais</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-mc-red mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-sm">Acesso em múltiplos dispositivos</span>
                  </li>
                </ul>
                <button (click)="selectPlan('annual')" 
                        [class.bg-mc-red]="selectedPlan === 'annual'"
                        [class.bg-mc-gray-700]="selectedPlan !== 'annual'"
                        class="w-full py-3 text-mc-white rounded-mc-md font-mc font-mc-semibold transition-colors">
                  {{ selectedPlan === 'annual' ? 'Selecionado' : 'Escolher Plano Anual' }}
                </button>
              </div>

              <!-- Plano Mensal -->
              <div class="bg-mc-gray-900 rounded-mc-lg p-8 border border-mc-gray-800 hover:border-mc-red transition-colors">
                <div class="text-center mb-6">
                  <h3 class="text-2xl font-mc-bold text-mc-white mb-2 font-mc">Mensal</h3>
                  <div class="mb-4">
                    <span class="text-4xl font-mc-bold text-mc-white font-mc">R$ 15</span>
                    <span class="text-mc-text-secondary font-mc">/mês</span>
                  </div>
                  <p class="text-mc-text-secondary text-sm font-mc">Flexibilidade total</p>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-mc-red mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-sm">Acesso a todas as masterclasses</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-mc-red mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-sm">Cancele quando quiser</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-mc-red mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-sm">Acesso em múltiplos dispositivos</span>
                  </li>
                </ul>
                <button (click)="selectPlan('monthly')" 
                        [class.bg-mc-red]="selectedPlan === 'monthly'"
                        [class.bg-mc-gray-700]="selectedPlan !== 'monthly'"
                        class="w-full py-3 text-mc-white rounded-mc-md font-mc font-mc-semibold transition-colors">
                  {{ selectedPlan === 'monthly' ? 'Selecionado' : 'Escolher Plano Mensal' }}
                </button>
              </div>

              <!-- Vale-Presente Personalizado -->
              <div class="bg-mc-gray-900 rounded-mc-lg p-8 border-2 border-mc-red">
                <div class="text-center mb-6">
                  <div class="inline-block bg-mc-red text-mc-white px-3 py-1 rounded-full text-xs font-mc font-mc-semibold mb-3">
                    MAIS POPULAR
                  </div>
                  <h3 class="text-2xl font-mc-bold text-mc-white mb-2 font-mc">Valor Personalizado</h3>
                  <div class="mb-4">
                    <span class="text-4xl font-mc-bold text-mc-white font-mc">R$ 50</span>
                    <span class="text-mc-text-secondary font-mc"> - R$ 500</span>
                  </div>
                  <p class="text-mc-text-secondary text-sm font-mc">Escolha o valor ideal</p>
                </div>
                <ul class="space-y-3 mb-8">
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-mc-red mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-sm">Valor personalizado</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-mc-red mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-sm">Mensagem personalizada</span>
                  </li>
                  <li class="flex items-start">
                    <svg class="w-5 h-5 text-mc-red mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-sm">Válido por 12 meses</span>
                  </li>
                </ul>
                <button (click)="selectPlan('custom')" 
                        [class.bg-mc-red]="selectedPlan === 'custom'"
                        [class.bg-mc-gray-700]="selectedPlan !== 'custom'"
                        class="w-full py-3 text-mc-white rounded-mc-md font-mc font-mc-semibold transition-colors">
                  {{ selectedPlan === 'custom' ? 'Selecionado' : 'Escolher Valor Personalizado' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Gift Form Section -->
      <section id="gift-form" class="py-16 md:py-24 bg-mc-gray-900">
        <div class="container mx-auto px-6">
          <div class="max-w-3xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-mc-bold text-mc-white mb-4 text-center font-mc">
              Personalize Seu Vale-Presente
            </h2>
            <p class="text-mc-text-secondary text-center mb-12 font-mc">
              Preencha os dados abaixo para criar um vale-presente especial
            </p>

            <form (ngSubmit)="onSubmit()" class="bg-mc-black rounded-mc-lg p-8 border border-mc-gray-800">
              <!-- Recipient Email -->
              <div class="mb-6">
                <label for="recipientEmail" class="block text-mc-white font-mc font-mc-semibold mb-2">
                  E-mail do Presenteado <span class="text-mc-red">*</span>
                </label>
                <input type="email" 
                       id="recipientEmail"
                       [(ngModel)]="giftForm.recipientEmail"
                       name="recipientEmail"
                       required
                       placeholder="presenteado@email.com"
                       class="w-full bg-mc-gray-900 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red transition-colors font-mc">
                <p class="text-mc-text-tertiary text-sm mt-2 font-mc">
                  Enviaremos o vale-presente por e-mail
                </p>
              </div>

              <!-- Sender Name -->
              <div class="mb-6">
                <label for="senderName" class="block text-mc-white font-mc font-mc-semibold mb-2">
                  Seu Nome <span class="text-mc-red">*</span>
                </label>
                <input type="text" 
                       id="senderName"
                       [(ngModel)]="giftForm.senderName"
                       name="senderName"
                       required
                       placeholder="Seu nome completo"
                       class="w-full bg-mc-gray-900 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red transition-colors font-mc">
              </div>

              <!-- Custom Amount (if custom plan) -->
              <div *ngIf="selectedPlan === 'custom'" class="mb-6">
                <label for="customAmount" class="block text-mc-white font-mc font-mc-semibold mb-2">
                  Valor do Vale-Presente (R$) <span class="text-mc-red">*</span>
                </label>
                <input type="number" 
                       id="customAmount"
                       [(ngModel)]="giftForm.customAmount"
                       name="customAmount"
                       [required]="selectedPlan === 'custom'"
                       min="50"
                       max="500"
                       placeholder="100"
                       class="w-full bg-mc-gray-900 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red transition-colors font-mc">
                <p class="text-mc-text-tertiary text-sm mt-2 font-mc">
                  Valor entre R$ 50 e R$ 500
                </p>
              </div>

              <!-- Message -->
              <div class="mb-6">
                <label for="message" class="block text-mc-white font-mc font-mc-semibold mb-2">
                  Mensagem Personalizada
                </label>
                <textarea id="message"
                          [(ngModel)]="giftForm.message"
                          name="message"
                          rows="4"
                          placeholder="Escreva uma mensagem especial para o presenteado..."
                          class="w-full bg-mc-gray-900 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red transition-colors font-mc resize-none"></textarea>
                <p class="text-mc-text-tertiary text-sm mt-2 font-mc">
                  {{ giftForm.message.length }}/500 caracteres
                </p>
              </div>

              <!-- Delivery Date -->
              <div class="mb-6">
                <label for="deliveryDate" class="block text-mc-white font-mc font-mc-semibold mb-2">
                  Data de Envio
                </label>
                <input type="date" 
                       id="deliveryDate"
                       [(ngModel)]="giftForm.deliveryDate"
                       name="deliveryDate"
                       [min]="minDate"
                       class="w-full bg-mc-gray-900 border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white focus:outline-none focus:border-mc-red transition-colors font-mc">
                <p class="text-mc-text-tertiary text-sm mt-2 font-mc">
                  Escolha quando o vale-presente será enviado (padrão: hoje)
                </p>
              </div>

              <!-- Summary -->
              <div class="bg-mc-gray-900 rounded-mc-md p-6 mb-6">
                <h3 class="text-lg font-mc-semibold text-mc-white mb-4 font-mc">Resumo</h3>
                <div class="space-y-2">
                  <div class="flex justify-between text-mc-text-secondary font-mc">
                    <span>Plano:</span>
                    <span class="text-mc-white">{{ getPlanName() }}</span>
                  </div>
                  <div class="flex justify-between text-mc-text-secondary font-mc">
                    <span>Valor:</span>
                    <span class="text-mc-white font-mc-bold">R$ {{ getTotalAmount() }}</span>
                  </div>
                  <div class="flex justify-between text-mc-text-secondary font-mc">
                    <span>Taxa:</span>
                    <span class="text-mc-white">Grátis</span>
                  </div>
                  <div class="border-t border-mc-gray-700 pt-2 mt-2">
                    <div class="flex justify-between">
                      <span class="text-mc-white font-mc-bold text-lg font-mc">Total:</span>
                      <span class="text-mc-white font-mc-bold text-xl font-mc">R$ {{ getTotalAmount() }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Submit Button -->
              <button type="submit" 
                      [disabled]="isSubmitting || !selectedPlan"
                      class="w-full bg-mc-red hover:bg-mc-button-primary-hover disabled:bg-mc-gray-700 disabled:cursor-not-allowed text-mc-white py-4 rounded-mc-md font-mc font-mc-semibold text-lg transition-colors">
                <span *ngIf="!isSubmitting">Finalizar Compra</span>
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
      </section>

      <!-- FAQ Section -->
      <section class="py-16 md:py-24 bg-mc-black">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-mc-bold text-mc-white mb-12 text-center font-mc">
              Perguntas Frequentes
            </h2>
            
            <div class="space-y-4">
              <div class="bg-mc-gray-900 rounded-mc-lg p-6">
                <button (click)="toggleFAQ(0)" 
                        class="w-full flex justify-between items-center text-left">
                  <h3 class="text-lg font-mc-semibold text-mc-white font-mc">
                    Como funciona o vale-presente?
                  </h3>
                  <svg class="w-5 h-5 text-mc-white transition-transform" 
                       [class.rotate-180]="openFAQ === 0"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div *ngIf="openFAQ === 0" class="mt-4 text-mc-text-secondary font-mc">
                  O vale-presente será enviado por e-mail para o presenteado no dia escolhido. Ele receberá um código único para resgatar e começar a aprender imediatamente.
                </div>
              </div>

              <div class="bg-mc-gray-900 rounded-mc-lg p-6">
                <button (click)="toggleFAQ(1)" 
                        class="w-full flex justify-between items-center text-left">
                  <h3 class="text-lg font-mc-semibold text-mc-white font-mc">
                    Por quanto tempo o vale-presente é válido?
                  </h3>
                  <svg class="w-5 h-5 text-mc-white transition-transform" 
                       [class.rotate-180]="openFAQ === 1"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div *ngIf="openFAQ === 1" class="mt-4 text-mc-text-secondary font-mc">
                  Os vales-presente têm validade de 12 meses a partir da data de envio. O presenteado pode resgatar quando quiser dentro desse período.
                </div>
              </div>

              <div class="bg-mc-gray-900 rounded-mc-lg p-6">
                <button (click)="toggleFAQ(2)" 
                        class="w-full flex justify-between items-center text-left">
                  <h3 class="text-lg font-mc-semibold text-mc-white font-mc">
                    Posso cancelar ou reembolsar um vale-presente?
                  </h3>
                  <svg class="w-5 h-5 text-mc-white transition-transform" 
                       [class.rotate-180]="openFAQ === 2"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div *ngIf="openFAQ === 2" class="mt-4 text-mc-text-secondary font-mc">
                  Sim, você pode solicitar o cancelamento e reembolso de um vale-presente dentro de 30 dias após a compra, desde que ele não tenha sido resgatado.
                </div>
              </div>

              <div class="bg-mc-gray-900 rounded-mc-lg p-6">
                <button (click)="toggleFAQ(3)" 
                        class="w-full flex justify-between items-center text-left">
                  <h3 class="text-lg font-mc-semibold text-mc-white font-mc">
                    O presenteado precisa ter uma conta no MentorMatch?
                  </h3>
                  <svg class="w-5 h-5 text-mc-white transition-transform" 
                       [class.rotate-180]="openFAQ === 3"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div *ngIf="openFAQ === 3" class="mt-4 text-mc-text-secondary font-mc">
                  Não, o presenteado pode criar uma conta gratuita no momento do resgate do vale-presente usando o código recebido por e-mail.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class GiftsComponent implements OnInit {
  selectedPlan: 'annual' | 'monthly' | 'custom' | null = null;
  openFAQ: number | null = null;
  isSubmitting = false;
  minDate: string;

  giftForm = {
    recipientEmail: '',
    senderName: '',
    customAmount: 100,
    message: '',
    deliveryDate: ''
  };

  constructor(private notificationService: NotificationService) {
    // Set minimum date to today
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
    this.giftForm.deliveryDate = this.minDate;
  }

  ngOnInit() {
    // Initialize form
  }

  selectPlan(plan: 'annual' | 'monthly' | 'custom') {
    this.selectedPlan = plan;
    if (plan === 'custom') {
      this.giftForm.customAmount = 100;
    }
  }

  getPlanName(): string {
    switch (this.selectedPlan) {
      case 'annual':
        return 'Plano Anual';
      case 'monthly':
        return 'Plano Mensal';
      case 'custom':
        return 'Valor Personalizado';
      default:
        return 'Nenhum plano selecionado';
    }
  }

  getTotalAmount(): number {
    switch (this.selectedPlan) {
      case 'annual':
        return 120;
      case 'monthly':
        return 15;
      case 'custom':
        return this.giftForm.customAmount || 0;
      default:
        return 0;
    }
  }

  scrollToForm() {
    const formElement = document.getElementById('gift-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  toggleFAQ(index: number) {
    this.openFAQ = this.openFAQ === index ? null : index;
  }

  onSubmit() {
    if (!this.selectedPlan) {
      this.notificationService.warning('Por favor, selecione um plano');
      return;
    }

    if (this.selectedPlan === 'custom' && (!this.giftForm.customAmount || this.giftForm.customAmount < 50 || this.giftForm.customAmount > 500)) {
      this.notificationService.warning('Por favor, escolha um valor entre R$ 50 e R$ 500');
      return;
    }

    this.isSubmitting = true;

    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;
      this.notificationService.success('Vale-presente criado com sucesso! O e-mail será enviado na data escolhida.');
      
      // Reset form
      this.giftForm = {
        recipientEmail: '',
        senderName: '',
        customAmount: 100,
        message: '',
        deliveryDate: this.minDate
      };
      this.selectedPlan = null;
    }, 2000);
  }
}






