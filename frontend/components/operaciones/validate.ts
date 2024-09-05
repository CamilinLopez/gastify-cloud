import { ErrorsForms, CargaDatos } from '@/types/operaciones';

export function validate(data: CargaDatos) {
  let errors: ErrorsForms = {};
  if (!data.numero_movil.id || !data.numero_movil.placa) errors.numero_movil = 'Seleccione un camión.';
  if (!data.nombre_conductor.id || !data.nombre_conductor.nombre) errors.nombre_conductor = 'Seleccione un conductor.';

  return errors;
}
