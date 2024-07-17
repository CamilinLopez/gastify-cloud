import type { Metadata } from 'next';
import './globals.css';
import ReduxProvider from '@/redux/providers';

export const metadata: Metadata = {
  title: 'Gastify-Cloud',
  description: 'Manejo de gas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
