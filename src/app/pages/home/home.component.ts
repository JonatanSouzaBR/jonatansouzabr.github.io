import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
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
  imports: [CommonModule],
  template: `
    <div class="relative bg-black min-h-screen w-full text-white">
      <!-- Hero -->
      <section class="relative w-full group hero-stage mt-6 md:mt-8 lg:mt-10" style="min-height: clamp(500px, 78vh, 760px);"
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

        <div class="relative z-10 h-full flex items-end pt-8 md:pt-12 pb-14 md:pb-20 px-4 sm:px-8 lg:px-16">
          <div class="max-w-3xl">
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              {{ activeHero.title }}
            </h1>
            <p class="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
              {{ activeHero.tagline }}
            </p>
            <div class="flex items-center gap-3 sm:gap-4 flex-wrap">
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
            <div class="flex flex-wrap items-center gap-2 mt-6 text-sm text-white/80">
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
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  currentHero = 0;
  heroInterval: any;
  private heroPointerStartX: number | null = null;
  private heroPointerStartY: number | null = null;
  private heroPointerStartTime = 0;
  private readonly heroSwipeThreshold = 60;
  private heroWheelCooldown = false;
  private heroWheelTimeout: any;
  constructor(private router: Router) {}

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
}
