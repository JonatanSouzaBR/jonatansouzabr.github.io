import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface UserProfile {
  interests: string[];
  level: 'iniciante' | 'intermediario' | 'avancado';
  goals: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="relative bg-black min-h-screen w-full pt-20 md:pt-24">
      <!-- Hero Carousel - Disney+ Style (Rectangular Banner) -->
      <div class="px-6 md:px-12 lg:px-16 pt-4 md:pt-6 mb-4">
        <section class="relative w-full overflow-hidden rounded-lg mx-auto group" 
                 style="height: 50vh; min-height: 380px; max-height: 520px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6), 0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3);" 
                 #heroCarousel
                 (mouseenter)="stopHeroCarouselAutoPlay()"
                 (mouseleave)="startHeroCarouselAutoPlay()">
          
          <!-- Navigation Arrows - Disney+ Style (Inside carousel, on sides) -->
          <button (click)="previousHeroSlide()" 
                  type="button"
                  class="absolute left-4 top-1/2 -translate-y-1/2 z-30 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                  style="display: flex; align-items: center; justify-content: center; padding: 12px;">
            <svg class="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" style="filter: drop-shadow(0 2px 8px rgba(0,0,0,0.9));">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
          <button (click)="nextHeroSlide()" 
                  type="button"
                  class="absolute right-4 top-1/2 -translate-y-1/2 z-30 text-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
                  style="display: flex; align-items: center; justify-content: center; padding: 12px;">
            <svg class="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="3" style="filter: drop-shadow(0 2px 8px rgba(0,0,0,0.9));">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        <div class="relative h-full flex" 
             [style.transform]="'translateX(-' + (currentHeroSlide * (100 / featuredMasterclasses.length)) + '%)'"
             [style.width]="(featuredMasterclasses.length * 100) + '%'"
             style="transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94); height: 100%;">
          <div *ngFor="let masterclass of featuredMasterclasses; let i = index" 
               class="relative flex-shrink-0"
               [style.width]="(100 / featuredMasterclasses.length) + '%'"
               style="height: 100%; display: flex; align-items: flex-end; position: relative;">
            <div class="absolute inset-0 z-0" style="background-color: #111827;">
              <!-- Imagem de alta resolução - Disney+ Style -->
              <img *ngIf="!imageErrors[i]"
                   [src]="masterclass.heroImage || masterclass.thumbnail" 
                   [alt]="masterclass.title"
                   [attr.loading]="i === 0 ? 'eager' : 'lazy'"
                   decoding="async"
                   (error)="onImageError($event, i)"
                   (load)="onImageLoad(i)"
                   style="width: 100%; height: 100%; object-fit: cover; position: absolute; top: 0; left: 0; display: block;">
              
              <!-- Fallback se imagem não carregar -->
              <div *ngIf="imageErrors[i]" class="absolute inset-0 flex items-center justify-center z-10" style="background: linear-gradient(135deg, #1f2937 0%, #111827 100%);">
                <div class="text-center px-8">
                  <h2 class="text-3xl md:text-4xl font-bold text-white mb-2" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif;">
                    {{ masterclass.title }}
                  </h2>
                  <p class="text-white/80" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif;">
                    {{ masterclass.category }}
                  </p>
                </div>
              </div>
              
              <!-- Gradientes Disney+ Style -->
              <div class="absolute inset-0 z-10 pointer-events-none" style="background: linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2), transparent);"></div>
              <div class="absolute inset-0 z-10 pointer-events-none" style="background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent);"></div>
            </div>
            
            <!-- Content Overlay - Disney+ Bottom Left Style -->
            <div class="relative z-20 w-full h-full flex items-end justify-start" style="padding: 0 1.5rem 1.5rem 1.5rem;">
              <div class="max-w-2xl" style="margin-bottom: 1rem;">
                <h1 class="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; text-shadow: 0 2px 8px rgba(0,0,0,0.8);">
                  {{ masterclass.title }}
                </h1>
                <p class="text-xs md:text-sm text-white mb-2 max-w-lg leading-relaxed" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; text-shadow: 0 1px 4px rgba(0,0,0,0.8); opacity: 0.95;">
                  {{ masterclass.description }}
                </p>
                <div class="flex items-center gap-2 text-white text-xs" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; opacity: 0.9;">
                  <span>{{ masterclass.duration }}</span>
                  <span>•</span>
                  <span>{{ masterclass.category }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </div>

      <!-- Hero Carousel Indicators - Disney+ Style (Dots with white border on active) -->
      <div class="relative z-10 bg-black -mt-1">
        <div class="flex justify-center items-center gap-2 py-2">
          <button *ngFor="let slide of featuredMasterclasses; let i = index"
                  (click)="goToHeroSlide(i)"
                  class="rounded-full transition-all duration-300 hover:bg-white/70 relative"
                  [style.width]="currentHeroSlide === i ? '10px' : '8px'"
                  [style.height]="currentHeroSlide === i ? '10px' : '8px'"
                  [style.background]="currentHeroSlide === i ? 'white' : 'rgba(255,255,255,0.4)'"
                  [style.border]="currentHeroSlide === i ? '2px solid white' : 'none'"
                  [style.box-sizing]="'border-box'"
                  [attr.aria-label]="'Ir para slide ' + (i + 1)">
          </button>
        </div>
      </div>

      <!-- Categories Section - MasterClass Style -->
      <section class="px-6 md:px-12 lg:px-16 pt-4 md:pt-6 pb-10 md:pb-12 bg-black">
          <div class="mb-5 md:mb-6">
            <h2 class="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif;">
              Explore por Categoria
            </h2>
          </div>
          
          <div class="flex flex-wrap gap-3 md:gap-4 justify-center">
            <button *ngFor="let category of allCategories" 
                    class="group flex items-center gap-2 px-4 py-2.5 bg-gray-900/60 hover:bg-gray-800/80 rounded-md transition-all duration-200 cursor-pointer"
                    [class.border]="category.id === 'trending'"
                    [class.border-red-600]="category.id === 'trending'"
                    [class.hover:border-red-500]="category.id === 'trending'"
                    (click)="filterByCategory(category.id)">
              <div class="transition-colors flex-shrink-0"
                   [class.text-red-600]="category.id === 'trending'"
                   [class.text-gray-500]="category.id !== 'trending'"
                   [class.group-hover:text-white]="category.id !== 'trending'"
                   [class.group-hover:text-red-500]="category.id === 'trending'">
                <svg *ngIf="category.icon === 'trending'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                </svg>
                <svg *ngIf="category.icon === 'lideranca'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
                <svg *ngIf="category.icon === 'empreendedorismo'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                </svg>
                <svg *ngIf="category.icon === 'marketing'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
                </svg>
                <svg *ngIf="category.icon === 'tecnologia'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
                <svg *ngIf="category.icon === 'design'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                </svg>
                <svg *ngIf="category.icon === 'vendas'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                </svg>
                <svg *ngIf="category.icon === 'saude'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <svg *ngIf="category.icon === 'musica'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                </svg>
                <svg *ngIf="category.icon === 'esportes'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
                <svg *ngIf="category.icon === 'escrita'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <span class="text-sm font-bold whitespace-nowrap transition-colors" 
                    [class.text-red-600]="category.id === 'trending'"
                    [class.text-gray-500]="category.id !== 'trending'"
                    [class.group-hover:text-white]="category.id !== 'trending'"
                    [class.group-hover:text-red-500]="category.id === 'trending'"
                    style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif;">
                {{ category.name }}
              </span>
            </button>
          </div>
        </section>

      <!-- Carousels Section - Premium Spacing -->
      <div class="relative bg-black w-full">
        <div class="space-y-12 md:space-y-14 pb-16 md:pb-20">
          <!-- Popular Now - Masterclass Style -->
          <section class="px-6 md:px-12 lg:px-16 pt-4 md:pt-6">
            <div class="mb-6">
              <div class="flex items-center justify-between">
                <h2 class="text-xl md:text-2xl font-bold text-white tracking-tight" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 24px;">Em Alta</h2>
                <a routerLink="/masterclasses" class="text-gray-400 hover:text-white transition-colors underline" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">
                  Ver todos
                </a>
              </div>
            </div>
            <div class="relative group">
              <div class="overflow-x-auto scrollbar-hide" 
                   id="popularCarousel"
                   (scroll)="onPopularCarouselScroll()">
                <div class="flex space-x-4 pb-6">
                  <div *ngFor="let masterclass of popularMasterclasses" 
                       class="flex-shrink-0 w-[200px] md:w-[240px] cursor-pointer masterclass-card"
                       [routerLink]="['/masterclasses', masterclass.id]">
                    <div class="relative rounded-lg overflow-hidden group/item transition-all duration-300 border-4 border-transparent hover:border-white">
                      <!-- Background Image with Text Overlay -->
                      <div class="relative aspect-[3/4] overflow-hidden">
                        <img [src]="masterclass.mentorImage" 
                             [alt]="masterclass.mentor"
                             loading="lazy"
                             class="w-full h-full object-cover object-center transition-transform duration-500 group-hover/item:scale-110">
                        <!-- Gradient Overlay for Text Readability -->
                        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover/item:from-black/70 group-hover/item:via-black/30 group-hover/item:to-black/10 transition-all duration-300"></div>
                        
                        <!-- Play Button - Appears on Hover -->
                        <div class="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                          <div class="bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
                            <svg class="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                        </div>
                        
                        <!-- Badge - Top Left -->
                        <div class="absolute top-2 left-2 z-10">
                          <span *ngIf="masterclass.isNew" class="inline-block px-2 py-1 bg-white text-black font-semibold rounded-full" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 11px;">
                            Novo
                          </span>
                          <span *ngIf="masterclass.allEpisodes" class="inline-block px-2 py-1 bg-white text-black font-semibold rounded-full" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 11px;">
                            Todos os Episódios Disponíveis
                          </span>
                        </div>
                        
                        <!-- Text Content Overlay - Bottom -->
                        <div class="absolute bottom-0 left-0 right-0 p-3 z-10">
                          <div class="mb-1.5">
                            <p class="text-white/80 mb-0.5" *ngIf="masterclass.seriesType" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 11px;">
                              {{ masterclass.seriesType }}
                            </p>
                            <h3 class="font-semibold text-white mb-1.5 line-clamp-2 leading-tight" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 15px;">
                              {{ masterclass.title }}
                            </h3>
                          </div>
                          <div class="space-y-0.5">
                            <p class="text-white/90" *ngIf="masterclass.instructors" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 12px;">
                              {{ masterclass.instructors }}
                            </p>
                            <p class="text-white/90" *ngIf="!masterclass.instructors && !masterclass.seriesType" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 12px;">
                              Com {{ masterclass.mentor }}
                            </p>
                            <p class="text-white/70" *ngIf="masterclass.episodes" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 11px;">
                              {{ masterclass.episodes }}
                            </p>
                            <p class="text-white/70" *ngIf="!masterclass.episodes" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 11px;">
                              {{ masterclass.duration }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Carousel Indicators (Dots) -->
              <div class="flex justify-center items-center gap-2 mt-6" *ngIf="popularCarouselPages.length > 1">
                <button *ngFor="let page of popularCarouselPages; let i = index"
                        (click)="goToPopularPage(i)"
                        [ngClass]="{
                          'bg-white w-8': popularCurrentPage === i,
                          'bg-white/40 w-2': popularCurrentPage !== i
                        }"
                        class="h-2 rounded-full transition-all duration-300"
                        [attr.aria-label]="'Ir para página ' + (i + 1)">
                </button>
              </div>
            </div>
          </section>

          <!-- Trending Now -->
          <section class="px-6 md:px-12 lg:px-16">
            <div class="mb-8">
              <h2 class="font-bold text-white tracking-tight" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 24px;">Em Alta Agora</h2>
            </div>
            <div class="relative group">
              <div class="overflow-x-auto scrollbar-hide" id="trendingCarousel">
                <div class="flex space-x-4 pb-6">
                  <div *ngFor="let masterclass of trendingMasterclasses.slice(0, 12)" 
                       class="flex-shrink-0 w-[240px] md:w-[320px] lg:w-[360px] cursor-pointer netflix-card"
                       [routerLink]="['/masterclasses', masterclass.id]">
                    <div class="relative aspect-video rounded-lg overflow-hidden group/item bg-gray-900 shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-white">
                      <img [src]="masterclass.thumbnail" 
                           [alt]="masterclass.title"
                           loading="lazy"
                           class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover/item:from-black/70 group-hover/item:via-black/40 group-hover/item:to-transparent transition-all duration-300"></div>
                      
                      <!-- Play Button - Appears on Hover -->
                      <div class="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                        <div class="bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
                          <svg class="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div class="absolute bottom-0 left-0 right-0 p-5">
                        <div class="flex items-center space-x-3 mb-3">
                          <img [src]="masterclass.mentorImage" 
                               [alt]="masterclass.mentor"
                               class="w-9 h-9 rounded-full object-cover border-2 border-white/30">
                          <span class="text-white body-font font-medium" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">{{ masterclass.mentor }}</span>
                        </div>
                        <h3 class="text-white font-semibold mb-2 line-clamp-2 leading-snug" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 18px;">{{ masterclass.title }}</h3>
                        <div class="flex items-center space-x-2 text-gray-400" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 12px;">
                          <span>{{ masterclass.duration }}</span>
                          <span>•</span>
                          <span class="capitalize">{{ masterclass.category }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button (click)="scrollCarousel('trending', 'left')" 
                      class="carousel-btn-left absolute left-0 top-0 bottom-6 w-14 h-full bg-gradient-to-r from-black/80 via-black/60 to-transparent hover:from-black/90 hover:via-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button (click)="scrollCarousel('trending', 'right')" 
                      class="carousel-btn-right absolute right-0 top-0 bottom-6 w-14 h-full bg-gradient-to-l from-black/80 via-black/60 to-transparent hover:from-black/90 hover:via-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </section>

          <!-- Category Carousels - Limited to 3 categories for premium feel -->
          <section *ngFor="let category of categories.slice(0, 3)" class="px-6 md:px-12 lg:px-16">
            <div class="mb-8">
              <h2 class="font-bold text-white tracking-tight" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 24px;">{{ category.name }}</h2>
            </div>
            <div class="relative group">
              <div class="overflow-x-auto scrollbar-hide" [attr.data-carousel]="category.id">
                <div class="flex space-x-4 pb-6">
                  <div *ngFor="let masterclass of getMasterclassesByCategory(category.id).slice(0, 12)" 
                       class="flex-shrink-0 w-[240px] md:w-[320px] lg:w-[360px] cursor-pointer netflix-card"
                       [routerLink]="['/masterclasses', masterclass.id]">
                    <div class="relative aspect-video rounded-lg overflow-hidden group/item bg-gray-900 shadow-2xl transition-all duration-300 border-4 border-transparent hover:border-white">
                      <img [src]="masterclass.thumbnail" 
                           [alt]="masterclass.title"
                           loading="lazy"
                           class="w-full h-full object-cover transition-transform duration-500 group-hover/item:scale-110">
                      <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover/item:from-black/70 group-hover/item:via-black/40 group-hover/item:to-transparent transition-all duration-300"></div>
                      
                      <!-- Play Button - Appears on Hover -->
                      <div class="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300">
                        <div class="bg-white/90 rounded-full p-4 hover:bg-white transition-colors">
                          <svg class="w-8 h-8 text-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      <div class="absolute bottom-0 left-0 right-0 p-5">
                        <div class="flex items-center space-x-3 mb-3">
                          <img [src]="masterclass.mentorImage" 
                               [alt]="masterclass.mentor"
                               class="w-9 h-9 rounded-full object-cover border-2 border-white/30">
                          <span class="text-white body-font font-medium" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">{{ masterclass.mentor }}</span>
                        </div>
                        <h3 class="text-white font-semibold mb-2 line-clamp-2 leading-snug" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 18px;">{{ masterclass.title }}</h3>
                        <div class="flex items-center space-x-2 text-gray-400" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 12px;">
                          <span>{{ masterclass.duration }}</span>
                          <span>•</span>
                          <span class="capitalize">{{ masterclass.category }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button (click)="scrollCarousel(category.id, 'left')" 
                      class="carousel-btn-left absolute left-0 top-0 bottom-6 w-14 h-full bg-gradient-to-r from-black/80 via-black/60 to-transparent hover:from-black/90 hover:via-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
              <button (click)="scrollCarousel(category.id, 'right')" 
                      class="carousel-btn-right absolute right-0 top-0 bottom-6 w-14 h-full bg-gradient-to-l from-black/80 via-black/60 to-transparent hover:from-black/90 hover:via-black/70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </div>
          </section>
        </div>
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
    .netflix-card {
      transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .netflix-card:hover {
      transform: scale(1.08);
      z-index: 10;
    }
    .masterclass-card {
      transition: transform 0.3s ease;
    }
    .masterclass-card:hover {
      transform: scale(1.05);
      z-index: 10;
    }
    .carousel-btn-left,
    .carousel-btn-right {
      transition: opacity 0.3s ease;
    }
    .carousel-nav-btn {
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .group:hover .carousel-nav-btn {
      opacity: 1;
    }
    @media (max-width: 768px) {
      .carousel-btn-left,
      .carousel-btn-right,
      .carousel-nav-btn {
        display: none;
      }
    }
  `]
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('heroCarousel', { static: false }) heroCarousel?: ElementRef<HTMLElement>;
  
  // Popular Carousel Pagination
  popularCurrentPage = 0;
  popularCarouselPages: number[] = [];

  constructor() {
  }

  // User Profile - Simulated (in real app, this would come from a service)
  userProfile: UserProfile | null = {
    interests: ['lideranca', 'tecnologia', 'marketing'],
    level: 'intermediario',
    goals: ['desenvolver-carreira', 'aprender-habilidades-tecnicas']
  };

  // Cache for recommended masterclasses to avoid recalculating
  private _recommendedMasterclasses: any[] | null = null;

  // Hero Carousel - Disney+ Style
  currentHeroSlide = 0;
  heroCarouselInterval: any;
  imageErrors: { [key: number]: boolean } = {};
  
  featuredMasterclasses = [
    {
      id: 1,
      title: 'Mentoria em Liderança',
      description: 'Desenvolva habilidades de liderança com mentores experientes e transforme sua carreira profissional.',
      duration: '5 horas',
      category: 'Liderança',
      mentor: 'João Silva',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=90',
      heroImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=90'
    },
    {
      id: 2,
      title: 'Coaching para Empreendedores',
      description: 'Acelere o crescimento do seu negócio com mentoria estratégica de especialistas renomados do mercado.',
      duration: '6 horas',
      category: 'Empreendedorismo',
      mentor: 'Maria Santos',
      mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=90',
      heroImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1920&q=90'
    },
    {
      id: 3,
      title: 'Mentoria em Desenvolvimento Profissional',
      description: 'Invista no seu crescimento pessoal e profissional com mentores que realmente fazem a diferença na sua trajetória.',
      duration: '8 horas',
      category: 'Desenvolvimento',
      mentor: 'Carlos Oliveira',
      mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=90',
      heroImage: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1920&q=90'
    },
    {
      id: 4,
      title: 'Mentoria em Carreira Executiva',
      description: 'Alcance posições de liderança com orientação personalizada de executivos sênior do mercado.',
      duration: '7 horas',
      category: 'Liderança',
      mentor: 'Ana Costa',
      mentorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=90',
      heroImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=90'
    },
    {
      id: 5,
      title: 'Mentoria para Startups',
      description: 'Construa seu negócio do zero com mentores que já criaram empresas de sucesso e sabem os desafios reais.',
      duration: '10 horas',
      category: 'Empreendedorismo',
      mentor: 'Pedro Lima',
      mentorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=90',
      heroImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=90'
    },
    {
      id: 6,
      title: 'Mentoria em Gestão de Equipes',
      description: 'Aprenda a liderar equipes de alto desempenho e criar ambientes de trabalho colaborativos e produtivos.',
      duration: '6 horas',
      category: 'Liderança',
      mentor: 'Patricia Alves',
      mentorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=90',
      heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=90'
    }
  ];

  get featuredMasterclass() {
    return this.featuredMasterclasses[this.currentHeroSlide];
  }

  // Reduced categories for premium feel - only 3 main categories (para carrosséis)
  categories = [
    { id: 'lideranca', name: 'Liderança' },
    { id: 'tecnologia', name: 'Tecnologia' },
    { id: 'marketing', name: 'Marketing' }
  ];

  // Todas as categorias para a seção de categorias (MasterClass style)
  allCategories = [
    { id: 'trending', name: 'Em Alta', icon: 'trending' },
    { id: 'lideranca', name: 'Liderança', icon: 'lideranca' },
    { id: 'empreendedorismo', name: 'Empreendedorismo', icon: 'empreendedorismo' },
    { id: 'marketing', name: 'Marketing', icon: 'marketing' },
    { id: 'tecnologia', name: 'Tecnologia', icon: 'tecnologia' },
    { id: 'design', name: 'Design', icon: 'design' },
    { id: 'vendas', name: 'Vendas', icon: 'vendas' },
    { id: 'saude', name: 'Saúde & Bem-estar', icon: 'saude' },
    { id: 'musica', name: 'Música', icon: 'musica' },
    { id: 'esportes', name: 'Esportes', icon: 'esportes' },
    { id: 'escrita', name: 'Escrita', icon: 'escrita' }
  ];

  allMasterclasses = [
    {
      id: 1,
      title: 'Liderança e Gestão de Equipes',
      mentor: 'João Silva',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'lideranca',
      duration: '5 horas',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 2,
      title: 'Empreendedorismo Digital',
      mentor: 'Maria Santos',
      mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      category: 'empreendedorismo',
      duration: '6 horas',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 3,
      title: 'Marketing e Branding',
      mentor: 'Carlos Oliveira',
      mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      category: 'marketing',
      duration: '4 horas',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 4,
      title: 'Tecnologia e Inovação',
      mentor: 'Ana Costa',
      mentorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      category: 'tecnologia',
      duration: '8 horas',
      thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 5,
      title: 'UI/UX Design Avançado',
      mentor: 'Pedro Lima',
      mentorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      category: 'design',
      duration: '6 horas',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 6,
      title: 'Vendas e Negociação',
      mentor: 'Patricia Alves',
      mentorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=400&h=400&fit=crop',
      category: 'vendas',
      duration: '5 horas',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 7,
      title: 'Gestão de Pessoas',
      mentor: 'João Silva',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'lideranca',
      duration: '4 horas',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 8,
      title: 'Startup e Inovação',
      mentor: 'Maria Santos',
      mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      category: 'empreendedorismo',
      duration: '7 horas',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 9,
      title: 'Marketing Digital',
      mentor: 'Carlos Oliveira',
      mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      category: 'marketing',
      duration: '5 horas',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 10,
      title: 'Desenvolvimento Full Stack',
      mentor: 'Ana Costa',
      mentorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      category: 'tecnologia',
      duration: '10 horas',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 11,
      title: 'Design Thinking',
      mentor: 'Pedro Lima',
      mentorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      category: 'design',
      duration: '6 horas',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d31294b2?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 12,
      title: 'Técnicas de Vendas',
      mentor: 'Patricia Alves',
      mentorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=400&h=400&fit=crop',
      category: 'vendas',
      duration: '4 horas',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 13,
      title: 'Liderança Transformacional',
      mentor: 'Roberto Mendes',
      mentorImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      category: 'lideranca',
      duration: '6 horas',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 14,
      title: 'Comunicação Eficaz para Líderes',
      mentor: 'Fernanda Rocha',
      mentorImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      category: 'lideranca',
      duration: '5 horas',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 15,
      title: 'Gestão de Equipes Remotas',
      mentor: 'Lucas Pereira',
      mentorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      category: 'lideranca',
      duration: '4 horas',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 16,
      title: 'Inteligência Emocional no Trabalho',
      mentor: 'Juliana Almeida',
      mentorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      category: 'lideranca',
      duration: '7 horas',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 17,
      title: 'Desenvolvimento de Líderes',
      mentor: 'Marcos Souza',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'lideranca',
      duration: '8 horas',
      thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 18,
      title: 'Estratégias de Liderança',
      mentor: 'Carla Martins',
      mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      category: 'lideranca',
      duration: '5 horas',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 19,
      title: 'Machine Learning e IA',
      mentor: 'Ricardo Ferreira',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'tecnologia',
      duration: '12 horas',
      thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 20,
      title: 'Cloud Computing Avançado',
      mentor: 'Beatriz Lima',
      mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      category: 'tecnologia',
      duration: '9 horas',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 21,
      title: 'Segurança da Informação',
      mentor: 'Felipe Costa',
      mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      category: 'tecnologia',
      duration: '7 horas',
      thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 22,
      title: 'DevOps e CI/CD',
      mentor: 'Renata Silva',
      mentorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      category: 'tecnologia',
      duration: '10 horas',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 23,
      title: 'Blockchain e Criptomoedas',
      mentor: 'Gustavo Rocha',
      mentorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      category: 'tecnologia',
      duration: '8 horas',
      thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 24,
      title: 'Arquitetura de Software',
      mentor: 'Isabela Santos',
      mentorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=400&h=400&fit=crop',
      category: 'tecnologia',
      duration: '11 horas',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 25,
      title: 'Mobile Development',
      mentor: 'Thiago Alves',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'tecnologia',
      duration: '9 horas',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 26,
      title: 'Marketing de Conteúdo',
      mentor: 'Amanda Torres',
      mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      category: 'marketing',
      duration: '6 horas',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 27,
      title: 'SEO e SEM Avançado',
      mentor: 'Bruno Mendes',
      mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      category: 'marketing',
      duration: '5 horas',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 28,
      title: 'Social Media Marketing',
      mentor: 'Larissa Costa',
      mentorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      category: 'marketing',
      duration: '7 horas',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 29,
      title: 'Email Marketing',
      mentor: 'Diego Oliveira',
      mentorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      category: 'marketing',
      duration: '4 horas',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 30,
      title: 'Influencer Marketing',
      mentor: 'Mariana Rocha',
      mentorImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=400&h=400&fit=crop',
      category: 'marketing',
      duration: '5 horas',
      thumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 31,
      title: 'Marketing Analytics',
      mentor: 'Rodrigo Silva',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      category: 'marketing',
      duration: '6 horas',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=800&q=90'
    },
    {
      id: 32,
      title: 'Estratégia de Marca',
      mentor: 'Vanessa Lima',
      mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      category: 'marketing',
      duration: '8 horas',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1200&h=800&q=90'
    }
  ];

  get trendingMasterclasses() {
    // Retorna pelo menos 8 masterclasses únicas para o carrossel
    return this.allMasterclasses.filter((m, index, self) => 
      index === self.findIndex((t) => t.thumbnail === m.thumbnail)
    ).slice(0, 12);
  }

  // Popular Masterclasses - Masterclass Style with badges and instructor focus
  popularMasterclasses = [
    {
      id: 1,
      title: 'Bem-estar Financeiro',
      mentor: 'João Silva',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&q=95',
      duration: null,
      episodes: '11 episódios',
      category: 'lideranca',
      isNew: false,
      allEpisodes: true,
      seriesType: 'SÉRIE ORIGINAL',
      instructors: null
    },
    {
      id: 3,
      title: 'Estratégia de IA no Trabalho',
      mentor: 'Carlos Oliveira',
      mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&q=95',
      duration: '1 hora 25 minutos',
      category: 'marketing',
      isNew: true,
      allEpisodes: false,
      seriesType: null,
      instructors: 'Carlos Oliveira, Maria Santos e outros'
    },
    {
      id: 4,
      title: 'Inteligência de Pessoas',
      mentor: 'Ana Costa',
      mentorImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=95',
      duration: '1 hora 39 minutos',
      category: 'tecnologia',
      isNew: true,
      allEpisodes: false,
      seriesType: null,
      instructors: 'Com Ana Costa'
    },
    {
      id: 7,
      title: 'Táticas de Liderança para Sucesso nos Negócios',
      mentor: 'João Silva',
      mentorImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&q=95',
      duration: '1 hora 22 minutos',
      category: 'lideranca',
      isNew: true,
      allEpisodes: false,
      seriesType: 'JOÃO SILVA',
      instructors: null
    },
    {
      id: 9,
      title: 'O Manual do Poder',
      mentor: 'Carlos Oliveira',
      mentorImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&q=95',
      duration: '1 hora 9 minutos',
      category: 'marketing',
      isNew: true,
      allEpisodes: false,
      seriesType: null,
      instructors: 'Com Professor Carlos Oliveira'
    }
  ];

  ngAfterViewInit() {
    // Calcular número de páginas do carrossel popular
    this.calculatePopularCarouselPages();
    
    // Iniciar auto-play do hero carousel
    this.startHeroCarouselAutoPlay();
  }

  ngOnDestroy() {
    // Limpar intervalo quando componente for destruído
    if (this.heroCarouselInterval) {
      clearInterval(this.heroCarouselInterval);
    }
  }

  startHeroCarouselAutoPlay() {
    // Auto-play: muda de slide a cada 5 segundos
    this.heroCarouselInterval = setInterval(() => {
      this.nextHeroSlide();
    }, 5000);
  }

  stopHeroCarouselAutoPlay() {
    if (this.heroCarouselInterval) {
      clearInterval(this.heroCarouselInterval);
      this.heroCarouselInterval = null;
    }
  }

  nextHeroSlide() {
    this.currentHeroSlide = (this.currentHeroSlide + 1) % this.featuredMasterclasses.length;
    this.restartAutoPlay();
  }

  previousHeroSlide() {
    this.currentHeroSlide = this.currentHeroSlide === 0 
      ? this.featuredMasterclasses.length - 1 
      : this.currentHeroSlide - 1;
    this.restartAutoPlay();
  }

  goToHeroSlide(index: number) {
    if (index >= 0 && index < this.featuredMasterclasses.length) {
      this.currentHeroSlide = index;
      this.restartAutoPlay();
    }
  }

  restartAutoPlay() {
    this.stopHeroCarouselAutoPlay();
    this.startHeroCarouselAutoPlay();
  }

  onImageError(event: any, index: number) {
    console.error('Erro ao carregar imagem do slide', index, event);
    this.imageErrors[index] = true;
  }

  onImageLoad(index: number) {
    // Remover erro se imagem carregar com sucesso
    if (this.imageErrors[index]) {
      delete this.imageErrors[index];
    }
  }

  
  calculatePopularCarouselPages() {
    // Aguardar um pouco para o DOM estar totalmente renderizado
    setTimeout(() => {
      const carousel = document.getElementById('popularCarousel');
      if (carousel) {
        const carouselWidth = carousel.clientWidth;
        const itemWidth = 320; // Largura do item no desktop (md:w-[320px])
        const gap = 16; // space-x-4 = 16px
        const itemsPerPage = Math.floor((carouselWidth + gap) / (itemWidth + gap));
        const totalPages = Math.ceil(this.popularMasterclasses.length / Math.max(itemsPerPage, 1));
        this.popularCarouselPages = Array.from({ length: totalPages }, (_, i) => i);
      }
    }, 100);
  }
  
  goToPopularPage(pageIndex: number) {
    const carousel = document.getElementById('popularCarousel');
    if (carousel) {
      const carouselWidth = carousel.clientWidth;
      const itemWidth = 320; // Largura do item no desktop
      const gap = 16; // space-x-4
      const itemsPerPage = Math.floor((carouselWidth + gap) / (itemWidth + gap));
      const scrollAmount = pageIndex * itemsPerPage * (itemWidth + gap);
      
      carousel.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
      
      this.popularCurrentPage = pageIndex;
    }
  }
  
  onPopularCarouselScroll() {
    const carousel = document.getElementById('popularCarousel');
    if (carousel) {
      const carouselWidth = carousel.clientWidth;
      const itemWidth = 320;
      const gap = 16;
      const itemsPerPage = Math.floor((carouselWidth + gap) / (itemWidth + gap));
      const scrollLeft = carousel.scrollLeft;
      const pageIndex = Math.round(scrollLeft / (itemsPerPage * (itemWidth + gap)));
      
      if (pageIndex >= 0 && pageIndex < this.popularCarouselPages.length) {
        this.popularCurrentPage = pageIndex;
      }
    }
  }

  get recommendedMasterclasses() {
    if (this._recommendedMasterclasses === null) {
      this._recommendedMasterclasses = this.calculateRecommendedMasterclasses();
    }
    return this._recommendedMasterclasses;
  }

  hasRecommendedMasterclasses(): boolean {
    return this.recommendedMasterclasses.length > 0;
  }

  private calculateRecommendedMasterclasses() {
    if (!this.userProfile || !this.userProfile.interests || this.userProfile.interests.length === 0) {
      return [];
    }
    
    return this.allMasterclasses.filter(m => 
      this.userProfile!.interests.includes(m.category)
    ).slice(0, 10);
  }

  getMasterclassesByCategory(categoryId: string) {
    return this.allMasterclasses.filter(m => m.category === categoryId);
  }

  filterByCategory(categoryId: string) {
    // Navegar para a página de masterclasses com filtro
    // Por enquanto, apenas console.log - pode ser implementado com roteamento
    console.log('Filtrar por categoria:', categoryId);
    // TODO: Implementar navegação para /masterclasses?category=categoryId
  }

  scrollCarousel(carouselId: string, direction: 'left' | 'right') {
    let carousel: HTMLElement | null = null;
    
    if (carouselId === 'trending') {
      carousel = document.querySelector('#trendingCarousel') as HTMLElement;
    } else if (carouselId === 'popular') {
      carousel = document.querySelector('#popularCarousel') as HTMLElement;
    } else if (carouselId === 'recommended') {
      carousel = document.querySelector('#recommendedCarousel') as HTMLElement;
    } else {
      carousel = document.querySelector(`[data-carousel="${carouselId}"]`) as HTMLElement;
    }
    
    if (carousel) {
      const scrollAmount = 360;
      carousel.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  }

}
