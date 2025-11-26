import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" 
            [class.bg-black]="isScrolled"
            [class.bg-transparent]="!isScrolled">
      <nav class="container mx-auto px-6 md:px-12 lg:px-16">
        <div class="flex items-center justify-between h-20 md:h-24">
          <!-- Logo -->
          <div class="flex items-center space-x-8">
            <a routerLink="/" class="flex items-center space-x-2">
              <span class="font-bold text-red-600" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 28px;">M</span>
              <span class="font-bold text-white" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 20px;">MentorMatch</span>
            </a>
            <!-- Navigation Links -->
            <div class="hidden md:flex items-center space-x-8">
              <a routerLink="/" routerLinkActive="text-white" [routerLinkActiveOptions]="{exact: true}" 
                 class="text-gray-300 hover:text-white transition-colors nav-font tracking-wide" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">Início</a>
              <a routerLink="/masterclasses" routerLinkActive="text-white" 
                 class="text-gray-300 hover:text-white transition-colors nav-font tracking-wide" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">Masterclasses</a>
              <a href="#" class="text-gray-300 hover:text-white transition-colors nav-font tracking-wide" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">Minha Lista</a>
            </div>
          </div>

          <!-- Right Navigation -->
          <div class="flex items-center space-x-6">
            <!-- Search Icon -->
            <button class="text-gray-300 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
            <!-- Notifications -->
            <button class="hidden md:block text-gray-300 hover:text-white transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
              </svg>
            </button>
            <!-- Profile -->
            <div class="relative group">
              <button class="flex items-center space-x-2">
                <div class="w-8 h-8 rounded bg-gray-600 flex items-center justify-center">
                  <span class="text-white font-semibold" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">M</span>
                </div>
                <svg class="hidden md:block w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <!-- Dropdown -->
              <div class="absolute right-0 mt-2 w-48 bg-black/90 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <a routerLink="/mentor/dashboard" class="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">Área do Mentor</a>
                <a href="#" class="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">Conta</a>
                <a href="#" class="block px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 14px;">Sair</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
}

