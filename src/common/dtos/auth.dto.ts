export class AuthDto {
  id: string;
  contraseña: string;
  email: string;
  role: 'CLIENTE' | 'EMPLEADO';
}
