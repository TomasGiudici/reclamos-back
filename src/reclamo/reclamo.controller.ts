import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Put,
  Param,
} from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { CreateReclamoDto } from './dtos/create-reclamo.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { UpdateEstadoDto } from './dtos/update-estado.dto';
import { ReasignarAreaDto } from './dtos/reasignar-area.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reclamo')
export class ReclamoController {
  constructor(private readonly service: ReclamoService) {}

  @Roles(Role.CLIENTE)
  @Post()
  create(@Body() dto: CreateReclamoDto, @Req() req) {
    const userId = req.user.id as string;
    return this.service.create(dto, userId);
  }

  @Roles(Role.EMPLEADO)
  @Put(':id')
  updateEstado(
    @Param('id') id: string,
    @Body() dto: UpdateEstadoDto,
    @Req() req,
  ) {
    const userId = req.user.id as string;
    return this.service.updateEstado(id, dto, userId);
  }

  @Roles(Role.EMPLEADO)
  @Put('/:id')
  reassignArea(
    @Param('id') reclamoId: string,
    @Body() dto: ReasignarAreaDto,
    @Req() req,
  ) {
    const userId = req.user.sub as string;
    return this.service.reassignArea(reclamoId, dto, userId);
  }

  /*@Roles(Role.CLIENTE)
  @Put('/:id')
  update(
    @Param('id') reclamoId: string,
    @Body() dto: UpdateReclamoDto,
    @Req() req) {
    const userId = req.user.sub as string;
    return this.service.update(areaId);
  }*/
}
