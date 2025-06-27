import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { JobBiddingComponent } from './job-bidding.component';

const routes: Routes = [
  { path: '', component: JobBiddingComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), JobBiddingComponent]
})
export class JobBiddingModule {} 