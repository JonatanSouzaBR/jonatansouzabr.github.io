import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface MentorStat {
  label: string;
  value: string;
  subLabel: string;
}

interface LearningPath {
  title: string;
  progress: number;
  nextAction: string;
}

interface ActivityItem {
  title: string;
  moment: string;
  status: 'concluída' | 'em-andamento' | 'pendente';
  action: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-mc-black text-white pt-10 pb-16 px-4 md:px-10">
      <div class="max-w-6xl mx-auto space-y-10">
        <!-- Header -->
        <section class="bg-mc-gray-900 rounded-mc-lg p-6 md:p-10 flex flex-col lg:flex-row gap-8 items-center lg:items-start">
          <div class="flex items-center gap-6 w-full lg:w-auto">
            <div class="w-24 h-24 rounded-full bg-gradient-to-br from-mc-red to-mc-gray-700 flex items-center justify-center text-3xl font-mc-bold">
              {{ profile.initials }}
            </div>
            <div>
              <p class="text-sm uppercase tracking-[0.35em] text-white/60 mb-2">Conta MentorMatch</p>
              <h1 class="text-3xl md:text-4xl font-mc-bold">{{ profile.name }}</h1>
              <p class="text-white/70 mt-1">{{ profile.role }} • {{ profile.company }}</p>
              <div class="flex flex-wrap gap-2 mt-4 text-xs">
                <span class="px-3 py-1 border border-white/20 rounded-full uppercase tracking-wide">Mentor premium</span>
                <span class="px-3 py-1 border border-white/20 rounded-full uppercase tracking-wide">Desde {{ profile.memberSince }}</span>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 w-full">
            <div class="bg-black/40 rounded-mc-lg p-4 border border-white/5">
              <p class="text-sm text-white/60 mb-1">Plano</p>
              <p class="text-xl font-mc-bold">{{ profile.plan }}</p>
              <p class="text-sm text-white/60 mt-2">Renova em {{ profile.renewal }}</p>
            </div>
            <div class="bg-black/40 rounded-mc-lg p-4 border border-white/5">
              <p class="text-sm text-white/60 mb-1">Status</p>
              <p class="text-xl font-mc-bold text-green-400">Ativo</p>
              <p class="text-sm text-white/60 mt-2">Último acesso há {{ profile.lastAccess }}</p>
            </div>
          </div>
        </section>

        <!-- Metrics -->
        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div *ngFor="let stat of mentorStats" class="bg-mc-gray-900 rounded-mc-lg p-5 border border-white/5">
            <p class="text-sm text-white/60">{{ stat.label }}</p>
            <p class="text-3xl font-mc-bold mt-2">{{ stat.value }}</p>
            <p class="text-sm text-white/60 mt-1">{{ stat.subLabel }}</p>
          </div>
        </section>

        <!-- Learning paths -->
        <section class="bg-mc-gray-900 rounded-mc-lg p-6 md:p-8 border border-white/5">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h2 class="text-2xl font-mc-bold">Suas trilhas em andamento</h2>
              <p class="text-white/60 mt-1">Retome de onde parou ou acelere com novos módulos.</p>
            </div>
            <a routerLink="/masterclasses" class="text-mc-red font-mc-semibold hover:underline text-sm">
              Buscar novas mentorias
            </a>
          </div>

          <div class="space-y-5">
            <div *ngFor="let path of learningPaths" class="bg-black/30 rounded-mc-lg p-5 border border-white/5">
              <div class="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <p class="text-white/60 text-xs uppercase tracking-[0.3em] mb-1">Trilha personalizada</p>
                  <h3 class="text-xl font-mc-bold">{{ path.title }}</h3>
                </div>
                <button class="px-4 py-2 rounded-mc-md bg-white text-black text-sm font-mc-semibold hover:bg-gray-200 transition-colors">
                  {{ path.nextAction }}
                </button>
              </div>
              <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                <div class="bg-mc-red h-full rounded-full transition-all" [style.width.%]="path.progress"></div>
              </div>
              <p class="text-white/60 text-sm mt-2">{{ path.progress }}% concluído</p>
            </div>
          </div>
        </section>

        <!-- Activity -->
        <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-mc-gray-900 rounded-mc-lg p-6 border border-white/5">
            <h2 class="text-xl font-mc-bold mb-4">Atividade recente</h2>
            <div class="space-y-5">
              <div *ngFor="let item of recentActivity" class="flex gap-4">
                <div class="w-10 flex justify-center">
                  <div class="w-2 h-full rounded-full" [ngClass]="statusColor(item.status)"></div>
                </div>
                <div class="flex-1">
                  <p class="font-mc-semibold">{{ item.title }}</p>
                  <p class="text-white/60 text-sm">{{ item.moment }}</p>
                </div>
                <button class="text-sm text-mc-red hover:underline">{{ item.action }}</button>
              </div>
            </div>
          </div>
          <div class="bg-mc-gray-900 rounded-mc-lg p-6 border border-white/5">
            <h2 class="text-xl font-mc-bold mb-4">Certificados & badges</h2>
            <div class="space-y-4">
              <div *ngFor="let badge of achievements" class="flex items-center gap-4 bg-black/30 rounded-mc-md p-4">
                <div class="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-mc-red font-mc-bold">
                  {{ badge.icon }}
                </div>
                <div>
                  <p class="font-mc-semibold">{{ badge.title }}</p>
                  <p class="text-white/60 text-sm">{{ badge.description }}</p>
                </div>
                <span class="text-xs uppercase tracking-[0.3em] text-white/40 ml-auto">{{ badge.year }}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .status-positive { background: linear-gradient(180deg, #22c55e, #15803d); }
    .status-progress { background: linear-gradient(180deg, #f97316, #ea580c); }
    .status-neutral { background: linear-gradient(180deg, #71717a, #3f3f46); }
  `]
})
export class ProfileComponent {
  profile = {
    initials: 'CF',
    name: 'Camila Ferreira',
    role: 'Head de Customer Success',
    company: 'Nexa Retail',
    memberSince: '2019',
    plan: 'Premium Anual',
    renewal: '02 jan 2026',
    lastAccess: '2 horas',
    accessLevel: 'Mentor premium'
  };

  mentorStats: MentorStat[] = [
    { label: 'Horas assistidas', value: '182h', subLabel: 'Nas últimas 12 semanas' },
    { label: 'Mentorias concluídas', value: '34', subLabel: '12 certificações emitidas' },
    { label: 'Trilhas ativas', value: '3', subLabel: 'Produto • CX • Growth' },
    { label: 'Mentores favoritos', value: '9', subLabel: 'Atualize em Perfil > Mentores' }
  ];

  learningPaths: LearningPath[] = [
    { title: 'Liderança em times digitais (Playbook avançado)', progress: 72, nextAction: 'Retomar módulo 5' },
    { title: 'Estratégias de CX Omnichannel', progress: 41, nextAction: 'Assistir aula ao vivo' },
    { title: 'Growth para marketplaces B2C', progress: 18, nextAction: 'Ver materiais extras' }
  ];

  recentActivity: ActivityItem[] = [
    { title: 'Concluiu “CX Playbook Omnichannel”', moment: 'Hoje, 09:12', status: 'concluída', action: 'Ver certificado' },
    { title: 'Mentoria “Liderança em Fusão de Startups” agendada', moment: 'Ontem, 22:48', status: 'em-andamento', action: 'Ver detalhes' },
    { title: 'Plano anual renovado automaticamente', moment: '10 de nov', status: 'concluída', action: 'Ver recibo' },
    { title: 'Feedback pendente para “Growth para B2B SaaS”', moment: '07 de nov', status: 'pendente', action: 'Enviar feedback' }
  ];

  achievements = [
    { title: 'MentorMatch CX Specialist', description: 'Especialista certificado em CX e suporte', icon: 'CX', year: 2024 },
    { title: 'Top Voice em Comunidade', description: 'Participação ativa em fóruns e mentorias coletivas', icon: '∞', year: 2023 },
    { title: 'Mentorias concluídas', description: 'Mais de 30 mentorias concluídas em 2024', icon: '30+', year: 2024 }
  ];

  statusColor(status: ActivityItem['status']) {
    switch (status) {
      case 'concluída':
        return 'status-positive';
      case 'em-andamento':
        return 'status-progress';
      default:
        return 'status-neutral';
    }
  }
}


