import { AuthGuard } from './helpers/auth.guard';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared.module';
import { mockBackendProvider } from './helpers/fake-backend/mock-backend';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    AuthGuard,
    mockBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
