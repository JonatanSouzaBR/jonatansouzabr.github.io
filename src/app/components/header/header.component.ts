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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
            [ngClass]="{'bg-black': isScrolled, 'bg-gradient-to-b from-black via-black/80 to-transparent': !isScrolled}">
      <nav class="w-full px-4 md:px-8 lg:px-12">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Left Section: Logo + Navigation -->
          <div class="flex items-center space-x-4 md:space-x-8 flex-shrink-0">
            <!-- Logo MentorMatch Play -->
            <a routerLink="/" class="cursor-pointer flex items-center space-x-3">
              <span class="text-white font-bold text-xl md:text-2xl tracking-tight flex items-center gap-2">
                MENTORMATCH
                <span class="flex items-center gap-2">
                  <span class="text-[#E50914]">PLAY</span>
                  <span class="flex items-center justify-center w-7 h-7 rounded-full border border-[#E50914] text-[#E50914]">
                    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    <span class="sr-only">Play</span>
                  </span>
                </span>
              </span>
            </a>
            
            <!-- Navigation Links - Estilo Netflix -->
            <div class="hidden lg:flex items-center space-x-4">
              <a *ngFor="let link of navLinks"
                 [routerLink]="link.route"
                 (click)="setActiveNav(link.id)"
                 class="text-sm font-medium transition-colors"
                 [ngClass]="{
                   'text-white font-semibold': activeNav === link.id,
                   'text-gray-300 hover:text-white': activeNav !== link.id
                 }">
                {{ link.label }}
              </a>
            </div>
          </div>

          <!-- Right Section: Search + Icons + Profile -->
          <div class="flex items-center space-x-3 md:space-x-5 flex-shrink-0">
            <div class="hidden md:flex items-center">
              <!-- Search Icon -->
              <button (click)="toggleSearch()" class="text-white hover:text-gray-300 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </div>

            <!-- Wishlist Icon -->
            <a routerLink="/lista-desejos" class="relative text-white hover:text-gray-300 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span *ngIf="wishlistCount > 0" class="absolute -top-2 -right-2 bg-[#E50914] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ wishlistCount }}</span>
            </a>

            <!-- Cart Icon -->
            <a routerLink="/carrinho" class="relative text-white hover:text-gray-300 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              <span *ngIf="cartCount > 0" class="absolute -top-2 -right-2 bg-[#E50914] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ cartCount }}</span>
            </a>

            <!-- Profile Icon -->
            <div class="relative profile-menu hidden sm:block">
              <button (click)="toggleProfileMenu()" class="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
                <div class="w-8 h-8 bg-[#E50914] rounded flex items-center justify-center">
                  <span class="text-white text-sm font-bold">J</span>
                </div>
                <svg class="w-4 h-4 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Profile Dropdown -->
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

            <!-- Mobile Menu -->
            <button (click)="toggleMobileMenu()" class="lg:hidden text-white">
              <svg *ngIf="!showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg *ngIf="showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Search Bar (Expanded) -->
        <div *ngIf="showSearch" class="pb-4">
          <div class="ai-panel">
            <div class="ai-panel__header">
              <div class="ai-panel__identity">
                <div>
                  <p class="ai-panel__title">Mentor<span class="ai-panel__title-highlight">AI</span> Assistente</p>
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
              <div class="ai-panel__chips">
                <span class="ai-panel__chip" *ngFor="let chip of aiChips">{{ chip }}</span>
              </div>
            </div>

            <div class="ai-panel__quick-prompts">
              <p class="ai-panel__section-label">Sugestões rápidas</p>
              <div class="ai-panel__prompt-grid">
                <button *ngFor="let prompt of quickPrompts" (click)="usePrompt(prompt)" class="ai-panel__prompt-card">
                  <span>{{ prompt }}</span>
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
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

        <!-- Mobile Menu -->
        <div *ngIf="showMobileMenu" class="lg:hidden pb-5 border-t border-gray-800 mt-4 pt-4 space-y-4">
          <div class="flex flex-col space-y-3">
            <a *ngFor="let link of navLinks"
               [routerLink]="link.route"
               (click)="setActiveNav(link.id)"
               class="text-sm py-2 text-white hover:text-gray-300 transition-colors">
              {{ link.label }}
            </a>
          </div>
          <div class="grid grid-cols-1 gap-3">
            <button (click)="toggleSearch()" class="flex flex-col items-center gap-1 text-xs text-white/80 hover:text-white transition-colors">
              <span class="flex items-center justify-center w-9 h-9 rounded-full border border-white/40">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              Buscar
            </button>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-gray-800 text-sm text-white/80">
            <a routerLink="/perfil" class="hover:text-white">Perfil</a>
            <a routerLink="/lista-desejos" class="hover:text-white">Lista de desejos</a>
            <a routerLink="/carrinho" class="hover:text-white">Carrinho</a>
          </div>
        </div>
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

  navLinks = [
    { id: 'masterclasses', label: 'Masterclasses', route: '/masterclasses' },
    { id: 'planos', label: 'Planos', route: '/planos' },
    { id: 'empresas', label: 'Empresas', route: '/empresas' },
    { id: 'presentes', label: 'Presentes', route: '/presentes' },
    { id: 'mentores', label: 'Área do Mentor', route: '/mentor/dashboard' }
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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
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
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
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
  }

  setActiveNav(navId: string) {
    this.activeNav = navId;
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
}

