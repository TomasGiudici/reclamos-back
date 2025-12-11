export class CambioEstadoDto {
    id: string;
    reclamoId: string;
    areaId: string;
    fechaInicio: Date;
    fechaFin: Date | null;
    descripcion: string | null;
    estado: string;
    empleadoId: string | null;
}