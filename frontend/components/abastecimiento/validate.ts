import { ErrorsForms, FormAbastecimiento } from '@/types/abastecimieneto';

export function validate(user: FormAbastecimiento) {
  let errors: ErrorsForms = {};
  if (!user.cantidad) errors.cantidad = 'Cantidad es requerida.';
  if (!user.estadoCilindro.id || !user.estadoCilindro.tipo) errors.estadoCilindro = 'Selecciona un estado de cilindro.';

  if (!user.tipoCilindro.id || !user.tipoCilindro.tipo) errors.tipoCilindro = 'Selecciona un tipo de cilindro.';
  if (!user.modificar?.id || !user.modificar.tipo) errors.modificar = 'Selecciona una acción.';

  return errors;
}
