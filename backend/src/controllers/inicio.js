const { Op } = require('sequelize');
const { tipo_cilindros, ventas, inventario_bodegas, database } = require('../db/index');

const getTablaResumenInventario = async () => {
  try {
    const llenos = await inventario_bodegas.findAll({
      attributes: [[database.fn('SUM', database.col('cantidad')), 'totalCantidad']],
      include: [{ model: tipo_cilindros, as: 'tipoCilindro', attributes: ['id', 'tipo'] }],
      where: {
        estadoCilindroId: 1,
      },
      group: ['tipoCilindro.id', 'tipoCilindro.tipo'],
    });

    const vacios = await inventario_bodegas.findAll({
      attributes: [[database.fn('SUM', database.col('cantidad')), 'totalCantidad']],
      include: [{ model: tipo_cilindros, as: 'tipoCilindro', attributes: ['id', 'tipo'] }],
      where: {
        estadoCilindroId: 2,
      },
      group: ['tipoCilindro.id', 'tipoCilindro.tipo'],
    });

    const resultados = { llenos, vacios };
    return { message: 'Accion completa', result: resultados };
  } catch (error) {
    throw error;
  }
};

const cilindrosVendidosPorDia = async () => {
  const today = new Date().toISOString().split('T')[0];
  try {
    const data = await ventas.findAll({
      attributes: [[database.fn('SUM', database.col('cantidad')), 'totalCantidad']],
      include: { model: tipo_cilindros, as: 'tipoCilindro', attributes: ['id', 'tipo'] },
      where: {
        fecha: {
          [Op.eq]: '2024/08/16',
        },
      },
      group: ['tipoCilindro.id', 'tipoCilindro.tipo'],
    });
    return { message: 'Accion completa', today, result: data };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const ventarPorMes = async () => {
  const _5kgR = new Array(12).fill(0);
  const _11kgR = new Array(12).fill(0);
  const _15kgR = new Array(12).fill(0);
  const _45kgR = new Array(12).fill(0);
  const _H15R = new Array(12).fill(0);
  let cilindros = [
    { tipo: '5kg', data: _5kgR },
    { tipo: '11kg', data: _11kgR },
    { tipo: '15kg', data: _15kgR },
    { tipo: '45kg', data: _45kgR },
    { tipo: 'H15', data: _H15R },
  ];
  const dataResponse = [];

  try {
    const results = await ventas.findAll({
      attributes: [
        [database.fn('EXTRACT', database.literal('YEAR FROM "fecha"')), 'year'],
        [database.fn('EXTRACT', database.literal('MONTH FROM "fecha"')), 'month'],
        'tipoCilindroId',
        [database.fn('SUM', database.col('cantidad')), 'total_cantidad'],
      ],
      include: { model: tipo_cilindros, as: 'tipoCilindro', attributes: ['id', 'tipo'] },
      group: [
        database.fn('EXTRACT', database.literal('YEAR FROM "fecha"')),
        database.fn('EXTRACT', database.literal('MONTH FROM "fecha"')),
        'tipoCilindroId',
        'tipoCilindro.id',
        'tipoCilindro.tipo',
      ],
      order: [
        [database.fn('EXTRACT', database.literal('YEAR FROM "fecha"')), 'ASC'],
        [database.fn('EXTRACT', database.literal('MONTH FROM "fecha"')), 'ASC'],
        ['tipoCilindroId', 'ASC'],
      ],
    });

    //agrupar por tipos de cilindros
    for (const cilindroPorMes of results) {
      const poscicion = Number(cilindroPorMes.dataValues.month) - 1;
      const cantidad = Number(cilindroPorMes.dataValues.total_cantidad);

      if (cilindroPorMes.tipoCilindroId === 1) _5kgR[poscicion] = cantidad;
      if (cilindroPorMes.tipoCilindroId === 2) _11kgR[poscicion] = cantidad;
      if (cilindroPorMes.tipoCilindroId === 3) _15kgR[poscicion] = cantidad;
      if (cilindroPorMes.tipoCilindroId === 4) _45kgR[poscicion] = cantidad;
      if (cilindroPorMes.tipoCilindroId === 5) _H15R[poscicion] = cantidad;
    }

    //crar un objeto de las caracteristicas de  const cilindro = {data, borderColor,borderWidth,label } para graficarlos en el frontend
    for (const cilindroPorMes of cilindros) {
      const cilindro = {
        data: cilindroPorMes.data,
        borderColor: '#637887',
        borderWidth: 3,
        fill: false,
        label: cilindroPorMes.tipo,
      };
      dataResponse.push(cilindro);
    }

    return { message: 'Accion completa', result: dataResponse };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTablaResumenInventario,
  cilindrosVendidosPorDia,
  ventarPorMes,
};
