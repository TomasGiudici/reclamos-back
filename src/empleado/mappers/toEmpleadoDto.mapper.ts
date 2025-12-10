import { Empleado } from '@prisma/client';
import { EmpleadoDto } from '../dtos/empleado.dto';

export function toEmpleadoDto(empleado: Empleado): EmpleadoDto {
  const dto: EmpleadoDto = {
    id: empleado.id,
    email: empleado.email,
    telefono: empleado.telefono,
    nombre: empleado.nombre,
  };

  return dto;
}
