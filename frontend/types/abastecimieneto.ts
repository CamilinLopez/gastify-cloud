export interface TablaAbastecimiento {
  'Tipo de cilindro': string;
  'Stock actual': number;
  'Stock mínimo': number;
  Alerta: 'Ok' | 'Bajo Stock';
}

export interface typeCilindro {
  id: string | string;
  tipo: string;
}

export interface FormAbastecimiento {
  id: string;
  fecha: string;
  hora: string;
  cantidad: number;
  tipoCilindroId: typeCilindro;
  estadoCilindroId: typeCilindro;
}

export interface initialStateFormAbastecimiento extends FormAbastecimiento {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null;
}

export interface SelectInputType {
  name: 'tipoCilindroId' | 'estadoCilindroId';
  formAbastecimiento: FormAbastecimiento;
  setFormAbastecimiento: React.Dispatch<React.SetStateAction<FormAbastecimiento>>;
  arrayCilindros: { id: number; tipo: string }[];
}
