import { ITipoReclamoRepository } from './tipo-reclamo.repository.interface';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TipoReclamo } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TipoReclamoRepository implements ITipoReclamoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<TipoReclamo[]> {
    const tipoReclamos = await this.prisma.tipoReclamo.findMany();
    return tipoReclamos.filter((tipoReclamo) => !tipoReclamo.deletedAt);
  }

  async findById(id: string): Promise<TipoReclamo> {
    const tipoReclamo = await this.prisma.tipoReclamo.findFirst({
      where: { id },
    });

    if (!tipoReclamo || tipoReclamo.deletedAt) {
      throw new NotFoundException(`Tipo de Reclamo con id ${id} no encontrado`);
    }
    return tipoReclamo;
  }
}
