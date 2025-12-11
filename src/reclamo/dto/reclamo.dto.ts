import { CambioEstadoDto } from 'src/cambio-estado/dto/cambioEstado.dto';
import { Medidas } from 'src/common/enums/medidas.enum';
import { ProyectoRespuestaDto } from 'src/proyecto/dto/respuesta-proyecto.dto';
import { TipoReclamoDto } from 'src/tipo-reclamo/dto/tipo-reclamo.dto';

export class ReclamoDto {
  id: string;
  tipoReclamo: TipoReclamoDto;
  proyecto: ProyectoRespuestaDto;
  prioridad: Medidas;
  criticidad: Medidas;
  descripcion: string;
  createdAt: Date;
  updatedAt: Date;
  cambioEstado: CambioEstadoDto[];
}
