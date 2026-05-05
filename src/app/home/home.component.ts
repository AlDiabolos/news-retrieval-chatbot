import { Component } from '@angular/core';
import { GreetingsComponent } from '../components/greetings/greetings.component';

@Component({
  selector: 'app-home',
  imports: [GreetingsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
