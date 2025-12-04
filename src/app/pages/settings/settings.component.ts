import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen bg-mc-black text-white pt-10 pb-16 px-4 md:px-10">
      <div class="max-w-5xl mx-auto space-y-8">
        <section class="bg-mc-gray-900 rounded-mc-lg p-6 md:p-8 border border-white/5">
          <p class="text-sm uppercase tracking-[0.35em] text-white/50 mb-3">Preferências</p>
          <h1 class="text-3xl md:text-4xl font-mc-bold mb-2">Configurações da conta</h1>
          <p class="text-white/70 max-w-3xl">Atualize seus dados, defina como quer ser notificado e mantenha sua conta segura.</p>
        </section>

        <!-- Account -->
        <section class="bg-mc-gray-900 rounded-mc-lg p-6 md:p-8 border border-white/5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-mc-bold">Informações pessoais</h2>
              <p class="text-white/60 text-sm mt-1">Esses dados aparecem nos certificados e recomendações.</p>
            </div>
            <button (click)="onSaveAccount()" class="px-5 py-2 rounded-mc-md bg-white text-black text-sm font-mc-semibold hover:bg-gray-200 transition-colors">
              Salvar alterações
            </button>
          </div>
          <form [formGroup]="accountForm" class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <label class="flex flex-col gap-2">
              <span class="text-sm text-white/70">Nome completo</span>
              <input formControlName="name" type="text" class="bg-black/30 border border-white/10 rounded-mc-md px-4 py-3 focus:outline-none focus:border-mc-red transition-colors">
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-sm text-white/70">E-mail</span>
              <input formControlName="email" type="email" class="bg-black/30 border border-white/10 rounded-mc-md px-4 py-3 focus:outline-none focus:border-mc-red transition-colors">
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-sm text-white/70">Empresa</span>
              <input formControlName="company" type="text" class="bg-black/30 border border-white/10 rounded-mc-md px-4 py-3 focus:outline-none focus:border-mc-red transition-colors">
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-sm text-white/70">Cargo</span>
              <input formControlName="role" type="text" class="bg-black/30 border border-white/10 rounded-mc-md px-4 py-3 focus:outline-none focus:border-mc-red transition-colors">
            </label>
          </form>
        </section>

        <!-- Security -->
        <section class="bg-mc-gray-900 rounded-mc-lg p-6 md:p-8 border border-white/5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-mc-bold">Segurança</h2>
              <p class="text-white/60 text-sm mt-1">Troque sua senha e revise dispositivos conectados.</p>
            </div>
            <button (click)="onSaveSecurity()" class="px-5 py-2 rounded-mc-md bg-white text-black text-sm font-mc-semibold hover:bg-gray-200 transition-colors">
              Atualizar senha
            </button>
          </div>
          <form [formGroup]="securityForm" class="grid grid-cols-1 md:grid-cols-3 gap-5">
            <label class="flex flex-col gap-2">
              <span class="text-sm text-white/70">Senha atual</span>
              <input type="password" formControlName="currentPassword" class="bg-black/30 border border-white/10 rounded-mc-md px-4 py-3 focus:outline-none focus:border-mc-red transition-colors">
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-sm text-white/70">Nova senha</span>
              <input type="password" formControlName="newPassword" class="bg-black/30 border border-white/10 rounded-mc-md px-4 py-3 focus:outline-none focus:border-mc-red transition-colors">
            </label>
            <label class="flex flex-col gap-2">
              <span class="text-sm text-white/70">Confirmar nova senha</span>
              <input type="password" formControlName="confirmPassword" class="bg-black/30 border border-white/10 rounded-mc-md px-4 py-3 focus:outline-none focus:border-mc-red transition-colors">
            </label>
          </form>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div class="bg-black/30 border border-white/10 rounded-mc-md p-4">
              <p class="font-mc-semibold">Sessões ativas</p>
              <p class="text-white/60 text-sm mt-1">MacBook Pro • iPhone 15</p>
              <button class="text-sm text-mc-red mt-3 hover:underline" (click)="revokeSessions()">Encerrar todas</button>
            </div>
            <div class="bg-black/30 border border-white/10 rounded-mc-md p-4">
              <p class="font-mc-semibold">Autenticação em duas etapas</p>
              <p class="text-white/60 text-sm mt-1">Proteção ativa via app autenticador.</p>
              <button class="text-sm text-mc-red mt-3 hover:underline">Gerenciar códigos backup</button>
            </div>
          </div>
        </section>

        <!-- Notifications -->
        <section class="bg-mc-gray-900 rounded-mc-lg p-6 md:p-8 border border-white/5">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-2xl font-mc-bold">Comunicações</h2>
              <p class="text-white/60 text-sm mt-1">Escolha como prefere receber alertas e novidades.</p>
            </div>
            <button (click)="onSaveNotifications()" class="px-5 py-2 rounded-mc-md bg-white text-black text-sm font-mc-semibold hover:bg-gray-200 transition-colors">
              Atualizar preferências
            </button>
          </div>
          <form [formGroup]="notificationsForm" class="space-y-4">
            <label class="flex items-start gap-3 bg-black/30 border border-white/10 rounded-mc-md p-4 cursor-pointer">
              <input type="checkbox" formControlName="productUpdates" class="mt-1 w-4 h-4 accent-mc-red">
              <div>
                <p class="font-mc-semibold">Novos cursos e mentorias</p>
                <p class="text-sm text-white/60">Receba novidades semanais sobre lançamentos alinhados aos seus interesses.</p>
              </div>
            </label>
            <label class="flex items-start gap-3 bg-black/30 border border-white/10 rounded-mc-md p-4 cursor-pointer">
              <input type="checkbox" formControlName="mentorshipReminders" class="mt-1 w-4 h-4 accent-mc-red">
              <div>
                <p class="font-mc-semibold">Lembretes de sessões e tarefas</p>
                <p class="text-sm text-white/60">Alertas por e-mail e push 24h e 1h antes das mentorias.</p>
              </div>
            </label>
            <label class="flex items-start gap-3 bg-black/30 border border-white/10 rounded-mc-md p-4 cursor-pointer">
              <input type="checkbox" formControlName="marketingEmails" class="mt-1 w-4 h-4 accent-mc-red">
              <div>
                <p class="font-mc-semibold">Ofertas e eventos exclusivos</p>
                <p class="text-sm text-white/60">Convites para eventos ao vivo, bonuses e condições especiais.</p>
              </div>
            </label>
            <label class="flex items-start gap-3 bg-black/30 border border-white/10 rounded-mc-md p-4 cursor-pointer">
              <input type="checkbox" formControlName="smsAlerts" class="mt-1 w-4 h-4 accent-mc-red">
              <div>
                <p class="font-mc-semibold">Alertas via SMS</p>
                <p class="text-sm text-white/60">Receba confirmações rápidas no celular para sessões importantes.</p>
              </div>
            </label>
          </form>
        </section>
      </div>
    </div>
  `,
  styles: []
})
export class SettingsComponent {
  accountForm: FormGroup;
  securityForm: FormGroup;
  notificationsForm: FormGroup;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.accountForm = this.fb.group({
      name: ['Jonatan Souza', Validators.required],
      email: ['jonatan.souza@mentormatch.com', [Validators.required, Validators.email]],
      company: ['MentorMatch'],
      role: ['CEO']
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

    this.notificationsForm = this.fb.group({
      productUpdates: [true],
      mentorshipReminders: [true],
      marketingEmails: [false],
      smsAlerts: [false]
    });
  }

  onSaveAccount() {
    if (this.accountForm.invalid) {
      this.accountForm.markAllAsTouched();
      return;
    }
    this.notificationService.success('Informações atualizadas com sucesso.');
  }

  onSaveSecurity() {
    if (this.securityForm.invalid) {
      this.securityForm.markAllAsTouched();
      return;
    }
    if (this.securityForm.value.newPassword !== this.securityForm.value.confirmPassword) {
      this.notificationService.warning('As senhas precisam coincidir.');
      return;
    }
    this.notificationService.success('Senha atualizada.');
    this.securityForm.reset({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  }

  onSaveNotifications() {
    this.notificationService.success('Preferências de comunicação atualizadas.');
  }

  revokeSessions() {
    this.notificationService.warning('Sessões serão encerradas em todos os dispositivos.');
  }
}




