import { Empleado, Area } from '@prisma/client';
import { EmpleadoDto } from '../dto/empleado.dto';

export function toEmpleadoDto(
  empleado: Empleado & { area?: Area | null },
): EmpleadoDto {
  return {
    id: empleado.id,
    email: empleado.email,
    telefono: empleado.telefono,
    nombre: empleado.nombre,
    role: empleado.role,
    area: empleado.area
      ? {
          id: empleado.area.id,
          nombre: empleado.area.nombre,
          descripcion: empleado.area.descripcion ?? undefined,
        }
      : null,
  };
}
