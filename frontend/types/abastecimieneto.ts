export interface TablaAbastecimiento {
  'Tipo de cilindro': string;
  'Stock actual': number;
  'Stock mínimo': number;
  Alerta: 'Ok' | 'Bajo Stock';
}

export interface typeCilindro {
  id: string | number;
  tipo: '5kg' | '11kg' | '15kg' | '45kg' | 'H15' | '';
}

export interface typeModificar {
  id: string;
  tipo: string;
}

export interface FormAbastecimiento {
  id?: string;
  fecha: string;
  hora?: string;
  cantidad: number;
  tipoCilindro: typeCilindro;
  estadoCilindro: typeCilindro;
  modificar?: typeModificar;
  empresaId: string;
}

export interface ErrorsForms {
  cantidad?: string;
  tipoCilindro?: string;
  estadoCilindro?: string;
  modificar?: string;
}

export interface SelectInputType {
  name: 'tipoCilindro' | 'estadoCilindro' | 'modificar';
  formAbastecimiento: FormAbastecimiento;
  setFormAbastecimiento: React.Dispatch<React.SetStateAction<FormAbastecimiento>>;
  arrayCilindros: { id: number | string; tipo: string }[];
}

// typados para array de la tabla inventario bodega
interface EstadoCilindro {
  [key: string]: number; // El nombre del estado (como "Lleno", "Vacío", etc.) y su cantidad
}

interface TipoCilindro {
  tipoCilindro: string; // Nombre del tipo de cilindro (como "5kg", "11kg", etc.)
  estados: EstadoCilindro; // Estados asociados con sus cantidades
}

export interface FechaInventario {
  fecha: string; // Fecha en formato 'YYYY-MM-DD'
  tipos: TipoCilindro[]; // Array de tipos de cilindros y sus estados
}

//typado de initialState Abastecimento
export interface initialStateFormAbastecimiento {
  data: FechaInventario[] | null;
  filteredData: FechaInventario | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null;
  successMessage: string | null;
}

interface TypeDataResponse {
  id: string;
  fecha: string;
  hora: string;
  cantidad: number;
  tipoCilindroId: number | null;
  estadoCilindroId: number | null;
}

export interface initialStateAbastecimiento {
  dataResponse: TypeDataResponse;
  tablaResponse: TablaAbastecimiento[];
  messageResponse: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null;
}
