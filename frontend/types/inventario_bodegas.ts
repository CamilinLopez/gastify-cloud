export interface InfoInventarioBodega {
  fecha: string;
  hora: string;
  tipoCilindro: string;
  Llenos: number;
  Vacios: number;
  Fallados: number;
  Prestados: number;
}

// typados para array de la tabla inventario bodega
interface EstadoCilindro {
  [key: string]: number; // El nombre del estado (como "Lleno", "Vacío", etc.) y su cantidad
}

interface TipoCilindro {
  tipoCilindro: string; // Nombre del tipo de cilindro (como "5kg", "11kg", etc.)
  estados: EstadoCilindro; // Estados asociados con sus cantidades
}

interface FechaInventario {
  fecha: string; // Fecha en formato 'YYYY-MM-DD'
  tipos: TipoCilindro[]; // Array de tipos de cilindros y sus estados
}

export interface initialStateInventario {
  messageResponse: string | null;
  tablaBodega: FechaInventario[];
  tablaBodegaFiteredByDate: FechaInventario | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null;
}
