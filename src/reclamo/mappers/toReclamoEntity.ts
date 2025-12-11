import { CreateReclamoDto } from '../dto/create-reclamo.dto';
import { ReclamoCreateData } from '../interfaces/reclamo-create.interface';

export function toReclamoCreateData(dto: CreateReclamoDto): ReclamoCreateData {
  return {
    tipoReclamoId: dto.tipoReclamoId,
    proyectoId: dto.proyectoId,
    prioridad: dto.prioridad,
    criticidad: dto.criticidad,
    descripcion: dto.descripcion,
  };
}
