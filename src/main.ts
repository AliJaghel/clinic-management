import { SharedModule } from 'src/app/shared.module';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AuthenticationService } from './app/services/authentication.service';
import { AuthGuard } from './app/helpers/auth.guard';
import { mockBackendProvider } from './app/helpers/fake-backend/mock-backend.interceptor';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { jwtInterceptorProvider } from './app/interceptors/jwt.interceptor';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

bootstrapApplication(AppComponent, {

  providers: [AuthenticationService,
    AuthGuard,
    jwtInterceptorProvider,
    mockBackendProvider,
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    TranslateService,
    TranslateStore,
    importProvidersFrom(TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })),
    importProvidersFrom(SharedModule)

  ]
}).catch((err) => console.error(err));
