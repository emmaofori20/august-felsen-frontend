import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.html'
})
export class AppComponent {
  protected title = 'august-felsen-frontend';
}
