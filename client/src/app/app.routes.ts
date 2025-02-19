import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'map', loadComponent: () => import('./features/map/pages/map-main/map-main.component').then(m => m.MapMainComponent)},
    {path: 'map/:region', loadComponent: () => import('./features/map/pages/region-info/region-info.component').then(m => m.RegionInfoComponent)},
    {path: 'profile', loadComponent: () => import('./features/user/pages/profile/profile.component').then(m => m.ProfileComponent)},
    {path: 'login', loadComponent: () => import('./features/user/pages/login/login.component').then(m => m.LoginComponent)},
    {path: 'register', loadComponent: () => import('./features/user/pages/register/register.component').then(m => m.RegisterComponent)},
    {path: 'about', loadComponent: () => import('./features/home/pages/about/about.component').then(m => m.AboutComponent)},
    {path: 'contact', loadComponent: () => import('./features/home/pages/contact/contact.component').then(m => m.ContactComponent)},
    {path: '', loadComponent: () => import('./features/home/pages/homepage/homepage.component').then(m => m.HomepageComponent)},
    {path: '**', redirectTo: ''}
];
