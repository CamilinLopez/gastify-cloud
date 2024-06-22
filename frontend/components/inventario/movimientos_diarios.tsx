import InventarioBodega from './inventario_bodega';
import InventarioCamiones from './inventario_camiones';

export default function MovimientosDiarios() {
  return (
    <div className="w-full">
      <InventarioBodega />
      <InventarioCamiones/>
    </div>
  );
}
