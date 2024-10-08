'use client';
import React, { useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartOptions } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
import { AppDispatch } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getVentasPorDia, getVentasPorMes } from '@/redux/slice/inicio/thunks';
import { RootState } from '@/redux/reducer';
import Cookies from 'js-cookie';
import jwt, { JwtPayload } from 'jsonwebtoken';

const CilindrosPorDia = () => {
  const dispatch: AppDispatch = useDispatch();
  const ventasToday = useSelector((state: RootState) => state.inicio.responseVentaPorDia);
  const array = ventasToday.result;
  const today = ventasToday.today;

  const maxValue = Math.max(...array?.map((item) => Number(item.totalCantidad)));

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    let empresaId = typeof decoded === 'object' && decoded !== null ? decoded.empresaId : undefined;
    const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    if (!empresaId) empresaId = userId; // en caso de que empresaId no tenga nada, el id de la empresa se queda en userId
    dispatch(getVentasPorDia(empresaId));
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-3">
        <p className="text-16px dark:text-textDark">Cantidad de cilindros vendidos en este día</p>
        <p className="text-32px dark:dark:text-textDark">{today}</p>
      </div>
      {array.length ? (
        <div className="flex h-40 items-end gap-x-3 w-full">
          {array.map((item, index) => (
            <div key={index} className="flex flex-col gap-y-2 w-2/3">
              <div
                className="border-t-[2px] dark:bg-azul dark:border-bgDark1 border-gris-2 bg-gris-1"
                style={{
                  height: `${(Number(item.totalCantidad) / maxValue) * 100}px`,
                }}></div>
              <div className="flex items-center">
                <p className="text-13px dark:text-textDark">{item.tipoCilindro.tipo}</p>
                <p className="dark:text-textDark">-</p>
                <p className="text-13px dark:text-textDark ">{item.totalCantidad}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='h-40 flex items-center justify-center' >
          <h1 className="text-32px dark:text-textDark">Sin ventas</h1>
        </div>
      )}
    </div>
  );
};

const SalesChart = () => {
  const dispatch: AppDispatch = useDispatch();
  const tabla = useSelector((state: RootState) => state.inicio.responseVentaPorMes.result);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Permitir que se ajuste a la altura del contenedor
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Inter',
            weight: 700,
            size: typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 13, // Ajuste del tamaño de la fuente según el tamaño de la pantalla
          },
        },
      },
      y: {
        title: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100, // Ajusta según los valores reales de los datos para evitar compresión
        ticks: {
          stepSize: 20, // Esto creará divisiones más claras en el eje Y
          font: {
            size: typeof window !== 'undefined' && window.innerWidth < 768 ? 10 : 13,
          },
        },
      },
    },
  };

  const data1 = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: tabla,
  };

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) return undefined;
    const decoded = jwt.decode(token) as JwtPayload | null;
    let empresaId = typeof decoded === 'object' && decoded !== null ? decoded.empresaId : undefined;
    const userId = typeof decoded === 'object' && decoded !== null ? decoded.id : undefined;
    if (!empresaId) empresaId = userId; // en caso de que empresaId no tenga nada, el id de la empresa se queda en userId
    dispatch(getVentasPorMes(empresaId));
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="text-16px dark:text-textDark">Ventas mensuales</div>
      <div className="w-full max-w-[1000px] h-[400px] md:h-[500px]">
        {' '}
        {/* Aumentar la altura */}
        <Line data={data1} options={options} />
      </div>
    </div>
  );
};

export default function Resumen_ventas() {
  return (
    <div className="bg-blanco dark:bg-bgDark px-4 py-6 w-full">
      <div>
        <h1 className="text-18px dark:text-textDark" id="resumen_ventas">
          Resumen de Ventas
        </h1>
      </div>
      <div className="py-6 w-full flex flex-col gap-y-10">
        <CilindrosPorDia />
        <SalesChart />
      </div>
    </div>
  );
}
