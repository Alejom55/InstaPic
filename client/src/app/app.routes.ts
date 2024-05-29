import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuardLogged, authGuardNotLogged } from '../utils/guard/auth.guard';
import { PruebaComponent } from './pages/prueba/prueba.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        
    },
    {
        path: 'prueba',
        component: PruebaComponent
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
