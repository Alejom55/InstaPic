import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuardLogged, authGuardNotLogged } from '../utils/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        
    },
    // {
    //     path: 'home',
    // },
    // {
    //     path: 'profile',
    // },
    // {
    //     path: 'publication',
    // },
    // {
    //     path: 'friends',
    // },
];
