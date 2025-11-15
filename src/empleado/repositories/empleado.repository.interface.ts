import { Empleado } from '@prisma/client';
import { UsuarioCreateData } from 'src/common/interfaces/usuario-create.interface';

export interface IEmpleadoRepository {
  create(data: UsuarioCreateData): Promise<Empleado>;
  findAll(): Promise<Empleado[]>;
  findByEmail(email: string): Promise<Empleado | null>;
  findById(id: string): Promise<Empleado | null>;
  //update(id: string, data: Prisma.MarcaUpdateInput): Promise<Marca>;
  softDelete(id: string): Promise<void>;
}