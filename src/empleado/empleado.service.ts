import { Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { EmpleadoRepository } from './repositories/empleado.repository';
import { toEmpleadoDto } from './mappers/toEmpleadoDto.mapper';
import { EmpleadoDto } from './dto/empleado.dto';
import { toUsuarioEntity } from 'src/common/mappers/toUsuarioEntity.mapper';

@Injectable()
export class EmpleadoService {
  constructor(
    private readonly empleadoRepository: EmpleadoRepository
  ) {}

  async register(registerDto: RegisterDto): Promise<EmpleadoDto> {
    try {
      const data = toUsuarioEntity(registerDto);
      const empleado = await this.empleadoRepository.create(data);
      return toEmpleadoDto(empleado);
    } catch (error) {
      throw new Error(`Error al crear el empleado: ${error.message}`);
    }
  }

  findAll() {
    return `This action returns all cliente`;
  }

  async findOne(email: string): Promise<EmpleadoDto | null> {
    const empleado = await this.empleadoRepository.findByEmail(email);
    if(!empleado) {
      return null;
    }
    return toEmpleadoDto(empleado);
  }

  update() {
    return `This action updates a cliente`;
  }

  remove(id: number) {
    return `This action removes a #${id} cliente`;
  }
}
