'use client';

import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from '../svg/svgImages';
import { Usuarios, Alertas, Configuracion } from './dropdown';
import Menu from './menu';

export default function NavBar() {
  const [counter, setCounter] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseDown = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const nameButton = event.currentTarget.name;
    const container = document.getElementById('printTextContainer');
    const mainContainer = document.getElementById('containerMenu');
    if (!container || !mainContainer) return;

    intervalRef.current = setInterval(() => {
      setCounter((prevCounter) => {
        if (nameButton === 'startRight') {
          container.scrollLeft = prevCounter;
          return prevCounter + 1;
        }
        if (nameButton === 'startLeft' && prevCounter > 0) {
          container.scrollLeft = prevCounter;
          return prevCounter - 1;
        }
        return prevCounter;
      });
    }, 10);
  };

  const handleMouseUp = () => {
    // Detiene el intervalo cuando se suelta el botón
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
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
        <div id="containerMenu" className="flex overflow-x-hidden xl:hidden mx-3">
          <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} name="startLeft">
            <ArrowLeft />
          </button>
          <div id="printTextContainer" className="overflow-x-hidden">
            <Menu />
          </div>
          <button onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} name="startRight">
            <ArrowRight />
          </button>
        </div>
        <div className="flex items-center gap-x-8">
          <div>
            <Configuracion />
          </div>
          <div>
            <Alertas name={'Alarmas'} />
          </div>
          <div>
            <Usuarios name={''} />
          </div>
        </div>
      </div>
    </div>
  );
}
