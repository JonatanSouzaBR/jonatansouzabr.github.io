import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

interface AiAttachment {
  id: string;
  name: string;
  sizeLabel: string;
  source: File;
}

interface AiResponseEntry {
  prompt: string;
  attachments: number;
  answer: string;
  timestamp: Date;
}

interface NavigationLink {
  id: string;
  label: string;
  route: string;
  description?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/5" 
            [ngClass]="headerBackgroundClass">
      <nav class="w-full px-4 md:px-8 lg:px-12">
        <div class="flex items-center justify-between gap-3 h-16 md:h-20">
          <div class="flex items-center gap-2 sm:gap-3 flex-1 min-w-0 max-w-[65%] sm:max-w-none">
            <a routerLink="/" class="cursor-pointer flex items-center space-x-2">
              <span class="text-white font-bold text-[1.2rem] sm:text-[1.4rem] tracking-tight flex items-center gap-1.5">
                <span>MENTORMATCH</span>
                <span class="text-[#E50914]">PLAY</span>
              </span>
            </a>

            <div class="hidden lg:flex items-center gap-1 px-2 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-lg">
              <a *ngFor="let link of navLinks"
                 [routerLink]="link.route"
                 (click)="setActiveNav(link.id)"
                 class="px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200"
                 [ngClass]="activeNav === link.id ? 'bg-white text-black shadow-lg' : 'text-white/70 hover:text-white'">
                {{ link.label }}
              </a>
            </div>
          </div>

          <div class="flex items-center gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
            <button (click)="toggleSearch()" aria-label="Buscar" class="md:hidden p-1.5 rounded-full border border-white/15 text-white hover:border-white/40 transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>

            <button (click)="toggleSearch()" class="hidden md:inline-flex items-center gap-2 text-sm font-medium px-3 py-1.5 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 transition-all">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span>Buscar</span>
            </button>

            <div class="flex items-center gap-1 text-white">
              <a routerLink="/lista-desejos" class="relative p-1.5 rounded-full border border-white/10 hover:border-white/40 transition-all">
                <svg class="w-[18px] h-[18px] md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                </svg>
                <span *ngIf="wishlistCount > 0" class="absolute -top-1 -right-1 bg-[#E50914] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ wishlistCount }}</span>
              </a>

              <a routerLink="/carrinho" class="relative p-1.5 rounded-full border border-white/10 hover:border-white/40 transition-all">
                <svg class="w-[18px] h-[18px] md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <span *ngIf="cartCount > 0" class="absolute -top-1 -right-1 bg-[#E50914] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ cartCount }}</span>
              </a>
            </div>

            <div class="relative profile-menu hidden sm:block">
              <button (click)="toggleProfileMenu()" class="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                <div class="w-9 h-9 bg-[#E50914] rounded-full flex items-center justify-center shadow-lg">
                  <span class="text-white text-sm font-bold">J</span>
                </div>
                <svg class="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              <div *ngIf="showProfileMenu" 
                   class="absolute top-full right-0 mt-2 w-48 bg-black border border-gray-800 rounded shadow-xl py-2 z-50"
                   (click)="$event.stopPropagation()">
                <a routerLink="/perfil" class="block px-4 py-2 text-white hover:bg-gray-900 transition-colors text-sm">Perfil</a>
                <a routerLink="/configuracoes" class="block px-4 py-2 text-white hover:bg-gray-900 transition-colors text-sm">Configurações</a>
                <div class="border-t border-gray-800 mt-2 pt-2">
                  <a href="#" class="block px-4 py-2 text-white hover:bg-gray-900 transition-colors text-sm">Sair</a>
                </div>
              </div>
            </div>

            <button (click)="toggleMobileMenu()" class="mobile-menu-trigger lg:hidden p-2 rounded-full border border-white/15 text-white hover:border-white/40 transition-all" aria-label="Abrir menu">
              <svg *ngIf="!showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg *ngIf="showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <div *ngIf="showSearch" class="pb-4 mt-3">
          <div class="ai-panel">
            <div class="ai-panel__header">
              <div class="ai-panel__identity">
                <div>
                  <p class="ai-panel__title">Mentor<span class="ai-panel__title-highlight">AI</span></p>
                  <p class="ai-panel__status">Disponível para montar mentorias sob medida</p>
                </div>
              </div>
              <button class="ai-panel__close" (click)="toggleSearch()">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Sair
              </button>
            </div>

            <div class="ai-panel__input">
              <input type="file" multiple class="hidden" #attachmentInput (change)="handleAttachmentSelection($event)">
              <div class="ai-panel__input-wrapper">
                <textarea rows="2"
                          [(ngModel)]="searchQuery"
                          placeholder="Pergunte algo como “Preciso de uma trilha para novos líderes de produto”"
                          class="ai-panel__textarea"></textarea>
                <div class="ai-panel__input-actions">
                  <button class="ai-panel__ghost-btn" title="Inserir arquivos" type="button" (click)="triggerAttachmentPicker(attachmentInput)">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 8v8a5 5 0 11-10 0V7a3 3 0 016 0v8a1 1 0 01-2 0V8"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 19a3 3 0 11-6 0v-7a5 5 0 0110 0"/>
                    </svg>
                  </button>
                  <button 
                    class="ai-panel__ghost-btn"
                    [ngClass]="{'ai-panel__ghost-btn--recording': isTranscribing}"
                    title="Transcrever fala"
                    type="button"
                    (click)="toggleTranscription()"
                    [attr.aria-pressed]="isTranscribing">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3a3 3 0 00-3 3v5a3 3 0 006 0V6a3 3 0 00-3-3z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-14 0"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18v4m-3 0h6"/>
                    </svg>
                  </button>
                  <button class="ai-panel__send" title="Enviar" type="button" (click)="submitAiRequest()" [disabled]="isSending">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21l20.99-9L2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
              <div *ngIf="aiAttachments.length" class="ai-panel__attachments">
                <div *ngFor="let attachment of aiAttachments" class="ai-attachment-card">
                  <div class="ai-attachment-card__info">
                    <p class="ai-attachment-card__name">{{ attachment.name }}</p>
                    <span class="ai-attachment-card__meta">
                      {{ attachment.sizeLabel }} • Arquivo
                    </span>
                  </div>
                  <button class="ai-attachment-card__remove" (click)="removeAttachment(attachment.id)" type="button" aria-label="Remover anexo">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <p *ngIf="aiStatusMessage" class="ai-panel__status-text">{{ aiStatusMessage }}</p>

            <div *ngIf="aiResponses.length" class="ai-panel__responses">
              <p class="ai-panel__section-label">Últimas respostas</p>
              <div class="ai-panel__response-card" *ngFor="let response of aiResponses | slice:0:1">
                <p class="ai-response__question">{{ response.prompt || 'Envio com anexos' }}</p>
                <p class="ai-response__answer">{{ response.answer }}</p>
                <span class="ai-response__meta">{{ response.timestamp | date:'HH:mm' }} · {{ response.attachments }} anexos</span>
              </div>
            </div>

          </div>
        </div>

        <ng-container *ngIf="showMobileMenu">
          <div class="lg:hidden mt-4 mobile-menu-panel">
            <div class="rounded-2xl bg-black/95 border border-white/10 shadow-2xl p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-7rem)] pr-2">
              <div class="grid gap-3">
                <a *ngFor="let link of navLinks"
                   [routerLink]="link.route"
                   (click)="setActiveNav(link.id)"
                   class="block px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10">
                  <p class="font-semibold">{{ link.label }}</p>
                  <span *ngIf="link.description" class="text-xs text-white/60">{{ link.description }}</span>
                </a>
              </div>

              <div class="space-y-3 pt-2">
                <a routerLink="/perfil" class="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/15 text-white transition-all hover:from-white/15 hover:to-white/10">
                  <span class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 12a4 4 0 100-8 4 4 0 000 8z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 20a6 6 0 0112 0" />
                    </svg>
                  </span>
                  <div class="flex-1">
                    <p class="font-semibold">Perfil</p>
                    <span class="text-xs text-white/70">Gerencie sua conta e preferências</span>
                  </div>
                </a>

                <a routerLink="/configuracoes" class="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-white/10 to-white/5 border border-white/15 text-white transition-all hover:from-white/15 hover:to-white/10">
                  <span class="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center">
                    <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317a1 1 0 011.35 0l.867.863a1 1 0 00.95.249l1.182-.33a1 1 0 011.213.707l.332 1.184a1 1 0 00.248.949l.864.867a1 1 0 010 1.35l-.864.867a1 1 0 00-.249.949l.33 1.183a1 1 0 01-.707 1.213l-1.183.332a1 1 0 00-.948.248l-.868.864a1 1 0 01-1.35 0l-.867-.864a1 1 0 00-.949-.248l-1.184.33a1 1 0 01-1.212-.707l-.332-1.184a1 1 0 00-.248-.949l-.864-.867a1 1 0 010-1.35l.864-.867a1 1 0 00.248-.949l-.33-1.183a1 1 0 01.707-1.213l1.184-.332a1 1 0 00.948-.248l.867-.863z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div class="flex-1">
                    <p class="font-semibold">Configurações</p>
                    <span class="text-xs text-white/70">Preferências e segurança</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </ng-container>
      </nav>
    </header>
  `,
  styles: [`
    .ai-panel {
      background: #101010;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 20px;
      padding: 1.25rem 1.5rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      box-shadow: 0 30px 60px rgba(0,0,0,0.45);
    }
    .ai-panel__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .ai-panel__identity {
      display: flex;
      align-items: center;
      gap: 0.85rem;
    }
    .ai-panel__avatar {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #E50914, #8A0B12);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
    }
    .ai-panel__avatar svg {
      width: 22px;
      height: 22px;
    }
    .ai-panel__title-highlight {
      color: #E50914;
    }
    .ai-panel__title {
      margin: 0;
      font-weight: 600;
    }
    .ai-panel__status {
      margin: 0;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.7);
    }
    .ai-panel__close {
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 999px;
      padding: 0.35rem 0.9rem;
      font-size: 0.85rem;
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: #fff;
    }
    .ai-panel__input-wrapper {
      position: relative;
      border-radius: 18px;
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.02);
      padding: 1rem 1.25rem 0.5rem;
    }
    .ai-panel__textarea {
      width: 100%;
      background: transparent;
      border: none;
      color: #fff;
      resize: none;
      font-size: 1rem;
      outline: none;
    }
    .ai-panel__input-actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.4rem;
    }
    .ai-panel__ghost-btn {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      border: 1px solid rgba(255,255,255,0.2);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgba(255,255,255,0.8);
    }
    .ai-panel__ghost-btn--recording {
      border-color: #E50914;
      color: #E50914;
      box-shadow: 0 0 0 4px rgba(229,9,20,0.15);
    }
    .ai-panel__send {
      width: 40px;
      height: 36px;
      border-radius: 10px;
      background: #E50914;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .ai-panel__send[disabled] {
      opacity: 0.7;
      cursor: not-allowed;
    }
    .ai-panel__chips {
      display: flex;
      gap: 0.6rem;
      flex-wrap: wrap;
      padding-top: 0.8rem;
    }
    .ai-panel__chip {
      padding: 0.25rem 0.75rem;
      border-radius: 999px;
      border: 1px solid rgba(255,255,255,0.15);
      font-size: 0.8rem;
    }
    .ai-panel__quick-prompts {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .ai-panel__prompt-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
      gap: 0.6rem;
    }
    .ai-panel__prompt-card {
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      padding: 0.75rem 0.9rem;
      display: flex;
      justify-content: space-between;
      gap: 0.6rem;
      color: #fff;
      background: rgba(255,255,255,0.02);
    }
    .ai-panel__attachments {
      margin-top: 0.75rem;
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .ai-attachment-card {
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 12px;
      padding: 0.6rem 0.9rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.8rem;
    }
    .ai-attachment-card__info {
      flex: 1;
      min-width: 0;
    }
    .ai-attachment-card__name {
      font-size: 0.9rem;
      font-weight: 600;
      margin: 0 0 0.15rem;
    }
    .ai-attachment-card__meta {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.6);
    }
    .ai-attachment-card__remove {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      border: 1px solid rgba(255,255,255,0.2);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: rgba(255,255,255,0.8);
      background: transparent;
    }
    .ai-panel__status-text {
      margin-top: 0.5rem;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.85);
    }
    .ai-panel__responses {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .ai-panel__response-card {
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 14px;
      padding: 0.85rem 1rem;
      background: rgba(255,255,255,0.02);
    }
    .ai-response__question {
      font-weight: 600;
      margin: 0 0 0.25rem;
    }
    .ai-response__answer {
      margin: 0;
      font-size: 0.9rem;
      color: rgba(255,255,255,0.8);
    }
    .ai-response__meta {
      display: inline-block;
      margin-top: 0.4rem;
      font-size: 0.75rem;
      color: rgba(255,255,255,0.6);
    }
    @media (max-width: 768px) {
      .ai-panel {
        padding: 1rem;
      }
      .ai-panel__prompt-grid {
        grid-template-columns: repeat(auto-fit,minmax(160px,1fr));
      }
    }
  `]
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  isMobileView = false;
  showSearch = false;
  showSearchDropdown = false;
  showProfileMenu = false;
  showMobileMenu = false;
  searchQuery = '';
  cartCount = 0;
  wishlistCount = 0;
  activeNav = 'home';
  private subscriptions = new Subscription();
  aiAttachments: AiAttachment[] = [];
  aiResponses: AiResponseEntry[] = [];
  isTranscribing = false;
  isSending = false;
  aiStatusMessage = '';
  private speechRecognition?: any;
  private transcriptionBaseText = '';

  navLinks: NavigationLink[] = [
    { id: 'masterclasses', label: 'Masterclasses', route: '/masterclasses', description: 'Catálogo completo' },
    { id: 'planos', label: 'Planos', route: '/planos', description: 'Assinaturas e combos' },
    { id: 'empresas', label: 'Empresas', route: '/empresas', description: 'Programas corporativos' },
    { id: 'presentes', label: 'Presentes', route: '/presentes', description: 'Cartões e kits' },
    { id: 'mentores', label: 'Área do Mentor', route: '/mentor/dashboard', description: 'Dashboard exclusivo' }
  ];

  aiChips = ['Mentorias', 'Planos e trilhas', 'Empresas'];
  quickPrompts = [
    'Quais mentorias recomendadas para líderes de produto?',
    'Monte um plano para treinar meu time comercial',
    'Sugira trilhas para RH estratégico',
    'Quais mentores têm foco em dados?'
  ];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.handleViewportChange();
    this.subscriptions.add(
      this.cartService.cart$.subscribe(items => {
        this.cartCount = items.length;
      })
    );
    
    this.subscriptions.add(
      this.cartService.wishlist$.subscribe(items => {
        this.wishlistCount = items.length;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.stopTranscription(true);
    this.clearAttachments();
  }

  popularSearches = [
    'Liderança',
    'Empreendedorismo',
    'Marketing Digital',
    'Tecnologia',
    'Design'
  ];

  get headerBackgroundClass() {
    if (this.showMobileMenu || this.isMobileView) {
      return 'bg-black/95 backdrop-blur-xl shadow-2xl';
    }
    if (this.isScrolled) {
      return 'bg-black/90 backdrop-blur-lg shadow-xl';
    }
    return 'bg-gradient-to-b from-black/90 via-black/50 to-transparent';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.handleViewportChange();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-menu')) {
      this.showProfileMenu = false;
    }
    if (!target.closest('.header-search')) {
      this.showSearchDropdown = false;
    }
    if (this.showMobileMenu) {
      const clickedPanel = this.eventPathHasClass(event, 'mobile-menu-panel');
      const clickedTrigger = this.eventPathHasClass(event, 'mobile-menu-trigger');
      if (!clickedPanel && !clickedTrigger) {
        this.closeMobileMenu();
      }
    }
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (this.showSearch) {
      this.showMobileMenu = false;
    } else {
      this.showSearchDropdown = false;
    }
  }

  usePrompt(prompt: string) {
    this.searchQuery = prompt;
  }

  toggleProfileMenu() {
    this.showProfileMenu = !this.showProfileMenu;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    if (this.showMobileMenu) {
      this.showSearch = false;
      this.showSearchDropdown = false;
    }
  }

  closeMobileMenu() {
    this.showMobileMenu = false;
  }

  setActiveNav(navId: string) {
    this.activeNav = navId;
    if (this.isMobileView) {
      this.showMobileMenu = false;
    }
  }

  onSearchBlur() {
    // Delay to allow click events on dropdown items
    setTimeout(() => {
      this.showSearchDropdown = false;
    }, 200);
  }

  selectSearch(search: string) {
    this.searchQuery = search;
    this.showSearchDropdown = false;
    // Navigate to search results or perform search
  }

  triggerAttachmentPicker(input: HTMLInputElement) {
    input.click();
  }

  handleAttachmentSelection(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files?.length) {
      return;
    }
    Array.from(target.files).forEach(file => this.addAttachmentFromFile(file));
    target.value = '';
  }

  removeAttachment(attachmentId: string) {
    this.aiAttachments = this.aiAttachments.filter(item => item.id !== attachmentId);
    this.aiStatusMessage = this.aiAttachments.length
      ? `${this.aiAttachments.length} anexo(s) restantes.`
      : 'Todos os anexos foram removidos.';
  }

  async toggleTranscription() {
    if (this.isTranscribing) {
      this.stopTranscription();
      return;
    }
    if (!this.ensureSpeechRecognition()) {
      this.aiStatusMessage = 'Seu navegador não suporta transcrição de voz.';
      return;
    }
    this.startTranscription();
  }

  submitAiRequest() {
    const trimmedQuery = this.searchQuery.trim();
    if (!trimmedQuery && this.aiAttachments.length === 0) {
      this.aiStatusMessage = 'Escreva uma pergunta ou adicione anexos antes de enviar.';
      return;
    }

    const attachmentsSnapshot = [...this.aiAttachments];
    const promptSnapshot = trimmedQuery;

    this.isSending = true;
    this.aiStatusMessage = 'MentorAI está analisando sua solicitação...';

    setTimeout(() => {
      const responseEntry: AiResponseEntry = {
        prompt: promptSnapshot,
        attachments: attachmentsSnapshot.length,
        answer: this.buildAiResponseText(promptSnapshot, attachmentsSnapshot.length),
        timestamp: new Date()
      };
      this.aiResponses = [responseEntry, ...this.aiResponses].slice(0, 3);
      this.aiStatusMessage = 'MentorAI enviou recomendações personalizadas.';
      this.resetAiForm();
      this.isSending = false;
    }, 1200);
  }

  private eventPathHasClass(event: MouseEvent, className: string): boolean {
    const hasComposedPath = typeof event.composedPath === 'function';
    if (hasComposedPath) {
      return event
        .composedPath()
        .some(el => el instanceof HTMLElement && el.classList?.contains(className));
    }
    const target = event.target as HTMLElement | null;
    return !!target?.closest(`.${className}`);
  }

  private addAttachmentFromFile(file: File) {
    const attachment: AiAttachment = {
      id: this.generateAttachmentId(),
      name: file.name,
      sizeLabel: this.formatBytes(file.size),
      source: file
    };
    this.aiAttachments = [attachment, ...this.aiAttachments];
    this.aiStatusMessage = `${this.aiAttachments.length} anexo(s) pronto(s) para envio.`;
  }

  private ensureSpeechRecognition(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      return false;
    }
    if (!this.speechRecognition) {
      this.speechRecognition = new SpeechRecognition();
      this.speechRecognition.lang = 'pt-BR';
      this.speechRecognition.interimResults = true;
      this.speechRecognition.continuous = true;
      this.speechRecognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0]?.transcript?.trim?.() ?? '';
          if (!transcript) {
            continue;
          }
          if (result.isFinal) {
            finalTranscript += `${transcript} `;
          } else {
            interimTranscript += `${transcript} `;
          }
        }

        if (finalTranscript.trim()) {
          this.transcriptionBaseText = [this.transcriptionBaseText, finalTranscript.trim()]
            .filter(Boolean)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
        }

        const composed = [this.transcriptionBaseText, interimTranscript.trim()]
          .filter(Boolean)
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();

        if (composed) {
          this.searchQuery = composed;
        }

        this.aiStatusMessage = interimTranscript.trim()
          ? 'Transcrevendo em tempo real...'
          : 'Transcrição atualizada.';
      };
      this.speechRecognition.onerror = () => {
        this.aiStatusMessage = 'Ocorreu um erro durante a transcrição.';
        this.stopTranscription(true);
      };
      this.speechRecognition.onend = () => {
        if (this.isTranscribing) {
          this.stopTranscription(true);
        }
      };
    }
    return true;
  }

  private startTranscription() {
    if (this.isSending) {
      this.aiStatusMessage = 'Conclua o envio atual antes de transcrever novamente.';
      return;
    }
    this.isTranscribing = true;
    this.transcriptionBaseText = this.searchQuery.trim();
    this.aiStatusMessage = 'Transcrevendo... fale próximo ao microfone.';
    this.speechRecognition?.start();
  }

  private stopTranscription(forceMessage = false) {
    if (this.speechRecognition) {
      try {
        this.speechRecognition.stop();
      } catch {
        // ignore stop errors
      }
    }
    if (this.transcriptionBaseText) {
      this.searchQuery = this.transcriptionBaseText;
    }
    if (!forceMessage) {
      this.aiStatusMessage = 'Transcrição finalizada.';
    }
    this.isTranscribing = false;
  }

  private resetAiForm() {
    this.searchQuery = '';
    this.clearAttachments();
  }

  private clearAttachments() {
    this.aiAttachments = [];
  }

  private formatBytes(bytes: number): string {
    if (!bytes) {
      return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const value = bytes / Math.pow(1024, i);
    return `${value.toFixed(1)} ${sizes[i]}`;
  }

  private generateAttachmentId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
      return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }

  private buildAiResponseText(prompt: string, attachments: number): string {
    const basePrompt = prompt || 'Seus anexos';
    const attachmentInfo = attachments > 0 ? ` Incluí ${attachments} anexo(s) na análise.` : '';
    return `${basePrompt} recebeu uma análise personalizada. ${attachmentInfo} Confira as recomendações destacando mentores, planos e próximos passos sugeridos.`;
  }

  private handleViewportChange() {
    if (typeof window === 'undefined') {
      return;
    }
    const isNowMobile = window.innerWidth < 1024;
    if (!isNowMobile && this.showMobileMenu) {
      this.showMobileMenu = false;
    }
    this.isMobileView = isNowMobile;
  }
}

