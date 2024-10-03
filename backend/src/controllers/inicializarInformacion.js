const { estado_cilindros, tipo_cilindros, inventario_bodegas, ventas } = require('../db/index');
const { literal } = require('sequelize');
const { inventarioInicial, VentasInicial } = require('../utils/cargainicialInventaio');

const crearDatosDB = async () => {
  const tipos = [{ tipo: '5kg' }, { tipo: '11kg' }, { tipo: '15kg' }, { tipo: '45kg' }, { tipo: 'H15' }];
  const estados = [{ tipo: 'Lleno' }, { tipo: 'Vacío' }, { tipo: 'Fallado' }, { tipo: 'Prestado' }];

  try {
    await tipo_cilindros.bulkCreate(tipos);
    await estado_cilindros.bulkCreate(estados);

    return 'Tipos y estados de cilindros creados';
  } catch (error) {
    throw error;
  }
};


const tomarDatosTablaStockAbastecimiento = async (empresaId) => {
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
      where: { empresaId },
      group: ['tipoCilindroId', 'tipoCilindro.id', 'tipoCilindro.tipo', 'estadoCilindro.id', 'estadoCilindro.tipo'],
    });
    const getInfo = data.map((item) => ({
      'Tipo de cilindro': item.tipoCilindro.tipo,
      'Stock actual': Number(item.getDataValue('totalCantidad')),
      'Stock mínimo': 20,
      Alerta: 'Ok',
    }));

    return getInfo;
  } catch (error) {
    throw error;
  }
};

const crearActualizarInventarioDB = async ({ id, fecha, hora, cantidad, tipoCilindro, estadoCilindro, modificar, empresaId }) => {
  const { idCilindro, nombreCilindro } = tipoCilindro;
  const { idEstado, nombreEstado } = estadoCilindro;
  const { idModificar, nombreModificar } = modificar;

  const data = {
    id,
    fecha,
    hora,
    cantidad,
    tipoCilindroId: idCilindro,
    estadoCilindroId: idEstado,
    empresaId,
  };

  try {
    if (nombreModificar === 'Agregar') {
      const nuevoRegistro = await inventario_bodegas.create(data);
      const getInfo = await tomarDatosTablaStockAbastecimiento(empresaId);

      return { message: 'Datos creados', nuevoRegistro, getInfo };
    }
    if (nombreModificar === 'Eliminar') {
      const total = await inventario_bodegas.sum('cantidad', {
        where: {
          tipoCilindroId: idCilindro,
          estadoCilindroId: idEstado,
        },
      });
      if (cantidad > total) throw 'Cantidad insuficiente para eliminar';

      const nuevoRegistro = await inventario_bodegas.create({
        id,
        fecha,
        hora,
        cantidad: -cantidad,
        tipoCilindroId: idCilindro,
        estadoCilindroId: idEstado,
        empresaId,
      });

      const getInfo = await tomarDatosTablaStockAbastecimiento(empresaId);

      return { message: 'Datos Eliminados', nuevoRegistro, getInfo };
    }
  } catch (error) {
    throw error;
  }
};

const getAbastacemientoDB = async () => {
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
  crearDatosDB,
  crearActualizarInventarioDB,
  getAbastacemientoDB,
  tomarDatosTablaStockAbastecimiento,
};
