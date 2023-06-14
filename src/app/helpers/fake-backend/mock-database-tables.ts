import { Patient } from "src/app/models/patient.model";
import { Role } from "src/app/models/role.model";
import { User } from "src/app/models/user.model";

export var databaseTables: { users: User[], patients: Patient[] } = {
  users: [
    { id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'User', imageUrl: null, role: Role.Admin },
    { id: 2, username: 'user', password: 'user', firstName: 'Normal', lastName: 'User', imageUrl: null, role: Role.User }
  ],
  patients: [
  {
    fullName:'',
    code:"p-2",
    id: 1,
    firstName: "John",
    lastName: "Doe",
    gender: 1,
    maritalStatus: "married",
    birthDate: new Date(1990, 1, 1),
    address: {
      id: 1,
      street: "123 Main St",
      cellPhone: "123-456-7890",
      homePhone: "987-654-3210",
      emergencyContactName: "Jane Doe",
      emergencyContactPhoneNumber: "555-555-5555",
      cityId: "1"
    },
    patientInsurance: {
      id: 1,
      insuranceCo: "ABC Insurance",
      insurancePhone: "800-123-4567",
      policyNo: "123456",
      groupNo: "789012",
      subscriberName: "Jane Doe",
      subscriberRelationshipToPatinet: "Spouse"
    }
  },
  {
    id: 2,
    code:"p-1",
    fullName:'',
    firstName: "Jane",
    lastName: "Smith",
    gender: 1,
    maritalStatus: "single",
    birthDate: new Date(1995, 5, 10),
    address: {
      id: 2,
      street: "456 Oak St",
      cellPhone: "111-222-3333",
      homePhone: "444-555-6666",
      emergencyContactName: "John Smith",
      emergencyContactPhoneNumber: "555-555-5555",
      cityId: "2"
    },
    patientInsurance: {
      id: 2,
      insuranceCo: "XYZ Insurance",
      insurancePhone: "800-987-6543",
      policyNo: "654321",
      groupNo: "012345",
      subscriberName: "John Smith",
      subscriberRelationshipToPatinet: "Father"
    }
  }
]
}


