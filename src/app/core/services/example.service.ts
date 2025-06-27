import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExampleService {
  getMessage() {
    return 'Hello from ExampleService!';
  }
} 