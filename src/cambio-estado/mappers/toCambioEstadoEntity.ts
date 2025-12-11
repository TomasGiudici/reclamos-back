import { CreateCambioEstadoDto } from '../dto/create-cambio-estado.dto';
import { CambioEstadoCreateData } from '../interfaces/cambioEstado-create.interface';

export function toCambioEstadoCreateData(
  dto: CreateCambioEstadoDto,
): CambioEstadoCreateData {
  return {
    userId: dto.userId,
    reclamoId: dto.reclamoId,
    areaId: dto.area,
    estado: dto.estado,
  };
}
