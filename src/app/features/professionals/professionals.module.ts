import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProfessionalsComponent } from './professionals.component';

const routes: Routes = [
  { path: '', component: ProfessionalsComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ProfessionalsComponent]
})
export class ProfessionalsModule {} 