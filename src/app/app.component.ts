import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from './shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.scss'],
  providers: [
    AuthenticationService, HttpClient

  ],
  imports: [
    // BrowserModule,
    // CommonModule,
     RouterOutlet,
     //BrowserAnimationsModule,
    // SharedModule,
     HttpClientModule
  ]
})
export class AppComponent {
  title = 'clinic-management';


}
