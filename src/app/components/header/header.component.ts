import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

interface NavLink {
  id: string;
  label: string;
  route: string;
  fragment?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
            [ngClass]="{'bg-black': isScrolled, 'bg-gradient-to-b from-black via-black/80 to-transparent': !isScrolled}">
      <nav class="w-full px-4 md:px-8 lg:px-12">
        <div class="flex items-center justify-between h-16 md:h-20">
          <div class="flex items-center space-x-6 md:space-x-8 flex-shrink-0">
            <a routerLink="/" class="cursor-pointer">
              <span class="text-white font-bold text-2xl md:text-3xl tracking-tight">MENTORMATCH</span>
            </a>
            <div class="hidden lg:flex items-center space-x-4">
              <a *ngFor="let link of navLinks"
                 [routerLink]="link.route"
                 [fragment]="link.fragment || undefined"
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
          <div class="flex items-center space-x-4 md:space-x-6 flex-shrink-0">
            <a routerLink="/lista-desejos" class="relative text-white hover:text-gray-300 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
              <span *ngIf="wishlistCount > 0" class="absolute -top-2 -right-2 bg-[#E50914] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ wishlistCount }}</span>
            </a>
            <a routerLink="/carrinho" class="relative text-white hover:text-gray-300 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0z"></path>
              </svg>
              <span *ngIf="cartCount > 0" class="absolute -top-2 -right-2 bg-[#E50914] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ cartCount }}</span>
            </a>
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
        <div *ngIf="showMobileMenu" class="lg:hidden pb-4 border-t border-gray-800 mt-4 pt-4">
          <div class="flex flex-col space-y-3">
            <a *ngFor="let link of navLinks"
               [routerLink]="link.route"
               [fragment]="link.fragment || undefined"
               (click)="setActiveNav(link.id)"
               class="text-sm py-2 text-white hover:text-gray-300 transition-colors">
              {{ link.label }}
            </a>
          </div>
          <div class="flex items-center gap-4 pt-4">
            <a routerLink="/lista-desejos" class="flex items-center gap-2 text-sm text-white hover:text-gray-300 transition-colors">
              <span>Lista de desejos</span>
              <span *ngIf="wishlistCount > 0" class="bg-[#E50914] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ wishlistCount }}</span>
            </a>
            <a routerLink="/carrinho" class="flex items-center gap-2 text-sm text-white hover:text-gray-300 transition-colors">
              <span>Carrinho</span>
              <span *ngIf="cartCount > 0" class="bg-[#E50914] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{{ cartCount }}</span>
            </a>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false;
  showMobileMenu = false;
  cartCount = 0;
  wishlistCount = 0;
  activeNav = 'planos';
  private subscriptions = new Subscription();

  navLinks: NavLink[] = [
    { id: 'planos', label: 'Planos', route: '/planos' },
    { id: 'empresas', label: 'Empresas', route: '/empresas' }
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
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  setActiveNav(navId: string) {
    this.activeNav = navId;
  }
}

