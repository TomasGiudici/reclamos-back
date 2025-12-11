import { Module } from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { ReclamoController } from './reclamo.controller';
import { ReclamosRepository } from './repositories/reclamos.repository';
import { CambioEstadoModule } from 'src/cambio-estado/cambio-estado.module';
import { TipoReclamoModule } from 'src/tipo-reclamo/tipo-reclamo.module';
import { ProyectoModule } from 'src/proyecto/proyecto.module';

@Module({
  imports: [TipoReclamoModule, CambioEstadoModule, ProyectoModule],
  controllers: [ReclamoController],
  providers: [ReclamoService, ReclamosRepository],
})
export class ReclamoModule {}
