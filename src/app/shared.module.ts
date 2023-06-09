import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LottieModule } from 'ngx-lottie';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatRippleModule } from '@angular/material/core';
export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web');
}
@NgModule({
  declarations: [],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    FormsModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatRippleModule,
    FormsModule,
    LottieModule]
})
export class SharedModule { }
