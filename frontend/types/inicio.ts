export interface responseTablaResumenInventario {
  totalCantidad: string;
  tipoCilindro: {
    id: number;
    tipo: string;
  };
}

export interface responseTablas {
  llenos: responseTablaResumenInventario[];
  vacios: responseTablaResumenInventario[];
}

export interface responseVentaPorDia {
  tipoCilindro: { id: string; tipo: string };
  totalCantidad: string;
}

export interface responseVentaPorMes {
  data: number[];
  borderColor: string;
  borderWidth: number;
  fill: boolean;
  label: string;
}

export interface initialStateInicio {
  responseVentaPorMes: { message: string; result: responseVentaPorMes[] };
  responseVentaPorDia: { message: string; today: string; result: responseVentaPorDia[] };
  responseTablaResumenInventario: { message: string; result: responseTablas };
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null;
}
