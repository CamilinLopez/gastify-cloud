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

export interface EstadosTablas {
  showTabla1: boolean;
  showTabla2: boolean;
}

export interface TypeShowTalbas {
  estado: EstadosTablas;
  setEstado: React.Dispatch<React.SetStateAction<EstadosTablas>>;
}

export interface DatosCamiones {
  id: string;
  fecha?: string;
  marca: string;
  modelo: string;
  capacidad_carga: number;
  placa: string;
  empresaId: string;
}

export interface ErrorsForms {
  marca?: string;
  modelo?: string;
  capacidad_carga?: string;
  placa?: string;
}
