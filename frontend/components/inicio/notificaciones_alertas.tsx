import React from 'react'

export default function Notificaciones_alertas() {
  return (
    <>
      <div className='bg-blanco px-4 py-6 w-full'>
        <h1 className='text-18px'>Notificaciones y Alertas</h1>
      </div>
      <div className='w-full rounded-lg border'>
        <table className='table-border w-full'>
            <thead>
              <th className='table-header'>Tipo de cilindro</th>
              <th className='table-header'>Stock</th>
              <th className='table-header'>Prioridad</th>
            </thead>
            <tbody>
              <tr className='table-border'>
                <td className='table-data left-table-data'>5 kg</td>
                <td className='table-data center-table-data'>200</td>
                <td className='table-data right-table-data'>Alta</td>
              </tr>
              <tr className='table-border'>
                <td className='table-data left-table-data'>11 kg</td>
                <td className='table-data center-table-data'>300</td>
                <td className='table-data right-table-data'>Media</td>
              </tr>
              <tr className='table-border'>
                <td className='table-data left-table-data'>15 kg</td>
                <td className='table-data center-table-data'>400</td>
                <td className='table-data right-table-data'>Baja</td>
              </tr>
              <tr className='table-border'>
                <td className='table-data left-table-data'>45 kg</td>
                <td className='table-data center-table-data'>500</td>
                <td className='table-data right-table-data'>Alta</td>
              </tr>
              <tr className='table-border'>
                <td className='table-data left-table-data'>H15</td>
                <td className='table-data center-table-data'>600</td>
                <td className='table-data right-table-data'>Media</td>
              </tr>
            </tbody>
          </table>
      </div>
    </>
  )
}
