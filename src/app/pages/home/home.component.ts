import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface HeroSlide {
  id: string;
  title: string;
  tagline: string;
  maturity: string;
  duration: string;
  matchScore: number;
  focusAreas: string[];
  heroImage: string;
}

interface ContentItem {
  id: string;
  title: string;
  maturity: string;
  duration: string;
  thumbnail: string;
  tags: string[];
  matchScore?: number;
  top10Rank?: number;
  continueWatching?: boolean;
  progress?: number;
  badge?: string;
}

interface SectionConfig {
  id: string;
  title: string;
  layout: 'default' | 'top10' | 'continue';
  subtitle?: string;
  ctaLabel?: string;
  ctaRoute?: string;
  ctaFragment?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="relative bg-black min-h-screen w-full text-white">
      <!-- Hero -->
      <section class="relative w-full group" style="height: 82vh; min-height: 520px;"
               (mouseenter)="stopHeroLoop()"
               (mouseleave)="startHeroLoop()">
        <img [src]="activeHero.heroImage"
             [alt]="activeHero.title"
             class="absolute inset-0 w-full h-full object-cover object-center">
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent"></div>

        <div class="relative z-10 h-full flex items-end pb-16 md:pb-24 px-6 md:px-12 lg:px-16">
          <div class="max-w-3xl">
            <div class="flex items-center gap-3 text-sm text-white/80 mb-3">
              <span class="text-green-400 font-semibold">{{ activeHero.matchScore }}% dos líderes recomendam</span>
              <span class="px-2 py-0.5 border border-white/40 text-xs rounded">{{ activeHero.maturity }}</span>
              <span>{{ activeHero.duration }}</span>
            </div>
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              {{ activeHero.title }}
            </h1>
            <p class="text-lg md:text-xl text-white/90 mb-6 max-w-2xl">
              {{ activeHero.tagline }}
            </p>
            <div class="flex items-center gap-4">
              <button class="flex items-center gap-3 bg-white text-black px-6 py-3 rounded font-semibold hover:bg-gray-200 transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
            </svg>
                <span>Assistir agora</span>
          </button>
              <button class="flex items-center gap-3 bg-white/20 text-white px-6 py-3 rounded font-semibold hover:bg-white/30 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
                <span>Ver programa</span>
          </button>
                </div>
            <div class="flex flex-wrap items-center gap-2 mt-6 text-sm text-white/80">
              <span *ngFor="let focus of activeHero.focusAreas; let last = last">
                {{ focus }}<span *ngIf="!last"> • </span>
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

      <ng-template #cardHover let-item="item">
        <div class="card-hover-panel">
          <div class="card-hover-meta" *ngIf="item.matchScore || item.maturity || item.duration">
            <span class="match-score" *ngIf="item.matchScore">{{ item.matchScore }}% relevante</span>
            <span *ngIf="item.maturity">{{ item.maturity }}</span>
            <span *ngIf="item.duration">{{ item.duration }}</span>
          </div>
          <h3 class="card-hover-title">{{ item.title }}</h3>
          <div class="card-hover-actions">
            <button class="card-hover-btn primary" aria-label="Assistir agora">
              <svg viewBox="0 0 24 24" class="w-5 h-5" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <button class="card-hover-btn" aria-label="Adicionar à lista">
              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M12 5v14m-7-7h14"/></svg>
            </button>
            <button class="card-hover-btn" aria-label="Gostei">
              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="currentColor"><path d="M14 9V5a3 3 0 00-6 0v4H5v11h10l4-9V9h-5z"/></svg>
            </button>
            <button class="card-hover-btn" aria-label="Mais informações">
              <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </button>
          </div>
          <p class="card-hover-progress" *ngIf="item.progress">
            Continue de onde parou • {{ item.progress }}%
          </p>
          <div class="card-hover-tags" *ngIf="item.tags as tagsList">
            <span *ngFor="let tag of tagsList.slice(0, 3)">
              {{ getTagLabel(tag) }}
            </span>
          </div>
        </div>
      </ng-template>

      <!-- Rows -->
      <div class="-mt-28 md:-mt-36 space-y-12 pb-16">
        <section *ngFor="let section of homepageSections" class="px-4 md:px-10" [attr.id]="section.id">
          <div class="flex items-end justify-between mb-3 md:mb-4">
            <div>
              <h2 class="text-xl md:text-2xl font-semibold">{{ section.title }}</h2>
              <p *ngIf="section.subtitle" class="text-xs md:text-sm text-white/60 mt-1">{{ section.subtitle }}</p>
            </div>
            <a *ngIf="section.ctaRoute; else defaultCta"
               [routerLink]="section.ctaRoute"
               [fragment]="section.ctaFragment || undefined"
               class="text-xs md:text-sm uppercase tracking-wide text-white/70 hover:text-white transition-colors">
              {{ section.ctaLabel || 'Ver tudo' }}
            </a>
            <ng-template #defaultCta>
              <span class="text-xs md:text-sm uppercase tracking-wide text-white/40">
              Ver tudo
              </span>
            </ng-template>
          </div>
          
          <ng-container *ngIf="getItemsForSection(section.id) as items">
            <ng-container *ngIf="items.length > 0; else emptySection">
              <div class="relative group">
                <div class="overflow-x-auto scrollbar-hide" [attr.data-row]="section.id">
                  <div class="flex space-x-3 pb-6" [ngSwitch]="section.layout">
                    <ng-container *ngSwitchCase="'top10'">
                      <div *ngFor="let item of items; trackBy: trackById" class="flex items-center gap-3 min-w-[280px]">
                        <span class="netflix-rank-outline">{{ item.top10Rank }}</span>
                        <div class="relative netflix-card w-[180px] md:w-[210px] lg:w-[230px] aspect-[2/3] cursor-pointer"
                             [routerLink]="['/masterclasses']"
                             [queryParams]="{ id: item.id }">
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
                          <ng-container *ngTemplateOutlet="cardHover; context: { item: item }"></ng-container>
                        </div>
                      </div>
                    </ng-container>
                    <ng-container *ngSwitchCase="'continue'">
                      <div *ngFor="let item of items; trackBy: trackById"
                           class="flex-shrink-0 w-[190px] md:w-[210px] lg:w-[240px] cursor-pointer"
                           [routerLink]="['/masterclasses']"
                           [queryParams]="{ id: item.id }">
                        <div class="relative netflix-card aspect-[2/3] overflow-hidden">
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
                          <ng-container *ngTemplateOutlet="cardHover; context: { item: item }"></ng-container>
                        </div>
                      </div>
                    </ng-container>
                    <ng-container *ngSwitchDefault>
                      <div *ngFor="let item of items; trackBy: trackById"
                           class="flex-shrink-0 w-[170px] md:w-[200px] lg:w-[240px] cursor-pointer"
                           [routerLink]="['/masterclasses']"
                           [queryParams]="{ id: item.id }">
                        <div class="relative netflix-card aspect-[2/3] overflow-hidden">
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
                          <ng-container *ngTemplateOutlet="cardHover; context: { item: item }"></ng-container>
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

  heroSlides: HeroSlide[] = [
    {
      id: 'lideranca-adaptativa',
      title: 'Liderança Adaptativa em Ciclos de Crise',
      tagline: 'Mentoria gravada com Ana Costa para decisões rápidas, alinhamento e segurança psicológica em times distribuídos.',
      maturity: 'Intermediário • Liderança',
      duration: 'Programa completo • 12 episódios',
      matchScore: 99,
      focusAreas: ['Gestão de times', 'Estratégia de crise', 'Comunicação executiva'],
      heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&auto=format&fit=crop&q=80'
    },
    {
      id: 'produto-growth',
      title: 'Produto e Growth com Mentoria Hands-on',
      tagline: 'Felipe Costa registra frameworks para discovery, priorização e growth loops aplicáveis amanhã.',
      maturity: 'Avançado • Produto digital',
      duration: 'Mentoria gravada • 6h de conteúdo',
      matchScore: 96,
      focusAreas: ['Product Discovery', 'Growth loops', 'Métricas North Star'],
      heroImage: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=1920&auto=format&fit=crop&q=80'
    },
    {
      id: 'cx-playbook',
      title: 'CX Playbook para Líderes de Atendimento',
      tagline: 'Camila Ferreira detalha rituais, NPS e jornadas omnichannel em aulas curtas com planilhas prontas.',
      maturity: 'Essencial • Experiência do cliente',
      duration: 'Série sob demanda • 8 módulos',
      matchScore: 93,
      focusAreas: ['Customer Success', 'Service Design', 'KPI em CX'],
      heroImage: 'https://images.unsplash.com/photo-1485217988980-11786ced9454?w=1920&auto=format&fit=crop&q=80'
    }
  ];

  homepageSections: SectionConfig[] = [
    { id: 'mentorias', title: 'Mentorias gravadas em destaque', layout: 'default', subtitle: 'Conteúdos prontos para assistir quando quiser', ctaRoute: '/masterclasses', ctaLabel: 'Ver catálogo completo' },
    { id: 'trilhas', title: 'Trilhas profissionais guiadas', layout: 'default', subtitle: 'Sequências gravadas com planos de ação práticos', ctaRoute: '/planos', ctaLabel: 'Conhecer trilhas' },
    { id: 'temas', title: 'Temas mais assistidos da semana', layout: 'top10', subtitle: 'Baseado nos dados da comunidade MentorMatch' },
    { id: 'lideres', title: 'Para quem lidera pessoas', layout: 'default', subtitle: 'Mentorias sobre cultura, performance e estratégia', ctaRoute: '/empresas', ctaLabel: 'Ver soluções para empresas' },
    { id: 'criativos', title: 'Marketing, produto e inovação', layout: 'default', subtitle: 'Frameworks e estudos de caso sob demanda', ctaRoute: '/masterclasses', ctaLabel: 'Explorar temas' },
    { id: 'continue', title: 'Continue aprendendo', layout: 'continue', subtitle: 'Retome exatamente onde parou' }
  ];

  allContent: ContentItem[] = [
    {
      id: 'lideranca-hibrida',
      title: 'Mentoria Gravada: Liderança Híbrida de Alta Performance',
      maturity: 'Intermediário',
      duration: '4h12 de conteúdo sob demanda',
      thumbnail: 'https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=800&auto=format&fit=crop&q=80',
      tags: ['mentorias', 'temas', 'lideranca', 'new'],
      top10Rank: 1,
      matchScore: 99,
      continueWatching: true,
      progress: 45
    },
    {
      id: 'produto-growth-lab',
      title: 'Growth Lab: Produto Orientado a Dados',
      maturity: 'Avançado',
      duration: '5h05 • 9 módulos',
      thumbnail: 'https://images.unsplash.com/photo-1485988412941-77a35537dae4?w=800&auto=format&fit=crop&q=80',
      tags: ['mentorias', 'temas', 'criativos', 'trilhas'],
      top10Rank: 2,
      matchScore: 97
    },
    {
      id: 'estrategia-dados',
      title: 'Trilha Estratégia guiada por Dados',
      maturity: 'Intermediário',
      duration: '6h40 de gravações • materiais editáveis',
      thumbnail: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80',
      tags: ['trilhas', 'temas', 'criativos'],
      top10Rank: 3,
      matchScore: 94
    },
    {
      id: 'cx-sprint',
      title: 'CX Sprint: Experiência Omnichannel',
      maturity: 'Essencial',
      duration: '3h15 • 6 encontros',
      thumbnail: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80',
      tags: ['mentorias', 'temas', 'trilhas'],
      top10Rank: 4,
      matchScore: 92
    },
    {
      id: 'okr-lideres',
      title: 'Trilha OKR para líderes de área',
      maturity: 'Essencial',
      duration: '2h58 • planilhas prontas',
      thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80',
      tags: ['trilhas', 'lideranca'],
      top10Rank: 5,
      matchScore: 91
    },
    {
      id: 'storytelling-vendas',
      title: 'Storytelling Comercial e Pitch',
      maturity: 'Todos os níveis',
      duration: '2h33 • estudos de caso',
      thumbnail: 'https://images.unsplash.com/photo-1529333168431-9a1629a19c91?w=800&auto=format&fit=crop&q=80',
      tags: ['mentorias', 'criativos'],
      top10Rank: 6,
      matchScore: 88,
      continueWatching: true,
      progress: 62
    },
    {
      id: 'design-facilitation',
      title: 'Facilitação de Design Sprints',
      maturity: 'Intermediário',
      duration: '3h45 • templates prontos',
      thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format&fit=crop&q=80',
      tags: ['criativos', 'trilhas'],
      top10Rank: 7,
      matchScore: 86
    },
    {
      id: 'people-analytics',
      title: 'People Analytics na prática',
      maturity: 'Avançado',
      duration: '4h05 • dashboards',
      thumbnail: 'https://images.unsplash.com/photo-1521790797524-b2497295b8a0?w=800&auto=format&fit=crop&q=80',
      tags: ['lideranca', 'trilhas', 'mentorias'],
      top10Rank: 8,
      matchScore: 90
    },
    {
      id: 'negociacao-enterprise',
      title: 'Negociação enterprise com playbooks',
      maturity: 'Avançado',
      duration: '3h20 • planilhas de apoio',
      thumbnail: 'https://images.unsplash.com/photo-1521790945508-bf2a36314e85?w=800&auto=format&fit=crop&q=80',
      tags: ['mentorias', 'lideranca'],
      top10Rank: 9,
      matchScore: 89
    },
    {
      id: 'tech-rituais',
      title: 'Rituais para times de tecnologia',
      maturity: 'Intermediário',
      duration: '2h47 • frameworks distribuídos',
      thumbnail: 'https://images.unsplash.com/photo-1517433456452-f9633a875f6f?w=800&auto=format&fit=crop&q=80',
      tags: ['mentorias', 'trilhas', 'temas'],
      top10Rank: 10,
      matchScore: 87,
      continueWatching: true,
      progress: 28
    },
    {
      id: 'branding-autentico',
      title: 'Branding Autêntico para Startups',
      maturity: 'Essencial',
      duration: '1h55 • exercícios guiados',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80',
      tags: ['criativos', 'mentorias', 'new'],
      matchScore: 87
    },
    {
      id: 'inovacao-servicos',
      title: 'Inovação em Serviços e Experiências',
      maturity: 'Intermediário',
      duration: '3h10 • toolkit aplicável',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
      tags: ['criativos', 'mentorias', 'trilhas'],
      matchScore: 85
    },
    {
      id: 'comunicacao-executiva',
      title: 'Comunicação Executiva para Conselhos',
      maturity: 'Avançado',
      duration: '2h20 • roteiros práticos',
      thumbnail: 'https://images.unsplash.com/photo-1521790361259-7b5049710bc7?w=800&auto=format&fit=crop&q=80',
      tags: ['lideranca', 'mentorias'],
      matchScore: 88
    },
    {
      id: 'carreira-techexpert',
      title: 'Trilha de Carreira Tech Expert',
      maturity: 'Intermediário',
      duration: '5h30 • roadmap completo',
      thumbnail: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&auto=format&fit=crop&q=80',
      tags: ['trilhas', 'mentorias'],
      matchScore: 84
    }
  ];

  tagLabelMap: Record<string, string> = {
    mentorias: 'Mentorias gravadas',
    trilhas: 'Trilhas profissionais',
    temas: 'Temas em alta',
    lideranca: 'Liderança',
    criativos: 'Marketing & inovação',
    new: 'Novidade'
  };

  get activeHero() {
    return this.heroSlides[this.currentHero];
  }

  getTagLabel(tag: string): string {
    if (!tag) {
      return '';
    }
    return this.tagLabelMap[tag] ?? this.toTitleCase(tag);
  }

  private toTitleCase(value: string): string {
    return value
      .split(' ')
      .map(word => word ? word.charAt(0).toUpperCase() + word.slice(1) : '')
      .join(' ');
  }

  ngAfterViewInit() {
    this.startHeroLoop();
  }

  ngOnDestroy() {
    this.stopHeroLoop();
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

  getItemsForSection(sectionId: string) {
    switch (sectionId) {
      case 'mentorias':
        return this.allContent.filter(item => item.tags.includes('mentorias'));
      case 'trilhas':
        return this.allContent.filter(item => item.tags.includes('trilhas'));
      case 'temas':
        return this.allContent
          .filter(item => typeof item.top10Rank === 'number')
          .sort((a, b) => (a.top10Rank ?? 0) - (b.top10Rank ?? 0));
      case 'lideres':
        return this.allContent.filter(item => item.tags.includes('lideranca'));
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

  trackById(_index: number, item: ContentItem | HeroSlide) {
    return item.id;
  }
}
