import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ServicesComponent } from './pages/services/services.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'professionals', loadChildren: () => import('./features/professionals/professionals.module').then(m => m.ProfessionalsModule) },
  { path: 'artisans', loadChildren: () => import('./features/artisans/artisans.module').then(m => m.ArtisansModule) },
  { path: 'diy-forum', loadChildren: () => import('./features/diy-forum/diy-forum.module').then(m => m.DiyForumModule) },
  { path: 'suppliers', loadChildren: () => import('./features/suppliers/suppliers.module').then(m => m.SuppliersModule) },
  { path: 'job-bidding', loadChildren: () => import('./features/job-bidding/job-bidding.module').then(m => m.JobBiddingModule) },
  { path: 'library', loadChildren: () => import('./features/library/library.module').then(m => m.LibraryModule) },
  { path: 'auth', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) },
  // { path: '**', redirectTo: '' }, // Wildcard route for a 404 page
];
