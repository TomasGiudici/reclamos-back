import { Roles } from '../enums/roles.enum';

export class AuthDto {
  id: string;
  contraseña: string;
  email: string;
  role: Roles;
}
