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
  id?: string;
  fecha: string;
  hora?: string;
  cantidad: number;
  tipoCilindro: typeCilindro;
  estadoCilindro: typeCilindro;
  modificar?: typeModificar;
}

export interface SelectInputType {
  name: 'tipoCilindro' | 'estadoCilindro' | 'modificar';
  formAbastecimiento: FormAbastecimiento;
  setFormAbastecimiento: React.Dispatch<React.SetStateAction<FormAbastecimiento>>;
  arrayCilindros: { id: number; tipo: string }[];
}

export interface TiposResponseForm {}

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
