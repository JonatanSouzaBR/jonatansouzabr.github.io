import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Video {
  id: number;
  title: string;
  status: 'draft' | 'published';
  views: number;
  revenue: number;
  createdAt: string;
}

@Component({
  selector: 'app-mentor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen bg-mc-black py-12">
      <div class="container mx-auto px-6">
        <div class="mb-12">
          <h1 class="font-mc-bold mb-4 tracking-wide font-mc text-mc-4xl text-mc-white">Área do Mentor</h1>
          <p class="text-mc-text-tertiary body-font font-mc text-mc-base">Gerencie suas masterclasses e conecte-se com seus mentorados</p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-mc-gray-900 rounded-mc-lg p-6">
            <div class="price-font mb-2 font-mc text-mc-white">{{ stats.totalVideos }}</div>
            <div class="text-mc-text-tertiary small-font font-mc">Total de Vídeos</div>
          </div>
          <div class="bg-mc-gray-900 rounded-mc-lg p-6">
            <div class="price-font mb-2 font-mc text-mc-white">{{ stats.totalViews | number }}</div>
            <div class="text-mc-text-tertiary small-font font-mc">Total de Visualizações</div>
          </div>
          <div class="bg-mc-gray-900 rounded-mc-lg p-6">
            <div class="price-font mb-2 font-mc text-mc-white">R$ {{ stats.totalRevenue | number:'1.2-2' }}</div>
            <div class="text-mc-text-tertiary small-font font-mc">Receita Total</div>
          </div>
          <div class="bg-mc-gray-900 rounded-mc-lg p-6">
            <div class="price-font mb-2 font-mc text-mc-white">{{ stats.totalStudents }}</div>
            <div class="text-mc-text-tertiary small-font font-mc">Estudantes</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="mb-8 flex flex-wrap gap-4">
          <button 
            (click)="showUploadModal = true"
            class="bg-mc-white text-mc-black px-6 py-3 rounded-mc-md button-font hover:bg-mc-gray-200 transition-colors font-mc">
            + Nova Masterclass
          </button>
          <button class="border-2 border-mc-white text-mc-white px-6 py-3 rounded-mc-md button-font hover:bg-mc-white hover:text-mc-black transition-colors font-mc">
            Ver Mentorados
          </button>
        </div>

        <!-- Videos Table -->
        <div class="bg-mc-gray-900 rounded-mc-lg overflow-hidden">
          <div class="p-6 border-b border-mc-gray-700">
            <h2 class="card-title-font font-mc text-mc-white">Suas Masterclasses</h2>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-mc-black">
                <tr>
                  <th class="px-6 py-4 text-left small-font font-mc-semibold font-mc text-mc-white">Título</th>
                  <th class="px-6 py-4 text-left small-font font-mc-semibold font-mc text-mc-white">Status</th>
                  <th class="px-6 py-4 text-left small-font font-mc-semibold font-mc text-mc-white">Visualizações</th>
                  <th class="px-6 py-4 text-left small-font font-mc-semibold font-mc text-mc-white">Receita</th>
                  <th class="px-6 py-4 text-left small-font font-mc-semibold font-mc text-mc-white">Data</th>
                  <th class="px-6 py-4 text-left small-font font-mc-semibold font-mc text-mc-white">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let video of videos" class="border-b border-mc-gray-700 hover:bg-mc-black transition-colors">
                  <td class="px-6 py-4">
                    <div class="body-font font-mc-semibold font-mc text-mc-white">{{ video.title }}</div>
                  </td>
                  <td class="px-6 py-4">
                    <span [class.bg-green-900]="video.status === 'published'"
                          [class.bg-yellow-900]="video.status === 'draft'"
                          [class.text-green-300]="video.status === 'published'"
                          [class.text-yellow-300]="video.status === 'draft'"
                          class="px-3 py-1 rounded-mc-md small-font font-mc">
                      {{ video.status === 'published' ? 'Publicado' : 'Rascunho' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-mc-text-tertiary body-font font-mc">{{ video.views | number }}</td>
                  <td class="px-6 py-4 text-mc-text-tertiary body-font font-mc">R$ {{ video.revenue | number:'1.2-2' }}</td>
                  <td class="px-6 py-4 text-mc-text-tertiary body-font font-mc">{{ video.createdAt }}</td>
                  <td class="px-6 py-4">
                    <div class="flex space-x-2">
                      <button class="text-blue-400 hover:text-blue-300 transition-colors font-mc text-mc-sm">Editar</button>
                      <button class="text-mc-red hover:text-red-300 transition-colors font-mc text-mc-sm">Excluir</button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div *ngIf="videos.length === 0" class="text-center py-20 bg-mc-gray-900 rounded-mc-lg">
          <svg class="w-16 h-16 text-mc-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
          </svg>
          <p class="text-lg text-mc-text-tertiary mb-4 body-font font-mc">Você ainda não criou nenhuma masterclass</p>
          <button 
            (click)="showUploadModal = true"
            class="bg-mc-white text-mc-black px-6 py-3 rounded-mc-md button-font hover:bg-mc-gray-200 transition-colors font-mc">
            Criar Primeira Masterclass
          </button>
        </div>
      </div>

      <!-- Upload Modal -->
      <div *ngIf="showUploadModal" 
           class="fixed inset-0 bg-mc-black bg-opacity-75 flex items-center justify-center z-50 p-4"
           (click)="showUploadModal = false">
        <div class="bg-mc-gray-900 rounded-mc-lg max-w-2xl w-full p-8 relative"
             (click)="$event.stopPropagation()">
          <button 
            (click)="showUploadModal = false"
            class="absolute top-4 right-4 text-mc-text-tertiary hover:text-mc-white transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <h2 class="card-title-font mb-6 font-mc text-mc-white">Nova Masterclass</h2>
          
          <form (ngSubmit)="onSubmit()" class="space-y-6">
            <div>
              <label class="block small-font font-mc-semibold mb-2 font-mc text-mc-white">Título da Masterclass</label>
              <input 
                type="text" 
                [(ngModel)]="newVideo.title"
                class="w-full bg-mc-black border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white focus:outline-none focus:border-mc-white body-font font-mc"
                placeholder="Ex: Liderança e Gestão de Equipes"
                required>
            </div>

            <div>
              <label class="block small-font font-mc-semibold mb-2 font-mc text-mc-white">Descrição</label>
              <textarea 
                [(ngModel)]="newVideo.description"
                rows="4"
                class="w-full bg-mc-black border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white focus:outline-none focus:border-mc-white body-font font-mc"
                placeholder="Descreva o conteúdo da sua masterclass..."
                required></textarea>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block small-font font-mc-semibold mb-2 font-mc text-mc-white">Preço (R$)</label>
                <input 
                  type="number" 
                  [(ngModel)]="newVideo.price"
                  class="w-full bg-mc-black border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white focus:outline-none focus:border-mc-white body-font font-mc"
                  placeholder="299"
                  required>
              </div>
              <div>
                <label class="block small-font font-mc-semibold mb-2 font-mc text-mc-white">Duração (horas)</label>
                <input 
                  type="number" 
                  [(ngModel)]="newVideo.duration"
                  class="w-full bg-mc-black border border-mc-gray-700 rounded-mc-md px-4 py-3 text-mc-white focus:outline-none focus:border-mc-white body-font font-mc"
                  placeholder="5"
                  required>
              </div>
            </div>

            <div>
              <label class="block small-font font-mc-semibold mb-2 font-mc text-mc-white">Upload de Vídeo</label>
              <div class="border-2 border-dashed border-mc-gray-700 rounded-mc-md p-8 text-center hover:border-mc-white transition-colors cursor-pointer">
                <svg class="w-12 h-12 text-mc-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p class="text-mc-text-tertiary mb-2 body-font font-mc">Clique para fazer upload ou arraste o arquivo</p>
                <p class="small-font text-mc-gray-500 font-mc">MP4, AVI, MOV até 2GB</p>
              </div>
            </div>

            <div class="flex space-x-4">
              <button 
                type="submit"
                class="flex-1 bg-mc-white text-mc-black px-6 py-3 rounded-mc-md button-font hover:bg-mc-gray-200 transition-colors font-mc">
                Publicar Masterclass
              </button>
              <button 
                type="button"
                (click)="showUploadModal = false"
                class="flex-1 border-2 border-mc-white text-mc-white px-6 py-3 rounded-mc-md button-font hover:bg-mc-white hover:text-mc-black transition-colors font-mc">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class MentorDashboardComponent {
  showUploadModal = false;

  stats = {
    totalVideos: 5,
    totalViews: 12500,
    totalRevenue: 8950.00,
    totalStudents: 342
  };

  videos: Video[] = [
    {
      id: 1,
      title: 'Liderança e Gestão de Equipes',
      status: 'published',
      views: 3420,
      revenue: 102600.00,
      createdAt: '15/01/2024'
    },
    {
      id: 2,
      title: 'Comunicação Eficaz',
      status: 'published',
      views: 2100,
      revenue: 63000.00,
      createdAt: '22/01/2024'
    },
    {
      id: 3,
      title: 'Gestão de Tempo',
      status: 'draft',
      views: 0,
      revenue: 0,
      createdAt: '01/02/2024'
    }
  ];

  newVideo = {
    title: '',
    description: '',
    price: '',
    duration: ''
  };

  onSubmit() {
    // Here you would typically send the data to a backend
    console.log('New video:', this.newVideo);
    this.showUploadModal = false;
    // Reset form
    this.newVideo = {
      title: '',
      description: '',
      price: '',
      duration: ''
    };
  }
}

