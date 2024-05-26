import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuardLogged, authGuardNotLogged } from '../utils/guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [],
    },
    {
        path: 'register',
        component: RegisterComponent
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
