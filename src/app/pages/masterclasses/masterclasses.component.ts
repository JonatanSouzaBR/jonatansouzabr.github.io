import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Masterclass {
  id: number;
  title: string;
  mentor: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  thumbnail: string;
}

@Component({
  selector: 'app-masterclasses',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <div class="min-h-screen bg-mc-black pt-24 pb-12">
      <div class="container mx-auto px-6">
        <div class="mb-12">
          <h1 class="font-mc-bold mb-4 tracking-wide font-mc text-mc-4xl text-mc-white">Masterclasses</h1>
          <p class="text-mc-text-secondary body-font font-mc text-mc-base">Descubra conhecimento de especialistas de classe mundial</p>
        </div>

        <!-- Filters -->
        <div class="mb-8 flex flex-wrap gap-4">
          <button 
            *ngFor="let category of categories" 
            (click)="filterByCategory(category)"
            [ngClass]="{
              'bg-mc-red text-mc-white border-mc-red': selectedCategory === category,
              'bg-mc-gray-900 text-mc-white border-mc-gray-700': selectedCategory !== category
            }"
            class="px-6 py-2 rounded-mc-md border hover:border-mc-red transition-all small-font font-mc font-mc-semibold">
            {{ category }}
          </button>
        </div>

        <!-- Masterclasses Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            *ngFor="let masterclass of filteredMasterclasses" 
            class="bg-mc-gray-900 rounded-mc-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-mc-slow cursor-pointer group"
            [routerLink]="['/masterclasses', masterclass.id]">
            <div class="aspect-video relative overflow-hidden">
              <img [src]="masterclass.thumbnail || 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=90'" 
                   [alt]="masterclass.title"
                   loading="lazy"
                   (error)="handleImageError($event)"
                   class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="absolute inset-0 bg-mc-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-20 transition-all">
                <svg class="w-20 h-20 text-mc-white opacity-70 group-hover:opacity-100 transition-opacity" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <div class="absolute top-4 right-4 bg-mc-black bg-opacity-75 px-3 py-1 rounded-mc-md small-font backdrop-blur-sm font-mc">
                {{ masterclass.category }}
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center mb-3">
                <img [src]="getMentorImage(masterclass.mentor)" 
                     [alt]="masterclass.mentor"
                     loading="lazy"
                     (error)="handleMentorImageError($event)"
                     class="w-12 h-12 rounded-full object-cover mr-3 border-2 border-gray-700">
                <p class="text-mc-text-tertiary mentor-name-font font-mc">{{ masterclass.mentor }}</p>
              </div>
              <h3 class="card-title-font mb-2 group-hover:text-mc-gray-300 transition-colors font-mc">
                {{ masterclass.title }}
              </h3>
              <p class="text-mc-gray-500 small-font mb-4 line-clamp-2 font-mc">{{ masterclass.description }}</p>
              <div class="flex items-center justify-between pt-4 border-t border-mc-gray-700">
                <span class="price-font">{{ masterclass.price }}</span>
                <span class="text-gray-500 small-font">{{ masterclass.duration }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="filteredMasterclasses.length === 0" class="text-center py-20">
          <p class="text-lg text-mc-text-tertiary body-font font-mc">Nenhuma masterclass encontrada nesta categoria.</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MasterclassesComponent {
  categories = ['Todas', 'Liderança', 'Empreendedorismo', 'Marketing', 'Tecnologia', 'Design'];
  selectedCategory = 'Todas';

  masterclasses: Masterclass[] = [
    {
      id: 1,
      title: 'Liderança e Gestão de Equipes',
      mentor: 'João Silva',
      description: 'Aprenda técnicas avançadas de liderança e como construir equipes de alto desempenho.',
      price: 'R$ 299',
      duration: '5 horas',
      category: 'Liderança',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop'
    },
    {
      id: 2,
      title: 'Empreendedorismo Digital',
      mentor: 'Maria Santos',
      description: 'Do conceito à execução: como criar e escalar negócios digitais de sucesso.',
      price: 'R$ 349',
      duration: '6 horas',
      category: 'Empreendedorismo',
      thumbnail: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop'
    },
    {
      id: 3,
      title: 'Marketing e Branding',
      mentor: 'Carlos Oliveira',
      description: 'Estratégias de marketing modernas e construção de marcas memoráveis.',
      price: 'R$ 279',
      duration: '4 horas',
      category: 'Marketing',
      thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop'
    },
    {
      id: 4,
      title: 'Desenvolvimento Full Stack',
      mentor: 'Ana Costa',
      description: 'Domine as tecnologias mais demandadas do mercado de desenvolvimento.',
      price: 'R$ 399',
      duration: '8 horas',
      category: 'Tecnologia',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=800&fit=crop'
    },
    {
      id: 5,
      title: 'UI/UX Design Avançado',
      mentor: 'Pedro Lima',
      description: 'Crie interfaces excepcionais que encantam usuários e geram resultados.',
      price: 'R$ 329',
      duration: '6 horas',
      category: 'Design',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d31294b2?w=1200&h=800&fit=crop'
    },
    {
      id: 6,
      title: 'Gestão de Produtos Digitais',
      mentor: 'Fernanda Rocha',
      description: 'Aprenda a gerenciar produtos digitais do zero até o lançamento.',
      price: 'R$ 359',
      duration: '7 horas',
      category: 'Tecnologia',
      thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&h=800&fit=crop&q=90'
    }
  ];

  get filteredMasterclasses(): Masterclass[] {
    if (this.selectedCategory === 'Todas') {
      return this.masterclasses;
    }
    return this.masterclasses.filter(m => m.category === this.selectedCategory);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  getMentorImage(mentorName: string): string {
    const mentorImages: { [key: string]: string } = {
      'João Silva': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'Maria Santos': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'Carlos Oliveira': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      'Ana Costa': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      'Pedro Lima': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      'Fernanda Rocha': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      'Patricia Alves': 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=400&h=400&fit=crop',
      'Roberto Mendes': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      'Lucas Pereira': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      'Juliana Almeida': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      'Marcos Souza': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'Carla Martins': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'Ricardo Ferreira': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'Beatriz Lima': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'Felipe Costa': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      'Renata Silva': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      'Gustavo Rocha': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      'Isabela Santos': 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=400&h=400&fit=crop',
      'Thiago Alves': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'Amanda Torres': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'Bruno Mendes': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      'Larissa Costa': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      'Diego Oliveira': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      'Mariana Rocha': 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=400&h=400&fit=crop',
      'Rodrigo Silva': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'Vanessa Lima': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'Camila Ferreira': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      'Rafaela Mendes': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      'Lucas Almeida': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
      'Gabriel Santos': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'Mariana Costa': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'Thiago Rocha': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      'André Silva': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      'Fernanda Oliveira': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop',
      'Roberto Lima': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      'Isabela Torres': 'https://images.unsplash.com/photo-1580489944761-15a19d654d0b?w=400&h=400&fit=crop',
      'Paulo Mendes': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      'Juliana Rocha': 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      'Ricardo Alves': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      'Amanda Souza': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      'Marcelo Costa': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      'Carla Ferreira': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      'Bruno Martins': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      'Patricia Lima': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop'
    };
    return mentorImages[mentorName] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop';
  }

  handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=90';
  }

  handleMentorImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop';
  }
}

