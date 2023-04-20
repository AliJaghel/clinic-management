import { Address } from "./address.model";
import { PatientInsurance } from "./patient-insurance.model";

export class Patient {
  id!: number;
  firstName!: string;
  lastName!: string;
  gender!: number;
  maritalStatus!: string;
  birthDate!: Date;
  address!: Address;
  patientInsurance!: PatientInsurance;

  public get fullName(): string {
    return this.firstName + " " + this.lastName;
  }


}
