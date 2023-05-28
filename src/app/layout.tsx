import './globals.css';
import { Open_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';
import { Metadata } from 'next';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Instagram',
    template: 'Instagram | %s',
  },
  description: 'Instagram Photos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={openSans.className}>
      <body className='w-full flex flex-col overflow-auto bg-neutral-50'>
        <AuthContext>
          <header className='sticky top-0 bg-white z-10 border-b'>
            <div className='max-w-screen-xl mx-auto'>
              <Navbar />
            </div>
          </header>
          <div className='max-w-screen-xl mx-auto w-full'>
            <main className='grow flex justify-center w-full'>
              <SWRConfigContext>{children}</SWRConfigContext>
            </main>
          </div>
          <footer></footer>
        </AuthContext>
        <div id='modal' />
      </body>
    </html>
  );
}
