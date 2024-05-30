import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuardLogged, authGuardNotLogged } from '../utils/guard/auth.guard';
import { UploadComponent } from './pages/upload/upload.component';
import { perfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        
    },
    {
        path: 'upload',
        component: UploadComponent,
        canActivate: [authGuardLogged]
    },

    {
        path: ':id',
        component: perfilComponent,
        canActivate: [authGuardLogged]
    }

];
