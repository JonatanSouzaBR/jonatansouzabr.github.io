import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalComponent],
  template: `
    <div class="min-h-screen flex flex-col bg-black">
      <app-header></app-header>
      <main class="flex-grow pt-8 md:pt-10 lg:pt-12">
        <router-outlet></router-outlet>
      </main>
      <app-footer></app-footer>
      <app-modal></app-modal>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'MentorMatch';
}

