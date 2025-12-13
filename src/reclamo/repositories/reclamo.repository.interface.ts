import { Reclamo } from '@prisma/client';
import { ReclamoCreateData } from '../interfaces/reclamo-create.interface';
import { CambioEstadoCreateData } from 'src/cambio-estado/interfaces/cambioEstado-create.interface';

export interface IReclamoRepository {
  create(
    data: ReclamoCreateData,
    userId: string,
  ): Promise<Reclamo & { cambioEstadoId: string }>;
  findByCliente(clienteId: string): Promise<Reclamo[]>;
  updateEstado(id: string, data: CambioEstadoCreateData): Promise<Reclamo>;
  reassignArea(data: CambioEstadoCreateData): Promise<Reclamo>;
}
