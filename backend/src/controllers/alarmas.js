const { inventario_bodegas, tipo_cilindros, estado_cilindros, stockcilindros } = require('../db/index');
const { literal } = require('sequelize');

const alarmaCilindros = async () => {
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
    return { message: 'Accion completa', result: data };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const registrarAlarmasCilindros = async (alarmasCilindros) => {
  try {
    for (const alarma of alarmasCilindros) {
      const [stockCilindro, created] = await stockcilindros.findOrCreate({
        where: {
          tipoCilindroId: alarma.tipoCilindroId,
        },
        defaults: {
          tipoCilindroId: alarma.tipoCilindroId,
          minStock: alarma.minStock,
        },
      });
      if (!created) {
        await stockcilindros.update(
          {
            minStock: alarma.minStock,
          },
          {
            where: { tipoCilindroId: alarma.tipoCilindroId },
          },
        );
      }
    }

    return { message: 'Accion completa', result: [] };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  alarmaCilindros,
  registrarAlarmasCilindros,
};
