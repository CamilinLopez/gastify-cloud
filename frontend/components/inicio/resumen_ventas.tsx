'use client';

import { data } from '@/arraysObjects/resumen_ventas';
import { DataItem } from '@/types/resumen_ventas';
import React from 'react';
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

const CilindrosPorDia = ({ data }: { data: DataItem[] }) => {
  const maxValue = Math.max(...data.map((item) => item.kg));
  const cilindrosVendidos = 30;
  return (
    <div className="w-full">
      <div className="flex flex-col gap-y-3">
        <p className="text-16px">Cantidad de cilindros vendidos en este día</p>
        <p className="text-32px">{cilindrosVendidos}</p>
      </div>
      <div className="flex h-40 items-end gap-x-3 w-full">
        {data.map((item) => (
          <div key={item.name} className="flex flex-col gap-y-2 w-2/3">
            <div
              className="border-t-[2px] border-gris-2 bg-gris-1"
              style={{
                height: `${(item.kg / maxValue) * 100}px`,
              }}></div>
            <p className="text-13px">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const SalesChart = () => {
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
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
    datasets: [
      {
        data: [100, 80, 60, 40, 80, 100, 60, 90, 25, 36, 74, 69],
        borderColor: '#637887',
        borderWidth: 3,
        fill: false,
      },
    ],
  };
  return (
    <div className="w-full flex flex-col gap-y-5">
      <div className="text-16px">Ventas mensuales</div>
      <Line data={data1} options={options} />
    </div>
  );
};

export default function Resumen_ventas() {
  return (
    <div className="bg-blanco px-4 py-6 w-full">
      <div>
        <h1 className="text-18px" id="resumen_ventas">
          Resumen de Ventas
        </h1>
      </div>
      <div className="py-6 w-full flex flex-col gap-y-10">
        <CilindrosPorDia data={data} />
        <SalesChart />
      </div>
    </div>
  );
}
