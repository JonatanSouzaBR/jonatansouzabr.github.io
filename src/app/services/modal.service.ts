import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ModalConfig {
  id: string;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'confirm' | 'alert' | 'info';
  onConfirm?: () => void;
  onCancel?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private currentModal: ModalConfig | null = null;
  private modalSubject = new BehaviorSubject<ModalConfig | null>(null);
  
  modal$: Observable<ModalConfig | null> = this.modalSubject.asObservable();

  constructor() {}

  show(config: Omit<ModalConfig, 'id'>): void {
    const modal: ModalConfig = {
      id: this.generateId(),
      ...config
    };

    this.currentModal = modal;
    this.modalSubject.next(modal);
  }

  confirm(title: string, message: string, onConfirm: () => void, onCancel?: () => void): void {
    this.show({
      title,
      message,
      type: 'confirm',
      confirmText: 'Confirmar',
      cancelText: 'Cancelar',
      onConfirm,
      onCancel
    });
  }

  alert(title: string, message: string, onConfirm?: () => void): void {
    this.show({
      title,
      message,
      type: 'alert',
      confirmText: 'OK',
      onConfirm: onConfirm || (() => this.close())
    });
  }

  close(): void {
    this.currentModal = null;
    this.modalSubject.next(null);
  }

  private generateId(): string {
    return `modal-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}










