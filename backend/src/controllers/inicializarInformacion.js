const { estado_cilindros, tipo_cilindros, inventario_bodegas } = require('../db/index');

const crearDatosDB = async () => {
  const tipos = [{ tipo: '5kg' }, { tipo: '11kg' }, { tipo: '15kg' }, { tipo: '45kg' }, { tipo: 'H15' }];
  const estados = [{ estado: 'Lleno' }, { estado: 'Vacío' }, { estado: 'Fallado' }, { estado: 'Prestado' }];

  try {
    await tipo_cilindros.bulkCreate(tipos);
    await estado_cilindros.bulkCreate(estados);
    return 'Tipos y estados de cilindros creados';
  } catch (error) {
    throw error;
  }
};

const crearActualizarInventarioDB = async ({ id, fecha, hora, cantidad, tipoCilindro, estadoCilindro, modificar }) => {
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
  };

  try {
    const findTipoCilindro = await inventario_bodegas.findOne({
      where: { tipoCilindroId: idCilindro },
    });

    if (findTipoCilindro) {
      const cantidadActual = findTipoCilindro.cantidad;
      if (nombreModificar === 'Agregar') {
        const nuevaCantidadS = cantidadActual + Number(cantidad);

        findTipoCilindro.cantidad = nuevaCantidadS;
        await findTipoCilindro.save();
        return { nombreCilindro, nombreEstado, nuevaCantidadS };
      }
      if (nombreModificar === 'Eliminar') {
        const nuevaCantidadR = cantidadActual - Number(cantidad);
        findTipoCilindro.cantidad = nuevaCantidadR;
        await findTipoCilindro.save();
        return { nombreCilindro, nombreEstado, nuevaCantidadR };
      }
    }
    await inventario_bodegas.create(data);
    return 'Datos creados.';
  } catch (error) {
    throw error;
  }
};

module.exports = {
  crearDatosDB,
  crearActualizarInventarioDB,
};
