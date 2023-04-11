import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared.module';
import { MatTableModule } from '@angular/material/table';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, SharedModule, MatTableModule, ReactiveFormsModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {
  selectedRow!: any;
  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),

  });
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    console.log(this.form,this.submitted);

    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    console.log(JSON.stringify(this.form.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }



  onRowSelect(row: any) {
    this.selectedRow = row;
  }
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
    { code: 9, 'fullName': 'Ali Jaghel' },


  ]

}
