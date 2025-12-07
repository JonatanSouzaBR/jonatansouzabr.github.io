import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Mentor {
  nome: string;
  especialidade: string;
  foto: string;
  route: string;
}

interface Aula {
  titulo: string;
  mentor: string;
  route: string;
}

interface Subcategoria {
  nome: string;
  aulas?: Aula[];
  mentores?: Mentor[];
  route?: string;
}

interface Categoria {
  categoria: string;
  subcategorias: Subcategoria[];
}

@Component({
  selector: 'app-explorer-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="explorer-menu-wrapper">
      <button 
        class="explorer-menu-trigger"
        (click)="toggleMenu($event)"
        [class.active]="isOpen">
        <span>Explorar</span>
        <svg class="explorer-arrow" [class.rotate-180]="isOpen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>

      <div 
        *ngIf="isOpen" 
        class="explorer-menu-dropdown"
        [class.show]="isOpen"
        [class.has-submenu]="activeSubmenu !== null"
        [class.has-third-level]="activeThirdLevel !== null"
        (click)="$event.stopPropagation()">
        <div class="explorer-menu-content">
          <!-- Coluna 1: Categorias principais -->
          <div class="explorer-column explorer-column-1">
            <div 
              *ngFor="let categoria of mainCategories; let i = index"
              class="explorer-category-item"
              (click)="openSubmenu(i)"
              [class.active]="activeSubmenu === i">
              <span class="explorer-category-text">{{ categoria.categoria }}</span>
              <svg class="explorer-item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
            
            <!-- Botão Ver todas as categorias dentro da coluna 1 -->
            <div class="explorer-view-all-wrapper">
              <a 
                routerLink="/categorias" 
                class="explorer-view-all-button"
                (click)="navigateAndClose('/categorias')">
                <span>Ver todas as categorias</span>
                <svg class="explorer-item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Coluna 2: Subcategorias -->
          <div *ngIf="activeSubmenu !== null" class="explorer-column explorer-column-2">
            <div 
              *ngFor="let subcategoria of getActiveSubcategorias(); let j = index"
              class="explorer-subcategory-item"
              (click)="openThirdLevel(j)"
              [class.active]="activeThirdLevel === j"
              [class.has-content]="hasContent(j)">
              <span class="explorer-subcategory-text">{{ subcategoria.nome }}</span>
              <svg 
                *ngIf="hasContent(j)"
                class="explorer-item-arrow" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </div>

          <!-- Coluna 3: Aulas e Mentores -->
          <div *ngIf="activeThirdLevel !== null && activeSubmenu !== null" class="explorer-column explorer-column-3">
            <div class="explorer-third-content">
              <!-- Título da Subcategoria -->
              <div class="explorer-third-header">
                <h3>{{ getActiveSubcategoriaName() }}</h3>
              </div>
              
              <!-- Lista de Aulas -->
              <div *ngIf="getActiveAulas().length > 0" class="explorer-aulas-list">
                <a 
                  *ngFor="let aula of getActiveAulas()"
                  [routerLink]="aula.route"
                  class="explorer-aula-item"
                  (click)="navigateAndClose(aula.route)">
                  <div class="explorer-aula-title">{{ aula.titulo }}</div>
                  <div class="explorer-aula-mentor">{{ aula.mentor }}</div>
                </a>
              </div>

              <!-- Divisor entre Aulas e Mentores -->
              <div *ngIf="getActiveAulas().length > 0 && getActiveMentores().length > 0" class="explorer-divider"></div>

              <!-- Lista de Mentores -->
              <div *ngIf="getActiveMentores().length > 0" class="explorer-mentores-list">
                <a 
                  *ngFor="let mentor of getActiveMentores()"
                  [routerLink]="mentor.route"
                  class="explorer-mentor-item"
                  (click)="navigateAndClose(mentor.route)">
                  <div class="explorer-mentor-photo">
                    <img [src]="mentor.foto" [alt]="mentor.nome" (error)="handleImageError($event, mentor)">
                  </div>
                  <div class="explorer-mentor-info">
                    <div class="explorer-mentor-name">{{ mentor.nome }}</div>
                    <div class="explorer-mentor-specialty">{{ mentor.especialidade }}</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .explorer-menu-wrapper {
      position: relative;
      display: inline-block;
    }

    .explorer-menu-trigger {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 999px;
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.875rem;
      font-weight: 400;
      cursor: pointer;
      transition: all 0.2s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .explorer-menu-trigger:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.2);
      color: rgba(255, 255, 255, 1);
    }

    .explorer-menu-trigger.active {
      background: rgba(255, 255, 255, 0.1);
      border-color: rgba(255, 255, 255, 0.3);
      color: rgba(255, 255, 255, 1);
    }

    .explorer-arrow {
      width: 16px;
      height: 16px;
      transition: transform 0.2s ease;
    }

    .explorer-arrow.rotate-180 {
      transform: rotate(180deg);
    }

    .explorer-menu-dropdown {
      position: absolute;
      top: calc(100% + 12px);
      left: 0;
      width: 280px;
      max-width: 90vw;
      background: #0b0b0b;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.05);
      z-index: 1000;
      opacity: 0;
      transform: translateY(-8px) scale(0.98);
      pointer-events: none;
      transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      overflow: hidden;
      display: flex;
      flex-direction: column;
    }

    .explorer-menu-dropdown.show {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    .explorer-menu-content {
      display: flex;
      min-height: auto;
      max-height: calc(70vh - 80px);
      position: relative;
    }

    /* Largura dinâmica baseada no estado */
    .explorer-menu-dropdown {
      width: 280px;
    }

    .explorer-menu-dropdown.has-submenu {
      width: 580px;
    }

    .explorer-menu-dropdown.has-third-level {
      width: 1200px;
    }

    /* Colunas base */
    .explorer-column {
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scrollbar-color: transparent transparent;
      -webkit-overflow-scrolling: touch;
    }

    .explorer-column::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
      background: transparent;
    }

    .explorer-column::-webkit-scrollbar-thumb {
      background: transparent;
    }

    .explorer-column::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Coluna 1: Categorias */
    .explorer-column-1 {
      flex: 0 0 280px;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      padding: 24px 0;
      display: flex;
      flex-direction: column;
    }

    .explorer-view-all-wrapper {
      margin-top: auto;
      padding-top: 8px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .explorer-view-all-button {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      min-height: 44px;
      text-decoration: none;
      transition: background-color 0.15s ease;
      color: rgba(255, 255, 255, 0.9);
      font-size: 15px;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      cursor: pointer;
    }

    .explorer-view-all-button:hover {
      background: rgba(255, 255, 255, 0.03);
      color: rgba(255, 255, 255, 1);
    }

    .explorer-category-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      min-height: 44px;
      cursor: pointer;
      transition: background-color 0.15s ease;
      color: rgba(255, 255, 255, 0.9);
      font-size: 15px;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      border-left: 3px solid transparent;
    }

    .explorer-category-item:hover {
      background: rgba(255, 255, 255, 0.03);
      color: rgba(255, 255, 255, 1);
    }

    .explorer-category-item.active {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 1);
      border-left-color: rgba(255, 255, 255, 0.4);
    }

    .explorer-category-text {
      flex: 1;
      line-height: 1.4;
    }

    .explorer-item-arrow {
      width: 14px;
      height: 14px;
      color: rgba(255, 255, 255, 0.4);
      flex-shrink: 0;
      margin-left: 12px;
    }

    .explorer-category-item.active .explorer-item-arrow {
      color: rgba(255, 255, 255, 0.7);
    }

    /* Coluna 2: Subcategorias */
    .explorer-column-2 {
      flex: 0 0 300px;
      border-right: 1px solid rgba(255, 255, 255, 0.08);
      padding: 24px 0;
      animation: slideInRight 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      display: flex;
      flex-direction: column;
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(-12px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    .explorer-subcategory-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 24px;
      min-height: 44px;
      cursor: pointer;
      transition: background-color 0.15s ease;
      color: rgba(255, 255, 255, 0.85);
      font-size: 15px;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    .explorer-subcategory-item:hover {
      background: rgba(255, 255, 255, 0.03);
      color: rgba(255, 255, 255, 1);
    }

    .explorer-subcategory-item.active {
      background: rgba(255, 255, 255, 0.05);
      color: rgba(255, 255, 255, 1);
    }

    .explorer-subcategory-text {
      flex: 1;
      line-height: 1.4;
    }

    .explorer-subcategory-item.active .explorer-item-arrow {
      color: rgba(255, 255, 255, 0.7);
    }

    /* Coluna 3: Aulas e Mentores */
    .explorer-column-3 {
      flex: 1;
      padding: 0;
      animation: slideInRight 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .explorer-third-content {
      padding: 32px 40px;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scrollbar-color: transparent transparent;
      -webkit-overflow-scrolling: touch;
    }

    .explorer-third-content::-webkit-scrollbar {
      display: none;
      width: 0;
      height: 0;
      background: transparent;
    }

    .explorer-third-content::-webkit-scrollbar-thumb {
      background: transparent;
    }

    .explorer-third-content::-webkit-scrollbar-track {
      background: transparent;
    }

    .explorer-third-header {
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .explorer-third-header h3 {
      color: rgba(255, 255, 255, 1);
      font-size: 18px;
      font-weight: 500;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.4;
    }

    /* Lista de Aulas */
    .explorer-aulas-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .explorer-aula-item {
      display: block;
      padding: 16px 0;
      text-decoration: none;
      transition: all 0.15s ease;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .explorer-aula-item:last-of-type {
      border-bottom: none;
    }

    .explorer-aula-item:hover {
      padding-left: 8px;
    }

    .explorer-aula-item:hover .explorer-aula-title {
      color: rgba(255, 255, 255, 1);
    }

    .explorer-aula-title {
      color: rgba(255, 255, 255, 0.9);
      font-size: 15px;
      font-weight: 400;
      margin-bottom: 4px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.4;
    }

    .explorer-aula-mentor {
      color: rgba(255, 255, 255, 0.5);
      font-size: 13px;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.4;
    }

    /* Divisor */
    .explorer-divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.1);
      margin: 24px 0;
    }

    /* Lista de Mentores */
    .explorer-mentores-list {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .explorer-mentor-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 0;
      text-decoration: none;
      transition: all 0.15s ease;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    .explorer-mentor-item:last-of-type {
      border-bottom: none;
    }

    .explorer-mentor-item:hover {
      padding-left: 8px;
    }

    .explorer-mentor-item:hover .explorer-mentor-name {
      color: rgba(255, 255, 255, 1);
    }

    .explorer-mentor-photo {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      overflow: hidden;
      flex-shrink: 0;
      background: rgba(255, 255, 255, 0.1);
    }

    .explorer-mentor-photo img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .explorer-mentor-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
    }

    .explorer-mentor-name {
      color: rgba(255, 255, 255, 0.9);
      font-size: 15px;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.4;
    }

    .explorer-mentor-specialty {
      color: rgba(255, 255, 255, 0.5);
      font-size: 13px;
      font-weight: 400;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.4;
    }


    @media (max-width: 1024px) {
      .explorer-menu-dropdown {
        width: 95vw;
        max-width: none;
      }

      .explorer-menu-content {
        flex-direction: column;
        max-height: 80vh;
      }

      .explorer-column-1,
      .explorer-column-2 {
        flex: 0 0 auto;
        border-right: none;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        max-height: 200px;
      }

      .explorer-column-3 {
        padding: 1rem 1.5rem;
      }
    }
  `]
})
export class ExplorerMenuComponent implements OnInit, OnDestroy {
  isOpen = false;
  activeSubmenu: number | null = null;
  activeThirdLevel: number | null = null;

  // Placeholder image padrão do Unsplash
  private defaultMentorImage = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&q=90';

  // 6 categorias principais exibidas no menu
  mainCategories: Categoria[] = [
    {
      categoria: 'Desenvolvimento Profissional',
      subcategorias: [
        {
          nome: 'Liderança & Alta Performance',
          aulas: [
            { titulo: 'Liderança Transformacional', mentor: 'Carlos Mendes', route: '/masterclasses/lideranca-transformacional' },
            { titulo: 'Gestão de Equipes de Alto Desempenho', mentor: 'Ana Paula Silva', route: '/masterclasses/gestao-equipes' },
            { titulo: 'Tomada de Decisão Estratégica', mentor: 'Carlos Mendes', route: '/masterclasses/decisao-estrategica' }
          ],
          mentores: [
            { 
              nome: 'Carlos Mendes', 
              especialidade: 'Liderança Executiva', 
              foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=90', 
              route: '/mentores/carlos-mendes' 
            },
            { 
              nome: 'Ana Paula Silva', 
              especialidade: 'Gestão de Pessoas', 
              foto: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=90', 
              route: '/mentores/ana-paula-silva' 
            }
          ]
        },
        {
          nome: 'Comunicação Avançada',
          aulas: [
            { titulo: 'Comunicação Executiva', mentor: 'Juliana Costa', route: '/masterclasses/comunicacao-executiva' },
            { titulo: 'Apresentações de Impacto', mentor: 'Juliana Costa', route: '/masterclasses/apresentacoes' }
          ],
          mentores: [
            { 
              nome: 'Juliana Costa', 
              especialidade: 'Comunicação Executiva', 
              foto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=90', 
              route: '/mentores/juliana-costa' 
            }
          ]
        },
        {
          nome: 'Produtividade & Foco',
          route: '/masterclasses?category=produtividade'
        },
        {
          nome: 'Gestão de Pessoas',
          route: '/masterclasses?category=gestao-pessoas'
        },
        {
          nome: 'Tomada de Decisão',
          route: '/masterclasses?category=decisao'
        },
        {
          nome: 'Inteligência Emocional no Trabalho',
          route: '/masterclasses?category=ie-trabalho'
        },
        {
          nome: 'Estratégias de Carreira',
          route: '/masterclasses?category=carreira'
        }
      ]
    },
    {
      categoria: 'Negócios & Empreendedorismo',
      subcategorias: [
        {
          nome: 'Empreendedorismo Digital',
          aulas: [
            { titulo: 'Startup do Zero', mentor: 'Roberto Lima', route: '/masterclasses/startup-zero' },
            { titulo: 'Modelos de Negócio Digital', mentor: 'Roberto Lima', route: '/masterclasses/modelos-negocio' }
          ]
        },
        {
          nome: 'Marketing & Branding',
          route: '/masterclasses?category=marketing'
        },
        {
          nome: 'Vendas e Persuasão',
          route: '/masterclasses?category=vendas'
        },
        {
          nome: 'Estratégia de Negócios',
          route: '/masterclasses?category=estrategia'
        },
        {
          nome: 'Inovação & Tecnologia',
          route: '/masterclasses?category=inovacao'
        },
        {
          nome: 'Finanças para Profissionais',
          route: '/masterclasses?category=financas'
        }
      ]
    },
    {
      categoria: 'Desenvolvimento Pessoal',
      subcategorias: [
        {
          nome: 'Autoconhecimento',
          aulas: [
            { titulo: 'Descoberta de Propósito', mentor: 'Isabela Torres', route: '/masterclasses/proposito' },
            { titulo: 'Valores e Identidade', mentor: 'Isabela Torres', route: '/masterclasses/valores' }
          ]
        },
        {
          nome: 'Gestão da Emoção',
          route: '/masterclasses?category=gestao-emocao'
        },
        {
          nome: 'Construção de Hábitos',
          route: '/masterclasses?category=habitos'
        },
        {
          nome: 'Propósito & Identidade',
          route: '/masterclasses?category=proposito'
        },
        {
          nome: 'Confiança & Mindset',
          route: '/masterclasses?category=mindset'
        },
        {
          nome: 'Bem-Estar Mental',
          route: '/masterclasses?category=bem-estar'
        }
      ]
    },
    {
      categoria: 'Coaching & Mentoria',
      subcategorias: [
        {
          nome: 'Habilidades de Mentoria',
          aulas: [
            { titulo: 'Fundamentos da Mentoria', mentor: 'Paulo Mendes', route: '/masterclasses/fundamentos-mentoria' },
            { titulo: 'Técnicas de Acompanhamento', mentor: 'Paulo Mendes', route: '/masterclasses/tecnicas-acompanhamento' }
          ]
        },
        {
          nome: 'Construção de Comunidades',
          route: '/masterclasses?category=comunidades'
        },
        {
          nome: 'Condução de Sessões',
          route: '/masterclasses?category=sessoes'
        },
        {
          nome: 'Práticas de Acompanhamento',
          route: '/masterclasses?category=acompanhamento'
        },
        {
          nome: 'Ferramentas de Transformação',
          route: '/masterclasses?category=ferramentas'
        },
        {
          nome: 'Desenvolvimento de Mentorados',
          route: '/masterclasses?category=desenvolvimento-mentorados'
        }
      ]
    },
    {
      categoria: 'Soft Skills Essenciais',
      subcategorias: [
        {
          nome: 'Comunicação Interpessoal',
          route: '/masterclasses?category=comunicacao-interpessoal'
        },
        {
          nome: 'Negociação',
          route: '/masterclasses?category=negociacao'
        },
        {
          nome: 'Criatividade',
          route: '/masterclasses?category=criatividade'
        },
        {
          nome: 'Storytelling',
          aulas: [
            { titulo: 'Narrativas Poderosas', mentor: 'Marcos Almeida', route: '/masterclasses/narrativas' },
            { titulo: 'Storytelling para Negócios', mentor: 'Renata Vieira', route: '/masterclasses/storytelling-negocios' }
          ],
          mentores: [
            { 
              nome: 'Marcos Almeida', 
              especialidade: 'Storytelling', 
              foto: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=90', 
              route: '/mentores/marcos-almeida' 
            },
            { 
              nome: 'Renata Vieira', 
              especialidade: 'Comunicação Estratégica', 
              foto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=90', 
              route: '/mentores/renata-vieira' 
            }
          ]
        },
        {
          nome: 'Resolução de Problemas',
          route: '/masterclasses?category=resolucao-problemas'
        },
        {
          nome: 'Pensamento Crítico',
          route: '/masterclasses?category=pensamento-critico'
        }
      ]
    },
    {
      categoria: 'Vida & Carreira',
      subcategorias: [
        {
          nome: 'Planejamento de Vida',
          route: '/masterclasses?category=planejamento-vida'
        },
        {
          nome: 'Mudança de Carreira',
          route: '/masterclasses?category=mudanca-carreira'
        },
        {
          nome: 'Gestão de Tempo',
          route: '/masterclasses?category=gestao-tempo'
        },
        {
          nome: 'Organização Pessoal',
          route: '/masterclasses?category=organizacao'
        },
        {
          nome: 'Equilíbrio Trabalho-Vida',
          route: '/masterclasses?category=equilibrio'
        }
      ]
    }
  ];

  private documentClickHandler = (event: MouseEvent) => this.handleDocumentClick(event);

  constructor(private router: Router) {
    if (typeof document !== 'undefined') {
      document.addEventListener('click', this.documentClickHandler);
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.documentClickHandler);
    }
  }

  toggleMenu(event: Event) {
    event.stopPropagation();
    this.isOpen = !this.isOpen;
    if (!this.isOpen) {
      this.activeSubmenu = null;
      this.activeThirdLevel = null;
    }
  }

  openSubmenu(index: number) {
    this.activeSubmenu = index;
    this.activeThirdLevel = null;
  }

  getActiveSubcategorias(): Subcategoria[] {
    if (this.activeSubmenu === null) {
      return [];
    }
    const categoria = this.mainCategories[this.activeSubmenu];
    return categoria?.subcategorias || [];
  }

  hasContent(index: number): boolean {
    if (this.activeSubmenu === null) {
      return false;
    }
    const categoria = this.mainCategories[this.activeSubmenu];
    const subcategoria = categoria?.subcategorias[index];
    return !!(subcategoria?.aulas && subcategoria.aulas.length > 0) || !!(subcategoria?.mentores && subcategoria.mentores.length > 0);
  }

  openThirdLevel(index: number) {
    if (this.activeSubmenu !== null) {
      const subcategoria = this.mainCategories[this.activeSubmenu]?.subcategorias[index];
      if (this.hasContent(index)) {
        this.activeThirdLevel = index;
      } else if (subcategoria?.route) {
        this.navigateAndClose(subcategoria.route);
      }
    }
  }

  getActiveSubcategoriaName(): string {
    if (this.activeSubmenu === null || this.activeThirdLevel === null) {
      return '';
    }
    const categoria = this.mainCategories[this.activeSubmenu];
    const subcategoria = categoria?.subcategorias[this.activeThirdLevel];
    return subcategoria?.nome || '';
  }

  getActiveAulas(): Aula[] {
    if (this.activeSubmenu === null || this.activeThirdLevel === null) {
      return [];
    }
    const categoria = this.mainCategories[this.activeSubmenu];
    const subcategoria = categoria?.subcategorias[this.activeThirdLevel];
    return subcategoria?.aulas || [];
  }

  getActiveMentores(): Mentor[] {
    if (this.activeSubmenu === null || this.activeThirdLevel === null) {
      return [];
    }
    const categoria = this.mainCategories[this.activeSubmenu];
    const subcategoria = categoria?.subcategorias[this.activeThirdLevel];
    return subcategoria?.mentores || [];
  }

  handleImageError(event: Event, mentor: Mentor) {
    const img = event.target as HTMLImageElement;
    if (img.src !== this.defaultMentorImage) {
      img.src = this.defaultMentorImage;
    }
  }

  navigateAndClose(route: string) {
    this.router.navigateByUrl(route);
    this.closeMenu();
  }

  closeMenu() {
    this.isOpen = false;
    this.activeSubmenu = null;
    this.activeThirdLevel = null;
  }

  private handleDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.explorer-menu-wrapper')) {
      this.closeMenu();
    }
  }
}
