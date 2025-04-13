import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PortafolioComponent } from "./views/portafolio/portafolio.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortafolioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portafoliov2';
}
