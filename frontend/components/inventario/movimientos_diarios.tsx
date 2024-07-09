import InventarioBodega from './inventario_bodega';
import InventarioCamiones from './inventario_camiones';
import Registro_camiones from './registro_camiones';

export default function MovimientosDiarios() {
  return (
    <div className="w-full">
      <InventarioBodega />
      <InventarioCamiones/>
      <Registro_camiones />
    </div>
  );
}
