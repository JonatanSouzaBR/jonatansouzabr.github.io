import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { MASTERCLASS_DETAIL_DATA, MasterclassDetail } from '../../data/masterclasses.data';

@Component({
  selector: 'app-masterclass-detail',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-mc-black py-12">
      <div class="container mx-auto px-6">
        <a routerLink="/masterclasses" class="text-mc-text-tertiary hover:text-mc-white mb-6 inline-block transition-colors nav-font font-mc">
          ← Voltar para Masterclasses
        </a>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <div class="aspect-video rounded-mc-lg mb-8 relative overflow-hidden">
              <img [src]="currentMasterclass.videoImage || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&q=90'" 
                   [alt]="currentMasterclass.title || 'Masterclass'"
                   loading="eager"
                   (error)="handleImageError($event)"
                   class="w-full h-full object-cover">
              <div class="absolute inset-0 bg-mc-black bg-opacity-30 flex items-center justify-center">
                <button class="w-24 h-24 bg-mc-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-mc-2xl">
                  <svg class="w-12 h-12 text-mc-black ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
            </div>

            <h1 class="font-mc-bold mb-4 tracking-wide font-mc text-mc-4xl text-mc-white">{{ currentMasterclass.title || 'Liderança e Gestão de Equipes' }}</h1>
            <p class="text-mc-text-tertiary mb-6 mentor-name-font font-mc text-mc-base">por {{ currentMasterclass.mentor || 'João Silva' }}</p>
            
            <div class="prose prose-invert max-w-none mb-8">
              <p class="text-mc-gray-300 leading-relaxed body-font font-mc text-mc-base">
                {{ currentMasterclass.description || 'Nesta masterclass exclusiva, você aprenderá técnicas avançadas de liderança e como construir equipes de alto desempenho. João Silva, com mais de 20 anos de experiência em gestão de pessoas, compartilha seus segredos e estratégias comprovadas.' }}
              </p>
            </div>

            <div class="bg-mc-gray-900 rounded-mc-lg p-6 mb-8">
              <h2 class="card-title-font mb-4 font-mc text-mc-white">O que você vai aprender:</h2>
              <ul class="space-y-3 text-mc-gray-300 body-font font-mc">
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-mc-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Fundamentos de liderança moderna</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-mc-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Como recrutar e reter talentos</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-mc-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Comunicação eficaz com equipes</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-mc-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Gestão de conflitos e resolução de problemas</span>
                </li>
                <li class="flex items-start">
                  <svg class="w-6 h-6 text-mc-white mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>Ferramentas práticas para gestão diária</span>
                </li>
              </ul>
            </div>

            <div class="bg-mc-gray-900 rounded-mc-lg p-6">
              <h2 class="card-title-font mb-4 font-mc text-mc-white">Sobre o Mentor</h2>
              <div class="flex items-start">
                <img [src]="currentMasterclass.mentorImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=90'" 
                     [alt]="currentMasterclass.mentor || 'Mentor'"
                     loading="lazy"
                     (error)="handleMentorImageError($event)"
                     class="w-20 h-20 rounded-full mr-4 object-cover border-2 border-mc-gray-700">
                <div>
                  <h3 class="text-lg mentor-name-font font-mc-semibold mb-2 font-mc text-mc-white">{{ currentMasterclass.mentor || 'João Silva' }}</h3>
                  <p class="text-mc-text-tertiary mb-2 small-font font-mc">Especialista em {{ currentMasterclass.title || 'Liderança' }}</p>
                  <p class="text-mc-gray-300 body-font text-mc-base font-mc">
                    Com anos de experiência na área, {{ currentMasterclass.mentor || 'este mentor' }} compartilha conhecimento 
                    prático e estratégias comprovadas para transformar sua carreira e alcançar resultados excepcionais.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <div class="bg-mc-gray-900 rounded-mc-lg p-6 sticky top-24">
              <div class="text-center mb-6">
                <div class="price-font mb-2 font-mc text-mc-white">R$ 299</div>
                <p class="text-mc-text-tertiary small-font font-mc">Acesso vitalício</p>
              </div>

              <button (click)="addToCart()" 
                      [class.bg-mc-gray-700]="isInCart"
                      [class.text-mc-gray-400]="isInCart"
                      [class.bg-mc-white]="!isInCart"
                      [class.text-mc-black]="!isInCart"
                      class="w-full py-4 rounded-mc-md button-font hover:bg-mc-gray-200 transition-colors mb-4 font-mc"
                      [disabled]="isInCart">
                {{ isInCart ? 'Já no Carrinho' : 'Comprar Agora' }}
              </button>

              <button (click)="toggleWishlist()" 
                      [class.bg-mc-red]="isInWishlist"
                      [class.border-mc-red]="isInWishlist"
                      [class.border-2]="!isInWishlist"
                      [class.border-mc-white]="!isInWishlist"
                      [class.text-mc-white]="isInWishlist"
                      [class.text-mc-white]="!isInWishlist"
                      class="w-full py-4 rounded-mc-md button-font hover:bg-mc-white hover:text-mc-black transition-colors mb-6 font-mc">
                {{ isInWishlist ? 'Remover da Lista de Desejos' : 'Adicionar à Lista de Desejos' }}
              </button>

              <div class="space-y-4 small-font text-mc-text-tertiary font-mc">
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-mc-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
                  </svg>
                  <span>5 horas de conteúdo</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-mc-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"/>
                  </svg>
                  <span>Certificado de conclusão</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-mc-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                  </svg>
                  <span>Acesso vitalício</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-5 h-5 mr-3 text-mc-white" fill="currentColor" viewBox="0 0 20 20">
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
export class MasterclassDetailComponent implements OnInit {
  private readonly defaultMasterclass: MasterclassDetail = MASTERCLASS_DETAIL_DATA['lideranca-fusao'];
  currentMasterclass: MasterclassDetail = this.defaultMasterclass;
  isInCart = false;
  isInWishlist = false;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private notificationService: NotificationService
  ) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.currentMasterclass = MASTERCLASS_DETAIL_DATA[id] || this.defaultMasterclass;
      this.checkCartAndWishlist();
    });
  }

  ngOnInit() {
    this.checkCartAndWishlist();
  }

  checkCartAndWishlist() {
    if (this.currentMasterclass?.id) {
      this.isInCart = this.cartService.isInCart(this.currentMasterclass.id);
      this.isInWishlist = this.cartService.isInWishlist(this.currentMasterclass.id);
    }
  }

  addToCart() {
    if (this.currentMasterclass?.id && !this.isInCart) {
      this.cartService.addToCart({
        id: this.currentMasterclass.id,
        title: this.currentMasterclass.title,
        mentor: this.currentMasterclass.mentor,
        price: this.currentMasterclass.price || 299,
        thumbnail: this.currentMasterclass.thumbnail || this.currentMasterclass.videoImage,
        mentorImage: this.currentMasterclass.mentorImage
      });
      this.isInCart = true;
      this.notificationService.success('Adicionado ao carrinho!');
    }
  }

  toggleWishlist() {
    if (this.currentMasterclass?.id) {
      if (this.isInWishlist) {
        this.cartService.removeFromWishlist(this.currentMasterclass.id);
        this.isInWishlist = false;
        this.notificationService.info('Removido da lista de desejos');
      } else {
        this.cartService.addToWishlist({
          id: this.currentMasterclass.id,
          title: this.currentMasterclass.title,
          mentor: this.currentMasterclass.mentor,
          price: this.currentMasterclass.price || 299,
          thumbnail: this.currentMasterclass.thumbnail || this.currentMasterclass.videoImage,
          mentorImage: this.currentMasterclass.mentorImage
        });
        this.isInWishlist = true;
        this.notificationService.success('Adicionado à lista de desejos!');
      }
    }
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop&q=90';
  }

  handleMentorImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&q=90';
  }
}

