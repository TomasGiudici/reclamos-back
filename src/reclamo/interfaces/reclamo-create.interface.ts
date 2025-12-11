import { Medidas } from 'src/common/enums/medidas.enum';

export interface ReclamoCreateData {
  tipoReclamoId: string;
  proyectoId: string;
  prioridad: Medidas;
  criticidad: Medidas;
  descripcion: string;
}
