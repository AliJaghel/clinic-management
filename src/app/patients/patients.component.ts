import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { MatTableModule } from '@angular/material/table';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.services';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';

import { City } from '../models/city.model';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,

    MatTableModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,

    ReactiveFormsModule,
    TranslateModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
  providers: [PatientService]
})
export class PatientsComponent {
  private patientService: PatientService = inject(PatientService);

  cities: City[] = [{ id: 1, arName: 'Damascus', enName: 'Damascus', countryId: 1 }]
  selectedRow!: any;
  // form: FormGroup = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),

  // });
  patientForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.patientForm = this.formBuilder.group({

      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      gender: [null, Validators.required],
      maritalStatus: [null],
      birthDate: [null, Validators.required],
      address: this.formBuilder.group({
        street: ["", Validators.required],
        cellPhone: ["", Validators.required],
        homePhone: ["", Validators.required],
        emergencyContactName: [""],
        emergencyContactPhoneNumber: [""],
        cityId: ["", Validators.required]
      }),
      patientInsurance: this.formBuilder.group({
        insuranceCo: [""],
        insurancePhone: [""],
        policyNo: [""],
        groupNo: [""],
        subscriberName: [""],
        subscriberRelationshipToPatinet: [""]
      })
    });

    // this.form = this.formBuilder.group(
    //   {
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //   }
    // );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.patientForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.patientForm.value);

    if (this.patientForm.invalid) {
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.patientForm.reset();
  }



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

}
