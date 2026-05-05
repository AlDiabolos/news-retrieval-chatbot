import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './chat-input.component.html',
  styleUrls: ['./chat-input.component.scss'],
})
export class ChatInputComponent {
  @Output() send = new EventEmitter<string>();

  input = '';

  submit() {
    if (!this.input.trim()) return;

    this.send.emit(this.input);
    this.input = '';
  }
}
