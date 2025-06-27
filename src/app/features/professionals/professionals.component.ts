import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Professional {
  name: string;
  role: string;
  email: string;
}

@Component({
  selector: 'app-professionals',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.css']
})
export class ProfessionalsComponent {
  profileForm: FormGroup;
  searchControl = new FormControl('');
  professionals: Professional[] = [
    { name: 'Jane Doe', role: 'Civil Engineer', email: 'jane@example.com' },
    { name: 'John Smith', role: 'Project Manager', email: 'john@example.com' },
    { name: 'Alice Brown', role: 'Contractor', email: 'alice@example.com' }
  ];

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get filteredProfessionals() {
    const search = this.searchControl.value?.toLowerCase() || '';
    return this.professionals.filter(p =>
      p.name.toLowerCase().includes(search) ||
      p.role.toLowerCase().includes(search)
    );
  }

  onSubmit() {
    if (this.profileForm.valid) {
      this.professionals.push(this.profileForm.value);
      this.profileForm.reset();
    }
  }
} 