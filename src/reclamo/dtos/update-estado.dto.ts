import { Estados } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateEstadoDto {
  descripcion?: string;
  @IsEnum(Estados)
  estado: Estados;
}
