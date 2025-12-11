import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { EmpleadoRepository } from './repositories/empleado.repository';
import { toEmpleadoDto } from './mappers/toEmpleadoDto.mapper';
import { EmpleadoDto } from './dto/empleado.dto';
import { toUsuarioEntity } from 'src/common/mappers/toUsuarioEntity.mapper';
import { UpdateEmpleadoDto } from './dto/update.empleado.dto';
import { toEmpleadoUpdateData } from './mappers/toEmpleadoParcial.mapper';
import { AuthDto } from 'src/common/dtos/auth.dto';
import { AuthMapper } from 'src/common/mappers/toAuthDto.mapper';
import { Roles } from 'src/common/enums/roles.enum';
import { AsignarAreaDto } from './dto/asignar.area.dto';
import { AreaService } from 'src/area/area.service';

@Injectable()
export class EmpleadoService {
  constructor(
    private readonly empleadoRepository: EmpleadoRepository,
    private readonly areaService: AreaService,
  ) {}

  async register(registerDto: RegisterDto): Promise<EmpleadoDto> {
    try {
      const data = toUsuarioEntity(registerDto);
      const empleado = await this.empleadoRepository.create(data);
      return toEmpleadoDto(empleado);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error al crear el empleado: ${error.message}`);
      }
      throw new Error('Error al crear el empleado: error desconocido');
    }
  }

  async update(id: string, dto: UpdateEmpleadoDto) {
    const existing = await this.empleadoRepository.findById(id);
    if (!existing) {
      throw new BadRequestException('El usuario no existe.');
    }

    if (dto.email) {
      const emailInUse = await this.empleadoRepository.findByEmail(dto.email);
      if (emailInUse && emailInUse.id !== id) {
        throw new BadRequestException('El email ya está en uso.');
      }
    }

    const updatedData = toEmpleadoUpdateData(dto);
    return this.empleadoRepository.update(id, updatedData);
  }

  async findOne(email: string): Promise<EmpleadoDto | null> {
    const empleado = await this.empleadoRepository.findByEmail(email);
    if (!empleado) {
      return null;
    }
    return toEmpleadoDto(empleado);
  }

  remove(id: number) {
    return `This action removes a #${id} empleado`;
  }

  async findForAuth(email: string): Promise<AuthDto | null> {
    const empleado = await this.empleadoRepository.findByEmail(email);
    if (empleado) {
      return AuthMapper.toAuthDto(empleado, Roles.EMPLEADO);
    }
    return null;
  }

  async asignarArea(email: string, dto: AsignarAreaDto): Promise<EmpleadoDto> {
    const areaDto = await this.areaService.findByName(dto.area);
    if (!areaDto) {
      throw new BadRequestException('El area no existe.');
    }

    const empleado = await this.empleadoRepository.asignarArea(
      email,
      areaDto.id,
    );
    return toEmpleadoDto(empleado);
  }
}
