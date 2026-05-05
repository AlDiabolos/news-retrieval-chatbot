import { Component } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { ChatWindowComponent } from './layout/chat-window/chat-window.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ChatWindowComponent],
  template: `
    <app-header></app-header>
    <div class="app-container">
      <app-chat-window></app-chat-window>
    </div>
  `,
  styles: [
    `
      .app-container {
        height: calc(100vh - 60px);
        display: flex;
      }
    `,
  ],
})
export class AppComponent {}
