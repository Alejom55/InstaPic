import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';


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
  ],
}).catch((err) => console.error(err));

