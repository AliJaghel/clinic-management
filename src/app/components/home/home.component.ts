import { SharedModule } from 'src/app/shared.module';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SharedModule],
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
})
export class HomeComponent {
  isExpanded = false;
  helpMenu = 'out'
  @ViewChild('sideNavContent') sideNavContent!: ElementRef;
  toggleHelpMenu(): void {
    this.helpMenu = this.helpMenu === 'out' ? 'in' : 'out';
    this.isExpanded = !this.isExpanded;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (event.target == this.sideNavContent?.nativeElement) {
      console.log(event.target == this.sideNavContent?.nativeElement);
      this.isExpanded = false;
      this.helpMenu = 'out'
    }
  }

}




