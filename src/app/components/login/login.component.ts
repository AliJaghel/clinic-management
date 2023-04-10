import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { SharedModule } from 'src/app/shared.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginFormModel } from 'src/app/models/login-form.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  providers: [AuthenticationService, HttpClient,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    if (this.authenticationService.isLogedIn) {
      this.router.navigate(['/']);
    }
  }
  user: LoginFormModel = { username: '', password: '' };
  isLoading = this.authenticationService.isLogedIn;
  errorMsg = '';
  returnUrl = '/';
  lottieOptions: AnimationOptions = {
    path: '/assets/lottie/doctor.json',
  };

  login() {
    this.errorMsg = '';
    this.authenticationService.login(this.user).subscribe((res: any) => {
      this.router.navigate([this.returnUrl],);
    }, err => {
      this.errorMsg = err.error.message;
    })
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.authenticationService.loginSubject.subscribe(logedIn => {
      this.isLoading = logedIn
    })
  }

}
