import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArtisansComponent } from './artisans.component';

const routes: Routes = [
  { path: '', component: ArtisansComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ArtisansComponent]
})
export class ArtisansModule {} 