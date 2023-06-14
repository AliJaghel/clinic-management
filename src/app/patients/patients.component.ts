import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { MatTableModule } from '@angular/material/table';
import { PatientService } from '../services/patient.services';
import { TranslateModule } from '@ngx-translate/core';
import { City } from '../models/city.model';
import { PatientFormComponent } from './patient-form/patient-form.component';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,

    MatTableModule,
    PatientFormComponent,
    TranslateModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [PatientService]
})
export class PatientsComponent {
  public patientService: PatientService = inject(PatientService);
  selectedRow: any;


  onRowSelect(row: any) {
    this.selectedRow = row;
  }
  displayedColumns = ['code', 'fullName'];
  dataSource = [
    { code: 1, 'fullName': 'Ali Jaghel' },
    { code: 2, 'fullName': 'Test Jaghel' },
    { code: 3, 'fullName': 'Test Jaghel' },
    { code: 4, 'fullName': 'Test Jaghel' },
    { code: 3, 'fullName': 'Test Jaghel' },
    { code: 4, 'fullName': 'Test Jaghel' },
  ]

  ngOnInit(): void {
  }

}
