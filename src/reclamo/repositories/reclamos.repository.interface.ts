import { Reclamo } from '@prisma/client';
import { ReclamoCreateData } from '../interfaces/reclamo-create.interface';

export interface IReclamoRepository {
  create(data: ReclamoCreateData): Promise<Reclamo>;
}
