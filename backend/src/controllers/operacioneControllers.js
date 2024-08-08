const {
  inventario_camiones,
  inventario_bodegas,
  database,
  cargas,
  detalle_cargas,
  conductores,
  camiones,
  tipo_cilindros,
} = require('../db/index');
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

const TablaReportesDiarios = async () => {
  try {
    const data = await cargas.findAll({
      include: [
        {
          model: conductores,
          attributes: ['nombre'],
        },
        {
          model: camiones,
          attributes: ['placa'],
        },
      ],
    });
    const data1 = data.map((item) => ({
      id: item.id,
      fecha: item.fecha,
      hora: item.hora,
      camion: item.camione.placa,
      conductor: item.conductore.nombre,
    }));
    return { message: 'Accion comleta', result: data1 };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const transfereciaCilindros = async (numero_movil, id_conductor, carga_cilindros) => {
  //iniciar transaccion
  const transaction = await database.transaction();
  const cilindrosAceptados = [];
  const cilindrosRechasados = [];
  const fecha = generarFechaActual();
  const hora = generarHoraActual();

  try {
    for (const carga of carga_cilindros) {
      const cantidadBodega = await obtenerCantidadTotalBodega(carga.cilindro.id, 1);
      if (cantidadBodega >= carga.cantidad)
        cilindrosAceptados.push({ cantidadBodega, cantidadCarga: carga.cantidad, tipoClinindroId: carga.cilindro.id });
      if (cantidadBodega < carga.cantidad)
        cilindrosRechasados.push({ cantidadBodega, cantidadCarga: carga.cantidad, tipoCilindroId: carga.cilindro.id });
    }

    if (cilindrosAceptados.length > 0) {
      const carga = await cargas.create(
        {
          id: generateId(),
          fecha: generarFechaActual(),
          hora: generarHoraActual(),
          camion_id: String(numero_movil),
          conductor_id: id_conductor,
        },
        { transaction },
      );

      for (const detalleCarga of cilindrosAceptados) {
        await detalle_cargas.create(
          {
            id: generateId(),
            carga_id: carga.id,
            tipoCilindroId: Number(detalleCarga.tipoClinindroId),
            estadoCilindroId: 1, //solo cilindros llenos. El id para cilindros llenos es 1
            cantidad: detalleCarga.cantidadCarga,
          },
          { transaction },
        );
        await inventario_bodegas.create(
          {
            id: generateId(),
            fecha,
            hora,
            cantidad: -Number(detalleCarga.cantidadCarga),
            tipoCilindroId: Number(detalleCarga.tipoClinindroId),
            estadoCilindroId: 1,
          },
          { transaction },
        );
        await inventario_camiones.create(
          {
            id: generateId(),
            fecha,
            hora,
            cantidad: Number(detalleCarga.cantidadCarga),
            camionId: numero_movil,
            tipoCilindroId: Number(detalleCarga.tipoClinindroId),
            estadoCilindroId: 1,
          },
          { transaction },
        );
      }
      await transaction.commit();
      const tabla = await TablaReportesDiarios();
      return { message: 'Transferencia exitosamente', result: tabla.result };
    }
    if (cilindrosRechasados.length > 0 && cilindrosAceptados.length === 0) {
      throw { message: 'Cantidad insuficiente en bodega', result: cilindrosRechasados };
    }
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getTeblaVisualCargaDB = async (carga_id) => {
  try {
    const totalCargas = await detalle_cargas.findAll({
      attributes: ['id', 'carga_id', 'cantidad'],
      where: { carga_id },
      include: { model: tipo_cilindros, attributes: ['tipo'] },
    });

    if (totalCargas.length > 0) {
      return { message: 'Accion comleta', result: totalCargas };
    } else throw { message: 'No hay cargas', result: [] };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  transfereciaCilindros,
  TablaReportesDiarios,
  getTeblaVisualCargaDB,
};
