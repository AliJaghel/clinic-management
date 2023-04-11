import { SharedModule } from 'src/app/shared.module';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AuthenticationService } from './app/services/authentication.service';
import { AuthGuard } from './app/helpers/auth.guard';
import { mockBackendProvider } from './app/helpers/fake-backend/mock-backend';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {

  providers: [AuthenticationService,
    AuthGuard,
    mockBackendProvider,
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(SharedModule)

  ]
}).catch((err) => console.error(err));
