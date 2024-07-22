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

export interface typeModificar {
  id: string;
  tipo: string;
}

export interface FormAbastecimiento {
  id: string;
  fecha: string;
  hora: string;
  cantidad: number;
  tipoCilindro: typeCilindro;
  estadoCilindro: typeCilindro;
  modificar?: typeModificar;
}

export interface initialStateFormAbastecimiento {
  data: FormAbastecimiento[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null;
  successMessage: string | null;
}

export interface SelectInputType {
  name: 'tipoCilindro' | 'estadoCilindro' | 'modificar';
  formAbastecimiento: FormAbastecimiento;
  setFormAbastecimiento: React.Dispatch<React.SetStateAction<FormAbastecimiento>>;
  arrayCilindros: { id: number; tipo: string }[];
}
