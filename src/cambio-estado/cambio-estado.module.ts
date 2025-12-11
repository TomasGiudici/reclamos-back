import { Module } from '@nestjs/common';
import { CambioEstadoService } from './cambio-estado.service';
import { CambioEstadoController } from './cambio-estado.controller';
import { AreaModule } from 'src/area/area.module';
import { CambioEstadoRepository } from './repositories/cambioEstado.repository';

@Module({
  imports: [AreaModule],
  controllers: [CambioEstadoController],
  providers: [CambioEstadoService, CambioEstadoRepository],
  exports: [CambioEstadoService],
})
export class CambioEstadoModule {}
