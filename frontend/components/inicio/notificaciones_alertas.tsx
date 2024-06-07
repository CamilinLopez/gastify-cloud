import React from 'react'

export default function Notificaciones_alertas() {

  const headers = ['Tipo de cilindro','Stock','Prioridad'];

  const data = [
    {tipo_cilindro: 5, stock: 200, prioridad: 'alta'},
    {tipo_cilindro: 11, stock: 300, prioridad: 'media'},
    {tipo_cilindro: 15, stock: 400, prioridad: 'baja'},
    {tipo_cilindro: 45, stock: 500, prioridad: 'alta'},
    {tipo_cilindro: 'H15', stock: 600, prioridad: 'media'}
  ];

  
  return (
    <>
      <div className='bg-blanco px-4 py-6 w-full'>
        <h1 className='text-18px'>Notificaciones y Alertas</h1>
      </div>
      <div className='px-4'>
        <div className='rounded-lg overflow-hidden border border-gray-300'>
          <table className='min-w-full border-collapse'>
            <thead className='bg-blanco'>
              <tr>
                {headers.map((head, index) => (
                  <th key={index} className='font-medium text-15px text-left border-t border-b border-gray-300 px-4 py-4'>{head}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index} className='border-b border-gray-300'>
                  <td className='text-14px px-4 py-4 w-4/12'>{row.tipo_cilindro} kg</td>
                  <td className='font-thin non-italic text-secondary-14px px-4 py-4 w-4/12 text-gray-400'>{row.stock}</td>
                  <td className='text-14px px-4 py-4'><p className='rounded-lg border border-color: #F0F2F5 text-center w-8/12 px-4 py-1 bg-[#F0F2F5]'>{row.prioridad.charAt(0).toUpperCase() + row.prioridad.substring(1)}</p></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
