import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DiyForumComponent } from './diy-forum.component';

const routes: Routes = [
  { path: '', component: DiyForumComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), DiyForumComponent]
})
export class DiyForumModule {} 