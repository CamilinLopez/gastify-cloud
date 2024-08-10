import { typeCilindro } from './abastecimieneto';

interface TablaState {
  openTablaCarga: boolean;
  openTablaDescarga: boolean;
  openTablaOperaciones: boolean;
}

export interface TablaProps {
  estado: TablaState;
  setEstado: React.Dispatch<React.SetStateAction<TablaState>>;
}

export interface EstadoCarga {
  carga: InfoReportesDiarios;
  setCarga: React.Dispatch<React.SetStateAction<InfoReportesDiarios>>;
}

export interface TablaReportesDiarias extends TablaProps {
  tabla: InfoReportesDiarios[];
  infoCarga: EstadoCarga;
}

export interface TypeTablaVisualCarga extends TablaProps {
  carga: InfoReportesDiarios;
}

export interface TypeTablaDescarga extends TablaProps {
  datosCarga: InfoReportesDiarios;
}

export type TypeCilindrosCantidad = { cilindro: typeCilindro; cantidad: number | string };
export type nameCilindro = {
  '5kg': TypeCilindrosCantidad;
  '11kg': TypeCilindrosCantidad;
  '15kg': TypeCilindrosCantidad;
  '45kg': TypeCilindrosCantidad;
  H15: TypeCilindrosCantidad;
};
export interface CargaDatos {
  numero_movil: { id: string; placa: string };
  nombre_conductor: { id: string; nombre: string };
  carga_cilindros: TypeCilindrosCantidad[];
}

export interface TablaCargaProps {
  estado: CargaDatos;
  setEstado: React.Dispatch<React.SetStateAction<CargaDatos>>;
}

type Cilindro = { id: number | number; tipo: '5kg' | '11kg' | '15kg' | '45kg' | 'H15' };

type resultResponse = {
  cantidadBodega: number;
  cantidadCarga: number;
  cilindro: Cilindro;
};

interface ResposeData {
  message: string;
  result: resultResponse[];
}

interface TypeResponseTablaCarga {
  movil: string;
  conductorId: string;
  cilindrosTerminados: ResposeData;
}

export type InfoReportesDiarios = {
  id: string;
  fecha: string;
  hora: string;
  camione: { id: string; placa: string };
  conductore: { id: string; nombre: string };
};

interface TypeTablaReportesDiarios {
  message: string;
  result: InfoReportesDiarios[];
}

export interface InitialStateOperaciones {
  responseTablaDescarga: { message: string; result: ResponseTablaDescarga[] };
  responseTablaVisualCarga: { message: string; result: DetalleCargas[] };
  responseTablaReportesDiarios: TypeTablaReportesDiarios;
  responseTablaCarga: TypeResponseTablaCarga;
  messageResponse: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: ResposeData | null;
}

export interface DetalleCargas {
  id: string;
  carga_id: string;
  tipo_cilindro: { tipo: string };
  cantidad: number;
}

export interface EstadoCilindro {
  estadoCilindroId: string;
  tipoCilindroId: string;
  cantidad: number | string;
}

export interface Formulario {
  [tipo: string]: {
    [estado: string]: EstadoCilindro;
  };
}

export interface infoTablaDescarga {
  tipoCilindro: string;
  estadoCilindro: string;
  estadoCilindroId: string;
  tipoCilindroId: string;
  cantidad: number | string;
}

export interface cargaDatosTablaDescarga {
  carga_id: string;
  camion: { id: string; placa: string };
  conductor: { id: string; nombre: string };
  tablaDescarga: infoTablaDescarga[];
}

export interface ResponseTablaDescarga {
  tipo: string;
  fallados: number;
  llenos: number;
  vacíos: number;
  prestados: number;
}
