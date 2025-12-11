import { Estados } from "src/common/enums/estados.enum";

export class CreateCambioEstadoDto {
  userId: string;
  reclamoId: string;
  area: string;
  estado: Estados;
}
