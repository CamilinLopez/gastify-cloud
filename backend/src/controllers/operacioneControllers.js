const {
  inventario_camiones,
  inventario_bodegas,
  database,
  cargas,
  detalle_cargas,
  conductores,
  camiones,
  tipo_cilindros,
  estado_cilindros,
  descarga_camiones,
  ventas,
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
      attributes: ['fecha', 'hora', 'id'],
      include: [
        {
          model: conductores,
          attributes: ['nombre', 'id'],
        },
        {
          model: camiones,
          attributes: ['placa', 'id'],
        },
      ],
    });

    return { message: 'Accion comleta', result: data };
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

const crearTablaDescargaDB = async (carga_id, conductor, camion, tablaDescarga) => {
  const idDescarga = generateId();
  try {
    for (const descarga of tablaDescarga) {
      await descarga_camiones.create({
        id: generateId(),
        fecha: generarFechaActual(),
        hora: generarHoraActual(),
        carga_id,
        camion_id: camion.id,
        conductor_id: conductor.id,
        cantidad: Number(descarga.cantidad === '' ? 0 : descarga.cantidad),
        tipo_cilindros: Number(descarga.tipoCilindroId),
        estado_cilindros: Number(descarga.estadoCilindroId),
      });

      await inventario_bodegas.create({
        id: generateId(),
        fecha: generarFechaActual(),
        hora: generarHoraActual(),
        cantidad: Number(descarga.cantidad === '' ? 0 : descarga.cantidad),
        tipoCilindroId: Number(descarga.tipoCilindroId),
        estadoCilindroId: Number(descarga.estadoCilindroId),
      });
    }
    return { message: 'Accion completa', result: [] };
  } catch (error) {
    console.log(error, 'mamama');
    throw error;
  }
};

const obtenerTablaDescargaDB = async (carga_id) => {
  try {
    const data = await descarga_camiones.findAll({
      attributes: ['id', 'fecha', 'hora', 'carga_id', 'camion_id', 'conductor_id', 'cantidad'],
      where: { carga_id },
      include: [
        {
          model: tipo_cilindros,
          attributes: ['tipo', 'id'],
        },
        {
          model: estado_cilindros,
        },
      ],
    });

    // Agrupación por tipo_cilindro y conteo de estados
    const datosAgrupados = data.reduce((acc, registro) => {
      const tipoNombre = registro.tipo_cilindro.tipo;
      const estado = registro.estado_cilindro.tipo;
      const cantidad = registro.cantidad;

      // Si no existe una entrada para este tipo de cilindro, créala
      if (!acc[tipoNombre]) {
        acc[tipoNombre] = {
          tipo: tipoNombre,
          fallados: 0,
          llenos: 0,
          vacíos: 0,
          prestados: 0,
        };
      }

      // Acumulación de la cantidad según el estado
      if (estado === 'Fallado') {
        acc[tipoNombre].fallados += cantidad;
      } else if (estado === 'Lleno') {
        acc[tipoNombre].llenos += cantidad;
      } else if (estado === 'Vacío') {
        acc[tipoNombre].vacíos += cantidad;
      } else if (estado === 'Prestado') {
        acc[tipoNombre].prestados += cantidad;
      }

      return acc;
    }, {});

    // Convertir el objeto a un array
    const datosAgrupadosArray = Object.values(datosAgrupados);

    if (data.length > 0) return { message: 'Accion completa', result: datosAgrupadosArray };
    else return { message: 'No se ha realizado la descarga aun', result: [] };
  } catch (error) {
    throw error;
  }
};

const crearVentasDB = async (camion, carga_id, conductor, tabla) => {
  try {
    for (const venta of tabla) {
      await ventas.create({
        id: generateId(),
        fecha: '2024/09/06',
        hora: generarHoraActual(),
        carga_id: carga_id,
        camion_id: camion.id,
        conductor_id: conductor.id,
        tipoCilindroId: Number(venta.tipoCilindroId),
        cantidad: Number(venta.cantidad),
        valor: Number(venta.valor),
      });
    }
    return { message: 'Accion completa', result: [] };
  } catch (error) {
    throw error;
  }
};

const obtenerTablaVentas = async (carga_id) => {
  try {
    const data = await ventas.findAll({
      attributes: ['cantidad', 'valor'],
      where: { carga_id },
      include: [
        {
          model: tipo_cilindros,
          as: 'tipoCilindro',
          attributes: ['tipo', 'id'],
        },
      ],
    });

    return { message: 'Accion completa', result: data };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  transfereciaCilindros,
  TablaReportesDiarios,
  getTeblaVisualCargaDB,
  crearTablaDescargaDB,
  obtenerTablaDescargaDB,
  crearVentasDB,
  obtenerTablaVentas,
};
