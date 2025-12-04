import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: ToastNotification[] = [];
  private notificationsSubject = new BehaviorSubject<ToastNotification[]>([]);
  
  notifications$: Observable<ToastNotification[]> = this.notificationsSubject.asObservable();

  constructor() {}

  show(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info', duration: number = 3000): void {
    const notification: ToastNotification = {
      id: this.generateId(),
      message,
      type,
      duration
    };

    this.notifications.push(notification);
    this.notificationsSubject.next([...this.notifications]);

    // Auto remove after duration
    setTimeout(() => {
      this.remove(notification.id);
    }, duration);
  }

  success(message: string, duration?: number): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration?: number): void {
    this.show(message, 'error', duration || 5000);
  }

  info(message: string, duration?: number): void {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration?: number): void {
    this.show(message, 'warning', duration);
  }

  remove(id: string): void {
    this.notifications = this.notifications.filter(n => n.id !== id);
    this.notificationsSubject.next([...this.notifications]);
  }

  clear(): void {
    this.notifications = [];
    this.notificationsSubject.next([]);
  }

  private generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}






