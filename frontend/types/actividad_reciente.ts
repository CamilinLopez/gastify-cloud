export interface Actividad {
  fecha: string;
  idConductor: string;
  kg5: number;
  kg11: number;
  kg15: number;
  kg45: number;
  h15: number;
  total: number;
  operaciones: 'carga' | 'retorno';
}
