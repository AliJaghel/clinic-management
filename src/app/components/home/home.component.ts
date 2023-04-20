import { AuthenticationService } from 'src/app/services/authentication.service';
import { SharedModule } from 'src/app/shared.module';
import { Component, HostListener, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Router, RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { User } from 'src/app/models/user.model';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    TranslateModule,

    MatSelectModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatMenuModule,
  ],
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
  private renderer: Renderer2 = inject(Renderer2);
  private router: Router = inject(Router);
  public translate: TranslateService = inject(TranslateService);
  isExpanded = false;
  isDarkMode = false;
  helpMenu = 'out'
  currentLanguage!: string;

  constructor() {
    this.currentLanguage = localStorage.getItem('lang') || 'en';
    this.translate.use(this.currentLanguage);
  }

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

  onDarkModeChange() {
    if (this.isDarkMode) {
      localStorage.setItem('darkMode', 'true');
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      localStorage.removeItem('darkMode');
      this.renderer.removeClass(document.body, 'dark-theme');
    }

  }

  onLanguageChange(value: any) {
    this.currentLanguage = value;
    this.translate.use(this.currentLanguage);
    localStorage.setItem('lang', value);
  }
  currentUser!:User;
  ngOnInit(): void {
      this.authenticationService.getLoggedInUser().subscribe((res:any)=>{
        this.currentUser = res
        console.log(res.imageUrl ? res.imageUrl : 'assets/icons/ic-person_avatar.png');

      })

    var isDarkMode = localStorage.getItem('darkMode');
    if (isDarkMode) this.isDarkMode = true;

  }


}




