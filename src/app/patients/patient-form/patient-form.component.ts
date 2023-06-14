import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared.module';
import { City } from 'src/app/models/city.model';
import { PatientService } from 'src/app/services/patient.services';

@Component({
  selector: 'app-patient-form',
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
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent {
  private patientService: PatientService = inject(PatientService);

  cities: City[] = [{ id: 1, arName: 'Damascus', enName: 'Damascus', countryId: 1 }]
  selectedRow!: any;
  // form: FormGroup = new FormGroup({
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),

  // });
  patientForm!:any;
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


  }

  get f(): { [key: string]: any } {
    return this.patientForm;
  }

  onSubmit(): void {
    this.submitted = true;
    console.log(this.patientForm.get('address').controls['street'].errors);
    console.log(this.patientForm.value);

    if (this.patientForm.invalid) {
      return;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.patientForm.reset();
  }

}
