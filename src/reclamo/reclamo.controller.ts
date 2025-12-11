import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { CreateReclamoDto } from './dto/create-reclamo.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('reclamo')
export class ReclamoController {
  constructor(private readonly reclamoService: ReclamoService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('CLIENTE')
  @Post()
  create(@Body() dto: CreateReclamoDto, @Req() req) {
    const userId = req.user.sub as string;
    return this.reclamoService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLEADO')
  @Get()
  getReclamosPorArea() {
    //return this.reclamoService.reclamosPorArea();
  }
}
