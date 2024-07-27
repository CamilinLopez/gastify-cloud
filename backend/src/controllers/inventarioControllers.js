const { estado_cilindros, tipo_cilindros, inventario_bodegas } = require('../db/index');
const { literal } = require('sequelize');

const getTablaInventarioBodegaDB = async () => {
  try {
    const data = await inventario_bodegas.findAll({
      attributes: ['fecha', [literal('SUM("inventario_bodegas"."cantidad")'), 'totalCantidad']],
      include: [
        {
          model: tipo_cilindros,
          as: 'tipoCilindro',
          attributes: ['id', 'tipo'], // Incluir los atributos necesarios
        },
        {
          model: estado_cilindros,
          as: 'estadoCilindro',
          attributes: ['id', 'tipo'], // Incluir los atributos necesarios
        },
      ],
      group: ['fecha', 'tipoCilindro.id', 'tipoCilindro.tipo', 'estadoCilindro.id', 'estadoCilindro.tipo'],
    });

    const groupedData = data.reduce((acc, item) => {
      const fecha = item.fecha;
      const tipo = item.tipoCilindro.tipo;
      const estado = item.estadoCilindro.tipo;
      const totalCantidad = parseInt(item.getDataValue('totalCantidad'), 10);

      if (!acc[fecha]) {
        acc[fecha] = {};
      }

      if (!acc[fecha][tipo]) {
        acc[fecha][tipo] = { tipoCilindro: tipo, estados: {} };
      }

      if (!acc[fecha][tipo].estados[estado]) {
        acc[fecha][tipo].estados[estado] = 0;
      }

      acc[fecha][tipo].estados[estado] += totalCantidad;

      return acc;
    }, {});

    const result = Object.entries(groupedData).map(([fecha, tipos]) => ({
      fecha,
      tipos: Object.values(tipos),
    }));

    return {
      message: 'Accion completada',
      result,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTablaInventarioBodegaDB,
};
