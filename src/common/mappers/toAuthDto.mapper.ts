import { AuthDto } from 'src/common/dtos/auth.dto';

type AuthEntityLike = { id: string; email: string; contraseña: string };

export class AuthMapper {
  static toAuthDto<T extends AuthEntityLike>(
    entity: T,
    role: 'CLIENTE' | 'EMPLEADO',
  ): AuthDto {
    return {
      id: entity.id,
      email: entity.email,
      contraseña: entity.contraseña,
      role,
    };
  }
}
