import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCambioEstadoDto } from './dto/create-cambio-estado.dto';
import { AreaService } from 'src/area/area.service';
import { toCambioEstadoCreateData } from './mappers/toCambioEstadoEntity';
import { CambioEstadoRepository } from './repositories/cambioEstado.repository';
import { toCambioEstadoDto } from './mappers/toCambioEstadoDto';
import { CambioEstadoDto } from './dto/cambioEstado.dto';

@Injectable()
export class CambioEstadoService {
  constructor(
    private readonly cambioEstadoRepository: CambioEstadoRepository,
    private readonly areaService: AreaService,
  ) {}

  async setEstadoInicial(
    dto: CreateCambioEstadoDto,
  ): Promise<CambioEstadoDto | null> {
    //1. validar area
    const existeArea = await this.areaService.findByName(dto.area);
    if (!existeArea) {
      throw new BadRequestException('Área inexistente.');
    }
    dto.area = existeArea.id;

    //2. crear cambio de estado
    const data = toCambioEstadoCreateData(dto);
    const cambioEstado = await this.cambioEstadoRepository.create(data);
    return toCambioEstadoDto(cambioEstado);
  }
}
