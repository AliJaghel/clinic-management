import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LottieModule } from 'ngx-lottie';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    LottieModule]
})
export class SharedModule { }
