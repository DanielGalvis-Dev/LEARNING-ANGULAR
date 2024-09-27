import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TableroComponent } from './tablero/tablero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TableroComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Conecta Cuatro';
}
