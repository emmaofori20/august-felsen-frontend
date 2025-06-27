import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen = false;
  constructor(public auth: AuthService) {}
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  get isLoggedIn() {
    return this.auth.isLoggedIn;
  }
  get user() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  logout() {
    this.auth.logout();
    this.menuOpen = false;
  }
} 