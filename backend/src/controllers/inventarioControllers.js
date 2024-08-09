const { estado_cilindros, tipo_cilindros, inventario_bodegas } = require('../db/index');
const { literal, Op } = require('sequelize');

const getTablaInventarioBodegaDB = async (fecha) => {
  try {
    let today;

    if (!fecha) today = new Date().toISOString().split('T')[0];
    if (fecha) today = fecha;

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
        },
      ],
      where: {
        fecha: {
          [Op.lte]: today,
        },
      },
      group: ['tipoCilindroId', 'tipoCilindro.id', 'tipoCilindro.tipo', 'estadoCilindro.id', 'estadoCilindro.tipo'],
    });
    const groupedData = data.reduce((acc, item) => {
      const tipoCilindro = item.tipoCilindro.tipo;
      const estado = item.estadoCilindro.tipo;
      const totalCantidad = parseInt(item.getDataValue('totalCantidad'), 10);

      if (!acc[tipoCilindro]) {
        acc[tipoCilindro] = { tipoCilindro, estados: {} };
      }

      if (!acc[tipoCilindro].estados[estado]) {
        acc[tipoCilindro].estados[estado] = 0;
      }

      acc[tipoCilindro].estados[estado] += totalCantidad;

      return acc;
    }, {});

    const result = {
      fecha: today,
      tipos: Object.values(groupedData),
    };

    return { message: 'Accion completa', result };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTablaInventarioBodegaDB,
};
