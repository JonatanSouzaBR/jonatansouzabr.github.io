import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-business',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-mc-black">
      <!-- Hero Section with Instructor Grid -->
      <section class="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-b from-mc-gray-900 via-mc-black to-mc-black"></div>
        <div class="container mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <!-- Instructor Grid -->
          <div class="flex justify-center items-center gap-3 md:gap-4 mb-12 overflow-x-auto pb-4">
            <div class="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden ring-2 ring-mc-gray-700 hover:ring-mc-red transition-all">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=90" 
                   alt="Mentor" 
                   class="w-full h-full object-cover">
            </div>
            <div class="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden ring-2 ring-mc-gray-700 hover:ring-mc-red transition-all">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&q=90" 
                   alt="Mentor" 
                   class="w-full h-full object-cover">
            </div>
            <div class="flex-shrink-0 w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden ring-4 ring-mc-red shadow-xl">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&q=90" 
                   alt="Mentor" 
                   class="w-full h-full object-cover">
            </div>
            <div class="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden ring-2 ring-mc-gray-700 hover:ring-mc-red transition-all">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&q=90" 
                   alt="Mentor" 
                   class="w-full h-full object-cover">
            </div>
            <div class="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden ring-2 ring-mc-gray-700 hover:ring-mc-red transition-all">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&q=90" 
                   alt="Mentor" 
                   class="w-full h-full object-cover">
            </div>
          </div>

          <div class="max-w-4xl mx-auto text-center">
            <h1 class="text-mc-4xl md:text-mc-5xl lg:text-mc-6xl font-mc-bold text-mc-white mb-6 leading-tight font-mc">
              Deixe os melhores do mundo trazerem o melhor das suas pessoas
            </h1>
            <p class="text-mc-lg md:text-mc-xl text-mc-text-secondary mb-8 font-mc leading-relaxed max-w-2xl mx-auto">
              MentorMatch para Empresas oferece soluções poderosas e flexíveis de treinamento com as experiências e insights dos melhores especialistas do mundo. Capacitamos funcionários do campo ao conselho para gerar impacto real nos negócios.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button (click)="scrollToForm()" 
                      class="bg-mc-red hover:bg-mc-button-primary-hover text-mc-white px-8 py-4 rounded-mc-md text-mc-base font-mc font-mc-semibold transition-colors">
                Solicitar Demonstração
              </button>
              <a routerLink="/masterclasses" 
                 class="border-2 border-mc-white text-mc-white hover:bg-mc-white hover:text-mc-black px-8 py-4 rounded-mc-md text-mc-base font-mc font-mc-semibold transition-colors">
                Explorar Conteúdo
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- The MentorMatch Difference Section -->
      <section class="py-16 md:py-24 bg-mc-black">
        <div class="container mx-auto px-6 md:px-12 lg:px-16">
          <div class="max-w-4xl mx-auto">
            <p class="text-mc-red text-mc-sm font-mc-semibold uppercase tracking-wider mb-6 text-center">A DIFERENÇA MENTORMATCH</p>
            <h2 class="text-mc-3xl md:text-mc-4xl lg:text-mc-5xl font-mc-bold text-mc-white mb-6 leading-tight font-mc text-center">
              Desbloqueie o potencial através de storytelling que engaja, ensina e transforma.
            </h2>
            <p class="text-mc-lg text-mc-text-secondary mb-12 text-center font-mc max-w-2xl mx-auto">
              Criamos funcionários e líderes preparados para o futuro através de aulas digitais práticas ministradas pelos melhores do mundo.
            </p>

            <div class="space-y-6 max-w-2xl mx-auto">
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-mc-red flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <p class="text-mc-base text-mc-text-secondary font-mc">
                  Aproveite conteúdo em vídeo multi-formato que ativa novos modos de pensar.
                </p>
              </div>
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-mc-red flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <p class="text-mc-base text-mc-text-secondary font-mc">
                  Desenvolva habilidades à prova de futuro focadas na pessoa como um todo.
                </p>
              </div>
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-mc-red flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <p class="text-mc-base text-mc-text-secondary font-mc">
                  Aplique os aprendizados no trabalho e na vida para impacto e resultados mensuráveis.
                </p>
              </div>
            </div>

            <div class="text-center mt-12">
              <button (click)="scrollToForm()" 
                      class="bg-mc-red hover:bg-mc-button-primary-hover text-mc-white px-8 py-4 rounded-mc-md text-mc-base font-mc font-mc-semibold transition-colors">
                Como Funciona
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- ROI Statistics Section -->
      <section class="py-16 md:py-24 bg-mc-gray-900">
        <div class="container mx-auto px-6 md:px-12 lg:px-16">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-mc-3xl md:text-mc-4xl lg:text-mc-5xl font-mc-bold text-mc-white mb-12 text-center font-mc">
              Aumente o ROI com treinamento eficaz
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="bg-mc-black rounded-mc-lg p-8 md:p-12">
                <div class="text-mc-6xl md:text-mc-7xl font-mc-bold text-mc-white mb-4 font-mc">353%</div>
                <h3 class="text-mc-xl font-mc-bold text-mc-white mb-4 font-mc">Aumento em Vendas e Lucro</h3>
                <p class="text-mc-text-secondary font-mc text-mc-base">
                  Para cada dólar investido em treinamento, uma empresa recebe R$ 4,53 de retorno.¹
                </p>
              </div>

              <div class="bg-mc-black rounded-mc-lg p-8 md:p-12">
                <div class="text-mc-6xl md:text-mc-7xl font-mc-bold text-mc-white mb-4 font-mc">68%</div>
                <h3 class="text-mc-xl font-mc-bold text-mc-white mb-4 font-mc">Melhoria em Moral e Retenção</h3>
                <p class="text-mc-text-secondary font-mc text-mc-base">
                  68% dos trabalhadores relatam que permaneceriam em seu trabalho atual se tivessem mais oportunidades de atualização profissional.²
                </p>
              </div>
            </div>

            <div class="text-center mt-8">
              <p class="text-mc-text-tertiary font-mc text-mc-sm">Fonte 1 | Fonte 2</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Pricing Plans Section -->
      <section class="py-16 md:py-24 bg-mc-black">
        <div class="container mx-auto px-6 md:px-12 lg:px-16">
          <div class="max-w-5xl mx-auto">
            <p class="text-mc-red text-mc-sm font-mc-semibold uppercase tracking-wider mb-6 text-center">PLANOS DE PREÇO PARA CADA NECESSIDADE</p>
            <h2 class="text-mc-3xl md:text-mc-4xl lg:text-mc-5xl font-mc-bold text-mc-white mb-12 text-center font-mc">
              Projetado para Impacto. Construído para Negócios.
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <!-- Plan 1: Corporate Gifting -->
              <div class="bg-mc-gray-900 rounded-mc-lg p-8 border border-mc-gray-800 hover:border-mc-red transition-all">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-mc-red rounded-lg flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-mc-xl font-mc-bold text-mc-white font-mc">MentorMatch</h3>
                    <p class="text-mc-text-secondary font-mc text-mc-sm">Para Presentes Corporativos, Benefícios e Perks</p>
                  </div>
                </div>

                <div class="mb-6">
                  <div class="text-mc-3xl font-mc-bold text-mc-white mb-2 font-mc">R$ 120</div>
                  <div class="text-mc-text-secondary font-mc text-mc-sm">por indivíduo</div>
                </div>

                <ul class="space-y-4 mb-8">
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-mc-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-mc-sm">Acesso a 200+ aulas de instrutores, 3500+ lições em formato de vídeos curtos, disponível em 15 idiomas</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-mc-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-mc-sm">Assista em desktop, TV ou dispositivo móvel</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-mc-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-mc-sm">Presentes simplificados: Mensagens personalizadas, entrega pré-agendada e upload em lote fácil</span>
                  </li>
                </ul>

                <button (click)="scrollToForm()" 
                        class="w-full bg-mc-red hover:bg-mc-button-primary-hover text-mc-white py-4 rounded-mc-md font-mc font-mc-semibold transition-colors mb-4">
                  Comprar Agora
                </button>
                <p class="text-mc-text-tertiary font-mc text-mc-xs text-center">
                  Compre até 50 assinaturas em lote por vez
                </p>
              </div>

              <!-- Plan 2: Learning & Development -->
              <div class="bg-mc-gray-900 rounded-mc-lg p-8 border border-mc-gray-800 hover:border-mc-red transition-all">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-mc-red rounded-lg flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-mc-xl font-mc-bold text-mc-white font-mc">MentorMatch para Empresas</h3>
                    <p class="text-mc-text-secondary font-mc text-mc-sm">Para Aprendizado e Desenvolvimento de Habilidades</p>
                  </div>
                </div>

                <div class="mb-6">
                  <div class="text-mc-3xl font-mc-bold text-mc-white mb-2 font-mc">R$ 180</div>
                  <div class="text-mc-text-secondary font-mc text-mc-sm">por assento</div>
                </div>

                <ul class="space-y-4 mb-8">
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-mc-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-mc-sm">Acesso a 200+ aulas de instrutores, 3500+ lições em formato de vídeos curtos, disponível em 15 idiomas</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-mc-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-mc-sm">Assista em desktop, TV ou dispositivo móvel</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-mc-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-mc-sm">Acesso a conteúdo exclusivo de L&D, recursos e ativos</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-mc-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-mc-sm">Compartilhe e atribua conteúdo com grupos ou indivíduos</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <svg class="w-5 h-5 text-mc-red flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-mc-text-secondary font-mc text-mc-sm">Relatórios de analytics que destacam principais habilidades, engajamento do usuário e tendências de aprendizado</span>
                  </li>
                </ul>

                <button (click)="scrollToForm()" 
                        class="w-full bg-mc-red hover:bg-mc-button-primary-hover text-mc-white py-4 rounded-mc-md font-mc font-mc-semibold transition-colors mb-4">
                  Comprar Agora
                </button>
                <p class="text-mc-text-tertiary font-mc text-mc-xs text-center">
                  Compre de 5 até 50 assinaturas
                </p>
              </div>
            </div>

            <div class="text-center mt-8">
              <p class="text-mc-text-secondary font-mc text-mc-base mb-4">
                Comprando para uma equipe maior que 50?
              </p>
              <button (click)="scrollToForm()" 
                      class="text-mc-red hover:text-mc-button-primary-hover font-mc font-mc-semibold underline transition-colors">
                Entre em Contato Conosco
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Benefits Section -->
      <section class="py-16 md:py-24 bg-mc-black">
        <div class="container mx-auto px-6 md:px-12 lg:px-16">
          <div class="text-center mb-16">
            <h2 class="text-mc-3xl md:text-mc-4xl font-mc-bold text-mc-white mb-4 font-mc">
              Por que escolher MentorMatch para sua empresa?
            </h2>
            <p class="text-mc-text-secondary text-mc-lg font-mc max-w-2xl mx-auto">
              Transforme sua organização com aprendizado contínuo e desenvolvimento profissional
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <div class="text-center">
              <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 class="text-mc-xl font-mc-bold text-mc-white mb-4 font-mc">Desenvolvimento de Equipes</h3>
              <p class="text-mc-text-secondary font-mc text-mc-base">
                Fortaleça habilidades de liderança, comunicação e colaboração em toda sua organização.
              </p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                </svg>
              </div>
              <h3 class="text-mc-xl font-mc-bold text-mc-white mb-4 font-mc">Conteúdo de Qualidade</h3>
              <p class="text-mc-text-secondary font-mc text-mc-base">
                Acesso a mentores renomados e especialistas reconhecidos em suas áreas de atuação.
              </p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-mc-xl font-mc-bold text-mc-white mb-4 font-mc">Aprendizado Flexível</h3>
              <p class="text-mc-text-secondary font-mc text-mc-base">
                Aulas sob demanda que se adaptam aos horários e necessidades de sua equipe.
              </p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-mc-xl font-mc-bold text-mc-white mb-4 font-mc">Métricas e Relatórios</h3>
              <p class="text-mc-text-secondary font-mc text-mc-base">
                Acompanhe o progresso e engajamento de sua equipe com dashboards detalhados.
              </p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="text-mc-xl font-mc-bold text-mc-white mb-4 font-mc">Segurança e Privacidade</h3>
              <p class="text-mc-text-secondary font-mc text-mc-base">
                Plataforma segura com conformidade com LGPD e padrões internacionais de segurança.
              </p>
            </div>

            <div class="text-center">
              <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-mc-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              </div>
              <h3 class="text-mc-xl font-mc-bold text-mc-white mb-4 font-mc">Suporte Dedicado</h3>
              <p class="text-mc-text-secondary font-mc text-mc-base">
                Equipe especializada para ajudar na implementação e sucesso do programa de aprendizado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="py-16 md:py-24 bg-mc-gray-900">
        <div class="container mx-auto px-6 md:px-12 lg:px-16">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            <div>
              <div class="text-mc-4xl md:text-mc-5xl font-mc-bold text-mc-white mb-2 font-mc">500+</div>
              <div class="text-mc-text-secondary font-mc text-mc-base">Empresas</div>
            </div>
            <div>
              <div class="text-mc-4xl md:text-mc-5xl font-mc-bold text-mc-white mb-2 font-mc">50K+</div>
              <div class="text-mc-text-secondary font-mc text-mc-base">Funcionários</div>
            </div>
            <div>
              <div class="text-mc-4xl md:text-mc-5xl font-mc-bold text-mc-white mb-2 font-mc">1000+</div>
              <div class="text-mc-text-secondary font-mc text-mc-base">Aulas</div>
            </div>
            <div>
              <div class="text-mc-4xl md:text-mc-5xl font-mc-bold text-mc-white mb-2 font-mc">95%</div>
              <div class="text-mc-text-secondary font-mc text-mc-base">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Success Story Section -->
      <section class="py-16 md:py-24 bg-mc-black">
        <div class="container mx-auto px-6 md:px-12 lg:px-16">
          <div class="max-w-5xl mx-auto">
            <p class="text-mc-red text-mc-sm font-mc-semibold uppercase tracking-wider mb-6 text-center">HISTÓRIA DE SUCESSO</p>
            <h2 class="text-mc-3xl md:text-mc-4xl lg:text-mc-5xl font-mc-bold text-mc-white mb-12 text-center font-mc">
              Como a TechCorp amplifica o impacto nos negócios
            </h2>

            <div class="bg-mc-gray-900 rounded-mc-lg p-8 md:p-12 mb-12">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div class="aspect-video rounded-lg overflow-hidden mb-6">
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop&q=90" 
                         alt="TechCorp Success Story"
                         class="w-full h-full object-cover">
                  </div>
                </div>
                <div>
                  <h3 class="text-mc-2xl font-mc-bold text-mc-white mb-4 font-mc">
                    Transformando liderança através do aprendizado contínuo
                  </h3>
                  <p class="text-mc-text-secondary font-mc text-mc-base mb-6">
                    A TechCorp implementou o MentorMatch para Empresas para desenvolver habilidades de liderança em toda sua organização. Com mais de 1.000 funcionários acessando regularmente o conteúdo, a empresa viu uma melhoria de 40% na satisfação dos funcionários e 25% de aumento na retenção de talentos.
                  </p>
                  <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-mc-red rounded-full flex items-center justify-center">
                      <span class="text-mc-white font-mc-bold font-mc text-mc-xl">TC</span>
                    </div>
                    <div>
                      <div class="text-mc-white font-mc-semibold font-mc">TechCorp</div>
                      <div class="text-mc-text-tertiary font-mc text-mc-sm">1000+ funcionários • Tecnologia</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Testimonials Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-mc-gray-900 rounded-mc-lg p-8">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-mc-red rounded-full flex items-center justify-center mr-4">
                  <span class="text-mc-white font-mc-bold font-mc text-mc-lg">IG</span>
                </div>
                <div>
                  <div class="text-mc-white font-mc-semibold font-mc">InnovaGroup</div>
                  <div class="text-mc-text-tertiary font-mc text-mc-sm">1000+ funcionários</div>
                </div>
              </div>
              <p class="text-mc-text-secondary font-mc text-mc-base mb-4 italic">
                "A plataforma é intuitiva e o conteúdo é excepcional. Nossos líderes estão aplicando diretamente as estratégias aprendidas nas masterclasses."
              </p>
              <div class="text-mc-white font-mc-semibold font-mc text-mc-sm">— Diretora de RH, InnovaGroup</div>
            </div>

            <div class="bg-mc-gray-900 rounded-mc-lg p-8">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-mc-red rounded-full flex items-center justify-center mr-4">
                  <span class="text-mc-white font-mc-bold font-mc text-mc-lg">GS</span>
                </div>
                <div>
                  <div class="text-mc-white font-mc-semibold font-mc">GlobalSolutions</div>
                  <div class="text-mc-text-tertiary font-mc text-mc-sm">5000+ funcionários</div>
                </div>
              </div>
              <p class="text-mc-text-secondary font-mc text-mc-base mb-4 italic">
                "O retorno sobre investimento foi imediato. Vimos melhorias significativas na produtividade e na retenção de talentos após implementar o MentorMatch."
              </p>
              <div class="text-mc-white font-mc-semibold font-mc text-mc-sm">— VP de Operações, GlobalSolutions</div>
            </div>

            <div class="bg-mc-gray-900 rounded-mc-lg p-8">
              <div class="flex items-center mb-6">
                <div class="w-12 h-12 bg-mc-red rounded-full flex items-center justify-center mr-4">
                  <span class="text-mc-white font-mc-bold font-mc text-mc-lg">DN</span>
                </div>
                <div>
                  <div class="text-mc-white font-mc-semibold font-mc">DataNova</div>
                  <div class="text-mc-text-tertiary font-mc text-mc-sm">500-1000 funcionários</div>
                </div>
              </div>
              <p class="text-mc-text-secondary font-mc text-mc-base mb-4 italic">
                "O MentorMatch transformou nossa cultura de aprendizado. Nossos funcionários estão mais engajados e desenvolvendo habilidades críticas."
              </p>
              <div class="text-mc-white font-mc-semibold font-mc text-mc-sm">— CEO, DataNova</div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ Section -->
      <section class="py-16 md:py-24 bg-mc-gray-900">
        <div class="container mx-auto px-6 md:px-12 lg:px-16">
          <div class="max-w-4xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-mc-3xl md:text-mc-4xl lg:text-mc-5xl font-mc-bold text-mc-white mb-4 font-mc">FAQ</h2>
            </div>

            <div class="space-y-4">
              <div class="bg-mc-black rounded-mc-lg border border-mc-gray-800 overflow-hidden">
                <button (click)="toggleFAQ(0)" 
                        class="w-full flex items-center justify-between p-6 text-left hover:bg-mc-gray-900 transition-colors">
                  <span class="text-mc-white font-mc-semibold font-mc text-mc-base">Que produtos as empresas podem comprar e como eles são diferentes?</span>
                  <svg class="w-5 h-5 text-mc-white transition-transform" 
                       [class.rotate-180]="openFAQIndex === 0"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div *ngIf="openFAQIndex === 0" class="px-6 pb-6">
                  <p class="text-mc-text-secondary font-mc text-mc-base">
                    Oferecemos dois produtos principais: <strong class="text-mc-white">MentorMatch</strong> para presente corporativo, perks e benefícios (R$ 120/indivíduo) e <strong class="text-mc-white">MentorMatch para Empresas</strong> para aprendizado e desenvolvimento de habilidades (R$ 180/assento). O segundo inclui recursos exclusivos de L&D, compartilhamento de conteúdo, atribuições e relatórios de analytics.
                  </p>
                </div>
              </div>

              <div class="bg-mc-black rounded-mc-lg border border-mc-gray-800 overflow-hidden">
                <button (click)="toggleFAQ(1)" 
                        class="w-full flex items-center justify-between p-6 text-left hover:bg-mc-gray-900 transition-colors">
                  <span class="text-mc-white font-mc-semibold font-mc text-mc-base">Gostaria de oferecer MentorMatch aos meus funcionários como perk/benefício. Qual devo comprar?</span>
                  <svg class="w-5 h-5 text-mc-white transition-transform" 
                       [class.rotate-180]="openFAQIndex === 1"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div *ngIf="openFAQIndex === 1" class="px-6 pb-6">
                  <p class="text-mc-text-secondary font-mc text-mc-base">
                    Para oferecer como perk ou benefício aos funcionários, recomendamos o <strong class="text-mc-white">MentorMatch</strong> (R$ 120/indivíduo). Este plano inclui acesso completo a todo o conteúdo, permite presente simplificado com mensagens personalizadas e entrega pré-agendada, e você pode comprar até 50 assinaturas em lote por vez.
                  </p>
                </div>
              </div>

              <div class="bg-mc-black rounded-mc-lg border border-mc-gray-800 overflow-hidden">
                <button (click)="toggleFAQ(2)" 
                        class="w-full flex items-center justify-between p-6 text-left hover:bg-mc-gray-900 transition-colors">
                  <span class="text-mc-white font-mc-semibold font-mc text-mc-base">Como funciona a distribuição?</span>
                  <svg class="w-5 h-5 text-mc-white transition-transform" 
                       [class.rotate-180]="openFAQIndex === 2"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div *ngIf="openFAQIndex === 2" class="px-6 pb-6">
                  <p class="text-mc-text-secondary font-mc text-mc-base mb-4">
                    A distribuição é simples e flexível:
                  </p>
                  <ul class="list-disc list-inside space-y-2 text-mc-text-secondary font-mc text-mc-base ml-4">
                    <li><strong class="text-mc-white">Para Presentes:</strong> Você pode enviar convites personalizados por e-mail com mensagens customizadas e agendar a entrega para datas específicas.</li>
                    <li><strong class="text-mc-white">Para L&D:</strong> Nossa plataforma permite atribuir conteúdo a grupos ou indivíduos específicos, criar trilhas de aprendizado personalizadas e acompanhar o progresso através de dashboards de analytics.</li>
                    <li><strong class="text-mc-white">Upload em Lote:</strong> Para equipes maiores, oferecemos upload em lote via CSV para facilitar o gerenciamento.</li>
                  </ul>
                </div>
              </div>

              <div class="bg-mc-black rounded-mc-lg border border-mc-gray-800 overflow-hidden">
                <button (click)="toggleFAQ(3)" 
                        class="w-full flex items-center justify-between p-6 text-left hover:bg-mc-gray-900 transition-colors">
                  <span class="text-mc-white font-mc-semibold font-mc text-mc-base">Qual é o tamanho mínimo e máximo de equipe que posso comprar?</span>
                  <svg class="w-5 h-5 text-mc-white transition-transform" 
                       [class.rotate-180]="openFAQIndex === 3"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div *ngIf="openFAQIndex === 3" class="px-6 pb-6">
                  <p class="text-mc-text-secondary font-mc text-mc-base">
                    Para <strong class="text-mc-white">presentes corporativos</strong>, você pode comprar de 1 até 50 assinaturas em lote por vez. Para <strong class="text-mc-white">L&D empresarial</strong>, o mínimo é de 5 assentos e o máximo inicial é de 50. Para equipes maiores que 50, entre em contato conosco para personalizar uma solução corporativa que atenda às necessidades específicas da sua organização.
                  </p>
                </div>
              </div>

              <div class="bg-mc-black rounded-mc-lg border border-mc-gray-800 overflow-hidden">
                <button (click)="toggleFAQ(4)" 
                        class="w-full flex items-center justify-between p-6 text-left hover:bg-mc-gray-900 transition-colors">
                  <span class="text-mc-white font-mc-semibold font-mc text-mc-base">Os funcionários podem acessar o conteúdo em dispositivos móveis?</span>
                  <svg class="w-5 h-5 text-mc-white transition-transform" 
                       [class.rotate-180]="openFAQIndex === 4"
                       fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                <div *ngIf="openFAQIndex === 4" class="px-6 pb-6">
                  <p class="text-mc-text-secondary font-mc text-mc-base">
                    Sim! O MentorMatch está disponível em todas as plataformas: desktop (Windows, Mac, Linux), dispositivos móveis (iOS e Android) e TVs (Smart TV, Apple TV, Roku, Chromecast). Seus funcionários podem aprender no próprio ritmo, onde e quando quiserem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Form Section -->
      <section id="contact-form" class="py-16 md:py-24 bg-mc-gray-900">
        <div class="container mx-auto px-6 md:px-12 lg:px-16">
          <div class="max-w-3xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="text-mc-3xl md:text-mc-4xl font-mc-bold text-mc-white mb-4 font-mc">
                Solicite uma demonstração
              </h2>
              <p class="text-mc-text-secondary text-mc-lg font-mc">
                Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas.
              </p>
            </div>

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="bg-mc-black rounded-mc-lg p-8 md:p-12">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Nome Completo *</label>
                  <input type="text" 
                         formControlName="fullName"
                         class="w-full bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                         placeholder="Seu nome">
                  <div *ngIf="contactForm.get('fullName')?.invalid && contactForm.get('fullName')?.touched" 
                       class="text-mc-red text-mc-xs mt-1 font-mc">
                    Nome é obrigatório
                  </div>
                </div>

                <div>
                  <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">E-mail Corporativo *</label>
                  <input type="email" 
                         formControlName="email"
                         class="w-full bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                         placeholder="seu@empresa.com">
                  <div *ngIf="contactForm.get('email')?.invalid && contactForm.get('email')?.touched" 
                       class="text-mc-red text-mc-xs mt-1 font-mc">
                    E-mail inválido
                  </div>
                </div>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Empresa *</label>
                  <input type="text" 
                         formControlName="company"
                         class="w-full bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                         placeholder="Nome da empresa">
                  <div *ngIf="contactForm.get('company')?.invalid && contactForm.get('company')?.touched" 
                       class="text-mc-red text-mc-xs mt-1 font-mc">
                    Empresa é obrigatória
                  </div>
                </div>

                <div>
                  <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Número de Funcionários *</label>
                  <select formControlName="employees"
                          class="w-full bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md px-4 py-3 text-mc-white focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all">
                    <option value="">Selecione</option>
                    <option value="1-50">1-50</option>
                    <option value="51-200">51-200</option>
                    <option value="201-500">201-500</option>
                    <option value="501-1000">501-1000</option>
                    <option value="1000+">1000+</option>
                  </select>
                  <div *ngIf="contactForm.get('employees')?.invalid && contactForm.get('employees')?.touched" 
                       class="text-mc-red text-mc-xs mt-1 font-mc">
                    Selecione o número de funcionários
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Telefone *</label>
                <input type="tel" 
                       formControlName="phone"
                       class="w-full bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all"
                       placeholder="(11) 99999-9999">
                <div *ngIf="contactForm.get('phone')?.invalid && contactForm.get('phone')?.touched" 
                     class="text-mc-red text-mc-xs mt-1 font-mc">
                  Telefone é obrigatório
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-mc-text-secondary text-mc-sm font-mc mb-2">Mensagem (Opcional)</label>
                <textarea formControlName="message"
                          rows="4"
                          class="w-full bg-mc-gray-900 border border-mc-gray-800 rounded-mc-md px-4 py-3 text-mc-white placeholder-mc-gray-500 focus:outline-none focus:border-mc-red focus:ring-1 focus:ring-mc-red font-mc text-mc-base transition-all resize-none"
                          placeholder="Conte-nos sobre suas necessidades de aprendizado..."></textarea>
              </div>

              <button type="submit" 
                      [disabled]="contactForm.invalid || isSubmitting"
                      class="w-full bg-mc-red hover:bg-mc-button-primary-hover disabled:bg-mc-gray-700 disabled:cursor-not-allowed text-mc-white py-4 rounded-mc-md font-mc font-mc-semibold transition-colors text-mc-base">
                <span *ngIf="!isSubmitting">Enviar Solicitação</span>
                <span *ngIf="isSubmitting" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: []
})
export class BusinessComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  openFAQIndex: number | null = null;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      company: ['', [Validators.required]],
      employees: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      message: ['']
    });
  }

  toggleFAQ(index: number) {
    this.openFAQIndex = this.openFAQIndex === index ? null : index;
  }

  scrollToForm() {
    const element = document.getElementById('contact-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      this.notificationService.error('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    this.isSubmitting = true;

    // Simular envio do formulário
    setTimeout(() => {
      this.isSubmitting = false;
      this.notificationService.success('Solicitação enviada com sucesso! Nossa equipe entrará em contato em breve.');
      this.contactForm.reset();
    }, 2000);
  }
}

