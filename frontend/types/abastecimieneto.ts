export interface TablaAbastecimiento {
  'Tipo de cilindro': string;
  'Stock actual': number;
  'Stock mínimo': number;
  Alerta: 'Ok' | 'Bajo Stock';
}

export interface FormAbastecimiento {
  id: string;
  fecha: string;
  hora: string;
  tipoCilindroId: string;
  estadoCilindroId: string;
}
