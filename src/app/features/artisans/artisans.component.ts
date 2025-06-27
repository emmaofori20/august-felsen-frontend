import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Artisan {
  name: string;
  trade: string;
  rating: number;
}

@Component({
  selector: 'app-artisans',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './artisans.component.html',
  styleUrls: ['./artisans.component.css']
})
export class ArtisansComponent {
  artisanForm: FormGroup;
  artisans: Artisan[] = [
    { name: 'Samuel Ade', trade: 'Mason', rating: 4.8 },
    { name: 'Grace Udo', trade: 'Carpenter', rating: 4.6 },
    { name: 'Peter Obi', trade: 'Foreman', rating: 4.9 }
  ];

  constructor(private fb: FormBuilder) {
    this.artisanForm = this.fb.group({
      name: ['', Validators.required],
      trade: ['', Validators.required],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  onSubmit() {
    if (this.artisanForm.valid) {
      this.artisans.push(this.artisanForm.value);
      this.artisanForm.reset({ rating: 5 });
    }
  }
} 