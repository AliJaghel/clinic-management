import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedModule } from 'src/app/shared.module';
import { Component, ElementRef, HostListener, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMiniFabButton } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,

    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('100ms', style({ opacity: 0 }))
      ])
    ]
    ),
    trigger('slideInOut', [
      state('in', style({
        overflow: 'hidden',
        width: '*'
      })),
      state('out', style({
        overflow: 'hidden',
        width: '60px'
      })),
      transition('in => out', animate('100ms ease-in-out')),
      transition('out => in', animate('100ms ease-in-out'))
    ])
  ],
  providers: [AuthenticationService]
})
export class HomeComponent {
  private authenticationService: AuthenticationService = inject(AuthenticationService);
  private router: Router = inject(Router);
  isExpanded = false;
  helpMenu = 'out'
  toggleMenu(): void {
    this.helpMenu = this.helpMenu === 'out' ? 'in' : 'out';
    this.isExpanded = !this.isExpanded;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (event.srcElement.classList.contains('mat-drawer-shown')) {
      this.isExpanded = false;
      this.helpMenu = 'out'
    }
  }

}




