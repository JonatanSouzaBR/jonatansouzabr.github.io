import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-masterclass-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-premium-black py-12">
      <div class="container mx-auto px-6">
        <a routerLink="/masterclasses" class="text-gray-400 hover:text-premium-white mb-6 inline-block transition-colors nav-font">
          ← Voltar para Masterclasses
        </a>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="aspect-video rounded-lg mb-8 relative overflow-hidden">
              <img [src]="currentMasterclass.videoImage || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop'" 
                   [alt]="currentMasterclass.title || 'Masterclass'"
                   loading="eager"
                   class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button class="w-24 h-24 bg-premium-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-2xl">
                  <svg class="w-12 h-12 text-premium-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <h1 class="font-bold mb-4 tracking-wide" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 36px;">{{ currentMasterclass.title || 'Liderança e Gestão de Equipes' }}</h1>
            <p class="text-gray-400 mb-6 mentor-name-font" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 16px;">por {{ currentMasterclass.mentor || 'João Silva' }}</p>
            
            <div class="prose prose-invert max-w-none mb-8">
              <p class="text-gray-300 leading-relaxed body-font" style="font-family: 'Sohne', 'Helvetica', 'Arial', sans-serif; font-size: 16px;">
                {{ currentMasterclass.description || 'Nesta masterclass exclusiva, você aprenderá técnicas avançadas de liderança e como construir equipes de alto desempenho. João Silva, com mais de 20 anos de experiência em gestão de pessoas, compartilha seus segredos e estratégias comprovadas.' }}
              </p>
            </div>

            <div class="bg-premium-gray rounded-lg p-6 mb-8">
              <h2 class="card-title-font mb-4">O que você vai aprender:</h2>
              <ul class="space-y-3 text-gray-300 body-font">
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-premium-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Fundamentos de liderança moderna</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-premium-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Como recrutar e reter talentos</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-premium-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Comunicação eficaz com equipes</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-premium-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Gestão de conflitos e resolução de problemas</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-premium-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Ferramentas práticas para gestão diária</span>
                </li>
              </ul>
            </div>

            <div class="bg-premium-gray rounded-lg p-6">
              <h2 class="card-title-font mb-4">Sobre o Mentor</h2>
              <div class="flex items-start">
                <img [src]="currentMasterclass.mentorImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'" 
                     [alt]="currentMasterclass.mentor || 'Mentor'"
                     loading="lazy"
                     class="w-20 h-20 rounded-full mr-4 object-cover border-2 border-gray-700">
                <div>
                  <h3 class="text-lg mentor-name-font font-semibold mb-2">{{ currentMasterclass.mentor || 'João Silva' }}</h3>
                  <p class="text-gray-400 mb-2 small-font">Especialista em {{ currentMasterclass.title || 'Liderança' }}</p>
                  <p class="text-gray-300 body-font text-base">
                    Com anos de experiência na área, {{ currentMasterclass.mentor || 'este mentor' }} compartilha conhecimento 
                    prático e estratégias comprovadas para transformar sua carreira e alcançar resultados excepcionais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-premium-gray rounded-lg p-6 sticky top-24">
              <div class="text-center mb-6">
                <div class="price-font mb-2">R$ 299</div>
                <p class="text-gray-400 small-font">Acesso vitalício</p>
              </div>

              <button class="w-full bg-premium-white text-premium-black py-4 rounded button-font hover:bg-gray-200 transition-colors mb-4">
                Comprar Agora
              </button>

              <button class="w-full border-2 border-premium-white text-premium-white py-4 rounded button-font hover:bg-premium-white hover:text-premium-black transition-colors mb-6">
                Adicionar à Lista de Desejos
              </button>

              <div class="space-y-4 small-font text-gray-400">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-premium-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                  </svg>
                  <span>5 horas de conteúdo</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-premium-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                  </svg>
                  <span>Certificado de conclusão</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-premium-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                  </svg>
                  <span>Acesso vitalício</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-premium-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Garantia de 30 dias</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MasterclassDetailComponent {
  masterclassData: any = {
    1: {
      title: 'Liderança e Gestão de Equipes',
      mentor: 'João Silva',
      mentorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      videoImage: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop',
      description: 'Nesta masterclass exclusiva, você aprenderá técnicas avançadas de liderança e como construir equipes de alto desempenho. João Silva, com mais de 20 anos de experiência em gestão de pessoas, compartilha seus segredos e estratégias comprovadas.'
    },
    2: {
      title: 'Empreendedorismo Digital',
      mentor: 'Maria Santos',
      mentorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      videoImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1920&h=1080&fit=crop',
      description: 'Do conceito à execução: aprenda como criar e escalar negócios digitais de sucesso. Maria Santos, fundadora de múltiplas startups, compartilha sua experiência prática.'
    },
    3: {
      title: 'Marketing e Branding',
      mentor: 'Carlos Oliveira',
      mentorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      videoImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop',
      description: 'Estratégias de marketing modernas e construção de marcas memoráveis. Carlos Oliveira, diretor de marketing de grandes empresas, ensina os segredos do branding de sucesso.'
    }
  };

  currentMasterclass: any = {};

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.currentMasterclass = this.masterclassData[id] || this.masterclassData[1];
    });
  }
}

