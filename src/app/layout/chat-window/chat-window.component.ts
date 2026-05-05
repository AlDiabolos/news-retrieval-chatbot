import { Component } from '@angular/core';
import { ChatInputComponent } from '../chat-input/chat-input.component';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Message {
  role: 'user' | 'assistant';
  content: string | SafeHtml;
}

@Component({
  selector: 'app-chat-window',
  standalone: true,
  imports: [CommonModule, ChatInputComponent],
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
})
export class ChatWindowComponent {
  messages: Message[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  onSend(text: string) {
    this.messages.push({ role: 'user', content: text });

    const assistant: Message = { role: 'assistant', content: '' };
    this.messages.push(assistant);

    this.streamResponse(text, assistant);
  }

  async streamResponse(question: string, assistantMsg: Message) {
    const response = await fetch('http://localhost:8000/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: 'ui-session',
        question,
      }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    let fullText = '';

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      fullText += decoder.decode(value, { stream: true });

      assistantMsg.content = fullText; // live stream (raw text)
    }

    // AFTER streaming → convert URLs to clickable links
    assistantMsg.content = this.linkify(fullText);
  }

  // -----------------------------
  // URL -> clickable links
  // -----------------------------
  linkify(text: string): SafeHtml {
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const linkedText = text.replace(urlRegex, (url) => {
      // remove trailing punctuation that breaks links
      const cleanUrl = url.replace(/[)\].,]+$/g, '');

      return `<a href="${cleanUrl}"
              target="_blank"
              rel="noopener noreferrer">${cleanUrl}</a>`;
    });

    return this.sanitizer.bypassSecurityTrustHtml(linkedText);
  }
}
