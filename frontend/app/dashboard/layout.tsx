'use client';

import Footer from '@/components/layoutDashboard/footer';
import Menu from '@/components/layoutDashboard/menu';
import NavBar from '@/components/layoutDashboard/navBar';

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen dark:bg-bgDark1">
      <div className="border-b-[1px] dark:border-borderDarck">
        <div className="px-10 dark:bg-bgDark">
          <NavBar />
        </div>
      </div>
      <div className="flex flex-grow overflow-auto px-6 py-5 w-screen">
        <div className="sticky top-0 h-full w-3/12 xl:block hidden">
          <Menu />
        </div>
        <div className="p-4 xl:w-10/12 w-full">
          <h1 className="px-4 text-36px dark:text-textDark">Dashboard</h1>
          {children}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
