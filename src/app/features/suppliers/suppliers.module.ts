import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SuppliersComponent } from './suppliers.component';

const routes: Routes = [
  { path: '', component: SuppliersComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SuppliersComponent]
})
export class SuppliersModule {} 