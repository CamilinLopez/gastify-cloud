export interface TablaReportes {
  Fecha: string;
  'ID Conductor': string;
  '5kg': number;
  '11kg': number;
  '15kg': number;
  '45kg': number;
  H15: number;
  'Total kilos vendidos': number;
}

export interface InitialStateReportes {
  responseTablaReportes: { message: string; result: TablaReportes[] };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null;
}

export interface BuscarReportesForm {
  fecha: string;
  conductor: { id: string; nombre: string };
}
