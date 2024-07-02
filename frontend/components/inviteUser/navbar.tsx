import React from 'react';

export default function Navbar() {
  return (
    <div className="bg-blanco h-16">
      <div className="flex h-full justify-between items-center">
        <div className="flex gap-x-[16px] items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="15" viewBox="0 0 12 15" fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 0.833333H12V5.27777V9.72223H6V14.1667H0V9.72223V5.27777H6V0.833333Z"
              fill="#121417"
            />
          </svg>
          <h1 className="text-18px">Gastify Cloud</h1>
        </div>
      </div>
    </div>
  );
}
