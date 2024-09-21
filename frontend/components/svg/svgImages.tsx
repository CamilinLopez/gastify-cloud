import { CustomButtonProps } from '@/types/menu';
import React, { FC } from 'react';

export const Flechas: React.FC = () => (
  <div className="text-gris-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mb-0">
      <path d="M18 15l-6-6-6 6" />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 9l6 6 6-6" />
    </svg>
  </div>
);

export const G_google: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M15 8C15.0002 11.6456 12.3788 14.7633 8.78732 15.3891C5.1958 16.0148 1.67452 13.9673 0.441785 10.5364C-0.790948 7.10558 0.621968 3.28518 3.79043 1.48203C6.95889 -0.321131 10.9651 0.415282 13.2852 3.22734C13.4371 3.3983 13.4835 3.6386 13.4062 3.85384C13.3289 4.06909 13.1401 4.22491 12.9141 4.26009C12.6881 4.29528 12.461 4.20421 12.3219 4.02266C10.4264 1.72439 7.17233 1.08336 4.54684 2.49105C1.92136 3.89874 0.654342 6.96382 1.51955 9.81447C2.38476 12.6651 5.14168 14.5089 8.10667 14.2198C11.0717 13.9307 13.4205 11.5891 13.7188 8.625H7.5C7.15482 8.625 6.875 8.34518 6.875 8C6.875 7.65482 7.15482 7.375 7.5 7.375H14.375C14.7202 7.375 15 7.65482 15 8Z"
      fill="#0D171C"
    />
  </svg>
);

export const FlechaDown: React.FC = () => (
  <div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-3 dark:text-[#CFCFCF]">
      <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
  </div>
);

export const ArrowLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-6 h-6 text-custom-gris hover:text-custom-naranja dark:text-textDark">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
  </svg>
);

export const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
    stroke="currentColor"
    className="w-6 h-6 text-custom-gris hover:text-custom-naranja dark:text-textDark">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
);

export const Close = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const Menu = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 dark:text-textDark">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const User = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="size-6 dark:text-textDark">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);
