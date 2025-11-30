import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-mc-black" 
            [class.bg-mc-black]="isScrolled || true">
      <nav class="w-full px-4 md:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <!-- Left Section: Logo + Browse -->
          <div class="flex items-center space-x-6 md:space-x-8 flex-shrink-0">
            <!-- Logo - Estilo The Economist -->
            <span class="logo-economist-style">
              MentorMatch
            </span>
            
            <!-- Browse Button with Dropdown -->
            <div class="relative group hidden md:block">
              <button (click)="toggleBrowseMenu()" 
                      class="flex items-center space-x-1 text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm font-mc-medium">
                <span>Browse</span>
                <svg class="w-4 h-4 transition-transform" 
                     [class.rotate-180]="showBrowseMenu"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Browse Dropdown Menu -->
              <div *ngIf="showBrowseMenu" 
                   class="absolute top-full left-0 mt-2 w-64 bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md shadow-mc-xl py-2 z-50"
                   (click)="$event.stopPropagation()">
                <a *ngFor="let category of browseCategories" 
                   routerLink="/masterclasses" 
                   [queryParams]="{category: category.id}"
                   class="flex items-center justify-between px-4 py-3 text-mc-white hover:bg-mc-gray-800 transition-colors font-mc text-mc-sm group/item">
                  <span>{{ category.name }}</span>
                  <svg class="w-4 h-4 opacity-0 group-hover/item:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </a>
                <div class="border-t border-mc-gray-800 mt-2 pt-2">
                  <a routerLink="/masterclasses" 
                     class="block px-4 py-3 text-mc-white hover:bg-mc-gray-800 transition-colors font-mc text-mc-sm font-mc-semibold">
                    Ver Todas as Categorias
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Center Section: Search Bar -->
          <div class="flex-1 max-w-2xl mx-4 md:mx-8 hidden md:block">
            <div class="relative">
              <div class="relative">
                <input type="text" 
                       [(ngModel)]="searchQuery"
                       (focus)="showSearchDropdown = true"
                       (blur)="onSearchBlur()"
                       placeholder="O que você quer aprender hoje?"
                       class="w-full bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md px-4 py-2.5 pl-10 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-gray-700 focus:ring-1 focus:ring-mc-gray-700 font-mc text-mc-sm transition-all">
                <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-mc-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
              
              <!-- Search Dropdown -->
              <div *ngIf="showSearchDropdown && popularSearches.length > 0" 
                   class="absolute top-full left-0 right-0 mt-2 bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md shadow-mc-xl py-2 z-50">
                <div class="px-4 py-2 border-b border-mc-gray-800">
                  <p class="text-mc-gray-400 font-mc text-mc-xs uppercase tracking-wide">Buscas Populares</p>
                </div>
                <a *ngFor="let search of popularSearches" 
                   href="#"
                   (click)="selectSearch(search); $event.preventDefault()"
                   class="flex items-center px-4 py-2.5 text-mc-white hover:bg-mc-gray-800 transition-colors font-mc text-mc-sm">
                  <svg class="w-4 h-4 mr-3 text-mc-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                  <span>{{ search }}</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Right Section: Links + CTA Button -->
          <div class="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
            <!-- Mobile Search Icon -->
            <button (click)="toggleMobileSearch()" class="md:hidden text-mc-white hover:text-mc-gray-300 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>

            <!-- Navigation Links -->
            <div class="hidden lg:flex items-center space-x-6">
              <a href="#" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm">Para Empresas</a>
              <a href="#" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm">Presentes</a>
              <a href="#" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm">Ver Planos</a>
              <a href="#" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm">Entrar</a>
            </div>

            <!-- CTA Button -->
            <button class="bg-mc-red hover:bg-mc-button-primary-hover text-mc-white px-4 md:px-6 py-2 md:py-2.5 rounded-mc-md text-mc-sm transition-colors whitespace-nowrap font-mc font-mc-semibold">
              <span class="font-mc">Obter</span>&nbsp;<span class="font-logo font-mc-bold" style="text-transform: none;">MentorMatch</span>
            </button>

            <!-- Mobile Menu -->
            <button (click)="toggleMobileMenu()" class="md:hidden text-mc-white">
              <svg *ngIf="!showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
              <svg *ngIf="showMobileMenu" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Search Bar -->
        <div *ngIf="showMobileSearch" class="md:hidden pb-4">
          <div class="relative">
            <input type="text" 
                   [(ngModel)]="searchQuery"
                   placeholder="O que você quer aprender hoje?"
                   class="w-full bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md px-4 py-2.5 pl-10 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-gray-700 font-mc text-mc-sm">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-mc-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div *ngIf="showMobileMenu" class="md:hidden pb-4 border-t border-mc-gray-800 mt-4 pt-4">
          <div class="flex flex-col space-y-3">
            <a routerLink="/masterclasses" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm py-2">Browse</a>
            <a href="#" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm py-2">Para Empresas</a>
            <a href="#" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm py-2">Presentes</a>
            <a href="#" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm py-2">Ver Planos</a>
            <a href="#" class="text-mc-white hover:text-mc-gray-300 transition-colors font-mc text-mc-sm py-2">Entrar</a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: [`
    /* Click outside to close dropdowns */
  `]
})
export class HeaderComponent {
  isScrolled = false;
  showBrowseMenu = false;
  showSearchDropdown = false;
  showMobileSearch = false;
  showMobileMenu = false;
  searchQuery = '';

  browseCategories = [
    { id: 'lideranca', name: 'Liderança & Gestão' },
    { id: 'empreendedorismo', name: 'Empreendedorismo' },
    { id: 'marketing', name: 'Marketing & Vendas' },
    { id: 'tecnologia', name: 'Tecnologia' },
    { id: 'design', name: 'Design & Criatividade' },
    { id: 'vendas', name: 'Vendas' },
    { id: 'saude', name: 'Saúde & Bem-estar' },
    { id: 'musica', name: 'Música' },
    { id: 'esportes', name: 'Esportes' },
    { id: 'escrita', name: 'Escrita' }
  ];

  popularSearches = [
    'Melhorar minha escrita',
    'Dicas de fotografia',
    'Lições de negócios',
    'Cinema e música',
    'Como ser um melhor chef'
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.group') && !target.closest('input')) {
      this.showBrowseMenu = false;
      this.showSearchDropdown = false;
    }
  }

  toggleBrowseMenu() {
    this.showBrowseMenu = !this.showBrowseMenu;
    this.showSearchDropdown = false;
  }

  toggleMobileSearch() {
    this.showMobileSearch = !this.showMobileSearch;
    this.showMobileMenu = false;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    this.showMobileSearch = false;
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
}

