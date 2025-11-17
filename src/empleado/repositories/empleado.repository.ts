import { Injectable, NotFoundException } from "@nestjs/common";
import { IEmpleadoRepository } from "./empleado.repository.interface";
import { PrismaService } from "src/prisma/prisma.service";
import { Empleado } from "@prisma/client";
import { UsuarioCreateData } from "src/common/interfaces/usuario-create.interface";
import { UpdateClienteDto } from "src/cliente/dto/update.cliente.dto";
import { EmpleadoUpdateData } from "../interfaces/empleado-update.interface";

@Injectable()
export class EmpleadoRepository implements IEmpleadoRepository {
  constructor(private readonly prisma: PrismaService) {}

    async create(data: UsuarioCreateData): Promise<Empleado> {
        try {
          return await this.prisma.empleado.create({data});
        } catch (error) {
          const prismaError = error as { code?: string };

          if (prismaError.code === 'P2002') {
            throw new Error(`Empleado duplicado: ${data.email}`);
          }

          if (error instanceof Error) {
            throw new Error(`Error al crear el empleado: ${error.message}`);
          }

          throw new Error(`Error al crear el empleado: ${String(error)}`);
        }
    }

    async findAll(): Promise<Empleado[]> {
        const empleados = await this.prisma.empleado.findMany();
        return empleados.filter((empleado) => !empleado.deletedAt);
    }

    async findByEmail(email: string): Promise<Empleado | null> {
        const empleado = await this.prisma.empleado.findFirst({
            where: { email },
        });

        if (!empleado || empleado.deletedAt) {
            return null;
        }

        return empleado;
    }

    async findById(id: string): Promise<Empleado | null> {
        const empleado = await this.prisma.empleado.findFirst({
            where: { id },
        });

        if (!empleado || empleado.deletedAt) {
            return null;
        }

        return empleado;
    }

    async update(id: string, data: EmpleadoUpdateData): Promise<Empleado> {
        return this.prisma.cliente.update({
            where: { id },
            data,
        });
    }

 
    async softDelete(id: string): Promise<void> {
        const empleado = await this.prisma.empleado.findFirst({
            where: { id },
        });

        if (!empleado || empleado.deletedAt) {
            throw new NotFoundException(`El empleado con id "${id}" no existe`);
        }

        await this.prisma.empleado.update({
            where: { id: empleado.id },
            data: { deletedAt: new Date() },
        });
    }
}