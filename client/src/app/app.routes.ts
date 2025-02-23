import { Routes } from '@angular/router';
import { routingGuard } from './core/guards/routing.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {path: 'map', loadComponent: () => import('./features/map/pages/map-main/map-main.component').then(m => m.MapMainComponent), canActivate: [routingGuard]},
    {path: 'map/:region', loadComponent: () => import('./features/map/pages/map-region/map-region.component').then(m => m.MapRegionComponent), canActivate: [routingGuard]},
    {path: 'profile', loadComponent: () => import('./features/user/pages/profile/profile.component').then(m => m.ProfileComponent), canActivate: [routingGuard]},
    {path: 'login', loadComponent: () => import('./features/user/pages/login/login.component').then(m => m.LoginComponent), canActivate: [guestGuard]},
    {path: 'register', loadComponent: () => import('./features/user/pages/register/register.component').then(m => m.RegisterComponent), canActivate: [guestGuard]},
    {path: 'about', loadComponent: () => import('./features/home/pages/about/about.component').then(m => m.AboutComponent)},
    {path: 'contact', loadComponent: () => import('./features/home/pages/contact/contact.component').then(m => m.ContactComponent)},
    {path: '', loadComponent: () => import('./features/home/pages/homepage/homepage.component').then(m => m.HomepageComponent), canActivate: [guestGuard]},
    {path: '**', redirectTo: ''}
];
