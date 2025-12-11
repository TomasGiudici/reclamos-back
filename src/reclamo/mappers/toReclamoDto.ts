import { Reclamo, CambioEstado, TipoReclamo, Proyecto } from '@prisma/client';
import { ReclamoDto } from '../dto/reclamo.dto';
import { toCambioEstadoDto } from 'src/cambio-estado/mappers/toCambioEstadoDto';
import { Medidas } from 'src/common/enums/medidas.enum';
import { TipoReclamoMapper } from 'src/tipo-reclamo/mappers/tipo-reclamo.mapper';
import { aProyectoDto } from 'src/proyecto/mapper/proyecto.mapper';

export function toReclamoDto(
  reclamo: Reclamo & {
    cambioEstado: CambioEstado[];
    TipoReclamo: TipoReclamo;
    proyecto: Proyecto;
  },
): ReclamoDto {
  return {
    id: reclamo.id,
    tipoReclamo: TipoReclamoMapper.toTipoReclamoDto(reclamo.TipoReclamo),
    proyecto: aProyectoDto(reclamo.proyecto),
    prioridad: Medidas[reclamo.prioridad] as Medidas,
    criticidad: Medidas[reclamo.criticidad] as Medidas,
    descripcion: reclamo.descripcion,
    createdAt: reclamo.createdAt,
    updatedAt: reclamo.updatedAt,
    cambioEstado: reclamo.cambioEstado.map(toCambioEstadoDto),
  };
}
