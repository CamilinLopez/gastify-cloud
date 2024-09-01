const { estado_cilindros, tipo_cilindros, inventario_bodegas, conductores, camiones } = require('../db/index');
const { literal, Op, where } = require('sequelize');
const { generateId, generarFechaActual, generarHoraActual } = require('../utils/generadorId');

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

const registrarConductorDB = async (nombreConductor, licencia) => {
  try {
    const data = await conductores.create({
      id: generateId(),
      nombre: nombreConductor,
      licencia,
      fecha: generarFechaActual(),
      hora: generarHoraActual(),
    });
    const tabla = await conductores.findAll({ where: { activo: true } });
    return { message: 'Conductor creado', result: tabla };
  } catch (error) {
    throw error;
  }
};

const eliminarConductorDB = async (id) => {
  try {
    const data = await conductores.update({ activo: false, eliminadoEn: generarFechaActual() }, { where: { id: id } });
    const tabla = await conductores.findAll({ where: { activo: true } });

    return { message: 'Accion completa', result: tabla };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const eliminarCamionDB = async (id) => {
  try {
    const data = await camiones.update({ activo: false, eliminadoEn: generarFechaActual() }, { where: { id: id } });
    const dataTabla = await camiones.findAll({ where: { activo: true } });

    return { message: 'Accion completa', result: dataTabla };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTablaConductores = async () => {
  try {
    const data = await conductores.findAll({
      where: { activo: true },
    });
    return { message: 'Accion exitosa', result: data };
  } catch (error) {
    throw error;
  }
};

const registrarCamionesDB = async (marca, modelo, placa, capacidad_carga) => {
  try {
    const [camion, created] = await camiones.findOrCreate({
      where: { placa },
      defaults: { id: generateId(), fecha: generarFechaActual(), marca, modelo, placa, capacidad_carga },
    });

    const dataTabla = await camiones.findAll({ where: { activo: true } });

    if (created)
      return {
        message: `El vehículo de patente ${placa} fue creado exitosamente.`,
        result: dataTabla,
      };
    throw { message: `El vehículo de patente ${placa} ya existe.`, result: camion };
  } catch (error) {
    throw error;
  }
};

const tomarTablaCamionesDB = async () => {
  try {
    const data = await camiones.findAll({ where: { activo: true } });
    return { message: 'Acción completa.', result: data };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTablaInventarioBodegaDB,
  registrarConductorDB,
  getTablaConductores,
  registrarCamionesDB,
  tomarTablaCamionesDB,
  eliminarConductorDB,
  eliminarCamionDB,
};
