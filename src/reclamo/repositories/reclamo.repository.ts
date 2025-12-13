import { Inject, Injectable } from '@nestjs/common';
import prisma from '../../lib/db';
import { ReclamoCreateData } from '../interfaces/reclamo-create.interface';
import { Estados, Reclamo } from '@prisma/client';
import type { ICambioEstadoRepository } from 'src/cambio-estado/repositories/cambioEstado.repository.interface';
import type { IReclamoRepository } from './reclamo.repository.interface';
import { CambioEstadoCreateData } from 'src/cambio-estado/interfaces/cambioEstado-create.interface';

@Injectable()
export class ReclamoRepository implements IReclamoRepository {
  constructor(
    @Inject('ICambioEstadoRepository')
    private readonly cambioEstadoRepository: ICambioEstadoRepository,
  ) {}
  async create(
    reclamoData: ReclamoCreateData,
    userId: string,
  ): Promise<Reclamo & { cambioEstadoId: string }> {
    try {
      // Usamos $transaction para ejecutar múltiples operaciones de forma atómica
      const resultado = await prisma.$transaction(async (tx) => {
        // 1. Crear el reclamo
        const reclamo = await tx.reclamo.create({
          data: {
            tipoReclamoId: reclamoData.tipoReclamoId,
            proyectoId: reclamoData.proyectoId,
            prioridad: reclamoData.prioridad,
            criticidad: reclamoData.criticidad,
            descripcion: reclamoData.descripcion,
            estado: Estados.PENDIENTE,
          },
        });
        // 2. Crear el primer cambio de estado asociado al reclamo
        const cambioEstado = await this.cambioEstadoRepository.create({
          reclamoId: reclamo.id,
          areaId: reclamoData.areaId,
          estado: Estados.PENDIENTE,
          clienteId: userId,
          descripcion: reclamoData.descripcion,
        });

        return {
          ...reclamo,
          cambioEstadoId: cambioEstado.id,
        };
      });

      return resultado;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error al crear el reclamo con cambio de estado: ${error.message}`,
        );
      }

      throw new Error(
        `Error al crear el reclamo con cambio de estado: ${String(error)}`,
      );
    }
  }

  findByCliente(clienteId: string) {
    return prisma.reclamo.findMany({
      where: {
        proyecto: {
          clienteId,
        },
      },
      include: {
        tipoReclamo: true, // nombre EXACTO del modelo en Prisma
        proyecto: true,
        cambioEstado: true,
      },
    });
  }

  async updateEstado(
    id: string,
    dataCambioEstado: CambioEstadoCreateData,
  ): Promise<Reclamo> {
    const resultado = await prisma.$transaction(async (tx) => {
      // 1. Crear el reclamo
      const reclamo = await tx.reclamo.update({
        where: {
          id,
        },
        data: {
          estado: dataCambioEstado.estado,
        },
      });

      await this.cambioEstadoRepository.close(reclamo.id);

      // 2. Crear el primer cambio de estado asociado al reclamo
      const cambioEstado = await this.cambioEstadoRepository.create({
        reclamoId: reclamo.id,
        areaId: dataCambioEstado.areaId,
        estado: dataCambioEstado.estado,
        clienteId: dataCambioEstado.clienteId,
        descripcion: dataCambioEstado.descripcion,
      });

      return {
        ...reclamo,
        cambioEstadoId: cambioEstado.id,
      };
    });

    return resultado;
  }

  async reassignArea(data: CambioEstadoCreateData): Promise<Reclamo> {
    try {
      const resultado = await prisma.$transaction(async (tx) => {
        // 1. Crear el reclamo
        const reclamo = await tx.reclamo.update({
          where: {
            id: data.reclamoId,
          },
          data: {
            estado: data.estado,
          },
        });

        await this.cambioEstadoRepository.close(reclamo.id);

        // 2. Crear el primer cambio de estado asociado al reclamo
        const cambioEstado = await this.cambioEstadoRepository.create({
          reclamoId: reclamo.id,
          areaId: data.areaId,
          estado: data.estado,
          empleadoId: data.empleadoId,
          descripcion: data.descripcion,
        });

        return {
          ...reclamo,
          cambioEstadoId: cambioEstado.id,
        };
      });

      return resultado;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error al crear el reclamo con cambio de estado: ${error.message}`,
        );
      }

      throw new Error(
        `Error al crear el reclamo con cambio de estado: ${String(error)}`,
      );
    }
  }
}
