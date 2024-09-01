'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight } from '../svg/svgImages';
import { Usuarios, Alertas, Configuracion } from './dropdown';
import Menu from './menu';


export default function NavBar() {
  
  
  const [, setCount] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleClickArrows = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    const buttonName = event.currentTarget.name;
    const container = document.getElementById('printTextContainer');
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    if (!container) return;

    const id: NodeJS.Timeout = setInterval(() => {
      setIntervalId(id);
      setCount((prevCount) => {
        if (buttonName === 'startRight' && prevCount < container.clientWidth) {
          container.scrollLeft = prevCount;
          return prevCount + 1;
        }
        if (buttonName === 'startLeft' && prevCount > 0) {
          container.scrollLeft = prevCount - 200;
          return prevCount - 1;
        } else {
          clearInterval(id);
          setIntervalId(null);
          return prevCount;
        }
      });
    }, 2);
  };
  return (
    <div className="bg-blanco h-16 dark:bg-bgDark">
      <div className="flex h-full justify-between items-center">
        <div className="flex gap-x-[16px] items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              fill="currentColor"
              d="M6 0.833333H12V5.27777V9.72223H6V14.1667H0V9.72223V5.27777H6V0.833333Z"
              className="dark:text-textDark"
            />
          </svg>
          <h1 className="text-18px dark:text-textDark">Gastify Cloud</h1>
        </div>
        <div className="flex overflow-x-hidden xl:hidden mx-3">
          <ArrowLeft name="startLeft" onClick={handleClickArrows} className="" />
          <div id="printTextContainer" className="overflow-x-hidden">
            <Menu />
          </div>
          <ArrowRight name="startRight" onClick={handleClickArrows} className="" />
        </div>
        <div className="flex items-center gap-x-8">
          <div>
            <Configuracion />
          </div>
          <div>
            <Alertas name={'Alarmas'} />
          </div>
          <div>
            <Usuarios name={'Camilo'} />
          </div>
        </div>
      </div>
    </div>
  );
}
