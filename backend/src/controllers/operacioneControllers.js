const { estado_cilindros, tipo_cilindros, inventario_bodegas, database, conductor_camiones } = require('../db/index');
const { generateId, generarFechaActual, generarHoraActual } = require('../utils/generadorId');

async function obtenerCantidadTotalBodega(tipoCilindroId, estadoCilindroId) {
  const resultado = await inventario_bodegas.findAll({
    attributes: [[database.fn('SUM', database.col('cantidad')), 'totalCantidad']],
    where: {
      tipoCilindroId,
      estadoCilindroId,
    },
  });
  return resultado[0].get('totalCantidad');
}

const transfereciaCilindros = async (numero_movil, id_conductor, carga_cilindros) => {
  //iniciar transaccion
  const transaction = await database.transaction();
  const arrayCantidadRechasada = [];
  const arrayCantidadTransferencia = [];

  try {
    await conductor_camiones.create(
      {
        id: generateId(),
        conductorId: id_conductor,
        camionId: numero_movil,
        fecha: generarFechaActual(),
        hora: generarHoraActual(),
      },
      { transaction },
    );

    for (const carga of carga_cilindros) {
      const idTipoCilindro = Number(carga.cilindro.id);
      const EstadoCilindro = { id: 1, tipo: 'Lleno' };
      const cantidadTotalBodega = await obtenerCantidadTotalBodega(idTipoCilindro, EstadoCilindro.id);
      if (cantidadTotalBodega >= Number(carga.cantidad)) {
        arrayCantidadTransferencia.push({
          cantidadBodega: Number(cantidadTotalBodega),
          cantidadCarga: Number(carga.cantidad),
          tipoCilindro: carga.cilindro,
        });
      }
      if (cantidadTotalBodega < Number(carga.cantidad)) {
        arrayCantidadRechasada.push({
          cantidadBodega: cantidadTotalBodega === null ? 0 : Number(cantidadTotalBodega),
          cantidadCarga: Number(carga.cantidad),
          tipoCilindro: carga.cilindro,
        });
      }
    }

    //si hay stock en bodega para la cantidad de tipos de cilindros se accede a este if
    if (arrayCantidadTransferencia.length) {
      for (const transferencia of arrayCantidadTransferencia) {
        //eliminar o restar la cantidad de cilindros por tipo en bodega
        await inventario_bodegas.create(
          {
            id: generateId(),
            fecha: generarFechaActual(),
            hora: generarHoraActual,
            cantidad: -transferencia.cantidadCarga,
            tipoCilindroId: transferencia.tipoCilindro.id,
            estadoCilindroId: 1, // solo cilindros llenos que son de id 1
          },
          { transaction },
        );
        // transferir la catidad de cilindros al camion solo cilindros llenos
        await inventario_camiones.create(
          {
            id: generateId(),
            fecha: generarFechaActual(),
            hora: generarHoraActual(),
            cantidad: transferencia.cantidadCarga,
            camionId: numero_movil,
            tipoCilindroId: transferencia.tipoCilindro.id,
            estadoCilindroId: 1, // solo cilindros llenos que son de id 1
          },
          { transaction },
        );
      }

      await transaction.commit(); // se confirma la transferencia de cilindros al camion

      return {
        message: 'Transferencia exitosamente',
        result: { numero_movil, id_conductor, cilindrosTerminados: arrayCantidadRechasada },
      };
    }
    //si no hay estock para algunos tipos de cilindros accede a este if
    if (arrayCantidadRechasada.length && arrayCantidadTransferencia.length === 0) {
      throw { message: 'Cantidad insuficiente en bodega', result: arrayCantidadRechasada };
    }
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

module.exports = {
  transfereciaCilindros,
};
