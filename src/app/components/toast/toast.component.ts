import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { NotificationService, ToastNotification } from '../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container">
      <div *ngFor="let notification of notifications" 
           class="toast toast-{{ notification.type }}"
           [@slideInOut]="'in'">
        <div class="toast-left-border"></div>
        <div class="toast-content">
          <div class="toast-icon-wrapper">
            <div class="toast-icon">
              <svg *ngIf="notification.type === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <svg *ngIf="notification.type === 'error'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <svg *ngIf="notification.type === 'info'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
              </svg>
              <svg *ngIf="notification.type === 'warning'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
            </div>
          </div>
          <p class="toast-message">{{ notification.message }}</p>
        </div>
        <button (click)="remove(notification.id)" class="toast-close">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  `,
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ],
  styles: [`
    .toast-container {
      position: fixed;
      top: 80px;
      right: 20px;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-width: 420px;
      pointer-events: none;
    }

    .toast {
      display: flex;
      align-items: stretch;
      background: #171717;
      border: 1px solid #262626;
      border-radius: 12px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 10px 25px rgba(0, 0, 0, 0.6);
      pointer-events: auto;
      min-width: 320px;
      overflow: hidden;
      position: relative;
    }

    .toast-left-border {
      width: 4px;
      flex-shrink: 0;
    }

    .toast-success .toast-left-border {
      background: #22c55e;
    }

    .toast-error .toast-left-border {
      background: #DC2626;
    }

    .toast-info .toast-left-border {
      background: #3b82f6;
    }

    .toast-warning .toast-left-border {
      background: #f59e0b;
    }

    .toast-content {
      display: flex;
      align-items: center;
      gap: 14px;
      flex: 1;
      padding: 16px 18px;
    }

    .toast-icon-wrapper {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .toast-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 8px;
    }

    .toast-success .toast-icon {
      background: rgba(34, 197, 94, 0.15);
      color: #22c55e;
    }

    .toast-error .toast-icon {
      background: rgba(220, 38, 38, 0.15);
      color: #DC2626;
    }

    .toast-info .toast-icon {
      background: rgba(59, 130, 246, 0.15);
      color: #3b82f6;
    }

    .toast-warning .toast-icon {
      background: rgba(245, 158, 11, 0.15);
      color: #f59e0b;
    }

    .toast-message {
      margin: 0;
      font-size: 14px;
      line-height: 1.5;
      font-weight: 500;
      color: #FFFFFF;
      font-family: 'Sohne', 'Helvetica', 'Arial', 'sans-serif';
    }

    .toast-close {
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 12px 14px;
      color: #A3A3A3;
      transition: all 0.2s;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .toast-close:hover {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.05);
    }

    @media (max-width: 768px) {
      .toast-container {
        right: 10px;
        left: 10px;
        max-width: none;
        top: 70px;
      }

      .toast {
        min-width: auto;
      }

      .toast-content {
        padding: 14px 16px;
      }

      .toast-icon {
        width: 32px;
        height: 32px;
      }

      .toast-message {
        font-size: 13px;
      }
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  notifications: ToastNotification[] = [];
  private subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription.add(
      this.notificationService.notifications$.subscribe(notifications => {
        this.notifications = notifications;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  remove(id: string) {
    this.notificationService.remove(id);
  }
}

