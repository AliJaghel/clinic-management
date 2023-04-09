import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { LottieModule } from 'ngx-lottie';
import { SharedModule } from 'src/app/shared.module';
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }


  options: AnimationOptions = {
    path: '/assets/lottie/doctor.json',
  };



  ngOnInit(): void {
  }

}
