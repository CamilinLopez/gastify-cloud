const { inventario_bodegas, tipo_cilindros, estado_cilindros, stockcilindros } = require('../db/index');
const { literal } = require('sequelize');
const { generarFechaActual } = require('../utils/generadorId');

const alarmaCilindros = async (empresaId) => {
  let arrayAlarmas = [];
  try {
    const data = await inventario_bodegas.findAll({
      attributes: ['tipoCilindroId', [literal('SUM("inventario_bodegas"."cantidad")'), 'totalCantidad']],
      include: [
        {
          model: tipo_cilindros,
          as: 'tipoCilindro',
          attributes: ['id', 'tipo'],
        },
        {
          model: estado_cilindros,
          as: 'estadoCilindro',
          attributes: ['id', 'tipo'],
          where: { tipo: 'Lleno' },
        },
      ],
      group: ['tipoCilindroId', 'tipoCilindro.id', 'tipoCilindro.tipo', 'estadoCilindro.id', 'estadoCilindro.tipo'],
    });
    const alarmas = await stockcilindros.findAll({
      where: { empresaId },
    });

    for (let k = 0; k < data.length; k++) {
      for (let k1 = 0; k1 < alarmas.length; k1++) {
        if (data[k].tipoCilindroId === alarmas[k1].tipoCilindroId) {
          if (Number(data[k].dataValues.totalCantidad) < alarmas[k1].minStock)
            arrayAlarmas.push({
              Titulo: `Bajo Stock ${data[k].tipoCilindro.tipo}`,
              Mensaje: `${data[k].dataValues.totalCantidad} uninades`,
              Fecha: generarFechaActual(),
            });
        }
      }
    }

    return { message: 'Accion completa', result: arrayAlarmas };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const registrarAlarmasCilindros = async (alarmasCilindros, empresaId) => {
  try {
    for (const alarma of alarmasCilindros) {
      const [stockCilindro, created] = await stockcilindros.findOrCreate({
        where: {
          tipoCilindroId: alarma.tipoCilindroId,
          empresaId,
        },
        defaults: {
          tipoCilindroId: alarma.tipoCilindroId,
          minStock: alarma.minStock,
          empresaId,
        },
      });
      if (!created) {
        await stockcilindros.update(
          {
            minStock: alarma.minStock,
          },
          {
            where: { tipoCilindroId: alarma.tipoCilindroId, empresaId },
          },
        );
      }
    }

    return { message: 'Accion completa', result: [] };
  } catch (error) {
    throw error;
  }
};

const leerAlarmas = async (empresaId) => {
  try {
    const data = await stockcilindros.findAll({ where: { empresaId } });
    return { message: 'Accion completa', result: data };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  alarmaCilindros,
  registrarAlarmasCilindros,
  leerAlarmas,
};
