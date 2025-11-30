import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModalService, ModalConfig } from '../../services/modal.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="modal" 
         class="modal-overlay"
         (click)="onOverlayClick($event)"
         [@fadeIn]="'in'">
      <div class="modal-container" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2 class="modal-title">{{ modal.title }}</h2>
          <button (click)="close()" class="modal-close">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        
        <div class="modal-body">
          <p class="modal-message">{{ modal.message }}</p>
        </div>

        <div class="modal-footer">
          <button *ngIf="modal.type === 'confirm'" 
                  (click)="onCancel()" 
                  class="modal-button modal-button-secondary">
            {{ modal.cancelText || 'Cancelar' }}
          </button>
          <button (click)="onConfirm()" 
                  class="modal-button modal-button-primary">
            {{ modal.confirmText || 'OK' }}
          </button>
        </div>
      </div>
    </div>
  `,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0 }))
      ])
    ])
  ],
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.75);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      padding: 20px;
    }

    .modal-container {
      background: #171717;
      border: 1px solid #262626;
      border-radius: 12px;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
      max-height: 90vh;
      overflow-y: auto;
      animation: slideUp 0.3s ease-out;
    }

    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 24px;
      border-bottom: 1px solid #262626;
    }

    .modal-title {
      margin: 0;
      font-size: 20px;
      font-weight: 600;
      color: #FFFFFF;
      font-family: 'Sohne', 'Helvetica', 'Arial', 'sans-serif';
    }

    .modal-close {
      background: transparent;
      border: none;
      color: #A3A3A3;
      cursor: pointer;
      padding: 4px;
      transition: color 0.2s;
    }

    .modal-close:hover {
      color: #FFFFFF;
    }

    .modal-body {
      padding: 24px;
    }

    .modal-message {
      margin: 0;
      font-size: 16px;
      line-height: 1.6;
      color: rgba(255, 255, 255, 0.8);
      font-family: 'Sohne', 'Helvetica', 'Arial', 'sans-serif';
    }

    .modal-footer {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      padding: 24px;
      border-top: 1px solid #262626;
    }

    .modal-button {
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      font-family: 'Sohne', 'Helvetica', 'Arial', 'sans-serif';
    }

    .modal-button-primary {
      background: #DC2626;
      color: #FFFFFF;
    }

    .modal-button-primary:hover {
      background: #B91C1C;
    }

    .modal-button-secondary {
      background: transparent;
      color: rgba(255, 255, 255, 0.8);
      border: 1px solid #404040;
    }

    .modal-button-secondary:hover {
      background: #262626;
      color: #FFFFFF;
      border-color: #525252;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @media (max-width: 768px) {
      .modal-container {
        max-width: 100%;
        margin: 20px;
      }

      .modal-header,
      .modal-body,
      .modal-footer {
        padding: 20px;
      }

      .modal-footer {
        flex-direction: column-reverse;
      }

      .modal-button {
        width: 100%;
      }
    }
  `]
})
export class ModalComponent implements OnInit, OnDestroy {
  modal: ModalConfig | null = null;
  private subscription = new Subscription();

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.subscription.add(
      this.modalService.modal$.subscribe(modal => {
        this.modal = modal;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close() {
    this.modalService.close();
  }

  onConfirm() {
    if (this.modal?.onConfirm) {
      this.modal.onConfirm();
    }
    this.close();
  }

  onCancel() {
    if (this.modal?.onCancel) {
      this.modal.onCancel();
    }
    this.close();
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}

