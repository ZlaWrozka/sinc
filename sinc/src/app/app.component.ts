import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BasketComponent } from './basket/basket.component';
import { NavComponent } from './nav/nav.component';
import { LoadingComponent } from './loading/loading.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    BasketComponent,
    NavComponent,
    LoadingComponent
  ]
})
export class AppComponent {
  title = 'sinc';
}
