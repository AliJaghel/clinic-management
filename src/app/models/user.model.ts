import { Role } from './role.model';
export class User {
  id!: number;
  username!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  imageUrl?: string |null;
  role!: Role;
}
