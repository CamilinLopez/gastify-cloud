import MovimientosDiarios from './movimientos_diarios';
import Registro_entradas_salidas from './registro_entradas_salidas';

export default function SectionsInventario() {
  return (
    <div className="w-full">
      <Registro_entradas_salidas />
      <MovimientosDiarios />
    </div>
  );
}
