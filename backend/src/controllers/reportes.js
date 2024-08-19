const { conductores, tipo_cilindros, ventas } = require('../db/index');
const { fn, col, Op } = require('sequelize');

const getTablaResumenReportesDiariosDB = async (fecha, conductor_id) => {
  try {
    const where = {};
    if (fecha) where.fecha = fecha;
    if (conductor_id) where.conductor_id = conductor_id;

    const resultados = await ventas.findAll({
      attributes: [
        'conductor_id',
        'tipoCilindroId',
        'fecha',
        [fn('SUM', col('cantidad')), 'total_cantidad'],
        // [fn('SUM', col('valor')), 'total_valor'],
      ],
      include: [
        { model: conductores, as: 'conductor', attributes: ['nombre', 'id'] },
        { model: tipo_cilindros, as: 'tipoCilindro', attributes: ['id', 'tipo'] },
      ],
      where,
      group: [
        'ventas.conductor_id',
        'ventas.tipoCilindroId',
        'ventas.fecha',
        'conductor.nombre',
        'conductor.id',
        'tipoCilindro.id',
        'tipoCilindro.tipo',
      ],
    });

    const tablaReportes = resultados.map((item) => {
      // Inicializar el objeto para cada fila de la tabla
      const reporte = {
        Fecha: item.fecha,
        'ID Conductor': item.conductor.nombre,
        '5kg': 0,
        '11kg': 0,
        '15kg': 0,
        '45kg': 0,
        H15: 0,
        'Total kilos vendidos': 0,
      };

      // Mapear el tipo de cilindro al campo adecuado y actualizar la cantidad
      switch (item.tipoCilindro.tipo) {
        case '5kg':
          reporte['5kg'] = parseInt(item.dataValues.total_cantidad, 10);
          break;
        case '11kg':
          reporte['11kg'] = parseInt(item.dataValues.total_cantidad, 10);
          break;
        case '15kg':
          reporte['15kg'] = parseInt(item.dataValues.total_cantidad, 10);
          break;
        case '45kg':
          reporte['45kg'] = parseInt(item.dataValues.total_cantidad, 10);
          break;
        case 'H15':
          reporte['H15'] = parseInt(item.dataValues.total_cantidad, 10);
          break;
      }

      // Actualizar el total de kilos vendidos
      reporte['Total kilos vendidos'] = reporte['5kg'] + reporte['11kg'] + reporte['15kg'] + reporte['45kg'] + reporte['H15'];

      return reporte;
    });

    const resultMap = new Map();
    tablaReportes.forEach((reporte) => {
      const key = `${reporte.Fecha}_${reporte['ID Conductor']}`;
      if (!resultMap.has(key)) {
        resultMap.set(key, reporte);
      } else {
        const existing = resultMap.get(key);
        existing['5kg'] += reporte['5kg'];
        existing['11kg'] += reporte['11kg'];
        existing['15kg'] += reporte['15kg'];
        existing['45kg'] += reporte['45kg'];
        existing['H15'] += reporte['H15'];
        existing['Total kilos vendidos'] += reporte['Total kilos vendidos'];
      }
    });

    const finalResult = Array.from(resultMap.values());

    return { message: 'Accion completa', result: finalResult };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTablaResumenReportesDiariosDB,
};
