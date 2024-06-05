'use client';

import Footer from '@/components/layoutDashboard/footer';
import Menu from '@/components/layoutDashboard/menu';
import NavBar from '@/components/layoutDashboard/navBar';

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen">
      <div className="border-b-[1px]">
        <div className="px-10">
          <NavBar />
        </div>
      </div>
      <div className="flex flex-grow overflow-auto px-6 py-5 w-screen">
        <div className="sticky top-0 h-full w-3/12">
          <Menu />
        </div>
        <div className="p-4 w-9/12">
          <h1 className="px-4 text-36px">Dashboard</h1>
          {children}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
