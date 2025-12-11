import { Estados } from "src/common/enums/estados.enum";

export interface CambioEstadoCreateData {
  userId: string;
  reclamoId: string;
  areaId: string;
  estado: Estados;
}
