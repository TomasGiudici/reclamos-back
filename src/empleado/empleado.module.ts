import { Module } from '@nestjs/common';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EmpleadoRepository } from './repositories/empleado.repository';

@Module({
  imports: [PrismaModule],
  controllers: [EmpleadoController],
  providers: [EmpleadoService, EmpleadoRepository],
  exports: [EmpleadoService]
})
export class EmpleadoModule {}
