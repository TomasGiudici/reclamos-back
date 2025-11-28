import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReclamoModule } from './reclamo/reclamo.module';
import { AreaModule } from './area/area.module';
import { TipoReclamoModule } from './tipo-reclamo/tipo-reclamo.module';
import { ProyectoModule } from './proyecto/proyecto.module';
import { TipoProyectoModule } from './tipo-proyecto/tipo-proyecto.module';

@Module({
  imports: [
    ProyectoModule,
    TipoProyectoModule,
    ReclamoModule,
    AreaModule,
    TipoReclamoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
