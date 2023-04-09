import { SharedModule } from 'src/app/shared.module';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  showFiller= false;

  openNav(){
    console.log( this.showFiller);

    this.showFiller =  !this.showFiller;
  }
}




