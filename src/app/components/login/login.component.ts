import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { SharedModule } from 'src/app/shared.module';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoginFormModel } from 'src/app/models/login-form.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SharedModule, HttpClientModule],
  providers: [AuthenticationService, HttpClient,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,private router:Router) {
            if (this.authenticationService.isLogedIn) {
              this.router.navigate(['/']);
          }
  }
  user: LoginFormModel = { username: '', password: '' };
  isLoading = this.authenticationService.isLogedIn;
  errorMsg = ''
  options: AnimationOptions = {
    path: '/assets/lottie/doctor.json',
  };

  login() {
    this.isLoading = true;
    this.errorMsg = '';
    this.authenticationService.login(this.user).subscribe((res: any) => {
      this.isLoading = false;
      this.router.navigate(['/']);
    }, err => {
      this.isLoading = false;
      console.log(err);

    this.errorMsg = err.error.message;
    })
  }

  ngOnInit(): void {
    this.authenticationService.loginSubject.subscribe(logedIn=>{
      this.isLoading = logedIn
    })
  }

}
