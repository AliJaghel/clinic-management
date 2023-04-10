import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {
  displayedColumns = ['code', 'fullName'];
  dataSource = [
    { code: 1, 'fullName': 'Ali Jaghel' },
    { code: 2, 'fullName': 'Sarya Jaghel' },
    { code: 3, 'fullName': 'Ahmad Jaghel' },
    { code: 4, 'fullName': 'Ali Jaghel' },
    { code: 5, 'fullName': 'Ali Jaghel' },
    { code: 6, 'fullName': 'Ali Jaghel' },
    { code: 7, 'fullName': 'Ali Jaghel' },
    { code: 8, 'fullName': 'Ali Jaghel' },
    { code: 9, 'fullName': 'Ali Jaghel' },


  ]

}
