import { Module } from '@nestjs/common';
import { ReclamoService } from './reclamo.service';
import { ReclamoController } from './reclamo.controller';
import { ReclamoRepository } from './repositories/reclamo.repository';
import { CambioEstadoModule } from '../cambio-estado/cambio-estado.module';
import { TipoReclamoModule } from 'src/tipo-reclamo/tipo-reclamo.module';
import { ProyectoModule } from 'src/proyecto/proyecto.module';
import { ReclamoValidator } from './validators/reclamo.validator';
import { ReclamoHelper } from './helper/reclamo.helper';
import { AreaModule } from 'src/area/area.module';
import { EmpleadoModule } from 'src/empleado/empleado.module';

@Module({
  imports: [
    TipoReclamoModule,
    CambioEstadoModule,
    ProyectoModule,
    AreaModule,
    EmpleadoModule,
  ],
  controllers: [ReclamoController],
  providers: [
    ReclamoService,
    ReclamoValidator,
    ReclamoHelper,
    { provide: 'IReclamoRepository', useClass: ReclamoRepository },
  ],
})
export class ReclamoModule {}
