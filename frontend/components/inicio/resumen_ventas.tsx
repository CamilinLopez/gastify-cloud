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

const CilindrosPorDia = () => {
  const dispatch: AppDispatch = useDispatch();
  const ventasToday = useSelector((state: RootState) => state.inicio.responseVentaPorDia);
  const array = ventasToday.result;
  const today = ventasToday.today;

  const maxValue = Math.max(...array?.map((item) => Number(item.totalCantidad)));

  useEffect(() => {
    dispatch(getVentasPorDia());
  }, [dispatch]);

  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-3">
        <p className="text-16px dark:text-textDark">Cantidad de cilindros vendidos en este día</p>
        <p className="text-32px dark:dark:text-textDark">{today}</p>
      </div>
      <div className="flex h-40 items-end gap-x-3 w-full">
        {array.map((item, index) => (
          <div key={index} className="flex flex-col gap-y-2 w-2/3">
            <div
              className="border-t-[2px] dark:bg-bgDark1 dark:border-bgDark1 border-gris-2 bg-gris-1"
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
    </div>
  );
};

const SalesChart = () => {
  const dispatch: AppDispatch = useDispatch();
  const tabla = useSelector((state: RootState) => state.inicio.responseVentaPorMes.result);

  const options: ChartOptions<'line'> = {
    responsive: true,
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
            family: 'Inter', // Cambia 'Inter' al tipo de letra que desees
            weight: 700, // Puedes usar 'normal', 'bold', 'lighter', etc.
            size: 13,
          },
        },
      },
      y: {
        title: {
          display: false,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  const data1 = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    datasets: tabla,
  };

  useEffect(() => {
    dispatch(getVentasPorMes());
  }, [dispatch]);

  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="text-16px dark:text-textDark">Ventas mensuales</div>
      <Line data={data1} options={options} />
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
