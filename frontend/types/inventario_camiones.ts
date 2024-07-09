export interface InfoInventarioCamiones {
  'ID Movimiento': string;
  fecha: string;
  hora: string;
  numeroMovil: number;
  IDdelConductor: number;
  Accion: string;
}

export interface TipoCilindro {
  'Tipo de cilindro': string;
  Llenos: number;
  Vacíos: number;
  Fallados: number;
  Prestados: number;
}

export type Tabla1Props = {
  SetIdMovimiento: (id: string) => void;
};

export interface DatosCamiones {
  'Fecha de Registro': string;
  'Marca del Camión': string;
  'Modelo del Camión': string;
  'Capacidad de Carga (kg)': number;
  'Placa del Camión': string;
}
