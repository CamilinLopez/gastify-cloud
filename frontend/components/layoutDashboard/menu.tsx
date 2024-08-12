'use client';

import React, { useState } from 'react';
import { RoutesMenu } from '@/arraysObjects/menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown } from '../icons/chevron-down';
import { ChevronRight } from '../icons/chevron-right';

export default function Menu() {
  const pathname = usePathname();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleItemClick = (item: string) => {
    if (selectedItem === item) {
      setSelectedItem(null);
    } else {
      setSelectedItem(item);
    }
  };

  
  // hidden?? block

  return (
    <div className="bg-blanco p-4 flex flex-col h-full justify-between">
      <div className="flex flex-col gap-y-1">
        {RoutesMenu.map((item) => (
          <div
            key={item.name}
            className={`cursor-pointer flex flex-col w-full justify-center items-center rounded-xl`}
            onClick={() => handleItemClick(item.name)}>
            <button className={`text-14px py-2 w-full flex gap-2`}>
              {item.subMenu && selectedItem === item.name ? <ChevronDown /> : <ChevronRight />}
              {!item.subMenu ? <Link href={item.path}>{item.name}</Link> : item.name}
            </button>

            {selectedItem === item.name &&
              item.subMenu?.map((subItem) => (
                <Link
                  key={subItem.name}
                  href={subItem.path}
                  className={`text-14px p-2 pl-4 flex flex-col gap-2 w-full bg-white`}>
                  {subItem.name}
                </Link>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col">
        <div className="flex gap-x-3 px-3 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.125 10.5C11.125 11.1213 10.6213 11.625 10 11.625C9.37868 11.625 8.875 11.1213 8.875 10.5C8.875 9.87868 9.37868 9.375 10 9.375C10.6213 9.375 11.125 9.87868 11.125 10.5ZM5.875 9.375C5.25368 9.375 4.75 9.87868 4.75 10.5C4.75 11.1213 5.25368 11.625 5.875 11.625C6.49632 11.625 7 11.1213 7 10.5C7 9.87868 6.49632 9.375 5.875 9.375ZM14.125 9.375C13.5037 9.375 13 9.87868 13 10.5C13 11.1213 13.5037 11.625 14.125 11.625C14.7463 11.625 15.25 11.1213 15.25 10.5C15.25 9.87868 14.7463 9.375 14.125 9.375ZM19.75 10.5C19.7507 13.924 17.9553 17.0975 15.02 18.8605C12.0847 20.6234 8.43978 20.7174 5.4175 19.1081L2.22531 20.1722C1.68626 20.352 1.09191 20.2117 0.69011 19.8099C0.288308 19.4081 0.148045 18.8137 0.327812 18.2747L1.39188 15.0825C-0.51326 11.5006 -0.0012579 7.11332 2.67747 4.06638C5.35619 1.01944 9.64177 -0.0503162 13.4382 1.38032C17.2346 2.81096 19.7483 6.44298 19.75 10.5ZM18.25 10.5C18.249 7.03154 16.0787 3.93408 12.819 2.74891C9.55932 1.56374 5.90643 2.54399 3.67801 5.20188C1.44959 7.85977 1.12157 11.6276 2.85719 14.6306C2.9647 14.8167 2.98723 15.0399 2.91906 15.2437L1.75 18.75L5.25625 17.5809C5.33262 17.5549 5.41275 17.5416 5.49344 17.5416C5.62516 17.5418 5.7545 17.5767 5.86844 17.6428C8.42111 19.1197 11.568 19.1217 14.1225 17.648C16.6771 16.1743 18.2507 13.4491 18.25 10.5Z"
              fill="#121417"
            />
          </svg>
          <p className="text-16px">Soporte</p>
        </div>
        <div className="flex gap-x-3 px-3 py-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="21" viewBox="0 0 18 21" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16.5 0.75H3.75C2.09315 0.75 0.75 2.09315 0.75 3.75V19.5C0.75 19.9142 1.08579 20.25 1.5 20.25H15C15.4142 20.25 15.75 19.9142 15.75 19.5C15.75 19.0858 15.4142 18.75 15 18.75H2.25C2.25 17.9216 2.92157 17.25 3.75 17.25H16.5C16.9142 17.25 17.25 16.9142 17.25 16.5V1.5C17.25 1.08579 16.9142 0.75 16.5 0.75ZM15.75 15.75H3.75C3.22326 15.7493 2.70572 15.888 2.25 16.1522V3.75C2.25 2.92157 2.92157 2.25 3.75 2.25H15.75V15.75Z"
              fill="#121417"
            />
          </svg>
          <p>Documentación</p>
        </div>
      </div> 
      </div>
    );
  }
  function itemName(prevState: null): null {
    throw new Error('Function not implemented.');
  }
  */
}
