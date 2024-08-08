import { typeCilindro } from '@/types/abastecimieneto';
type Cilindro = { id: number; tipo: '5kg' | '11kg' | '15kg' | '45kg' | 'H15' };

export const tipoCilindros: Cilindro[] = [
  { id: 1, tipo: '5kg' },
  { id: 2, tipo: '11kg' },
  { id: 3, tipo: '15kg' },
  { id: 4, tipo: '45kg' },
  { id: 5, tipo: 'H15' },
];

export const estadoCilindros = [
  { id: 1, tipo: 'Llenos' },
  { id: 2, tipo: 'Vacios' },
  { id: 3, tipo: 'Fallados' },
  { id: 4, tipo: 'Prestados' },
];

export const estadoModificar = [
  { id: 1, tipo: 'Agregar' },
  { id: 2, tipo: 'Eliminar' },
];
