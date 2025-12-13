import { Inject } from '@nestjs/common';
import type { ICambioEstadoRepository } from 'src/cambio-estado/repositories/cambioEstado.repository.interface';

export class ReclamoHelper {
  constructor(
    @Inject('ICambioEstadoRepository')
    private readonly CambioEstadoRepository: ICambioEstadoRepository,
  ) {}
  async findLastCambioEstado(id: string) {
    const cambioEstado =
      await this.CambioEstadoRepository.findLastCambioEstado(id);

    if (!cambioEstado)
      throw new Error('No se encontro el ultimo cambio de estado');

    return cambioEstado;
  }
}
