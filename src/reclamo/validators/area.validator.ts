import { BadRequestException, Injectable } from '@nestjs/common';
import { EmpleadoService } from 'src/empleado/empleado.service';

@Injectable()
export class AreaValidator {
  constructor(private readonly empleadoService: EmpleadoService) {}

  async validateArea(areaId: string, userId: string): Promise<boolean> {
    const areaEmpleado = await this.empleadoService.findArea(userId);
    if (!areaEmpleado) {
      throw new BadRequestException('El empleado no tiene un area asignada.');
    }

    if (areaId !== areaEmpleado) {
      throw new BadRequestException(
        'El area del reclamo no coincide con el area del empleado.',
      );
    }
    return true;
  }
}
