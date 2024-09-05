import { DatosCamiones, ErrorsForms } from '@/types/inventario_camiones';
import { Conductores, ErrorsConductores } from './registro_conductores';

export function validateCamiones(camion: DatosCamiones) {
  let errors: ErrorsForms = {};
  if (!camion.marca) errors.marca = 'Marca es requerida.';
  if (!camion.modelo) errors.modelo = 'Marca es requerida.';

  if (!camion.placa) errors.placa = 'Patente es requerida.';
  if (!camion.capacidad_carga) errors.capacidad_carga = 'Patente es requerida.';

  return errors;
}

export function validateConductores(conductor: Conductores) {
  let errors: ErrorsConductores = {};
  if (!conductor.nombre) errors.nombre = 'Nombre es requerido.';
  if (!conductor.licencia) errors.licencia = 'Licencia es requerido.';
  return errors;
}
