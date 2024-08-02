import { useState } from 'react';

const MenuDespegable = () => {
  const [open, setOpen] = useState(false);
  const items = [
    {
      title: 'alarma1',
    },
    {
      title: 'alarma2',
    },
    {
      title: 'alarma3',
    },
  ];
  return (
    <div className="flex flex-col ">
      <button onClick={() => setOpen(!open)}>
        {open ? (
          'Cerrar'
        ) : (
          <div className="flex gap-x-1">
            <p className="text-14px">Alarmas</p>
            <p className="text-14px">(3)</p>
          </div>
        )}
      </button>
      {open && (
        <ul className="hidden md:flex flex-col  md:gap-4 absolute top-20">
          {items.map((item, key) => (
            <li className="relative cursor-pointer group z-10 " key={key}>
              <p className="block  bg-black  border-[#24365a] text-white   md:px-2 uppercase text-sm font-bold leading-7">
                {item.title}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MenuDespegable;
