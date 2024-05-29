import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';


bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
    provideAuth0({
        domain: 'dev-dldijf5dnyno46t1.us.auth0.com',
        clientId: 'ui77yQ1o4A91tv0OLLbo5Ql5VAclGfo2',
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    }),
    provideStore(),
    provideEffects()
],
}).catch((err) => console.error(err));

