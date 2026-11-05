export type TipoReserva = 'entradas' | 'mesa' | 'visita' | 'inscripcion';

export interface PracticalInfoItem {
  nombre?: string;
  direccion?: string;
  telefono?: string;
  web?: string;
  reserva?: string;
  tipoReserva?: TipoReserva;
  horario?: string;
  precio?: string | number;
  precioOrientativo?: string | number;
  acceso?: string;
  fecha?: string;
}
