import { Cliente } from '@prisma/client';
import { UsuarioCreateData } from 'src/common/interfaces/usuario-create.interface';

export interface IClienteRepository {
  create(data: UsuarioCreateData): Promise<Cliente>;
  findAll(): Promise<Cliente[]>;
  findByEmail(email: string): Promise<Cliente | null>;
  findById(id: string): Promise<Cliente | null>;
  //update(id: string, data: Prisma.MarcaUpdateInput): Promise<Marca>;
  softDelete(id: string): Promise<void>;
}