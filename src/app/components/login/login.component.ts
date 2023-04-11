import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions, LottieModule } from 'ngx-lottie';
import { SharedModule } from 'src/app/shared.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginFormModel } from 'src/app/models/login-form.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SharedModule, MatProgressSpinnerModule],
  providers: [],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (this.authenticationService.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
  isLoggedIn = this.authenticationService.isLoggedIn;
  user: LoginFormModel = { username: '', password: '' };
  isLoading = false;
  errorMsg = '';
  returnUrl = '/';
  lottieOptions: AnimationOptions = {
    path: '/assets/lottie/doctor.json',
  };

  login() {
    this.isLoading = true;
    this.errorMsg = '';
    this.authenticationService.login(this.user).subscribe((res: any) => {
      this.isLoading = false;
      this.router.navigate([this.returnUrl],);
    }, err => {
      this.isLoading = false;
      this.errorMsg = err.error.message;
    })
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

}
