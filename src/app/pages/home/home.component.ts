import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HERO_SLIDES, HeroSlide, MASTERCLASS_SUMMARY, MasterclassSummary } from '../../data/masterclasses.data';

interface SectionConfig {
  id: string;
  title: string;
  layout: 'default' | 'top10' | 'continue';
  subtitle?: string;
  category?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative bg-black min-h-screen w-full text-white">
      <!-- Search Component - Gemini Style -->
      <section class="relative w-full flex items-center justify-center px-4 sm:px-8 lg:px-16" style="min-height: 100vh; padding-top: 1rem; padding-bottom: 4rem;">
        <div class="w-full max-w-2xl flex flex-col items-start justify-center">
          <!-- Greeting -->
          <div class="mb-6 w-full">
            <h2 class="text-sm md:text-base lg:text-lg font-normal text-white mb-2">John, é bom ter você aqui.</h2>
            <p class="text-xl md:text-2xl lg:text-3xl font-normal text-white/90">O que você quer desenvolver hoje?</p>
          </div>

          <!-- Search Input -->
          <div class="w-full relative">
            <div class="gemini-search-input">
              <div class="gemini-search-input-wrapper">
                <!-- Text area na parte superior -->
                <textarea 
                  rows="1"
                  placeholder="Diga o que busca — eu preparo a trilha."
                  class="gemini-textarea"
                  [(ngModel)]="searchQuery"
                  (input)="onSearchInput($event)"
                  (keydown.enter)="handleSearchEnter($event)"></textarea>
                <!-- Botões na parte inferior -->
                <div class="gemini-search-actions">
                  <div class="relative">
                    <input type="file" #fileInput class="hidden" (change)="handleFileUpload($event)" accept=".pdf,.doc,.docx,.txt,image/*">
                    <input type="file" #imageInput class="hidden" (change)="handleImageUpload($event)" accept="image/*" multiple>
                    <button 
                      class="gemini-attach-btn" 
                      type="button" 
                      title="Anexar arquivos"
                      (click)="toggleUploadMenu()">
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                      </svg>
                    </button>
                    <!-- Menu de Upload -->
                    <div *ngIf="showUploadMenu" class="gemini-upload-menu">
                      <button 
                        type="button"
                        class="gemini-upload-menu-item"
                        (click)="triggerFileUpload(fileInput)">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                        </svg>
                        <span>Enviar arquivos</span>
                      </button>
                      <button 
                        type="button"
                        class="gemini-upload-menu-item"
                        (click)="triggerImageUpload(imageInput)">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                        </svg>
                        <span>Enviar fotos</span>
                      </button>
                    </div>
                  </div>
                  <button 
                    class="gemini-send-btn"
                    [class.gemini-send-btn--recording]="isRecording"
                    type="button"
                    [title]="isRecording ? 'Parar gravação' : (searchQuery.trim() ? 'Enviar mensagem' : 'Gravar áudio')"
                    (click)="handleSendOrRecord()">
                    <svg *ngIf="!isRecording && !searchQuery.trim()" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                    </svg>
                    <svg *ngIf="isRecording" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                      <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/>
                    </svg>
                    <svg *ngIf="!isRecording && searchQuery.trim()" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Hero -->
      <section class="relative w-full group hero-stage" style="min-height: clamp(500px, 78vh, 760px);"
               (mouseenter)="stopHeroLoop()"
               (mouseleave)="startHeroLoop()"
               (pointerdown)="onHeroPointerDown($event)"
               (pointerup)="onHeroPointerUp($event)"
               (pointerleave)="onHeroPointerLeave()"
               (pointercancel)="onHeroPointerLeave()"
               (wheel)="onHeroWheel($event)">
        <img [src]="activeHero.heroImage"
             [alt]="activeHero.title"
             class="absolute inset-0 w-full h-full object-cover object-center">
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>

        <div class="relative z-10 h-full flex items-center justify-start text-left pt-[7.5rem] md:pt-[9.5rem] pb-[7.5rem] md:pb-[9.5rem] px-4 sm:px-8 lg:px-16">
          <div class="max-w-3xl flex flex-col items-start">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              {{ activeHero.title }}
            </h1>
            <p class="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
              {{ activeHero.tagline }}
            </p>
            <div class="flex items-center justify-start gap-3 sm:gap-4 flex-wrap">
              <button class="flex items-center gap-2 sm:gap-3 bg-white text-black px-5 sm:px-6 py-2.5 rounded font-semibold hover:bg-gray-200 transition-colors"
                      (click)="openHeroSlide(activeHero.id)">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
            </svg>
                <span>Assistir</span>
          </button>
              <button class="flex items-center gap-2 sm:gap-3 bg-white/20 text-white px-5 sm:px-6 py-2.5 rounded font-semibold hover:bg-white/30 transition-colors"
                      (click)="openHeroSlide(activeHero.id)">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
                <span>Mais informações</span>
          </button>
                </div>
            <div class="flex flex-wrap items-center justify-start gap-2 mt-6 text-sm text-white/80">
              <span *ngFor="let genre of activeHero.genres; let last = last">
                {{ genre }}<span *ngIf="!last"> • </span>
              </span>
              </div>
            </div>
      </div>

        <button (click)="previousHeroSlide()" 
                class="absolute left-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-opacity opacity-0 group-hover:opacity-100"
                style="background: rgba(0,0,0,0.55); border-radius: 50%; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
          </svg>
          </button>
        <button (click)="nextHeroSlide()" 
                class="absolute right-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-opacity opacity-0 group-hover:opacity-100"
                style="background: rgba(0,0,0,0.55); border-radius: 50%; width: 52px; height: 52px; display: flex; align-items: center; justify-content: center;">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </section>

      <!-- Hero dots -->
      <div class="flex justify-center gap-2 mt-4 mb-6">
        <button *ngFor="let slide of heroSlides; let i = index"
                (click)="goToHeroSlide(i)"
                class="rounded-full transition-all duration-300"
                [style.width]="currentHero === i ? '16px' : '10px'"
                [style.height]="currentHero === i ? '16px' : '10px'"
                [style.background]="currentHero === i ? '#fff' : 'rgba(255,255,255,0.4)'"></button>
              </div>

      <!-- Rows -->
      <div class="space-y-12 pb-16 mt-12 sm:mt-10 lg:mt-8">
        <section *ngFor="let section of homepageSections" class="px-4 md:px-10">
          <div class="flex flex-wrap gap-3 items-end justify-between mb-3 md:mb-4">
            <div>
              <h2 class="text-xl md:text-2xl font-semibold">{{ section.title }}</h2>
              <p *ngIf="section.subtitle" class="text-xs md:text-sm text-white/60 mt-1">{{ section.subtitle }}</p>
            </div>
            <button 
              class="text-xs md:text-sm uppercase tracking-wide text-white/70 hover:text-white transition-colors"
              (click)="viewAll(section)">
              Ver tudo
            </button>
          </div>
          
          <ng-container *ngIf="getItemsForSection(section.id) as items">
            <ng-container *ngIf="items.length > 0; else emptySection">
              <div class="relative group overflow-visible z-0">
                <div class="overflow-x-auto overflow-y-visible scrollbar-hide z-0" [attr.data-row]="section.id">
                  <div class="flex space-x-3 py-6" [ngSwitch]="section.layout">
                    <ng-container *ngSwitchCase="'top10'">
                      <div *ngFor="let item of items; trackBy: trackById" class="flex items-center gap-3 min-w-[260px] sm:min-w-[320px] lg:min-w-[360px] my-3">
                        <span class="netflix-rank-outline">{{ item.top10Rank }}</span>
                        <div class="relative netflix-card w-[72vw] sm:w-[240px] md:w-[260px] lg:w-[320px] aspect-[16/9] cursor-pointer"
                             (click)="openMasterclass(item.id)">
                          <img [src]="item.thumbnail" [alt]="item.title" class="w-full h-full object-cover">
                          <div class="card-overlay"></div>
                          <div class="card-actions">
                            <button aria-label="Adicionar à lista">
                              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 5v14m-7-7h14"/></svg>
                            </button>
                            <button aria-label="Gostei">
                              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M14 9V5a3 3 0 00-6 0v4H5v11h10l4-9V9h-5z"/></svg>
                            </button>
                          </div>
                          <button class="card-play" aria-label="Assistir">
                            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                          </button>
                          <div class="card-info-base absolute bottom-0 left-0 right-0 p-3 z-10">
                            <p class="text-xs text-white/70 mb-1" *ngIf="item.matchScore">
                              {{ item.matchScore }}% relevante • {{ item.maturity }}
                            </p>
                            <h3 class="text-white font-semibold text-sm leading-tight mb-1">{{ item.title }}</h3>
                            <p class="text-white/70 text-xs">{{ item.duration }}</p>
                          </div>
                        </div>
                      </div>
                    </ng-container>
                    <ng-container *ngSwitchCase="'continue'">
                      <div *ngFor="let item of items; trackBy: trackById"
                           class="flex-shrink-0 w-[72vw] sm:w-[240px] md:w-[260px] lg:w-[320px] cursor-pointer my-3">
                        <div class="relative netflix-card aspect-[16/9] overflow-hidden"
                             (click)="openMasterclass(item.id)">
                          <img [src]="item.thumbnail" [alt]="item.title" class="w-full h-full object-cover">
                          <div class="card-overlay"></div>
                          <button class="card-play" aria-label="Assistir">
                            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                          </button>
                          <div class="card-info-base absolute bottom-0 left-0 right-0 p-3 z-10">
                            <h3 class="text-white font-semibold text-sm leading-tight mb-1">{{ item.title }}</h3>
                            <p class="text-white/70 text-xs">{{ item.duration }}</p>
                            <div class="progress-track mt-3">
                              <div class="progress-bar" [style.width]="(item.progress || 0) + '%'"></div>
                            </div>
                            <p class="text-white/70 text-xs mt-2">Continuar assistindo</p>
                          </div>
                        </div>
                      </div>
                    </ng-container>
                    <ng-container *ngSwitchDefault>
                      <div *ngFor="let item of items; trackBy: trackById"
                           class="flex-shrink-0 w-[72vw] sm:w-[240px] md:w-[260px] lg:w-[320px] cursor-pointer my-3">
                        <div class="relative netflix-card aspect-[16/9] overflow-hidden"
                             (click)="openMasterclass(item.id)">
                          <img [src]="item.thumbnail" [alt]="item.title" class="w-full h-full object-cover">
                          <div class="card-overlay"></div>
                          <div class="card-actions">
                            <button aria-label="Adicionar à lista">
                              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 5v14m-7-7h14"/></svg>
                            </button>
                            <button aria-label="Gostei">
                              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M14 9V5a3 3 0 00-6 0v4H5v11h10l4-9V9h-5z"/></svg>
                            </button>
                          </div>
                          <button class="card-play" aria-label="Assistir">
                            <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                          </button>
                          <div class="absolute top-3 left-3 z-10" *ngIf="item.tags.includes('new')">
                            <span class="netflix-badge">Novo</span>
                          </div>
                          <div class="card-info-base absolute bottom-0 left-0 right-0 p-3 z-10">
                            <p class="text-xs text-white/70 mb-1" *ngIf="item.matchScore">
                              {{ item.matchScore }}% relevante • {{ item.maturity }}
                            </p>
                            <h3 class="text-white font-semibold text-sm leading-tight mb-1">{{ item.title }}</h3>
                            <p class="text-white/70 text-xs">{{ item.duration }}</p>
                          </div>
                        </div>
                      </div>
                    </ng-container>
                  </div>
                </div>
                <button (click)="scrollRow(section.id, 'left')" 
                        class="absolute left-0 top-0 bottom-6 w-12 h-full bg-gradient-to-r from-black via-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
                <button (click)="scrollRow(section.id, 'right')" 
                        class="absolute right-0 top-0 bottom-6 w-12 h-full bg-gradient-to-l from-black via-black/80 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
            </ng-container>
          </ng-container>

          <ng-template #emptySection>
            <p class="text-white/60 text-sm py-8">Nenhum conteúdo disponível.</p>
          </ng-template>
          </section>
      </div>
    </div>
  `,
  styles: [`
    .scrollbar-hide {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
    .scrollbar-hide::-webkit-scrollbar {
      display: none;
    }

    /* Gemini Search Input Styles */
    .gemini-search-input {
      width: 100%;
    }

    .gemini-search-input-wrapper {
      position: relative;
      border-radius: 24px;
      border: none;
      background: rgba(38, 38, 38, 0.8);
      padding: 1.25rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-height: 80px;
      transition: all 0.2s ease;
      backdrop-filter: blur(10px);
    }

    .gemini-textarea {
      width: 100%;
      background: transparent;
      border: none;
      color: #fff;
      resize: none;
      font-size: 1rem;
      outline: none;
      line-height: 1.6;
      padding: 0.5rem 0;
      min-height: 32px;
      max-height: 200px;
      overflow-y: auto;
    }

    .gemini-textarea::placeholder {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1rem;
      font-weight: 400;
    }

    .gemini-search-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-top: 0.5rem;
      padding-top: 0.5rem;
    }

    .gemini-attach-btn {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.8);
      background: transparent;
      cursor: pointer;
      transition: all 0.2s;
    }

    .gemini-attach-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .gemini-send-btn {
      width: 36px;
      height: 36px;
      border-radius: 10px;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: rgba(255, 255, 255, 0.8);
      background: transparent;
      cursor: pointer;
      transition: all 0.2s;
    }

    .gemini-send-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .gemini-send-btn--recording {
      background: rgba(229, 9, 20, 0.2) !important;
      border-color: rgba(229, 9, 20, 0.5) !important;
      color: #E50914 !important;
      animation: pulse-recording 2s infinite;
    }

    @keyframes pulse-recording {
      0%, 100% {
        opacity: 1;
        box-shadow: 0 0 0 0 rgba(229, 9, 20, 0.4);
      }
      50% {
        opacity: 0.8;
        box-shadow: 0 0 0 8px rgba(229, 9, 20, 0);
      }
    }

    /* Upload Menu Styles */
    .gemini-upload-menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      background: rgba(26, 26, 26, 0.95);
      border-radius: 12px;
      padding: 0.5rem;
      min-width: 180px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .gemini-upload-menu-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem 1rem;
      border-radius: 8px;
      border: none;
      background: transparent;
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.9375rem;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      width: 100%;
    }

    .gemini-upload-menu-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .gemini-upload-menu-item svg {
      flex-shrink: 0;
      color: rgba(255, 255, 255, 0.8);
    }

    .gemini-upload-menu-item span {
      flex: 1;
    }

    @media (max-width: 768px) {
      .gemini-search-input-wrapper {
        padding: 0.875rem 1rem;
        min-height: 56px;
      }

      .gemini-textarea {
        font-size: 0.9375rem;
      }

      .gemini-attach-btn,
      .gemini-send-btn {
        width: 32px;
        height: 32px;
      }
    }
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentHero = 0;
  heroInterval: any;
  searchQuery = '';
  showUploadMenu = false;
  isRecording = false;
  private speechRecognition: any = null;
  private transcriptionBaseText = '';
  private heroPointerStartX: number | null = null;
  private heroPointerStartY: number | null = null;
  private heroPointerStartTime = 0;
  private readonly heroSwipeThreshold = 60;
  private heroWheelCooldown = false;
  private heroWheelTimeout: any;
  private documentClickHandler = (event: MouseEvent) => this.handleDocumentClick(event);
  
  constructor(private router: Router) {
    // Listener para fechar o menu ao clicar fora
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.documentClickHandler);
    }
  }

  heroSlides: HeroSlide[] = HERO_SLIDES;

  homepageSections: SectionConfig[] = [
    { id: 'new', title: 'Novas mentorias para você', layout: 'default', subtitle: 'Lançamentos e estreias guiadas pela comunidade' },
    { id: 'top10', title: 'Top mentorias da semana', layout: 'top10', subtitle: 'Baseado no engajamento da MentorMatch' },
    { id: 'lideres', title: 'Para quem lidera times', layout: 'default', subtitle: 'Mentorias sobre cultura, performance e estratégia', category: 'Liderança' },
    { id: 'produto', title: 'Produto, Growth e Tech', layout: 'default', subtitle: 'Playbooks aplicáveis para squads digitais', category: 'Tecnologia' },
    { id: 'people', title: 'People, cultura e diversidade', layout: 'default', subtitle: 'Ferramentas para RH estratégico', category: 'Empreendedorismo' },
    { id: 'criativos', title: 'Storytelling e comunicação', layout: 'default', subtitle: 'Mentorias para apresentações e narrativas', category: 'Marketing' },
    { id: 'continue', title: 'Continue de onde parou', layout: 'continue', subtitle: 'Retome suas mentorias em andamento' }
  ];

  allContent: MasterclassSummary[] = MASTERCLASS_SUMMARY;


  openMasterclass(id: string) {
    this.router.navigate(['/masterclasses', id]);
  }

  openHeroSlide(id: string) {
    this.openMasterclass(id);
  }

  viewAll(section: SectionConfig) {
    if (section.category) {
      this.router.navigate(['/masterclasses'], { queryParams: { category: section.category } });
      return;
    }

    this.router.navigate(['/masterclasses']);
  }

  get activeHero() {
    return this.heroSlides[this.currentHero];
  }

  ngAfterViewInit() {
    this.startHeroLoop();
  }

  ngOnDestroy() {
    this.stopHeroLoop();
    if (this.heroWheelTimeout) {
      clearTimeout(this.heroWheelTimeout);
      this.heroWheelTimeout = null;
    }
    // Stop recording if active
    if (this.isRecording) {
      this.stopRecording();
    }
    // Remove document click listener
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.documentClickHandler);
    }
  }

  startHeroLoop() {
    this.stopHeroLoop();
    this.heroInterval = setInterval(() => {
      this.nextHeroSlide();
    }, 5000);
  }

  stopHeroLoop() {
    if (this.heroInterval) {
      clearInterval(this.heroInterval);
      this.heroInterval = null;
    }
  }

  nextHeroSlide() {
    this.currentHero = (this.currentHero + 1) % this.heroSlides.length;
  }

  previousHeroSlide() {
    this.currentHero = this.currentHero === 0
      ? this.heroSlides.length - 1
      : this.currentHero - 1;
  }

  goToHeroSlide(index: number) {
    if (index >= 0 && index < this.heroSlides.length) {
      this.currentHero = index;
      this.startHeroLoop();
    }
  }

  onHeroPointerDown(event: PointerEvent) {
    if (!event.isPrimary) return;
    if (event.pointerType === 'mouse' && event.buttons !== 1) return;
    this.heroPointerStartX = event.clientX;
    this.heroPointerStartY = event.clientY;
    this.heroPointerStartTime = event.timeStamp;
  }

  onHeroPointerUp(event: PointerEvent) {
    if (!event.isPrimary || this.heroPointerStartX === null || this.heroPointerStartY === null) {
      this.resetHeroPointer();
      return;
    }
    const deltaX = event.clientX - this.heroPointerStartX;
    const deltaY = event.clientY - this.heroPointerStartY;
    const duration = event.timeStamp - this.heroPointerStartTime;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.heroSwipeThreshold && duration < 1000) {
      deltaX < 0 ? this.nextHeroSlide() : this.previousHeroSlide();
    }
    this.resetHeroPointer();
  }

  onHeroPointerLeave() {
    this.resetHeroPointer();
  }

  onHeroWheel(event: WheelEvent) {
    if (this.heroWheelCooldown) return;
    const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY);
    if (horizontalIntent && Math.abs(event.deltaX) > 20) {
      event.preventDefault();
      this.heroWheelCooldown = true;
      event.deltaX > 0 ? this.nextHeroSlide() : this.previousHeroSlide();
      if (this.heroWheelTimeout) {
        clearTimeout(this.heroWheelTimeout);
      }
      this.heroWheelTimeout = setTimeout(() => {
        this.heroWheelCooldown = false;
        this.heroWheelTimeout = null;
      }, 500);
    }
  }

  private resetHeroPointer() {
    this.heroPointerStartX = null;
    this.heroPointerStartY = null;
    this.heroPointerStartTime = 0;
  }

  getItemsForSection(sectionId: string) {
    switch (sectionId) {
      case 'new':
        return this.allContent.filter(item => item.tags.includes('new'));
      case 'top10':
        return this.allContent
          .filter(item => typeof item.top10Rank === 'number')
          .sort((a, b) => (a.top10Rank ?? 0) - (b.top10Rank ?? 0));
      case 'lideres':
        return this.allContent.filter(item => item.tags.includes('lideres'));
      case 'produto':
        return this.allContent.filter(item => item.tags.includes('produto'));
      case 'people':
        return this.allContent.filter(item => item.tags.includes('people'));
      case 'criativos':
        return this.allContent.filter(item => item.tags.includes('criativos'));
      case 'continue':
        return this.allContent.filter(item => item.continueWatching);
      default:
      return [];
    }
  }

  scrollRow(rowId: string, direction: 'left' | 'right') {
    const row = document.querySelector(`[data-row="${rowId}"]`);
    if (row) {
      const scrollAmount = 420;
      row.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  }

  trackById(_index: number, item: MasterclassSummary | HeroSlide) {
    return item.id;
  }

  onSearchInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.searchQuery = target.value;
  }

  handleSendOrRecord() {
    if (this.isRecording) {
      this.stopRecording();
      return;
    }

    if (this.searchQuery.trim()) {
      // Send message
      this.router.navigate(['/masterclasses'], { queryParams: { search: this.searchQuery.trim() } });
    } else {
      // Start recording
      this.startRecording();
    }
  }

  startRecording() {
    if (!this.ensureSpeechRecognition()) {
      console.error('Seu navegador não suporta transcrição de voz.');
      return;
    }

    this.isRecording = true;
    this.transcriptionBaseText = this.searchQuery.trim();
    this.searchQuery = this.transcriptionBaseText;
    
    if (this.speechRecognition) {
      this.speechRecognition.start();
    }
  }

  stopRecording() {
    this.isRecording = false;
    if (this.speechRecognition) {
      try {
        this.speechRecognition.stop();
      } catch (e) {
        // Ignore stop errors
      }
    }
    if (this.transcriptionBaseText) {
      this.searchQuery = this.transcriptionBaseText;
    }
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
      this.speechRecognition.continuous = true;
      this.speechRecognition.interimResults = true;

      this.speechRecognition.onresult = (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        if (finalTranscript.trim()) {
          this.transcriptionBaseText = (this.transcriptionBaseText + ' ' + finalTranscript.trim()).trim();
        }

        const composed = (this.transcriptionBaseText + ' ' + interimTranscript).trim();
        if (composed) {
          this.searchQuery = composed;
        }
      };

      this.speechRecognition.onerror = (event: any) => {
        console.error('Erro na transcrição:', event.error);
        if (event.error === 'no-speech' || event.error === 'audio-capture') {
          // Erros que não devem parar a gravação
          return;
        }
        this.stopRecording();
      };

      this.speechRecognition.onend = () => {
        if (this.isRecording) {
          // Reiniciar automaticamente se ainda estiver gravando
          try {
            this.speechRecognition.start();
          } catch (e) {
            this.stopRecording();
          }
        }
      };
    }

    return true;
  }

  handleSearchEnter(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    if (keyboardEvent.key === 'Enter' && !keyboardEvent.shiftKey) {
      keyboardEvent.preventDefault();
      if (this.searchQuery.trim()) {
        // Navigate to search or perform search action
        this.router.navigate(['/masterclasses'], { queryParams: { search: this.searchQuery.trim() } });
      }
    }
  }

  // Upload Menu Methods
  toggleUploadMenu() {
    this.showUploadMenu = !this.showUploadMenu;
  }

  closeUploadMenu() {
    this.showUploadMenu = false;
  }

  triggerFileUpload(input: HTMLInputElement) {
    this.closeUploadMenu();
    input.click();
  }

  triggerImageUpload(input: HTMLInputElement) {
    this.closeUploadMenu();
    input.click();
  }

  handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      // Stub function - implementar lógica de upload aqui
      console.log('Arquivo selecionado:', file.name, file.type, file.size);
      // TODO: Implementar lógica de upload de arquivo
      target.value = ''; // Reset input
    }
  }

  handleImageUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const files = Array.from(target.files);
      // Stub function - implementar lógica de upload aqui
      console.log('Imagens selecionadas:', files.map(f => ({ name: f.name, type: f.type, size: f.size })));
      // TODO: Implementar lógica de upload de imagens
      target.value = ''; // Reset input
    }
  }

  private handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.gemini-attach-btn') && !target.closest('.gemini-upload-menu')) {
      this.closeUploadMenu();
    }
  }
}
