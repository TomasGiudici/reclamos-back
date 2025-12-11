import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { ReclamosRepository } from './repositories/reclamos.repository';
import { TipoReclamoService } from 'src/tipo-reclamo/tipo-reclamo.service';
import { ReclamoDto } from './dto/reclamo.dto';
import { toReclamoCreateData } from './mappers/toReclamoEntity';
import { CambioEstadoService } from 'src/cambio-estado/cambio-estado.service';
import { Estados } from 'src/common/enums/estados.enum';
import { toReclamoDto } from './mappers/toReclamoDto';
import { ProyectoService } from 'src/proyecto/proyecto.service';

@Injectable()
export class ReclamoService {
  constructor(
    private readonly reclamoRepository: ReclamosRepository,
    private readonly tipoReclamoService: TipoReclamoService,
    private readonly cambioEstadoService: CambioEstadoService,
    private readonly proyectoService: ProyectoService,
  ) {}

  async create(dto: CreateReclamoDto, userId: string): Promise<ReclamoDto> {
    // 1. validar tipo de reclamo
    const existeTipo = await this.tipoReclamoService.findOne(dto.tipoReclamoId);
    if (!existeTipo) {
      throw new BadRequestException('Tipo de reclamo inexistente.');
    }

    // 2. validar proyecto
    const existeProyecto = await this.proyectoService.findOne(dto.proyectoId);
    if (!existeProyecto) {
      throw new BadRequestException('Proyecto inexistente.');
    }

    // 3. crear el reclamo base
    const data = toReclamoCreateData(dto);
    const reclamo = await this.reclamoRepository.create(data);

    // 4. crear estado inicial
    const estadoInicial = {
      userId,
      reclamoId: reclamo.id,
      area: dto.area,
      estado: Estados.PENDIENTE,
    };
    await this.cambioEstadoService.setEstadoInicial(estadoInicial);

    // 5. traer reclamo completo con cambios
    const reclamoCompleto = await this.reclamoRepository.findByIdCompleto(
      reclamo.id,
    );

    if (!reclamoCompleto) {
      throw new NotFoundException('Reclamo no encontrado');
    }

    // 6. mapear al dto
    return toReclamoDto(reclamoCompleto);
  }
}
