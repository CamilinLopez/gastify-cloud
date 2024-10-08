import { typeCilindro } from './abastecimieneto';

interface TablaState {
  openTablaCarga: boolean;
  openTablaDescarga: boolean;
  openTablaOperaciones: boolean;
  openTablaVentas: boolean;
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
  empresaId: string;
}

export interface ErrorsForms {
  numero_movil?: string;
  nombre_conductor?: string;
}

export interface TablaCargaProps {
  estado: CargaDatos;
  setEstado: React.Dispatch<React.SetStateAction<CargaDatos>>;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsForms>>;
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
  responseTablaVentas: { message: string; result: ResponseTablaVentas[] };
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
  empresaId: string;
}

export interface ResponseTablaDescarga {
  tipo: string;
  fallados: number;
  llenos: number;
  vacíos: number;
  prestados: number;
}

type CilindroVentas = {
  tipoCilindroId: string;
  cantidad: string;
  valor: string;
};

export interface formularioVentas {
  '5kg': CilindroVentas;
  '11kg': CilindroVentas;
  '15kg': CilindroVentas;
  '45kg': CilindroVentas;
  H15: CilindroVentas;
}

export interface TablaVentasSend {
  cantidad: string;
  tipo: string;
  tipoCilindroId: string;
  valor: string;
}

export interface cargaDatosVentas {
  carga_id: string;
  camion: { id: string; placa: string };
  conductor: { id: string; nombre: string };
  tabla: TablaVentasSend[];
  empresaId: string;
}

export interface ResponseTablaVentas {
  cantidad: number;
  valor: number;
  tipoCilindro: { id: number; tipo: string };
}
